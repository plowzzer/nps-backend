'use strict'

const { test, trait } = use('Test/Suite')('1. User')

trait('Test/ApiClient')

test('creating a new user (1)', async ({client}) => {
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

test('creating a new user (2)', async ({client}) => {
  const response = await client.post('/users')
    .send({
      username: 'userTest2',
      email: 'user2@test.com',
      password: 'password',
    })
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    username: 'userTest2',
    email: 'user2@test.com',
    id: 2
  })
})

test('error on creating a new user with a existing email', async ({client}) => {
  const response = await client.post('/users')
    .send({
      username: 'userTest2',
      email: 'user@test.com',
      password: 'password',
    })
    .end()

  response.assertStatus(500)
  response.assertError({
    error: 'Email already registred'
  })  
})