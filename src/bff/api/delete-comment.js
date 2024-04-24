export const deleteComment = commentId =>
	fetch(`http://localhost:3101/comments/${commentId}`, {
		method: 'DELETE',
	})
