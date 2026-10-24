

module.exports = (req, res, next) => {
    const start = process.hrtime.bigint()

    res.on('finish', () => {
        const ms = (process.hrtime.bigint() - start) / 1000000n
        console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${ms}ms`)
    })

    next()
}
