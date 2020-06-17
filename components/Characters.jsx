import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const CharacterDetails = styled.div`
  font-size: 16px;
  margin-bottom: 20px;
  text-align: center;
`
const Link = styled(NavLink)`
  color: white;   
`

export default ({ name }) => (
  <CharacterDetails>
    <Link to={`/characters/${name}`}>{`${name}`}</Link>
  </CharacterDetails>
)
