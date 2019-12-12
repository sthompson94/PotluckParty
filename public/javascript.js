$(document).ready(function(){
console.log("page loaded");

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
    $.post("/api", data , function(data, status){
        console.log(data);
    })
    

    if(!name || !item){
        alert("please type a name and Item before adding to the list")
    }
    else{
//creating new table data from form inputs
    var newRow = $("<tr>");
    var newName = $("<td>");
    var newFood = $("<td>");

    
//appending information to the appropriate variables
$.get("/", function(data){
    console.log(data);
})
    newName.append(name);
    newFood.append(item);
    newRow.append(newName);
    newRow.append(newFood);
//appending the new row to the table
    $("#potluckTable").append(newRow)

    
    //clear the form fields.
    $("#nameInput").val("");
    $("#itemInput").val("")
}
})

})

$("#searchBtn").on("click", function(){
    event.preventDefault();

    var searchTerm = $("#recipeSearch").val();
    var appID = "b20d1379"
    var appKey = "c47228934d4f4cdfe6888fd07a9d2df8"

    $.ajax({
        method: "GET",
        url: "https://api.edamam.com/search?q=" + searchTerm + "&app_id=" + appID + "&app_key=" + appKey,
        datatype: "JSON"
    })
    .done(function(data){
        console.log(data);
        $("#recipeSearch").val("")
        $("#searchResults").html("")
        for(var i = 0; i < data.hits.length; i++){
        $("#searchResults").append("<h4>" + data.hits[i].recipe.label + "</h4>" +
        "<a href=" + data.hits[i].recipe.url + ">" + "<img src=" + data.hits[i].recipe.image + "> </a>"
        )

        }
    })
    .fail(function(){
        console.log("something went wrong");
    })
})