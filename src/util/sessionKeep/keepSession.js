/**
 * depends: jquery
 * author: wangyaqiong
 * date: 2015/4/1
 */

$(function(){
    function lufaxKeepSession() {
        var img = new Image();
        img.src = location.protocol + '//user.lufax.com/user' + '/keepSession.gif?timestamp=' + new Date().getTime();
        if (img.complete) {
            img = null;
        }
        else {
            img.onload = function () {
                img.onload = null;
                img = null;
            }
        }
    }

    function lukeepSession() {
        var uuidUrl = location.protocol + '//user.lufax.com/user/cookie/cache';
        $.getJSON(uuidUrl + '?jsoncallback=?', function(data) {
            if (data) {
                var uuid = data["_lu_uuid"];
                var img = new Image();
                img.src = location.protocol + '//user.lu.com/user' + '/newKeepSession.gif?timestamp=' + new Date().getTime() + '&_lu_uuid=' + uuid;
                if (img.complete) {
                    img = null;
                }
                else {
                    img.onload = function () {
                        img.onload = null;
                        img = null;
                    }
                }
            }
        })
    }

    var domain = location.hostname.split(".").slice(location.hostname.split(".").length - 2).join(".");
    if (domain.indexOf('lufax') == 0) {
        lufaxKeepSession();
    }
    else {
        if (domain.indexOf('lu') == 0) {
            lukeepSession();
        }
    }
});