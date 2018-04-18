import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import NavBar from './NavBar/NavBar'
import MountApp from './MountApp'

import { Grid, Row, Col } from 'react-bootstrap'

class App extends Component {
  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <NavBar />
        </Row>

        <Row className="show-grid">
          <MountApp currentUser={this.props.currentUser} />
        </Row>
      </Grid>
    )
  }
}

App.propTypes = {
  currentUser: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return{
    currentUser: state.currentUser
  }
}

export default withRouter(connect(mapStateToProps)(App))
