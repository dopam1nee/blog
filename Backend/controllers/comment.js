const Comment = require('../models/Comment')
const Post = require('../models/Post')

const addComment = async (postId, comment) => {
	const newComment = await Comment.create(comment)

	await Post.findByIdAndUpdate(postId, { $push: { comments: newComment._id } }) // или просто newComment; привязали комментарий к посту

	await newComment.populate('author') // раскрыли объект по id; преобразовали идентификатор в объект, в котором содержится информация о пользователе (по идентификатору)

	return newComment
}

const deleteComment = async (postId, commentId) => {
	await Comment.deleteOne({ _id: commentId })
	await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } })
}

module.exports = {
	addComment,
	deleteComment,
}
