const express = require('express')
const router = express.Router()

const {
	getAll,
	getArticlesByCategory,
	createCategory,
	deleteCategory,
} = require('../controllers/categoriesController.js')

router.get('/', getAll)
router.get('/:name', getArticlesByCategory)
router.post('/', createCategory)
router.delete('/:name', deleteCategory)

module.exports = router
