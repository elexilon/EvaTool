import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { SchoolClass, SignIn, ClassContainer} from './containers'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={ClassContainer} />
        <Route path="/classes" component={ClassContainer} />
        <Route path="/classes/:classid" component={SchoolClass} />
        <Route path="/sign-in" component={SignIn} />
      </div>
    )
  }
}
