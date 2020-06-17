import path from 'path'

const express = require('express')

const { getAllCharacters, getCharacterByIdOrName } = require('./controllers/characters')
const { getAllRaces, getRaceById } = require('./controllers/races')
const { getAllSagas, getSagaById } = require('./controllers/sagas')

const app = express()

app.use(express.static('public'))

app.get('/api/characters', getAllCharacters)

app.get('/api/characters/:identifier', getCharacterByIdOrName)

app.get('/api/races', getAllRaces)

app.get('/api/races/:identifier', getRaceById)

app.get('/api/sagas', getAllSagas)

app.get('/api/sagas/:id', getSagaById)

app.all('*', (request, response) => response.sendFile(path.resolve(__dirname, 'public', 'index.html')))

app.listen(1337, () => {
  console.log('I am Shenron. I can grant you 1 wish')// eslint-disable-line no-console
})
