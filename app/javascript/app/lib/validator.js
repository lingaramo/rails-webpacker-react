export const validateEmail = ( email ) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(String(email.value).toLowerCase())) {
    return { ...email, valid: false, message: ['Invalid email.'] }
  }
  return { ...email, valid: true, message: [] }
}

export const validatePassword = (password, allowBlankPassword = false) => {
  if ((password.value.length < 8 && password.value.length != 0) || (!allowBlankPassword && password.value.length == 0)) {
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
  if ( password.value != password_confirmation.value ) {
    validation.valid = false
    validation.message.push("Password doesn't match.")
  }
  return { ...password_confirmation, ...validation }
}
