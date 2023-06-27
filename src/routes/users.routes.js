const { Router } = require('express')

const multer = require('multer')

const UsersController = require('../controller/UsersController')
const ensureAuthenticated = require('../middleware/ensureAuthenticated')
const uploadConfig = require('../configs/upload')

const upload = multer(uploadConfig.MULTER)

const usersRoutes = Router()

const usersController = new UsersController()

usersRoutes.post('/', usersController.create)
usersRoutes.put('/', ensureAuthenticated, usersController.update)
usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  (request, response) => {
    console.log(request.file.filename)
    response.json()
  },
)

module.exports = usersRoutes // Exportando esse arquivo para quem quiser utilizar. No caso, o nosso server.js
