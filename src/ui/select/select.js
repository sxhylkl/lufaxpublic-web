/**
 * Created by huangjunyan873 on 12/23/14.
 */
!function (window) {

    var classes = {
        lufaxUiSelect: '.lufax-ui-select',
        inputWrap: '.input-wrap',
        selectInput: '.input',
        selectOptionWrap: '.select-option',
        focusForm: 'focus-form',
        selectOptionEl: '.select-option li a'
    };

    function Select($container, options) {
        var me = this;
        me.container = $container;
        me.defaultValue = '';
        me.defaultOptions = [];
        me.callback = null;
        me.options = options || {};
        $.extend(me, me.options);
    }

    Select.prototype = {
        template: '<div class="lufax-ui-select">' +
            '<span class="input-wrap">' +
            '<b></b>' +
            '<input type="text" class="input" value="!${defaultValue}" readonly/>' +
            '</span>' +
            '<ul class="select-option">' +
            '!${defaultOptions}' +
            '</ul>' +
            '</div>',

        init: function () {
            var me = this,
                defaultValue = me.defaultValue,
                defaultOptions = me.defaultOptions,
                callback = me.callback,
                result = '',
                container = me.container;
            for (var i = 0; i < defaultOptions.length; i++) {
                result = result + '<li><a href="javascript:void(0);">' + defaultOptions[i] + '</a></li>';
            }
            container.html(me.template.replace("!${defaultValue}", defaultValue).replace("!${defaultOptions}", result));
            $(classes.lufaxUiSelect).find(classes.selectInput).click(function () {
                me.show(this);
            });
            $(document).click(function (e) {
                me.hide(e);
            });
            $(classes.lufaxUiSelect).on('click', classes.selectOptionEl, function () {
                me.select(this);
                callback && callback();

            });
        },
        show: function (me) {
            var $lufaxUiSelect = $(me).closest(classes.lufaxUiSelect),
                _optionHeight = $(me).closest(classes.lufaxUiSelect).find(classes.selectOptionWrap).height(),
                _containerTop = $(me).offset().top,
                _width = $lufaxUiSelect.find(classes.inputWrap).width() - 2;
            $lufaxUiSelect.find(classes.selectOptionWrap).css('width', _width);
            if (document.body.scrollHeight - _containerTop < _optionHeight) {
                this._setTop(me);
            } else {
                this._restTop(me);
            }
            $lufaxUiSelect.find(classes.inputWrap).addClass(classes.focusForm).end().find(classes.selectOptionWrap).toggle();
        },

        hide: function (e) {
            var es = $(e.target).parents(classes.lufaxUiSelect);
            $(classes.lufaxUiSelect).not(es).find(classes.inputWrap).removeClass(classes.focusForm).end().find(classes.selectOptionWrap).hide();
        },
        select: function (me) {
            var val = $(me).text();
            $(me).closest(classes.lufaxUiSelect).find(classes.selectInput).val(val).end().find(classes.inputWrap).removeClass(classes.focusForm).end().find(classes.selectOptionWrap).hide();
        },
        getVal: function () {
            var me = this,
                container = me.container,
                val = container.find(classes.selectInput).val();
            return val;
        },
        _setTop: function (me) {
            $(me).closest(classes.lufaxUiSelect).find(classes.selectOptionWrap).css('bottom', '37px');
        },
        _restTop: function (me) {
            $(me).closest(classes.lufaxUiSelect).find(classes.selectOptionWrap).css('bottom', 'auto');
        }
    };

    lufax.ui.select = Select;

}(this);
