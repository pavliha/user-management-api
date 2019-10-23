'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

/**
 *
 * Swagger route
 *
 * */
Route.get('/', 'SwaggerController.index')
Route.post('/log', 'SwaggerController.log')

/**
 *
 * User routes
 *
 * */
Route.resource('users', 'UserController')
  .validator([['users.index', 'User/Index'], ['users.store', 'User/Store'], ['users.update', 'User/Update']])
  .apiOnly()

Route.resource('assets', 'AssetController')
  .validator([['assets.store', 'Asset/Store'], ['assets.destroy', 'Asset/Destroy']])
  .apiOnly()
