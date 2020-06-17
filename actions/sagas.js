/* eslint-disable import/prefer-default-export */
import axios from 'axios'

export const fetchSagasForCharacters = async (name) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/characters/${name}`) // eslint-disable-line no-undef

    return data
  } catch (error) {
    return []
  }
}
