/**
 * name: form component
 * depends: jquery
 * require: form.css , form_icon_ullh.png form_input.png input_icon.png
 * author: wangdongqiang
 * date: 2014/08/21
 */

/**
 *功能：form 组件化
 *@method form
 */
!function(){
    var form = {
        init:function(){
            var me = this;

            me.init_checkbox(".form-checkbox");
            me.init_radio(".form-radio");


            //    old style
            $(".form_text").not(".pwd,.cal").each(function () {
                var ft = $(this);
                $(this).find("input").width(ft.width() - ft.find(".icon").width() - ft.find(".last").width() - 10);
            });

            $(".form_textarea").each(function () {
                $(this).find("textarea").width($(this).width() - 6).height($(this).height() - 6);
            }).find("textarea").focus(function () {
                $(this).parents(".form_textarea").addClass("form_textarea_focus");
            }).blur(function () {
                $(this).parents(".form_textarea").removeClass("form_textarea_focus");
            });
            $(".form_text").find(":text,:password").focus(function () {
                $(this).parents(".form_text").addClass("text_focus");
            }).blur(function () {
                $(this).parents(".form_text").removeClass("text_focus");
            });
            $(".prompting .leftarrow,.prompting .greyarrow").each(function () {
                $(this).find(".left_border").height($(this).height() - $(this).find(".left_top_corner").height() - $(this).find(".left_bottom_corner").height()).children("span").height($(this).find(".left_border").height());
                $(this).find(".right_border").height($(this).height() - $(this).find(".right_top_corner").height() - $(this).find(".right_bottom_corner").height())
                    .children("span").height($(this).find(".right_border").height());
                if ($(this).hasClass("leftarrow")) {
                    $(this).find(".prompting_main").height($(this).height() - 2)
                }
                else {
                    $(this).find(".prompting_main").height($(this).height())
                }
            });

            $(".prompting .leftarrowgold").each(function () {
                $(this).find(".left_border").height($(this).height() - $(this).find(".left_top_corner").height() - $(this).find(".left_bottom_corner").height()).children("span").height($(this).find(".left_border").height());
                $(this).find(".right_border").height($(this).height() - $(this).find(".right_top_corner").height() - $(this).find(".right_bottom_corner").height())
                    .children("span").height($(this).find(".right_border").height());
                if ($(this).hasClass("leftarrowgold")) {
                    $(this).find(".prompting_main").height($(this).height() - 2)
                }
                else {
                    $(this).find(".prompting_main").height($(this).height())
                }
            });

            $(".prompting .toprightarrow,.prompting .topleftarrow").each(function () {
                $(this).find(".top_center").width($(this).width() - $(this).find(".top_left_corner").width() - $(this).find(".top_right_corner").width());
                $(this).find(".bottom_center").width($(this).width() - $(this).find(".bottom_left_corner").width() - $(this).find(".bottom_right_corner").width());
            });

            $(".form_search").find(":text").focus(function () {
                $(this).parents(".form_search").addClass("focus");
            }).blur(function () {
                $(this).parents(".form_search").removeClass("focus");
            });


            var zIndex = 1;
            $('.form_select>div,.form_select>span').live('click', function () {
                var me = $(this);
                me.next("ul").toggle();
                $('.form_select').css({'z-index': 0});
                me.parent(".form_select").css({'z-index': 1});

                me.parent().addClass("focus-form");
                /*初始select同步*/
                me.next("ul").find("li").each(function () {
                    if (me.find("a").attr("data-value") == me.find("a").attr("data-value")) {
                        me.find("a").addClass("select");
                    }
                });
            });
            $(".form_select>ul>li").live('click', function () {
                $(this).parent().next().children("option").eq($(this).parent().children("li").index($(this))).prop("selected", true);
                var $selectedDisplay = $(this).parent().prev().find("a");
                $selectedDisplay.text($(this).text());
                $selectedDisplay.attr('data-value', $(this).find('a').attr('data-value'));

                /*select状态切换*/
                $(this).each(function () {
                    $(this).parent().find("a").removeClass("select");
                })
                $(this).find("a").addClass("select");
                $(this).parent("ul").hide();
            });
            $(document).click(function (e) {
                var es = $(e.target).parents(".form_select");
                $(".form_select").not(es).removeClass('focus-form').find("ul").hide();
            });

            $('.inputs , .textareas, .input-wrap .input , .input-wrap .textarea').live({
                focus: function () {
                    $(this).parent().addClass('focus-form');
                },
                blur: function () {
                    $(this).parent().removeClass('focus-form');
                }
            });

            me.selectShow();
        },

        init_checkbox : function (el) {
            var me = this;
            $(el).each(function () {
                me.checkboxHandler(this, "init");
            });
        },
        init_radio : function (el) {
            var me = this;
            $(el).each(function () {
                me.radioHandler(this, "init");
            });
        },

        checkboxHandler : function (el, init) {
            var args = {
                check_el: $(el).find(':checkbox'),
                init: init || ""
            }

            if (args.init.length > 0) {
                if(args.check_el.attr("checked") === "checked" || args.check_el.attr("disabled") === "disabled"){
                    return;
                }else{
                    args.check_el.prop("checked", false);
                    args.check_el.attr("checked", false);
                }
            }
        },

        radioHandler : function (el, init) {
            var args = {
                check_el: $(el).find(':radio'),
                init: init || ""
            }
            if (args.init.length > 0) {
                if(args.check_el.attr("checked") === "checked" || args.check_el.attr("disabled") === "disabled"){
                    return false;
                }else{
                    args.check_el.prop("checked", false);
                    args.check_el.attr("checked", false);
                }
            }
        },

        selectShow : function () {
            $(".form_select").each(function () {
                var selected = "";
                if ($(this).hasClass("show_last")) {
                    selected = ($(this).find("option:[isDefault]").length == 0) ? $(this).find("option:last") : $(this).find("option:[isDefault]");
                } else {
                    selected = ($(this).find("option:selected").length > 0) ? $(this).find("option:selected") : $(this).find("option:first");
                }

                if ($(this).find('a').length > 0) {
                    if ($(this).find('a').text() == '') {
                        $(this).find('a').text(selected.text());
                        for (i = 0; i < $(this).find("option").length; i++) {
                            $(this).find("ul").append("<li><a href='javascript:void(0)' title='" + $(this).find('option').eq(i).text() + "'>" + $(this).find("option").eq(i).text() + "</a></li>");
                        }
                    }
                } else {
                    if ($(this).hasClass("ullh")) {
                        $(this).prepend("<div><a class='selected-display' data-value=" + selected.val() + ">" + selected.text() + "</a></div><ul></ul>");
                    } else {
                        $(this).prepend("<div><span><a class='selected-display' data-value=" + selected.val() + ">" + selected.text() + "</a></span></div><ul></ul>");
                    }
                    for (i = 0; i < $(this).find("option").length; i++) {
                        var me_val = $(this).find('option').eq(i).val(),
                            me_title = $(this).find('option').eq(i).text();
                        $(this).find("ul").append("<li><a href='javascript:void(0)' title=" + me_title + " data-value=" + me_val + ">" + me_title + "</a></li>");
                    }
                }


                if ($(this).hasClass("ullh")) {
                    $(this).find("ul").css({left: 3, width: $(this).children("div").outerWidth() - 8});
                } else {
                    $(this).find("ul").width($(this).width() - 2);
                }
            })
        }
    }

    lufax.ui.form = form;
    lufax.form = lufax.ui.form;
}(this);

$(function () {
    lufax.form.init();
});