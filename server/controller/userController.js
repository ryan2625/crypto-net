const User = require('../model/UserModel')

const loginUser = async (req, res) => {
    res.json({mssg: "Login User"})
}

const signupUser = async (req, res) => {
    const { email, password } = req.body

    try{
        const user = await User.signup(email, password)
        res.status(200).json({email, user})
    
    } catch(err){
        res.status(500).json({err: err.message})
    }
}

module.exports = {
    loginUser,
    signupUser
}