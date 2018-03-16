var LufaxSite = LufaxSite || {
    require:function (libraryName, rootPath, callback) {
        var ScriptRootPath;
        var root = rootPath ? rootPath : ScriptRootPath;
        var scripts = document.getElementsByTagName("script");
        var libraryPath = root + libraryName + ".js";
        var loaded = false;
        for (var elm in scripts) {
            if (scripts[elm].src && scripts[elm].src == libraryPath) {
                loaded = true;
                break;
            }
        }

        var handler = function () {
            if (callback && 'function' == typeof callback) {
                // 把是否已经装在传给回调
                callback();
            }
        }
        // 如果已经装在，只执行回调函数
        if (loaded) {
            handler();
            return;
        }
        $.ajax(
            {
                url:libraryPath,
                dataType:"script",
                success:handler
            }
        );

    }
};

LufaxSite.PageData = LufaxSite.PageData || {};

LufaxSite.pageInit = function (config) {
    var cfg = {
        type:config.type,
        viewId:config.view,
        dataRef:config.data
    };
    var tryTimes = 5;

    function fnLoad() {
        tryTimes--;
        if (tryTimes <= 0) {
            return;
        }
        LufaxSite.require('/config/js/' + cfg.dataRef, LufaxSite.Envs.evn["static"], function () {
            var handler = eval(LufaxSite.pageInitTypes[cfg.type]);
            handler(cfg, LufaxSite.PageData[cfg.dataRef]);
            if (!LufaxSite.PageData[cfg.dataRef]) {
                setTimeout(fnLoad, 10);
            }
        });
    }

    fnLoad();
};

LufaxSite.pageInitTypes = {
    news:function (cfg, data) {
        function wrap(data) {
            var path = LufaxSite.Envs.evn.site;
            if (!data) {
                return;
            }
            if (!data.titles) {
                return;
            }
            var content = [];
            for (var i = 0; i < data.titles.length; i++) {
                var title = data.titles[i].title;
                var location = data.titles[i].location;
                if (cfg.viewId == "content_list_faq") {
                    if (i < data.titles.length - 1) {
                        content.push('<div class="snotice green_icon png"><a href="' + path + location + '" title="' + title + '" target="_blank">' + title + '</a></div>');
                    } else {
                        content.push('<div class="snotice green_icon orange png"><a href="' + path + location + '" title="' + title + '" target="_blank">' + title + '</a></div>');
                    }
                } else {
                    content.push('<div class="snotice green_icon png"><a href="' + path + location + '" title="' + title + '" target="_blank">' + title + '</a></div>');
                }
            }
            return content.join("");
        }

        var wrapResult = wrap(data);
        $('#' + cfg.viewId).html(wrapResult);

        $("#content_list .snotice:first a").css("color", "#e6551d"); //TODO delete this line where there is no up
    },

    help:function (cfg, data) {
        function wrap(data) {
            var path = LufaxSite.Envs.evn.site;
            if (!data) {
                return;
            }
            if (!data.titles) {
                return;
            }
            var content = [];
            for (var i = 0; i < data.titles.length; i++) {
                var title = data.titles[i].title;
                var location = data.titles[i].location;
                if (cfg.viewId == "content_list_faq") {
                    if (i < data.titles.length - 1) {
                        content.push('<div class="snotice png"><a href="' + path + location + '" title="' + title + '" target="_blank">' + title + '</a></div>');
                    } else {
                        content.push('<div class="snotice orange png"><a href="' + path + location + '" title="' + title + '" target="_blank">' + title + '</a></div>');
                    }
                } else {
                    content.push('<div class="snotice png"><a href="' + path + location + '" title="' + title + '" target="_blank">' + title + '</a></div>');
                }
            }
            return content.join("");
        }

        var wrapResult = wrap(data);
        $('#' + cfg.viewId).html(wrapResult);
    },

    newHelp:function (cfg, data) {
        function wrap(data) {
            var path = LufaxSite.Envs.evn.site;
            if (!data) {
                return;
            }
            if (!data.titles) {
                return;
            }
            var content = [];
            for (var i = 0; i < data.titles.length; i++) {
                var title = data.titles[i].title;
                var location = data.titles[i].location;
                content.push('<li><b></b><a href="' + path + location + '" title="' + title + '" target="_blank">' + title + '</a></li>');
            }
            return content.join("");
        }

        var wrapResult = wrap(data);
        $('#' + cfg.viewId).html(wrapResult);
    },

    contents:function (cfg, data) {
        $('#' + cfg.viewId).html(data);
    }
};

