// To see the documentation for the backend to this app, visit https://github.com/ryan2625Backup/crypto-api/tree/backend-test/server. The code here is NOT hosted on the live app due to the nature of the hosting service cyclic.sh.

require('dotenv').config();
const cors = require("cors");
const express = require('express');
const cryptoRoutes = require("./routes/crypto");
const userRoutes = require("./routes/user");

const mongoose = require('mongoose');

const app = express();

app.use(express.json());


app.use(cors());

app.use("/api/portfolio", cryptoRoutes)
app.use("/api/user", userRoutes)

mongoose.connect(process.env.MONGO_URI).then(app.listen(process.env.PORT, () => {
    console.log('Server on portT', process.env.PORT);
})).catch(err => console.log(err))

