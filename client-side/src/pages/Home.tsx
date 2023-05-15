import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import {ICharacter} from "../types"

interface ApiResponse {
  results: ICharacter[]
}

const Home: React.FC = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await fetch(`https://rickandmortyapi.com/api/character`)
      const characters: ApiResponse = await response.json()
      setCharacters(characters.results)
    }
    fetchCharacters()
      .catch((error) => console.log(error))
  }, [])

  return (
    <div  className="container">
      <h1>Rick and Morty Characters</h1>
      <ul>
        {characters.map((character) => (
          <li onClick={() => navigate("/character/" + character.id)} key={character.id}>
            <img src={character.image} alt={character.name}/>
            <div>
              <h2>{character.name}</h2>
              <p>Species: {character.species}</p>
              <p>Status: {character.status}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
