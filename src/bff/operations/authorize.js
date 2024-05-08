import { getUser } from '../api'
import { sessions } from '../sessions'

export const authorize = async (authLogin, authPassword) => {
	const user = await getUser(authLogin) // пользователь с конкретным логином

	if (!user) {
		// если пользователь не найден
		return {
			error: 'Invalid username',
			res: null,
		}
	}

	const { id, login, password, roleId } = user

	if (authPassword !== password) {
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
			id,
			login,
			roleId,
			session: sessions.create(user),
		},
	}
}
