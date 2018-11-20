(function ($) { 
	$(document).ready(function () {
		//모바일, 데스크탑구분
		var filter = "win16|win32|win64|mac|macintel";
		if( navigator.platform ){
			if( filter.indexOf(navigator.platform.toLowerCase())<0 ){
				//alert("device")
				$('.titbox').wrap("<div class='tbl-cell' />");
				$(".gnb li").each(function (i) { 
					$(this).find('a').click(function () { 
						var pos = $("#section" + i + "").offset();
						$('body').stop().animate({ scrollTop: pos.top }, 500);
					})
				})
				var totalH = 0;
				var hSet = $('.section');
				hSet.each(function(){
					totalH = totalH + $(this).height();
					// alert($(this).height());
				})
				$('.container').css({'height':totalH});
			} else {
				//alert("desktop")
				/* fullpage option */
				var myFullpage = new fullpage('#fullpage', {
					anchors: ['home', 'skill', 'portfolio'],
					navigation: true,
					menu: '#menu',
					slidesNavigation: false,
					verticalCentered: true,
					// normalScrollElements: '.skill, .portfolio',
					scrollOverflow: true,
					licenseKey: "OPEN-SOURCE-GPLV3-LICENSE",
					paddingBottom: '60px',
					afterLoad: function(origin, destination, direction){
						if(destination.index == 1){
							$('.home h1').removeClass('focus-in-contract');
							$('.home p').removeClass('text-focus-in');
						}
						else if(origin && origin.index == 1){
							$('.home h1').addClass('focus-in-contract');
							$('.home p').addClass('text-focus-in');
						}
						if(destination.index == 1){
							document.querySelector('.img_women').style.opacity = 1;
						}
				
						//back to original state
						else if(origin && origin.index == 1){
							document.querySelector('.img_women').style.opacity = 0;
						}
					},
					onLeave: null,
					afterRender: function(){
						var pluginContainer = this;
						//alert("The resulting DOM structure is ready");
					},
					afterResize: function(width, height){
						var fullpageContainer = this;
						//alert("The sections have finished resizing");
					},
					afterResponsive: function(isResponsive){
						//alert("Is responsive: " + isResponsive);
					}
				});
			}
		}

		/* 위로가기 버튼 class추가/삭제로 스크롤시 보이고 안보이는 부분 처리 옵션 */
		var scTop = function () { 
			if ($(window).scrollTop() > 500) {
				$('.sctopbtn').addClass('show');
			} else {
				$('.sctopbtn').removeClass('show');
			}
		}
		/* 위로가기나 버튼 클릭시 스크롤 위치가 상단으로 가는 부분 처리 옵션 */
		var topAnimate = function () {
			$('html,body').animate({
				scrollTop: 0
			}, 500);
			return false;
		}
		/* class on 추가/삭제 */
		var addRemove = function () {
			$(this).addClass('on').siblings().removeClass('on');
			return false;
		}
		/* 아이콘 버튼 클릭시 nav에 class 추가/삭제 처리 옵션 */
		var menuBtnToggle = function () { 
			$('.nav').toggleClass('checked')
		}

		$('#menu').clone(true).appendTo($('.menuclone')); //우측 dotmenu 부분 클릭하면 오류버그가 생겨 기존에 상단 네비게이션을 복제하여 dotmenu 위치에 올려서 클릭함
		$('.menu-open-button').on('click', menuBtnToggle); // 아이콘 버튼을 클릭시 class추가 / 삭제

		/* 맨위로 */
		/*$(document).on('scroll', scTop);
		$('.sctopbtn').on('click', topAnimate);*/

		/* 탭메뉴 */
		/*$('.tabmenu').each(function(){
			$('.tabmenu > li').on('click', addRemove)
		})*/

		/* 반응형 폰트 */
		/*function autoFont(){
			$(".rp").css('font-size', Math.max(Math.min($(".rp").width() / (1.1 * 14))));
		}*/

		/* 슬릭 슬라이드 */
		$('.slickslide').slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			arrows: true,
			centerMode: true,
			centerPadding: '0',
			responsive: [{
				breakpoint: 1440,
				settings:{
					// centerPadding: '0',
					slidesToShow: 3
				}
			},
			{
				breakpoint: 1024,
				settings: {
					// centerPadding: '0',
					slidesToShow: 2
				}
			},
			{
				breakpoint: 768,
				settings: {
					// centerPadding: '0',
					slidesToShow: 1
				}
			}]
		});

		$(window).on('load resize', function(){
			//autoFont();
		}).trigger('load resize');

		list_addclass();
		skillHover();
	});

	function list_addclass(){
		$('.skill_list li').each(function(i, e){
			var i = ++i;
			//console.log(i);
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
			skillList.eq(idx).addClass('act').siblings().removeClass('act');
		});
	};
	
})(jQuery);