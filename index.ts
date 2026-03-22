import { emptyPluginConfigSchema, type OpenClawPluginApi } from "openclaw/plugin-sdk/core";
import { runDuckDuckGoSearch } from "./src/duckduckgo-client.js";

const duckduckgoPlugin = {
  id: "duckduckgo-search",
  name: "DuckDuckGo Search Plugin",
  description: "Privacy-focused web search via DuckDuckGo",
  configSchema: emptyPluginConfigSchema(),
  register(api: OpenClawPluginApi) {
    api.registerTool({
      name: "ddg_search",
      label: "DuckDuckGo Search",
      description:
        "Search the web using DuckDuckGo. Privacy-focused, no API key required. Returns titles, URLs, and descriptions.",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string", description: "Search query string." },
          count: {
            type: "number",
            description: "Number of results (1-20, default 10).",
            minimum: 1,
            maximum: 20,
          },
          region: {
            type: "string",
            description: "Region code (e.g. 'us-en', 'uk-en', 'de-de').",
          },
          time: {
            type: "string",
            description: "Time filter: 'd' (day), 'w' (week), 'm' (month), 'y' (year).",
          },
        },
        required: ["query"],
        additionalProperties: false,
      },
      async execute(_toolCallId: string, params: Record<string, unknown>) {
        const result = await runDuckDuckGoSearch({
          query: typeof params.query === "string" ? params.query : "",
          count: typeof params.count === "number" ? params.count : undefined,
          region: typeof params.region === "string" ? params.region : undefined,
          time: typeof params.time === "string" ? params.time : undefined,
        });
        return JSON.stringify(result, null, 2);
      },
    });
  },
};

export default duckduckgoPlugin;
