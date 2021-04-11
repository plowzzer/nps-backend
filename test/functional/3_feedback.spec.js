'use strict'

const { test, trait, before } = use('Test/Suite')('3. Feedback')

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

test('success giving feedbacks on a survey', async ({client}) => {
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

test('a user can not giving more then one feedback on a survey', async ({client}) => {
  const response = await client.post('/feedbacks')
    .send({
      survey_id: survey1.uuid, 
      value: 10,
      response_user: "userId1"
    })
    .end()

    response.assertStatus(500)
    response.assertJSON({
      error: "User has already answered this survey"
    })
})

test('show a feedback', async ({client}) => {
  const response = await client.get(`/feedbacks/1`)
    .loginVia(user1)
    .end()
  
  response.assertStatus(200)
  response.assertJSONSubset({
    id: 1,
    survey_id: 1,
    commentary: "Nothing to say",
    response_user: "userId1",
  })
})

test('not show a survey feedback that the user not have access', async ({client}) => {
  const response = await client.get(`/feedbacks/1`)
    .loginVia(user2)
    .end()
  
  response.assertStatus(401)
  response.assertJSON({
    error: 'User does not have access to this survey'
  })
})

// TODO : Delete feedback