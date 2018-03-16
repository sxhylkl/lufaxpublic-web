/**
 * name: number step component
 * depends: jquery
 * require: numberstep.css , com-step-wrap.png
 * author: wangdongqiang
 * date: 2014/03/05
 */

/**
 *功能：合并模板和数据，append到页面&lt;ul class="targetDom"&gt;&lt;/ul&gt;上
 *@method numberstep
 *@param {Object} obj
 *@param {Int} totlewidth：总像素宽度，默认值是父级宽度
 *@param {String} state：step状态，有三种状态：'',active,finish
 *@param {String} title：step标题
 *@param {Int} num：step序号
 *@param {proper fraction真分数} subStep：active状态时支持子步骤，如1/2
 *@example $(targetDom).numberstep({totlewidth : 960, args : [{state:"active", title:"填写金额", num:1}]});
 */

$.fn.numberstep = (function(options){
    /**
     * @class numberstep
     * @constructor numberstep
     */
    /*default data*/
    var defaultVal = {
        totlewidth : options.totlewidth || $(this).parent().outerWidth(),
        args : options.args || [{state:"active",title:"Init",num:"1"}]
    };

    /*html template*/
    var StepTemp = '<li class="steps $state$" style="width: $stepsWidth$px">' +
        '<div class="step-content"><p class="step-title">$title$</p><p class="step-num">$num$</p></div>' +
        '<p class="progress-line" style="width: $LineBgWidth$px"><span style="width: $LineWidth$px">&nbsp;</span></p>' +
        '</li>';
    var LastStepTemp = '' +
        '<li class="steps last-child $state$">' +
        '<div class="step-content"><p class="step-title">$title$</p><p class="step-num">$num$</p></div>' +
        '</li>';

    var obj = $.extend(defaultVal, options);

    var stepsNum = obj.args.length;

    return this.each(function () {
        var stepWrapDom = '';

        /*merge template and data*/
        for(var i=0;i<stepsNum-1;i++){
            stepWrapDom += merge(StepTemp,i);
        }
        stepWrapDom += merge(LastStepTemp,i);

        /*set style*/
        $(this).addClass("com-step-wrap clearfix")
               .css({width : obj.totlewidth})
               .append(stepWrapDom);
    });

    /*合并模板和数据，append到页面上*/
    function merge(_temp,_i){
        var StepContentWidth = 120;
        var LineIndent = 33;
        var liWidth = ((obj.totlewidth - StepContentWidth) / (stepsNum - 1)).toFixed(2) - 0.01;
        var lineBgWidth = (liWidth - LineIndent).toFixed(2);
        var lineWidth = 0;

        if(obj.args[_i].state == "active"){
            lineWidth = obj.args[_i].subStep ? lineBgWidth*obj.args[_i].subStep.toFixed(2) : lineBgWidth;
        }


        var merge_temp = _temp.replace("$state$",obj.args[_i].state)
            .replace("$title$",obj.args[_i].title)
            .replace("$num$",obj.args[_i].num)
            .replace("$stepsWidth$",liWidth)
            .replace("$LineBgWidth$",lineBgWidth)
            .replace("$LineWidth$",lineWidth);

        return merge_temp;
    }
});
