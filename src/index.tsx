import { CatSearch } from "./CatSearch"
import { createRoot } from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const client = new QueryClient()

createRoot(document.getElementById("main")).render(
  <QueryClientProvider client={client}>
    <CatSearch />
  </QueryClientProvider>
)
