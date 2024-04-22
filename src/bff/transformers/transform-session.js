export const transformSession = dbSession => {
	console.log('transform-session', dbSession)
	return {
		id: dbSession.id,
		hash: dbSession.hash,
		user: dbSession.user,
	}
}
