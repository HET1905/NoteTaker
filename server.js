const express = require("express");
var mysql = require("mysql");
var path = require("path");
var htmlRoutes = require("./routing/html-routes");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// connection with Mysql server database.
//================================================================
// require('./routing/connection.js')(app);

// Sets up the Express app to handle data parsing
// ============================================================
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public'));

app.use(htmlRoutes);


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log(`Server listening on: http://localhost:${PORT} `);
});