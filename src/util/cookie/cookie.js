/**
 * depends: jquery
 * author: huangjunyan
 * date: 2014/8/12
 */
!function ( window ) {
    /**
     * @class Cookie
     * @constructor Cookie
     */

    var Cookie = {
        get: function (cookieName) {
            if (document.cookie.length > 0) {
                var c_start = document.cookie.indexOf(cookieName + "=");
                if (c_start != -1) {
                    c_start = c_start + cookieName.length + 1;
                    var c_end = document.cookie.indexOf(";", c_start);
                    if (c_end == -1) c_end = document.cookie.length;
                    return unescape(document.cookie.substring(c_start, c_end));
                }
            }
            return "";
        },

        set: function (cookieName, value, date) {
            if (date) {
                var exdate = new Date(date);
                document.cookie = cookieName + "=" + escape(value) + ";expires=" + exdate.toGMTString() + ";domain=.lufax.com;path=/";
            } else {
                document.cookie = cookieName + "=" + escape(value) + ";domain=.lufax.com;path=/";
            }
        },

        del: function (cookieName) {
            var date = new Date();
            date.setTime(date.getTime() - 24 * 60 * 60 * 1000);
            document.cookie = cookieName + "=" + ";expires=" + date.toGMTString() + ";domain=.lufax.com;path=/";
        }
    }

    lufax.util.Cookie = Cookie;
    lufax.Cookie = lufax.util.Cookie;

}(this);
