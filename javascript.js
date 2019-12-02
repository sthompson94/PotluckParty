$(document).ready(function(){
console.log("page loaded");

$("#addBtn").on("click", function(){
    //prevent page refresh
    event.preventDefault();
     //grabbing form inputs
    var name = $("#nameInput").val();
    var item = $("#itemInput").val();
//creating new table data from form inputs
    var newRow = $("<tr>");
    var newName = $("<td>");
    var newFood = $("<td>");

    
//appending information to the appropriate variables
    newName.append(name);
    newFood.append(item);
    newRow.append(newName);
    newRow.append(newFood);
//appending the new row to the table
    $("#potluckTable").append(newRow)

    
    //clear the form fields.
    $("#nameInput").val("");
    $("#itemInput").val("")
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
    })
    .fail(function(){
        console.log("something went wrong");
    })
})