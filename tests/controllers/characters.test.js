/* eslint-disable max-len */
import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import {
  after, afterEach, before, beforeEach, describe, it,
} from 'mocha'
import { getAllCharacters, getCharacterByIdOrName } from '../../controllers/characters'
import models from '../../models'
import { characterList, characterFilters } from '../mocks/characters'

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - Characters', () => {
  let sandbox
  let stubbedSend
  let response
  let stubbedSendStatus
  let stubbedStatusDotSend
  let stubbedStatus
  let stubbedCharactersFindAll
  let stubbedCharactersFindOne

  before(() => {
    sandbox = sinon.createSandbox()

    stubbedCharactersFindAll = sandbox.stub(models.characters, 'findAll')
    stubbedCharactersFindOne = sandbox.stub(models.characters, 'findOne')

    stubbedSend = sandbox.stub()
    stubbedSendStatus = sandbox.stub()
    stubbedStatusDotSend = sandbox.stub()
    stubbedStatus = sandbox.stub()

    response = {
      send: stubbedSend,
      sendStatus: stubbedSendStatus,
      status: stubbedStatus,
    }
  })

  beforeEach(() => {
    stubbedStatus.returns({ send: stubbedStatusDotSend })
  })

  afterEach(() => {
    sandbox.reset()
  })

  after(() => {
    sandbox.restore()
  })

  describe('getAllCharacters', () => {
    it('retrieves a list of all characters from the database.', async () => {
      stubbedCharactersFindAll.returns(characterList)

      await getAllCharacters({}, response)

      expect(stubbedCharactersFindAll).to.have.been.calledWith({
        include: [{ model: models.races }, { model: models.sagas }],
      })
      expect(stubbedSend).to.have.been.calledWith(characterList)
    })
  })

  describe('getCharacterByIdOrName', () => {
    it('retrieves the character associated with the id passed by the user with its race and sagas.', async () => {
      stubbedCharactersFindOne.returns(characterFilters)
      const request = { params: { identifier: 1 } }

      await getCharacterByIdOrName(request, response)

      expect(stubbedCharactersFindOne).to.be.calledWith({
        where: {
          [models.Op.or]: [
            { id: request.params.identifier },
            { name: { [models.Op.like]: `%${request.params.identifier}%` } },
          ],
        },
        include: [{ model: models.races }, { model: models.sagas }],
      })
      expect(stubbedSend).to.have.been.calledWith(characterFilters)
    })

    it('returns a 404 status when no character is found matching the id provided by the user.', async () => {
      stubbedCharactersFindOne.returns(null)
      const request = { params: { identifier: 1 } }

      await getCharacterByIdOrName(request, response)

      expect(stubbedCharactersFindOne).to.be.calledWith({
        where: {
          [models.Op.or]: [
            { id: request.params.identifier },
            { name: { [models.Op.like]: `%${request.params.identifier}%` } },
          ],
        },
        include: [{ model: models.races }, { model: models.sagas }],
      })
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })
  })
})
