// class Validator {
//
//   validate( form ) {
//     this.form = form
//     this.errorMessage = {}
//     for (var key in this.form) {
//       this.validateByType(key)
//     }
//     if (Object.keys(this.errorMessage) == 0) {
//       return true
//     } else {
//       return false
//     }
//   }
//
//   validateByType( field ) {
//     switch ( field ) {
//       case 'email':
//         this.validateEmail( this.form.email )
//         break
//       case 'password':
//         this.validatePassword( this.form.password )
//         break
//       default:
//     }
//   }
//
//   setErrorMessage( field, message ) {
//     if (this.errorMessage[field]) {
//       this.errorMessage[field].push('Invalid email.')
//     } else {
//       this.errorMessage[field] = ['Invalid email.']
//     }
//   }
//
//   validateEmail( value ) {
//     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     if (!re.test(String(value).toLowerCase())) {
//       this.setErrorMessage( 'email', 'Invalid email' )
//     }
//   }
//
//   validatePassword( value ) {
//     if (value.length < 8) {
//       this.setErrorMessage( 'password', 'Invalid password' )
//     }
//   }
// }
//
// export default new Validator()

// const validator = {
//   errorMessage: {},
//   validateEmail: (value) => {
//     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     if (!re.test(String(value).toLowerCase())) {
//       this.errorMessage['email'] = 'Invalid email'
//     }
//   },
//   validatePassword: (value) => {
//     if (value.length < 8) {
//       this.errorMessage['password'] =  'Invalid password'
//     }
//   },
// }
//
// export default validator

export const validateEmail = ( email ) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(String(email.value).toLowerCase())) {
    return { ...email, valid: false, message: ['Invalid email.'] }
  }
  return { ...email, valid: true, message: [] }
}

export const validatePassword = password => {
  if (password.value.length < 8) {
    return { ...password, valid: false, message: ['Invalid password. Must be at least 8 characters long.'] }
  }
  return { ...password, valid: true, message: [] }
}

export const validatePasswordConfirmation = (password, password_confirmation) => {
  let validation = { valid: true, message: [] }
  if ( !password_confirmation.touched ) { return password_confirmation }
  if ( password.touched && password.value != password_confirmation.value ) {
    validation.valid = false
    validation.message.push("Password doesn't match.")
  }

  if (password_confirmation.value.length < 8 ) {
    validation.valid = false
    validation.message.push("Password must be at least 8 characters long.")
  }

  return { ...password_confirmation, ...validation }
}
