import { transformSession } from '../transformers'

export const getSession = async hash =>
	fetch(`http://localhost:3101/sessions?hash=${hash}`)
		.then(loadedHash => loadedHash.json())
		.then(([loadedHash]) => loadedHash && transformSession(loadedHash))
