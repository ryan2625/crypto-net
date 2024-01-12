const User = require('../model/UserModel')
const jwt = require('jsonwebtoken')


const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    try{
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({email, token})
    
    } catch(err){
        res.status(500).json({err: "ERROR: " + err.message})
    }

}

const signupUser = async (req, res) => {
    const { email, password } = req.body

    try{
        const user = await User.signup(email, password)
        const token = createToken(user._id)
        res.status(200).json({email, token})
    
    } catch(err){
        res.status(500).json({err: "ERROR: " + err.message})
    }
}

module.exports = {
    loginUser,
    signupUser
}