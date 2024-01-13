const mongoose = require('mongoose');

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