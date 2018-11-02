const Knex = require('knex')
const { NODE_ENV = 'development' } = process.env
const knex = Knex(require('../knexfile')[NODE_ENV])
module.exports = knex
