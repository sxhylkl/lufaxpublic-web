/*error*/
$(function () {
    $(".tabs>a").each(function (i) {
        $(this).click(function () {
            $(this).addClass("current").siblings().removeClass("current")
                .parent().next().children(".tab_con").eq(i).slideDown('fast').siblings().hide();
        });
    });

    $(document).on('click', ".obtainBtn", function () {
        obtainDynamicCode($(this), 59);
    });

    inputsValid(".input-error", "xxx不能为空", 10, false);
    inputsValid(".calendar-error", "日期不能大于借款截止日期", 10, false);

    $('#otp-mod').otpModule({
        otpType: "1",       //1 - otp; 2 - token
        dynamicType:"1",      // 1 - both, 2 - sms, 3 - voice
        otpOfficialCall:"13312341234",
        otpVoiceWaitTime:"30",
        otpCountDownSeconds:"59",
        otpRequestUrl:null,
        otpRequestParams : null,
        otpVoiceRequestParams : null,
        otpTrigger:true,
        otpScene:null,      //popup...
        otpRequestMethod:"POST",
        otpGetMobileNo : function() {
            return $("#mobileNo").val();
        },
        otpGetRequestParams : function() {
            return {"mobileNo" : $("#mobileNo").val()};
        }
    });
});

/*security validate page, obtain dynamic code to mobile phone*/
function obtainDynamicCode(handler, seconds) {
    if (!handler.hasClass("disabled")) {
        handler.empty().append('<span><label id="sec">' + seconds + '</label>秒后重发</span>').addClass("disabled");
        tool.countDown({
            countDownSeconds:parseInt(seconds),
            doubleDigit:false,
            callback:function () {
                handler.empty().append("<span>免费获取</span>").removeClass("disabled");
            }
        });
    }
}

function inputsValid(targetDom, errorText, maxWidth, rmCommets) {
    var errorPanel = $(targetDom).parent(".input-wrap").siblings(".errorPanel");
    var errorTextDom = errorPanel.children(".errorContent");
    var commentsDom = $(targetDom).parent(".input-wrap").siblings(".replenish-hor");

    $(targetDom).focusin(function () {
        if (rmCommets) {
            commentsDom.removeClass("hidden");
        }

        $(this).parent(".input-wrap").removeClass("error");
        errorTextDom.html("");
        errorPanel.removeClass("multipleLine").css({display:"none"});
    });

    $(targetDom).focusout(function () {
        if (rmCommets) {
            commentsDom.addClass("hidden");
        }

        if (errorText.length > maxWidth) {
            errorPanel.addClass("multipleLine");
        } else {
            errorPanel.removeClass("multipleLine");
        }
        $(this).parent(".input-wrap").addClass("error");
        errorTextDom.html(errorText);
        errorPanel.css({display:"inline-block"});
    });
}

/*进度条*/
$(function () {
    $(".tabs>a").each(function (i) {
        $(this).click(function () {
            $(this).addClass("current").siblings().removeClass("current")
                .parent().next().children(".tab_con").eq(i).slideDown('fast').siblings().hide();
        })
    });
    $(".progressBar").progressBar(85);
});


/*dataPicker*/
$(function () {
    $(".tabs>a").each(function (i) {
        $(this).click(function () {
            $(this).addClass("current").siblings().removeClass("current")
                .parent().next().children(".tab_con").eq(i).slideDown('fast').siblings().hide();
        });
    });
    $(".calendar").datepicker({
        yearRange:"c-99:c-17"
    });

    $('#datepicker').datepicker({
        showCollectionText:true, //配置收款日历
        showMonthAfterYear:true, //月份在年份后面显示
        changeMonth:false, //取消月份选择
        changeYear:false, //取消年份选择
        yearRange:'2013:2013',
        defaultDate:'2013-08-04', //取服务器日期

        afterShow:function (dateText, inst) {
            $(this).find('td').each(function () {
                var dayTxt = $(this).find('a').text();
                if (dayTxt == "3" || dayTxt == "7") {
                    $(this).find('a').addClass('ui-state-execute').attr('title', '123123123');
                }
            });
            $('.ui-state-execute').mouseTips();
            $(this).find('.current-month').attr('href', 'http://www.lufax.com');
        }
    });

});

/*分页*/
$(function () {
    $(".tabs>a").each(function (i) {
        $(this).click(function () {
            $(this).addClass("current").siblings().removeClass("current")
                .parent().next().children(".tab_con").eq(i).slideDown('fast').siblings().hide();
        })
    })
});


