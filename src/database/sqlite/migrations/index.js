const sqliteConnection = require('../../sqlite');
const createUsers = require('./createUsers')

async function migrationsRun() {
    const schemas = [
        createUsers
    ].join(''); //join para tirar os espaços entre os schemas

    sqliteConnection()
        .then(db => db.exec(schemas)) // se a conexão der certo, ele vai pegar o banco e vai executar as migrations
        .catch(error => console.error(error))
}

module.exports = migrationsRun