export default (connection, Sequelize, Races) => connection.define('characters', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: Sequelize.STRING, allowNull: false },
  raceId: { type: Sequelize.INTEGER, references: { model: Races, key: 'id' } },
  type: { type: Sequelize.STRING, allowNull: false },
  transformation: { type: Sequelize.STRING, allowNull: false },
})
