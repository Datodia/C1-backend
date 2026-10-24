
const express = require('express')
const usersRouter = require('./routes/users.route')
const blogRouter = require('./blogs/blogs.controller')
const loggerMiddleware = require('./middlewares/logger.middleware')
const rejectHalfReqeustsMiddleware = require('./middlewares/reject-half-reqeusts.middleware')
const blogAccessMiddleware = require('./middlewares/blog-access.middleware')
const app = express()

app.use(express.json())
app.use(loggerMiddleware, rejectHalfReqeustsMiddleware)

app.get('/', (req, res) => {
    res.send('hello world')
})

app.use('/users', usersRouter)
app.use('/blogs', blogAccessMiddleware, blogRouter)

app.listen(3000, () => {
    console.log('server running on http://localhost:3000')
})