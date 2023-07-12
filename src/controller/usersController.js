const { hash, compare } = require("bcryptjs"); // criptografia de senha
const AppError = require("../utils/appError");

const sqliteConnection = require("../database/sqlite");
const UserRepository = require("../repositories/UserRepository");
const UserCreateService = require("../services/userCreateService");
class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;
    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);
    await userCreateService.execute({ name, email, password });
    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, oldPassword } = request.body;
    const userId = request.user.id;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [
      userId,
    ]);
    if (!user) {
      throw new AppError("Usuário não encontrado");
    }
    // caso queira atualizar email
    const userWithUpdatedEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este email já está em uso");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    // atualizando senha
    if (password && !oldPassword) {
      throw new AppError("A senha antiga precisa ser informada.");
    }

    if (password && oldPassword) {
      const checkOldPassword = await compare(oldPassword, user.password);

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere.");
      }

      user.password = await hash(password, 8);
    }

    await database.run(
      `UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`,
      [user.name, user.email, user.password, userId]
    );

    return response.json();
  }
}

module.exports = UsersController;
