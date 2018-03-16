/**
 * depends: jquery
 * author: huangjunyan
 * date: 2014/8/12
 */
!function (window) {
    /**
     * @class loading
     * @constructor loading
     */
    function loading() {
    }

    loading.prototype = {
        count: 0,

        start: function (domId, isSmall) {
            var me = this;
            if (typeof(isSmall) == "boolean" && isSmall) {
                loading.content = '<div class="loadingWrapper loadingSmall hidden">' +
                    '<i class="loadingPic"></i>' +
                    '</div>';
            } else {
                loading.content = '<div class="loadingWrapper hidden">' +
                    '<i class="loadingPic"></i>' +
                    '<span class="loadingTips">正在处理，请稍后...</span>' +
                    '</div>';

                if (me.count != 0) {
                    ++me.count;
                    return;
                }
                ++me.count;
            }

            var domIdHandler = $("#" + domId);
            domIdHandler.append(loading.content).css("position", "relative");

            var loadingWrap = domIdHandler.children(".loadingWrapper");
            var loadingWidth = loadingWrap.outerWidth() / 2;
            var loadingHeight = loadingWrap.outerHeight() / 2;
            var parentWidth = domIdHandler.width() / 2;
            var parentHeight = domIdHandler.height() / 2;
            loadingWrap.css({"top": parentHeight - loadingHeight, "left": parentWidth - loadingWidth}).show();
        },

        end: function (domId, isSmall) {
            var me = this;
            if (typeof(isSmall) == "boolean" && isSmall) {
                $("#" + domId).find(".loadingWrapper").remove();
            } else if (--me.count == 0) {
                $("#" + domId).find(".loadingWrapper").remove();
            }
        }
    }
    lufax.ui.loading = loading;
    lufax.ui.loading = new loading();
    lufax.loading = lufax.ui.loading;
}(this);