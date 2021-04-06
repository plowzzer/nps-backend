'use strict'

const User = use("App/Models/User")

class UserController {
  async create ({ request, response }) {
    const data = request.only(["username", "email", "password"])
    
    const check_email = await User.findBy('email', data.email)
    if (check_email) {
      return response.status(500).send({ error: 'Email already registred' })
    }
    
    // TODO : Password strength

    const user = await User.create(data)

    return user
  }
}

module.exports = UserController
