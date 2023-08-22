const knex = require("../database/knex");
class UserRepository {
  async findByEmail(email) {
    const user = await knex("users").where({ email }).first();

    return user;
  }

  async createUser({ name, email, password }) {
    const userId = await knex("users").insert({ name, email, password });
    return { id: userId };
  }

  // UPDATE
  async findById(userId) {
    const [user] = await knex("users").where({ id: userId });

    return user;
  }

  // caso queira atualizar email
  async updateEmail(email) {
    const [userWithUpdatedEmail] = await knex("users").where({ email });
    return userWithUpdatedEmail;
  }

  async updateUser({ id, name, email, password, oldPassword }) {
    knex("users")
      .where({ id })
      .update({ id, name, email, password, oldPassword });
  }
}

module.exports = UserRepository;
