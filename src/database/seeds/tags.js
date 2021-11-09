
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(async function () {
      const data = [
        "Love Stories",
        "Social of Life",
        "Motivation",
        "Psychological ",
        "Emotions",
        "Family Matters",
      ]
      let all = []
      data.map(val=>{
        all.push({tag_name:val})
      })
      // Inserts seed entries
      return knex('tags').insert(all);
    });
};
