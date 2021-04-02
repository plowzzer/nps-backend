'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FeedbackSchema extends Schema {
  up () {
    this.create('feedbacks', (table) => {
      table.increments()
      table
        .integer('survey_id')
        .unsigned()
        .references('id')
        .inTable('surveys')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('value').notNullable()
      table.string('response_user').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('feedbacks')
  }
}

module.exports = FeedbackSchema
