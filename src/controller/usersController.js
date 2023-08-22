const UserRepository = require("../repositories/UserRepository");
const UserService = require("../services/userService");
class UsersController {
  async create(request, response) {
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    const { name, email, password } = request.body;
    await userService.create({ name, email, password });
    return response.status(201).json();
  }

  async update(request, response) {
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    const { name, email, password, oldPassword } = request.body;
    const id = request.user.id;
    await userService.update({
      id,
      name,
      email,
      password,
      oldPassword,
    });

    return response.json();
  }
}

module.exports = UsersController;
