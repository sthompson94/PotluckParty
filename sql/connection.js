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

