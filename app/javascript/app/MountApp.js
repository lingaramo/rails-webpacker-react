import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

import PublicComponent from './PublicComponent'
import SignIn from './Authentication/SignIn'
import SignUp from './Authentication/SignUp'
import UserRoutes from './User/UserRoutes'
import AdminRoutes from './Admin/AdminRoutes'
import HandleRestOfRoutes from './HandleRestOfRoutes'

const MountApp = ({ currentUser }) => {
  if  (currentUser.authenticated) {
    return(
      <Switch>
        <Route path="/user*" component={ UserRoutes } />
        <Route path="/admin*" component={ AdminRoutes } />
        <Redirect from="/sign_in" to="/user" />
        <Redirect from="/sign_up" to="/user" />
        <Redirect exact from="/" to="/user" />
        <Route component={ HandleRestOfRoutes } />
      </Switch>
    )
  } else {
    return(
      <Switch>
        <Route exact path="/" component={PublicComponent} />
        <Route exact path="/sign_in" component={ SignIn } />
        <Route exact path="/sign_up" component={ SignUp } />
        <Redirect from="/user*" to="/sign_in" />
        <Redirect from="/admin*" to="/sign_in" />
        <Route component={ HandleRestOfRoutes } />
      </Switch>
    )
  }
}

MountApp.propTypes = {
  currentUser: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return{
    currentUser: state.currentUser
  }
}

export default withRouter(connect(mapStateToProps)(MountApp))
