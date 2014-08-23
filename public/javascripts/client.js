$(document).ready(function(){
	$(".checkbox").on("click", function(){
		$(this).parent().submit();
		// console.log("Hello");
	});
	
	// var li = $("li");
	// $("h2").append("You have " + li.length + " tasks");

	var notDone = $(".notDone");
	$("h2.taskCounter").html("You have " + notDone.length + " tasks");


	// // Add task to task list
	// $("#form").submit(function(event){
	// 	event.preventDefault();
	// 	$.ajax("/", {
	// 		method: "POST",
	// 		data: $("#form").serialize(),
	// 		success: function(data){ // put new task (object) into array
	// 			var addNewTask = [data];
	// 			showAllTasks(addNewTask);

	// 		}
	// 	})
	// })


});


