const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../security/auth')
const {
	getAll,
	getArticlesByCategory,
	createCategory,
	deleteCategory,
} = require('../controllers/categoriesController.js')

router.get('/', /*ensureAuthenticated,*/ getAll)
router.get('/:name', /*ensureAuthenticated,*/ getArticlesByCategory)
router.post('/', /*ensureAuthenticated,*/ createCategory)
router.delete('/:name', /*ensureAuthenticated,*/ deleteCategory)

module.exports = router
