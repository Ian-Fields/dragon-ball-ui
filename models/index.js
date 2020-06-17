import Sequelize from 'sequelize'
import racesModel from './races'
import charactersModel from './characters'
import sagasModel from './sagas'
import charactersSagasModel from './charactersSagas'
import allConfigs from '../configs/sequelize'

const environment = process.env.NODE_ENV || 'development'
const config = allConfigs[environment]

const connection = new Sequelize(config.database, config.username, config.password, {
  host: config.host, dialect: config.dialect,
})

const races = racesModel(connection, Sequelize)
const characters = charactersModel(connection, Sequelize, races)
const sagas = sagasModel(connection, Sequelize)
const charactersSagas = charactersSagasModel(connection, Sequelize, characters, sagas)

characters.belongsTo(races)
races.hasMany(characters)

characters.belongsToMany(sagas, { through: charactersSagas })
sagas.belongsToMany(characters, { through: charactersSagas })

module.exports = {
  characters, races, sagas, charactersSagas, Op: Sequelize.Op,
}
