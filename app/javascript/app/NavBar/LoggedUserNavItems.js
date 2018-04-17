import React from 'react'
import PropTypes from 'prop-types'

import { Nav, NavItem } from 'react-bootstrap'

const LoggedUserNavItems = ({ currentUser, history }) => {

  if (!currentUser.authenticated) { return null }

  const adminItems = (
    <NavItem eventKey={1} href="#">
      Link Right
    </NavItem>
  )

  return(
    <Nav pullRight>
      { ['manager', 'admin', undefined].includes(currentUser.role) ? adminItems : null }
      <NavItem eventKey={2} href="#">
        Logout
      </NavItem>
    </Nav>
  )
}

LoggedUserNavItems.propTypes = {
  history: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired
}



export default LoggedUserNavItems
