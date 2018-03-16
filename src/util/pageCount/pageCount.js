/**
 * depends: jquery
 * author: huangjunyan
 * date: 2014/9/10
 */
!function (window) {
    /**
     * @class pageCount
     * @constructor pageCount
     */

    var pageCount = {
        init: function (totalCount, currentPage, pageLimit, pageWrap) {
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
    }

    lufax.util.pageCount = pageCount;
    lufax.pageCount = lufax.util.pageCount;
}(this);