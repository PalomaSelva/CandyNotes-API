const {Router, request} = require("express")

const UsersController = require("../controller/UsersController")

const usersRoutes = Router()

const usersController = new UsersController()


usersRoutes.post('/', usersController.create)
usersRoutes.put('/:id', usersController.update)

usersRoutes.get('/oi', (request,response)=>{
    response.send('<h1>oii</h1>')
})

module.exports = usersRoutes //Exportando esse arquivo para quem quiser utilizar. No caso, o nosso server.js