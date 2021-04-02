'use strict'

const Survey = use('App/Models/Survey')

class SurveyController {

  async index ({ request, response, view }) {
    const surveys = await Survey.all()
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

  async show ({ params, request, response, view }) {
    const survey = await Survey.findOrFail(params.id)
    await survey.load('feedback')
    return survey
  }

  async update ({ params, request, response }) {
    const survey = await Survey.findOrFail(params.id)
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
    const survey = await Survey.findOrFail(params.id)

    if (survey.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    await survey.delete()
  }
}

module.exports = SurveyController
