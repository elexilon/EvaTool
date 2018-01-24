import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { SchoolClass, SignIn, ClassContainer, NewClass} from './containers'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={ClassContainer} />
        <Route exact path="/schoolclasses/new" component={NewClass} />
        <Route path="/classes/:classid" component={SchoolClass} />
        <Route path="/sign-in" component={SignIn} />
      </div>
    )
  }
}
