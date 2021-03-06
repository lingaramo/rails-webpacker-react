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
    let initialObject = { value: "", touched: false, valid: true, message: [] }
    this.state = {
      email: initialObject,
      password: initialObject,
      full_messages: [],
      passwordResetMessage: undefined
    }
  }

  handleChange = (e) => {
    let type = e.target.name
    let value = e.target.value || ""

    this.setState({ [type]: { ...this.state[type], value: value }})
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
    this.setState({ [type]: validation, full_messages: [] })
    return validation.valid
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if ( this.validateForm() ) {
      apiV1.signIn(this.formObject()).then( response => {
        this.props.dispatch(userAuthenticatedAction(response.data))
      }).catch( error => error.json().then( errorMessage => {
        this.setState({ full_messages: errorMessage.errors })
      }))
    }
  }

  handleReset = (e) => {
    e.preventDefault()
    const { email } = this.state
    if ( this.validateForm(['email']) ) {
      apiV1.requestPasswordReset({ email: email.value }).then( res =>
        this.setState({
          passwordResetMessage: `Password reset instructions sent to ${this.state.email.value}`
        })
      ).catch(error => error.json().then(errorMessage => {
        this.setState({ full_messages: errorMessage.errors })
      }))
    }
  }

  validateForm = (fields = ['email', 'password']) => {
    let valid = true
    let fieldIsValid
    fields.forEach( field => {
      fieldIsValid = this.validateByType(field)
      valid = valid && fieldIsValid
    })
    return valid
  }

  formObject = () => {
    let { email, password } = this.state
    return({
      email: email.value,
      password: password.value
    })
  }

  render() {
    return (
      <Form className={ style.FormHorizontal } horizontal>
        <FormGroup controlId="formHorizontalEmail" validationState={
          this.state.email.valid && this.state.full_messages.length == 0 ? null : 'error'
        }>
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl type="email" name="email" placeholder="Email" onBlur={this.handleChange} />
            { this.state.email.message.map((error, index) => (<HelpBlock key={index}>{error}</HelpBlock>)) }
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword" validationState={
          this.state.password.valid && this.state.full_messages.length == 0 ? null : 'error'
        }>
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl type="password" name="password" placeholder="Password" onBlur={this.handleChange} />
            { this.state.password.message.map((error, index) => (<HelpBlock key={index}>{error}</HelpBlock>)) }
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button onClick={this.handleSubmit} type="submit">Sign in</Button>
            <Button onClick={this.handleReset} type="submit">Recovery password</Button>
          </Col>
        </FormGroup>
        <Col smOffset={2}>
          { this.state.full_messages.map((error, index) => (<HelpBlock key={index}>{error}</HelpBlock>)) }
          { this.state.passwordResetMessage ?
            <HelpBlock>{this.state.passwordResetMessage}</HelpBlock>
            :
            null
          }
        </Col>
      </Form>
    )
  }
}

SignIn.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect()(SignIn)
