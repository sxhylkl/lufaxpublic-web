/**
 * depends: jquery , log.js
 * author: fangxiao
 * date: 2014/2/14
 * window.log_time = {
 	 start_time: new Date().getTime();
 * }
 */


!function(window) {
	$(document).ready(function(e) {
		log_time.domready_time = new Date().getTime() - log_time.start_time;
		log_time.domcount = $("*").length;		
	});	

	window.onload = function(){ 
		log_time.load_time = new Date().getTime() - log_time.start_time;
		lufax.log.send(log_time);
	}
}(this);
