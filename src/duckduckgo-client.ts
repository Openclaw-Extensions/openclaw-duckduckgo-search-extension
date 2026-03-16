import { search, SafeSearchType } from "duck-duck-scrape";

const DEFAULT_COUNT = 10;

type SearchTimeType = "d" | "w" | "m" | "y";

export type DuckDuckGoSearchParams = {
  query: string;
  count?: number;
  region?: string;
  time?: string;
  safeSearch?: "strict" | "moderate" | "off";
};

function resolveSafeSearch(
  value?: string,
): SafeSearchType {
  switch (value) {
    case "strict":
      return SafeSearchType.STRICT;
    case "off":
      return SafeSearchType.OFF;
    default:
      return SafeSearchType.MODERATE;
  }
}

function isValidTime(value: string): value is SearchTimeType {
  return ["d", "w", "m", "y"].includes(value);
}

function resolveSiteName(urlRaw: string): string | undefined {
  try {
    const host = new URL(urlRaw).hostname.replace(/^www\./, "");
    return host || undefined;
  } catch {
    return undefined;
  }
}

export async function runDuckDuckGoSearch(
  params: DuckDuckGoSearchParams,
): Promise<Record<string, unknown>> {
  const query = params.query.trim();
  if (!query) {
    return { error: "empty_query", message: "Search query cannot be empty." };
  }

  const count =
    typeof params.count === "number" && Number.isFinite(params.count)
      ? Math.max(1, Math.min(20, Math.floor(params.count)))
      : DEFAULT_COUNT;

  const options: Record<string, unknown> = {
    safeSearch: resolveSafeSearch(params.safeSearch),
  };

  if (params.region) {
    options.region = params.region;
  }

  if (params.time && isValidTime(params.time)) {
    options.time = params.time;
  }

  const start = Date.now();

  const searchResults = await search(query, options);

  if (searchResults.noResults || !searchResults.results?.length) {
    return {
      query,
      provider: "duckduckgo",
      count: 0,
      tookMs: Date.now() - start,
      results: [],
    };
  }

  const items = searchResults.results.slice(0, count);

  return {
    query,
    provider: "duckduckgo",
    count: items.length,
    tookMs: Date.now() - start,
    results: items.map((item) => ({
      title: item.title ?? "",
      url: item.url ?? "",
      description: item.description ?? "",
      ...(item.hostname ? { siteName: item.hostname } : { siteName: resolveSiteName(item.url) }),
    })),
  };
}
