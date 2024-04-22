import { transformPost } from '../transformers'

export const getPost = async postId =>
	fetch(`http://localhost:3101/posts/${postId}`)
		.then(loadedPost => loadedPost.json())
		.then(loadedPost => loadedPost && transformPost(loadedPost))
