const User = use('App/Models/User')

/**
 * Resourceful controller for interacting with users
 */
class UserController {

  /**
   * Show a list of all users.
   * GET users
   */
  async index({ request }) {
    const { page, limit, search, is_active } = request.all()

    console.log({ is_active, search })

    return User.query()
      .where('is_active', is_active)
      .paginate(page || 1, limit || 10)

  }

  /**
   * Create/save a new user.
   * POST users
   */
  async store({ request, response }) {
    const user = await User.create(request.all())
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
  async update({ request, auth, response, user }) {
    const fields = request.all()
    user.merge(fields)
    await user.save()

    const tokens = await auth
      .withRefreshToken()
      .generate(await User.find(user.id), true)

    return response.updated(tokens)
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
