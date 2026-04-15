// middleware to check if user is authenticated
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {


    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
        const token = authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
    else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY)
            req.user = decoded
            next()
        }
        catch (error) {
            return res.status(401).json({ error: 'Unauthorized' })
        }
    }

}