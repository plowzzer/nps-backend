'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SurveySchema extends Schema {
  up () {
    this.create('surveys', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('title').notNullable()
      table.string('description')
      table.string('form_introduction_text')
      table.timestamps()
    })
  }

  down () {
    this.drop('surveys')
  }
}

module.exports = SurveySchema
