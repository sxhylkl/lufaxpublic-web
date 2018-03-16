(function ($) {
    $.fn.otpModule = function (options) {
        return this.each(function () {
            var defaultVal = {
                otpType:'1', //1 - otp; 2 - token
                dynamicType:'1', // 1 - both, 2 - sms, 3 - voice
                otpUserMobile:null,
                otpOfficialCall:null,
                otpVoiceWaitTime:null,
                otpCountDownSeconds:null,
                otpRequestMethod:'GET',
                otpRequestUrl:null,
                otpVoiceRequestUrl:null,
                otpRequestParams:{},
                otpVoiceRequestParams:{},
                otpTrigger:false,
                otpTriggerCountDown:false,
                otpScene:null,
                otpInputName:"otp",
                otpRequestCallback:function () {
                    return false;
                },
                otpInputTabIndex : null,
                otpGetRequestParams : function() {
                    return {};
                },
                otpGetMobileNo : function() {
                    return obj.otpUserMobile;
                },
                otpFocus : null,
                otpClick : function() {
                    return true;
                },
                otpBlur : null,
                otpDisablePopupError : false
            };
            var otpTemplate = '<div class="control-group otp-group">' +
                '<label id="otp-label" class="control-label"></label>' +
                '<div class="controls">' +
                '<span class="input-wrap icon-wrap validate-input">' +
                '<i class="input-icon validate">&nbsp;</i>' +
                '<input type="text" class="inputs phoneValideNum otp-input">' +
                '</span>&nbsp;&nbsp;' +
                '<a href="javascript:void(0);" class="btns btn-info" id="obtainBtn"></a>' +
                '<span class="otp-countdown hidden"></span>' +
                '<span class="errorPanel"><b class="arrow left"> </b><span class="errorContent"></span></span>' +
                '<div class="otp-error-for-popup hidden"></div>' +
                '<div class="otp-info hidden"></div>' +
                '</div>' +
                '</div>';
            $(this).append(otpTemplate);

            var $obtainBtn = $(this).find('#obtainBtn');
            var $otpInfo = $(this).find('.otp-info');
            var $otpCountdown = $(this).find('.otp-countdown');
            var $label = $(this).find('.control-label');
            var $errorPopup = $(this).find('.otp-error-for-popup');
            var $body = $('body');
            var $otpInput = $(this).find('.otp-input');
            var $otpLabel = $(this).find('#otp-label');

            var obj = $.extend(defaultVal, options);
            if (obj.otpType == '2') {
                $label.text('手机令牌码：');
                $obtainBtn.hide();
            } else {
                $label.text('手机动态码：');
                if (obj.dynamicType == '1' || obj.dynamicType == '2') {
                    $obtainBtn.text('短信获取');
                    $otpCountdown.html('<span id="sec"></span>秒后重发短信');
                } else if (obj.dynamicType == '3') {
                    $obtainBtn.text('语音获取');
                    $otpCountdown.html('<span id="sec"></span>秒后重新获取');
                } else {
                    $obtainBtn.hide();
                }
            }
            $otpInput.attr("name", obj.otpInputName);
            $otpInput.attr("id", obj.otpInputName);
            $otpLabel.attr("for", obj.otpInputName);
            if (obj.otpInputTabIndex) {
                $otpInput.attr("tabindex", obj.otpInputTabIndex);
            }


            <!--public Method-->
            var restBtn = function () {
                $obtainBtn.show();
                $otpCountdown.hide();
                if (!voiceInfoFlag) {
                    $otpInfo.hide();
                }
            }
            var otpErrorPopup = function (variables) {
                LufaxPopup.popup({
                    popupTitleName:"提示",
                    message:'由于您的动态码获取次数超过限制，您的手机将在' + (variables ? variables.lockHours : "") + '小时内无法获取动态码信息',
                    button:'<a class="btns btn_info confirmBtn" href="javascript:void(0);">确认</a>',
                    iconClass:'minusCircleIcon',
                    onConfirm:function () {
                        disableBtn();
                        disableInput();
                    },
                    onClose:function () {
                        disableBtn();
                        disableInput();
                    }
                });
            };
            var disableBtn = function () {
                $obtainBtn.addClass('disabled');
                $obtainBtn.prop("disabled", true);
            };
            var disableInput = function() {
                $otpInput.prop('disabled',true);
                $otpInput.val('');
            };
            var showErrorMsg = function (el, msg) {
                var $controlGroup = $(el).closest('.control-group');
                $controlGroup.find('.input-wrap').addClass('error');
                if (obj.otpScene == "popup") {
                    $controlGroup.find('.otp-error-for-popup').show();
                    $controlGroup.find('.otp-error-for-popup').html(msg);
                } else {
                    $controlGroup.find('.errorPanel').css('display', 'inline-block');
                    $controlGroup.find('.errorContent').html(msg);
                }
            }
            var clearErrorMsg = function (el) {
                var $controlGroup = $(el).closest('.control-group');
                $controlGroup.find('.input-wrap').removeClass('error');
                $controlGroup.find('.errorPanel').hide();
                $controlGroup.find('.otp-error-for-popup').hide();
            }
            var sendRequest = function () {
                var sendUrl = obj.otpRequestUrl;
                var sendParameters = obj.otpRequestParams;
                if (obj.dynamicType == "3") {
                    sendUrl = obj.otpVoiceRequestUrl ? obj.otpVoiceRequestUrl : sendUrl;
                    sendParameters = obj.otpVoiceRequestParams ? obj.otpVoiceRequestParams : sendParameters;
                }
                $.extend(sendParameters, obj.otpGetRequestParams());
                if (obj.otpRequestMethod == "GET") {
                    $.get(sendUrl, sendParameters, handleSendSmsOtpResponse);
                } else {
                    $.post(sendUrl, sendParameters, handleSendSmsOtpResponse);
                }
            }
            var handleSendSmsOtpResponse = function(data) {
                if (data.retCode === "000") {
                    countDown();
                } else if (data.retCode === "018") {
                    if (obj.otpScene == "popup") {
                        otp.showErrorMsgForPopup("1", data.retCode, data.retMap);
                        otp.disableOtp(data.retMap);
                    } else {
                        otp.showErrorMsg("1", data.retCode, data.retMap);
                        otp.disableOtp(data.retMap);
                    }
                } else if (data.retCode === "021") {
                    if (!obj.otpDisablePopupError) {
                        otpErrorPopup(data.retMap);
                        otp.disableOtp(data.retMap);
                    } else {
                        if (obj.otpScene == "popup") {
                            otp.showErrorMsgForPopup("1", data.retCode, data.retMap);
                        } else {
                            otp.showErrorMsg("1", data.retCode, data.retMap);
                        }
                        otp.disableSendOTPBtn();
                        otp.disableOtpInput();
                    }
                }
                if (typeof obj.otpRequestCallback == "function") {
                    obj.otpRequestCallback(data);
                }
            }
            var countDown = function() {
                $obtainBtn.hide();
                $otpCountdown.css('display', 'inline-block');
                if (obj.dynamicType == '2') {
                    $otpInfo.html('动态码已发送至您的手机' + obj.otpGetMobileNo() + '，请注意查收');
                } else if (obj.dynamicType == '3') {
                    $otpInfo.html('您的手机' + obj.otpGetMobileNo() + '将在' + obj.otpVoiceWaitTime + '内收到<br/><span>' + obj.otpOfficialCall + '</span> 的电话，请接听');
                } else if (obj.dynamicType == '1') {
                    $otpInfo.html('动态码已发送至您的手机' + obj.otpGetMobileNo() + '，收不到短信，请 <a href="javascript:void(0);" id="voiceObtainBtn">语音获取</a>');
                    //$("#voiceObtainBtn").bind("click", triggerVoiceObtainBtn);
                    $("body").off("click", '#voiceObtainBtn');
                    $("body").on("click", "#voiceObtainBtn", triggerVoiceObtainBtn);
                }
                $otpInfo.show();
                if (tool.countDown.options.countDownSeconds > 0) {
                    tool.countDown.options.countDownSeconds = parseInt(obj.otpCountDownSeconds);
                } else {
                    tool.countDown({
                        countDownSeconds:parseInt(obj.otpCountDownSeconds),
                        secondsOnly:true,
                        callback:restBtn
                    });
                }
            }
            var triggerVoiceObtainBtn =  function () {
                if (obj.otpClick && obj.otpClick()) {
                    clearErrorMsg(this);
                    var sendUrl = obj.otpRequestUrl;
                    var sendParameters = obj.otpRequestParams;
                    sendUrl = obj.otpVoiceRequestUrl ? obj.otpVoiceRequestUrl : sendUrl;
                    sendParameters = obj.otpVoiceRequestParams ? obj.otpVoiceRequestParams : sendParameters;
                    $.extend(sendParameters, obj.otpGetRequestParams());
                    if (obj.otpRequestMethod == "GET") {
                        $.get(sendUrl, sendParameters, handleSendVoiceOtpResponse);
                    } else {
                        $.post(sendUrl, sendParameters, handleSendVoiceOtpResponse);
                    }
                }
            };
            var voiceInfoFlag = false;
            var handleSendVoiceOtpResponse = function(data) {
                if (data.retCode === "000") {
                    countDown();
                    $otpInfo.html('您的手机' + obj.otpGetMobileNo() + '将在' + obj.otpVoiceWaitTime + '内收到<span>' + obj.otpOfficialCall + '</span>的电话，请接听');
                    voiceInfoFlag = true;
                    setTimeout(function () {
                        voiceInfoFlag = true;
                        $otpInfo.hide();
                    }, 10000);
                } else if (data.retCode === "018") {
                    if (obj.otpScene == "popup") {
                        otp.showErrorMsgForPopup("1", data.retCode, data.retMap);
                        otp.disableOtp(data.retMap);
                    } else {
                        otp.showErrorMsg("1", data.retCode, data.retMap);
                        otp.disableOtp(data.retMap);
                    }
                } else if (data.retCode === "021") {
                    if (!obj.otpDisablePopupError) {
                        otpErrorPopup(data.retMap);
                        otp.disableOtp(data.retMap);
                    } else {
                        if (obj.otpScene == "popup") {
                            otp.showErrorMsgForPopup("1", data.retCode, data.retMap);
                        } else {
                            otp.showErrorMsg("1", data.retCode, data.retMap);
                        }
                        otp.disableSendOTPBtn();
                        otp.disableOtpInput();
                    }
                }
                if (typeof obj.otpRequestCallback == "function") {
                    obj.otpRequestCallback(data);
                }
            }
            $("body").off("click", '#obtainBtn');
            $("body").on("click", '#obtainBtn', function () {
                if (obj.otpClick && obj.otpClick()) {
                    sendRequest();
                    clearErrorMsg(this);
                }
            });

            $(this).find('.otp-input').blur(function () {
                var pattern ;
                if (obj.otpType == "2") {
                    pattern = /^[0-9]{6}$/;
                } else {
                    pattern = /^[0-9]{7}$/;
                }
                var _len = $(this).val().length;
                if (_len === 0) {
                    showErrorMsg(this, '请填写');
                } else if(!pattern.test($(this).val())){
                    if (obj.otpType == "2") {
                        showErrorMsg(this, '令牌码为6位数字');
                    } else {
                        showErrorMsg(this, '动态码为7位数字');
                    }
                } else {
                    clearErrorMsg(this);
                }
                if (obj.otpBlur) obj.otpBlur();
            });
            $(this).find('.otp-input').focus(function () {
                clearErrorMsg(this);
                if (obj.otpFocus) obj.otpFocus();
            });
            if (obj.otpTrigger === true && obj.otpType != '2') {
                $obtainBtn.trigger('click');
            }
            if (obj.otpTrigger === false && obj.otpTriggerCountDown == true && obj.otpType != '2') {
                countDown();
            }


        });
    }
})(jQuery);
(function ($) {
    var otp;
    window.otp = otp = {};
    otp.errorCode = {
        "1" : {
            "011" : "动态码错误或过期",
            "012" : "动态码错误或过期",
            "009" : "系统异常",
            "018" : "由于您输错:errorTimes次动态码，已被锁定，请等待:lockSeconds秒",
            "010" : "由于您输错:errorTimes次动态码，已被锁定，请等待:lockSeconds秒",
            "014" : "动态码错误或过期",
            "021" : "由于您的动态码获取次数超过限制，您的手机将在:lockHours小时内无法获取动态码信息"

        },
        "2" : {
            "01" : ["令牌码错误", "令牌码错误，请确认您设备上的手机令牌显示的归属用户名与您的用户名是否一致"],
            "02" : "由于您:period内输错:maxFailCount次动态码，已被锁定，请等待:lockTime",
            "03" : "您已关闭手机令牌，请重新开始操作流程"
        }
    }
    otp.getValue = function () {
        var otpValue = $('.otp-input').val();
        return otpValue;
    };
    otp.showPlainErrorMsg = function(errorMsg) {
        var $controlGroup = $('.otp-group');
        $controlGroup.find('.input-wrap').addClass('error');
        if (!errorMsg || errorMsg.length <= 0) return;
        $controlGroup.find('.errorPanel').css('display', 'inline-block');
        $controlGroup.find('.errorContent').html(errorMsg);
        if (errorMsg.length > 20) {
            $controlGroup.find('.errorPanel').addClass("multipleLine");
        } else {
            $controlGroup.find('.errorPanel').removeClass("multipleLine");
        }
    };
    otp.showPlainErrorMsgForPopup = function(errorMsg) {
        var $controlGroup = $('.otp-group');
        $controlGroup.find('.input-wrap').addClass('error');
        if (!errorMsg || errorMsg.length <= 0) return;
        $controlGroup.find('.otp-error-for-popup').show();
        $controlGroup.find('.otp-error-for-popup').html(errorMsg);
        if (errorMsg.length > 20) {
            $controlGroup.find('.errorPanel').addClass("multipleLine");
        } else {
            $controlGroup.find('.errorPanel').removeClass("multipleLine");
        }
    };
    otp.showErrorMsg = function (otpType, errorCode, variables) {
        var $controlGroup = $('.otp-group');
        var msg = otp.parseErrorCode(otpType, errorCode, variables);
        $controlGroup.find('.input-wrap').addClass('error');
        if (!msg || msg.length <= 0) return;
        $controlGroup.find('.errorPanel').css('display', 'inline-block');
        $controlGroup.find('.errorContent').html(msg);
        if (msg.length > 20) {
            $controlGroup.find('.errorPanel').addClass("multipleLine");
        } else {
            $controlGroup.find('.errorPanel').removeClass("multipleLine");
        }
    };
    otp.showErrorMsgForPopup = function (otpType, errorCode, variables) {
        var $controlGroup = $('.otp-group');
        var msg = otp.parseErrorCode(otpType, errorCode, variables);
        $controlGroup.find('.input-wrap').addClass('error');
        if (!msg || msg.length <= 0) return;
        $controlGroup.find('.otp-error-for-popup').show();
        $controlGroup.find('.otp-error-for-popup').html(msg);
        if (msg.length > 20) {
            $controlGroup.find('.errorPanel').addClass("multipleLine");
        } else {
            $controlGroup.find('.errorPanel').removeClass("multipleLine");
        }
    };
    otp.clearErrorMsg = function () {
        var $controlGroup = $('.otp-group');
        $controlGroup.find('.input-wrap').removeClass('error');
        $controlGroup.find('.errorPanel').hide();
        $controlGroup.find('.otp-error-for-popup').hide();
    };

    otp.formatErrorMsg = function (errorMsg, parameters) {
        var extra = [];
        for (var param in parameters) {
            if (errorMsg.indexOf(param) >= 0) {
                extra.push(param + '=' + parameters[param]);
            }
        }

        var result = errorMsg.replace(/:(\w+)/g, function (substring, match) {
            var routeValue = parameters[match];
            if (!routeValue) {
                return match;
            }
            return routeValue;
        });
        return result;
    };

    otp.parseErrorCode = function(otpType, errorCode, variables) {
        var errorMsg;
        if (otpType == "2") {
            if (errorCode == "01") {
                if(!variables.failCount || variables.failCount < 3) {
                    errorMsg = otp.errorCode[otpType][errorCode][0];
                } else {
                    errorMsg = otp.errorCode[otpType][errorCode][1];
                }
            } else if (errorCode == "03") {
                otp.tokenErrorPopup(variables);
                return errorMsg;
            } else if (errorCode == "02") {
                otp.disableOtp(variables);
                errorMsg = otp.errorCode[otpType][errorCode];
            } else {
                errorMsg = otp.errorCode[otpType][errorCode];
            }
        } else {
            if (errorCode == "018" || errorCode == "010") {
                otp.disableOtp(variables);
            }
            errorMsg = otp.errorCode[otpType][errorCode];
        }
        errorMsg = errorMsg ? otp.formatErrorMsg(errorMsg, variables) : errorCode;
        return errorMsg;
    };
    otp.tokenErrorPopup = function (variables) {
        LufaxPopup.popup({
            popupTitleName:"提示",
            message:'您已关闭手机令牌，请重新开始操作流程',
            button:'<a class="btns btn_info confirmBtn" href="javascript:void(0);">确认</a>',
            iconClass:'minusCircleIcon',
            onConfirm:function () {
                window.location.reload();
            },
            onClose:function () {
                window.location.reload();
            }
        });
    };
    otp.disableSendOTPBtn = function() {
        $("#obtainBtn").addClass('disabled');
        $("#voiceObtainBtn").addClass('disabled');
        $("#obtainBtn").prop("disabled", true);
        $("#voiceObtainBtn").prop('disabled', true);
        tool.countDown.options.countDownSeconds = 0;
    };

    otp.disableOtpInput = function() {
        $(".otp-input").prop('disabled',true);
        $(".otp-input").val('');
        $('.otp-group').find('.input-wrap').removeClass('error');
    };

    otp.enableSendOTPBtn = function() {
        $("#obtainBtn").removeClass('disabled');
        $("#obtainBtn").removeProp("disabled");
        $("#voiceObtainBtn").removeClass("disabled");
        $("#voiceObtainBtn").removeProp('disabled');
    };

    otp.enableOtpInput = function() {
        $(".otp-input").prop("disabled",false);
    };

    otp.disableOtp = function(variables) {
        var lockSeconds = variables.lockSeconds;
        otp.disableSendOTPBtn();
        otp.disableOtpInput();
        setTimeout(function() {
            otp.enableSendOTPBtn();
            otp.enableOtpInput();
            otp.clearErrorMsg();
        }, lockSeconds * 1000)
    };

    otp.checkOtp = function(otpType, value, popup) {
        var pattern ;
        if (otpType == "2") {
            pattern = /^[0-9]{6}$/;
        } else {
            pattern = /^[0-9]{7}$/;
        }
        var _len = value ? value.length : 0;
        var result = false;
        var errorMsg = "";
        if (_len === 0) {
            errorMsg = '请填写';
        } else if(!pattern.test(value)){
            if (otpType == "2") {
                errorMsg = '令牌码为6位数字';
            } else {
                errorMsg = '动态码为7位数字';
            }
        } else {
            result = true;
            otp.clearErrorMsg();
        }
        if (!result) {
            if (popup == "popup") {
                otp.showPlainErrorMsgForPopup(errorMsg);
            } else {
                otp.showPlainErrorMsg(errorMsg);
            }
        }
        return result;
    }

})(jQuery);