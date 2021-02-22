
$(document).ready(function(){
console.log("page loaded");

getTable()

function getTable(){

$.get("/api", function(data){

$("div.dataDiv").html("");


    for(var i = 0; i < data.length; i++){
//creating new table data from form inputs
    var newRow = $("<tr>");
    var newName = $("<td>");
    var newFood = $("<td>");
    var newBtn = $("<button type='submit' id='deleteRowBtn'>Delete Item</button>")

    
//appending information to the appropriate variables

    newName.append(data[i].Firstname);
    newFood.append(data[i].food);
    newFood.append(newBtn)
    newRow.append(newName);
    newRow.append(newFood);
    newRow.addClass("foodData")

    $("#potluckTable").append(newRow)
    }

})
}

$("#addBtn").on("click", function(){
    //prevent page refresh
    event.preventDefault();

     //grabbing form inputs
    var name = $("#nameInput").val();
    var item = $("#itemInput").val();

    var data = {
        Firstname: name,
        food : item
    }
    console.log(data);
    
    

    if(!name || !item){
        alert("please type a name and Item before adding to the list")
    }
    else{
        $.post("/api", data , function(data, status){
            console.log(data);
        }).then(location.reload())
    $("#nameInput").val("");
    $("#itemInput").val("")
}
})

$("#deleteRowBtn").click(function(){
    console.log("button clicked");
    event.preventDefault();
    console.log("button clicked");
    $.get("/api", function(data){
        console.log(data);
    })
    
})

//Function for clearing the table and database
$("#clearBtn").on("click", function(){
    console.log("button pressed");
    event.preventDefault();
    $.ajax({
        url: '/api',
        type: 'DELETE',
        }
    ).done(function(){
        console.log("request sent");
        location.reload();
    })
})

})

$("#searchBtn").on("click", function(){
    event.preventDefault();

    var searchTerm = $("#recipeSearch").val();

    //Cridentials for edamam API
    var appID = "b20d1379"
    var appKey = "c47228934d4f4cdfe6888fd07a9d2df8"


    //GET request to recipe API
    $.ajax({
        method: "GET",
        url: "https://api.edamam.com/search?q=" + searchTerm + "&app_id=" + appID + "&app_key=" + appKey,
        datatype: "JSON"
    })
    .done(function(data){
        console.log(data);
        //Clear the search bar
        $("#recipeSearch").val("")
        //clear the search results div 
        $("#searchResults").html("")
        for(var i = 0; i < data.hits.length; i++){
        $("#searchResults").append("<div class='col m4 s6'><h5 class='truncate center flow-text'>" + data.hits[i].recipe.label + "</h5>" +
        "<a href=" + data.hits[i].recipe.url + ">" + "<img class='responsive-img' src=" + data.hits[i].recipe.image +"  > </a> <div>"
        )

        }
    })
    .fail(function(){
        console.log("something went wrong");
    })
})

