const credentials = require('./credentials')
const name = require('./name')

module.exports = {
  type: 'object',
  allOf: [
    credentials,
    name
  ]
}
