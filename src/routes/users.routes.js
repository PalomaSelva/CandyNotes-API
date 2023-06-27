const { Router } = require("express");

const UsersController = require("../controller/UsersController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const usersRoutes = Router();

const usersController = new UsersController()


usersRoutes.post('/', usersController.create)
usersRoutes.put('/', ensureAuthenticated, usersController.update)


module.exports = usersRoutes //Exportando esse arquivo para quem quiser utilizar. No caso, o nosso server.js