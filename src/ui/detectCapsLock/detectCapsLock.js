!function (window) {
    function DetectCapsLock(container) {
        var me = this;
        me.container = container;
    }

    DetectCapsLock.prototype = {
        template: '<div class="lufax-ui-capslock">大写状态开启</div>',


        init: function () {
            var me = this,
                container = me.container;

            container.focus(function(){
                $(this).keypress(function(event){
                    if(!me.oTip){
                        me.oTip = $(me.template).appendTo("body");
                    }

                    var keyCode = event.keyCode || event.which;
                    var isShift = event.shiftKey || (keyCode == 16) || false ;
                    if (((keyCode >= 65 && keyCode <= 90 ) && !isShift)||((keyCode >= 97 && keyCode <= 122) && isShift)){
                        me._tipOffset(this);
                    } else {
                        me.oTip.hide();
                    }
                })
            }).blur(function(){
                if(me.oTip){
                    me.oTip.hide();
                }
            })
            
        },

        _tipOffset: function (el) {
            var me = this;

            var _offset = $(el).offset();
            var _offsetTop = _offset.top;
            var _offsetLeft = _offset.left;
            var _height = me.oTip.outerHeight();
            me.oTip.css({'left':_offsetLeft, 'top':_offsetTop - _height}).show();
        }
    }

    lufax.ui.DetectCapsLock = DetectCapsLock;
}(this);