'use strict'

const { test, trait, before } = use('Test/Suite')('2. Survey')

const User = use('App/Models/User')
const Survey = use('App/Models/Survey')
const Feedback = use('App/Models/Feedback')

trait('Test/ApiClient')
trait('Auth/Client')

let user1
let user2
let survey1
let survey2

before(async () => {
  user1 = await User.find(1)
  user2 = await User.find(2)
  survey1 = await Survey.find(1)
  survey2 = await Survey.find(3)
})

test('success give feedback on survey', async ({client}) => {
  const response = await client.post('/feedbacks')
    .send({
      survey_id: survey1.uuid, 
      value: 10,
      commentary: "Nothing to say",
      response_user: "userId1"
    })
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    survey_id: 1, 
    value: 10,
    response_user: "userId1"
  })

  const response1 = await client.post('/feedbacks')
    .send({
      survey_id: survey1.uuid, 
      value: 7,
      response_user: "userId2"
    })
    .end()

  response1.assertStatus(200)
  response1.assertJSONSubset({
    survey_id: 1, 
    value: 7,
    response_user: "userId2"
  })
})