var LufaxUtility = (function () {

    function percentageFormat(num) {

        if (num === 0 || num === "0") {
            return "0.00%"
        }

        if (!num || isNaN(num)) {
            return "";
        }

        num = parseFloat(num);
        num = Math.round(num * 10000) / 100 + "";

        if (num.indexOf(".") == -1) {
            num += ".00";
        } else {
            num += "00"
        }
        var numArr = num.split(".");
        var floatNumber = numArr[1].substring(0, 2);

        return numArr[0] + "." + floatNumber + "%";

    }

    function withoutPercentageFormat(num) {

        if (num === 0 || num === "0") {
            return "0.00%"
        }

        if (!num || isNaN(num)) {
            return "";
        }

        num = parseFloat(num);
        num = Math.round(num * 10000) / 100 + "";

        if (num.indexOf(".") == -1) {
            num += ".00";
        } else {
            num += "00"
        }
        var numArr = num.split(".");
        var floatNumber = numArr[1].substring(0, 2);

        return numArr[0] + "." + floatNumber;

    }

    function numberFormat(nStr) {
        var currency = "￥";
        var number = numberFormatWithoutCurrency(nStr);
        if (number == '') {
            return number;
        }
        return currency + number;
    }

    function numberFormatWithoutCurrency(nStr) {
        if (nStr === 0 || nStr === "0") {
            return "0.00";
        }

        if (!nStr || isNaN(nStr)) {
            return "";
        }

        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '.00';
        if (x2.length < 3) {
            x2 += "00";
        }
        x2 = x2.substring(0, 3);
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }
    function intFormat(nStr) {
        var currency = "￥";
        var number = intFormatWithoutCurrency(nStr);
        if (number == '') {
            return number;
        }
        return currency + number;
    }
    function intFormatWithoutCurrency (nStr) {
        if (nStr === 0 || nStr === "0") {
            return "0";
        }

        if (!nStr || isNaN(nStr)) {
            return "";
        }

        nStr += '';
        var x1 = nStr;
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1;
    };

    function round(value) {
        return Math.round(value * 100) / 100;
    }

    function formatMessage(template, args) {
        if (!args) return template;
        return template.replace(/\$\{(.+?)\}/g, function (m, i) {
            return args[i];
        });
    }

    function convertCurrency(currencyDigits, isforbidHint) {
        //max number
        var MAXIMUM_NUMBER = 99999999999.99;
        //Predefine the radix characters and currency symbols for output:
        var CN_ZERO = "零";
        var CN_ONE = "壹";
        var CN_TWO = "贰";
        var CN_THREE = "叁";
        var CN_FOUR = "肆";
        var CN_FIVE = "伍";
        var CN_SIX = "陆";
        var CN_SEVEN = "柒";
        var CN_EIGHT = "捌";
        var CN_NINE = "玖";
        var CN_TEN = "拾";
        var CN_HUNDRED = "佰";
        var CN_THOUSAND = "仟";
        var CN_TEN_THOUSAND = "万";
        var CN_HUNDRED_MILLION = "亿";
        var CN_SYMBOL = "人民币";
        var CN_DOLLAR = "元";
        var CN_TEN_CENT = "角";
        var CN_CENT = "分";
        var CN_INTEGER = "整";

        // Variables:
        var integral; // Represent integral part of digit number.
        var decimal; // Represent decimal part of digit number.
        var outputCharacters; // The output result.
        var parts;
        var digits, radices, bigRadices, decimals;
        var zeroCount;
        var i, p, d;
        var quotient, modulus;

        // Validate input string:
        currencyDigits = currencyDigits + "";

        if (currencyDigits == "") {
            if (isforbidHint) {
                return "";
            }
            return "Empty input!";
        }
        if (currencyDigits.match(/[^,.\d]/) != null) {
            if (isforbidHint) {
                return "";
            }
            return "Invalid characters in the input string!";
        }
//      if ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) {
        if ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.\d+)?)|(\d+(.\d+)?))$/) == null) {
            if (isforbidHint) {
                return "";
            }
            return "Illegal format of digit number!";
        }

        // Normalize the format of input digits:
        currencyDigits = currencyDigits.replace(/,/g, ""); // Remove comma delimiters.
        currencyDigits = currencyDigits.replace(/^0+/, ""); // Trim zeros at the beginning.
        // Assert the number is not greater than the maximum number.
        if (Number(currencyDigits) > MAXIMUM_NUMBER) {
            if (isforbidHint) {
                return "";
            }
            return "Too large a number to convert!";
        }

        // hack by wr
        currencyDigits = parseFloat(currencyDigits);
        currencyDigits = currencyDigits + "";

        // Process the coversion from currency digits to characters:
        // Separate integral and decimal parts before processing coversion:
        parts = currencyDigits.split(".");
        if (parts.length > 1) {
            integral = parts[0];
            decimal = parts[1];
            // Cut down redundant decimal digits that are after the second.
            decimal = decimal.substr(0, 2);
        } else {
            integral = parts[0];
            decimal = "";
        }

        // Prepare the characters corresponding to the digits:
        digits = new Array(CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE);
        radices = new Array("", CN_TEN, CN_HUNDRED, CN_THOUSAND);
        bigRadices = new Array("", CN_TEN_THOUSAND, CN_HUNDRED_MILLION);
        decimals = new Array(CN_TEN_CENT, CN_CENT);
        // Start processing:
        outputCharacters = "";
        // Process integral part if it is larger than 0:
        if (Number(integral) > 0) {
            zeroCount = 0;
            for (i = 0; i < integral.length; i++) {
                p = integral.length - i - 1;
                d = integral.substr(i, 1);
                quotient = p / 4;
                modulus = p % 4;
                if (d == "0") {
                    zeroCount++;
                } else {
                    if (zeroCount > 0) {
                        outputCharacters += digits[0];
                    }
                    zeroCount = 0;
                    outputCharacters += digits[Number(d)] + radices[modulus];
                }
                if (modulus == 0 && zeroCount < 4) {
                    outputCharacters += bigRadices[quotient];
                }
            }
            outputCharacters += CN_DOLLAR;
        }

        // Process decimal part if there is:
        if (decimal != "") {
            for (i = 0; i < decimal.length; i++) {
                d = decimal.substr(i, 1);
                if (d != "0") {
                    outputCharacters += digits[Number(d)] + decimals[i];
                }
            }
        }

        // Confirm and return the final output string:
        if (outputCharacters == "") {
            outputCharacters = CN_ZERO + CN_DOLLAR;
        }
        if (decimal == "") {
            outputCharacters += CN_INTEGER;
        }
        return outputCharacters;
    }

    function secondsOfTrading(secondsOfTrading) {
        secondsOfTrading = Number(secondsOfTrading);
        var remainTime,
            minutes,
            hours,
            seconds;

        if (secondsOfTrading <= 60) {
            remainTime = secondsOfTrading + '秒';

        } else if (60 < secondsOfTrading && secondsOfTrading < 3600) {
            seconds = secondsOfTrading % 60;
            minutes = Math.floor(secondsOfTrading / 60) % 60;
            remainTime = minutes + '分' + seconds + '秒';

        } else if (3600 <= secondsOfTrading && secondsOfTrading < 86400) {
            seconds = secondsOfTrading % 60;
            minutes = Math.floor(secondsOfTrading / 60) % 60;
            hours = Math.floor(secondsOfTrading / 60 / 60) % 24;
            remainTime = hours + '小时' + minutes + '分' + seconds + '秒';

        } else {
            remainTime = '';

        }
        return remainTime;
    }

    function numberFormatTenThousand(nStr) {
        if (nStr === 0 || nStr === "0") {
            return "0万";
        }

        if (!nStr || isNaN(nStr)) {
            return "";
        }


        nStr = nStr / 10000;
        nStr += '';
        var x = nStr.split('.')[0];
        var y = nStr.split('.')[1];
        if (y) {
            y = y.substring(0, 2);
            return x + '.' + y + '万';
        } else {
            return x + '万';
        }

    }

    function progressFormat (num) {
        if (num === 0 || num === "0") {
            return "0%"
        }
        if (num > 1 || num > "1") {
            return "100%"
        }
        if (!num || isNaN(num)) {
            return "";
        }
        num = parseFloat(num);
        num = (num * 10000) / 100 + "";
        var numArr = num.split(".")
        return numArr[0] + "%";
//        if (num.indexOf(".") === -1) {
//            return  num + "%";
//        } else {
//            var numArr = num.split("."), secFloatNumber = numArr[1].substring(1, 2), firstFloatNumber = numArr[1].substring(0, 1), floatNumber = numArr[1].substring(0, 2);
//            if (secFloatNumber === "0") {
//                return numArr[0] + "." + firstFloatNumber + "%";
//            } else {
//                return numArr[0] + "." + floatNumber + "%";
//
//            }
//        }


    }

    function percentageFormatWithoutZero (num) {
        if (num === 0 || num === "0") {
            return "0%"
        }
        if (num > 1 || num > "1") {
            return "100%"
        }
        if (!num || isNaN(num)) {
            return "";
        }
        num = parseFloat(num);
        num = (num * 10000) / 100 + "";
        if (num.indexOf(".") === -1) {
            return  num + "%";
        } else {
            var numArr = num.split("."), secFloatNumber = numArr[1].substring(1, 2), firstFloatNumber = numArr[1].substring(0, 1), floatNumber = numArr[1].substring(0, 2);
            if (secFloatNumber === "0") {
                return numArr[0] + "." + firstFloatNumber + "%";
            } else {
                return numArr[0] + "." + floatNumber + "%";

            }
        }
    }


    return {
        percentageFormat:percentageFormat,
        percentageFormatWithoutZero:percentageFormatWithoutZero,
        withoutPercentageFormat:withoutPercentageFormat,
        numberFormat:numberFormat,
        numberFormatWithoutCurrency:numberFormatWithoutCurrency,
        round:round,
        formatMessage:formatMessage,
        convertCurrency:convertCurrency,
        secondsOfTrading:secondsOfTrading,
        numberFormatTenThousand:numberFormatTenThousand,
        intFormat:intFormat,
        intFormatWithoutCurrency:intFormatWithoutCurrency,
        progressFormat:progressFormat
    }
})();

