import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

import { fetchUsersAction } from '../actions'
import UsersList from './UsersList'

class AdminComponent extends Component {

  componentDidMount() {
    this.props.dispatch(fetchUsersAction())
  }

  render() {
    const { users } = this.props
    return(
      <div>
        <h1>Search Component</h1>
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
