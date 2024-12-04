import { parse as parseCsv } from "@std/csv/parse";
import { toKebabCase } from "@std/text";

import {
  buildBlockRecord,
  buildClient,
  LogLevel,
} from "npm:@datocms/cma-client-browser";
import { parse as parseHtml } from "npm:parse5";
import { parse5ToStructuredText } from "npm:datocms-html-to-structured-text";

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

  // await createMember(membersData[0]);
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

  const structuredTextExample = await parse5ToStructuredText(
    parseHtml("<p>hi</p>", {
      sourceCodeLocationInfo: true,
    }),
  );

  return client.items.create({
    item_type: { type: "item_type", id: MEMBER_MODEL_ID },
    // creator: { type: "user", id: "67554" },
    name: member.Title,
    slug: toKebabCase(member.Title),
    location: "hai street",
    employees: member.Omvang,
    logo: { upload_id: "b9cAcs8vS6eqX9bKMiZlPg" },
    about_us: {
      "nl": buildBlockRecord({
        item_type: { type: "item_type", id: TEXT_BLOCK_ID },
        text: structuredTextExample,
      }),
    },
    contact: [buildBlockRecord({
      item_type: { type: "item_type", id: CONTACT_BLOCK_ID },
      title: "ha",
    })],
  });
}

export function parsePipeSeparatedValue(value: string) {
  return value.split("|").map((string) => string.trim()).filter(Boolean);
}
