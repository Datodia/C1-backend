const { readFile, writeFile } = require('../utils')

exports.getAllUsers = async () => {
    const users = await readFile('users.json', true)
    return users
}

exports.createUser = async (body) => {
    const users = await readFile('users.json', true)
    const lastId = users[users.length - 1]?.id || 0
    const newUser = {
        id: lastId+1,
        fullName: body.fullName,
        age: body.age,
        isSmoker: body.isSmoker,
    }
    users.push(newUser)
    await writeFile('users.json', users)

    return newUser
}

exports.getUserById = async (id) => {
    const users = await readFile('users.json', true)
    const user = users.find((user) => user.id === id)
    if(!user){
        return {
            error: true,
            message: "user not found"
        }
    }

    return user
}


exports.deleteUserById = async (id) => {
    const users = await readFile('users.json', true)
    const index = users.findIndex((user) => user.id === id)
    if(index === -1){
        return {
            error: true,
            message: "user not exists"
        }
    }

    const deletedUser = users.splice(index, 1)
    await writeFile('users.json',users)
    return deletedUser
}

exports.updateUserById = async (id) => {
    const users = await readFile('users.json', true)
    const index = users.findIndex((user) => user.id === id)
    if(index === -1){
        return {
            error: true,
            message: "user not exists"
        }
    }
    users[index] = {
        ...users[index],
        ...req.body
    }
   await writeFile('users.json', users)

   return users[index]
}