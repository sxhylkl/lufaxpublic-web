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