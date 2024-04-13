export const getRoles = () =>
	fetch('http://localhost:3101/roles').then(loadedRoles => loadedRoles.json())
