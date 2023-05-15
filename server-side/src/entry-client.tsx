import {hydrateRoot} from "react-dom/client"
import {BrowserRouter} from "react-router-dom"
import App from "./App"

const data = window.__SSR_DATA__
delete window.__SSR_DATA__

hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <BrowserRouter>
    <App characters={data || []} />
  </BrowserRouter>
)


