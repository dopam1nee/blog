import { getUsers } from '../api'
import { sessions } from '../sessions'
import { ROLE } from '../constants'

export const fetchUsers = async hash => {
	const accessRoles = [ROLE.ADMIN]

	const access = await sessions.access(hash, accessRoles)

	if (!access) {
		// если проверка провалилась
		return {
			error: 'Access is denied',
			res: null,
		}
	}

	const users = await getUsers()

	return {
		// если нет ошибок (ни одно из условий выше не выполнилось), то пользователь получает доступ к методам
		error: null,
		res: users,
	}
}
