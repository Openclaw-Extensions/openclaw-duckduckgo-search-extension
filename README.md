# DuckDuckGo Search Extension for OpenClaw

A privacy-focused web search provider plugin for [OpenClaw](https://github.com/openclaw/openclaw). Uses DuckDuckGo as the search backend — no API key required.

## Install

```bash
openclaw plugin install openclaw-duckduckgo-search-extension
```

Or clone and install manually:

```bash
git clone https://github.com/Openclaw-Extensions/openclaw-duckduckgo-search-extension.git
cd openclaw-duckduckgo-search-extension
npm install --omit=dev
```

Then register as a plugin in your OpenClaw config:

```json
{
  "tools": {
    "web": {
      "search": {
        "provider": "duckduckgo"
      }
    }
  }
}
```

## Features

- No API key required — DuckDuckGo search is free
- Region/locale filtering
- Time-based filtering (day, week, month, year)
- Safe search support (strict, moderate, off)
- Returns structured results (title, URL, description, site name)

## Configuration

Set as the default search provider:

```bash
openclaw config set tools.web.search.provider duckduckgo
```

## Tool Parameters

When the agent invokes `web_search` with this provider:

| Parameter | Type   | Description                                           |
|-----------|--------|-------------------------------------------------------|
| `query`   | string | Search query (required)                               |
| `count`   | number | Number of results, 1-20 (default: 10)                 |
| `region`  | string | Region code, e.g. `us-en`, `uk-en`, `de-de`           |
| `time`    | string | Time filter: `d` (day), `w` (week), `m` (month), `y` (year) |

## License

MIT
