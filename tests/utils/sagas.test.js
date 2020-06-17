/* eslint-disable max-len */
import { expect } from 'chai'
import { createSandbox } from 'sinon'
import {
  after, afterEach, before, describe, it,
} from 'mocha'
import { characterById } from '../mocks/characters'
import { getCharacterIdFromUrl, retrieveCharacterWithRaceAndSagas } from '../../utils/sagas'
import * as sagaActions from '../../actions/sagas'

describe('Utils - sagas', () => {
  let sandbox
  let stubbedfetchSagasForCharacters

  before(() => {
    sandbox = createSandbox()
    stubbedfetchSagasForCharacters = sandbox.stub(sagaActions, 'fetchSagasForCharacters')
  })

  afterEach(() => {
    sandbox.reset()
  })

  after(() => {
    sandbox.restore()
  })

  describe('getCharacterIdFromUrl', () => {
    it('returns the final portion of the URL from the location object provided', () => {
      const id = getCharacterIdFromUrl({ pathname: '/characters/1' })

      expect(id).to.equal('1')
    })

    it('returns zero when there is no path name', () => {
      const id = getCharacterIdFromUrl({})

      expect(id).to.equal(0)
    })
  })

  describe('retrieveCharacterWithRaceAndSagas', () => {
    it('returns the data provided by the fetch action', async () => {
      stubbedfetchSagasForCharacters.returns(characterById)
      const location = { pathname: '/characters/1' }
      const data = await retrieveCharacterWithRaceAndSagas(location)
      expect(data).to.deep.equal({ id: 0, details: {}, sagas: [] })
    })

    it('returns an id of 0 and empty details object, and an empty sagas array when the path does not contain a numeric id at the end', async () => {
      const data = await retrieveCharacterWithRaceAndSagas({ pathname: '/no/numeric/id' })

      expect(data).to.deep.equal({ id: 0, details: {}, sagas: [] })
    })

    it('returns an id of 0 and empty details and products list when the action returns bad data', async () => {
      stubbedfetchSagasForCharacters.returns({})

      const data = await retrieveCharacterWithRaceAndSagas({ pathname: '/characters/1' })

      expect(data).to.deep.equal({ id: 0, details: {}, sagas: [] })
    })
  })
})
