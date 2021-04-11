'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Survey extends Model {
  static boot() {
    super.boot();
    this.addHook("beforeCreate", "SurveyHook.uuid");
  }

  user () {
    return this.belongsTo('App/Models/User')
  }

  feedbacks () {
    return this.hasMany('App/Models/Feedback')
  }
}

module.exports = Survey
