const { hash, compare } = require('bcryptjs') //criptografia de senha
const AppError = require('../utils/appError')

const sqliteConnection = require('../database/sqlite')

class UsersController{
/*
    * index - GET para listar vários registros.
    * show - GET para listar um registro específico.
    * create - POST para criar um registro.
    * update - PUT para atualizar um registro.
    * delete - DELETE para remover um registo.
*/

    async create(request, response){
        const { name, email, password } = request.body;
        
        const database = await sqliteConnection();
        const checkUserExist = await database.get("SELECT * FROM users WHERE email = (?)", [email]);
        
        if (checkUserExist) {
            throw new AppError("E-mail já em uso");
        }

        const hashedPassword = await hash(password, 8)

        await database.run(
            "INSERT INTO users (name,email,password) values (?,?,?)",
            [name, email, hashedPassword]
        )
        return response.status(201).json()
    }
    async update(request, response) {
        const { name, email, password, old_password } = request.body;
        const { id } = request.params;

        const database = await sqliteConnection();
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);
        if (!user) {
            throw new AppError("Usuário não encontrado");
        };
        // caso queira atualizar email
        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
            throw new AppError("Este email já está em uso");
        };

        user.name = name ?? user.name;
        user.email = email ?? user.email;

        // atualizando senha
        if (password && !old_password) {
            throw new AppError("A senha antiga precisa ser informada.");
        };

        if (password && old_password) {
            const checkOldPassword = await compare(old_password, user.password);

            if (!checkOldPassword) {
                throw new AppError("A senha antiga não confere.")
            }

            user.password = await hash(password, 8)
        };

        await database.run(
            `UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`
            , [user.name, user.email, user.password, id]
        );

        return response.json();
        
    }
}

module.exports = UsersController