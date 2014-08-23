$(document).ready(function(){
	$(".checkbox").on("click", function(){
		$(this).parent().submit();
	});

	$(".checkboxForm").submit(function(event){
		event.preventDefault();
		var thisCheckbox = $(this);
		$.ajax($(this).attr("action"), {
				method: "POST",
				data: $(this).serialize(),
				success: function(updatedTask){
					console.log("hurray");
					
					if (updatedTask.checked){
						thisCheckbox.parent().addClass("green");
					} else {

						thisCheckbox.parent().removeClass("green").addClass("notDone");
					}
				},

				failure: function(error){
					console.log("error");
				}
			});
	});
	
	// var li = $("li");
	// $("h2").append("You have " + li.length + " tasks");

	var notDone = $(".notDone");
	$("h2.taskCounter").html("You have " + notDone.length + " tasks");


	// Add task to task list
	$("#form").submit(function(event){
		event.preventDefault(); // stops from submitting and refreshing page
		$.ajax("/tasks", {
			method: "POST",
			data: $("#form").serialize(), // data being sent to server, serialize changes data to JSON
			success: function(newTask){ // put new task (object) into array
				// {"__v":0,"title":"class","_id":"53f90524fb087b0000c86f93"}
				var eachTask = $("<li>");
				eachTask.html(newTask.title);
				
					eachTask.append($("<form>"));



				$("ul.taskList").prepend(eachTask);

			},
			failure: function(error){
				console.log("error");
			}
		}); 
	});




});


