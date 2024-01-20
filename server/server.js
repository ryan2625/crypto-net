require('dotenv').config();
const cors = require('cors');
const express = require('express');
const cryptoRoutes = require("./routes/crypto");
const userRoutes = require("./routes/user");

/**
 * @file server.js
 * 
 * Initialize express app and connect to our MongoDB database, where the connection string is stored
 * in a hidden dotenv file. We also mount our routes to the app and use the express.json() middleware to parse
 * incoming requests with JSON payloads as well as cors() to allow cross-origin requests.
 */

const mongoose = require('mongoose');

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/portfolio", cryptoRoutes)
app.use("/api/user", userRoutes)

mongoose.connect(process.env.MONGO_URI).then(app.listen(process.env.PORT, () => {
    console.log('Server on portT', process.env.PORT);
})).catch(err => console.log(err))

