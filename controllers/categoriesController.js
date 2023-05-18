const prisma = require('../prisma/prismaClient')

const getAll = async (req, res) => {
	const take = Number(req.query.take) || 10
	const skip = Number(req.query.skip) || 0
	await prisma.category
		.findMany({
			skip: skip,
			take: take,
		})
		.then((categories) => {
			res.status(200).json(categories)
		})
		.catch((err) => {
			res.status(500).json(err)
		})
}
const getArticlesByCategory = async (req, res) => {
	const take = Number(req.query.take) || 10
	const skip = Number(req.query.skip) || 0
	await prisma.article
		.findMany({
			skip: skip,
			take: take,
			where: {
				published: true,
				categoryName: req.params.name,
			},
			orderBy: {
				createdAt: 'desc',
			},
		})
		.then((categories) => {
			res.status(200).json(categories)
		})
		.catch((err) => {
			res.status(500).json(err)
		})
}

const createCategory = async (req, res) => {
	const category = req.body
	await prisma.category
		.create({
			data: {
				name: category.name,
			},
		})
		.then((category) => {
			res.status(200).json(category)
		})
		.catch((err) => {
			res.status(500).json(err)
		})
}

const deleteCategory = async (req, res) => {
	const name = req.params.name
	await prisma.category
		.delete({
			where: {
				name: name,
			},
		})
		.then((category) => {
			res.status(200).json(category)
		})
		.catch((err) => {
			res.status(500).json(err)
		})
}

module.exports = {
	getAll,
	getArticlesByCategory,
	createCategory,
	deleteCategory,
}
