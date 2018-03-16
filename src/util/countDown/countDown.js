/**
 * depends: jquery
 * author: huangjunyan
 * date: 2014/8/12
 */
!function (window) {
    /**
     * @class countDown
     * @constructor countDown
     */
    function countDown(container,options) {
        var me = this;
        me.container = container;
        me.options = options || {};
        me.countDownSeconds = 0;
        me.doubleDigit = true;
        me.secondsOnly = false;
        me.callback = function () {
            return false;
        };
        $.extend(me, me.options);
    }

    countDown.prototype = {


        init: function () {
            var me = this;
            me._render(me.countDownSeconds);
            if (me.countDownSeconds == 0) {
                me.callback();
            } else {
                --me.countDownSeconds;
                setTimeout($.proxy(me.init, me), 1000)
            }
        },

        _render: function (remainSeconds) {
            var me = this,
                seconds;
            if (me.secondsOnly == true) {
                seconds = me._zero(remainSeconds);
            } else {
                seconds = me._zero(remainSeconds % 60);
            }
            var minutes = me._zero(Math.floor(remainSeconds / 60) % 60);
            var hours = me._zero(Math.floor(remainSeconds / 60 / 60) % 24);
            var days = me._zero(Math.floor(remainSeconds / 60 / 60) / 24);
            me._display({days: days, seconds: seconds, minutes: minutes, hours: hours});
        },

        _zero: function (n) {
            var me = this;
            var n = parseInt(n, 10);
            if (n > 0 && me.doubleDigit == true) {
                if (n <= 9) {
                    n = "0" + n;
                }
                return String(n);
            } else if (n >= 0 && me.doubleDigit == false) {
                return String(n);
            } else {
                return "00";
            }
        },

        _display: function (option) {
            var me = this,
            container = me.container;
            container.find(".countDownDay").html(option.days);
            container.find(".countDownHour").html(option.hours);
            container.find(".countDownMin").html(option.minutes);
            container.find(".countDownSec").html(option.seconds);
        }

    }
    lufax.util.countDown = countDown;
}(this);