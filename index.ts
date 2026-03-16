import { emptyPluginConfigSchema, type OpenClawPluginApi } from "openclaw/plugin-sdk/core";
import { createDuckDuckGoSearchProvider } from "./src/duckduckgo-search-provider.js";

const duckduckgoPlugin = {
  id: "duckduckgo-search",
  name: "DuckDuckGo Search Plugin",
  description: "Privacy-focused web search via DuckDuckGo",
  configSchema: emptyPluginConfigSchema(),
  register(api: OpenClawPluginApi) {
    api.registerWebSearchProvider(createDuckDuckGoSearchProvider());
  },
};

export default duckduckgoPlugin;
