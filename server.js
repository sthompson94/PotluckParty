var express = require("express");
var path = require("path");
// var connection = require("./sql/connection");


// var routes = require("./routes/routes")

var app = express();
var PORT = 3000;

var mysql = require("mysql");

// pass through the cridentials to connect to mysql and give the intended database
var connection = mysql.createConnection({
    
    host: "localhost",

    port: 3306,

    user: "root",

    password: "password",
    database: "potluck_db"

});

//connect to the database
connection.connect(function(err){
    if(err) throw err;

    console.log("Connection Successful");
    afterConnect();
})

function afterConnect(){
    connection.query("SELECT * FROM people", function(err, res){
        if(err) throw err;

        console.log(res);

    });
}



//set up express to handle data parsing

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

//basic route that sends the index.html page

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api", function(req, res){
    connection.query("SELECT * FROM people", function(err, result){
        console.log(result);
return res.json(result);
    })
})

app.post("/api", function(req, res){
    console.log(req);
    connection.query("INSERT INTO people SET ?",
    {
        Firstname: req.body.Firstname,
        food: req.body.food
    })
})

app.delete("/api", function(req, res){
    connection.query("DELETE FROM people", function(err, result){
        console.log(result)
        res.json(req.body);
    })
})

//additonal routes
// app.use("/", routes);

app.listen(PORT, function(){
    console.log("App listening on PORT" + PORT);
})