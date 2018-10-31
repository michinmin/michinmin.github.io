$(function(){
	//모바일, 데스크탑구분
	var filter = "win16|win32|win64|mac|macintel";
	if( navigator.platform ){
		if( filter.indexOf(navigator.platform.toLowerCase())<0 ){
			//alert("device")
		} else {
			$('#fullpage').fullpage({
				anchors: ['firstPage', 'secondPage', '3rdPage'],
				navigation: true,
				menu: '#menu',
				slidesNavigation: false,
				verticalCentered: false,
				licenseKey:"OPEN-SOURCE-GPLV3-LICENSE",
				// scrollOverflow: true,
				// scrollOverflowReset: true,
				// scrollOverflowResetKey: 'YWx2YXJvdHJpZ28uY29tXzlRaGMyTnliMnhzVDNabGNtWnNiM2RTWlhObGRBPT14Ykk='
				// afterResize: 
				// css3:true,
				// scrollBar: true,
				// scrollOverflow: true,
				// autoScrolling:true,
				// scrollHorizontally: true
		
				/*afterLoad: function(origin, destination, direction){
					//section 2
					if(destination.index == 1){
						document.querySelector('.skillbox').querySelector('img').style.opacity = 1;
						document.querySelector('#section2').querySelector('p').style.opacity = 1;
					}
			
					//back to original state
					else if(origin && origin.index == 1){
						document.querySelector('.skillbox').querySelector('img').style.opacity = 0;
						document.querySelector('#section2').querySelector('p').style.opacity = 0;
					}
			
					//section 3 is using the state classes to fire the animation
					//see the CSS code above!
				}*/
			});
		}
	}
	/* 맨위로 */
	/*$(document).on('scroll', function(){
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
	});*/

	/* 탭메뉴 */
	/*$('.tabmenu').each(function(){
		$('.tabmenu > li').on('click', function(){
			$(this).addClass('on').siblings().removeClass('on');
			return false;
		})
	})*/

	/* 반응형 폰트 */
	/*function autoFont(){
		$(".rp").css('font-size', Math.max(Math.min($(".rp").width() / (1.1 * 14))));
	}*/

	$(window).resize(function(){
		//autoFont();
	}).trigger('resize');

	/* 슬릭 슬라이드 */
	$('.slickslide').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
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
	list_addclass();
	skillHover();
});

function list_addclass(){
	$('.skill_list li').each(function(i, e){
		var i = ++i;
		console.log(i);
		$(e).addClass('skill_item');
	});
};
function skillHover(){
	var skillbtn = $('.skillbox').find('>div.item');
	var skillList = $('.skill_list').find('>li');
	skillbtn.hover(function(e){
		e.preventDefault();
		var idx = $(this).index() - 1;
		$(this).addClass('act').siblings().removeClass('act');
		$('.skill_list li').eq(idx).addClass('act').siblings().removeClass('act');
	});
};