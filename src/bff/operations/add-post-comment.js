import { addComment, getComments, getPost } from '../api'
import { ROLE } from '../constants'
import { sessions } from '../sessions'

export const addPostComment = async (hash, userId, postId, content) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER]
	const access = await sessions.access(hash, accessRoles)
	console.log('add-post-comment access', access)
	console.log('add-post-comment BEFORE')
	if (!access) {
		return {
			error: '',
			res: null,
		}
	}
	console.log('add-post-comment AFTER')
	await addComment(userId, postId, content)

	const post = await getPost(postId)
	const comments = await getComments(postId)

	return {
		error: null,
		res: {
			...post,
			comments,
		},
	}
}
