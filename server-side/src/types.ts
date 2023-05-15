export interface ICharacter {
  id: number
  name: string
  status: string
  species: string
  image: string
  location?: {
    name: string
    url: string
  }
  origin?: {
    name: string
    url: string
  }
  episode: string[]
}
