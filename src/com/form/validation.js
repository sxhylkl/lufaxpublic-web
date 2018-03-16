function Validation() {
}

Validation.prototype.isEmpty = function(str) {
    if (str === 0) {
        return false;
    }
    return !str || str.length == 0;
};

Validation.prototype.isRate = function(str) {
    return str == null || str == "" || (Number(str) > 0 && /^\d+(\.\d{1,2})?$/.test(str));
};

Validation.prototype.isDigit = function(str) {
    return /^[0-9]*$/.test(str);
};

var validation = new Validation();


//
var MESSAGES = {
    "num.required":"必须为数字"
};

function ValidationExecutor(messageList) {
    this.messageList = $.extend({}, MESSAGES, messageList);
    this.validationList = [];
    this.errors = [];
    this.config = {
        targetElement : null
    };
}

ValidationExecutor.prototype.bindValidators = function (options) {
    var thisExecutor = this;
    this.validationList.push({
        dom : options.dom,
        validators : options.validators,
        targetDom : options.tagDom,
        validateAll: function() {
            var self = this;
            var result = true;
            var parseMessage = function(validator) {
                return thisExecutor.messageList[validator.errorCode];
            };
            $.each(self.validators, function(index, validator) {
                if (!validator.run()) {

                    thisExecutor.errors.push({
                        "dom" : self.dom,
                        "tagDom" : self.targetDom,
                        "message":parseMessage(validator)
                    });
                    result = false;
                    return result
                }
            });

            return result;
        }
    });
};

ValidationExecutor.prototype.validate = function() {
    this.clearErrors();
    var self = this;
    var isAllPassed = true;
    $.each(self.validationList, function(index, value) {
        if (!value.validateAll()) {
            isAllPassed = false;
        }
    });
    return isAllPassed;
};

ValidationExecutor.prototype.showErrors = function(options) {
    var self = this;

    $.extend(self.config, options);

    if (!self.config.targetElement) {

        $.each(self.errors, function(index, value) {
            var preTip = value.tagDom.siblings(".previousTipMsg");
            function hidePreTip() {
                preTip.hide();
            }

            hidePreTip();
            value.tagDom.html('<i class="icon minusCircleIcon"></i>');
            value.tagDom.append('<span class="content">'+value.message+'</span>');
            value.tagDom.show();
        });
    } else {
        var dom = self.config.targetElement;
        dom.html("");
        if (this.errors.length <= 0) {
            return;
        }
        var errorsHtml = "<ul>";

        $.each(self.errors, function(index, value) {
            errorsHtml += '<li>' + value.message + '</li>';
        });

        errorsHtml += "</ul>";
        dom.html(errorsHtml);
        dom.show();
    }
};

ValidationExecutor.prototype.getErrors = function() {
    return this.errors;
};

ValidationExecutor.prototype.clearErrors = function() {
    var self = this;
    if (!self.config.targetElement) {
        $.each(self.errors, function(index, value) {
            value.tagDom.html('<i class="icon minusCircleIcon"></i>');
            value.tagDom.hide();
        });
    } else {
        self.config.targetElement.html('<i class="icon minusCircleIcon"></i>');
        self.config.targetElement.hide();
    }
    this.errors = [];
};

// validators
//var MandatoryValidator = function(element, id) {
//    this.element = element;
//    this.id = id;
//};
//
//MandatoryValidator.prototype.run = function() {
//    var self = this;
//    if (validation.isEmpty($(self.element).val())) {
//        switch (this.id) {
//            case "un_username":
//                this.errorCode = "name.required";
//                break;
//            case "un_phoneNum":
//                this.errorCode = "mobile.required";
//                break;
//        }
//        return false;
//    }
//    return true;
//};

var MandatoryValidator = function(element, id) {
    this.element = element;
    this.id = id;
    this.errorCode = this.id+".required";
};

MandatoryValidator.prototype.run = function() {
    var self = this;
    var content = $(self.element).val();
    return !(validation.isEmpty(content));
};
var isNumValidator = function (element) {
    this.errorCode = "num.required";
    this.element = element;
};
isNumValidator.prototype.run = function () {
    var self = this;
    var isNum = $(self.element).val();
    return validation.isDigit(isNum);
};

