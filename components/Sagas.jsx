import React from 'react'
import styled from 'styled-components'

const Sagas = styled.li`
  font-size: 20px;
  list-style-position: inside;
  padding: 4px 0;
  text-align: center;
`

export default ({ id, name }) => (
  <Sagas key={id}>{name}</Sagas>
)
