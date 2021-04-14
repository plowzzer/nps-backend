'use strict'

const Survey = use('App/Models/Survey')
const Feedback = use('App/Models/Feedback')
const Nps = use('App/Helpers/Nps')

class ScoreController {
  async index ({auth, params, request, response}) {
    const query = await Survey.findByOrFail('uuid', params.uuid)
    
    if (query.user_id !== auth.user.id){
      return response.status(500).send({ error: 'User does not have access to this survey' })
    }

    await query.load('feedbacks')
    
    const survey = query.toJSON()
    
    const totalAnswers = survey.feedbacks.length

    const detractors = survey.feedbacks.filter(survey => {
      return survey.value >= 0 && survey.value <= 6
    }).length;

    const promoters = survey.feedbacks.filter(survey => {
      return survey.value >= 9 && survey.value <= 10
    }).length;

    const nps = Nps.score(promoters, detractors, totalAnswers)

    return {
      nps,
      detractors,
      promoters,
      totalAnswers
    }
  }
}

module.exports = ScoreController
