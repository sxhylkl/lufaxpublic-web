$(function(){
	$(".form_text").not(".pwd,.cal").each(function(){
		var ft = $(this);
		$(this).find("input").width(ft.width() - ft.find(".icon").width() - ft.find(".last").width() - 10);
	});

    $(".form_textarea").each(function(){
        $(this).find("textarea").width($(this).width() - 6).height($(this).height() - 6);
    }).find("textarea").focus(function(){
            $(this).parents(".form_textarea").addClass("form_textarea_focus");
        }).blur(function(){
            $(this).parents(".form_textarea").removeClass("form_textarea_focus");
        })
		/* textarea js add by vincent 2012-10-10*/
	$(".input, .textarea").focusin(function(){
		$(this).addClass("focus");
	});
	$(".input, .textarea").focusout(function(){
		$(this).removeClass("focus");
	});
	
	$(".form_text").find(":text,:password").focus(function(){
		$(this).parents(".form_text").addClass("text_focus");
	}).blur(function(){
		$(this).parents(".form_text").removeClass("text_focus");
	})

	$(".form_checkbox").each(function(){
		$(this).prepend	("<a></a>")
	})

	$(".form_checkbox>a").live('click',function(){
		$(this).toggleClass("checked").next(":checkbox").trigger('click');
		if($(this).hasClass("checked")){
			$(this).siblings("input").attr("checked",true);
		}else{
			$(this).siblings("input").attr("checked",false);
		}
	})

	$(".form_radio").each(function(){
		$(this).prepend	("<a></a>")
	})

	$(".form_radio").click(function(){
		$(this).children("a").addClass("checked").next(":radio").attr("checked",true)
		.parent().siblings(".form_radio").find("a").removeClass("checked").next(":radio").attr("checked",false);
	})

	$(".form_select").each(function(){
		var selected = "";
		selected = ($(this).find("option:selected").length == 0)?$(this).find("option:selected"):$(this).find("option:first")
		$(this).prepend("<div><span><a>"+ selected.val() +"</a></span></div><ul></ul>");
		for(i=0;i<$(this).find("option").length;i++){
			$(this).find("ul").append("<li><a href='#@'>"+ $(this).find("option").eq(i).val() +"</a></li>");
		}
		$(this).find("ul").width($(this).width());
	})

	$(".form_select>div").live('click',function(){
		$(this).next("ul").toggle();
	})
	$(".form_select>ul>li").live('click',function(){
		$(this).parent().next().children("option").eq( $(".form_select>ul>li").index($(this)) ).attr("selected","selected")
			.siblings().removeAttr("selected");
		$(this).parent().prev().find("a").text($(this).text());
		$(this).parent("ul").hide();
	})

	$(document).click(function(e){
		var es = $(e.target).parents(".form_select");
		$(".form_select").not(es).find("ul").hide();
	})

	$(".prompting .leftarrow,.prompting .greyarrow").each(function(){
		$(this).find(".left_border").height($(this).height() - $(this).find(".left_top_corner").height() - $(this).find(".left_bottom_corner").height()).children("span").height($(this).find(".left_border").height());
		$(this).find(".right_border").height($(this).height() - $(this).find(".right_top_corner").height() - $(this).find(".right_bottom_corner").height())
			.children("span").height($(this).find(".right_border").height());
		if($(this).hasClass("leftarrow")){$(this).find(".prompting_main").height($(this).height() - 2)}
		else{$(this).find(".prompting_main").height($(this).height())}
	})

	$(".prompting .leftarrowgold").each(function(){
		$(this).find(".left_border").height($(this).height() - $(this).find(".left_top_corner").height() - $(this).find(".left_bottom_corner").height()).children("span").height($(this).find(".left_border").height());
		$(this).find(".right_border").height($(this).height() - $(this).find(".right_top_corner").height() - $(this).find(".right_bottom_corner").height())
			.children("span").height($(this).find(".right_border").height());
		if($(this).hasClass("leftarrowgold")){$(this).find(".prompting_main").height($(this).height() - 2)}
		else{$(this).find(".prompting_main").height($(this).height())}
	})

	$(".prompting .toprightarrow,.prompting .topleftarrow").each(function(){
		$(this).find(".top_center").width($(this).width() - $(this).find(".top_left_corner").width() - $(this).find(".top_right_corner").width());
		$(this).find(".bottom_center").width($(this).width() - $(this).find(".bottom_left_corner").width() - $(this).find(".bottom_right_corner").width());
	})

    $(".form_search").find(":text").focus(function(){
        $(this).parents(".form_search").addClass("focus");
    }).blur(function(){
        $(this).parents(".form_search").removeClass("focus");
     })
})