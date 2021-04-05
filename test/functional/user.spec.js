'use strict'

const { test, trait } = use('Test/Suite')('User')
const User = use('App/Models/User')

trait('Test/ApiClient')

test('creating a new user', async ({client}) => {
  const response = await client.post('/users')
    .send({
      username: 'userTest',
      email: 'user@test.com',
      password: 'password',
    })
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    username: 'userTest',
    email: 'user@test.com',
    id: 1
  })
})