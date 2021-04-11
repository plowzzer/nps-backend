'use strict'

const Survey = use('App/Models/Survey')
const Feedback = use('App/Models/Feedback')

class FeedbackController {

  async store ({ request, response }) {    
    const data = request.only([
      'survey_id',
      'value',
      'commentary',
      'response_user'
    ])

    const survey = await Survey.findBy('uuid', data.survey_id)
    if (!survey) {
      return response.status(500).send({ error: 'This survey does not exists' })
    }

    const response_user = await Survey
      .query()
      .where('uuid', data.survey_id)
      .whereHas('feedbacks', (feedback) => {
        feedback.where('response_user', data.response_user)
      })
      .fetch()
    
    if (response_user.rows.length > 0) {
      return response.status(500).send({ error: 'User has already answered this survey' })
    }
    
    const feedback = await Feedback.create({...data, survey_id: survey.id})
    return feedback
  }

  async show ({ auth, params, request, response }) {
    const feedback = await Feedback.findOrFail(params.id)
    await feedback.load('survey')

    const feedbackReturn = feedback.toJSON()
    
    const survey = await Survey.findByOrFail('uuid', feedbackReturn.survey.uuid)

    if (survey.user_id !== auth.user.id){
      return response.status(401).send({ error: 'User does not have access to this survey' })
    }

    return feedback
  }

  async destroy ({ params, request, response }) {
    const feedback = await Feedback.findOrFail(params.id)
    await feedback.delete()
    return response.status(201).send({ message: 'Feedback successfully deleted' })
  }
}

module.exports = FeedbackController
