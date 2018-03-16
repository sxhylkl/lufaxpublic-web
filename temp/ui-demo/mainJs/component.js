/* textarea js */
$(document).ready(function(){	
	var defaultValue = $.trim($(".textarea").val());
	$(".textarea").focusin(function(){
		$(this).removeClass("default_textarea").addClass("focus_textarea");
		var getValue = $(this).val();
		if(getValue == defaultValue){
			$(this).val("");
		}
	});
	$(".textarea").focusout(function(){
		$(this).removeClass("focus_textarea").addClass("default_textarea");
		var getValue = $(this).val();
		if(getValue == ""){
			$(this).val(defaultValue);
		}
	});
});
/*call pop panel*/
$.popup = function(popClass){
	var wwidth = $(window).width();
	var wheight = $(window).height();
	var pop_width = $(popClass).outerWidth();
	var pop_height = $(popClass).outerHeight();
	$.blockUI({
			 message: $(popClass),
			 css: {
				 top: (wheight - pop_height)/2 + 'px',
				 left: (wwidth - pop_width)/2 + 'px',
				 textAlign: 'left',
				 width: pop_width,
				 height: pop_height
			}
		});
}
/**/
$(function(){
    $(".ui_grid_yellow_sort th.sort a,.ui_grid_gray th a").click(function(){
        if(!$(this).hasClass("asc")){
            $(this).addClass("asc").addClass("selected").parent().siblings().find("a").removeClass("selected").removeClass("asc");
        }else{
            $(this).removeClass("asc");
        }
    })
})