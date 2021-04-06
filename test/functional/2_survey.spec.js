'use strict'

const { test, trait, before } = use('Test/Suite')('2. Survey')

const User = use('App/Models/User')
const Surrvey = use('App/Models/Survey')

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
    error: "E_INVALID_JWT_TOKEN: jwt must be provided"
  })
})

test('success on creating two new survey for user 1', async ({client}) => {
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

  await client.post('/surveys')
    .send({
      title: "NPS 2",
      description: "Just a test",
      form_introduction_text: "This is a introduction for your nps"
    })
    .loginVia(user)
    .end()
})

test('success on creating two new survey for user 2', async ({client}) => {
  const response = await client.post('/surveys')
    .send({
      title: "NPS 3",
      description: "Just a test",
      form_introduction_text: "This is a introduction for your nps"
    })
    .loginVia(user2)
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    title: "NPS 3",
    id: 3,
    user_id: 2
  })

  await client.post('/surveys')
    .send({
      title: "NPS 4",
      description: "Just a test",
      form_introduction_text: "This is a introduction for your nps"
    })
    .loginVia(user2)
    .end()
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
  },
  {
    id:2,
    user_id:1,
    title:"NPS 2",
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
    id:3,
    user_id:2,
    title:"NPS 3",
    description:"Just a test",
    form_introduction_text:"This is a introduction for your nps"
  },
  {
    id:4,
    user_id:2,
    title:"NPS 4",
    description:"Just a test",
    form_introduction_text:"This is a introduction for your nps"
  }])
})

test('user 1 can not see list of user 2', async ({client}) => {
  const survey = await Surrvey.find(3)

  const response = await client.get(`/surveys/${survey.uuid}`)
    .loginVia(user)
    .end()

  response.assertStatus(401)
  response.assertJSON({
    error: "User does not have access to this survey"
  })
})

test('see details of the list', async ({client}) => {
  const survey = await Surrvey.find(1)

  const response = await client.get(`/surveys/${survey.uuid}`)
    .loginVia(user)
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    title: "NPS",
    uuid: survey.uuid,
    user_id: 1,
    id: 1,
    feedbacks: []
  })
})

test('change survey title', async ({client}) => {
  const survey = await Surrvey.find(1)

  const response = await client.patch(`/surveys/${survey.uuid}`)
    .send({
      title: "NPS The first"
    })
    .loginVia(user)
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    title: "NPS The first"
  })
})