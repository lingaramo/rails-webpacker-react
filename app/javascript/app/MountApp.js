import React from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import PublicComponent from './PublicComponent'
import SignIn from './Authentication/SignIn'

const MountApp = ({ currentUser }) => {
  if  (currentUser.authenticated) {
    return(
      <Switch>
        <Route path="/user*" render={ () => <h1>User Component</h1> } />
        <Route path="/admin*" render={ () => <h1>Admin Component</h1> } />
        <Redirect from="/sign_in" to="/user" />
        <Redirect from="/sign_up" to="/user" />
        <Redirect from="/" to="/user" />
        <Route render={ () => <h1>Not Found</h1> } />
      </Switch>
    )
  } else {
    return(
      <Switch>
        <Route exact path="/" component={PublicComponent} />
        <Route exact path="/sign_in" component={ SignIn } />
        <Route exact path="/sign_up" render={ () => <h1>Sign Up Page</h1> } />
        <Redirect from="/user*" to="/" />
        <Redirect from="/admin*" to="/" />
        <Route render ={ () => <h1>Not Found</h1> } />
      </Switch>
    )
  }
}

export default MountApp
