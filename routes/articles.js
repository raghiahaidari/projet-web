var express = require('express');
var router = express.Router();

const {
	getAll,
	getArticleById,
	createArticle,
	updateArticle,
	deleteArticleById,
} = require('../controllers/articlesController')

router.get('/', getAll)
router.get('/:id', getArticleById)
router.post('/', createArticle)
router.patch('/', updateArticle)
router.delete('/:id', deleteArticleById)
module.exports = router
