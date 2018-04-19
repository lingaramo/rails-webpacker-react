import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { fetchUsersAction } from '../actions'

class AdminComponent extends Component {

  componentDidMount() {
    this.props.dispatch(fetchUsersAction())
  }

  render() {
    return(
      <div>
        <h1>Search Component</h1>
        <h1>Users List Component</h1>
      </div>
    )
  }
}

AdminComponent.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(AdminComponent)
