if (process.env.NODE_ENV === 'production') {
  debugger
  module.exports = require('./configureStore.prod')
} else {
  module.exports = require('./configureStore.dev')
}
