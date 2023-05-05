const {Router, request} = require("express")

const UsersController = require("../controller/usersController")

const usersRoutes = Router()

const usersController = new UsersController()


usersRoutes.post('/', usersController.create)

usersRoutes.get('/oi', (request,response)=>{
    response.send('oi')
})

module.exports = usersRoutes //Exportando esse arquivo para quem quiser utilizar. No caso, o nosso server.js