const sqlite3 = require("sqlite3"); // drive que estabelece a comunicação com o banco de dados
const sqlite = require("sqlite"); // conecta ao banco
const path = require("path");

async function sqliteConnection() {
  const database = await sqlite.open({
    filename: path.resolve(__dirname, "..", "database.db"), // para não dar merda qnd o sistema operacional for diferente
    driver: sqlite3.Database,
  });
  return database;
}

module.exports = sqliteConnection;
