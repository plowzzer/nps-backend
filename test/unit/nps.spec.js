'use strict'

const { test } = use('Test/Suite')('Nps')
const Nps = use('App/Helpers/Nps')

test('Only promoters votinng (nps = 100)', async ({ assert }) => {
  const promoters = 10
  const detractors = 0
  const totalAnswers = 10

  const nps = Nps.score(promoters, detractors, totalAnswers)
  assert.equal(nps, 100)
})

test('Same number of promoters and detractors (nps = 0)', async ({ assert }) => {
  const promoters = 5
  const detractors = 5
  const totalAnswers = 15

  const nps = Nps.score(promoters, detractors, totalAnswers)
  assert.equal(nps, 0)
})

test('75% of promoters and 25% of detractors (nps = 50)', async ({ assert }) => {
  const promoters = 75
  const detractors = 25
  const totalAnswers = 100

  const nps = Nps.score(promoters, detractors, totalAnswers)
  assert.equal(nps, 50)
})

test('A few promoters and a few neutral (nps = 84)', async ({ assert }) => {
  const promoters = 42
  const detractors = 0
  const totalAnswers = 50

  const nps = Nps.score(promoters, detractors, totalAnswers)
  assert.equal(nps, 84)
})