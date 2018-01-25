import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { SchoolClass, SignIn, ClassContainer, NewClass, NewStudent, Student } from './containers'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={ClassContainer} />
        <Route exact path="/classes/new" component={NewClass} />
        <Route exact path="/classes/:classid/students/:studentid" component={Student} />
        <Route exact path="/classes/:classid/students" component={NewStudent} />
        <Route exact path="/classes/:classid" component={SchoolClass} />
        <Route path="/sign-in" component={SignIn} />
      </div>
    )
  }
}
