const { verify, sign } = require('jsonwebtoken')
const dayjs = require('dayjs')
const { client } = require('../prisma/prismaClient')

const ensureAuthenticated = (req, res, next) => {
	const authToken = req.headers.authorization

	if (!authToken) {
		throw new Error('Token is missing')
	}

	const [, token] = authToken.split(' ')

	try {
		verify(token, process.env.ACCESS_TOKEN_SECRET)
		return next()
	} catch (error) {
		throw new Error('Token invalid')
	}
}

const generateToken = (userName) => {
	const payload = {
		userName,
		exp: dayjs().add(1, 'day').unix(),
	}

	return sign(payload, process.env.ACCESS_TOKEN_SECRET)
}

const generateRefreshToken = async (userName) => {
	const expiredIn = dayjs().add(30, 'day').unix()
	const generateRefreshToken = await client.refreshToken.create({
		data: {
			userName,
			expiredIn,
		},
	})
	return generateRefreshToken
}

module.exports = { generateToken, generateRefreshToken, ensureAuthenticated }
