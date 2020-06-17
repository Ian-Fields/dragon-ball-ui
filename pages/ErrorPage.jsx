import React from 'react'
import GoBack from '../components/GoBack'
import NotFound from '../components/NotFound'
import Page from '../components/Page'
import Title from '../components/Title'

export default () => (
  <Page>
    <Title />
    <GoBack />
    <NotFound
      message="Puny Earthling, looks like the page you are looking for does not exist.
       Get your power level up and do better next time."
    />
  </Page>
)
