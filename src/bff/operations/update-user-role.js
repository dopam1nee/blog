import { setUserRole } from '../api'
import { ROLE } from '../constants'
import { sessions } from '../sessions'

export const updateUserRole = async (userSession, userId, newUserRoleId) => {
	const accessRoles = [ROLE.ADMIN]

	if (!sessions.access(userSession, accessRoles)) {
		// если проверка провалилась
		return {
			error: 'Access is denied',
			res: null,
		}
	}

	setUserRole(userId, newUserRoleId)

	return {
		error: null,
		res: true,
	}
}
