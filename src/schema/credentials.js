module.exports = {
  type: 'object',
  required: ['username', 'password'],
  properties: {
    username: {
      type: 'string',
      pattern: '^[a-z0-9]+$',
      minLength: 4,
      maxLength: 20
    },
    password: { type: 'string' }
  }
}
