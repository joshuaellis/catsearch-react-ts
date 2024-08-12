import * as React from "react"

import { useQuery } from "@tanstack/react-query"
import { fetchSearchResultsFromAPI } from "./searchApiClient"

export function CatSearch() {
  const [searchTerm, setSearchTerm] = React.useState("")

  const { data } = useQuery({
    queryKey: ["cats", searchTerm],
    queryFn: ({ signal }) => fetchSearchResultsFromAPI(searchTerm, { signal }),
    enabled: searchTerm.length >= 2,
    initialData: [],
  })

  const searchTermOnChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { value } = event.target
    setSearchTerm(value)
  }

  const valid = searchTerm.length >= 2

  return (
    <div>
      <h2>Search for cat breed</h2>
      <input type="text" onChange={searchTermOnChange} />
      <div>
        {valid === false
          ? "Type at least two characters to start searching"
          : `You searched for ${searchTerm}`}
      </div>
      <div>
        {data.length > 0
          ? data.map((datum, i) => <div key={i}>🐈 {datum.breed}</div>)
          : "No hits"}
      </div>
    </div>
  )
}
