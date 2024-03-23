import { getUser } from './get-user'
import { addUser } from './add-user'
import { createSession } from './create-session'

export const server = {
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
			res: createSession(user.role_id),
		}
	},

	async register(regLogin, regPassword) {
		const user = await getUser(regLogin) // пользователь с конкретным логином

		if (user) {
			// если пользователь найден
			return {
				error: 'This username is already taken',
				res: null,
			}
		}

		await addUser(regLogin, regPassword)

		return {
			error: null,
			res: createSession(user.role_id),
		}
	},
}
