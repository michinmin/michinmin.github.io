$(document).ready(function(){
  $listlen = 0; // 현재 아산 소식 출력갯수
  $idxnum=0; // 클릭한 소식
  $curlen =0;
  $maxlistlen = 12;
  $main_as_list = "";
  $chkgongo = false;

         // 상단메뉴 CLOSE
		 $(".topbannerbtn").on('click',function() {
            $.cookie("visits", 10, {path: "/", domain: "www.asan.go.kr"});
		    $.cookie('topbanner','yes',{expires:1});
	        $(".topbanner").fadeOut();
		 });

		 if($.cookie('topbanner') == "yes") {
		    $(".topbanner").remove();
		 }


		// 게시판 탭	
		$('.main_board ul.mb_tab li .mb_sub').on('click', function(){
			$('.main_board ul.mb_tab li a').removeClass('on');
			$('.main_board ul.mb_panel > li').hide();
			$(this).addClass('on');
			$($(this).attr('href')).show();

            if($(this).parent().index() == 3 && !$chkgongo) {
			  $chkgongo = true;
              $('#mb_con4').html('<iframe src="https://eminwon.asan.go.kr/emwp/jsp/ofr/OfrNotAncmtLMiniSub.jsp?not_ancmt_se_code=01,03,04&ofr_pageSize=3"  title="고시공고"  style="border: 0;overflow-x:hidden;overflow-y:hidden;"></iframe> ')
		//	  location.href = '/node/37327';
			}

			return false;
		});


		// 아산소식 더보기 기능
		$('#main_as_list_btn').on('click',function() {

		 /*
         $.ajax({url: "http://new.asan.go.kr/readasannews.php", success: function(result){
            $(".main_as_list").append(result);
            $maxlistlen += 12;
         }});
		 */

		  if($listlen<=$maxlistlen) {	
			switch($idxnum) {
				case 1:
					var url = "https://www.asan.go.kr/news";
					window.open(url, '_blank'); 					
					break;
				case 2:
					var url = "https://www.asan.go.kr/news/gallery";
					window.open(url, '_blank');  	 
					break;
				case 4:
					var url = "http://news.asan.go.kr/source/List.asp?CATE_CODE=01";
					window.open(url, '_blank');
					break;
			}    										
         }

         // 모바일이면 4개 아니면 8개씩증가
         if($(window).width()<900)  { $maxlistlen += 4;  } else { $maxlistlen += 8; } 

 				    for($i=$curlen; $i<$maxlistlen; $i++) {
					//	$main_as_list.eq($i).css('animation-delay',  ($k/10) + 's');
					//	$main_as_list.eq($i).css('-webkit-animation-delay',  ($k/10) + 's');

						$main_as_list.eq($i).show();
				    	$main_as_list.eq($i).addClass('mainscalecss').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
					       $(this).removeClass('mainscalecss');
					    });
					}		

					$curlen = $i;

						 if($listlen<=$maxlistlen) {		
							switch($idxnum) {
								case 0:
									 $('#main_as_list_btn').hide();
									break;
								case 3:
									 $('#main_as_list_btn').hide();         
									break;
							}    			 
						 }

		}); 
 

		// 아산소식
		$('.main_as_tab a').on('click', function(){
           $listlen = 0; // 현재 아산 소식 출력갯수
           $curlen =0;
           $maxlistlen = 12;
		   $('#main_as_list_btn').show();

			$('.main_as_tab a').removeClass('on');
			$(this).addClass('on');

            $idxnum = $('.main_as_tab a').index(this); // 버튼클릭번호

            if($idxnum == 4) {		// TV 페이지로 이동
				// location.href = "http://www.asan.go.kr/news/video/";
				return;
			}


			$('.main_as_list li').hide();
            $('.main_as_list li').removeClass('mainscalecss');

            switch($idxnum) {
				case 0:
					$main_as_list = $('.main_as_list li');
					$listlen =  $main_as_list.length;                   
					break;
				case 1:
					$main_as_list = $('.main_as_list .news');
					$listlen =  $main_as_list.length;     
					break;
				case 2:
					$main_as_list = $('.main_as_list .gallery');
					$listlen =  $main_as_list.length;    
					break;
				case 3:
					$main_as_list = $('.main_as_list .edu');
					$listlen =  $main_as_list.length;    
					break;
				case 4:
					$main_as_list = $('.main_as_list .tv');
					$listlen =  $main_as_list.length;    
					break;
			}                   

					if($listlen > $maxlistlen) { // 최대갯수조절
						$prlistlen=$maxlistlen;
					} else {
						$prlistlen=$listlen;

		       switch($idxnum) {
				case 0:
         			 $('#main_as_list_btn').hide();
					break;
				case 3:
         			 $('#main_as_list_btn').hide();         
					break;
			}   
                        // $('#main_as_list_btn').hide();
					}

				    for($i=0; $i<$prlistlen; $i++) {
					//	$main_as_list.eq($i).css('animation-delay',  ($i/20) + 's');
					//  $main_as_list.eq($i).css('-webkit-animation-delay',  ($i/20) + 's');
						$main_as_list.eq($i).show();
				    	$main_as_list.eq($i).addClass('mainscalecss').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
					       $(this).removeClass('mainscalecss');
					    });
					}					

					$curlen = $i;
			return false;
		});

        $('.main_as_tab a:eq(0)').trigger('click');

		$('.main_as_list li dd').dotdotdot();
		$('.main_as_list li a').on('mouseover focus', function(){
			$(this).find('div.cover').show();
		});
		$('.main_as_list li a').on('mouseleave', function(){
			$(this).find('div.cover').hide();
		});


		$('.sns_control a.sns_prev').on('click', function(){
			sns_slider.goToPrevSlide();
			return false;
		});
		$('.sns_control a.sns_next').on('click', function(){
			sns_slider.goToNextSlide();
			return false;
		});
		$('.sns_control a.sns_play').on('click', function(){
			$('.sns_control a.sns_stop').show();
			sns_slider.startAuto();
			return false;
		});
		$('.sns_control a.sns_stop').on('click', function(){
			$('.sns_control a.sns_stop').hide();
			sns_slider.stopAuto();
			return false;
		});
		$('.sns_slider li').on('mouseover focus', function(){
			$(this).find('div.cover').show();
		});
		$('.sns_slider li').on('mouseleave', function(){
			$(this).find('div.cover').hide();
		});

 
        //  배너관련 소스
		var main_slider = $('.main_slider').bxSlider({
			auto: true,				
			pause: 7000,
			pager: false,
			controls: false
		});


		$('.ms_control a.ms_prev').on('click', function(){
			main_slider.goToPrevSlide();
			return false;
		});
		$('.ms_control a.ms_next').on('click', function(){
			main_slider.goToNextSlide();
			return false;
		});
		$('.ms_control a.ms_play').on('click', function(){
			$('.ms_control a.ms_stop').show();
			main_slider.startAuto();
			return false;
		});
		$('.ms_control a.ms_stop').on('click', function(){
			$('.ms_control a.ms_stop').hide();
			main_slider.stopAuto();
			return false;
		});

		// 메인 슬라이드(오른쪽)


		var settings_sub = function() {
			var settings3 = {
			auto: true,
			slideWidth: 280,
			minSlides: 2,
			maxSlides: 2,
			moveSlides: 1,
			slideMargin: 5,
			pager: false,     
			
			controls: false
			};

			var settings4 = {
			auto: true,
			pause: 7000,
			pager: false,
			controls: false
			};

            // console.log("변형");
			($(window).width()<665)  ? $sns_mchk=true : $sns_mchk=false;
			return ($(window).width()<665) ? settings3 : settings4;
		}

		var mr_slider = $('.mr_slider').bxSlider(settings_sub());
		
		$('.mr_control a.mr_prev').on('click', function(){
			mr_slider.goToPrevSlide();
			return false;
		});
		$('.mr_control a.mr_next').on('click', function(){
			mr_slider.goToNextSlide();
			return false;
		});
		$('.mr_control a.mr_play').on('click', function(){
			$('.mr_control a.mr_play').hide();
			$('.mr_control a.mr_stop').show();
			mr_slider.startAuto();
			return false;
		});
		$('.mr_control a.mr_stop').on('click', function(){
			$('.mr_control a.mr_stop').hide();
			$('.mr_control a.mr_play').show();
			mr_slider.stopAuto();
			return false;
		});


   /* 홍보담당관 추가 시민,사업자,관광객 */

    mbr_menu_list = $('.mbr_menu .mbr_menu_list');
    mbr_menu_list.hide();
    mbr_menu_list.eq(0).show();

	$('.mbr_menu_title li .bg a').on('mouseover focus', function(){   
		$('.mbr_menu_title li').removeClass('on');
		$(this).parent().parent().addClass('on');
        mbr_menu_list.hide();
        mbr_menu_list.eq($(this).parent().parent().index()).show();		
	});


   /* 모바일 SNS 부분 처리      */	

	    $sns_mchk = false;

		$('.sns_slider dd p.con').dotdotdot();
		// initiates responsive slide gallery			
		var settings = function() {
			var settings1 = {
			auto: true,
			slideWidth: 450,
			minSlides:1,
			maxSlides: 1,
			moveSlides: 1,
			slideMargin: 0,
			pager: false,
			controls: false
			};

			var settings2 = {
			auto: true,
			slideWidth: 240,
			minSlides: 4,
			maxSlides: 4,
			moveSlides: 1,
			slideMargin: 30,
			pager: false,
			controls: false
			};

            // console.log("변형");
			// $sns_mchk 1(pc) 900 이상,2(태플릿) 660 ,3(모바일) 900


			($(window).width()<900)  ? $sns_mchk=true : $sns_mchk=false;
			return ($(window).width()<900) ? settings1 : settings2;
		}

		var settings_main = function() {
			var settings3 = {
        	auto: true,				
			pause: 7000,
			pager: false,
			controls: false
			};

			return settings3;
		}

	
		var sns_slider;
		sns_slider = $('.sns_slider').bxSlider(settings());

        $(window).on('resize', $.throttle(1000 / 1, function () { //  수정 화면크기에 맞게 한번만 슬라이딩 세팅값 변형

		 if( ($(this).width()<900) && $sns_mchk) {  // 모바일크기인데 모바일에서 변현이 일어나면 무시
			  return;
		 } else if( ($(this).width()>=900) && !$sns_mchk) {  // PC인데 PC사이즈로 변형되면 무시
			 return;
		 } 

			sns_slider.reloadSlider(settings()); // 사이즈에 맞게 수정
			main_slider.reloadSlider(); // 메인배너 리로딩
			mr_slider.reloadSlider(settings_sub()); // 서브배너 리로딩
        }));


	//video Tab 2018-03-22
	
	
	$(".videoArea").hide(); //Hide all content
	$("ul.videoTab li:first").addClass("active").show(); //Activate first tab
	$(".videoArea:first").show(); //Show first tab content

	//On  Event
	$("ul.videoTab li").click(function() {


		$("ul.videoTab li").removeClass("active"); //Remove any "active" class
		$(this).addClass("active"); //Add "active" class to selected tab
		$(".videoArea").hide(); //Hide all tab content

		var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
		$(activeTab).fadeIn(); //Fade in the active ID content
		return false;
	});

});