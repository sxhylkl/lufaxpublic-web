/**
 * depends: jquery,numFormat
 * author: huangjunyan
 * date: 2014/8/12
 */
(function ($) {
    $.fn.zoomTips = function (options) {
        var defaultVal = {
            isCash:false
        };
        var obj = $.extend(defaultVal, options);
        var tipsHtml = '<div class="zoomTips"></div>';
        $('body').append(tipsHtml);
        return this.each(function () {
            $(this).blur(function () {
                var showVal = $(this).val();
                if (obj.isCash) {
                    showVal = showVal;

                } else {
                    showVal = showVal.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
                }
                $(this).val(showVal);
                tipsOut();
            });
            $(this).bind('focus', function () {
                var showVal = $(this).val();
                if (showVal.length == 0) {
                    tipsOut();
                } else {
                    showCurVal(showVal);
                    tipsIn(this);
                }
            });
            $(this).bind('keydown keyup', function () {
                var showVal = $(this).val();
                if (obj.isCash) {
                    showVal = showVal;
                    $(this).next().text(lufax.NumFormat.convertCurrency(showVal));
                } else {
                    showVal = showVal.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
                }
                if (showVal.length > 0) {
                    showCurVal(showVal);
                    tipsIn(this);
                } else {
                    tipsOut();
                }
            });

            function showCurVal(val) {
                if (obj.isCash) {
                    $('.zoomTips').text(lufax.NumFormat.numberFormatWithoutCurrency(val));
                } else {
                    $('.zoomTips').text(val);
                }

            }

            function tipsIn(el) {
                var _offset = $(el).offset();
                var _offsetTop = _offset.top;
                var _offsetLeft = _offset.left;
                var elHeight = $(el).innerHeight();
                $('.zoomTips').css({'left':_offsetLeft, 'top':_offsetTop + 30}).show();
            }

            function tipsOut() {
                $('.zoomTips').hide();
            }
        });

    }
})(jQuery);