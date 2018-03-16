var INIT_TIME = new Date().getTime();
var TIME_LIMIT = 15 * 1000;


$("head").ajaxSuccess(function () {
    var curTime = new Date().getTime();
    if (curTime - INIT_TIME > TIME_LIMIT) {
        userKeepSession();
        INIT_TIME = curTime;
    }
});

$(function () {
    var simply_header =
        '<div class="header clearfix">' +
            '<div class="logo"><a href="' + LufaxSite.Envs.evn.site + '"><img src="' + (location.protocol == 'https:' ? LufaxSite.Envs.evn.statics : LufaxSite.Envs.evn["static"]) + '/config/images/p2p_index/logo_festival.png" alt="陆金所"></a></div>' +
            '<div class="headline"></div>' +
            '<ul class="headNav clearfix">' +
            '<li><a href="' + LufaxSite.Envs.evn.site + '" target="_blank">陆金所首页</a></li>' +
            '<li><a href="' + LufaxSite.Envs.evn.site + '/help/" target="_blank">帮助中心</a></li>' +
            '<li><a href="' + LufaxSite.Envs.evn.site + '/help/help_service_feedback.html" target="_blank">意见反馈</a></li>' +
            '</ul>' +
            '</div>';

    var simply_footer =
        '<div class="footer clearfix">' +
            '<p class="phoneNum">全国服务热线<span class="num">4008&nbsp;6666&nbsp;18</span></p>' +
            '<p class="copyright">版权所有 © 上海陆家嘴国际金融资产交易市场股份有限公司未经许可不得复制、转载或摘编，违者必究!<br/>' +
            'Copyright Shanghai Lujiazui International Financial Asset Exchange Co.,LTD. ALL Rights Reserved<br/>' +
            '沪 ICP 证 B2-20120023号&emsp;&emsp;&emsp;沪 ICP 备 12032241 号-2' +
            '</p>' +
            '</div>';

    $(".simple-head-wrap").append(simply_header);
    $(".simple-foot-wrap").append(simply_footer);

    var page = $("#current-page").val();
    var pageName = $("#current-page").attr('data-page-name');
    var headline = $('.headline');
    switch (page) {
        case "login":
            headline.html('<span class="head-divide">|</span><span class="page-name">会员登录</span>');
            break;
        case "register":
            headline.html('<span class="head-divide">|</span><span class="page-name">注册会员</span>');
            break;
        default :
            if (pageName != undefined) {
                headline.html('<span class="head-divide">|</span><span class="page-name">' + pageName + '</span>');
            }
            break;
    }

    userKeepSession();


});

function userKeepSession() {
    var img = new Image();
    img.src = LufaxSite.Envs.evn.user + "/keepSession.gif?timestamp=" + new Date().getTime();
}
