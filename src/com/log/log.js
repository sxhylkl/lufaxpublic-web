/**
 * depends: jquery
 * author: fangxiao
 * date: 2014/2/13
 */
!function(window) {
	/**
	 * @class Log
	 * @constructor Log
	 */
	function Log () {

	}

	Log.prototype = {
		/**
		 * 默认值为https://perf.lufax.com/img/data.gif
		 *@property url
		 *@type {String}a
		 *@writeOnce
		 */		
		url: "https://perf." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/img/data.gif",
		/**
		 *@property _obj
		 *@type {Object}
		 *@private
		 */
		_obj: {},
		_getParm: function(obj) {
			var me = this,
				str = "";
			str += "?rnd="+new Date().getTime();
			function _copy(obj) {
				for(var i in obj) {
					str += "&"+i+"="+obj[i];
				}			
			}
			_copy(me._obj);
			_copy(obj);
			return str;			
		},
		push: function(key,value) {
			var me = this;
			me._obj[key] = value;
		},
		
		
		/**
		 * 核心方法：发送日志
		 *@method send
		 *@param {Object} obj 
		 *@example lufax.log.send({time:200,s:300});
		 */
		send: function(obj) {
			var me = this;
			var s = new Image();
			s.src = me.url+ me._getParm(obj);
			s.onerror = s.onload = function() {
				s = null;	
			};	
		}

	}
	lufax.com.Log = Log;
	lufax.com.log = new Log();
	lufax.log = lufax.com.log;
}(this);
