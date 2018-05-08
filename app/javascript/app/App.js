import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Grid, Row } from 'react-bootstrap'

import NavBar from './NavBar/NavBar'
import MountApp from './MountApp'
import { validateTokenAction } from './actions'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(validateTokenAction())
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <NavBar />
        </Row>

        <Row className="show-grid">
          <MountApp />
        </Row>
      </Grid>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default withRouter(connect()(App))
