require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const chalk = require('chalk')
const routes = require('./routes')

const port = 3001
const app = express()

app.use(express.static('../Frontend/build'))

app.use(cookieParser())
app.use(express.json())

app.use('/', routes)

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
	app.listen(port, () => {
		console.log(chalk.green(`Server has been started on port ${port}...`))
	})
})
