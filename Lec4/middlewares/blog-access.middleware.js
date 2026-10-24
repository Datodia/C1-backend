
module.exports = (req, res, next) => {

    console.log(req.headers)
    if(!req.headers['access-key'] && req.headers['access-key']!== 'password123'){
        return res.status(403).json({message:" permition deneid"})
    }

    next()
}