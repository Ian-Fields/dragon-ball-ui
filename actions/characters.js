/* eslint-disable import/prefer-default-export */
import axios from 'axios'

export const fetchCharacters = async () => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/characters`) // eslint-disable-line no-undef

    return data
  } catch (error) {
    return []
  }
}
