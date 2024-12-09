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
  environment: "members-migration",
  logLevel: LogLevel.BASIC,
});

if (import.meta.main) {
  const membersCsv = await Deno.readTextFile("./leden.csv", {});
  // const users = await client.users.list();
  const membersData = parseCsv(
    membersCsv,
    { skipFirstRow: true },
  );

  await createMember(membersData[0]);
}
function inviteEditor(email: string) {
  const EDITOR_ROLE_ID = "301184";

  return client.siteInvitations.create({
    email,
    role: { type: "role", id: EDITOR_ROLE_ID },
  });
}

async function createMember(member: Record<string, string>) {
  const MEMBER_MODEL_ID = "ByoMKdCkSp6T10UjQm26wg";
  const TEXT_BLOCK_ID = "PAk40zGjQJCcDXXPgygUrA";
  const CONTACT_BLOCK_ID = "Hwfbdgu_TMqmzK2i0-xmXg";
  const IMAGE_BLOCK_ID = "ZdBokLsWRgKKjHrKeJzdpw";

  const structuredTextExample = await parse5ToStructuredText(
    parseHtml(member.Content, {
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

  const logo = member.Logo
    ? await client.uploads.createFromUrl({
      filename: getUrlPathFilename(member.Logo),
      url: member.Logo,
      tags: ["content-import"],
      skipCreationIfAlreadyExists: true,
    })
    : await client.uploads.createFromLocalFile({
      localPath: "./dda-logo.png",
      tags: ["content-import"],
      skipCreationIfAlreadyExists: true,
    });

  const banner = member.Banner && await client.uploads.createFromUrl({
    filename: getUrlPathFilename(member.Banner),
    url: member.Banner,
    tags: ["content-import"],
    skipCreationIfAlreadyExists: true,
  });

  return client.items.create({
    item_type: { type: "item_type", id: MEMBER_MODEL_ID },
    // creator: { type: "user", id: "67554" },
    name: member.Title,
    slug: toKebabCase(member.Title),
    // seo: ...
    banner: banner ? { upload_id: banner.id } : null,
    logo: { upload_id: logo.id, alt: member.Title },
    // brand_color
    location: parsePipeSeparatedValue(member.Locaties_city)[0],
    employees: member.Omvang,
    website: tryGetValidUrl(
      parsePipeSeparatedValue(member.Locaties_website_url),
    ),
    // tags:
    // industry:
    // expertises:
    about_us: {
      "nl": buildBlockRecord({
        item_type: { type: "item_type", id: TEXT_BLOCK_ID },
        text: structuredTextExample,
      }),
    },
    // vacancies:
    // cases:
    contact: parsePipeSeparatedValue(member.Locaties_location_label).map((
      label,
      index,
    ) =>
      buildBlockRecord({
        item_type: { type: "item_type", id: CONTACT_BLOCK_ID },
        title: label,
        website: parsePipeSeparatedValue(member.Locaties_website_url)[index]
          ? withHttps(
            parsePipeSeparatedValue(member.Locaties_website_url)[index],
          )
          : null,
        street: parsePipeSeparatedValue(member.Locaties_address)[index],
        postal_code: parsePipeSeparatedValue(member.Locaties_postcode)[index],
        city: parsePipeSeparatedValue(member.Locaties_city)[index],
        phone: parsePipeSeparatedValue(member.Locaties_phonenumber)[index],
        email: parsePipeSeparatedValue(member.Locaties_emailaddress)[index],
      })
    ),
  });
}

function tryGetValidUrl(maybeUrls: string[]) {
  return maybeUrls
    .map((maybeUrl) => {
      try {
        return new URL(maybeUrl).href;
      } catch (_error) {
        return false;
      }
    })
    .find(Boolean);
}

export function parsePipeSeparatedValue(value: string) {
  return value.split("|").map((string) => string.trim()).filter(Boolean);
}

export function getUrlPathFilename(url: string) {
  return new URL(url).pathname.split("/").at(-1);
}
