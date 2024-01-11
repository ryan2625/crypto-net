const express = require("express")

const { signupUser, loginUser } = require("../controller/userController")

const router = express.Router()

router.post("/login", loginUser)


router.post("/signup", signupUser)


module.exports = router