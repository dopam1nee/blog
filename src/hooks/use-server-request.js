import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { selectUserSession } from '../selectors'
import { server } from '../bff'

export const useServerRequest = () => {
	const session = useSelector(selectUserSession)

	return useCallback(
		(operation, ...params) => {
			const request = ['register', 'authorize', 'fetchPost', 'fetchPosts'].includes(
				operation,
			)
				? params
				: [session, ...params]
			// для операций register, authorize... не отправляем сессию, для других - отправляем

			return server[operation](...request)
		},
		[session],
	) // пока сессия одна и та же, ссылка на функцию для запроса с сервера будет та же самая
}
