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
import { withHttps } from "npm:ufo";

const client = buildClient({
  apiToken: Deno.env.get("DATOCMS_API_TOKEN")!,
  environment: "main",
  logLevel: LogLevel.BASIC,
});

if (import.meta.main) {
  const eventsCsv = await Deno.readTextFile("./events.csv", {});
  const eventsData = parseCsv(
    eventsCsv,
    { skipFirstRow: true },
  )

  for (const event of eventsData) {
    await createEvent(event);

    console.info(`Created event ${event.Title}`);
  }
}

async function createEvent(event: Record<string, string>) {
  const EVENT_MODEL_ID = "WsNJp5eaRz2-QZserzWOTw";
  const INTERNAL_BLOCK_ID = "Q82PkA7iSR2bSjgonqs5MA";
  const EXTERNAL_BLOCK_ID = "Jf1MPr7fQTeckmDNiSXsDA";
  const IMAGE_BLOCK_ID = "ZdBokLsWRgKKjHrKeJzdpw";
  const TEXT_BLOCK_ID = "PAk40zGjQJCcDXXPgygUrA";

  const isExternal = event["Externe URL"] !== "";

  const image = event['Image Featured']
    ? await client.uploads.createFromUrl({
        filename: getUrlPathFilename(event['Image Featured']),
        url: event['Image Featured'],
        tags: ["content-import"],
        skipCreationIfAlreadyExists: true,
      })
    : {
      id: "cAsrZwmdSQONYFinCZ8pEQ",
    };

  const eventRecord = await client.items.create({
    item_type: { type: "item_type", id: EVENT_MODEL_ID },
    title: {
      nl: event.Title,
    },
    meta: {
      created_at: new Date(event.Date).toISOString(),
    },
    date: new Date(event.Datum.split('/').reverse().join('-')),
    image: {
      upload_id: image.id,
      alt: "Imported asset: need alt text",
    },
    location: {
      nl: event.Plaats,
    },
    details: isExternal
      ? buildBlockRecord({
        item_type: { type: "item_type", id: EXTERNAL_BLOCK_ID },
        title: event.Title,
          link: event["Externe URL"],
        })
      : buildBlockRecord({
          item_type: { type: "item_type", id: INTERNAL_BLOCK_ID },
          title: event.Title,
          banner: {
            upload_id: image.id,
            alt: "Imported asset: need alt text",
          },
          text: buildBlockRecord({
            item_type: { type: "item_type", id: TEXT_BLOCK_ID },
            text: await parse5ToStructuredText(
              parseHtml(event.Content || "No content found", {
                sourceCodeLocationInfo: true,
              }),
              {
                handlers: {
                  img: async (
                    createNode: CreateNodeFunction,
                    node,
                  ) => {
                    const asset = await client.uploads.createFromUrl({
                      filename: getUrlPathFilename(
                        (node as HastElementNode).properties?.src,
                      ),
                      url: (node as HastElementNode).properties?.src,
                      tags: ["content-import"],
                      skipCreationIfAlreadyExists: true,
                    });

                    console.log(asset);
          
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
            ),
          }),
          slug: toKebabCase(event.Title),
        })
  });

  client.items.publish(eventRecord.id);
}

export function getUrlPathFilename(url: string) {
  return new URL(url).pathname.split("/").at(-1);
}
