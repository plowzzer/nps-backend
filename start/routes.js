'use strict'

const SurveyController = require('../app/Controllers/Http/SurveyController')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('/users', 'UserController.create')
Route.post('/sessions', 'SessionController.create')

// Route.resource('surveys', 'SurveyController')
//   .apiOnly()
//   .middleware('auth')

// Samething as
Route.get('/surveys', 'SurveyController.index').middleware('auth')
Route.get('/surveys/:uuid', 'SurveyController.show').middleware('auth')
Route.post('/surveys', 'SurveyController.store').middleware('auth')
Route.patch('/surveys/:uuid', 'SurveyController.patch').middleware('auth')

Route.resource('feedbacks', 'FeedbackController')
  .apiOnly()

Route.get('/feedbacks/:id', 'SurveyController.show').middleware('auth')
Route.post('/feedbacks', 'SurveyController.store')
Route.delete('/feedbacks/:id', 'SurveyController.destroy').middleware('auth')

Route.get('/surveys/:uuid/score', 'ScoreController.index').middleware('auth')