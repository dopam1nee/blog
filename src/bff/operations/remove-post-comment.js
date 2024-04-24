import { deleteComment, getComments, getPost } from '../api'
import { ROLE } from '../constants'
import { sessions } from '../sessions'

export const removePostComment = async (hash, postId, id) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR]
	const access = await sessions.access(hash, accessRoles)
	console.log(hash, postId, id)

	if (!access) {
		return {
			error: '',
			res: null,
		}
	}

	await deleteComment(id)

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
