const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const chalk = require('chalk')
const {
	register,
	login,
	getUsers,
	getRoles,
	updateUser,
	deleteUser,
} = require('./controllers/user')
const {
	getPosts,
	getPost,
	addPost,
	editPost,
	deletePost,
} = require('./controllers/post')
const { addComment, deleteComment } = require('./controllers/comment')
const mapUser = require('./mappers/map-user')
const mapPost = require('./mappers/map-post')
const mapComment = require('./mappers/map-comment')
const authenticated = require('./middlewares/authenticated')
const hasRole = require('./middlewares/has-role')
const ROLES = require('./constants/roles')

const port = 3001
const app = express()

app.use(cookieParser())
app.use(express.json())

app.post('/register', async (req, res) => {
	try {
		const { user, token } = await register(req.body.login, req.body.password)

		res
			.cookie('token', token, { httpOnly: true })
			.send({ error: null, user: mapUser(user) })
	} catch (err) {
		res.send({ error: err.message || 'Unknown error' })
	}
})

app.post('/login', async (req, res) => {
	try {
		const { user, token } = await login(req.body.login, req.body.password)

		res
			.cookie('token', token, { httpOnly: true })
			.send({ error: null, user: mapUser(user) })
	} catch (err) {
		res.send({ error: err.message || 'Unknown error' })
	}
})

app.post('/logout', (req, res) => {
	res.cookie('token', '', { httpOnly: true }).send({})
})

app.get('/posts', async (req, res) => {
	const { posts, lastPage } = await getPosts(
		req.query.search,
		req.query.limit,
		req.query.page,
	)

	res.send({ data: { lastPage, posts: posts.map(mapPost) } })
})

app.get('/posts/:id', async (req, res) => {
	const post = await getPost(req.params.id)

	res.send({ data: mapPost(post) })
})

app.use(authenticated)

app.post('/posts/:id/comments', async (req, res) => {
	const newComment = await addComment(req.params.id, {
		content: req.body.content,
		author: req.user.id,
	})

	res.send({ data: mapComment(newComment) })
})

app.delete(
	'/posts/:postId/comments/:commentId',
	hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
	async (req, res) => {
		await deleteComment(req.params.postId, req.params.commentId)

		res.send({ error: null })
	},
)

app.post('/posts', hasRole([ROLES.ADMIN]), async (req, res) => {
	const newPost = await addPost({
		title: req.body.title,
		content: req.body.content,
		image: req.body.image,
	})

	res.send({ data: mapPost(newPost) })
})

app.patch('/posts/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
	const updatedPost = await editPost(req.params.id, {
		title: req.body.title,
		content: req.body.content,
		image: req.body.imageUrl,
	})

	res.send({ data: mapPost(updatedPost) })
})

app.delete('/posts/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
	await deletePost(req.params.id)

	res.send({ error: null })
})

app.get('/users', hasRole([ROLES.ADMIN]), async (req, res) => {
	const users = await getUsers()

	res.send({ data: users.map(mapUser) })
})

app.get('/users/roles', hasRole([ROLES.ADMIN]), async (req, res) => {
	const roles = getRoles()

	res.send({ data: roles })
})

app.patch('/users/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
	const newUser = await updateUser(req.params.id, {
		role: req.body.roleId,
	})

	res.send({ data: mapUser(newUser) })
})

app.delete('/users/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
	await deleteUser(req.params.id)

	res.send({ error: null })
})

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
	app.listen(port, () => {
		console.log(chalk.green(`Server has been started on port ${port}...`))
	})
})
