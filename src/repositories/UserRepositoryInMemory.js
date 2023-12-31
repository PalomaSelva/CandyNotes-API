class UserRepositoryInMemory {
  users = [];

  async createUser({ name, email, password }) {
    const user = {
      id: Math.floor(Math.random() * 1000) + 1,
      name,
      email,
      password,
    };

    this.users.push(user);
    return user;
  }

  async findByEmail(email) {
    const user = this.users.find((user) => user.email === email);

    return user;
  }
}

module.exports = UserRepositoryInMemory;