var tool = (function () {

    tip.defaults = {
        domId:"",
        clickDomId:[""], //TODO clickDomId: [{id: "", function(){} }, {id: "", function(){} }]
        cookieName:"",
        date:"2020/1/1"
    };

//    tool.tip({domId:"",clickDomId:"",cookieName:""});

    function tip(options) {
        options = $.extend({}, tip.defaults, options || {});
        var today = new Date();
        var expireDate = new Date(options.date);
        if (today.getTime() - expireDate.getTime() < 0) {
            if (!getCookie(options.cookieName)) {
                $("#" + options.domId).show();
                clickToKnow(options);
            }
        }
    }

    function clickToKnow(options) {
        $.each(options.clickDomId, function (index, dom) {
            $("#" + dom).click(function () {
                $("#" + options.domId).hide();
                if (options.date) {
                    setCookie(options.cookieName, "true", options.date);
                } else {
                    setCookie(options.cookieName, "true");
                }
            })
        })
    }

    function getCookie(cookieName) {
        if (document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(cookieName + "=");
            if (c_start != -1) {
                c_start = c_start + cookieName.length + 1;
                var c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) c_end = document.cookie.length;
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return "";
    }

    function setCookie(cookieName, value, date) {
        if (date) {
            var exdate = new Date(date);
            document.cookie = cookieName + "=" + escape(value) + ";expires=" + exdate.toGMTString() + ";domain=.lufax.com;path=/";
        } else {
            document.cookie = cookieName + "=" + escape(value) + ";domain=.lufax.com;path=/";
        }
    }

    function deleteCookie(cookieName) {
        var date = new Date();
        date.setTime(date.getTime() - 24 * 60 * 60 * 1000);
        document.cookie = cookieName + "=" + ";expires=" + date.toGMTString() + ";domain=.lufax.com;path=/";
    }

    /*domId must be unique
     * tool.loading("domId");    //big and common loading gif
     * tool.loading("domId",true);  //small loading gif
     * */

    loading.count = 0;

    function loading(domId, isSmall) {
        if (typeof(isSmall) == "boolean" && isSmall) {
            loading.content = '<div class="loadingWrapper loadingSmall hidden">' +
                '<i class="loadingPic"></i>' +
                '</div>';
        } else {
            loading.content = '<div class="loadingWrapper hidden">' +
                '<i class="loadingPic"></i>' +
                '<span class="loadingTips">正在处理，请稍后...</span>' +
                '</div>';

            if (loading.count != 0) {
                ++loading.count;
                return;
            }
            ++loading.count;
        }

        var domIdHandler = $("#" + domId);
        domIdHandler.append(loading.content).css("position", "relative");

        var loadingWrap = domIdHandler.children(".loadingWrapper");
        var loadingWidth = loadingWrap.outerWidth() / 2;
        var loadingHeight = loadingWrap.outerHeight() / 2;
        var parentWidth = domIdHandler.width() / 2;
        var parentHeight = domIdHandler.height() / 2;
        loadingWrap.css({"top":parentHeight - loadingHeight, "left":parentWidth - loadingWidth}).show();
    }

    function loadingEnd(domId, isSmall) {
        if (typeof(isSmall) == "boolean" && isSmall) {
            $("#" + domId).find(".loadingWrapper").remove();
        } else if (--loading.count == 0) {
            $("#" + domId).find(".loadingWrapper").remove();
        }
    }

    function IE6Notice() {
        if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
            var popIE6 = tool.getCookie("isIE6");
            if (!popIE6) {
                showPopPanel();
            } else {
                showTopPanel();
            }

            /*hide top ie 6 panel*/
            $(".topIE6").find(".closeBtn").live("click", function () {
                $(".topIE6").slideUp(200);
            });
        }
        /*ie6 cookie not exit,show pop panel*/
        function showPopPanel() {
            LufaxPopup.blankPopup({
                content:'<div class="popIE6 clearfix">' +
                    '<div class="close"><a class="btn graBtn_2020" href="javascript:void(0);"></a></div>' +
                    '<div class="logo">&nbsp;</div>' +
                    '<div class="content">' +
                    '<h2 class="title"><span class="emphasize">IE6</span>out了！您还在用么？</h2>' +
                    '<p class="suggest">为了最佳的浏览体验<br/>建议您使用以下浏览器：</p>' +
                    '<div class="availableBrowser">' +
                    '<a class="browser IE7gte" href="http://download.microsoft.com/download/1/6/1/16174D37-73C1-4F76-A305-902E9D32BAC9/IE8-WindowsXP-x86-CHS.exe" target="_blank">IE7.0以上</a>' +
                    '<a class="browser firefox" href="http://download.firefox.com.cn/releases/webins3.0/official/zh-CN/Firefox-latest.exe" target="_blank">firefox</a>' +
                    '<a class="browser chrome" href="https://www.google.com/intl/zh-CN/chrome/browser/index.html" target="_blank">chrome</a>' +
                    '</div>' +
                    '<div class="buttons">' +
                    '<a class="btns btn_info btn_large close" href="javascript:void(0);">忽&emsp;略</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>',
                onConfirm:function () {
                    tool.setCookie("isIE6", "yes", "2020/01/01");
                    showTopPanel();
                }
            });
        }

        /*ie6 cookie exit,show top panel*/
        function showTopPanel() {
            $("body").prepend('<div class="topIE6 hidden clearfix"><div class="content"><div class="leftWrap"><i class="icon"></i>您可能还在使用IE6。<span class="suggest">为了最佳的浏览效果，我们推荐以下浏览器供您选择：</span><a class="browser IE7gte" href="http://download.microsoft.com/download/1/6/1/16174D37-73C1-4F76-A305-902E9D32BAC9/IE8-WindowsXP-x86-CHS.exe" target="_blank">IE7.0以上</a><a class="browser firefox" href="http://download.firefox.com.cn/releases/webins3.0/official/zh-CN/Firefox-latest.exe" target="_blank">firefox</a><a class="browser chrome" href="https://www.google.com/intl/zh-CN/chrome/browser/index.html" target="_blank">chrome</a></div><div class="rightWrap"><a class="closeBtn" href="javascript:void(0);">&times;</a></div></div></div>');
            $(".topIE6").slideDown(1000);
        }
    }

    countDown.options = {
        countDownSeconds:0,
        doubleDigit:true,
        secondsOnly:false,
        callback:function () {
            return false;
        }
    };

    function countLoop() {
        render(countDown.options.countDownSeconds);
        if (countDown.options.countDownSeconds == 0) {
            countDown.options.callback();
        } else {
            --countDown.options.countDownSeconds;
            OTP_speechCountDownTime = setTimeout(countLoop, 1000);
        }
    }

    function render(remainSeconds) {
        var seconds;
        if (countDown.options.secondsOnly == true) {
            seconds = zero(remainSeconds);
        } else {
            seconds = zero(remainSeconds % 60);
        }
        var minutes = zero(Math.floor(remainSeconds / 60) % 60);
        var hours = zero(Math.floor(remainSeconds / 60 / 60) % 24);
        var days = zero(Math.floor(remainSeconds / 60 / 60) / 24);
        display({days:days, seconds:seconds, minutes:minutes, hours:hours});
    }

    function zero(n) {
        var n = parseInt(n, 10);
        if (n > 0 && countDown.options.doubleDigit == true) {
            if (n <= 9) {
                n = "0" + n;
            }
            return String(n);
        } else if (n >= 0 && countDown.options.doubleDigit == false) {
            return String(n);
        } else {
            return "00";
        }
    }

    function display(option) {
        $("#countDownDay").html(option.days);
        $("#hour").html(option.hours);
        $("#min").html(option.minutes);
        $("#sec").html(option.seconds);
    }

    function countDown(options) {
        countDown.options = $.extend({}, countDown.options, options || {});
        countLoop();
    }

    function limitText(el, limit) {
        var text = $(el).text();
        var text_length = text.length;
        if (text_length > limit) {
            var new_text = text.slice(0, limit);
            $(el).text(new_text + "...");
        }
    }

//    <div class="ui_complex_pagination">
//        <div class="transfer-page-wrap"></div>
//        <div class="pagination-info">
//            <span id="$firstNum"></span>-<span id="$lastNum"></span>条，共<span id="$totalNum"></span>条
//        </div>
//    </div>
    function pageCount(totalCount, currentPage, pageLimit, pageWrap) {
        var firstNum = (currentPage - 1) * pageLimit;
        var lastNum;
        var $pageWrap = $(pageWrap);
        for (var i = firstNum; i < totalCount && i < pageLimit * currentPage; i++) {
            lastNum = i;
        }
        firstNum += 1;
        lastNum += 1;
        if (totalCount === 0) {
            $pageWrap.hide();
        }
        $pageWrap.find('.first-num').html(firstNum);
        $pageWrap.find('.last-num').html(lastNum);
        $pageWrap.find('.total-count').html(totalCount);
    }

    return {
        tip:tip,
        getCookie:getCookie,
        setCookie:setCookie,
        deleteCookie:deleteCookie,
        loading:loading,
        loadingEnd:loadingEnd,
        IE6Notice:IE6Notice,
        countDown:countDown,
        limitText:limitText,
        pageCount:pageCount
    };

})();

