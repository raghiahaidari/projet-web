const express = require('express')
const router = express.Router()

const {
	getAll,
	getArticlesByUser,
	getByName,
	createUser,
	updateUser,
	deleteUser,
} = require('../controllers/usersController.js')

router.get('/', getAll)
router.get('/:name', getByName)
router.get('/:name', getArticlesByUser)
router.post('/', createUser)
router.patch('/', updateUser)
router.delete('/:name', deleteUser)

module.exports = router
