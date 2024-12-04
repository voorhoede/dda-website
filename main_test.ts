import { assertEquals } from "@std/assert";
import { parsePipeSeparatedValue } from "./main.ts";

Deno.test("parsePipeSeparatedValue behaves as expected", () => {
  assertEquals(
    parsePipeSeparatedValue("https://example.com"),
    ["https://example.com"],
  );

  assertEquals(
    parsePipeSeparatedValue("https://example.nl|https://example.nl"),
    ["https://example.nl", "https://example.nl"],
  );

  assertEquals(
    parsePipeSeparatedValue("HQ|"),
    ["HQ"],
  );

  assertEquals(
    parsePipeSeparatedValue(
      "One | Two|And Three |",
    ),
    ["One", "Two", "And Three"],
  );
});
