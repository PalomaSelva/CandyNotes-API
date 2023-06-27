const { Router } = require("express")

const NotesController = require("../controller/NotesController")

const ensureAuthenticated = require("../middleware/ensureAuthenticated")

const notesRoutes = Router()

const notesController = new NotesController()

notesRoutes.use(ensureAuthenticated) // middleware

notesRoutes.get('/', notesController.index)
notesRoutes.get('/:id', notesController.show)
notesRoutes.post('/', notesController.create)
notesRoutes.delete('/:id', notesController.delete)


module.exports = notesRoutes //Exportando esse arquivo para quem quiser utilizar. No caso, o nosso server.js