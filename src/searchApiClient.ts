export interface Cat {
  "body type": string
  breed: string
  coat: string
  country: string
  origin: string
  pattern: string
}

interface FetchArgs {
  signal: AbortSignal
}

export function fetchSearchResultsFromAPI(
  searchTerm: string,
  { signal }: FetchArgs
): Promise<Cat[]> {
  // Note: this API seems a bit unstable and sometimes it takes a long time to respond, especially
  // for broad searches
  return fetch(
    `https://cat-api-bjoerge.sanity-io1.now.sh/cats?query=${searchTerm}`,
    {
      signal: signal,
    }
  ).then((res) => res.json())
}
