/**
 * name: captcha component
 * depends: jquery
 * author: huangjunyan
 * date: 2014/03/24
 */
!function () {
    /**
     * @class Captcha
     * @constructor Captcha
     * @config
     * src
     *
     */
    function Captcha($container, options) {
        var me = this;
        me.container = $container;
        me.options = options || {};
        me.source = '';
        me.src = '';
        me.isPreCheck = true;
        me.xhr = '';
        $.extend(me, me.options);
    }

    Captcha.prototype = {
        template: ' <label class="control-label" for="captcha-valid-num">验证码：</label>' +
            ' <div class="controls">' +
            '<span class="input-wrap input-small validate-input">' +
            '<input type="text" class="inputs" id="captcha-valid-num" name="captcha-valid-num" maxlength="4">' +
            '<i class="iconV2 captcha-valid-icon"></i>' +
            '</span>' +
            '<span class="captcha-valid-img-wrap"><img id="captcha-valid-img" width="100" height="38" src=""></span>' +
            '<a href="javascript:void(0);" class="change-captcha-src">换一张</a>' +
            '<span class="errorPanel"><b class="arrow left"> </b><span class="errorContent"></span></span>' +
            '</div>',
        /**
         * 初始化方法：渲染样式绑定事件
         *@method init
         *@example lufax.Captcha.int();
         */
        init: function () {
            var me = this,
                container = me.container,
                src = me.src + "?source=" + me.source + "&rnd=" + new Date().getTime();
            container.html(me.template);
            container.find('#captcha-valid-img').attr({'src': src});
            container.on('blur', '#captcha-valid-num', function () {
                me.isPreCheck && me.preCheck();
            });
            container.on('click', '.change-captcha-src,#captcha-valid-img', function () {
                me._changeCaptchaAndClearError(src);
            });

        },
        /**
         *method private
         *显示报错信息
         */
        _error: function (msg) {
            var me = this,
                container = me.container;
            container.addClass('form-error').removeClass('form-success');
            container.find('.errorContent').html(msg);
        },
        /**
         *method private
         *显示正确勾选
         */
        _success: function () {
            var me = this;
            me.container.addClass('form-success').removeClass('form-error');
        },
        /**
         *method private
         *替换图形码同时清空输入框去除报错样式
         */
        _changeCaptchaAndClearError: function (src) {
            var me = this,
                container = me.container;
            container.removeClass('form-error').removeClass('form-success');
            container.find('#captcha-valid-img').attr({'src': src});
            container.find('#captcha-valid-num').val('');
        },
        /**
         * 核心方法：验证captcha
         *@method preCheck
         *@example lufax.Captcha.preCheck();
         */
        preCheck: function () {
            var me = this,
                val = me.container.find('#captcha-valid-num').val(),
                parameters = {'inputValue': val, 'source': me.source}
            if (val === '') {
                me._error('请填写');
            } else {
                $.getJSON(me.xhr, parameters, function (data) {
                    if (data.result === "SUCCESS") {
                        me._success();
                        return true;
                    } else {
                        me._error('验证码错误或过期');
                        return false;
                    }
                });
            }
        }

    }

    lufax.ui.Captcha = Captcha;
}();
