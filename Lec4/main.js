
const express = require('express')
const { readFile, writeFile } = require('./utils')
const app = express()

app.use(express.json())

app.get('/asd',(req, res) => {
    res.send('ok')
})

app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/users', async (req, res) => {
    const users = await readFile('users.json', true)
    res.json(users)
})

app.post('/users', async (req, res) => {
    if(!req.body.fullName || !req.body.age || !req.body.hasOwnProperty('isSmoker')){
        return res.status(400).json({
            error: true,
            message: 'FullName age and isSmoker is requerid'
        })
    }
    const users = await readFile('users.json', true)
    const lastId = users[users.length - 1]?.id || 0
    const newUser = {
        id: lastId+1,
        fullName: req.body.fullName,
        age: req.body.age,
        isSmoker: req.body.isSmoker,
    }
    users.push(newUser)
    await writeFile('users.json', users)
    res.status(201).json(newUser)
})

app.get('/users/:id', async (req, res) => {
    const id = Number(req.params.id)
    const users = await readFile('users.json', true)
    const user = users.find((user) => user.id === id)
    if(!user){
        return res.status(404).json({
            error: true,
            message: "user not found"
        })
    }
    res.json(user)
})

app.delete('/users/:id', async (req, res) => {
    const id = Number(req.params.id)
    const users = await readFile('users.json', true)
    const index = users.findIndex((user) => user.id === id)
    if(index === -1){
        return res.status(400).json({
            error: true,
            message: "user not exists"
        })
    }

    const deletedUser = users.splice(index, 1)
    await writeFile('users.json',users)
    res.json(deletedUser[0])
})

app.put('/users/:id', async (req, res) => {
    const id = Number(req.params.id)
    const users = await readFile('users.json', true)
    const index = users.findIndex((user) => user.id === id)
    if(index === -1){
        return res.status(400).json({
            error: true,
            message: "user not exists"
        })
    }
    users[index] = {
        ...users[index],
        ...req.body
    }
   await writeFile('users.json', users)
    res.json(users[index])
})

app.listen(3000, () => {
    console.log('server running on http://localhost:3000')
})