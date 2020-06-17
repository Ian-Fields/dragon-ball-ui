import models from '../models'

export const getAllSagas = async (request, response) => {
  try {
    const sagas = await models.sagas.findAll()

    return response.send(sagas)
  } catch (error) {
    return response.status(500).send('Unable to retrieve the sagas, try again.')
  }
}

export const getSagaById = async (request, response) => {
  try {
    const { id } = request.params
    const sagaMatch = await models.sagas.findOne({
      where: {
        [models.Op.or]: [
          { id },
          { name: { [models.Op.like]: `%${id.toLowerCase()}%` } },
        ],
      },
      include: [{ include: [{ model: models.races }], model: models.characters }],
    })

    return sagaMatch
      ? response.send(sagaMatch)
      : response.status(404).send(`Unable to find a saga with a matching id of ${id}`)
  } catch (error) {
    return response.status(500).send('Unable to retrieve the saga, try again.')
  }
}
