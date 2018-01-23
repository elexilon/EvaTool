import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import { SignIn, SignUp } from './containers'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/"  />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
      </div>
    )
  }
}
