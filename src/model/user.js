const credentials = require('./credentials')
const name = require('./name')

module.exports = {
  ...credentials,
  ...name
}
