
import { fetchCharacters } from '../actions/characters'

export const filterCharacters = (list, term) => list.filter(character => (
  character.name.toLowerCase().includes(term.toLowerCase())
))

export const retrieveCharacters = async () => {
  const characters = await fetchCharacters()
  return characters
}
