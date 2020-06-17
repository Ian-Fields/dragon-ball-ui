import models from '../models'

export const getAllRaces = async (request, response) => {
  try {
    const races = await models.races.findAll()

    return response.send(races)
  } catch (error) {
    return response.status(500).send('Unable to retrieve the race, try again')
  }
}

export const getRaceById = async (request, response) => {
  try {
    const { identifier } = request.params
    const raceMatch = await models.races.findOne({
      include: [{
        model: models.characters,
        include: {
          model: models.sagas,
        },
      }],
      where: {
        [models.Op.or]: [
          { id: identifier },
          { name: { [models.Op.like]: `%${identifier.toLowerCase()}%` } },
        ],
      },
    })

    return raceMatch
      ? response.send(raceMatch)
      : response.status(404).send(`Unable to find a race with a matching: ${identifier}`)
  } catch (error) {
    return response.status(500).send('Unable to retrieve the race, try again')
  }
}
