/* eslint-disable no-undef */
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const UserCreateService = require("./userService");

describe("UserCreateService", () => {
  it("user should be created", async () => {
    const user = {
      name: "User Test",
      email: "user@email.com",
      password: "123",
    };
    const userRepositoryInMemory = new UserRepositoryInMemory();
    const userCreateService = new UserCreateService(userRepositoryInMemory);
    const userCreated = await userCreateService.create(user);

    expect(userCreated).toHaveProperty("id");
  });
});
