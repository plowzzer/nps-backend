'use strict'

const { test, trait, before } = use('Test/Suite')('2. Survey')

const User = use('App/Models/User')

trait('Test/ApiClient')
trait('Auth/Client')

let user
let user2

before(async () => {
  user = await User.find(1)
  user2 = await User.find(2)
})



test('error on creating a new survey (401)', async ({client}) => {
  const response = await client.post('/surveys')
    .send({
      title: "NPS",
      description: "Just a test",
      form_introduction_text: "This is a introduction for your nps"
    })
    .end()

  response.assertStatus(401)
  response.assertJSON({
    "error": "E_INVALID_JWT_TOKEN: jwt must be provided"
  })
})

test('success on creating a new survey for user 1', async ({client}) => {
  const response = await client.post('/surveys')
    .send({
      title: "NPS",
      description: "Just a test",
      form_introduction_text: "This is a introduction for your nps"
    })
    .loginVia(user)
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    title: "NPS",
    description: "Just a test",
    form_introduction_text: "This is a introduction for your nps",
    id: 1,
    user_id: 1
  })
})

test('success on creating a new survey for user 2', async ({client}) => {
  const response = await client.post('/surveys')
    .send({
      title: "NPS 2",
      description: "Just a test",
      form_introduction_text: "This is a introduction for your nps"
    })
    .loginVia(user2)
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    title: "NPS 2",
    id: 2,
    user_id: 2
  })
})

test('success list surveys (id 1) for user 1', async ({client}) => {
  const response = await client.get('/surveys')
    .loginVia(user)
    .end()

  response.assertStatus(200)
  response.assertJSONSubset([{
    id:1,
    user_id:1,
    title:"NPS",
    description:"Just a test",
    form_introduction_text:"This is a introduction for your nps"
  }])
})

test('success list surveys (id 2) for user 2', async ({client}) => {
  const response = await client.get('/surveys')
    .loginVia(user2)
    .end()

  response.assertStatus(200)
  response.assertJSONSubset([{
    id:2,
    user_id:2,
    title:"NPS 2",
    description:"Just a test",
    form_introduction_text:"This is a introduction for your nps"
  }])
})