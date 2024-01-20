const Portfolio = require('../model/Portfolio');

//Get all crypto located in a user's portfolio
const getPortfolio = async (req, res) => {
    try {
        const user_id = req.user._id;
        const portfolio = await Portfolio.find({ user_id })
        res.status(200).json({ portfolio })
    } catch (error) {
        res.status(400).json({ mssg: "Error fetching portfolio" })
    }
}


//Add crypto to portfolio
const addCrypto = async (req, res) => {
    const { name, image, link, marketRate } = req.body;
    try {
        const user_id = req.user._id;
        const existingPortfolio = await Portfolio.find({ name: name, user_id: user_id });
        if (existingPortfolio.length > 0) {
            return res.status(400).json({ error: "error" });
        }
        const portfolio = await Portfolio.create({ name, image, link, marketRate, user_id });
        res.status(200).json({ portfolio });
    } catch (error) {
        res.status(500).json({ error: "Error adding coin to portfolio" });
    }
};

//Delete crypto from portfolio
const deleteCrypto = async (req, res) => {
    const { id } = req.params
    const portfolio = await Portfolio.findOneAndDelete({ name: id })
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
