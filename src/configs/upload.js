const path = require("path");
// multer é uma biblioteca de middleware para lidar com uploads de arquivos em um aplicativo Node.js,
const multer = require("multer");

const crypto = require("crypto");

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
const UPLOAD_FOLDER = path.resolve(TMP_FOLDER, "uploads");

//  os arquivos enviados serão armazenados no disco usando a função de armazenamento em disco do multer.
// A função de armazenamento em disco permite especificar a pasta de destino para os arquivos.
const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;
      return callback(null, fileName); // função de callback que vai retornar o nome do arquivo
    },
  }),
};

module.exports = {
  TMP_FOLDER,
  UPLOAD_FOLDER,
  MULTER,
};
