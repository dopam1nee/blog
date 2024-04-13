export const sessions = {
	list: {}, // сессии пользователей
	create(user) {
		// создание сессии
		const hash = Math.random().toFixed(50) // создали хеш

		this.list[hash] = user // добавили пользователя по хешу

		return hash // вернули хеш
	},
	remove(hash) {
		// выход из сессии
		delete this.list[hash]
	},
	access(hash, accessRoles) {
		const user = this.list[hash]

		return !!user && accessRoles.includes(user.roleId)
		// !!user - конвертирует user в булевое значение, accessRoles - проверяет наличие роли в массиве ролей
	},
}

//export const checkAccess = (userSession, accessRoles) => {
//	const user = sessions.list[userSession]

//	if (!user) {
//		// если нет пользователя
//		return false
//	}

//	if (!accessRoles.includes(user.roleId)) {
//		// если пользователь не имеет одну из доступных ролей (ROLE.ADMIN)
//		return false
//	}

//	// если ошибок нет
//	return true
//}