//autoScroll
//dom结构如下
//<div class="carousel-fade">
//<ul>
// <li><a href="#"><img src="" alt=""></a></li>
// <li><a href="#"><img src="" alt=""></a></li>
// </ul>
// <div class="focus_ctrl">
// <a href="#">•</a>
// <a href="#">•</a>
// </div>
// </div>
var autoScroll = (function () {
    function _scroll(i) {
        $(".carousel-fade>ul>li:visible").stop(true, true).fadeOut(800);
        $(".carousel-fade>ul>li").eq(i).stop(true, true).fadeIn(800);
    }

    function _focus() {
        var l = $(".carousel-fade>ul li").length;
        var index = $(".focus_ctrl a").index($(".current")[0]);
        if (index == l - 1) {
            index = -1;
        }
        $(".focus_ctrl a").eq(index + 1).addClass("current").siblings().removeClass("current");
        _scroll(index + 1);
        index++;
        //alert(1);
    }

    function _init() {
        var l = $(".carousel-fade>ul li").length;
        if (l === 1) {
            $(".focus_ctrl").hide();
            return false;
        }
        var img_interval = 5000;
        $(".focus_ctrl a:eq(0)").addClass("current");
        var fcsInt = setInterval('autoScroll.focus()', img_interval);
        $(".carousel-fade>ul>li").eq(0).fadeIn(0);
        $(".carousel-fade>ul").hover(function () {
            clearInterval(fcsInt)
        }, function () {
            fcsInt = setInterval('autoScroll.focus()', img_interval)
        });

        $(".focus_ctrl a").hover(function () {
            $(this).addClass("current").siblings().removeClass("current");
            autoScroll.scroll($(this).index());
            clearInterval(fcsInt);
        }, function () {
            fcsInt = setInterval('autoScroll.focus()', img_interval);
        });
    }

    return {
        scroll:_scroll,
        focus:_focus,
        init:_init
    }
})();

