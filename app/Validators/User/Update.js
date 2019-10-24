const User = use('App/Models/User')

module.exports = class Update {

  async authorize() {
    this.ctx.user = await User.findOrFail(this.ctx.params.id)
    return true
  }

  get rules() {
    return {
      avatar_url: 'string',
      name: 'string',
      email: 'email',
      skype: 'string',
      signature: 'string',
    }
  }

  get messages() {
    return {
      'name.required': 'Имя и Фамилия пользователя обязательны',
      'email.required': 'Еmail пользователя обязательн',
      'email.email': 'Неправильный формат почты',
      'avatar_url.string': 'Фото пользователя должно быть в виде сслыки',
    }
  }

  get validateAll() {
    return true
  }
}
