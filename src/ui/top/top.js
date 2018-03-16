/**
 * goTopWithQuest 组件
 * author wangyaqiong
 * 功能: goto top功能 plus 问卷以及留言等
 */
!function() { 
    /**
     * @class GoTop
     *
     */
    function GoTop(options) {
        var me = this;
        var defaultOptions = {
            // 可传入特定的对象绑定gototop事件，若无，使用默认对象
            handler: null,
            duration: 500,
            pageHeight: 400,
            showHire: false,
            showMessage: true,
            showHelp: true,
            showQuestion: true,
            showCalc: false,
            //相对元素
            relatedEl: null,
            //提问链接
            help_link: "http://www." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/help/help_search.html",
            //问卷链接
            link: "http://www." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/survey/big-list/index.html",
            //留言链接
            messageLink: "http://www." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/help/help_service_feedback.html",
            //计算器链接
            calcLink: "http://www." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/tools/calculator.html",
           
            hireLink: 'http://promo.' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + '/activity-pages/job-20150213/index.html'
        };
        me.topOptions = $.extend(defaultOptions, options);
        if (me.topOptions.handler) {
            me.initOldTop();
        }
        me.init();
    }

    GoTop.prototype.init = function() {
        var me = this;
        me._initStructure();
        me._initStatus();
        me._initEvents();
    }

    GoTop.prototype._initStructure = function() {
        var topOptions = this.topOptions;
        var helpTpl = '<a href="$"  target="_blank" class="help top-block">';
        helpTpl +=      '<span class="help-icon-con"><span class="help-icon">&nbsp</span></span>';
        helpTpl +=      '<span class="text">提问</span>';
        helpTpl +=    '</a>';

        var questionTpl = '<a href="$"  target="_blank" class="qustionnaire top-block">';
        questionTpl +=      '<span class="qustionnaire-icon-con"><span class="quest-icon">&nbsp</span></span>';
        questionTpl +=      '<span class="text">问卷</span>';
        questionTpl +=    '</a>';

        var messageTpl = '<a href="$"  target="_blank" class="message top-block">';
        messageTpl +=      '<span class="message-icon-con"><span class="message-icon">&nbsp</span></span>';
        messageTpl +=      '<span class="text">反馈</span>';
        messageTpl +=    '</a>';

        var topTpl = '<div class="top">';
        topTpl +=      '<div class="top-icon-con"><span class="top-icon">&nbsp</span></div>';
        topTpl +=      '<span class="text">顶部</span>';
        topTpl +=    '</div>';

        var calcTpl = '<a href="$"  target="_blank" class="calc top-block">';
        calcTpl +=      '<span class="calc-icon"></span>';
        calcTpl +=    '</a>';

        var hireTpl = '<a href="$"  target="_blank" class="hire top-block">';
        hireTpl +=      '<div class="hire-icon-con"><span class="hire-icon">&nbsp</span></div>';
        hireTpl +=      '<span class="text">招聘</span>';
        hireTpl +=    '</a>';

        var containerTpl = '<div class="top-question-container">';
        if (topOptions.showCalc) {
            containerTpl += calcTpl;
        }
        if (topOptions.showHelp) {
            containerTpl += helpTpl;
        }
        if (topOptions.showHire) {
            containerTpl += hireTpl;
        }
        if (topOptions.showQuestion) {
            containerTpl += questionTpl;
        }
        if (topOptions.showMessage) {
            containerTpl += messageTpl;
        }

        containerTpl += topTpl;
        containerTpl +=    '</div>';

        $('body').append(containerTpl);
    }

    GoTop.prototype._initStatus = function() {
        var topOptions = this.topOptions;
        $('.top-question-container .help').attr('href', topOptions.help_link);
        $('.top-question-container .qustionnaire').attr('href', topOptions.link);

        $('.top-question-container .message').attr('href', topOptions.messageLink);
        $('.top-question-container .calc').attr('href', topOptions.calcLink);
        $('.top-question-container .hire').attr('href', topOptions.hireLink);

        if ($(window).scrollTop() > topOptions.pageHeight) {
            $('.top-question-container .top').fadeIn('slow');
        }
        var height = 0;
        if (topOptions.showMessage) {
            height += $('.top-question-container .message').outerHeight(true);
        }
        if (topOptions.showHelp) {
            height += $('.top-question-container .help').outerHeight(true);
        }
        if (topOptions.showQuestion) {
            height += $('.top-question-container .qustionnaire').outerHeight(true);
        }
        if (topOptions.showCalc) {
            height += $('.top-question-container .calc').outerHeight(true);
        }
        if (topOptions.showHire) {
            height += $('.top-question-container .hire').outerHeight(true);
        }

        height += $('.top-question-container .top').outerHeight(true);
        $('.top-question-container').css('height', height + 'px');
        //this.setPosition();   
    }

    GoTop.prototype._initEvents = function() {
        var me = this;
        var topOptions = this.topOptions;
        $('.top-question-container .top').on('click', function () {

            $(this).click(function(){
                $('html,body').stop(true,true);
            })
            $('html,body').animate({scrollTop:0}, topOptions.duration);
        });

        $('.top-question-container .top').hover(function (){
            $(this).addClass('hover');
            $('.top-question-container .top-icon').addClass('top-icon-hover');
        }, 
        function (){
            $(this).removeClass('hover');
            $('.top-question-container .top-icon').removeClass('top-icon-hover');
        });

        $('.top-question-container .help').hover(function (){
            $(this).addClass('hover');
            $('.top-question-container .help-icon').addClass('help-icon-hover');
        },
        function (){
            $(this).removeClass('hover');
            $('.top-question-container .help-icon').removeClass('help-icon-hover');
        });

        $('.top-question-container .qustionnaire').hover(function (){
            $(this).addClass('hover');
            $('.top-question-container .quest-icon').addClass('quest-icon-hover');
        }, 
        function (){
            $(this).removeClass('hover');
            $('.top-question-container .quest-icon').removeClass('quest-icon-hover');
        });

        $('.top-question-container .message').hover(function (){
            $(this).addClass('hover');
            $('.top-question-container .message-icon').addClass('message-icon-hover');
        }, 
        function (){
            $(this).removeClass('hover');
            $('.top-question-container .message-icon').removeClass('message-icon-hover');
        });

        $('.top-question-container .hire').hover(function (){
                $(this).addClass('hover');
                $('.top-question-container .hire-icon').addClass('hire-icon-hover');
            },
            function (){
                $(this).removeClass('hover');
                $('.top-question-container .hire-icon').removeClass('hire-icon-hover');
            });

        $('.top-question-container .calc').hover(function (){
            $(this).addClass('hover');
            $('.top-question-container .calc-icon').addClass('calc-icon-hover');
            $('.calc-icon').html('收益<br>计算器');
        },
        function (){
            $(this).removeClass('hover');
            $('.top-question-container .calc-icon').removeClass('calc-icon-hover');
            $('.calc-icon').html('');
        });

        $(window).scroll(function () {
            if ($(window).scrollTop() > topOptions.pageHeight) {
                $('.top-question-container .top').fadeIn('slow');
            }
            else {
                $('.top-question-container .top').fadeOut('slow');   
            }
        });

        // modify positions with window resize
        /*var startTime = null;
        var delta = 20;
        var timeout = false;

        $(window).resize(function (){
            startTime = new Date();
            if (!timeout) {
                timeout = true;
                setTimeout(modifyPosition, delta);
            }
        });

        function modifyPosition() {
            var currentTime = new Date();
            if (currentTime - startTime < delta) {
                setTimeout(modifyPosition, delta);
            }
            else {
                timeout = false;
                me.setPosition();
            }
        }*/
    }

    GoTop.prototype.setPosition = function() {
        var relatedEl = this.topOptions.relatedEl;
        if (relatedEl) {
            if (typeof relatedEl == 'string') {
                relatedEl = $(relatedEl);
            }
            var offset = relatedEl.offset();
            var offsetLeft = offset.left;
            var outWidth = relatedEl.outerWidth();
            var mainRightDis = ($(window).width() - outWidth)/2;
            var topRight = 0;
            var topWidth = $('.top-question-container').outerWidth();

            if (mainRightDis > 80) {
                topRight = mainRightDis - 40 - topWidth;
            }
            else {
                topRight = 10;
            }
            $('.top-question-container').css('right', topRight);
        }
    }

    GoTop.prototype.initOldTop = function() {
        var me = this;
        var handler = this.topOptions.handler;

        return handler.each(function () {
            $(window).scroll(function () {
                goTop(handler);
            });
            $(this).on('click', function () {
                $('html,body').animate({scrollTop:0}, me.topOptions.duration);
            });
        });

        function goTop(handler) {
            var parentWidth = 0;
            topOptions.border ? 
                parentWidth = $(handler).parent().outerWidth() - 1 
                : parentWidth = $(handler).parent().outerWidth();
            $(handler).parent().attr("style", "position:relative;");
            $(handler).attr("style", "margin-left:" + parentWidth + "px;");
            if ($(window).scrollTop() > 300) {
                $(handler).stop(true, true).show();
            }
        }
    }

    lufax.ui.GoTop = GoTop;
}();