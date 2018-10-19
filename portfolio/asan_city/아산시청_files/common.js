
		// Zoom
		var Browser = {
			a: navigator.userAgent.toLowerCase()
		}

		Browser = {
			ie: /*@cc_on true || @*/ false,
			ie6: Browser.a.indexOf('msie 6') != -1,
			ie7: Browser.a.indexOf('msie 7') != -1,
			ie8: Browser.a.indexOf('msie 8') != -1,
			opera: !!window.opera,
			safari: Browser.a.indexOf('safari') != -1,
			safari3: Browser.a.indexOf('applewebkit/5') != -1,
			mac: Browser.a.indexOf('mac') != -1,
			chrome: Browser.a.indexOf('chrome') != -1,
			firefox: Browser.a.indexOf('firefox') != -1
		}

		// 기본 Zoom
		var nowZoom = 100;
		// 최대 Zoom
		var maxZoom = 200;
		// 최소 Zoom
		var minZoom = 80;

		// 화면크기 확대
		var jsBrowseSizeUp = function() {

			if (Browser.chrome) {
				if (nowZoom < maxZoom) {
					nowZoom += 10; // 10 = 25%씩 증가
					document.body.style.zoom = nowZoom + "%";
				} else {
					alert('최대 확대입니다.');
				}
			} else if (Browser.opera) {
				alert('오페라는 화면크기 기능을 지원하지 않습니다.\n브라우저 내의 확대/축소 기능을 이용하시기 바랍니다.');
			} else if (Browser.safari || Browser.safari3 || Browser.mac) {
				alert('사파리, 맥은 화면크기 기능을 지원하지 않습니다.\n브라우저 내의 확대/축소 기능을 이용하시기 바랍니다.');
			} else if (Browser.firefox) {
				alert('파이어폭스는 화면크기 기능을 지원하지 않습니다.\n브라우저 내의 확대/축소 기능을 이용하시기 바랍니다.');
			} else {
				if (nowZoom < maxZoom) {
					nowZoom += 10; //10 = 25%씩 증가
					document.body.style.position = "relative";
					document.body.style.zoom = nowZoom + "%";
				} else {
					alert('최대 확대입니다.');
				}
			}
		};

		// 화면크기 축소
		var jsBrowseSizeDown = function() {

			if (Browser.chrome) {
				if (nowZoom < maxZoom) {
					nowZoom -= 10; // 10 = 25%씩 증가
					document.body.style.zoom = nowZoom + "%";
				} else {
					alert('최대 확대입니다.');
				}
			} else if (Browser.opera) {
				alert('오페라는 화면크기 기능을 지원하지 않습니다.\n브라우저 내의 확대/축소 기능을 이용하시기 바랍니다.');
			} else if (Browser.safari || Browser.safari3 || Browser.mac) {
				alert('사파리, 맥은 화면크기 기능을 지원하지 않습니다.\n브라우저 내의 확대/축소 기능을 이용하시기 바랍니다.');
			} else if (Browser.firefox) {
				alert('파이어폭스는 화면크기 기능을 지원하지 않습니다.\n브라우저 내의 확대/축소 기능을 이용하시기 바랍니다.');
			} else {
				if (nowZoom < maxZoom) {
					nowZoom -= 10; //10 = 25%씩 증가
					document.body.style.position = "relative";
					document.body.style.zoom = nowZoom + "%";
				} else {
					alert('최대 확대입니다.');
				}
			}
		};

		// 화면크기 원래대로(100%)
		var jsBrowseSizeDefault = function() {
			nowZoom = 100;
			document.body.style.zoom = nowZoom + "%";
		};


