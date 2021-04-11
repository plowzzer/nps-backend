'use strict'

const { test, trait, before } = use('Test/Suite')('3. Score')

const User = use('App/Models/User')
const Survey = use('App/Models/Survey')

trait('Test/ApiClient')
trait('Auth/Client')

let user1
let survey1

before(async () => {
  user1 = await User.find(1)
  survey1 = await Survey.find(1)
})

test('get score for survey', async ({ client }) => {
  const response = await client.get(`/surveys/${survey1.uuid}/score`)
    .loginVia(user1)
    .end()

  response.assertStatus(200)
  response.assertJSON({
    detractors: 0,
    nps: 50,
    promoters: 1,
    totalAnswers: 2
  })
})
