const knex = require("../database/knex");

class NotesController{
    async create(request, response) {
        const { title, description, tags, links } = request.body;
        const { user_id } = request.params;

        //  O método insert retorna um array com os IDs dos registros inseridos
        // ao utilizar a sintaxe[note_id], estamos extraindo o primeiro valor dessa lista e atribuindo-o à variável note_id.
        const [note_id] = await knex("notes").insert({
            title,
            description,
            user_id
        });

        const linksInsert = links.map(link => {
            return {
                note_id,
                url: link
            }
        });

        await knex("links").insert(linksInsert);

        const tagsInsert = tags.map(name => {
            return {
                note_id,
                name,
                user_id
            }
        });

        await knex("tags").insert(tagsInsert);

        response.json();
    }

    async show(request, response) {
        const { id } = request.params;
        // o método where({id}) é chamado para filtrar os registros da tabela onde o campo "id" seja igual ao valor da constante id
        // ao utilizar first(), estamos assegurando que apenas um registro será retornado como resultado da consulta, em vez de obter um conjunto de resultados.
        const note = await knex("notes").where({ id }).first()
        const tags = await knex("tags").where({ note_id: id }).orderBy("name")
        const links = await knex("links").where({note_id: id}).orderBy("created_at")
        
        // os três pontos(...) mesclam as propriedades de note com as propriedades tags e links
        return response.json({...note, tags, links})
    }
}

module.exports = NotesController; 