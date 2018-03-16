/**
 * name: sign in component
 * depends: jquery
 * author: huangjunyan
 * date: 2014/07/22
 */
!function (window) {

    function Checkin(container, options) {
        var me = this;
        me.container = container;
        me.options = options || {};
        me.beforeTxt = '签到赚积分';
        me.afterTxt = '今日已签到';
        $.extend(me, me.options);
    }

    Checkin.prototype = {
        template: '<a href="javascript:void(0);" hidefocus="" id="btn-sign" class="!${cls} btn-sign">!${txt}</a>',
        /**
         * 初始化方法：渲染样式绑定事件
         *@method init
         *@example lufax.SignIn.int();
         */
        init: function () {
            var me = this,
                beforeTxt = me.beforeTxt,
                afterTxt = me.afterTxt,
                url = {
                    isUserSignIn: 'https://points.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/points/service/points/is-user-sign-in?jsoncallback=?',
                    iframeSrc: '//points.lufax.com/points/public/checkin'
                };
            $.getJSON(url.isUserSignIn, function (data) {
                if (data.result == "02") {
                    me._bindEvent(beforeTxt, function () {
                        location.href = "https://user." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/user/login?returnPostURL=" + encodeURIComponent(location.href);
                    });
                } else if (data.result == "01") {
                    me._bindEvent(afterTxt, function () {
                        me._popup(url.iframeSrc);
                    });
                    me._afterChecked();
                } else if (data.result == "00") {
                    me._bindEvent(beforeTxt, function () {
                        me._popup(url.iframeSrc);
                    });
                }
            });
        },
        /**
         *method private
         *绑定操作时间
         */
        _bindEvent: function (txt, func) {
            var me = this,
                container = me.container,
                cls = me.cls,
                mergedResult = me.template.replace("!${cls}", cls).replace("!${txt}", txt);
            container.html(mergedResult);
            container.on('click', '#btn-sign', function () {
                func();
            });
        },
        _afterChecked: function () {
            var me = this,
                afterTxt = me.afterTxt,
                container = me.container;
            container.find('.btn-sign').addClass('done').text(afterTxt);
            container.off('click', '#btn-sign');
        },
        /**
         *method private
         *弹窗
         */
        _popup: function (srcUrl) {
            var me = this;
            lufax.popup.blankPopup({
                content: '<div class="modal-sigIn-popup">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header clearfix">' +
                    '<div class="close">' +
                    '<a class="modal-close" href="javascript:void(0);"></a>' +
                    '</div>' +
                    '<h4 class="modal-title">签到赚积分</h4>' +
                    '</div>' +
                    '<div class="modal-body clearfix">' +
                    '<iframe frameborder="0" scrolling="no" width="100%" height="270" src="' + srcUrl + '"></iframe>' +
                    '</div>' +
                    '</div>' +
                    '</div>',
                onClose: function () {
                    window.location.reload();
                }
            });
        }
    }
    lufax.com.Checkin = Checkin;
}(this);