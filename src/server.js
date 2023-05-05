// explica ao servidor como lidar com o tratamento de excessões
require('express-async-errors');

const database = require("./database/sqlite")
const express = require("express"); //import
const routes = require('./routes');
const AppError = require('./utils/appError');

//inicializando o express
const app = express(); 

//informa o tipo de dado que irá receber
app.use(express.json()); 

// inicializando roteador 
app.use(routes);

// inicializando banco de dados
database()

// manipulando erro
app.use((error,request,response,next)=>{
    if(error instanceof AppError){ //se as instâncias do erro atual foram as mesmas do erro definido no AppError
        return response.status(error.statusCode).json({
            message:error.message,
            statusCode:error.statusCode
        })
    }
    console.error(error)
    return response.status(500).json({
        message:'Internal Server Error',
        statusCode:500
    })
    })

const PORT = 3000; //porta URL 
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));



