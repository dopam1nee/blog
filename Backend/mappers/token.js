const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../constants/secret')

module.exports = {
	generate: data => jwt.sign(data, JWT_SECRET, { expiresIn: '30d' }),
	verify: token => jwt.verify(token, JWT_SECRET),
}
