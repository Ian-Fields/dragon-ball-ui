import React from 'react'
import styled from 'styled-components'
import Sagas from './Sagas'
import raceColors from '../public/javascript/raceColors'

const CharacterName = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
`
const Image = styled.img`
  width: 50%;
  height: auto;
  margin: 0 auto;
`

const CharacterDetails = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
  text-align: center;
`
const UlName = styled.div`
    font-size: 20px;
    text-align: center;
    margin-left: -300px;
  `
const Race = styled.span`
${
  ({ race }) => `
    color: ${raceColors[race]};
  `}
  `

export default ({
  id, name, race, type, transformation, sagaList,
}) => (
  <>
    <CharacterName key={id} className="character">
      {`${name}`}
    </CharacterName>
    <Image src={`images/${name}.jpeg`} alt={name} />
    <CharacterDetails>
      <div>
        <span>Race: </span>
        <Race race={race}>{race}</Race>
      </div>
      <div>{`Hero or Villain: ${type}`}</div>
      <div>{`Transformation: ${transformation}`}</div>
    </CharacterDetails>
    <UlName>Sagas:</UlName>
    {
      sagaList.map(saga => (
        <Sagas key={saga.id} id={saga.id} name={saga.name} />
      ))
    }
  </>
)
