import React from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router-dom'

import { Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const UnLoggedUserNavItems = ({ history }) => {

  return(
    <Nav pullRight>
      <LinkContainer to='/sign_in'>
        <NavItem eventKey={1}>
          Sign In
        </NavItem>
      </LinkContainer>

      <LinkContainer to='/sign_up'>
        <NavItem eventKey={2}>
          Sign Up
        </NavItem>
      </LinkContainer>
    </Nav>
  )
}

UnLoggedUserNavItems.propTypes = {
  history: PropTypes.object.isRequired,
}


export default withRouter(UnLoggedUserNavItems)
