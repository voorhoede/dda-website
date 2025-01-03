import { parse as parseCsv } from "@std/csv/parse";
import { buildClient, LogLevel } from "npm:@datocms/cma-client-node";
const client = buildClient({
  apiToken: Deno.env.get("DATOCMS_API_TOKEN")!,
  environment: "main",
  logLevel: LogLevel.BASIC,
});

if (import.meta.main) {
  const matchedPostsCsv = await Deno.readTextFile(
    "./slugs/matched-posts.csv",
    {}
  );
  const matchedPosts = parseCsv(matchedPostsCsv, {
    skipFirstRow: true,
    separator: ";",
  });

  for (const post of matchedPosts) {
    await createRedirect(post);
  }
}

async function createRedirect(post: Record<string, string>) {
  const REDIRECT_MODEL_ID = "c0S4sIyiRK-EewRhFEFPLA";

  if (!post.wordpress || !post.dato) {
    console.log("No wordpress or dato post found: ", post);
    return;
  } else {
    console.log("Creating redirect for: ", post);
  }

  const redirectRecord = await client.items.create({
    item_type: { type: "item_type", id: REDIRECT_MODEL_ID },
    from: `/${post.wordpress}/`,
    to: `/publicaties/${post.dato}/`,
    status_code: "301",
  });

  client.items.publish(redirectRecord.id);
}
