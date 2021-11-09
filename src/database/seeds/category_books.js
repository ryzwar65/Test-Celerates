
exports.seed =  function(knex) {
  // Deletes ALL existing entries
  return knex('category_books').del()
    .then( function () {
      let all = []
      for (let i = 0; i < 5; i++) {
        var randBook = Math.floor(Math.random() * (6 - 1 + 1) + 1)
        var randCategory = Math.floor(Math.random() * (6 - 1 + 1) + 1)
        var obj = {
          id_book:randBook,
          id_category:randCategory
        }
        all.push(obj)
      }
      // Inserts seed entries
      return knex('category_books').insert(all);
    });
};
