const {Router} = require("express")

const usersRoutes = require("./users.routes")

// instanciando roteador
const routes = Router()

routes.use("/users", usersRoutes)

module.exports = routes