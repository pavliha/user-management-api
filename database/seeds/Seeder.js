/*
eslint-disable import/no-unresolved,
import/no-extraneous-dependencies,
import/newline-after-import,
function-paren-newline,
no-console,
*/

const Factory = use('Factory')
const User = use('App/Models/User')

function log(text) {
  console.log(text)
  return text
}

class Seeder {

  async createUsers() {
    log('creating users...')
    return Factory.model('App/Models/User').createMany(1000)
  }

  async run() {
    await this.createUsers()
    return true
  }
}

module.exports = Seeder
