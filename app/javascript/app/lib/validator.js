export const validateEmail = ( email ) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(String(email.value).toLowerCase())) {
    return { ...email, valid: false, message: ['Invalid email.'] }
  }
  return { ...email, valid: true, message: [] }
}

export const validatePassword = password => {
  if (password.value.length < 8 && password.value != "") {
    return { ...password, valid: false, message: ['Invalid password. Must be at least 8 characters long.'] }
  }
  return { ...password, valid: true, message: [] }
}

export const validateName = name => {
  if (name.value.length > 200) {
    return { ...name, valid: false, message: ['Name is too long (maximum is 200 characters)'] }
  }
  return { ...name, valid: true, message: [] }
}

export const validatePasswordConfirmation = (password, password_confirmation) => {
  let validation = { valid: true, message: [] }
  if ( !password_confirmation.touched ) { return password_confirmation }
  if ( password.touched && password.value != password_confirmation.value ) {
    validation.valid = false
    validation.message.push("Password doesn't match.")
  }

  if (password_confirmation.value.length < 8 && password_confirmation.value != "") {
    validation.valid = false
    validation.message.push("Password must be at least 8 characters long.")
  }

  return { ...password_confirmation, ...validation }
}
