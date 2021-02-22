var express = require("express");
var path = require("path");
var routes = require("./routes/routes")
var cors = require("cors");
var app = express();
var PORT = process.env.PORT || 3000;



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

// All additional Routes
app.use("/", routes);


app.listen(PORT, function(){
    console.log("App listening on PORT" + PORT);
})