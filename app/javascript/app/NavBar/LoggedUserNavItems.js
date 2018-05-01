import React from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Nav, NavItem } from 'react-bootstrap'

import apiV1 from '../lib/apiV1'
import { userLogoutAction } from '../actions'

const LoggedUserNavItems = ({ currentUser, history, dispatch }) => {

  if (!currentUser.authenticated) { return null }

  const signOut = () => {
    apiV1.signOut()
    dispatch(userLogoutAction())
  }

  const adminItems = (
    <NavItem eventKey={1} href="#" onSelect={() => history.push('/admin')}>
      Admin Panel
    </NavItem>
  )

  return(
    <Nav pullRight>
      { ['manager', 'admin'].includes(currentUser.role) ? adminItems : null }
      <NavItem eventKey={2} href="#" onSelect={() => history.push('/user/profile')} >
        Profile
      </NavItem>
      <NavItem eventKey={3} href="#" onSelect={() => signOut()} >
        Logout
      </NavItem>
    </Nav>
  )
}

LoggedUserNavItems.propTypes = {
  history: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default withRouter(connect()(LoggedUserNavItems))
