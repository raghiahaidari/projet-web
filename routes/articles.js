const express = require('express')
var router = express.Router()
const { ensureAuthenticated } = require('../security/auth')
const {
	getAll,
	getById,
	createArticle,
	updateArticle,
	deleteArticleById,
} = require('../controllers/articlesController.js')

router.get('/', ensureAuthenticated, getAll)
router.get('/:id', ensureAuthenticated, getById)
router.post('/', ensureAuthenticated, createArticle)
router.patch('/', ensureAuthenticated, updateArticle)
router.delete('/:id', ensureAuthenticated, deleteArticleById)
module.exports = router
