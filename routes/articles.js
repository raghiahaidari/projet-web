const express = require('express')
var router = express.Router()

const {
	getAll,
	getById,
	createArticle,
	updateArticle,
	deleteArticleById,
} = require('../controllers/articlesController.js')

router.get('/', getAll)
router.get('/:id', getById)
router.post('/', createArticle)
router.patch('/', updateArticle)
router.delete('/:id', deleteArticleById)
module.exports = router
