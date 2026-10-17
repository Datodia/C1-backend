
const UsersService = require('../services/users.service')

exports.getAllUsers = async (req, res) => {
    const users = await UsersService.getAllUsers()
    res.json(users)
}

exports.createUser =  async (req, res) => {
    if(!req.body.fullName || !req.body.age || !req.body.hasOwnProperty('isSmoker')){
        return res.status(400).json({
            error: true,
            message: 'FullName age and isSmoker is requerid'
        })
    }
    const newUser = await UsersService.createUser(req.body)
    res.status(201).json(newUser)
}


exports.getUserById = async (req, res) => {
    const id = Number(req.params.id)
    const resp = await UsersService.getUserById(id)
    if(resp.error){
        res.status(400).json(resp)
    }
    res.json(resp)
}


exports.deleteUserById = async (req, res) => {
    const id = Number(req.params.id)
    const resp = await UsersService.getUserById(id)
    if(resp.error){
        res.status(400).json(resp)
    }
    res.json(resp[0])
}

exports.updateUserById =  async (req, res) => {
    const id = Number(req.params.id)
    const resp = await UsersService.getUserById(id)
    if(resp.error){
        res.status(400).json(resp)
    }
    res.json(resp)
}