jQuery.fn.pagination = function (maxentries, opts) {
    opts = jQuery.extend({
        num_display_entries:6,
        current_page:0,
        num_edge_entries:2,
        link_to:"javascript:void(0)",
        prev_text:"<span class=\"caret\">&lt;</span> 上一页",
        next_text:"下一页 <span class=\"caret\">&gt;</span>",
        first_text:"首页",
        last_text:"尾页",
        ellipse_text:"...",
        prev_show_always:true,
        next_show_always:true,
        callback:function () {
            return false;
        }
    }, opts || {});

    return this.each(function () {
        /**
         * 计算最大分页显示数目
         */
        function numPages() {
            return maxentries;
        }

        /**
         * 极端分页的起始和结束点，这取决于current_page 和 num_display_entries.
         * @返回 {数组(Array)}
         */
        function getInterval() {
            var ne_half = Math.ceil(opts.num_display_entries / 2);
            var np = numPages();
            var upper_limit = np - opts.num_display_entries;
            var start = current_page > ne_half ? Math.max(Math.min(current_page - ne_half, upper_limit), 0) : 0;
            var end = current_page > ne_half ? Math.min(current_page + ne_half, np) : Math.min(opts.num_display_entries, np);
            return [start, end];
        }

        /**
         * 分页链接事件处理函数
         * @参数 {int} page_id 为新页码
         */
        function pageSelected(page_id, evt) {
            current_page = page_id;
            function reDraw(current_page) {
                return function () {
                    drawLinks(current_page);
                }
            }

            var continuePropagation = opts.callback(page_id + 1, reDraw(current_page));
            if (!continuePropagation) {
                if (evt.stopPropagation) {
                    evt.stopPropagation();
                }
                else {
                    evt.cancelBubble = true;
                }
            }
            return continuePropagation;
        }

        /**
         * 此函数将分页链接插入到容器元素中
         */
        function drawLinks(current_page) {
            panel.empty();
            var interval = getInterval();
            var np = numPages();
            // 这个辅助函数返回一个处理函数调用有着正确page_id的pageSelected。
            var getClickHandler = function (page_id) {
                return function (evt) {
                    return pageSelected(page_id, evt);
                }
            };
            //辅助函数用来产生一个单链接(如果不是当前页则产生span标签)
//            var appendItem = function (page_id, appendopts) {
//                page_id = page_id < 0 ? 0 : (page_id < np ? page_id : np - 1); // 规范page id值
//                appendopts = jQuery.extend({text:page_id + 1, classes:""}, appendopts || {});
//                if (page_id == current_page) {
//                    var lnk = jQuery("<span class='current'>" + (appendopts.text) + "</span>");
//                } else {
//                    var lnk = jQuery("<a>" + (appendopts.text) + "</a>")
//                        .bind("click", getClickHandler(page_id))
//                        .attr('href', opts.link_to.replace(/__id__/, page_id));
//                }
//                if (appendopts.classes) {
//                    lnk.addClass(appendopts.classes);
//                }
//                panel.append(lnk);
//            };
            var appendItem = function (current, total) {
                var lnk = "<p class='pageNum'>第" + Number(current + 1) + "页/共" + total + "页</p>";
                panel.append(lnk);
            };


            var adjustAppend = function (page_id, page, appendopts) {
                page_id = page_id < 0 ? 0 : (page_id < np ? page_id : np - 1); // 规范page id值
                appendopts = jQuery.extend({text:page_id + 1, classes:""}, appendopts || {});
                if (current_page == page) {
                    var lnk = jQuery("<span class='btns disabled btn_page btn_small'>" + (appendopts.text) + "</span>");
                } else {
                    var lnk = jQuery("<a class='btns btn_page btn_small'>" + (appendopts.text) + "</a>")
                        .bind("click", getClickHandler(page_id))
                        .attr('href', opts.link_to.replace(/__id__/, page_id));
                }
                if (appendopts.classes) {
                    lnk.addClass(appendopts.classes);
                }
                panel.append(lnk);
            };

            var appendPre = function (page_id, appendopts) {
                adjustAppend(page_id, 0, appendopts);
            };

            var appendNext = function (page_id, appendopts) {
                adjustAppend(page_id, maxentries - 1, appendopts);
            };

            // 产生"Previous"-链接
            if (opts.prev_text && (current_page > 0 || opts.prev_show_always)) {
                appendPre(0, {text:opts.first_text, classes:"first"});
                appendPre(current_page - 1, {text:opts.prev_text, classes:"prev"});

            }
            appendItem(current_page, maxentries);
            // 产生起始点
//            if (interval[0] > 0 && opts.num_edge_entries > 0) {
//                if (maxentries <= 10) {
//                    opts.num_edge_entries = maxentries;
//                }
//                var end = Math.min(opts.num_edge_entries, interval[0]);
//                for (var i = 0; i < end; i++) {
//                    appendItem(i, {classes:"innerA"});
//                }
//                if (opts.num_edge_entries < interval[0] && opts.ellipse_text) {
//                    jQuery("<span class='innerA'>" + opts.ellipse_text + "</span>").appendTo(panel);
//                }
//            }
//            // 产生内部的些链接
//            for (var i = interval[0]; i < interval[1]; i++) {
//                appendItem(i, {classes:"innerA"});
//            }
//            // 产生结束点
//            if (interval[1] < np && opts.num_edge_entries > 0) {
//                if (maxentries <= 10) {
//                    opts.num_edge_entries = maxentries;
//                    if (np - opts.num_edge_entries > interval[1] && opts.ellipse_text) {
//                        jQuery("<span class='innerA'>" + opts.ellipse_text + "</span>").appendTo(panel);
//                    }
//                    var begin = Math.max(np - opts.num_edge_entries, interval[1]);
//                    var end = Math.min(opts.num_edge_entries, interval[0]);
//                    for (var i = begin; i < np; i++) {
//                        appendItem(i, {classes:"innerA"});
//                    }
//                } else {
//                    if (np - opts.num_edge_entries > interval[1] && opts.ellipse_text) {
//                        jQuery("<span class='innerA'>" + opts.ellipse_text + "</span>").appendTo(panel);
//                    }
//                    if (np - opts.num_edge_entries <= interval[1]) {
//                        var begin = Math.max(np - opts.num_edge_entries, interval[1]);
//                        for (var i = begin; i < np; i++) {
//                            appendItem(i, {classes:"innerA"});
//                        }
//                    }
//                }
//            }
            // 产生 "Next"-链接
            if (opts.next_text && (current_page < np - 1 || opts.next_show_always)) {
                appendNext(current_page + 1, {text:opts.next_text, classes:"next"});
                appendNext(maxentries - 1, {text:opts.last_text, classes:"last"});
            }
//            $(".innerA").wrapAll("<p class='pageNum'></p>");

        }

        //从选项中提取current_page
        var current_page = opts.current_page;
        //存储DOM元素，以方便从所有的内部结构中获取
        var panel = jQuery(this);
        // 获得附加功能的元素
        this.selectPage = function (page_id) {
            pageSelected(page_id);
        };
        this.prevPage = function () {
            if (current_page > 0) {
                pageSelected(current_page - 1);
                return true;
            }
            else {
                return false;
            }
        };
        this.nextPage = function () {
            if (current_page < numPages() - 1) {
                pageSelected(current_page + 1);
                return true;
            }
            else {
                return false;
            }
        };
        // 所有初始化完成，绘制链接
        if (maxentries > 1) {
            drawLinks(current_page);
        } else {
            panel.empty();
        }
    });
};

