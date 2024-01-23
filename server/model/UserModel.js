const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const validator = require('validator');

/**
 * @file UserModel.js
 * 
 * This file defines our user model that will allow us to store the user's portfolio in our MongoDB database. We also have two static methods that will allow us to signup and login a user. We use the validator package to validate the user's email and password, and we use the bcryptjs package to hash the user's password before storing it in the database.
 */

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

})

userSchema.statics.signup = async function (email, password) {

    if (!email || !password) {
        throw new Error('All fields are required')
    }

    if (!validator.isEmail(email)) {
        throw new Error('Please enter a valid email')
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error('Password not strong enough')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw new Error('Email already exists')
    }

    const salt = await bcryptjs.genSalt(8)
    const hash = await bcryptjs.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
}

userSchema.statics.login = async function (email, password) {

    if (!email || !password) {
        throw new Error('All fields are required')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw new Error('Incorrect email')
    }

    const isMatch = await bcryptjs.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Incorrect password')
    }

    return user
}


module.exports = mongoose.model('User', userSchema);