import { removeComment } from './session'
import { ROLE } from '../constants'

export const createSession = roleId => {
	const session = {
		logout() {
			// лишаем пользователя доступа к методам (выход из сессии). Получаем все методы сессии, проходимся по каждому через цикл и удаляем его
			Object.keys(session).forEach(key => {
				// key - logout, removeComment...
				delete session[key]
			})
		},
	}

	switch (roleId) {
		case ROLE.ADMIN: {
			session.removeComment = removeComment // удалить комментарий
			break
		}
		case ROLE.MODERATOR: {
			session.removeComment = removeComment // удалить комментарий
			break
		}
		case ROLE.VIEWER: {
			break
		}
		default:
		// nothing
	}

	return session
}
