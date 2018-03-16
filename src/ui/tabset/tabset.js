/**
 * tabset 组件
 * author fangxiao
 * 功能: click或者hover切换  自动切换 提供二次开发扩展  因为与结构不耦合，所以能支持不同的切换。
 */
!function() { 
	/**
	 * @class Tabset
	 *
	 */
	function TabSet(titles,contents, options) {
		var me = this;
		me.titles = titles;
		me.contents = contents || [];
		me.options = options || {};
		$.extend(me, me.options);
		//me.defaultTitle = me.defaultTitle || me.titles.first();
		me.currentClass = me.currentClass || "tabs-curr";
		me.eventType = me.eventType || "mouseover";
		me.index = me.index || 0;
		me.time = me.time || 5000;
		me.isAbleChange = true;
	}
	
	TabSet.prototype._setTab = function(title,content) {
		var me = this;
		title.addClass(me.currentClass);
		title.show();
		content.show();
		if(me.lazyload && content.attr("lazyload") != "ok") {
			var imgs = content.find("img"),
				iframe = content.find("iframe");
			imgs.each(function(){
				$(this).attr("src", $(this).attr("_src"));
			});
			iframe.attr("src", $(this).attr("_src"));
			content.attr("lazyload", "ok");
		}
		if(me.mores) {
			me.mores.each(function(){
				$(this).hide();
			});
			me.mores.eq(me.index).show();
		}
	}
	
	
	TabSet.prototype._regEvent = function() {
		var me = this;
		(me.titles[me.eventType])(function() {
			var content = null;
			if(me.contents.length > 0) {
				content = me.contents.eq(me.titles.index(this));
			}
			
			me._selectTab($(this),content);
			me.isAbleChange = false;
			
		});

		me.titles.mouseout(function() {
			me.isAbleChange = true;	
		});


	}

	TabSet.prototype.init =function() {
		var me = this;
		me._regEvent();
		if(me.isAuto) {
			me.auto();	
		}
		if(me.index>0) {
			me.selectByIndex(me.index);
		}
	}

	TabSet.prototype.selectByIndex = function(index) {
		var	me = this,
			title = me.titles.eq(index),
			content = null;
		if(index >= 0 && index < me.titles.length) {
			me.contents.length > 0  && (content = me.contents.eq(index));
			me._selectTab(title,content);
		}
	}
	
	
	TabSet.prototype.next = function() {
		var me = this;
		me.selectByIndex(me.index + 1);
	}

	
	TabSet.prototype.prev = function() {
		var me = this;
		me.selectByIndex(me.index - 1);
	}
	
	TabSet.prototype.auto = function() {
		var me = this;
		window.setTimeout(function(){
			me.autoId = window.setInterval(function() {
				if(me.isAbleChange) {
					me.next();
					if(me.index == (me.titles.length-1)){
						me.index = -1;	
					}
				}	
			}, me.time);		
		},me.time);
	}

	
	
	
	TabSet.prototype._selectTab = function(title,content) {
		var me = this;
		me.titles.each(function() {
			$(this).removeClass(me.currentClass);
		});
		me.contents.each(function() {
			$(this).hide();
		});
		me.index = me.titles.index(title);
		me._setTab(title, content);

		me.select && me.select({title:title,content:content,index:me.index});
	}
	
	lufax.ui.TabSet = TabSet;
}();






