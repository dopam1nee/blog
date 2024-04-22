import { getRoles } from '../api'
import { sessions } from '../sessions'
import { ROLE } from '../constants'

export const fetchRoles = async hash => {
	const accessRoles = [ROLE.ADMIN]

	const access = await sessions.access(hash, accessRoles)

	if (!access) {
		// если проверка провалилась
		return {
			error: 'Access is denied',
			res: null,
		}
	}

	const roles = await getRoles()

	return {
		// если нет ошибок (ни одно из условий выше не выполнилось), то пользователь получает доступ к методам
		error: null,
		res: roles,
	}
}
