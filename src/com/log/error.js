/**
 * depends: jquery , log.js
 * author: huangjunyan
 * date: 2014/4/1
 */


!function(window) {
    window.onerror = function(message, url, line) {
        if (!url) return;
        var msg = {};

        msg.message = message.message;
        msg.line = line;
        lufax.log.send(msg);
    };
}(this);
