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
        $('.tabmenu > li').on('click', function(){
            $(this).addClass('on').siblings().removeClass('on');
            return false;
        })
    });
    /* bxslider */
    $('.vslider').bxSlider({
        mode: 'horizontal',
        infiniteLoop: true,
        speed: 500,
        slideMargin: 0,
        startSlide: 0,
        pager: false,
        pagerType: 'full',
        controls: true,
        nextText: 'Next',
        prevText: 'Prev',
        autoControls: true,
        startText: 'Start',
        stopText: 'Stop',
        autoControlsCombine: true,
        auto: true,
        pause: 4000,
    });
    $('.pslider').bxSlider({
        mode: 'horizontal',
        infiniteLoop: true,
        speed: 500,
        slideMargin: 0,
        startSlide: 0,
        pager: false,
        pagerType: 'full',
        controls: true,
        nextText: 'Next',
        prevText: 'Prev',
        autoControls: true,
        startText: 'Start',
        stopText: 'Stop',
        autoControlsCombine: true,
        auto: true,
        pause: 4000,
    });
    $('.fslider').bxSlider({
        mode: 'horizontal',
        infiniteLoop: true,
        speed: 500,
        slideMargin: 10,
        startSlide: 0,
        pager: false,
        pagerType: 'full',
        controls: true,
        nextText: 'Next',
        prevText: 'Prev',
        autoControls: true,
        startText: 'Start',
        stopText: 'Stop',
        autoControlsCombine: true,
        auto: true,
        pause: 4000,
        minSlides: 1,
        maxSlides: 4,
        moveSlides: 1,
        slideWidth: 240,
    });

});