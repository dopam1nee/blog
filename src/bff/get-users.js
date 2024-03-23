export const getUsers = () =>
	// функция стала асинхронной из-за fetch
	fetch('http://localhost:3101/users').then(loadedUsers => loadedUsers.json()) // массив пользователей

//export const getUsers = async () =>
//	await fetch('http://localhost:3101/users').then(loadedUsers => loadedUsers.json()) // массив пользователей
