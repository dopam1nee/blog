import { getUser } from './get-user'
import { addUser } from './add-user'
import { sessions } from './sessions'

export const server = {
	async logout(session) {
		sessions.remove(session)
	},
	async authorize(authLogin, authPassword) {
		const user = await getUser(authLogin) // пользователь с конкретным логином

		if (!user) {
			// если пользователь не найден
			return {
				error: 'No such user has been found',
				res: null,
			}
		}

		if (authPassword !== user.password) {
			// если пароль для авторизации, не равен паролю найденного пользователя
			return {
				error: 'Invalid password',
				res: null,
			}
		}

		return {
			// если нет ошибок (ни одно из условий выше не выполнилось), то пользователь получает доступ к методам
			error: null,
			res: {
				id: user.id,
				login: user.login,
				roleId: user.role_id,
				session: sessions.create(user),
			},
		}
	},

	async register(regLogin, regPassword) {
		const existedUser = await getUser(regLogin) // пользователь с конкретным логином

		if (existedUser) {
			// если пользователь найден
			return {
				error: 'This username is already taken',
				res: null,
			}
		}

		const user = await addUser(regLogin, regPassword)
		//console.log(user) 

		return {
			// если нет ошибок (ни одно из условий выше не выполнилось), то пользователь получает доступ к методам
			error: null,
			res: {
				id: user.id,
				login: user.login,
				roleId: user.role_id,
				session: sessions.create(user),
			},
		}
	},
}
