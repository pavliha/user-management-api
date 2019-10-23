const User = use('App/Models/User')

module.exports = class Destroy {

  async authorize() {
    this.ctx.user = await User.findOrFail(this.ctx.params.id)
    return true
  }

}
