'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Survey extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  feedback () {
    return this.hasMany('App/Models/Feedback')
  }
}

module.exports = Survey
