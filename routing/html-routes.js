var path = require("path");
var mysql = require('mysql');
var router = require('express').Router();
var connection = require('./connection.js');

// const connection = mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "password",
//     database: "notetaker_db"
// });

// // Initiate MySQL Connection.
// connection.connect(function (err) {
//     if (err) {
//         console.error(`error connecting: ${ err.stack}`);
//         return;
//     }
//     console.log(`connected as id  ${connection.threadId}`);
// });

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '../public/index.html'));
});

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname + '/../public/notes.html'));
});


router.get('/api/notes', (req, res) => {
    connection.query('SELECT * FROM notes', (err, result) => {
        if (err) {
            throw err;
        }
        res.send( result);
    });
});

router.post('/api/notes',(req,res)=>{
    // console.log(req.body);
    connection.query(`INSERT INTO notes(title,body) values(?,?)`,[req.body.title,req.body.body],(err,result)=>{
        if(err){
            console.log(`Error in inserting data in table ${err}`);
        }
            // res.send(true);
            res.redirect('/');  
        
        
    });
    
});

router.delete('/api/notes/:id', function(req, res) {
    connection.query("DELETE FROM notes WHERE id = ?", [req.params.id], function(err, result) {
      if (err) {
        // If an error occurred, send a generic server failure
        return res.status(500).end();
      }
     
      res.status(200).end();
  
    });
  });
  

module.exports = router;