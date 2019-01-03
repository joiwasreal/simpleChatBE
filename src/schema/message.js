module.exports = {
  type: 'object',
  required: ['message'],
  properties: {
    message: {
      type: 'string',
      minLength: 1,
      maxLength: 500
    }
  }
}
