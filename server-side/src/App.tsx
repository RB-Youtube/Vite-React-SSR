import {Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import Character from "./pages/Character"
import "./index.css"
import {ICharacter} from "./types"

const App = ({characters}: {characters: ICharacter[]}) => {
  return (
    <Routes>
      <Route index element={<Home characters={characters} />} />
      <Route path="/character/:id" element={<Character />} />
    </Routes>
  )
}

export default App
