$(function(){


    /* 맨위로 */
    $(document).on('scroll', function(){
        if ($(window).scrollTop() > 500) {
            $('.sctopbtn').addClass('show');
        } else {
            $('.sctopbtn').removeClass('show');
        }
    });
    $('.sctopbtn').on('click', function () {
        $('html,body').animate({
            scrollTop: 0
        }, 500);
        return false;
    });

    /* 탭메뉴 */
    $('.tabmenu').each(function(){
        $('.tabmenu > ul > li').on('click', function(){
            $(this).addClass('on').siblings().removeClass('on');
            return false;
        })
    })




});