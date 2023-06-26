const { Router } = require("express")

const NotesController = require("../controller/NotesController")

const notesRoutes = Router()

const notesController = new NotesController()


notesRoutes.get('/', notesController.index)
notesRoutes.get('/:id', notesController.show)
notesRoutes.post('/:user_id', notesController.create)
notesRoutes.delete('/:id', notesController.delete)


module.exports = notesRoutes //Exportando esse arquivo para quem quiser utilizar. No caso, o nosso server.js