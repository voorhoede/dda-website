import { parse as parseCsv } from "@std/csv/parse";
import { toKebabCase } from "@std/text";

import {
  buildBlockRecord,
  buildClient,
  LogLevel,
} from "npm:@datocms/cma-client-node";
import { parse as parseHtml } from "npm:parse5";
import {
  type CreateNodeFunction,
  type HastElementNode,
  parse5ToStructuredText,
} from "npm:datocms-html-to-structured-text";

const client = buildClient({
  apiToken: Deno.env.get("DATOCMS_API_TOKEN")!,
  environment: "publication-detail-page",
  logLevel: LogLevel.BASIC,
});

if (import.meta.main) {
  const newsCsv = await Deno.readTextFile("./nieuwsberichten.csv", {});
  const newsData = parseCsv(
    newsCsv,
    { skipFirstRow: true },
  )
    .filter((publication) => publication.Content);

  for (const publication of newsData) {
    await createPublication(publication);
    console.info(`Created publication ${publication.Title}`, "\n");
  }
}

async function createPublication(publication: Record<string, string>) {
  const PUBLICATION_MODEL_ID = "UllaGfcETuK2MTg4FIMw3w";
  const TEXT_BLOCK_ID = "PAk40zGjQJCcDXXPgygUrA";
  const IMAGE_BLOCK_ID = "ZdBokLsWRgKKjHrKeJzdpw";

  const content = await parse5ToStructuredText(
    parseHtml(publication.Content, {
      sourceCodeLocationInfo: true,
    }),
    {
      handlers: {
        figure: async (
          createNode: CreateNodeFunction,
          node,
        ) => {
          const imageChild = (node as HastElementNode).children
            ?.find((child) => child?.tagName === "img");

          if (!imageChild) {
            return;
          }

          const asset = await client.uploads.createFromUrl({
            filename: getUrlPathFilename(
              (imageChild as HastElementNode).properties?.src,
            ),
            url: (imageChild as HastElementNode).properties?.src,
            tags: ["content-import"],
            skipCreationIfAlreadyExists: true,
          });

          return createNode("block", {
            item: buildBlockRecord({
              item_type: { type: "item_type", id: IMAGE_BLOCK_ID },
              image: {
                upload_id: asset.id,
                alt: "Imported asset: need alt text",
              },
            }),
          });
        },
      },
    },
  );

  const banner = await client.uploads.createFromUrl({
    filename: getUrlPathFilename(publication["Image Featured"]),
    url: publication["Image Featured"],
    tags: ["content-import"],
    skipCreationIfAlreadyExists: true,
  });

  return client.items.create({
    item_type: { type: "item_type", id: PUBLICATION_MODEL_ID },
    title: publication.Title,
    banner: { upload_id: banner.id },
    content: buildBlockRecord({
      item_type: { type: "item_type", id: TEXT_BLOCK_ID },
      text: content,
    }),
    slug: {
      nl: toKebabCase(
        publication.Title
          .replace("é", "e")
          .replace("á", "a")
          .replace("ë", "e"),
      ),
    },
  });
}

export function getUrlPathFilename(url: string) {
  return new URL(url).pathname.split("/").at(-1);
}
