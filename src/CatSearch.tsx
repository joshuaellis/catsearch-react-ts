import * as React from "react"

import { useQuery } from "@tanstack/react-query"
import { fetchSearchResultsFromAPI } from "./searchApiClient"

export function CatSearch() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const labelId = React.useId()
  const descriptionId = React.useId()

  const searchIsValid = searchTerm.length >= 2

  const { data, isLoading } = useQuery({
    queryKey: ["cats", searchTerm],
    queryFn: ({ signal }) => fetchSearchResultsFromAPI(searchTerm, { signal }),
    enabled: searchIsValid,
    initialData: [],
  })

  const searchFormOnChange: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setSearchTerm(formData.get("q").toString())
  }

  return (
    <div>
      <h2 id={labelId}>Search for cat breed</h2>
      <form onSubmit={(e) => e.preventDefault()} onChange={searchFormOnChange}>
        <input
          aria-busy={isLoading}
          aria-describedby={descriptionId}
          required
          name="q"
          aria-labelledby={labelId}
          type="search"
        />
      </form>
      <p id={descriptionId}>
        {searchIsValid === false
          ? "Type at least two characters to start searching"
          : `You searched for ${searchTerm}`}
      </p>
      <ul aria-label="Search results" aria-live="polite">
        {data.length > 0 ? (
          data.map((datum) => <li key={datum.breed}>🐈 {datum.breed}</li>)
        ) : (
          <li>No results</li>
        )}
      </ul>
    </div>
  )
}
