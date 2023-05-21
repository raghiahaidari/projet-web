const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../security/auth')
const {
	getAll,
	getArticlesByUser,
	getByName,
	createUser,
	updateUser,
	deleteUser,
} = require('../controllers/usersController.js')

router.get('/', /*ensureAuthenticated,*/ getAll)
router.get('/:name', /*ensureAuthenticated,*/ getByName)
router.get('/:name', /*ensureAuthenticated,*/ getArticlesByUser)
router.post('/', /*ensureAuthenticated,*/ createUser)
router.patch('/', /*ensureAuthenticated,*/ updateUser)
router.delete('/:name', /*ensureAuthenticated,*/ deleteUser)

module.exports = router
