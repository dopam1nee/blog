export const addUser = (login, password) =>
	fetch('http://localhost:3101/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			login: login,
			password: password,
			registed_at: new Date().toISOString().substring(0, 16).replace('T', ' '), // 2024-10-20 15:19
			role_id: 2,
		}),
	}).then(createdUser => createdUser.json())
