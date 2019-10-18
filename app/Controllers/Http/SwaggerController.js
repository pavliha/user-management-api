/* eslint-disable no-return-await */
const Helpers = use('Helpers')
const fs = use('fs')
const readFile = Helpers.promisify(fs.readFile)

/**
 * Resourceful controller for interacting with users
 */
class SwaggerController {

  async index() {
    return await readFile(Helpers.publicPath('index.html'))
  }

  async log({ request, response }) {
    console.log(request.all())
    return response.accepted()
  }
}

module.exports = SwaggerController
