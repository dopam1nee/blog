module.exports = user => {
	return {
		id: user.id,
		login: user.login,
		roleId: user.role,
	}
}
