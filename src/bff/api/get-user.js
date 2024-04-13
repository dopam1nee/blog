//import { getUsers } from './get-users'

import { transformUser } from '../transformers'

export const getUser = async loginToFind =>
	fetch(`http://localhost:3101/users?login=${loginToFind}`)
		.then(loadedUser => loadedUser.json())
		.then(([loadedUser]) => loadedUser && transformUser(loadedUser))

//export const getUser = async loginToFind => {
//	const users = await getUsers() // массив пользователей

//	return users.find(({ login }) => login === loginToFind) // пользователь с конкретным логином
//}
