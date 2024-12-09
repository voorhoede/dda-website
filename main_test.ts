import { assertEquals } from "@std/assert";
import { getUrlPathFilename, parsePipeSeparatedValue } from "./main.ts";

Deno.test("parsePipeSeparatedValue behaves as expected", () => {
  assertEquals(
    parsePipeSeparatedValue("https://example.com"),
    ["https://example.com"],
    "no separator",
  );

  assertEquals(
    parsePipeSeparatedValue("https://example.nl|https://example.nl"),
    ["https://example.nl", "https://example.nl"],
    "separator between",
  );

  assertEquals(
    parsePipeSeparatedValue("HQ|"),
    ["HQ"],
    "ends with separator",
  );

  assertEquals(
    parsePipeSeparatedValue("|Afdeling"),
    ["Afdeling"],
    "starts with separator",
  );

  assertEquals(
    parsePipeSeparatedValue("One | Two|And Three |"),
    ["One", "Two", "And Three"],
    "mixed spacing",
  );

  assertEquals(
    parsePipeSeparatedValue("|06123||||034123|"),
    ["06123", "034123"],
    "multiple separators with no value",
  );
});

Deno.test("getUrlPathFilename", () => {
  assertEquals(
    getUrlPathFilename("https://example.com/wp-content/02/pixels.jpg"),
    "pixels.jpg",
  );
});
