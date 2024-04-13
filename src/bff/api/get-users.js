import { transformUser } from '../transformers'

export const getUsers = () =>
	// функция стала асинхронной из-за fetch
	fetch('http://localhost:3101/users')
		.then(loadedUsers => loadedUsers.json())
		.then(loadedUsers => loadedUsers && loadedUsers.map(transformUser)) // массив пользователей

//export const getUsers = async () =>
//	await fetch('http://localhost:3101/users').then(loadedUsers => loadedUsers.json()) // массив пользователей
