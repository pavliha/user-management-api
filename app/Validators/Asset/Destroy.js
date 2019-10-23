const Asset = use('App/Models/Asset')

module.exports = class Destroy {

  async authorize() {
    this.ctx.asset = await Asset.findOrFail(this.ctx.params.id)
    const { auth, response, place } = this.ctx
    const can = auth.user.can('delete', place)
    if (!can) return response.forbidden()
    return true
  }

}
