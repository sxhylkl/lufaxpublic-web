!function(){
    function Header (){

    }
    Header.prototype = {
        args:{},

        init:function(){
            var me = this,
                url_userInfo = "https://user." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/user/service/user/current-user-info-for-homepage?jsoncallback=?";

            me._setHeader();
            me._showUserInfo(url_userInfo);
        },
        _showUserInfo : function (url) {
            var me = this;
            $.getJSON(url,function (data) {
                /*data : {
                 uid: data.uid,
                 sex:data.sex,
                 email:data.email,
                 userName: data.userName,
                 name:data.name,
                 mobileNo:data.mobileNo,
                 isNewUser: data.isNewUser,
                 unreadMsgCount: data.unreadMsgCount,
                 nameAuthentication: data.nameAuthentication,
                 cardBindStatus: data.cardBindStatus,
                 isInvestPrepared: data.isInvestPrepared
                 }*/
                data.cookieName = lufax.util.getUnameFromCookie,
                data.cookieName_tnf = lufax.Cookie.get("_tnf");

                me.args = data;

                if(data.userName){
                    $("#top-login").removeClass("hidden");

                    $(".user-name").html(me._limitText(data.userName,12));

                    //unreadMsgCount
                    var $myAccount = $('.my-account'),
                        unreadMsgCount = data.unreadMsgCount;
                    $myAccount.addClass('my-msg-status');
                    $myAccount.find('#msg-count').html(unreadMsgCount);
                    if (unreadMsgCount !== 0) {
                        $('.icon-msg').addClass('new-msg');
                    }
                    $myAccount.find('.msg-wrap').removeClass("hidden");
                }else if(data.cookieName){
                    $("#top-cookie").removeClass("hidden");
                    $(".cookie-name").html(me._limitText(data.cookieName,12));
                }else{
                    $("#top-noLog").removeClass("hidden");
                }



                $('#safe-logout').bind('click', function () {
                    LufaxPopup.simplePopup({
                        imgClass: "safeExit",
                        title: "您即将安全退出",
                        content: "",
                        button: '<a class="btns btn-large btn-info confirmBtn" href="javascript:void(0);"><span>安全退出</span></a><a class="btns btn-large btn-cancel close" href="javascript:void(0);"><span>取消</span></a>',
                        onConfirm: function () {
                            tool.deleteCookie('_tn');
                            window.location = $('#safe-logout').attr("href");
                        }
                    });
                    return false;
                });
            });
        },
        _limitText:function (text, limit) {
            var new_text = text;
            if (text.length > limit) {
                new_text = text.slice(0, limit) + "...";
            }
            return new_text;
        },

        _setHeader:function(){
            var me = this,
                page = $("#current-page").val();
            switch (page) {
                case "login":
                    me._handleHeader();
                    break;
                case "recharge":
                    me._handleHeader();
                    break;
                case "withdraw":
                    me._handleHeader();
                    break;
                case "investment-detail":
                    me._handleHeader();
                    break;
                case "my-account":
                    me._handleHeader();
                    break;
                case "investment":
                    me._handleHeader();
                    break;
                case "transfer-request":
                    me._handleHeader();
                    break;
                case "sme":
                    me._handleHeader();
                    break;
            }
        },

        _handleHeader:function () {
            $(".head-wrap").addClass('head-wrap-inside');
            $('.link-logo').addClass('hidden');
        }
    }

    lufax.header = new Header();
}(this);

$(function(){
    lufax.header.init();
});