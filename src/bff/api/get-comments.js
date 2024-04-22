import { transformComments } from '../transformers'

export const getComments = postId =>
	fetch(`http://localhost:3101/comments?post_id=${postId}`)
		.then(loadedComments => loadedComments.json())
		.then(loadedComments => loadedComments.map(transformComments))