var LufaxPopup = (function () {
    var options = {};
    var defaultOptions = {};
    var Template = {
        simplePopupTemplate:'<div class="modal-dialog timeout_safe_exit ${imgClass}">' +
            '<div class="border"> ' +
            '<table>' +
            '<tbody><tr>' +
            '<td><div class="logo">&nbsp;</div></td>' +
            '<td class="detail">' +
            '<p class="title">${title}</p>' +
            '<p class="content">${content}</p>' +
            '<div class="clearfix">${button}</div>' +
            '</td>' +
            '</tr>' +
            '</tbody></table>' +
            '</div>' +
            '</div>',

        blankTemplate:'<div class="modal-dialog popup_wrap blankPopup">${content}</div>',

        newPopupTemplate:'<div class="modal-dialog popup_wrap">' +
            '<div class="modal-content">' +
            '<div class="modal-header clearfix">' +
            '${closeDisplay}' +
            '<h4 class="modal-title">${popupTitleName}</h4>' +
            '</div><div class="modal-body">' +
            '<i class="icon ${iconClass}"></i>' +
            '<span class="message">${message}</span>' +
            '</div>' +
            '<div class="modal-footer">${button}' +
            '</div>' +
            '</div>' +
            '</div>',

        newIconPopupTemplate:'<div class="modal-dialog popup_wrap">' +
            '<div class="modal-content">' +
            '<div class="modal-header clearfix">' +
            '${closeDisplay}' +
            '<h4 class="modal-title">${popupTitleName}</h4>' +
            '</div><div class="modal-body">' +
            '<i class="iconV2 ${iconClass}"></i>' +
            '<span class="message">${message}</span>' +
            '</div>' +
            '<div class="modal-footer">${button}' +
            '</div>' +
            '</div>' +
            '</div>',

        popupSubtitleTemplate:'<div class="modal-dialog popup_wrap popup_wrap_subtitle ${privateClass}">' +
            '<div class="modal-content">' +
            '<div class="modal-header clearfix">' +
            '${closeDisplay}' +
            '<h4 class="modal-title">${popupTitleName}</h4>' +
            '</div><div class="modal-body clearfix">' +
            '<i class="icon ${iconClass}"></i>' +
            '<span class="message">${subTitle}</span>' +
            '<div class="content">${contents}' +
            '</div>' +
            '</div>' +
            '<div class="modal-footer">${button}' +
            '</div>' +
            '</div>' +
            '</div>',

        newIconPopupSubtitleTemplate:'<div class="modal-dialog popup_wrap popup_wrap_subtitle ${privateClass}">' +
            '<div class="modal-content">' +
            '<div class="modal-header clearfix">' +
            '${closeDisplay}' +
            '<h4 class="modal-title">${popupTitleName}</h4>' +
            '</div><div class="modal-body clearfix">' +
            '<i class="iconV2 ${iconClass}"></i>' +
            '<span class="message">${subTitle}</span>' +
            '<div class="content">${contents}' +
            '</div>' +
            '</div>' +
            '<div class="modal-footer">${button}' +
            '</div>' +
            '</div>' +
            '</div>',

        richPopupTemplate:'<div class="modal-dialog popup_wrap commission_wrap ${privateClass}">' +
            '<div class="modal-content">' +
            '<div class="modal-header clearfix">' +
            '<div class="close"><a class="modal-close" href="javascript:void(0);"></a></div>' +
            '<h4 class="modal-title">${title}</h4>' +
            '</div><div class="modal-body clearfix">' +
            '<div class="affiliate-content">${content}' +
            '</div>' +
            '</div>' +
            '<div class="modal-footer">${foot}' +
            '</div>' +
            '</div>' +
            '</div>'
    };

    function simplePopup(options) {
        var simplePopupOptions = $.extend("", defaultOptions, options);
        openPopupWindow({
                template:Template["simplePopupTemplate"],
                args:{
                    imgClass:simplePopupOptions.imgClass,
                    title:simplePopupOptions.title,
                    content:simplePopupOptions.content,
                    button:simplePopupOptions.button
                },
                bindings:[
                    {selector:getConfirmButtonSelector(), func:closableBinding(simplePopupOptions.onConfirm)},
                    {selector:getCancelButtonSelector(), func:closableBinding(simplePopupOptions.onCancel)}
                ]
            }
        );
    }

    function blankPopup(options) {
        this.options = options;
        openPopupWindow({
                template:Template["blankTemplate"],
                args:{
                    content:options.content || ""
                },
                bindings:[
                    {selector:getConfirmButtonSelector(), func:closableBinding(options.onConfirm)},
                    {selector:getCloseButtonSelector(), func:closableBinding(options.onClose)},
                    {selector:getCancelButtonSelector(), func:closableBinding(options.onCancel)}
                ]
            }
        );
    }

    function richPopup(options) {
        var richPopupOptions = $.extend("", defaultOptions, options);
        openPopupWindow({
                template:Template["richPopupTemplate"],
                args:{
                    privateClass:richPopupOptions.privateClass,
                    title:richPopupOptions.title,
                    content:richPopupOptions.content,
                    foot:richPopupOptions.foot
                },
                bindings:[
                    {selector:getCancelButtonSelector(), func:closableBinding(richPopupOptions.onCancel)}
                ]
            }
        );
    }

    function popup(options) {
        this.options = options;
        openPopupWindow({
                template:Template["newPopupTemplate"],
                args:{
                    popupTitleName:options.popupTitleName || "",
                    iconClass:options.iconClass,
                    message:LufaxUtility.formatMessage(options.message, options.args) || options,
                    button:options.button,
                    closeDisplay:options.closeDisplay == 'false' ? '' : '<div class="close"><a class="modal-close" href="javascript:void(0);"></a></div>'
                },
                css:options.css,
                bindings:([
                    {selector:getConfirmButtonSelector(), func:closableBinding(options.onConfirm)},
                    {selector:getCloseButtonSelector(), func:closableBinding(options.onClose)},
                    {selector:getCancelButtonSelector(), func:closableBinding(options.onCancel)}
                ])
            }
        );
    }

    function popup_subTitle(options) {
        this.options = options;
        openPopupWindow({
                template:Template["popupSubtitleTemplate"],
                args:{
                    privateClass:options.privateClass,
                    popupTitleName:options.popupTitleName || "",
                    iconClass:options.iconClass,
                    subTitle:LufaxUtility.formatMessage(options.subTitle, options.args) || options,
                    contents:LufaxUtility.formatMessage(options.contents, options.args) || options,
                    button:options.button,
                    closeDisplay:options.closeDisplay == 'false' ? '' : '<div class="close"><a class="modal-close" href="javascript:void(0);"></a></div>'
                },
                css:options.css,
                bindings:([
                    {selector:getConfirmButtonSelector(), func:closableBinding(options.onConfirm)},
                    {selector:getCloseButtonSelector(), func:closableBinding(options.onClose)},
                    {selector:getCancelButtonSelector(), func:closableBinding(options.onCancel)}
                ])
            }
        );
    }

    function newIconPopup(options) {
        this.options = options;
        openPopupWindow({
                template:Template["newIconPopupTemplate"],
                args:{
                    popupTitleName:options.popupTitleName || "",
                    iconClass:options.iconClass,
                    message:LufaxUtility.formatMessage(options.message, options.args) || options,
                    button:options.button,
                    closeDisplay:options.closeDisplay == 'false' ? '' : '<div class="close"><a class="modal-close" href="javascript:void(0);"></a></div>'
                },
                css:options.css,
                bindings:([
                    {selector:getConfirmButtonSelector(), func:closableBinding(options.onConfirm)},
                    {selector:getCloseButtonSelector(), func:closableBinding(options.onClose)},
                    {selector:getCancelButtonSelector(), func:closableBinding(options.onCancel)}
                ])
            }
        );
    }

    function newIconPopupSubTitle(options) {
        this.options = options;
        openPopupWindow({
                template:Template["newIconPopupSubtitleTemplate"],
                args:{
                    privateClass:options.privateClass,
                    popupTitleName:options.popupTitleName || "",
                    iconClass:options.iconClass,
                    subTitle:LufaxUtility.formatMessage(options.subTitle, options.args) || options,
                    contents:LufaxUtility.formatMessage(options.contents, options.args) || options,
                    button:options.button,
                    closeDisplay:options.closeDisplay == 'false' ? '' : '<div class="close"><a class="modal-close" href="javascript:void(0);"></a></div>'
                },
                css:options.css,
                bindings:([
                    {selector:getConfirmButtonSelector(), func:closableBinding(options.onConfirm)},
                    {selector:getCloseButtonSelector(), func:closableBinding(options.onClose)},
                    {selector:getCancelButtonSelector(), func:closableBinding(options.onCancel)}
                ])
            }
        );
    }

    function close() {
        $.unblockUI();
    }

    function closableBinding(func) {
        return function () {
            LufaxPopup.close();
            if (func) {
                func();
            }
        }
    }

    function openPopupWindow(options) {

        if (options.onClose != undefined) {
            LufaxPopup.options = options;
        }
        $.blockUI({
            message:$(LufaxUtility.formatMessage(options.template, options.args))
        });
        setPopupPosition();
        $(getCloseButtonSelector()).die("click");
        $(getCloseButtonSelector()).live("click", closableBinding(options.onCancel));
        if (!options.bindings)  return;
        $.each(options.bindings, function (index, binding) {
            $(binding.selector).die("click");
            $(binding.selector).live("click", binding.func);
        });
    }

    function setPopupPosition() {
        var wwidth = $(window).width();
        var wheight = $(window).height();
        var pop_width = $(".modal-dialog:last").outerWidth();
        var pop_height = $(".modal-dialog:last").outerHeight();
        if (pop_width && pop_height) {
            $(".blockMsg").css("top", (wheight - pop_height) / 2 + 'px').css("left", (wwidth - pop_width) / 2 + 'px');
        }
    }

    function getConfirmButtonSelector() {
        return getButtonSelector("confirmBtn");
    }

    function getCancelButtonSelector() {
        return getButtonSelector("cancleBtn");
    }

    function getCloseButtonSelector() {
        return getButtonSelector("close");
    }

    function getButtonSelector(buttonClass) {
        return "." + buttonClass;
    }

    return {
        simplePopup:simplePopup,
        close:close,
        blankPopup:blankPopup,
        popup:popup,
        closableBinding:closableBinding,
        richPopup:richPopup,
        popup_subTitle:popup_subTitle,
        newIconPopupSubTitle:newIconPopupSubTitle,
        newIconPopup:newIconPopup
    }

})();

