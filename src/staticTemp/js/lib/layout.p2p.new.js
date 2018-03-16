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

    var head_template =
        '<div class="top-wrap">  ' +
            '<div class="top-body clearfix"> ' +
            '<div class="login-status" id="login-status">  ' +
            '<ul class="top-login clearfix hidden" > ' +
            '<li class="home-icon"><a href="http://www.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/"></a></li> ' +
            '<li>您好，<a href="https://my.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/my/account" class="user-name"></a> ' +
            '<span class="safe-logout-wrap">[ <a href="https://user.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/user/logout" class="safe-logout" id="safe-logout">安全退出</a> ]</span>' +
            '</li>' +
            '</ul>             ' +
            '<ul class="clearfix top-cookie hidden"> ' +
            '<li class="home-icon"><a href="http://www.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/"></a></li> ' +
            '<li>您好，<a href="javascript:void(0);" class="cookie-name top-nav-login" data-sk="头部-用户名"></a> <a href="javascript:void(0);" class="cookie-login top-nav-login">登录</a></li> ' +
            '<li><a href="https://user.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/user/register" class="cookie-register">免费注册</a></li>' +
            '</ul>                                     ' +
            '<ul class="clearfix top-noLog hidden"> ' +
            '<li class="home-icon"><a href="http://www.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/"></a></li> ' +
            '<li>您好，欢迎来到陆金所！ <a href="javascript:void(0);" class="top-nav-login">登录</a></li> ' +
            '<li><a href="https://user.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/user/register">免费注册</a></li>  ' +
            '</ul> ' +
            '</div> ' +
            '<ul class="media-link clearfix">     ' +
            '<li><a href="http://www.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/activity/app201307/index.html" target="_blank"><i class="icon-mobile"></i>手机版</a></li>' +
            '<li><a href="http://e.weibo.com/lufax" target="_blank"><i class="icon-weibo"></i></a></li> ' +
            '<li class="weixin">          ' +
            '<a href="javascript:void(0);"><i class="icon-weixin"></i></a> ' +
            '<p> ' +
            '<b></b> ' +
            '<span class="lufax-code weixin-code"></span> ' +
            '</p>  ' +
            '</li>  ' +
            '</ul> ' +
            '<div class="sub-nav-wrap clearfix">   ' +
            '<p class="sub-nav-left"></p>   ' +
            '<ul class="sub-nav-list clearfix"> ' +
            ' <li class="my-account">     ' +
            '<span class="my-account-title">  ' +
            '<a href="https://my.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/my/account" target="_blank">我的账户</a>  ' +
            '<b></b>' +
            '</span> ' +
            '<div class="cover"></div>                   ' +
            ' <ul class="my-account-list clearfix">      ' +
            ' <li><a href="https://my.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/my/investment-overview" target="_blank">我的投资</a></li>   ' +
            ' <li><a href="https://my.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/my/loans" target="_blank">我的借款</a></li>   ' +
            ' <li><a href="https://my.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/my/transaction-history" target="_blank">资金记录</a></li>  ' +
            ' <li><a href="https://my.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/my/bank-account" target="_blank">银行卡管理</a></li>    ' +
            '<li><a href="https://my.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/my/user-info" target="_blank">账户安全</a></li>    ' +
            ' <li><a href="https://lumi.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/lumi/my-lumi" target="_blank">我的陆米</a></li> ' +
            '<li><a href="https://my.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/my/user-msg" target="_blank">我的消息</a></li>     ' +
            '<li><a href="https://my.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/my/my-lufax-coin" target="_blank">我的陆金币</a></li>  ' +
            '<li><a href="http://affiliate.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/recommend" target="_blank">推荐好友</a></li>   ' +
            '</ul>                                  ' +
            '</li>                                 ' +
            '<li class="lumi-link"><a href="https://lumi.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/lumi/index" target="_blank" data-sk="陆米-陆金所通用头部-陆米世界入口">陆米世界</a><i class="icon-ani-new">&nbsp;</i></li>' +
            '<li><a href="http://www.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/activity/twhkmo-minisite/index.html" target="_blank" data-sk="头部-港澳台">港澳台</a></li>' +
            '<li><a href="http://www.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/help/" target="_blank">帮助中心</a></li>    ' +
            '</ul>         ' +
            '<p class="sub-nav-right"></p>   ' +
            '</div>         ' +

            '</div>' +
            '</div>' +
            '<div class="head-body-wrap">' +
            '<div class="head-body clearfix">' +
            '<div class="logo"><a href="http://www.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '"><img src="' + (location.protocol == 'https:' ? LufaxSite.Envs.evn.statics : LufaxSite.Envs.evn["static"]) + '/config/images/p2p_index/logo_festival.png" alt="陆金所"></a></div>' +
            '<div class="slogan"><img src="https://static.lufaxcdn.com/config/images/p2p_index/slogan.png" alt=""/></div>' +
            '<div class="link-logo">' +
            '<a href="http://www.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/about/" target="_blank" class="logo_ani">' +
            '<span class="t1"></span>' +
            '<span class="t2"></span>' +
            '<span class="t_pingan"></span>' +
            '<span class="t_tit">关于陆金所<i></i></span>' +
            '</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="nav-wrap">' +
            '<ul class="main-nav clearfix">' +
            '<li><a href="http://www.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '">首页</a></li>' +
            '<li class="invest has-sub-nav">' +
            '<a href="https://list.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/list/touzi" id="allP2pCounts">投资频道 <span></span> <i class="nav-arrow transition"></i></a>' +
            '<ul class="sub-nav-list">' +
            '<li id="anyingCounts"><a href="https://list.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/list/piaoju" data-sk="二级导航-稳盈-安盈"><b></b>安盈-票据<strong>1000元起</strong><span></span></a></li>' +
            '<li id="ayiCounts"><a href="https://list.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/list/anyi" data-sk="二级导航-稳盈-安e"><b></b>稳盈-安e<strong>1万元起</strong><span></span></a></li>' +
            '<li id="ayeCounts"><a href="https://list.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/list/anye" data-sk="二级导航-稳盈-安业"><b></b>稳盈-安业<strong>25万元起</strong><span></span></a></li> ' +
            '</ul>' +

            '</li>' +
            '<li class="licai has-sub-nav">' +
            '<i class="icon-hot-item"></i>' +
            '<a href="https://list.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/list/licai" id="allLicai">理财频道 <span></span> <i class="nav-arrow transition"></i></a>' +
            '<ul class="sub-nav-list">' +
            '<li id="fyCounts"><a href="https://list.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/list/fuying" data-sk="二级导航-富盈人生"><b></b>富盈人生<strong>1000元起</strong><span></span></a></li>' +
            '<li id="spLiCai"><a href="https://list.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/list/zhuanxiang" data-sk="二级导航-专享理财"><b></b>专享理财<strong>2万元起</strong><span></span></a></li>' +
            '<li id="zhujiang"><a href="https://list.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/list/zhujiang" data-sk="二级导航-珠江"><b></b>珠江人寿<strong>100元起</strong><span></span></a></li>' +
            '</ul>' +
            '</li>' +
            '<li class="new-user">' +
                '<i class="icon-top-foot icon-fanxian">&nbsp;</i>' +
                '<a href="https://list.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/list/listing/xinke">新客专区 <span></span></a>' +
            '</li>' +
            '<li class="transfer"><a href="https://list.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/list/transfer">转让专区 <span></span></a></li>' +
            '<li class="loan-channel has-sub-nav"><a href="https://loan.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '" data-sk="二级导航-借款频道">借款频道</a></li>' +
            '</ul>' +
            '</div>';
    var foot_template =
        '<div class="foot-body clearfix">' +
            '<div class="foot-info">' +
            '<i class="icon-about-lufax"></i>' +
            '<dl class="about-lufax-list">' +
            '<dt><a href="' + LufaxSite.Envs.evn.site + '/about/" target="_blank">关于陆金所</a></dt>' +
            '<dd><a href="' + LufaxSite.Envs.evn.site + '/about/aboutus.html" target="_blank">陆金所介绍</a></dd>' +
            '<dd><a href="' + LufaxSite.Envs.evn.site + '/about/managementTeam.html" target="_blank">管理层团队</a></dd>' +
            '<dd><a href="' + LufaxSite.Envs.evn.site + '/about/announcement.html" target="_blank">公告和新闻</a></dd>' +
            '<dd><a href="' + LufaxSite.Envs.evn.site + '/about/aboutgroup.html" target="_blank">集团介绍</a></dd>' +
            '</dl>' +
            '</div>' +
            '<div class="foot-info">' +
            '<i class="icon-help-center"></i>' +
            '<dl class="help-center-list">' +
            '<dt><a href="' + LufaxSite.Envs.evn.site + '/help/" target="_blank">帮助中心</a></dt>' +
            '<dd><a href="' + LufaxSite.Envs.evn.site + '/help/help_operate_register.html" target="_blank">注册及认证</a></dd>' +
            '<dd><a href="' + LufaxSite.Envs.evn.site + '/help/help_operate_invest.html" target="_blank">投资操作</a></dd>' +
            '<dd><a href="' + LufaxSite.Envs.evn.site + '/help/help_operate_application.html" target="_blank">转让操作</a></dd>' +
            '<dd><a href="' + LufaxSite.Envs.evn.site + '/faq/FAQ.html" target="_blank">新手必读</a></dd>' +
            '</dl>' +
            '</div>' +
            '<div class="foot-info">' +
            '<i class="icon-safe-lufax"></i>' +
            '<dl class="safe-lufax-list">' +
            '<dt><a href="' + LufaxSite.Envs.evn.site + '/safe/" target="_blank">安全保障</a></dt>' +
            '<dd><a href="' + LufaxSite.Envs.evn.site + '/safe/invest.html" target="_blank">投资安全</a></dd>' +
            '<dd><a href="' + LufaxSite.Envs.evn.site + '/safe/fund.html" target="_blank">资金安全</a></dd>' +
            '<dd><a href="' + LufaxSite.Envs.evn.site + '/safe/data.html" target="_blank">数据及信息</a></dd>' +
            '<dd><a href="' + LufaxSite.Envs.evn.site + '/safe/privacy.html" target="_blank">隐私保密</a></dd>' +
            '</dl>' +
            '</div>' +
            '<div class="hot-line">' +
            '<p class="hot-line-title">全国服务热线</p>' +

            '<p class="hot-line-num">4008 6666 18</p>' +

            '<p class="hot-line-service-time">人工服务时间 8:00 - 22:00</p>' +
            '<!--可信网站图片LOGO安装开始-->' +
            '<a class="trust-site" href="https://ss.knet.cn/verifyseal.dll?sn=e14021031011546046fdpn000000&amp;ct=df&amp;a=1&amp;pa=0.309682316146791" target="_blank">&nbsp;</a>' +
            '<a class="IC-network-supervisor" href="http://www.sgs.gov.cn/lz/licenseLink.do?method=licenceView&entyId=20140714170434967" target="_blank">&nbsp;</a>' +
            '<!--可信网站图片LOGO安装结束-->' +
            '</div>' +
            '<div class="copyright-info">' +
            '<i class="icon-pingan-logo"></i>' +

            '<div class="select-box">' +
            '平安集团旗下网站' +
            '<ul class="select-box-list">' +
            '<li><a href="http://www.pingan.com" target="_blank">中国平安官网</a></li> ' +
            '<li><a href="http://one.pingan.com" target="_blank">平安一账通</a></li> ' +
            '<li><a href="http://www.lfex.com" target="_blank">陆金所Lfex</a></li> ' +
            '<li><a href="http://www.xsme.cn" target="_blank">平安交易所</a></li>  ' +
            '</ul>  ' +
            '</div>' +
            '<p class="copyright">' +
            '版权所有 © 上海陆家嘴国际金融资产交易市场股份有限公司 <br/>' +
            'Copyright Shanghai Lujiazui International Financial<br/> ' +
            'Asset Exchange Co.,Ltd. ALL Rights Reserved<br/> ' +
            '沪 ICP 证 B2-20120023号 &nbsp;&nbsp;沪 ICP 备 12032241 号-2 ' +

            '</p> ' +
            '</div> ' +
            '</div> ';


    var simply_footer =
        '<div class="footer clearfix">' +
            '<p class="phoneNum">全国服务热线<span class="num">4008&nbsp;6666&nbsp;18</span></p>' +
            '<p class="copyright">版权所有 © 上海陆家嘴国际金融资产交易市场股份有限公司未经许可不得复制、转载或摘编，违者必究!<br/>' +
            'Copyright Shanghai Lujiazui International Financial Asset Exchange Co.,LTD. ALL Rights Reserved<br/>' +
            '沪 ICP 证 B2-20120023号&emsp;&emsp;&emsp;沪 ICP 备 12032241 号-2' +
            '</p>' +
            '</div>';
    if (!$(".head-wrap").hasClass('head-wrap-velocity')) {
        $(".head-wrap").append(head_template);
    }

    $('#safe-logout').bind('click', function () {
        LufaxPopup.simplePopup({
            imgClass: "safeExit",
            title: "您即将安全退出",
            content: "",
            button: '<a class="btns btn_large btn_info confirmBtn" href="javascript:void(0);"><span>安全退出</span></a><a class="btns btn_large btn_cancel ml20 close" href="javascript:void(0);"><span>取消</span></a>',
            onConfirm: function () {
                tool.deleteCookie('_tn');
                window.location = $('#safe-logout').attr("href");
            }
        });
        return false;
    });

    function hideMainNav() {
        $(".head-wrap").addClass('head-wrap-inside');
        $('.link-logo').addClass('hidden');
    }

    var page = $("#current-page").val();
    var $mainNav = $(".nav-wrap");
    switch (page) {
        case "index":
            $(".home").addClass("selected");
            break;
        case "lufax":
            $(".invest").addClass("selected");
            break;
        case "licai":
            $(".licai").addClass("selected");
            break;
        case "about":
            $(".about").addClass("selected");
            break;
        case "transfer":
            $(".transfer").addClass("selected");
            break;
        case "xinke":
            $(".new-user").addClass("selected");
            break;
        case "loan":
            $(".loan-channel").addClass("selected");
            break;
        case "login":
            $mainNav.hide();
            hideMainNav();
            break;
        case "recharge":
            $mainNav.hide();
            hideMainNav();
            break;
        case "withdraw":
            $mainNav.hide();
            hideMainNav();
            break;
        case "investment-detail":
            $mainNav.hide();
            hideMainNav();
            break;
        case "my-account":
            $mainNav.hide();
            hideMainNav();
            break;
        case "investment":
            $mainNav.hide();
            hideMainNav();
            break;
        case "transfer-request":
            $mainNav.hide();
            hideMainNav();
            break;
        case "sme":
            $mainNav.hide();
            hideMainNav();
            break;
    }

    $(".dorpdownContent." + page + " a").attr("target", "_self");

    var pageName = $("#current-page").attr('data-page-name');
    if (pageName != undefined) {
        $('.head-body .logo').after('<div class="headline"><span class="head-divide">|</span><span class="page-name">' + pageName + '</span></div> ')
    }


    $.getJSON(LufaxSite.Envs.evn.userStatic + "/service/user/current-user-info-for-homepage?jsoncallback=?",
        function (data) {
            var cookieName = tool.getCookie("_tn");
            if (!data.userName) {
                if (!cookieName) {
                    $('.top-noLog').removeClass('hidden');
                } else {
                    $('.top-cookie').removeClass('hidden');
                    $('.top-cookie').find('.cookie-name').html(lufax.util.getUnameFromCookie);
                }
                $('.top-nav-login').click(function () {
                    location.href = "https://user." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/user/login?returnPostURL=" + encodeURIComponent(location.href);
                });
            } else {
                $('.top-login').removeClass('hidden');
                $('.top-login').find('.user-name').html(data.userName);
                var $myAccount = $('.my-account'),
                    unreadMsgCount = data.unreadMsgCount;
                $myAccount.addClass('my-msg-status');
                $myAccount.find('b').before('<span class="msg-wrap">( <a href="https://my.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/my/user-msg" target="_blank"><i class="icon-msg"></i>' + unreadMsgCount + '</a> )</span>');
                if (unreadMsgCount !== 0) {
                    $('.icon-msg').addClass('new-msg');
                }
            }


        });
    var $mainNav = $('.main-nav');
    if (!$mainNav.is(':hidden')) {
        $.ajax({
            url: "https://list." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/list/service/product/counts-info?jsoncallback=?",
            dataType: "jsonp"
        }).success(function (data) {
                _set_nav_counts && _set_nav_counts(data);
                window._set_other_counts && window._set_other_counts(data);

            });
    }


    function _set_nav_counts(data) {
        if (data.licaiProductCounts != 0) {
            $mainNav.find('#allLicai').find('span').html('(<em>' + data.licaiProductCounts + '</em>)');
        }
        if (data.newUserProductCounts != 0) {
            $mainNav.find('.new-user').find('span').html('(<em>' + data.newUserProductCounts + '</em>)');
        }
        if (data.totalTransferProductCounts != 0) {
            var totalTransferProductCounts = data.totalTransferProductCounts > 100 ? "99+" : data.totalTransferProductCounts;
            $mainNav.find('.transfer').find('span').html('(<em>' + totalTransferProductCounts + '</em>)');
        }
        if (data.normalLicaiProductCounts != 0) {
            $mainNav.find('#spLiCai').find('span').html('(<em>' + data.normalLicaiProductCounts + '</em>)');
        }
        if (data.zhujiangProductCounts != 0) {
            $mainNav.find('#zhujiang').find('span').html('(<em>' + data.zhujiangProductCounts + '</em>)');
        }
        if (data.piaojuProductCounts != 0) {
            $mainNav.find('#anyingCounts').find('span').html('(<em>' + data.piaojuProductCounts + '</em>)');
        }
        if (data.anyedaiProductCounts !== 0 && data.anyedaiProductCounts !== undefined) {
            $mainNav.find('#ayeCounts').find('span').html('(<em>' + data.anyedaiProductCounts + '</em>)');
        }
        if (data.countsOfInvestChannel !== 0) {
            var countsOfInvestChannel = data.countsOfInvestChannel > 100 ? "99+" : data.countsOfInvestChannel;
            $mainNav.find('#ayiCounts').find('span').html('(<em>' + countsOfInvestChannel + '</em>)');
        }
        if (data.fuyingProductCounts !== 0) {
            $mainNav.find('#fyCounts').find('span').html('(<em>' + data.fuyingProductCounts + '</em>)');
        }
        if (data.totalCountsOfInvestChannel !== 0) {
            var totalCountsOfInvestChannel = data.totalCountsOfInvestChannel > 100 ? "99+" : data.totalCountsOfInvestChannel;
            $mainNav.find('#allP2pCounts').find('span').html('(<em>' + totalCountsOfInvestChannel + '</em>)');
        }
    }


    $(".foot-wrap").append(foot_template);
    $(".simple-foot-wrap").append(simply_footer);
    $(".select-box").click(function () {
        $(this).find('.select-box-list').fadeIn();
        $(this).mouseleave(function () {
            $(this).find('.select-box-list').fadeOut();
        })
    });

    tool.IE6Notice();
    userKeepSession();


});

function userKeepSession() {
    var img = new Image();
    img.src = LufaxSite.Envs.evn.user + "/keepSession.gif?timestamp=" + new Date().getTime();
}
