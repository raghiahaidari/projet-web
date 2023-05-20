const prisma = require('../prisma/prismaClient')
const { hashPassword } = require('../security/hash')

const getAll = async (req, res) => {
	const take = Number(req.query.take) || 10
	const skip = Number(req.query.skip) || 0
	await prisma.user
		.findMany({
			skip: skip,
			take: take,
		})
		.then((users) => {
			res.status(200).json(users)
		})
		.catch((err) => {
			res.status(500).json(err)
		})
}

const getArticlesByUser = async (req, res) => {
	const take = Number(req.query.take) || 10
	const skip = Number(req.query.skip) || 0
	await prisma.article
		.findMany({
			skip: skip,
			take: take,
			where: {
				published: true,
				authorName: req.params.name,
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

const getByName = async (req, res) => {
	const name = req.params.name
	await prisma.user
		.findFirst({
			where: {
				name: name,
			},
		})
		.then((user) => {
			if (user) res.status(200).json(user)
			else res.status(404).json({ message: 'user not found' })
		})
		.catch((err) => {
			res.status(500).json(err)
		})
}

const createUser = async (req, res) => {
	const user = req.body
	const hash = await hashPassword(user.password)
	await prisma.user
		.create({
			data: {
				name: user.name,
				email: user.email,
				password: hash,
				role: user.role,
			},
		})
		.then((user) => {
			res.status(200).json(user)
		})
		.catch((err) => {
			res.status(500).json(err)
		})
}

const updateUser = async (req, res) => {
	const user = req.body
	const hash = await hashPassword(user.password)
	await prisma.user
		.update({
			where: {
				name: user.name,
			},
			data: {
				name: user.name,
				email: user.email,
				password: hash,
				role: user.role,
			},
		})
		.then((user) => {
			res.status(200).json(user)
		})
		.catch((err) => {
			res.status(500).json(err)
		})
}

const deleteUser = async (req, res) => {
	const name = req.params.name
	await prisma.user
		.delete({
			where: {
				name: name,
			},
		})
		.then((user) => {
			res.status(200).json(user)
		})
		.catch((err) => {
			res.status(500).json(err)
		})
}

module.exports = {
	getAll,
	getArticlesByUser,
	getByName,
	createUser,
	updateUser,
	deleteUser,
}
