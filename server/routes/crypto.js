const express = require('express');
const { addCrypto,
    getPortfolio,
    deleteCrypto
} = require('../controller/portfolioController');

const router = express.Router();

//Get all cryptos in portfolio 
//Possible fields : name, symbol, price, quantity, total, portfolio value, date etc
router.get("/", getPortfolio)

router.post("/", addCrypto)

router.delete("/:id", deleteCrypto)

module.exports = router;