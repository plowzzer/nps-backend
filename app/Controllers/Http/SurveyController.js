'use strict'

const Survey = use('App/Models/Survey')

class SurveyController {

  async index ({ auth, request, response, view }) {
    const surveys = await Survey
      .query()
      .where('user_id', auth.user.id)
      .fetch()
    return surveys
  }

  async store ({ auth, request, response }) {
    const {id} = auth.user
    const data = request.only([
      'title',
      'description',
      'form_introduction_text'
    ])

    const survey = await Survey.create({...data, user_id: id})
    return survey
  }

  async show ({ auth, params, request, response, view }) {
    const survey = await Survey.findByOrFail('uuid', params.uuid)
    
    if (survey.user_id !== auth.user.id){
      return response.status(401).send({ error: 'User does not have access to this survey' })
    }
    
    await survey.load('feedbacks')
    return survey
  }

  async update ({ auth, params, request, response }) {
    const survey = await Survey.findByOrFail('uuid', params.uuid)
    
    if (survey.user_id !== auth.user.id){
      return response.status(401).send({ error: 'User does not have access to this survey' })
    }

    const data = request.only([
      'title',
      'description',
      'form_introduction_text'
    ])
    survey.merge(data)
    await survey.save()
    return survey
  }

  async destroy ({ params, request, response }) {
    const survey = await Survey.findByOrFail('uuid', params.uuid)

    if (survey.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    await survey.delete()
  }
}

module.exports = SurveyController
