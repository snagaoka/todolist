$(document).ready(function(){
	$(".checkbox").on("click", function(){
		$(this).parent().submit();
		console.log("Hello");
	});
});