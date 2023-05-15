import {useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom"
import {ICharacter} from "../types"

const Character = () => {
  const [character, setCharacter] = useState<ICharacter>()

  const params = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${params.id}`)
      const character: ICharacter = await response.json()
      setCharacter(character)
    }
    fetchCharacters()
  }, [params.id])

  if (!character) return (<div>Loading...</div>)

  return (
    <div className="character-page">
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} />
      <p className="status">{character.status}</p>
      <p className="species">{character.species}</p>
      {character.location && <p>Location: {character.location.name}</p>}
      {character.origin && <p>Origin: {character.origin.name}</p>}
      <button onClick={() => navigate("/")}>Back to Characters</button>
    </div>
  )
}

export default Character
