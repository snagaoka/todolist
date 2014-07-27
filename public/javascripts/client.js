$(document).ready(function(){
	$(".checkbox").on("click", function(){
		$(this).parent().submit();
		console.log("Hello");
	});
	var li = $("li");
	console.log(li.length);
	$("h2").append("You have " + li.length + " tasks")
});
