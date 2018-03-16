$(function(){
    $(".select-box").click(function () {
        $(this).find('.select-box-list').fadeIn();
        $(this).mouseleave(function () {
            $(this).find('.select-box-list').fadeOut();
        });
    });
})