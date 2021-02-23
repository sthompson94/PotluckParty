var mysql = require("mysql");

// pass through the cridentials to connect to mysql and give the intended database
var connection = mysql.createPool({
    
    host: "us-cdbr-iron-east-04.cleardb.net",

    port: 3306,

    user: "bb148d41a42cd6",

    password: "501a8c14",
    database: "heroku_fff6ebb5fb33f80"

});

// mysql://bb148d41a42cd6:501a8c14@us-cdbr-iron-east-04.cleardb.net/heroku_fff6ebb5fb33f80?reconnect=true

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

module.exports = connection;