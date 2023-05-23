const { faker } = require('@faker-js/faker')
const dotenv = require('dotenv')
const prisma = require('../prisma/prismaClient')
const { hashPassword } = require('../security/hash')
const fs = require('fs')

const clear = async () => {
	await prisma.comment.deleteMany({})
	await prisma.article.deleteMany({})
	await prisma.user.deleteMany({})
	await prisma.category.deleteMany({})
	fs.writeFileSync('./passwords.txt', '')
}

const fakerAuthors = async () => {
	const pass = faker.internet.password()
	const name = faker.person.firstName() + faker.person.lastName()
	fs.appendFileSync('./passwords.txt', `${name}: ${pass}\n`)
	return {
		name: name,
		email: faker.internet.email(),
		password: await hashPassword(pass),
		role: 'AUTHOR',
	}
}

const fakerAdmins = async () => {
	const pass = faker.internet.password()
	const name = faker.person.firstName() + faker.person.lastName()
	fs.appendFileSync('./passwords.txt', `${name}: ${pass}\n`)
	return {
		name: name,
		email: faker.internet.email(),
		password: await hashPassword(pass),
		role: 'ADMIN',
	}
}

const getRandomCategory = async () => {
	const categories = await prisma.category.findMany({})
	const randomCategory =
		categories[Math.floor(Math.random() * categories.length)]
	return randomCategory
}

const getRandomUser = async () => {
	const users = await prisma.user.findMany({})
	const randomUser = users[Math.floor(Math.random() * users.length)]
	return randomUser
}

const fakerArticles = async () => ({
	title: faker.lorem.sentence(),
	content: faker.lorem.sentences(),
	imageUrl: `${faker.image.url()}?random=${Date.now()}`,
	published: true,
	authorName: (await getRandomUser()).name,
	categoryName: (await getRandomCategory()).name,
})

const fakerComments = (artId) => ({
	content: faker.lorem.sentence(),
	authorEmail: faker.internet.email(),
	articleId: artId,
})

const main = async () => {
	const fakerAuthorsRounds = 10
	const fakerAdminsRounds = 1
	const fakerCategoriesRounds = 10
	const fakerArticlesRounds = 100
	dotenv.config()
	console.log('Seeding...')
	await clear()
	/// --------- Authors ---------------
	for (let i = 0; i < fakerAuthorsRounds; i++) {
		await prisma.user.create({ data: await fakerAuthors() })
	}
	/// --------- Admins ---------------
	for (let i = 0; i < fakerAdminsRounds; i++) {
		await prisma.user.create({ data: await fakerAdmins() })
	}
	/// --------- Categories ---------------
	const fakeCategories = []
	while (fakeCategories.length !== fakerCategoriesRounds) {
		const newCategory = faker.commerce.department()
		if (!fakeCategories.includes(newCategory)) fakeCategories.push(newCategory)
	}
	for (let i = 0; i < fakeCategories.length; i++) {
		await prisma.category.create({ data: { name: fakeCategories[i] } })
	}

	/// --------- Articles ---------------
	for (let i = 0; i < fakerArticlesRounds; i++) {
		await prisma.article.create({ data: await fakerArticles() })
	}
	/// --------- Comments ---------------
	const articles = await prisma.article.findMany()
	for (let i = 0; i < articles.length; i++) {
		const numberOfComments = Math.floor(Math.random() * 20)
		for (let j = 0; j < numberOfComments; j++) {
			await prisma.comment.create({ data: fakerComments(articles[i].id) })
		}
	}
	console.log('Seeding finished')
}

main()
	.catch((e) => console.error(e))
	.finally(async () => {
		await prisma.$disconnect()
	})
