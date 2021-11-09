const faker = require('faker')
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return knex('books').del()
    .then(async function () {
      let all = []
      const data = [
        "Love is Life",
        "A Cent to Billion Dollars",
        "Butterfly never Come",
        "Things a Hole",
        "Family 1000",
        "Break Your Limit!",
      ]
      for (let i = 0; i < 6; i++) {
          var obj = {
            book_name:data[i],
            writer:faker.name.findName(),
            publisher:faker.company.companyName(),
            date_publish:faker.date.past()
          }
          all.push(obj)
      }
      // Inserts seed entries
      return knex('books').insert(all);
    });
};
