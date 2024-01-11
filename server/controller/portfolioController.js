const Portfolio = require('../model/Portfolio');
const Mongoose = require('mongoose');

//Get all crypto
const getPortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.find()
        res.status(200).json({ portfolio })
    } catch (error) {
        res.status(400).json({ mssg: "Error fetching portfolio" })
    }
}


//Add crypto to portfolio
const addCrypto = async (req, res) => {
    const { name } = req.body;
    try {
        const existingPortfolio = await Portfolio.findOne({ name });
        if (existingPortfolio) {
            return res.status(400).json({ error: "Coin already exists in the portfolio" });
        }
        const portfolio = await Portfolio.create({ name });
        res.status(200).json({ portfolio });
    } catch (error) {
        res.status(500).json({ error: "Error adding coin to portfolio" });
    }
};

//Delete crypto from portfolio

const deleteCrypto = async (req, res) => {
    const { id } = req.params
    const portfolio = await Portfolio.findOneAndDelete({ name : id })
    if (!portfolio) {
        return res.status(404).json({ error: "No such coin in portfolio of id:" + id })
    }
    res.status(200).json({ portfolio })
}

module.exports = {
    addCrypto,
    getPortfolio,
    deleteCrypto
}