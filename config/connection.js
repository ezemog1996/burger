var mysql = require("mysql");

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "!UCSD_fall@2020!",
        database: "burgers_db"
    });
}

connection.connect()

module.exports = connection;

