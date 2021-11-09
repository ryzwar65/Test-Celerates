require('dotenv').config()
const mysql = require('./mysql')
const postgresql = require('./postgresql')
module.exports = {

  development: {
    ...mysql
  },

};
