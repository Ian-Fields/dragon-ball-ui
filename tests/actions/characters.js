import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { expect } from 'chai'
import { before, describe, it } from 'mocha'
import { characterList } from '../mocks/characters'
import { fetchCharacters } from '../../actions/characters'

describe('Actions - Characters', () => {
  let mockAxios

  before(() => {
    mockAxios = new MockAdapter(axios)
  })

  describe('fetchCharacters', () => {
    it('returns an array of characters from the API', async () => {
      mockAxios.onGet().reply(200, characterList)

      const data = await fetchCharacters()

      expect(data).to.deep.equal(characterList)
    })

    it('returns an empty array when the API responds with a non-200 status', async () => {
      mockAxios.onGet().reply(500, 'Unable to retrieve characters')

      const data = await fetchCharacters()

      expect(data).to.deep.equal([])
    })
  })
})
