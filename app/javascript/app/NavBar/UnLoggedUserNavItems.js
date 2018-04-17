import React from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router-dom'

import { Nav, NavItem } from 'react-bootstrap'

const UnLoggedUserNavItems = ({ history }) => {

  return(
    <Nav pullRight>
      <NavItem eventKey={1} onSelect={() => (history.push('/sign_in'))}>
        Sign In
      </NavItem>
      <NavItem eventKey={2} onSelect={() => (history.push('/sign_up'))}>
        Sign Up
      </NavItem>
    </Nav>
  )
}

UnLoggedUserNavItems.propTypes = {
  history: PropTypes.object.isRequired,
}


export default withRouter(UnLoggedUserNavItems)
