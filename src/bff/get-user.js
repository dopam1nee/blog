import { getUsers } from './get-users'

export const getUser = async loginToFind => {
	const users = await getUsers() // массив пользователей
	users.find(({ login }) => login === loginToFind) // пользователь с конкретным логином
}
