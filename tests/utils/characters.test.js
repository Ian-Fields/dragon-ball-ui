import { expect } from 'chai'
import { createSandbox } from 'sinon'
import {
  after, afterEach, before, describe, it,
} from 'mocha'
import { characterList, characterFilters } from '../mocks/characters'
import * as CharacterActions from '../../actions/characters'
import { filterCharacters, retrieveCharacters } from '../../utils/characters'

describe('Utils - Characters', () => {
  let sandbox
  let stubbedFetchCharacters

  before(() => {
    sandbox = createSandbox()

    stubbedFetchCharacters = sandbox.stub(CharacterActions, 'fetchCharacters')
  })

  afterEach(() => {
    sandbox.reset()
  })

  after(() => {
    sandbox.restore()
  })

  describe('filterCharacters', () => {
    it('returns an array of matching characters', () => {
      const filtered = filterCharacters(characterList, 'gok')

      expect(filtered).to.deep.equal(characterFilters)
    })
  })

  describe('retrieveCharacters', () => {
    it('returns the data provided by the fetch action', async () => {
      stubbedFetchCharacters.returns(characterList)

      const data = await retrieveCharacters()
      expect(data).to.deep.equal(characterList)
    })
  })
})
