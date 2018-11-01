const { Model } = require('objection')
const Knex = require('knex')
const { NODE_ENV = 'development' } = process.env
const knex = Knex(require('../knexfile')[NODE_ENV])
Model.knex(knex)
module.exports = knex
