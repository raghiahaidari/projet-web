const express = require('express')
var router = express.Router()
const { ensureAuthenticated } = require('../security/auth')
const {
	getAll,
	getArticleComments,
	createComment,
	updateComment,
	deleteCommentById,
} = require('../controllers/commentsController.js')

router.get('/', ensureAuthenticated, getAll)
router.get('/:id', ensureAuthenticated, getArticleComments)
router.post('/', ensureAuthenticated, createComment)
router.patch('/', ensureAuthenticated, updateComment)
router.delete('/:id', ensureAuthenticated, deleteCommentById)

module.exports = router
