$(document).ready(function(){
	$(".checkbox").on("click", function(){
		$(this).parent().submit();
	});

	$(".checkboxForm").submit(function(event){ // checked feature
		event.preventDefault();
		var thisCheckbox = $(this);
		$.ajax($(this).attr("action"), {
				method: "POST",
				data: $(this).serialize(),
				success: function(updatedTask){
					// console.log("hurray");

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
	

	// Delete button
	


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

					// create checkbox form
					var newForm = $("<form>");


					// create task text hyperlink (goes to SHOW page)
					var hrefToShow = $("<a>");
					hrefToShow.attr("href", "/tasks/" + newTask._id);
					
					var hrefTitleSpan = $("<span>").addClass("title").html(newTask.title);
					hrefToShow.append(hrefTitleSpan);


					// create edit hyperlink (goes to EDIT page)
					var linkToEdit = $("<a>", {
						href: "/tasks/" + newTask._id + "/edit", 
						text: "Edit"
					});

					// create delete button
					var buttonToDelete = $("<button>", {
						text: "Delete"
					});

				
				eachTask.append(newForm); // checkbox
				newForm.append($("<input type='checkbox' name='task'>"));
				eachTask.append(hrefToShow); // task link
				eachTask.append($("<br>"));
				eachTask.append(linkToEdit); // Edit link
				eachTask.append($("<br>"));
				eachTask.append(buttonToDelete); // Delete button

				$("ul.taskList").prepend(eachTask);

			},
			failure: function(error){
				console.log("error");
			}
		}); 
	});




});


