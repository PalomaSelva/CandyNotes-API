const knex = require("./../database/knex");

class TagsController {
  async index(request, response) {
    const userId = request.user.id;

    const tags = await knex("tags").where({ user_id: userId }).groupBy("name");
    // groupBy não vai permitir q os dados da coluna name se repitam
    return response.json(tags);
  }
}

module.exports = TagsController;
