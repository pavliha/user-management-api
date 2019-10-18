'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments()
      table.string('name', 80).notNullable().unique()
      table.string('avatar_url', 254)
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('skype', 254)
      table.string('signature', 254)
      table.boolean('is_active')
      table.string('role', 254).defaultTo('user')
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
