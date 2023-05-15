import { useNavigate } from "react-router-dom"
import {ICharacter} from "../types"

const Home = ({characters}: {characters: ICharacter[]}) => {
  const navigate = useNavigate()

  return (
    <div className="container">
      <h1>Rick and Morty Characters</h1>
      <ul>
        {characters?.map((character) => (
          <li onClick={() => navigate("/character/" + character.id)} key={character.id}>
            <img  src={character.image} alt={character.name}/>
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
