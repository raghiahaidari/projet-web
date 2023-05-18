var express = require('express');
var router = express.Router();

const {
	getAll,
	getArticleComments,
	createComment,
	updateComment,
	deleteCommentById,
} = require('../controllers/commentsController')

router.get('/', getAll)
router.get('/:id', getArticleComments)
router.post('/', createComment)
router.patch('/', updateComment)
router.delete('/:id', deleteCommentById)

module.exports = router 
