const mongoose = require('mongoose');

/**
 * @file Portfolio.js
 * This file defines our user portfolio model that will allow us to store the user's portfolio in our MongoDB database.
 */

const portfolioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    marketRate: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model('Portfolio', portfolioSchema);