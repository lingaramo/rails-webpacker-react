import React from 'react'
import PropTypes from 'prop-types'

import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { Navbar, NavItem, Nav } from 'react-bootstrap'

import LoggedUserNavItems from './LoggedUserNavItems'
import UnLoggedUserNavItems from './UnLoggedUserNavItems'

const NavBar = ({ currentUser }) => {
  return(
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to='/'>App name</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>

      <Navbar.Collapse>
        { currentUser.authenticated ?
          <LoggedUserNavItems currentUser={currentUser} />
          :
          <UnLoggedUserNavItems />
        }
      </Navbar.Collapse>
    </Navbar>
  )
}

NavBar.propTypes = {
  currentUser: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default withRouter(connect(mapStateToProps)(NavBar))
