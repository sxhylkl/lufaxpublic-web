/*---module js---*/
$(function(){
	$(".menuTitle").click(function(){
		$(this).siblings(".menuItem").toggleClass("hidden");
	});
});