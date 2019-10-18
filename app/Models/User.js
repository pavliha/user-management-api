/* eslint-disable no-undef */
const Env = use('Env')
const Hash = use('Hash')
const Model = use('Model')

class User extends Model {

  static get hidden() {
    return [
      'pivot',
      'password',
    ]
  }

  static get policy() {
    return 'App/Policies/User'
  }

  static boot() {
    super.boot()
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  can(action, model) {
    const bindPolicy = (typeof model === 'function') ? model.policy : model.constructor.policy
    if (!bindPolicy) return false
    const ModelPolicy = use(bindPolicy)
    if (ModelPolicy[action] === undefined) return false
    return ModelPolicy[action](this, model)
  }

  cannot(action, model) {
    return !this.can(action, model)
  }

  setAvatarUrl(url) {
    return url.replace(Env.get('APP_URL'), '')
  }

  getAvatarUrl(url) {
    if (!url) return null
    if (url.includes('//')) return url
    return `${Env.get('APP_URL')}${url}`
  }

  tokens() {
    return this.hasMany('App/Models/Token')
  }

  resetTokens() {
    return this.hasMany('App/Models/ResetToken')
  }

}

module.exports = User
