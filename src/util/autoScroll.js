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