const jwt = require('jsonwebtoken')
const User = require('../model/UserModel')

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ err: "You must be logged in" })
    }

    const token = authorization.split(" ")[1]

    try{
        const {_id} = jwt.verify(token, process.env.SECRET)
        req.user = await User.findOne({_id}).select("_id")
        next()
    } catch(err){
        console.log(err)
        return res.status(401).json({err: "You must be logged in" + token})
    }
}

module.exports = requireAuth