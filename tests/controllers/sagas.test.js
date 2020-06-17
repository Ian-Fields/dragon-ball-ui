/* eslint-disable max-len */
import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import {
  after, afterEach, before, beforeEach, describe, it,
} from 'mocha'
import { getAllSagas, getSagaById } from '../../controllers/sagas'
import models from '../../models'
import { sagaList, sagaFilters } from '../mocks/sagas'

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - Sagas', () => {
  let sandbox
  let stubbedSend
  let response
  let stubbedSendStatus
  let stubbedStatusDotSend
  let stubbedStatus
  let stubbedsagasFindAll
  let stubbedsagasFindOne

  before(() => {
    sandbox = sinon.createSandbox()

    stubbedsagasFindAll = sandbox.stub(models.sagas, 'findAll')
    stubbedsagasFindOne = sandbox.stub(models.sagas, 'findOne')

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

  describe('getAllSagas', () => {
    it('retrieves a list of all sagas from the database.', async () => {
      stubbedsagasFindAll.returns(sagaList)

      await getAllSagas({}, response)

      expect(stubbedsagasFindAll).to.have.been.calledWith()
      expect(stubbedSend).to.have.been.calledWith(sagaList)
    })

    describe('getSagaById', () => {
      it('retrieves the saga associated with the id passed by the user with corresponding novels and their races.', async () => {
        stubbedsagasFindOne.returns(sagaFilters)
        const request = { params: { id: '1' } }

        await getSagaById(request, response)

        expect(stubbedsagasFindOne).to.be.calledWith({
          where: {
            [models.Op.or]: [
              { id: request.params.id },
              { name: { [models.Op.like]: `%${request.params.id.toLowerCase()}%` } },
            ],
          },
          include: [{ include: [{ model: models.races }], model: models.characters }],
        })
        expect(stubbedSend).to.have.been.calledWith(sagaFilters)
      })

      it('returns a 404 status when no saga is found matching the id provided by the user.', async () => {
        stubbedsagasFindOne.returns(null)
        const request = { params: { id: '1' } }

        await getSagaById(request, response)

        expect(stubbedsagasFindOne).to.be.calledWith({
          where: {
            [models.Op.or]: [
              { id: request.params.id },
              { name: { [models.Op.like]: `%${request.params.id.toLowerCase()}%` } },
            ],
          },
          include: [{ include: [{ model: models.races }], model: models.characters }],
        })
        expect(stubbedStatus).to.have.been.calledWith(404)
        expect(stubbedStatusDotSend).to.have.been.calledWith(`Unable to find a saga with a matching id of ${request.params.id}`)
      })
    })
  })
})
