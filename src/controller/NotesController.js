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

        return response.json();
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

    async delete(request, response) {
        const { id } = request.params;

        await knex("notes").where({ id }).delete()
        
        return response.json()
    }

    async index(request, response) {
        const {user_id, title, tags} = request.query
        let notes

        if (tags) {
            const filterTags = tags.split(',').map(tag => tag.trim()) // tim() tira os espaços de antes e depois

            notes = await knex("tags")
                .select([
                    "notes.id",
                    "notes.title",
                    "notes.user_id"
                ])
                .where("notes.user_id", user_id)
                .whereLike("notes.title", `%${title}%`)
                .whereIn("name", filterTags)
                .innerJoin("notes", "notes.id", "tags.note_id")
                .orderBy("notes.title")
            
        } else{
            notes = await knex("notes")
                .where({ user_id })
                .whereLike("title", `%${title}%`) // O % indica que o valor de title pode estar em qualquer posição dentro do campo title // e pode ser precedido ou seguido por qualquer sequência de caracteres.
                .orderBy("title")

        }

        const userTags = await knex("tags").where({ user_id });
        const notesWithTags = notes.map(note => {
            const noteTags = userTags.filter(tag => tag.note_id === note.id)

            return {
                ...note,
                tags: noteTags
            }
        })
        return response.json(notesWithTags)
    }
        
}

module.exports = NotesController; 