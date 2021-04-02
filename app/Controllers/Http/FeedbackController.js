'use strict'

const Survey = use('App/Models/Survey')
const Feedback = use('App/Models/Feedback')

class FeedbackController {

  // async index ({ request, response, view }) {

  // }

  async store ({ request, response }) {    
    const data = request.only([
      'survey_id',
      'value',
      'response_user'
    ])

    const survey_id = await Survey.find(data.survey_id)
    if (!survey_id) {
      return response.status(500).send({ error: 'This survey does not exists' })
    }

    const response_user = await Feedback.findBy('response_user', data.response_user)
    if (response_user) {
      return response.status(500).send({ error: 'User has already answered this survey' })
    }
    
    const feedback = await Feedback.create({...data, survey_id: survey})
    return feedback
  }

  async show ({ params, request, response, view }) {
    const feedback = await Feedback.findOrFail(params.id)
    await feedback.load('survey')
    return feedback
  }

  // async update ({ params, request, response }) {
  // }

  async destroy ({ params, request, response }) {
    const feedback = await Feedback.findOrFail(params.id)
    await feedback.delete()
    return response.status(201).send({ message: 'Feedback successfully deleted' })
  }
}

module.exports = FeedbackController