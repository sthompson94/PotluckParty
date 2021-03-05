var connection = require("../sql/connection");
var express = require("express");
var app = express();
var router = express.Router();

//Routes
//============================================

//Route for getting all the info
router.get("/api", function(req, res){
    connection.connection.query("SELECT * FROM people", function(err, result){
        connection.connection.on('error', function(err) {
            console.log('db error', err);
            if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
              connection.handleDisconnect();                         // lost due to either server restart, or a
            } else {                                      // connnection idle timeout (the wait_timeout
              throw err;                                  // server variable configures this)
            }
          });
        console.log(result);
return res.json(result);
    })
})



//Route for posting info
router.post("/api", function(req, res){
    console.log(req.body);
    connection.query("INSERT INTO people SET ?",
    {
        Firstname: req.body.Firstname,
        food: req.body.food
    })
})

//Route for deleting the table info
router.delete("/api", function(req, res){
    connection.query("DELETE FROM people", function(err, result){
        console.log(result)
        res.json(req.body);
    })
})

router.delete("/api/:id", function(req, res){
connection.query("DELETE FROM people WHERE id = " + req.id, function(err, result){
    console.log(result);
    res.json(req.body);
})
})

    
module.exports = router;

   
