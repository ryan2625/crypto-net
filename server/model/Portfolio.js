const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model('Portfolio', portfolioSchema);