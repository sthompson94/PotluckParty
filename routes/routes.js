var connection = require("../sql/connection");
var express = require("express");
var app = express();
var router = express.Router();

//Routes
//============================================
module.exports = 
    function(app){
app.get(("/api", function(req, res){
    connection.query("SELECT * FROM people", function(err, result){
        if(err) throw err;

       return res.json(result);
    });
}));
    
    }


