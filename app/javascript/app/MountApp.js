import React from 'react'
import PropTypes from 'prop-types'

import { Switch, Route, Redirect } from 'react-router-dom'

import PublicComponent from './PublicComponent'
import SignIn from './Authentication/SignIn'
import SignUp from './Authentication/SignUp'
import UserComponent from './User/UserComponent'
import HandleRestOfRoutes from './HandleRestOfRoutes'

const MountApp = ({ currentUser }) => {
  if  (currentUser.authenticated) {
    return(
      <Switch>
        <Route path="/user*" component={ UserComponent } />
        <Route path="/admin*" render={ () => <h1>Admin Component</h1> } />
        <Redirect from="/sign_in" to="/user" />
        <Redirect from="/sign_up" to="/user" />
        <Redirect from="/" to="/user" />
        <Route component={ HandleRestOfRoutes } />
      </Switch>
    )
  } else {
    return(
      <Switch>
        <Route exact path="/" component={PublicComponent} />
        <Route exact path="/sign_in" component={ SignIn } />
        <Route exact path="/sign_up" component={ SignUp } />
        <Redirect from="/user*" to="/" />
        <Redirect from="/admin*" to="/" />
        <Route component={ HandleRestOfRoutes } />
      </Switch>
    )
  }
}

MountApp.propTypes = {
  currentUser: PropTypes.object.isRequired
}

export default MountApp
