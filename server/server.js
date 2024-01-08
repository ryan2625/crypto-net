require('dotenv').config();
const express = require('express');
const cryptoRoutes = require("./routes/crypto");

const app = express();

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

app.use("/api/portfolio", cryptoRoutes)

app.listen(process.env.PORT, () =>{
    console.log('Server on port', process.env.PORT);
})


