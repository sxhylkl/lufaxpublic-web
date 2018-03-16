/**
 * 公共庫的入口模块
 * @module lufax
 */

window.lufax = window.lufax || {
	/**
	 * lufax版本
	 * @property version
	 * @type string
	 */
	version: "0.1"
};

/**
 * @module lufax
 * @submodule com
 */
lufax.com = lufax.com || {};

/**
 * depends: jquery,lufaxLib,blockUi,datepicker
 * author: huangjunyan
 * date: 2014/4/3
 */


!function (window) {
    /**
     * @class Checkin
     * @constructor Checkin
     */
    function Checkin($container, cls) {
        var me = this;
        me.container = $container;
        me.cls = cls || 'points-checkin-btn';
    }

    Checkin.prototype = {
        template: ' <iframe frameborder="0" scrolling="no" width="100%" height="!${height}" name="pointsCheckinIframe" src="!${protocol}//points.lufax.com/points/index/sign?callback=pointsCheckinModel&btnClass=!${cls}"></iframe>',
        /**
         * 初始化方法：装载iframe
         *@method init
         *@example lufax.com.Checkin.int();
         */
        init: function () {
            var me = this,
                container = me.container,
                cls = me.cls,
                height = container.height(),
                mergedTemplate = me.template.replace("!${cls}", cls).replace("!${protocol}", location.protocol).replace("!${height}", height);
            container.html(mergedTemplate);
        },
        _popup: function (msg) {
            LufaxPopup.popup({
                popupTitleName: "签到提示",
                message: msg,
                button: '<a class="btns btn_info confirmBtn" href="javascript:void(0);">确认</a>',
                iconClass: 'exclamationCircleIcon'
            });
        },
        _map: {
            "00": function (data) {
                var weekMap = {"0": "周日", "1": "周一", "2": "周二", "3": "周三", "4": "周四", "5": "周五", "6": "周六"};

                LufaxPopup.blankPopup({
                    content: '<div class="modal-content pop-signIn">' +
                        '<div class="modal-header clearfix">' +
                        '<div class="close"><a class="modal-close" href="javascript:void(0);"></a></div>' +
                        '<h4 class="modal-title">签到提示</h4>' +
                        '</div>' +
                        '<div class="modal-body clearfix">' +
                        '<div class="receivables">' +
                        '<div class="receivables-calendar"></div>' +
                        '<p class="points-total">本月您已累计签到<span class="highlight">' + data.signInDayList.length + '</span>天</p>' +
                        '</div>' +
                        '<div class="signState icon-point">' +
                        '<p class="points-title">今日已签到成功<br/>获得<span class="highlight big">' + data.receivePoints + '</span> <i class="icon-point icon-point-text">&nbsp;</i></p>' +
                        '<p class="points-rule">' + data.ruleName + '</p>' +
                        '</div> ' +
                        '</div>' +
                        '</div>'
                });
                $('.receivables-calendar').datepicker({
                    showCollectionText: true,
                    showMonthAfterYear: true,
                    changeMonth: false,
                    changeYear: false,
                    showOtherMonths: false, //显示其他月份的日期
                    defaultDate: 'c', //服务器时间，当前时间
                    afterShow: function (dateText, inst) {
                        $(this).find('td').each(function () {
                            var dayTxt = $(this).find('a').text();
                            for (var i = 0; i < data.signInDayList.length; i++) {
                                if (dayTxt == data.signInDayList[i]) {
                                    $(this).find('a').addClass('ui-state-execute');
                                }
                            }
                        });
                    }
                });
            },
            "01": function () {
                var me = this;
                me._popup("重复签到");
            },
            "02": function () {
                location.href = "https://user." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/user/login?returnPostURL=" + encodeURIComponent(location.href);
            },
            "99": function () {
                var me = this;
                me._popup("系统错误");
            }
        }
    }
    lufax.com.Checkin = Checkin;
}(this);

function pointsCheckinModel(data) {
    var checkin = new lufax.com.Checkin();
    checkin._map[data.result](data);
    _gaq.push(['_trackEvent', 'click', 'quqiandao', '点击数']);
}