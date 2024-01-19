const express = require("express")

const { signupUser, loginUser } = require("../controller/userController")

/**
 * @file user.js
 * Define methods for handling requests to the /api/user route. This includes a post request to signup a user and a post 
 * request to login a user.
 */

const router = express.Router()

router.post("/login", loginUser)

router.post("/signup", signupUser)


module.exports = router