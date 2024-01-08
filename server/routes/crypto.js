const express = require('express');

const router = express.Router();


//Get all cryptos in portfolio 
//Possible fields : name, symbol, price, quantity, total, portfolio value, date etc
router.get("/", (req, res) =>{
    res.json({mssg: "GET ALL CRYPTO"})
})


//Get single crypto in portfolio,
//This will have more fields than the table of getting ALL cryptos
router.get(":/id", (res, req) =>{
    res.json({mssg: "GET ONE CRYPTO"})
})


module.exports = router;