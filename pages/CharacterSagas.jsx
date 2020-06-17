import React, { useEffect, useState } from 'react'
import Page from '../components/Page'
import GoBack from '../components/GoBack'
import NotFound from '../components/NotFound'
import CharacterDetails from '../components/Character'
import Title from '../components/Title'
import { retrieveCharacterWithRaceAndSagas } from '../utils/sagas'

export default ({ location }) => {
  const [characterId, setCharacterId] = useState(0)
  const [character, setCharacter] = useState({})
  const [sagaList, setSagaList] = useState([])


  useEffect(() => {
    async function pullData() {
      const { id, details, sagas } = await retrieveCharacterWithRaceAndSagas(location)

      setCharacterId(id)
      setCharacter(details)
      setSagaList(sagas)
    }

    pullData()
  }, [])

  return (
    <Page>
      <Title />
      <GoBack />
      {
        characterId
          ? (
            <CharacterDetails
              name={character.name}
              race={character.race}
              type={character.type}
              transformation={character.transformation}
              sagaList={sagaList}
            />
          )
          : (
            <NotFound
              message="Puny Earthling, looks like the page you are looking for does not exist.
              Get your power level up and do better next time."
            />
          )
      }
    </Page>
  )
}
