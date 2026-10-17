
const express = require('express')
const usersRouter = require('./routes/users.route')
const blogRouter = require('./blogs/blogs.controller')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello world')
})

app.use('/users', usersRouter)
app.use('/blogs', blogRouter)

app.listen(3000, () => {
    console.log('server running on http://localhost:3000')
})