$(document).ready(function(){
	// 아산시청, 아산일자리, 문화관광 탭
	$('.topmenu div.bg').each(function(){
		$(this).text( $(this).parent().text() );
	});
	$('.topmenu li').on('mouseover focus', function(){
		$('.topmenu li').removeClass('on');
		$(this).addClass('on');
	});
	$('.topmenu li').on('mouseleave', function(){
		$('.topmenu li').removeClass('on');
		$('.topmenu li.this').addClass('on');
	});


	$('.top_wrap').on('mouseleave', function(){
		$('.lang_sel_wrap').hide();
	});


	// 주메뉴
	$('#gnb > li > a.d0').on('click mouseenter focus',function() {
		$('#gnb > li').removeClass('on');
		$(this).parent('li').addClass('on');  
	});

	$('#gnb div.bg').each(function(){
		$(this).text( $(this).parent().text() );
	});

	$('#gnb > li').on('mouseleave', function(){
		$(this).removeClass('on');
	});

	// 하단 메뉴
	$('.fgo_list a').on('click ', function(){
		var fnum = $('.fgo_list a').index(this);
		if($(this).hasClass('on')){
            $('.fgo_menu_wrap').eq(fnum).slideUp();
			$(this).removeClass('on');
//			$('.fgo_menu_wrap').hide();
		}else{
			$('.fgo_list a').removeClass('on');
			$('.fgo_menu_wrap').hide();
			$(this).addClass('on');
			$('.fgo_menu_wrap').eq(fnum).slideDown();
		}
		return false;
	});
	/*
	$('.fgo_wrap').on('mouseleave', function(){
		$('.fgo_list a').removeClass('on');
		$('.fgo_menu_wrap').hide();
	});
	*/

	var main_as_news_chk = true;

	var news_slider = $('.news_rolling').bxSlider({
		auto: true,
		mode: 'vertical',
		pager: false,
		controls: false,
		autoControls: false,
		speed:1200
	});
	$('.news_control li a').eq(0).on('click', function(){
		news_slider.goToPrevSlide();
		return false;
	});
	$('.news_control li a').eq(1).on('click', function(){
		news_slider.goToNextSlide();
		return false;
	});


    // 위로 스크롤
	$('.aroTop').click(function() {
		$('body,html').animate({scrollTop:0},500);
	});

    var sbslidebar = $('.sb-slidebar');

   // 메뉴 오픈
	$('.btn_menu').on('click', function () {
		if(sbslidebar.hasClass('sb-active')) { // 오픈되어 있으면 닫아라
			  sbslidebar.removeClass('sb-active');
              sbslidebar.css('margin-left', 0);
			  return;
		}

	    sbslidebar.addClass('sb-active');
   //     $('.pc').animate({ left: '-100%' }, 500);
	      sbslidebar.css('left', '100%');
	      sbslidebar.css('margin-left', sbslidebar.width() * -1);
    });


    // 메뉴 오픈
	$('.menu_open').on('click', function () {
	    sbslidebar.addClass('sb-active');
		sbslidebar.stop().animate({left: '0%'});
    });

    
	$('.sb-close').on('click', function () {  
   	 if( $(window).width()>=900 ) {
		sbslidebar.css('left','100%');
        sbslidebar.removeClass('sb-active');

	 } else { 
		sbslidebar.stop().animate({ left: '100%'},300,function() {
			  sbslidebar.removeClass('sb-active');
		});
	 }
	    sbslidebar.css('margin-left', 0);
	});


    // 메뉴속도가 너무 느림 직접 구축
      $(".has-children>a").click(function(){
            var submenu = $(this).next("ul");
 
            // submenu 가 화면상에 보일때는 위로 보드랍게 접고 아니면 아래로 보드랍게 펼치기
            if( submenu.is(":visible") ){
                submenu.slideUp();
            }else{
                submenu.slideDown();
            }
      });


	//하단스크립트//TOGGLE
	$('.btnToggle').click(function() {
		var collapse_content_selector = $(this).attr('href');
		var toggle_switch = $(this);
		$(collapse_content_selector).slideToggle(350, function() {
			if ($(this).css('display') == 'none') {
				toggle_switch.removeClass('close');

			} else {
				toggle_switch.addClass('close');
			}
		});
		return false;
	});


	//서브 왼쪽 사이드메뉴
	$(".ng06 li>a").bind("click",function(){
	  	if($(this).siblings('ul').length > 0){
	  		$(this).parent().siblings().removeClass('on');
			$(this).parent().addClass('on');
			return false;
		}else{
			return true;
		}
	});

	$(".ng06 .sub li>a").bind("click",function(){
		if($(this).siblings('ul').length > 0){
			$(this).parent().siblings().removeClass('on');
			$(this).parent().siblings().find('.depth li>a').addClass('on');
			return false;
		}else{
			return true;
		}
	});

   // 모바일 검색
	  $(".m_srch_btn").click(function()
	   {  
		if ($(".topSearch").css('display') == 'block')
		{ // 보이는 상태이면 숨김
		  if($('div.m_header').hasClass('gnb_fixed')) {		  
			$(".m_header").animate(
			{
						height: '50px'
			});
		  } else {
			$(".m_header").animate(
			{
						height: '70px'
			});
		  }
		}
		else
		{
			$(".m_header").animate(
			{
				height: '130px'
		   })
		}
		$(".topSearch").toggle();
	  });

   $div_m_header = $('div.m_header');
   // scroll 기능 추가 
   $(window).on('scroll', $.throttle(1000 / 5, function () {

	 /* 스크롤시 메뉴 고정하기 */
	 if($(this).scrollTop() > 180)
	 {
		$('a.aroTop').fadeIn();	
	 } else if($(this).scrollTop() < 180) {

	  $('a.aroTop').fadeOut();
	 }
	 
     }));


    // resize 기능 추가
    $(window).on('resize', $.throttle(1000 / 1, function () { //  수정 화면크기에 맞게 한번만 슬라이딩 세팅값 변형
      if( $(this).width()>=900 )  $('.sb-slidebar').removeClass('sb-active');
    }));
				/*
                try {
                    $('.searchinput').autocompleter({ minLength: 2, limit: 10, source: '/sites/all/themes/asan/search.json' });
                } catch (e) {
                    return;
                }
				*/
});