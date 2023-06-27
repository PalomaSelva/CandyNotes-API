const { Router } = require('express')

const TagsController = require('../controller/TagsController')

const ensureAuthenticated = require('../middleware/ensureAuthenticated')

const tagsRouter = Router()

const tagsController = new TagsController()

tagsRouter.get('/', ensureAuthenticated, tagsController.index)

module.exports = tagsRouter
