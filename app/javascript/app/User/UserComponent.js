import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const UserComponent = ({ currentUser }) => {
  return(
    <div>
      <ul>
        { Object.keys(currentUser).map( (key, index) => (<li key={index}>{key}: {`${currentUser[key]}`}</li>) ) }
      </ul>
    </div>
  )
}

UserComponent.propTypes = {
  currentUser: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return({
    currentUser: state.currentUser
  })
}

export default withRouter(connect(mapStateToProps)(UserComponent))
