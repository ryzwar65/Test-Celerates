const bcrypt = require('bcrypt')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      password = bcrypt.hashSync("12345",10)
      // Inserts seed entries
      return knex('users').insert([
        {
          username:"admin",
          password:password
        }
      ]);
    });
};
