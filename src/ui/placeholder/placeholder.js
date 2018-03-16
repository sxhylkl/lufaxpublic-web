/**
 * depends: jquery
 * author: huangjunyan
 * date: 2015/1/10
 */
(function($){
    'use strict';
    $.fn.placeholder = function(options){
        var options = $.extend({
            placeholderColor:'#ccc',
            placeholderFontSize:'12px'
        },options);
        return this.each(function () {
            var that = this;
            var defaultValue = $(that).data('placeholder');
            var defaultColor = $(that).css('color');
            var defaultSize = $(that).css('fontSize');
            $(that).focus(function () {
                var pattern = new RegExp("^" + defaultValue + "$|^$");
                pattern.test($(that).val()) && $(that).val('').css({'color':defaultColor,'fontSize':defaultSize});
            }).blur(function () {
                if ($(that).val() == defaultValue||!$(that).val()) {
                    $(that).val(defaultValue).css({'color':options.placeholderColor,'fontSize':options.placeholderFontSize});
                }
            }).trigger('blur');
        });

    }
})(jQuery)