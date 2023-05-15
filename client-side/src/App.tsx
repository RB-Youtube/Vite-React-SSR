import React from "react"
import {Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import Character from "./pages/Character"
import "./index.css"

const App: React.FC = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/character/:id" element={<Character />} />
    </Routes>
  )
}

export default App
