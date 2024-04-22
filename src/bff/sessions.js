import { addSession, deleteSession, getSession, getUser } from './api'

export const sessions = {
	//list: {}, // сессии пользователей
	create(user) {
		// создание сессии
		const hash = Math.random().toFixed(50) // создали хеш
		console.log('sessions create', user)
		addSession(hash, user)
		//this.list[hash] = user // добавили пользователя по хешу

		return hash // вернули хеш
	},
	async remove(hash) {
		// выход из сессии
		const session = await getSession(hash)

		if (!session) return

		deleteSession(session.id)
		//delete this.list[hash]
	},
	async access(hash, accessRoles) {
		const dbSession = await getSession(hash)
		//const user = this.list[hash]
		console.log('sessions access', hash, accessRoles, dbSession)
		return !!dbSession.user && accessRoles.includes(dbSession.user.roleId)
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
