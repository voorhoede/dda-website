import { parse as parseCsv } from "@std/csv/parse";
import { buildClient, LogLevel } from "npm:@datocms/cma-client-node";

const client = buildClient({
  apiToken: Deno.env.get("DATOCMS_API_TOKEN")!,
  environment: "members-migration",
  logLevel: LogLevel.BASIC,
});

if (import.meta.main) {
  const accountsCsv = await Deno.readTextFile("./accounts.csv", {});
  const accountsData = parseCsv(
    accountsCsv,
    { skipFirstRow: true },
  );
}

function inviteEditor(email: string) {
  const EDITOR_ROLE_ID = "301184";

  return client.siteInvitations.create({
    email,
    role: { type: "role", id: EDITOR_ROLE_ID },
  });
}
