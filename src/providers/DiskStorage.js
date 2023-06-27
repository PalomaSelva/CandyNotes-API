// manipulação de arquivos
const fs = require('fs')
const path = require('path')
const uploadConfig = require('../configs/upload')

class DiskStorage {
  async saveFile(file) {
    // muda o arquivo de lugar
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOAD_FOLDER, file),
    )

    return file
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOAD_FOLDER, file)

    try {
      await fs.promises.stat(filePath) // verifica se o arquivo existe usando a função
    } catch {
      return
    }
    // Se o arquivo existir, ele é excluído usando a função
    await fs.promises.unlink(filePath)
  }
}

module.exports = DiskStorage
