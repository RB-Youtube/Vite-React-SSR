import {renderToString} from "react-dom/server"
import {StaticRouter} from "react-router-dom/server"
import App from "./App"
import {ICharacter} from "./types"

interface Props {
  path: string
  data: ICharacter[]
}

export const render = ({ path, data }: Props) => {
  return renderToString(
    <StaticRouter location={path}>
      <App characters={data} />
    </StaticRouter>
  )
}
