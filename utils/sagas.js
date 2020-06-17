/* eslint-disable import/prefer-default-export */
import { fetchSagasForCharacters } from '../actions/sagas'

export const getCharacterIdFromUrl = location => (location && location.pathname
  ? location.pathname.split('/characters/').pop()
  : 0
)

export const retrieveCharacterWithRaceAndSagas = async (location) => {
  try {
    const characterId = getCharacterIdFromUrl(location)
    const {
      id,
      name,
      race,
      type,
      transformation,
      sagas,
    } = await fetchSagasForCharacters(characterId)

    if (!id || !name || !race || !type || !transformation || !sagas) return { id: 0, details: {}, sagas: [] }

    return { id, sagas, details: { name, race: race.name, type, transformation } }
  } catch (error) {
    return { id: 0, details: {}, sagas: [] }
  }
}
