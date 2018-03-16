//mouseTips
(function ($) {
    $.fn.mouseTips = function (options) {
        var toolTipsHtml = '<p class="mouseTips"></p>';
        if ($('.mouseTips').length <= 0) {
            $('body').append(toolTipsHtml);
        }
        return this.each(function () {
            var defaultVal = {
                flagInfo:$(this).attr("title"),
                bgColor:'#ffe9ad',
                borderColor:'#fab418',
                topOffset:10,
                leftOffset:0,
                holding:false,
                placeStyle:'offset',
                tipsWidth:''
            };
            var obj = $.extend(defaultVal, options);
            var $mouseTips = $('.mouseTips');
            $(this).removeAttr("title");

            $(this).hover(function () {
                showTips(this);
                if (obj.holding == true) {
                    $(this).append($mouseTips.clone());
                    $(this).find('.mouseTips').show();
                } else {
                    $mouseTips.show();
                }

            }, function () {
                if (obj.holding == true) {
                    $(this).find('.mouseTips').remove();
                } else {
                    $mouseTips.hide();
                }


            });

            var showTips = function (el) {
                if (obj.placeStyle == 'position') {
                    var _offset = $(el).position();
                } else {
                    var _offset = $(el).offset();
                }
                var _offsetTop = _offset.top;
                var _offsetLeft = _offset.left + obj.leftOffset;
                var elHeight = $(el).height() + obj.topOffset;
                if (obj.tipsWidth === '') {
                    if (obj.flagInfo.length > 30) {
                        obj.tipsWidth = 350;
                    } else {
                        obj.tipsWidth = 'auto';
                    }
                }
                $mouseTips.css({'left':_offsetLeft, 'top':_offsetTop + elHeight, 'background-color':obj.bgColor, 'border-color':obj.borderColor, 'width':obj.tipsWidth}).html(obj.flagInfo);
            };

        });
    }
})(jQuery);