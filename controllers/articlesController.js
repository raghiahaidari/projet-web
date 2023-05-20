const prisma = require('../prisma/prismaClient')

const getAll = async (req, res) => {
	const take = Number(req.query.take) || 10
	const skip = Number(req.query.skip) || 0
	await prisma.article
		.findMany({
			skip: skip,
			take: take,
			where: {
				published: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		})
		.then((articles) => {
			res.status(200).json(articles)
		})
		.catch((err) => {
			res.status(500).json(err)
		})
}

const getById = async (req, res) => {
	const id = req.params.id
	await prisma.article
		.findFirst({
			where: {
				id: Number(id),
			},
		})
		.then((article) => {
			if (article) res.status(200).json(article)
			else res.status(404).json({ message: 'Article not found' })
		})
		.catch((err) => {
			res.status(500).json(err)
		})
}

const createArticle = async (req, res) => {
	const article = req.body
	await prisma.article
		.create({
			data: {
				title: article.title,
				content: article.content,
				imageUrl: article.imageUrl,
				published: article.published,
				authorName: article.authorName,
				categoryName: article.categoryName,
			},
		})
		.then((article) => {
			res.status(200).json(article)
		})
		.catch((err) => {
			res.status(500).json(err)
		})
}

const updateArticle = async (req, res) => {
	const article = req.body
	await prisma.article
		.update({
			where: {
				id: Number(article.id),
			},
			data: {
				title: article.title,
				content: article.content,
				imageUrl: article.imageUrl,
				published: article.published,
				authorName: article.authorName,
				categoryName: article.categoryName,
				updatedAt: new Date(),
			},
		})
		.then((article) => {
			res.status(200).json(article)
		})
		.catch((err) => {
			res.status(500).json(err)
		})
}

const deleteArticleById = async (req, res) => {
	const id = req.params.id
	await prisma.article
		.delete({
			where: {
				id: Number(id),
			},
		})
		.then((article) => {
			res.status(200).json(article)
		})
		.catch((err) => {
			res.status(500).json(err)
		})
}

module.exports = {
	getAll,
	getById,
	createArticle,
	updateArticle,
	deleteArticleById,
}
