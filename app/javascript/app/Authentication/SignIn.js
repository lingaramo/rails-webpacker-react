import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { Form, FormGroup, FormControl, ControlLabel, Button, Col, HelpBlock } from 'react-bootstrap'

import { userAuthenticatedAction } from '../actions'
import { validateEmail, validatePassword } from '../lib/validator'
import apiV1 from '../lib/apiV1'
import style from '../style/style'

class SignIn extends Component {

  constructor(props) {
    super(props)
    this.state = {
      formErrors: {
        email: { valid: true, message: [] },
        password: { valid: true, message: [] },
        full_messages: []
      },
      email: "",
      password: ""
    }
  }

  handleChange = (e) => {
    let type = e.target.type
    let value = e.target.value || ""

    this.setState({[type]: value }, () => (this.validateByType(type)))
  }

  validateByType = (type) => {
    let validation
    switch (type) {
      case 'email':
        validation = validateEmail(this.state.email)
        break;
      case 'password':
        validation = validatePassword(this.state.password)
        break;
      default:
    }
    this.setState({ formErrors: { ...this.state.formErrors, [type]: validation }})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { formErrors } = this.state
    if ( formErrors.email.valid && formErrors.password.valid ) {
      apiV1.signIn(this.formObject()).then( response => {
        this.props.dispatch(userAuthenticatedAction(response.data))
      }).catch( error => error.json().then( errorMessage => {
        this.setState({formErrors: { ...this.state.formErrors, full_messages: errorMessage.errors }})
      }))
    }
  }

  formObject = () => {
    let { email, password } = this.state
    return({ email, password })
  }

  render() {
    return (
      <Form className={ style.FormHorizontal } horizontal>
        <FormGroup controlId="formHorizontalEmail" validationState={
          this.state.formErrors.email.valid && this.state.formErrors.full_messages.length == 0 ? null : 'error'
        }>
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl type="email" placeholder="Email" onBlur={this.handleChange} />
            { this.state.formErrors.email.message.map((error, index) => (<HelpBlock key={index}>{error}</HelpBlock>)) }
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword" validationState={
          this.state.formErrors.password.valid && this.state.formErrors.full_messages.length == 0 ? null : 'error'
        }>
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl type="password" placeholder="Password" onBlur={this.handleChange} />
            { this.state.formErrors.password.message.map((error, index) => (<HelpBlock key={index}>{error}</HelpBlock>)) }
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button onClick={this.handleSubmit} type="submit">Sign in</Button>
          </Col>
        </FormGroup>
        <Col smOffset={2}>
          { this.state.formErrors.full_messages.map((error, index) => (<HelpBlock key={index}>{error}</HelpBlock>)) }
        </Col>
      </Form>
    )
  }
}

SignIn.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect()(SignIn)
