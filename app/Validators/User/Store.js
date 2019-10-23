module.exports = class Create {

  async authorize() {
    return true
  }

  get rules() {
    return {
      avatar_url: 'string',
      name: 'required',
      email: 'required|email|unique:users,email',
      skype: 'unique:users,skype',
      signature: 'unique:users,signature',
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
