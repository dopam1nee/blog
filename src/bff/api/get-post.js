import { ERROR } from '../../constants'
import { transformPost } from '../transformers'

export const getPost = async postId =>
	fetch(`http://localhost:3101/posts/${postId}`)
		.then(res => {
			if (res.ok) {
				return res
			}
			const error = res.status === 404 ? ERROR.PAGE_NOT_EXIST : ERROR.ANOTHER_ERROR

			return Promise.reject(error)
		})
		.then(loadedPost => loadedPost.json())
		.then(loadedPost => loadedPost && transformPost(loadedPost))
