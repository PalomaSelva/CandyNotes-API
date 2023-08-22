const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/appError");

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async create({ name, email, password }) {
    const checkUserExist = await this.userRepository.findByEmail(email);

    if (checkUserExist) {
      throw new AppError("Este e-mail já está em uso");
    }

    const hashedPassword = await hash(password, 8);

    const userCreated = await this.userRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });

    return userCreated;
  }

  async update({ id, name, email, password, oldPassword }) {
    const userFound = await this.userRepository.findById(id);
    if (!userFound) {
      throw new AppError("Usuário não encontrado");
    }

    // caso queira atualizar email

    const checkEmailInUse = await this.userRepository.updateEmail(email);

    if (checkEmailInUse && checkEmailInUse.id !== userFound.id) {
      throw new AppError("Este email já está em uso");
    }
    userFound.name = name ?? userFound.name;
    userFound.email = email ?? userFound.email;

    // atualizando senha
    if (password && !oldPassword) {
      throw new AppError("A senha antiga precisa ser informada.");
    }

    if (password && oldPassword) {
      const checkOldPassword = await compare(oldPassword, userFound.password);

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere.");
      }

      userFound.password = await hash(password, 8);
    }

    const userUpdated = await this.userRepository.updateUser({
      id,
      name,
      email,
      password,
      oldPassword,
    });

    return userUpdated;
  }
}

module.exports = UserService;
