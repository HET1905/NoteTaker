const mysql = require('mysql');

module.exports = function (app) {

    // MySQL DB Connection Information 
    const connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "password",
        database: "notetaker_db"
    });

    // Initiate MySQL Connection.
    connection.connect(function (err) {
        if (err) {
            console.error(`error connecting: ${ err.stack}`);
            return;
        }
        console.log(`connected as id  ${connection.threadId}`);
    });

}