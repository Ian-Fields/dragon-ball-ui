import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Characters from './pages/Characters'
import Error from './pages/ErrorPage'
import CharacterSagas from './pages/CharacterSagas'

render(

  <BrowserRouter>
    <Switch>
      <Route path="/characters" component={CharacterSagas} />
      <Route exact path="/" component={Characters} />
      <Route path="*" component={Error} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
)
