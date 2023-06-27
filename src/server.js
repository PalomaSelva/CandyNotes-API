// explica ao servidor como lidar com o tratamento de excessões
require("express-async-errors");
const uploadConfig = require("./configs/upload");
const migrationsRun = require("./database/sqlite/migrations");
const express = require("express"); // import
const routes = require("./routes");
const AppError = require("./utils/AppError");
const cors = require("cors");

// inicializando banco de dados e migrations
migrationsRun();

// inicializando o express
const app = express();

// biblioteca que permite que o backend atenda às requisições do front
app.use(cors());

// informa o tipo de dado que irá receber
app.use(express.json());

// para mostrar a imagem do avatar ao fazer uma requisição
app.use("/files", express.static(uploadConfig.UPLOAD_FOLDER));

// inicializando roteador
app.use(routes);

// manipulando erro
app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    // se as instâncias do erro atual foram as mesmas do erro definido no AppError
    return response.status(error.statusCode).json({
      message: error.message,
      statusCode: error.statusCode,
    });
  }
  return response.status(500).json({
    message: "Internal Server Error",
    statusCode: 500,
  });
});

const PORT = 3000; // porta URL
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
