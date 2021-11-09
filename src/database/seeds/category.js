
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return knex('category').del()
    .then(async function () {
      const data = [
        "Novel",
        "Love",
        "Motivation",
        "Slice of Life",
        "Family",
        "Scifi",
      ]
      let all = []
      data.map(val=>{
        all.push({category_name:val})
      })
      // Inserts seed entries
      return knex('category').insert(all);
    });
};
