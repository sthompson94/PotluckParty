var express = require("express");
var path = require("path");
var router = express.Router()
var cors = require("cors");
var app = express();
var mysql = require("mysql");
var PORT = process.env.PORT || 3000;


//Database Cridentials
var db_config = {
    host: "us-cdbr-iron-east-04.cleardb.net",

    port: 3306,

    user: "bb148d41a42cd6",

    password: "501a8c14",
    database: "heroku_fff6ebb5fb33f80"
  };


  //connecting to the database, using a function to handle any disconnects
var connection= mysql.createConnection(db_config);

function handleDisconnect() {
    connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                    // the old one cannot be reused.
  
    connection.connect(function(err) {              // The server is either down
      if(err) {                                     // or restarting (takes a while sometimes).
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
      }
      console.log("Connection Successful")  // to avoid a hot loop, and to allow our node script to
      afterConnect();
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
        handleDisconnect();                         // lost due to either server restart, or a
      } else {                                      // connnection idle timeout (the wait_timeout
        throw err;                                  // server variable configures this)
      }
    });
  }

  handleDisconnect();


  function afterConnect(){
    connection.query("SELECT * FROM people", function(err, res){
        if(err) throw err;

        console.log(res);

    });
}

//set up app to use cors middleware
app.use(cors());

//set up express to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

//basic route that sends the index.html page

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "index.html"));
});

app.use(router);

// All additional Routes
//Routes
//============================================

//Route for getting all the info
router.get("/api", function(req, res){
    connection.query("SELECT * FROM people", function(err, result){
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



app.listen(PORT, function(){
    console.log("App listening on PORT" + PORT);
})