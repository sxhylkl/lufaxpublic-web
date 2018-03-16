/* 
	validate
	by Vincent W
	2012-8-29
	此组件非发布版，只用作样式效果的演示
	验证规则不完善，不能用于真实数据校验
 */
/* validator rulls 
	className: 操作句柄，必须是input的class
	validType：进行何种数据验证
				目前可以验证的有：email、userName、password、userIDCard
				
	Lufax_Email_Exist ：后台接口
	*/
function validate_w(className,validType){
	$(className).focusin(function(){
		reset($(this));
	});
	$(className).focusout(function(){
		var inputVal = $.trim($(this).val());
		inputValidator($(this),validType,inputVal);
		/* $(this).get(0).addEventListener($(this),function(){
			console.log(validType);
		},false); */
	});
	var inputValidator = function(_this,_validType,_inputVal){
		var _className = _this.attr("class");
		var _errMsg = _className+"_errMsg";
		var _previous = _className+"_previous";
		if(_validType == "email"){emailValidate(_inputVal);}
		if(_validType == "userName"){userNameValidate(_inputVal);}
		if(_validType == "password"){console.log("pass word coming");}
		if(_validType == "userIDCard"){userIDCardValidate(_inputVal);}
		/* email validate rulls */
		function emailValidate(_emailVal){
			var reg = "^(([0-9a-zA-Z]+)|([0-9a-zA-Z]+[_.0-9a-zA-Z-]*[0-9a-zA-Z-]+))@([a-zA-Z0-9-]+[.])+([a-zA-Z]|net|NET|asia|ASIA|com|COM|gov|GOV|mil|MIL|org|ORG|edu|EDU|int|INT|cn|CN|cc|CC)$";
			if(_emailVal.length<1){
				var emptyTip = "请填写常用邮箱。";
				showTip(emptyTip);
			}else if(_emailVal=="Lufax_Email_Exist"){
				var errTip = "该邮箱地址已被使用，请使用其他邮箱地址认证。";
				showTip(errTip);
			}else if(!_emailVal.match(reg)){
				var errTip = "邮箱地址格式错误。";
				showTip(errTip);
			}else{
				removeStyle(_this);
			}
		}
		/* name validate */
		function userNameValidate(_userName){
			if(_userName.length<1){
				var errTip = "用户名不能为空";
				showTip(errTip);
			}else{
				removeStyle(_this);
			}
		}
		/* user ID card number validate */
		function userIDCardValidate(_userIDCard){
			if(_userIDCard.length<1){
				var errTip = "身份证号码不能为空";
				showTip(errTip);
			}else{
				removeStyle(_this);
				return "true";
			}
		}
		/* show error tip */
		function showTip(tips){
			$("."+_errMsg).stop(true,true).show(200);
			$("."+_previous).stop(true,true).remove();
			$("."+_errMsg).children().find(".msgPanel").empty().append(tips);
			addStyle(_this);
		}
		/* add or remove input style */
		function addStyle(_this){
			$(_this).parent().parent().parent(".form_text").addClass("jtext_focus");
		}
		function removeStyle(_this){
			$(_this).parent().parent().parent(".form_text").removeClass("jtext_focus");
		}
	}
	/* all rules correct, hide error tip panel */
	var reset = function(_this){
		var _className = _this.attr("class");
		var _errMsg = _className+"_errMsg";
		$("."+_errMsg).stop(true,true).hide(0);
	}
}