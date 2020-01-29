var mysql = require("mysql");

// pass through the cridentials to connect to mysql and give the intended database
var connection = mysql.createConnection({
    
    HOST: "us-cdbr-iron-east-04.cleardb.net",
    USER: "b990e4bc318ffb",
    PASSWORD: "388fcb5e",
    DB: "heroku_80a7bb762a27144"

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

module.exports = connection;