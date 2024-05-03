export const deletePost = postId =>
	fetch(`http://localhost:3101/posts/${postId}`, {
		method: 'DELETE',
	})
