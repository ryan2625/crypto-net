const express = require('express');
const { addCrypto,
    getPortfolio,
    deleteCrypto
} = require('../controller/portfolioController');

/**
 * @file crypto.js
 * Define methods for handling requests to the /api/portfolio route. This includes a get request to retrieve the user's 
 * portfolio, a post request to add a crypto to the user's portfolio, and a delete request to remove a crypto from the 
 * user's portfolio.
 */

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.get("/", getPortfolio)

router.post("/", addCrypto)

router.delete("/:id", deleteCrypto)

module.exports = router;