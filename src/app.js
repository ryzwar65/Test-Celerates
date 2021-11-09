const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const helmet = require('helmet')
require('dotenv').config()
const routes = require("./modules/routes")

const app = express()
app.use(helmet())
const corsOptions = {
    origin: '*',
    credential:true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use("/api/",routes)

module.exports = app