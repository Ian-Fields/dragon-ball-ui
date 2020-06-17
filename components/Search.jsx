import React from 'react'
import styled from 'styled-components'

const SearchBar = styled.input`
margin: 25px 0;
`

export default ({ term, setter }) => (
  <SearchBar type="text" name="search" value={term} onChange={event => setter(event.target.value)} />
)
