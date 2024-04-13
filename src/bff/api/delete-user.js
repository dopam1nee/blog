export const deleteUser = userId =>
	fetch(`http://localhost:3101/users/${userId}`, {
		method: 'DELETE',
	})
