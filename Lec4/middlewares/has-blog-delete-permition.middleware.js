
module.exports = (req, res, next) => {
    if(!req.headers.role || req.headers.role !== 'admin'){
        return res.status(403).json({
            message: "Permition Denied"
        })
    }

    next()  
}