import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Form, FormGroup, FormControl, ControlLabel, Button, Col, HelpBlock } from 'react-bootstrap'

import { validateTokenAction, invalidateUsersList } from '../actions'
import { validateEmail, validatePassword, validatePasswordConfirmation, validateName } from '../lib/validator'
import apiV1 from '../lib/apiV1'
import style from '../style/style'

class EditUser extends Component {
  constructor(props) {
    super(props)
    let initialObject = { value: "", valid: true, message: [] }
    this.apiAction
    this.state = {
      name: {
        value: (props.name || ""),
        initialValue: (props.name || ""),
        valid: true,
        message: []
      },
      email: {
        value: (props.email || ""),
        initialValue: (props.email || ""),
        valid: true,
        message: []
      },
      password: initialObject,
      password_confirmation: initialObject,
      role: {
        value: (props.role || "user"),
        initialValue: (props.role || "user"),
        valid: true,
        message: []
      },
      passwordResetMessage: undefined,
      full_messages: [],
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
      case 'name':
        validation = validateName(this.state.name)
        break
      case 'email':
        validation = validateEmail(this.state.email)
        break
      case 'password':
        validation = validatePassword(this.state.password, this.props.allowBlankPassword)
        this.validateByType('password_confirmation')
        break
      case 'password_confirmation':
        validation = validatePasswordConfirmation(this.state.password, this.state.password_confirmation)
        break
      default:
    }
    this.setState({ [type]: validation, full_messages: [] })
    return validation.valid
  }

  validateForm = (fields = ['name', 'email', 'password', 'password_confirmation']) => {
    let valid = true
    let fieldIsValid
    fields.forEach( field => {
      fieldIsValid = this.validateByType(field)
      valid = valid && fieldIsValid
    })
    return valid
  }

  formWasUpdated = () => {
    const { name, email, role, password } = this.state
    return(
      name.value != name.initialValue ||
      email.value != email.initialValue ||
      role.value != role.initialValue ||
      password.value.length != 0
    )
  }

  performRequest = () => {
    const { userId, history, action, redirectTo } = this.props

    if (action == 'create') {
      return apiV1.createUser( this.formObject() )
    }
    if (action == 'update' && this.formWasUpdated()) {
        return apiV1.updateUser( userId, this.formObject() )
    } else {
      history.push(redirectTo)
      return new Promise(() => {})
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { userId, dispatch, history, currentUser, users, action, redirectTo } = this.props
    if ( this.validateForm()) {
      let apiResponse = this.performRequest()
      apiResponse.then( response => {
        if (currentUser.id == userId) { dispatch(validateTokenAction()) } // Pasword or uid could be changed
        if (users.data.find( user => user.id == userId)) {
          dispatch(invalidateUsersList())
        }
        history.push(redirectTo)
      }).catch( error => error.json().then( errorMessage => {
        this.setState({ full_messages: errorMessage.errors.full_messages })
      }))
    }
  }

  handleReset = (e) => {
    e.preventDefault()
    const { email } = this.state
    if ( this.validateForm(['email']) ) {
      if (window.confirm('Do you really want to reset password?')) {
        apiV1.requestPasswordReset({ email: email.value }).then( res =>
          this.setState({
            passwordResetMessage: `Password reset instructions sent to ${this.state.email.value}`
          })
        ).catch(error => error.json().then(errorMessage => {
          this.setState({ full_messages: errorMessage.errors })
        }))
      }
    }
  }

  formObject = () => {
    let { name, email, password, password_confirmation, role } = this.state
    let payload = {user: { name: name.value, email: email.value, role: role.value }}
    if (password.value != "" && password_confirmation.value != "") {
      payload['user']['password'] = password.value
      payload['user']['password_confirmation'] = password_confirmation.value
    }
    return payload
  }

  render() {
    const { name, email, role } = this.state
    const { currentUser, action } = this.props
    const RoleSelector = () => {
      if (currentUser.role == 'admin') {
        return(
          <FormGroup controlId="formControlsSelect">
            <Col componentClass={ControlLabel} sm={3}>
              Role
            </Col>
            <Col sm={9}>
              <FormControl type="select" name="role" componentClass="select"
                placeholder="select" defaultValue={role.value} onChange={this.handleChange}
                >
                <option value="user">User</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </FormControl>
            </Col>
          </FormGroup>
        )
      } else {
        return null
      }
    }

    const capitalizedAction = action[0].toUpperCase() + action.slice(1);

    return (
      <Form className={ style.FormHorizontal } horizontal>
        <FormGroup controlId="formHorizontalName" validationState={
          this.state.name.valid && this.state.full_messages.length == 0 ? null : 'error'
        }>
          <Col componentClass={ControlLabel} sm={3}>
            Name (optional)
          </Col>
          <Col sm={9}>
            <FormControl type="name" name="name" placeholder="Name" defaultValue={name.value} onBlur={this.handleChange} />
            { this.state.name.message.map((error, index) => (<HelpBlock key={index}>{error}</HelpBlock>)) }
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalEmail" validationState={
          this.state.email.valid && this.state.full_messages.length == 0 ? null : 'error'
        }>
          <Col componentClass={ControlLabel} sm={3}>
            Email
          </Col>
          <Col sm={9}>
            <FormControl type="email" name="email" placeholder="Email" defaultValue={email.value} onBlur={this.handleChange} />
            { this.state.email.message.map((error, index) => (<HelpBlock key={index}>{error}</HelpBlock>)) }
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword" validationState={
          this.state.password.valid && this.state.full_messages.length == 0 ? null : 'error'
        }>
          <Col componentClass={ControlLabel} sm={3}>
            Password
          </Col>
          <Col sm={9}>
            <FormControl type="password" name="password" placeholder="Password" onBlur={this.handleChange} />
            { this.state.password.message.map((error, index) => (<HelpBlock key={index}>{error}</HelpBlock>)) }
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPasswordConfirmation" validationState={
          this.state.password_confirmation.valid && this.state.full_messages.length == 0 ? null : 'error'
        }>
          <Col componentClass={ControlLabel} sm={3}>
            Password Confirmation
          </Col>
          <Col sm={9}>
            <FormControl type="password" name="password_confirmation" placeholder="Confirm Password" onBlur={this.handleChange} />
            { this.state.password_confirmation.message.map((error, index) => (<HelpBlock key={index}>{error}</HelpBlock>)) }
          </Col>
        </FormGroup>

        <RoleSelector />

        <FormGroup>
          <Col smOffset={3} sm={9}>
            <Button onClick={this.handleSubmit} type="submit">{capitalizedAction}</Button>
            { this.props.action == 'update' ?
              <Button onClick={this.handleReset} type="submit">Reset password</Button>
              :
              null
            }
          </Col>
        </FormGroup>

        <Col smOffset={3}>
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

EditUser.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  redirectTo: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
}

const mapStateToProps = state => {
  return({
    currentUser: state.currentUser,
    users: state.users
  })
}

export default withRouter(connect(mapStateToProps)(EditUser))
