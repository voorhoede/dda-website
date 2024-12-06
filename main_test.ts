import { assertEquals } from "@std/assert";
import { getUrlPathFilename, parsePipeSeparatedValue } from "./main.ts";

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

  assertEquals(parsePipeSeparatedValue("|06123||||034123|"), [
    "06123",
    "034123",
  ]);
});

Deno.test("getUrlPathFilename", () => {
  assertEquals(
    getUrlPathFilename("https://example.com/wp-content/02/pixels.jpg"),
    "pixels.jpg",
  );
});
