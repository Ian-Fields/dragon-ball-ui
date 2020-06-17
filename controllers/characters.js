import models from '../models'

export const getAllCharacters = async (request, response) => {
  const characters = await models.characters.findAll({
    include: [{ model: models.races }, { model: models.sagas }],
  })

  return response.send(characters)
}

export const getCharacterByIdOrName = async (request, response) => {
  const { identifier } = request.params

  const character = await models.characters.findOne({
    where: {
      [models.Op.or]: [
        { id: identifier },
        { name: { [models.Op.like]: `%${identifier}%` } },
      ],
    },
    include: [{ model: models.races }, { model: models.sagas }],
  })

  return character
    ? response.send(character)
    : response.sendStatus(404)
}
