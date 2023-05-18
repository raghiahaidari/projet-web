var express = require('express');
var router = express.Router();

const {
	getAll,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
} = require('../controllers/usersController')

router.get('/', getAll)
router.get('/:id', getUserById)
router.post('/', createUser)
router.patch('/', updateUser)
router.delete('/:id', deleteUser)

module.exports = router

