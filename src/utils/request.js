export const request = (url, method, data) => {
	return fetch(url, {
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		method: method || 'GET',
		body: data ? JSON.stringify(data) : undefined,
	}).then(res => res.json())
}
