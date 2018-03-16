/* textarea js */
$(function(){
	$(".input, .textarea").focusin(function(){
		$(this).addClass("focus");
	});
	$(".input, .textarea").focusout(function(){
		$(this).removeClass("focus");
	});
});
/*call pop panel*/
$.popup = function(popClass){
	var wwidth = $(window).width();
	var wheight = $(window).height();
	var pop_width = $(popClass).outerWidth();
	var pop_height = $(popClass).outerHeight();
	$.blockUI({
			 message: $(popClass),
			 css: {
				 top: (wheight - pop_height)/2 + 'px',
				 left: (wwidth - pop_width)/2 + 'px',
				 textAlign: 'left',
				 width: pop_width,
				 height: pop_height
			}
		});
}
/**/
$(function(){
    $(".ui_grid_yellow_sort th.sort a,.ui_grid_gray th a").click(function(){
        if(!$(this).hasClass("asc")){
            $(this).addClass("asc").addClass("selected").parent().siblings().find("a").removeClass("selected").removeClass("asc");
        }else{
            $(this).removeClass("asc");
        }
    })
});

/*change num to Chinese cash style*/
$.cashTranslate = function(cashNum,chCash){
	$(cashNum).keyup(function(){
		$(chCash).empty().append(DX($(cashNum).val()));
	});
}
function DX(n) { //金额大写转换函数
	if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
		return "请输入数字";
	var unit = "千百拾亿千百拾万千百拾元角分", str = "";
	n += "00";
	var p = n.indexOf('.');
	if (p >= 0)
		n = n.substring(0, p) + n.substr(p+1, 2);
	unit = unit.substr(unit.length - n.length);
	for (var i=0; i < n.length; i++)
		str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
	return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
}

/* for bankcard page
	choose bank
*/
$.chooseBank = function(handler,responseMsg,responseBtn){
	/*diffrent bank show diffrent tips*/
	var tipsArr = new Array("2~3工作日","1~2天","1~2天","1~2天","1~2天","1~2天","1~2天","1~2天");
	$(responseMsg).addClass("hidden");
	$(handler).click(function(){
		var bankIndex = ($(this).parent(".form_radio").index())/2;
		var tipText = '因涉及委托跨行汇款业务，需<label class="orange_word">'+tipsArr[bankIndex]+'</label>完成认证';
		$(responseMsg).find(".bankTip").empty().append(tipText);
		$(responseMsg).removeClass("hidden");
		$(responseBtn).removeClass("disGraBtn_8027").addClass("orgBtn_8126");
	});
}