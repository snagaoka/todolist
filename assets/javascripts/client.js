$(document).ready(function(){

	// Run this first
	function updateTaskCounter(){
		var notDone = $(".notDone");
		$("h2.taskCounter").html("You have " + notDone.length + " tasks");
	}
	updateTaskCounter();

	// Event trigger - sets up checkbox as a form submission
	// Triggers event below
	$("ul.taskList").on("click", ".checkbox", function(){
		$(this).parent().submit();
		console.log("check");
	});

	// Event triggered by checkbox above
	// Sets to green
	$("ul.taskList").on("submit", ".checkboxForm", function(event){ // checked feature
		event.preventDefault();
		var thisCheckboxForm = $(this);
		$.ajax($(this).attr("action"), {
				method: "POST",
				data: $(this).serialize(),
				success: function(updatedTask){
					console.log("hurray");

					if (updatedTask.checked){
						thisCheckboxForm.parent().addClass("green");
					} else {
						thisCheckboxForm.parent().removeClass("green").addClass("notDone");
					}

				},
				failure: function(error){
					console.log("error");
				}
			});
	});
	

	// Delete button
	$("ul.taskList").on("click", ".deleteButton", function(){
		$(this).parent().submit();
	});

	$("ul.taskList").on("submit", ".deleteForm", function(event){
		event.preventDefault();
		var thisDeleteForm = $(this);
		// console.log(thisDeleteForm);
		$.ajax($(this).attr("action"), {
			method: "POST",
			data: $(this).serialize(),
			success: function(deletedTask){
				thisDeleteForm.parent().remove();

				updateTaskCounter();

			},
			failure: function(error){
				console.log("error");
			}

		});
	});

	// Add task to task list
	$("#addForm").submit(function(event){
		event.preventDefault(); // stops from submitting and refreshing page
		$.ajax("/tasks", {
			method: "POST",
			data: $("#addForm").serialize(), // data being sent to server, serialize changes data to JSON
			success: function(newTask){ // put new task (object) into array
				// {"__v":0,"title":"class","_id":"53f90524fb087b0000c86f93"}
				var eachTask = $("<li>").addClass('notDone');

					// create checkbox form
					var newForm = $("<form>", {
						class: "checkboxForm",
						action: "/tasks/completed/" + newTask._id
					});


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
					var deleteForm = $("<form />", {
						class: "deleteForm",
						action: "/tasks/" + newTask._id + "?_method=DELETE",
						method: "POST",
						enctype: "application/x-www-form-urlencoded"
					});

					var buttonToDelete = $("<button />", {
						class: "deleteButton",
						text: "Delete"
					});

			
				eachTask.append(newForm); // checkbox
				newForm.append($("<input type='checkbox' name='task' class='checkbox'>"));
				eachTask.append(hrefToShow); // task link
				eachTask.append($("<br>"));
				eachTask.append(linkToEdit); // Edit link
				eachTask.append($("<br>"));
				eachTask.append(deleteForm); // Delete button
				deleteForm.append(buttonToDelete);

				$("ul.taskList").prepend(eachTask);

				updateTaskCounter();

			},
			failure: function(error){
				console.log("error");
			}
		}); 
	});




});


