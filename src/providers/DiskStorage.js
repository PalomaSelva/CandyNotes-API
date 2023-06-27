// permite a manipulação de arquivos
const fs = require('fs')
const path = require('path')
const uploadConfig = require('../configs/upload')

class DiskStorage {
  async saveFile(file) {
    // rename: renomeia/MOVE o arquivo
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file), // onde o arquivo está
      path.resolve(uploadConfig.UPLOAD_FOLDER, file), // para onde irá ser movido
    )

    return file
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOAD_FOLDER, file)

    try {
      await fs.promises.stat(filePath) // verifica se o arquivo existe, está disponível, corrompido, etc...
    } catch {
      return
    }
    // Se o arquivo existir, ele é excluído usando a função unlink()
ink(filePath)
  }
}

module.exports = DiskStorage
