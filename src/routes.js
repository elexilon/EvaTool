import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import SignIn from './containers/SignIn'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={SignIn} />
        <Route path="/sign-in" component={SignIn} />
      </div>
    )
  }
}
