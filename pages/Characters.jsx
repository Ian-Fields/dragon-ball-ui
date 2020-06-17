import React, { useEffect, useState } from 'react'
import Characters from '../components/Characters'
import Page from '../components/Page'
import Search from '../components/Search'
import Title from '../components/Title'

import { filterCharacters, retrieveCharacters } from '../utils/characters'

export default () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [characterList, setCharacterList] = useState([])
  const [filterCharacterList, setFilterCharacterList] = useState([])

  useEffect(() => {
    async function pullData() {
      const returnedList = await retrieveCharacters()

      setCharacterList(returnedList)
      setFilterCharacterList(returnedList)
    }

    pullData()
  }, [])

  useEffect(() => {
    const filtered = filterCharacters(characterList, searchTerm)

    setFilterCharacterList(filtered)
  }, [searchTerm])

  return (
    <Page>
      <Title />
      <Search term={searchTerm} setter={setSearchTerm} />
      {
        filterCharacterList.map(character => (
          <Characters
            key={character.id}
            name={character.name}
            raceId={character.race.id}
            type={character.type}
            transformation={character.transformation}
            id={character.id}
          />
        ))
      }
    </Page>
  )
}
