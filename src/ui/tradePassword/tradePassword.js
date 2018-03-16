/**
 * name: TradePassword
 * depends: jquery
 * author: Jerry
 * date: 2015/01/09
 */
!function () {
    function tradePassword(options) {
        var me = this;
        var defaultOptions = {
            container: $('#tradePassword'),
            rightText: '<a href="https://user.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/user/find-trade-password">忘记密码？</a>'
        };
        me.Options = $.extend(defaultOptions, options);
        me.init();
    }

    tradePassword.prototype = {
        template: '<div class="control-group">' + 
            '<label class="control-label" for="tradePwd">交易密码：</label>' +
            '<div class="controls">' + 
            '<span class="input-wrap"><input type="password" class="inputs input-medium" id="tradePwd" name="tradePwd"></span>' +
            '<span class="help-line">{!rightText}</span>' + 
            '<span class="errorPanel"><b class="arrow left"></b><span class="errorContent"></span></span>' + 
            '</div></div>',

        /**
         * 初始化方法：渲染样式绑定事件
         *@method init
         */
        init: function () {
            var me = this,
                container = me.Options.container;
            container.html(me.template.replace("{!rightText}",me.Options.rightText));

            container.find("#tradePwd").focus(function(){
                me.hideError();
            })
        },

        /**
         *method private
         *显示报错
         */
        showError: function (msg) {
            var me = this,
                container = me.Options.container;
            container.addClass('form-error');
            container.find('.help-line').hide();
            container.find('.errorPanel').css({display:"inline-block"}).children('.errorContent').html(msg);
        },

        /**
         *method private
         *隐藏报错
         */
        hideError: function () {
            var me = this,
                container = me.Options.container;
            container.removeClass('form-error');
            container.find('.help-line').show();
            container.find('.errorPanel').css({display:"none"});
        },

        /**
         *method private
         *弹窗
         */
        popup: function (msg) {
            lufax.popup.newIconPopup({
                popupTitleName: "重要提示",
                iconClass: "prompt-icon",
                message: "<p>" + msg + "</p>如忘记密码，<a href='https://user." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/user/find-trade-password'>找回交易密码</a>即可进行交易",
                button: "<a class='btns btn-info close' href='https://my." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/my/account'>查看我的账户</a>",
                closeDisplay: 'false'
            });
        },
        
        validate: function () {
            var me = this,
                container = me.Options.container;
                val = container.find('#tradePwd').val();
            if (val === '') {
                me.showError('请填写');
            }
        }
    }

    lufax.ui.tradePassword = tradePassword;
}();
