export const transformComments = dbComment => ({
	id: dbComment.id,
	postId: dbComment.post_id,
	authorId: dbComment.user_id,
	publishedAt: dbComment.published_at,
	content: dbComment.content,
})
