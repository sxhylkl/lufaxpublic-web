/**
 *  depends jquery 1.7.1
 *  layout.simple.activity.js
 *  create 2014-12-04
 *  author wangdongqiang334
 *
 *  API
 *  layout.simple.activity(); or  layout.simple.activity("");  //Don't show currentPageText in header when no args or empty args
 *  layout.simple.activity("稳盈-安业贷首页");  //show currentPageText in header.  !!! Must write in outside js
 */

$(function(){
    layout.simple.activity();
});

var layout = {};
layout.simple = {};
layout.simple.activity = function(currentPageText){
    currentPageText = currentPageText || '';
    var args = {
        currentPageCode : (currentPageText.toString().length>0)? '<span class="currentPage">'+currentPageText+'</span>' : ' '
    }
    var simple_activity_header =
        '<div class="content clearfix">' +
            '<a href="http://www.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '" target="_blank"><img class="logo" src="https://static.lufaxcdn.com/config/images/logo_festival.png" alt="lufax" /></a>' +
            '<span class="headLink"><a class="goHomepage"  href="http://www.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '" target="_blank">平安陆金所首页</a>'+args.currentPageCode+'</span>' +
            '</div>';

    var simple_activity_footer =
        '<div class="content clearfix">' +
            '<p class="phoneNum">全国服务热线<span class="num">4008&nbsp;6666&nbsp;18</span></p>' +
            '<p class="copyright">版权所有 © 上海陆家嘴国际金融资产交易市场股份有限公司未经许可不得复制、转载或摘编，违者必究!<br/>' +
            'Copyright Shanghai Lujiazui International Financial Asset Exchange Co.,LTD. ALL Rights Reserved<br/>' +
            '沪 ICP 证 B2-20120023号&emsp;&emsp;&emsp;沪 ICP 备 12032241 号-2' +
            '</p>' +
            '</div>';
    $(".header").empty().append(simple_activity_header);
    $(".footer").empty().append(simple_activity_footer);
}