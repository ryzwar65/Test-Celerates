var express = require('express')
var routes = express.Router()
var auth = require('./auth')
var books = require('./books')

routes.use("/auth",auth)
routes.use("/books",books)

module.exports = routes