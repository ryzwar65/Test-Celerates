var express = require('express')
var routes = express.Router()
var LoginController = require('../controllers/loginController')

routes.post("/login",LoginController.login)
module.exports = routes