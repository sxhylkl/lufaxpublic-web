/**
 * depends: jquery
 * author: huangjunyan
 * date: 2014/9/10
 */
!function (window) {
    /**
     * @class limitText
     * @constructor limitText
     */

    var limitText = {
        init: function (el, limit) {
            var text = $(el).text();
            var text_length = text.length;
            if (text_length > limit) {
                var new_text = text.slice(0, limit);
                $(el).text(new_text + "...");
            }
        }
    }

    lufax.util.limitText = limitText;
    lufax.limitText = lufax.util.limitText;
}(this);