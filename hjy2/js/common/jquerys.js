$(document).ready(function(){
	/* 슬릭 슬라이드 */
	$('.slickslide').slick({
		dots: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		arrows: true,
		centerPadding: '0',
		responsive: [{
			breakpoint: 1400,
			settings:{
				centerPadding: '0px',
				slidesToShow: 3
				}
			},
			{
			breakpoint: 1040,
				settings: {
				centerMode: true,
				centerPadding: '0px',
				slidesToShow: 2
				}
			},
			{
			breakpoint: 691,
				settings: {
				arrows: true,
				centerMode: true,
				centerPadding: '0px',
				slidesToShow: 1
				}
			}
		]
	});
	// masonry
	var $grid = $('.grid').imagesLoaded( function() {
		// init Masonry after all images have loaded
		$grid.masonry({
		  // options...
		});
	});

	// 맨위로버튼 생성
	$(function() {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 200) {
                $('.top_btn').fadeIn();
            } else {
                $('.top_btn').fadeOut();
            }
        });
        
        $('.top_btn').click(function(){
            $('html, body').animate({
                scrollTop : 0
            }, 100);
            return false;
        });
    });

	skillHover();
});

function skillHover(){
	var shover = $('.skill').find('li');
	shover.each(function(){
		$(this).on("mouseover focusin",function(){
			$(this).removeClass('on');
			$(this).addClass('on');
		}).on("mouseleave focusout",function(){
			shover.removeClass('on');
			return false;
		})
	});
}