var LufaxTemplate = (function () {
    function escapeTemplate(content) {
        return content == null ? "" : content.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
    }

    function stringTemplateMergeAndShow(template, data, callback) {
        var mergedTemplate = TrimPath.parseTemplate(escapeTemplate(template), 'templateId').process({model:data});
        if (callback)
            callback(mergedTemplate);
        return mergedTemplate;
    }

    function textareaTemplateMergeAndShow(templateId, data, callback) {
        var mergedTemplate = TrimPath.processDOMTemplate(templateId, {model:data});
        if (callback)
            callback(mergedTemplate);
        return mergedTemplate;
    }

    return {
        stringTemplateMergeAndShow:stringTemplateMergeAndShow,
        textareaTemplateMergeAndShow:textareaTemplateMergeAndShow
    }
})();
//mouseTips
(function ($) {
    $.fn.mouseTips = function (options) {
        var toolTipsHtml = '<p class="mouseTips"></p>';
        if ($('.mouseTips').length <= 0) {
            $('body').append(toolTipsHtml);
        }
        return this.each(function () {
            var defaultVal = {
                flagInfo:$(this).attr("title"),
                bgColor:'#ffe9ad',
                borderColor:'#fab418',
                topOffset:10,
                leftOffset:0,
                holding:false,
                placeStyle:'offset',
                tipsWidth:''
            };
            var obj = $.extend(defaultVal, options);
            var $mouseTips = $('.mouseTips');
            $(this).removeAttr("title");

            $(this).hover(function () {
                showTips(this);
                if (obj.holding == true) {
                    $(this).append($mouseTips.clone());
                    $(this).find('.mouseTips').show();
                } else {
                    $mouseTips.show();
                }

            }, function () {
                if (obj.holding == true) {
                    $(this).find('.mouseTips').remove();
                } else {
                    $mouseTips.hide();
                }


            });

            var showTips = function (el) {
                if (obj.placeStyle == 'position') {
                    var _offset = $(el).position();
                } else {
                    var _offset = $(el).offset();
                }
                var _offsetTop = _offset.top;
                var _offsetLeft = _offset.left + obj.leftOffset;
                var elHeight = $(el).height() + obj.topOffset;
                if (obj.tipsWidth === '') {
                    if (obj.flagInfo.length > 30) {
                        obj.tipsWidth = 350;
                    } else {
                        obj.tipsWidth = 'auto';
                    }
                }
                $mouseTips.css({'left':_offsetLeft, 'top':_offsetTop + elHeight, 'background-color':obj.bgColor, 'border-color':obj.borderColor, 'width':obj.tipsWidth}).html(obj.flagInfo);
            };

        });
    }
})(jQuery);

