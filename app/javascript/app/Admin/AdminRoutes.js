import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

import AdminComponent from './AdminComponent'
import LoadUser from './LoadUser'
import NewUser from './NewUser'

const AdminRoutes = props => {
  if (props.currentUser.role == 'user') {
    return(<Redirect to="/not_authorized" />)
  }

  return(
    <Switch>
      <Route exact path="/admin" component={AdminComponent} />
      <Route exact path="/admin/user/new" component={NewUser} />
      <Route path="/admin/user/:id/edit" component={LoadUser} />
      <Redirect to="/not_found" />
    </Switch>
  )
}

AdminRoutes.propTypes = {
  history: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return({
    currentUser: state.currentUser
  })
}

export default withRouter(connect(mapStateToProps)(AdminRoutes))
