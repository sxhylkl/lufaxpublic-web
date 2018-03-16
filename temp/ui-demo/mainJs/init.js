
function submitForm(){
	var isValid = $('#myform').validator({triggerOnSubmit:false}).validator('check');
	$('.tips').hide();
	if(isValid){
		$('#myform').submit();
	}
	else {
		return isValid;
	}
}

$('#shoujimatip').hide();
$('#btn').click(function(){
	$('#shoujimatip').show();
	
})
$(document).ready(function(){
	$('#sidemenu ul li a').click(function(){
		$('#sidemenu li.current').removeClass('current');
		$(this).parent().addClass('current');
	})
	var browseAddress=location.href;
	$('#sidemenu ul li a').each(function(){
		var href=$(this).attr('href');
		if(browseAddress.indexOf(href)>-1){
			$('#sidemenu li.current').removeClass('current');
			$(this).parent().addClass('current');
		}
	});
	/*foot select box*/
	$(".select_box input").click(function(){
	var thisinput=$(this);
	var thisul=$(this).parent().find("ul");
	if(thisul.css("display")=="none"){
	if(thisul.height()>200){thisul.css({height:"200"+"px","overflow-y":"scroll" })};
	thisul.fadeIn("1");
	thisul.click(function(){},function(){thisul.fadeOut("1");})
	thisul.find("li").click(function(){thisinput.val($(this).text());thisul.fadeOut("1");}).hover(function(){$(this).addClass("hover");},function(){$(this).removeClass("hover");});
	}
	else{
	thisul.fadeOut("fast");
	}
	})
	$("#submit").click(function(){
	var endinfo="";
	$(".select_box input:text").each(function(i){
	endinfo=endinfo+(i+1)+":"+$(this).val()+";\n";
	})
	});
	/*foot select box*/
	/*index login input box*/
	$(".login_input .login_text").focus(function(){
			$(this).removeClass("login_text").addClass("login_text_hover");						  
		})
		$(".login_input .login_text").blur(function(){
			$(this).removeClass("login_text_hover").addClass("login_text");	
		})
	$(".login_input .dynamicCode_text").focus(function(){
			$(this).removeClass("dynamicCode_text").addClass("dynamicCode_text_hover");						  
		})
		$(".login_input .dynamicCode_text").blur(function(){
			$(this).removeClass("dynamicCode_text_hover").addClass("dynamicCode_text");	
		})
	/*index login input box*/
	/*login input box*/
	$(".input_div").find("input").focus(function(){
			$(this).parent().removeClass("input_div").addClass("input_div_hover");						  
		})
		$(".input_div").find("input").blur(function(){
			$(this).parent().removeClass("input_div_hover").addClass("input_div");
		})
	$(".input_dCode_div").find("input").focus(function(){
			$(this).parent().removeClass("input_div").addClass("input_dCode_div_hover");						  
		})
		$(".input_dCode_div").find("input").blur(function(){
			$(this).parent().removeClass("input_dCode_div_hover").addClass("input_div");
		})
	/*login input box*/
	
	$("#head-content .invest,#head-content .invest_selected").hover(function(){
			$(this).parent().find(".investChance").show();
			$(this).addClass("invest_hover");
	},function(){
			$(this).parent().find(".investChance").hide();
			$(this).removeClass("invest_hover");
	})
	
	$("#logo-content .investChance .anyidai").hover(function(){$(this).addClass("anyidai_hover"); $(this).find("a").css("color","#E6551D");
	},function(){$(this).removeClass("anyidai_hover"); $(this).find("a").css("color","#2A2A2A");})
	$("#logo-content .investChance .anxin").hover(function(){$(this).addClass("anxin_hover"); $(this).find("a").css("color","#E6551D");
	},function(){$(this).removeClass("anxin_hover"); $(this).find("a").css("color","#2A2A2A");})
	
	$("#acount_dropdown").hover(function(){$("#ma_dropDown_wrap").css({left:$(this).offset().left-1,top:$(this).offset().top - 9}).addClass("vis")},function(){$("#ma_dropDown_wrap").removeClass("vis");})
	$("#acount_dropdown .m_normal,#acount_dropdown .m_last,#acount_dropdown .m_first").hover(function(){$(this).addClass("m_hover")},function(){$(this).removeClass("m_hover");})
	$("#acount_dropdown").hover(function(){$("#ma_dropDown_nologin_wrap").css("left",$(this).offset().left-1).show();},function(){$("#ma_dropDown_nologin_wrap")/*.hide()*/})
	
	$(".main_nav_wrap>li.downArrow").hover(function(){
            $(this).find("a").addClass("hover").next().show();
        },function(){
            $(this).find("a").removeClass("hover").next().hide();
        })
        $(".dorpdownContent a").hover(function(){
            $(this).addClass("secHover");
        },function(){
            $(this).removeClass("secHover");
        })

        $(".focus>ul>li").mousemove(function(){
            $(".focus>ul>li").find(".btn_1,.btn_2").css({visibility:'visible'});
        })
})