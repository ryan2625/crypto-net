const express = require('express');
const cors = require("cors");
const { addCrypto,
    getPortfolio,
    deleteCrypto
} = require('../controller/portfolioController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

//Get all cryptos in portfolio 
//Possible fields : name, symbol, price, quantity, total, portfolio value, date etc
router.get("/", getPortfolio)

router.post("/", addCrypto)

router.delete("/:id", deleteCrypto)

module.exports = router;