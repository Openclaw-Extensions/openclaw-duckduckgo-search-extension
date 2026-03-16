import { Type } from "@sinclair/typebox";
import { runDuckDuckGoSearch } from "./duckduckgo-client.js";

const DuckDuckGoSearchSchema = Type.Object(
  {
    query: Type.String({ description: "Search query string." }),
    count: Type.Optional(
      Type.Number({
        description: "Number of results to return (1-20).",
        minimum: 1,
        maximum: 20,
      }),
    ),
    region: Type.Optional(
      Type.String({
        description:
          "Region code for localized results (e.g. 'us-en', 'uk-en', 'de-de').",
      }),
    ),
    time: Type.Optional(
      Type.String({
        description:
          "Time filter: 'd' (day), 'w' (week), 'm' (month), 'y' (year).",
      }),
    ),
  },
  { additionalProperties: false },
);

/**
 * Creates a DuckDuckGo web search provider plugin compatible with OpenClaw's
 * WebSearchProviderPlugin interface. No API key is required.
 */
export function createDuckDuckGoSearchProvider() {
  return {
    id: "duckduckgo",
    label: "DuckDuckGo Search",
    hint: "Privacy-focused search · no API key required",
    envVars: [] as string[],
    placeholder: "",
    signupUrl: "https://duckduckgo.com/",
    docsUrl: "https://duckduckgo.com/privacy",
    autoDetectOrder: 100,
    getCredentialValue: () => "no-key-needed",
    setCredentialValue: () => {},
    createTool: () => ({
      description:
        "Search the web using DuckDuckGo. Privacy-focused search engine that does not require an API key. Returns titles, URLs, and descriptions.",
      parameters: DuckDuckGoSearchSchema,
      execute: async (args: Record<string, unknown>) =>
        await runDuckDuckGoSearch({
          query: typeof args.query === "string" ? args.query : "",
          count: typeof args.count === "number" ? args.count : undefined,
          region: typeof args.region === "string" ? args.region : undefined,
          time: typeof args.time === "string" ? args.time : undefined,
        }),
    }),
  };
}
