export default (connection, Sequelize, Sagas, Characters) => connection.define('charactersSagas', {
  characterId: { type: Sequelize.INTEGER, references: { model: Characters, key: 'id' } },
  sagaId: { type: Sequelize.INTEGER, references: { model: Sagas, key: 'id' } },
})
