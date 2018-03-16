/**
 * depends: jquery,block.ui.js
 * author: huangjunyan
 * date: 2014/8/12
 */
!function (window) {
    /**
     * @class popup
     * @constructor popup
     */
    function popup() {
    }

    popup.prototype = {
        simplePopupTemplate: '<div class="modal-dialog timeout_safe_exit ${imgClass}">' +
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

        blankTemplate: '<div class="modal-dialog popup_wrap blankPopup">${content}</div>',


        newIconPopupTemplate: '<div class="modal-dialog popup_wrap">' +
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

        newIconPopupSubtitleTemplate: '<div class="modal-dialog popup_wrap popup_wrap_subtitle ${privateClass}">' +
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

        richPopupTemplate: '<div class="modal-dialog popup_wrap commission_wrap ${privateClass}">' +
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
            '</div>',

        _getConfirmButtonSelector: function () {
            var me = this;
            return me._getButtonSelector("confirmBtn");
        },

        _getCancelButtonSelector: function () {
            var me = this;
            return me._getButtonSelector("cancleBtn");
        },

        _getCloseButtonSelector: function () {
            var me = this;
            return me._getButtonSelector("close");
        },

        _getButtonSelector: function (buttonClass) {
            return "." + buttonClass;
        },
        _close: function () {
            $.unblockUI();
        },

        _closableBinding: function (func) {
            var me = this;
            return function () {
                me._close();
                if (func) {
                    func();
                }
            }
        },
        _formatMessage: function (template, args) {
            if (!args) return template;
            return template.replace(/\$\{(.+?)\}/g, function (m, i) {
                return args[i];
            });
        },

        _openPopupWindow: function (options) {
            var me = this;
            if (options.onClose != undefined) {
                LufaxPopup.options = options;
            }
            $.blockUI({
                message: $(me._formatMessage(options.template, options.args))
            });
            me._setPopupPosition();
            $(me._getCloseButtonSelector()).die("click");
            $(me._getCloseButtonSelector()).live("click", me._closableBinding(options.onCancel));
            if (!options.bindings)  return;
            $.each(options.bindings, function (index, binding) {
                $(binding.selector).die("click");
                $(binding.selector).live("click", binding.func);
            });
        },

        _setPopupPosition: function () {
            var wwidth = $(window).width();
            var wheight = $(window).height();
            var pop_width = $(".modal-dialog:last").outerWidth();
            var pop_height = $(".modal-dialog:last").outerHeight();
            if (pop_width && pop_height) {
                $(".blockMsg").css("top", (wheight - pop_height) / 2 + 'px').css("left", (wwidth - pop_width) / 2 + 'px');
            }
        },
        simplePopup: function (options) {
            var me = this;
            var defaultOptions = {};
            var simplePopupOptions = $.extend("", defaultOptions, options);
            me._openPopupWindow({
                    template: me.simplePopupTemplate,
                    args: {
                        imgClass: simplePopupOptions.imgClass,
                        title: simplePopupOptions.title,
                        content: simplePopupOptions.content,
                        button: simplePopupOptions.button
                    },
                    bindings: [
                        {selector: me._getConfirmButtonSelector(), func: me._closableBinding(simplePopupOptions.onConfirm)},
                        {selector: me._getCancelButtonSelector(), func: me._closableBinding(simplePopupOptions.onCancel)}
                    ]
                }
            );
        },

        blankPopup: function (options) {
            this.options = options;
            var me = this;
            me._openPopupWindow({
                    template: me.blankTemplate,
                    args: {
                        content: options.content || ""
                    },
                    bindings: [
                        {selector: me._getConfirmButtonSelector(), func: me._closableBinding(options.onConfirm)},
                        {selector: me._getCloseButtonSelector(), func: me._closableBinding(options.onClose)},
                        {selector: me._getCancelButtonSelector(), func: me._closableBinding(options.onCancel)}
                    ]
                }
            );
        },

        richPopup: function (options) {
            var me = this;
            var defaultOptions = {};
            var richPopupOptions = $.extend("", defaultOptions, options);
            me._openPopupWindow({
                    template: me.richPopupTemplate,
                    args: {
                        privateClass: richPopupOptions.privateClass,
                        title: richPopupOptions.title,
                        content: richPopupOptions.content,
                        foot: richPopupOptions.foot
                    },
                    bindings: [
                        {selector: me._getCancelButtonSelector(), func: me._closableBinding(richPopupOptions.onCancel)}
                    ]
                }
            );
        },


        newIconPopup: function (options) {
            var me = this;
            this.options = options;
            me._openPopupWindow({
                    template: me.newIconPopupTemplate,
                    args: {
                        popupTitleName: options.popupTitleName || "",
                        iconClass: options.iconClass,
                        message: me._formatMessage(options.message, options.args) || options,
                        button: options.button,
                        closeDisplay: options.closeDisplay == 'false' ? '' : '<div class="close"><a class="modal-close" href="javascript:void(0);"></a></div>'
                    },
                    css: options.css,
                    bindings: ([
                        {selector: me._getConfirmButtonSelector(), func: me._closableBinding(options.onConfirm)},
                        {selector: me._getCloseButtonSelector(), func: me._closableBinding(options.onClose)},
                        {selector: me._getCancelButtonSelector(), func: me._closableBinding(options.onCancel)}
                    ])
                }
            );
        },

        newIconPopupSubTitle: function (options) {
            var me = this;
            this.options = options;
            me._openPopupWindow({
                    template: me.newIconPopupSubtitleTemplate,
                    args: {
                        privateClass: options.privateClass,
                        popupTitleName: options.popupTitleName || "",
                        iconClass: options.iconClass,
                        subTitle: me._formatMessage(options.subTitle, options.args) || options,
                        contents: me._formatMessage(options.contents, options.args) || options,
                        button: options.button,
                        closeDisplay: options.closeDisplay == 'false' ? '' : '<div class="close"><a class="modal-close" href="javascript:void(0);"></a></div>'
                    },
                    css: options.css,
                    bindings: ([
                        {selector: me._getConfirmButtonSelector(), func: me._closableBinding(options.onConfirm)},
                        {selector: me._getCloseButtonSelector(), func: me._closableBinding(options.onClose)},
                        {selector: me._getCancelButtonSelector(), func: me._closableBinding(options.onCancel)}
                    ])
                }
            );
        }

    }
    lufax.ui.popup = popup;
    lufax.ui.popup = new popup();
    lufax.popup = lufax.ui.popup;
}(this);