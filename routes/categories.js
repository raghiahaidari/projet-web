var express = require('express');
var router = express.Router();

const {
	getAll,
	getArticlesByCategory,
	createCategory,
	deleteCategory,
} = require('../controllers/categoriesController')

router.get('/', getAll)
router.get('/:id', getArticlesByCategory)
router.post('/', createCategory)
router.delete('/:id', deleteCategory)

module.exports = router