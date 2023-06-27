<<<<<<< HEAD
// permite a manipulação de arquivos
=======
// manipulação de arquivos
>>>>>>> 334170da0de6a18768bf6619616977ff4d895f68
const fs = require('fs')
const path = require('path')
const uploadConfig = require('../configs/upload')

class DiskStorage {
  async saveFile(file) {
<<<<<<< HEAD
    // rename: renomeia/MOVE o arquivo
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file), // onde o arquivo está
      path.resolve(uploadConfig.UPLOAD_FOLDER, file), // para onde irá ser movido
=======
    // muda o arquivo de lugar
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOAD_FOLDER, file),
>>>>>>> 334170da0de6a18768bf6619616977ff4d895f68
    )

    return file
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOAD_FOLDER, file)

    try {
<<<<<<< HEAD
      await fs.promises.stat(filePath) // verifica se o arquivo existe, está disponível, corrompido, etc...
    } catch {
      return
    }
    // Se o arquivo existir, ele é excluído usando a função unlink()
=======
      await fs.promises.stat(filePath) // verifica se o arquivo existe usando a função
    } catch {
      return
    }
    // Se o arquivo existir, ele é excluído usando a função
>>>>>>> 334170da0de6a18768bf6619616977ff4d895f68
    await fs.promises.unlink(filePath)
  }
}

module.exports = DiskStorage
