// JavaScript Document
$.popup = function(){
	var wwidth = $(window).width();
	var wheight = $(window).height();
	var pop_width = $(".popup_wrap").outerWidth();
	var pop_height = $(".popup_wrap").outerHeight();
	$.blockUI({
			 message: $('.popup_wrap'),
			 css: {
				 top: (wheight - pop_height)/2 + 'px',
				 left: (wwidth - pop_width)/2 + 'px',
				 textAlign: 'left',
				 width: pop_width,
				 height: pop_height
			},
        showOverlay:true
		});
}