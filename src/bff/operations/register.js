import { addUser, getUser } from '../api'
import { sessions } from '../sessions'

export const register = async (regLogin, regPassword) => {
	const existedUser = await getUser(regLogin) // пользователь с конкретным логином

	if (existedUser) {
		// если пользователь найден
		return {
			error: 'This username is already taken',
			res: null,
		}
	}

	const user = await addUser(regLogin, regPassword)

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
}
