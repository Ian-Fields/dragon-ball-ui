import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { expect } from 'chai'
import { before, describe, it } from 'mocha'
import { characterById } from '../mocks/characters'
import { fetchSagasForCharacters } from '../../actions/sagas'

describe('Actions - Sagas', () => {
  let mockAxios

  before(() => {
    mockAxios = new MockAdapter(axios)
  })

  describe('fetchSagasForCharacters', () => {
    it('returns an object containing the searched for character and its race and sagas from the API', async () => {
      mockAxios.onGet().reply(200, characterById)

      const data = await fetchSagasForCharacters()

      expect(data).to.deep.equal(characterById)
    })

    it('returns an empty array when the API responds with a non-200 status', async () => {
      mockAxios.onGet().reply(500, 'Unable to retrieve characters')

      const data = await fetchSagasForCharacters()

      expect(data).to.deep.equal({})
    })
  })
})
