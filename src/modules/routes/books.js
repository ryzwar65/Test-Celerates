var express = require('express')
var routes = express.Router()
var BookController = require('../controllers/bookController')
var {authJWT} = require('../../middlewares/auth')

routes.post("/",authJWT,BookController.post)
routes.patch("/:bookId/update/category/:categoryId",authJWT,BookController.update)
routes.post("/:bookId/update/category/_bulk",authJWT,BookController.updateBulk)
routes.get("/",authJWT,BookController.getAll)
routes.get("/:bookId",authJWT,BookController.getFindById)
routes.delete("/:bookId/",authJWT,BookController.delete)
module.exports = routes