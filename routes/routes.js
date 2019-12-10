var connection = require("../sql/connection");
var express = require("express");
var app = express();
var router = express.Router();

//Routes
//============================================
router.get(("/api/all", function(req, res){
    connection.query("SELECT * FROM people", function(err, result){
        if(err) throw err;

        res.json(result)
    });
}));


module.exports = router;
