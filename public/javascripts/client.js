$(document).ready(function(){
	$(".checkbox").on("click", function(){
		$(this).parent().submit();
		// console.log("Hello");
	});
	
	// var li = $("li");
	// $("h2").append("You have " + li.length + " tasks");

	var notDone = $(".notDone");
	$("h2").html("You have " + notDone.length + " tasks");

});



