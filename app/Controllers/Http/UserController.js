const User = use('App/Models/User')
const isUndefined = require('lodash/isUndefined')

/**
 * Resourceful controller for interacting with users
 */


const defaults = (params) => ({
  page: params.page || 1,
  limit: params.limit || 20,
  search: params.search || '',
  is_active: isUndefined(params.is_active) ? true : params.is_active,
})

class UserController {

  /**
   * Show a list of all users.
   * GET users
   */
  async index({ request }) {
    const { page, limit, search, is_active } = defaults(request.all())

    return User.query()
      .where('name', 'LIKE', '%' + search + '%')
      .where('is_active', is_active)
      .paginate(page, limit)
  }

  /**
   * Create/save a new user.
   * POST users
   */
  async store({ request, response }) {
    const form = request.all()
    const user = await User.create({
      ...form,
      password: 'qwerty123'
    })
    return response.created(user)
  }

  /**
   * Display a single user.
   * GET users/:id
   */
  async show({ params }) {
    return User.find(params.id)
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   */
  async update({ request, response, user }) {
    const fields = request.all()
    user.merge(fields)
    await user.save()

    return response.updated(user)
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   */
  async destroy({ response, user }) {
    await user.delete()
    return response.deleted()
  }
}

module.exports = UserController