/*popup*/
$(function () {
    $(".tabs>a").each(function (i) {
        $(this).click(function () {
            $(this).addClass("current").siblings().removeClass("current")
                .parent().next().children(".tab_con").eq(i).slideDown('fast').siblings().hide();
        })

    });

    $(".blankPopup a").click(function () {
        LufaxPopup.blankPopup({
            content:'<div class="operationPopWrap"><p>空白弹出层</p><p>可自定义内容和样式</p><a class="close">close</a></div>',
            onConfirm:function () {
            }
        });
    });

    $(".blankPopup.processing a").click(function () {
        LufaxPopup.blankPopup({
            content:'<div class="content_wrap_loading clearfix"><i class="ajax_loading fl"></i><span class="title">正在处理</span><span class="tips">请稍候在投资申请中查看申请结果</span></div>',
            onConfirm:function () {
            }
        });
    });

    $(".popup a").click(function () {
        LufaxPopup.popup({
            popupTitleName:"重要提示",
            iconClass:"exclamationCircleIcon",
            message:"如果您连续5次银行卡认证失败，您将无法再申请银行卡认证。<br/><span class='gray_word'>您现在还有4次机会。</span> ",
            button:"<a class='btns btn_info' href='http://common.lufax.com/common/recharge' target='_self'>重新申请认证</a><a class='btns btn_cancel ml20 close' href='javascript:;'>取消</a>"
        });
    });

    $(".popup_subTitle a").click(function () {
        LufaxPopup.popup_subTitle({
            privateClass:'bankAuth_ensureInfo',
            popupTitleName:'银行卡信息确认',
            iconClass:'exclamationCircleIcon',
            subTitle:'请仔细核对以下银行卡信息：',
            contents:'<table>' +
                '<thead><tr><th class="bankAccountName">开户姓名</th><th class="bankName">开户银行</th><th class="bankCardNum">银行卡号</th></tr></thead>' +
                '</table>' +
                '<p class="comment">&bull; 您即将第1次申请银行卡认证，如果信息有误，请立即修改。</p>' +
                '<p class="comment">&bull; 每个账户最多能申请5次银行卡认证，如果您5次均失败，将无法再进行银行卡认证。</p>',
            button:'<a class="btns btn_info" href="javascript:;">确认无误</a><a class="btns btn_cancel ml20 close" href="javascript:;">修改信息</a>',
            closeDisplay:'false'
        });
    });
    $(".simplePopup.diffLanding a").click(function () {
        LufaxPopup.simplePopup({
            imgClass:"safeExit",
            title:"您已在他处登录",
            content:"如非您本人操作，请联系客服 4001666618",
            button:'<a class="btns btn_large btn_info confirmBtn" href="javascript:void(0)"><span>重新登录</span></a><a class="btns btn_large btn_cancel ml20 cancleBtn" href="javascript:;"><span>返回首页</span></a>',
            onConfirm:function () {
                window.location.href = "https://member.lufax.com/member/uiLogin.view?appId=20000&returnPostURL=" + encodeURIComponent(window.location.href)
            },
            onCancel:function () {
                window.location.href = "http://www.lufax.com"
            }
        });
    });

    $(".richPopup a").click(function () {
        LufaxPopup.richPopup({
            privateClass:'',
            title:'直接复制链接',
            content:'<div class="textWrap"><div class="textHead">复制一下内容，发给您的好友</div><div class="textPanel">http://affiliate.lufax.com/action?a=-1&t=201&s=C006&opt=5&lp=http://www.lufax.com</div><div class="copyTip hidden"><i class="icon correctCircleIcon"></i>复制成功！</div></div>',
            foot:'<a class="btns btn_info copyBtn" id="copyBtn" href="javascript:;">复制内容</a> ',
            onConfirm:function () {

            }
        });
    });

    $(".simplePopup.safeExit a").click(function () {
        LufaxPopup.simplePopup({
            imgClass:"safeExit",
            title:"您即将安全退出",
            content:"",
            button:'<a class="btns btn_large btn_info" href="javascript:void(0);"><span>安全退出</span></a><a class="btns btn_large btn_cancel ml20 close" href="javascript:;"><span>取&ensp;消</span></a>',
            onConfirm:function () {
            },
            onCancel:function () {
            }
        });
    });

    $(".simplePopup.timeout a").click(function () {
        LufaxPopup.simplePopup({
            imgClass:"timeout",
            title:"账户登录超时",
            content:"",
            button:'<span class="countDown"><span id="sec"></span>秒后</span><a href="window.location.href= "https://user.lufax.com/user/login&returnPostURL=" + encodeURIComponent(window.location.href)">重新登录</a>',
            onConfirm:function () {
            },
            onCancel:function () {
            }
        });
        tool.countDown({
            countDownSeconds:parseInt(5),
            doubleDigit:false,
            callback:function () {
                window.location.href = 'https://user.lufax.com/user/login&returnPostURL=" + encodeURIComponent(window.location.href)';
            }
        });
    });
});

$(function () {
    $(".tabs>a").each(function (i) {
        $(this).click(function () {
            $(this).addClass("current").siblings().removeClass("current")
                .parent().next().children(".tab_con").eq(i).slideDown('fast').siblings().hide();
        })

    })

});

$(function () {
    $(".tabs>a").each(function (i) {
        $(this).click(function () {
            $(this).addClass("current").siblings().removeClass("current")
                .parent().next().children(".tab_con").eq(i).slideDown('fast').siblings().hide();
        })

    });
    tool.loading("test-common1");
    tool.loading("test-small", true);
});

(function ($) {
    $.fn.linkTip = function (options) {
        var linkTipTemp = '<span class="linkTips"></span>';

        $(this).each(function () {
            $(this).append(linkTipTemp);
        });

        return this.each(function () {
            var defaultVal = {
                flagInfo:$(this).attr("data-link"),
                tipsWidth:$(this).attr("data-width"),
                topOffset:2,
                leftOffset:0
            };
            var obj = $.extend(defaultVal, options);
            var $linkTips = $(this).children('.linkTips');

            $(this).removeAttr("data-link");
            $(this).removeAttr("data-width");

            $(this).hover(function () {
                showTips(this);
                $linkTips.show();
            }, function () {
                $linkTips.hide();
            });

            var showTips = function (el) {
                var _offset = $(el).offset();
                var _offsetTop = _offset.top;
                var _offsetLeft = _offset.left + obj.leftOffset;
                var elHeight = $(el).height() + obj.topOffset;

                $linkTips.css({'left':_offsetLeft,
                    'top':_offsetTop + elHeight,
                    'width':obj.tipsWidth,
                    'background-color':obj.bgColor,
                    'border-color':obj.borderColor,
                    'opacity':obj.opacity
                }).html(obj.flagInfo);
            };
        });
    }
})(jQuery);

$(function () {
    $('.tip-dotted').linkTip();
});