//zoomTips
(function ($) {
    $.fn.zoomTips = function (options) {
        var defaultVal = {
            isCash:false
        };
        var obj = $.extend(defaultVal, options);
        var tipsHtml = '<div class="zoomTips"></div>';
        $('body').append(tipsHtml);
        return this.each(function () {
            $(this).blur(function () {
                var showVal = $(this).val();
                if (obj.isCash) {
                    showVal = showVal;

                } else {
                    showVal = showVal.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
                }
                $(this).val(showVal);
                tipsOut();
            });
            $(this).bind('focus', function () {
                var showVal = $(this).val();
                if (showVal.length == 0) {
                    tipsOut();
                } else {
                    showCurVal(showVal);
                    tipsIn(this);
                }
            });
            $(this).bind('keydown keyup', function () {
                var showVal = $(this).val();
                if (obj.isCash) {
                    showVal = showVal;
                    $(this).next().text(LufaxUtility.convertCurrency(showVal));
                } else {
                    showVal = showVal.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
                }
                if (showVal.length > 0) {
                    showCurVal(showVal);
                    tipsIn(this);
                } else {
                    tipsOut();
                }
            });

            function showCurVal(val) {
                if (obj.isCash) {
                    $('.zoomTips').text(LufaxUtility.numberFormatWithoutCurrency(val));
                } else {
                    $('.zoomTips').text(val);
                }

            }

            function tipsIn(el) {
                var _offset = $(el).offset();
                var _offsetTop = _offset.top;
                var _offsetLeft = _offset.left;
                var elHeight = $(el).innerHeight();
                $('.zoomTips').css({'left':_offsetLeft, 'top':_offsetTop + 30}).show();
            }

            function tipsOut() {
                $('.zoomTips').hide();
            }
        });

    }
})(jQuery);


/*
 * go to top
 * add by kika
 * at 2013-04-24
 * */
(function ($) {
    $.fn.goTop = function (options) {
        var defaultVal = {
            handler:$(this),
            duration:500,
            border:true
        };
        var obj = $.extend(defaultVal, options);
        return this.each(function () {
            $(window).scroll(function () {
                goTop(obj.handler);
            });
            $(this).on('click', function () {
                $('html,body').animate({scrollTop:0}, obj.duration);
            });
        });
        function goTop(_handler) {
            //location based on parent element
            var parentWidth = 0;
            obj.border ? parentWidth = $(_handler).parent().outerWidth() - 1 : parentWidth = $(_handler).parent().outerWidth();
            $(_handler).parent().attr("style", "position:relative;");
            $(_handler).attr("style", "margin-left:" + parentWidth + "px;");
            //control display or hide
            if ($(window).scrollTop() > 300) {
                $(_handler).stop(true, true).show();
            }
        }
    }
})(jQuery);

