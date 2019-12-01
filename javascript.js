$(document).ready(function(){
console.log("page loaded");

$("#addBtn").on("click", function(){
    event.preventDefault();
     
    var name = $("#nameInput").val();
    var item = $("#itemInput").val();

    
    console.log(name , item);
})

})