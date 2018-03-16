//bd hm
var hm = document.createElement("script");
hm.type = 'text/javascript';
hm.async = true;
hm.src = ("https:" == document.location.protocol ? " https:" : " http:") + "//hm.baidu.com/hm.js?9842c7dcbbff3109ea37b7407dd0e95c";
var s = document.getElementsByTagName("script")[0];
s.parentNode.insertBefore(hm, s);


/**
 *depends: jquery
 *功能：添加GA监控,baidu监控,lufax监控
 *@method statistic
 *@param 不传参
 *@example 给目标 DOM 添加属性 data-sk='关键字' (必填)<br/>
 * 属性 data-sk-type='click/pause/play/...'(选填)<br/>
 * sk: statistic keywords
 * ------------------------------------------------------
 * referrer：
 * 1. 显示的给a链接增加referrer
 * 2. 全自动，不需要用户埋点
 * ------------------------------------------------------
 * 区域统计：
 * 1. 统计区域埋点：data-sk-area = '关键字'(必填)
 * 2. 触发统计埋点：class = "sk-area-trigger"(必填)
 */

!function(){
    var statistic = {
        url: "https://perf." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/img/behavior.gif",

        _setOption:function(option){
            var me = this;
            me.option = option;
        },

        init:function(){
            /**
             * 默认方法：通用点击
             *@method init
             *@param none
             *@example lufax.statistic.init();
             */
            var me = this;
            $(document).on("mousedown","a",function(e){
                var  e = e  || window.event;
                var $target = $(e.target || e.srcElement);

                me._getSK($target);
                while($target.parent()[0]){
                    me._getSK($target.parent());
                    $target = $target.parent();
                }
            });

            $(document).on("mousedown",".sk-area-trigger",function(){
                me._area();
            });
        },

        _getSK: function($targetDom){
            var me = this,
                rdm = new Date().getTime(),
                sk = $.trim($targetDom.attr("data-sk")),
                skArea = $.trim($targetDom.attr("data-sk-area")),
                skType = $.trim($targetDom.attr("data-sk-type")) || "click";

            if(sk && sk.length>0){
                _hmt && _hmt.push(['_trackEvent', skType, 'click', sk]);
                me.send({'rdm':rdm,'data-sk':sk,'data-type':skType});
            }

            if(skArea && skArea.length>0){
                lufax.Cookie.set("_ska", skArea, rdm+15*60*1000);     //cookie expire 15min, equal system time out
            }
        },

        send:function(obj){
            /**
             * 扩展方法：发送日志
             *@method send
             *@param {Object} obj
             *@example lufax.statistic.send({abc:123});
             */
            var obj = obj || {},
                me = this,
                args = '',
                image = new Image();

            for(var i in obj){
                args += '&'+i+"="+obj[i];
            }
            args = encodeURIComponent("start-time="+me.option.start_time+args);
            image.src = me.url+"?"+args;
        },

        _area : function(){
            var _ska = lufax.Cookie.get("_ska");
            if(_ska && _ska.length>0){
                statistic.send({"skArea":_ska});
            }
        }
    }
    lufax.util.statistic = statistic;
    lufax.statistic = lufax.util.statistic;
}(this);

/*
* add refer to a[href]
* avoid no refer: https transfer to http
* */
function refer(){
    var url = top.location.protocol+"//"+top.location.host+top.location.pathname,
        except = /^(javascript|#)|lufax_ref/;

    $(document).on("mousedown","a",function(){
        var href = $.trim($(this).attr("href")),
            hash = "";

        if(!href || href.match(except)){
            return;
        }

        if(url.match("lufax_ref=")){    //remove exist referer
            url = url.substring(0, url.indexOf("lufax_ref=")-1);
        }

        if(href.match("#")){    //get hash
            hash = href.substring(href.indexOf("#"),href.length);
            href = href.substring(0,href.indexOf("#"));
        }

        var refer_url = (href.indexOf("?") > -1 ? "&" : "?") + "lufax_ref=" + encodeURIComponent(url) + hash;
        $(this).attr({"href":href+refer_url});
    });
}

$(function(){
    var start_time = new Date().getTime();
    lufax.statistic._setOption({start_time:start_time});

    lufax.statistic.init();

    //add refer
    refer();
});