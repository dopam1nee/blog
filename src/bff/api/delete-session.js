export const deleteSession = sessionId =>
	fetch(`http://localhost:3101/sessions/${sessionId}`, {
		method: 'DELETE',
	})
