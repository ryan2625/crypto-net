const jwt = require('jsonwebtoken')
const User = require('../model/UserModel')

/**
 * @file requireAuth.js
 * This middleware verifies that the user is logged in before allowing them to make requests to the server. We use the jsonwebtoken package to verify the user's credentials with the secret we defined in the hidden .env file.
 */

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({ err: "You must be logged in" })
    }
    const token = authorization.split(" ")[1]
    try {
        const { _id } = jwt.verify(token, process.env.SECRET)
        req.user = await User.findOne({ _id }).select("_id")
        next()
    } catch (err) {
        console.log(err)
        return res.status(401).json({ err: "You must be logged in" + token })
    }
}

module.exports = requireAuth