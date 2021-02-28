var mysql = require("mysql");

// pass through the cridentials to connect to mysql and give the intended database
// var connection = mysql.createConnection({
    
//     host: "us-cdbr-iron-east-04.cleardb.net",

//     port: 3306,

//     user: "bb148d41a42cd6",

//     password: "501a8c14",
//     database: "heroku_fff6ebb5fb33f80"

// });

// // mysql://bb148d41a42cd6:501a8c14@us-cdbr-iron-east-04.cleardb.net/heroku_fff6ebb5fb33f80?reconnect=true

// connection.connect(function(err){
//     if(err) throw err;

//     console.log("Connection Successful");
//     afterConnect();
// })

// function afterConnect(){
//     connection.query("SELECT * FROM people", function(err, res){
//         if(err) throw err;

//         console.log(res);

//     });
// }

var db_config = {
    host: "us-cdbr-iron-east-04.cleardb.net",

    port: 3306,

    user: "bb148d41a42cd6",

    password: "501a8c14",
    database: "heroku_fff6ebb5fb33f80"
  };

function handleDisconnect() {
    connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                    // the old one cannot be reused.
  
    connection.connect(function(err) {              // The server is either down
      if(err) {                                     // or restarting (takes a while sometimes).
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
      }                                     // to avoid a hot loop, and to allow our node script to
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

module.exports = connection;