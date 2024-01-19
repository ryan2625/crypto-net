const User = require('../model/UserModel')
const jwt = require('jsonwebtoken')

/**
 * @file userController.js
 * Define methods for handling requests to the /api/user route. This includes a post request to signup a user and a post
 * request to login a user. We also create a jsonwebtoken for the user when they signup or login to verfiy their
 * credentials when they make requests to the server. This authentication expires after 3 days.
 */

/**
 * @function createToken
 * Creates a jsonwebtoken for the user when they signup or login to verfiy their credentials when they make requests to
 * the server. This authentication expires after a year.
 * 
 * @param {String} _id : User ID created by Mongoose
 * @returns 
 */

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '365d' })
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({ email, token })

    } catch (err) {
        res.status(500).json({ err: "ERROR: " + err.message })
    }
}

const signupUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.signup(email, password)
        const token = createToken(user._id)
        res.status(200).json({ email, token })

    } catch (err) {
        res.status(500).json({ err: "ERROR: " + err.message })
    }
}

module.exports = {
    loginUser,
    signupUser
}