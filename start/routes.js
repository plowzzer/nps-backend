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

// Route.get('/', () => {
//   return { greeting: 'Hello world in JSON' }
// })

Route.post('/users', 'UserController.create')
Route.post('/sessions', 'SessionController.create')

Route.get('/surveys', 'SurveyController.index').middleware('auth')
Route.get('/surveys/:uuid', 'SurveyController.show').middleware('auth')
Route.post('/surveys', 'SurveyController.store').middleware('auth')
Route.patch('/surveys/:uuid', 'SurveyController.update').middleware('auth')

Route.get('/feedbacks/:id', 'FeedbackController.show').middleware('auth')
Route.post('/feedbacks', 'FeedbackController.store')
Route.delete('/feedbacks/:id', 'FeedbackController.destroy').middleware('auth')

Route.get('/surveys/:uuid/score', 'ScoreController.index').middleware('auth')