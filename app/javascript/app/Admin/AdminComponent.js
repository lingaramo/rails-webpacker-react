import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

import { fetchUsersAction } from '../actions'
import UsersList from './UsersList'
import SearchComponent from './SearchComponent'

class AdminComponent extends Component {

  componentDidMount() {
    this.props.dispatch(fetchUsersAction())
  }

  render() {
    const { users } = this.props
    return(
      <div>
        <SearchComponent />
        <Link to='/admin/user/new'><Button>New User</Button></Link>
        <UsersList users={ users } />
      </div>
    )
  }
}

AdminComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return({
    users: state.users
  })
}

export default withRouter(connect(mapStateToProps)(AdminComponent))
