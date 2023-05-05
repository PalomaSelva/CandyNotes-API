const AppError = require('../utils/appError')

class UsersController{
/*
    * index - GET para listar vários registros.
    * show - GET para listar um registro específico.
    * create - POST para criar um registro.
    * update - PUT para atualizar um registro.
    * delete - DELETE para remover um registo.
*/

    create(request, response){
        const {name,age,email,password} = request.body
        if(!name){
            throw new AppError("Nome é obrigatório")
        }
        response.status(201).send(
            {name,age,email,password}
        )
    }

}

module.exports = UsersController