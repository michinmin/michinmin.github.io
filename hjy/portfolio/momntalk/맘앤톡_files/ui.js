//개인정보활용 동의 변수
var varEventOk = "no";

;(function($, window, undefined){
	'use strict';

	if('undefined' === typeof window.Newriver){
		var Newriver = window.Newriver = {};

		Newriver.targetIdx = 0;
		Newriver.AjaxPopupIdx = 0;
		Newriver.TestPopup = null;
	}

	$(document).ready(function(){
		Util.LoadMotion();
	});

	$.fn.YJtarget = function(options){
		/*$(target).YJtarget({
			target : false,
			action : function(target){}
		});*/

		if(!this.length) return this;

		if(this.length > 1){
			this.each(function(){
				$(this).YJtarget(options);
			});
			return this;
		}

		var defaults = {
			target : false,
			action : function(){}
		}

		var opt = $.extend({}, defaults, options);
		var p = this[0];
		var t;
		Newriver.targetIdx++;
		var event = 'click.'+Newriver.targetIdx;

		$(document).off(event).on(event, function(e){
			t = e.target;

			if(t === p && opt.target){
				opt.action(p);
				return;
			}else{
				while(t !== p){
					if(t === this){
						break;
					}else{
						if(t === null){
							break;
						}
						t = t.parentNode;
					}
				}
				if(t === p){
					if(opt.target){
						opt.action(p);
					}
				}else{
					if(!opt.target){
						opt.action(p);
					}
				}
				return;
			}
		});
	}

	$.fn.imagesLoaded = function () {
		var $imgs = this.find('img[src!=""]');
		if (!$imgs.length) {return $.Deferred().resolve().promise();}

		var dfds = [];

		$imgs.each(function(){
			var dfd = $.Deferred();
			dfds.push(dfd);
			var img = new Image();
			img.onload = function(){dfd.resolve();}
			img.onerror = function(){dfd.resolve();}
			img.src = this.src;
		});

		return $.when.apply($,dfds);
	}
	
	Newriver.AjaxPopup = function(url, options){
		var defaults = {
			background : true,
			openCall : function(target){},
			closeCall : function(target){}
		}

		Newriver.AjaxPopupIdx++;

		var obj = {};
		var sbj = {};
		var opt = $.extend({}, defaults, options);
		var winResize;

		$.ajax({
			url : url,
			timeout : 10000,
			dataType : 'html',
			success : function(data){
				sbj.wW = $(window).outerWidth();
				sbj.wH = $(window).outerHeight();
				sbj.sT = $(window).scrollTop();

				obj.body = $('body');
				obj.data = $(data);

				sbj.resize = 'resize.'+Newriver.AjaxPopupIdx;

				obj.wrap = obj.body.append('<div class="layer-wrap" />').children('.layer-wrap:last-child');
				obj.back = obj.wrap.append('<div class="layer-back" />').children('.layer-back:last-child');
				if(!opt.background){obj.back.css({'background' : 'none'});}

				obj.wrap.append(obj.data).imagesLoaded().then(function(){					
					obj.popup = obj.wrap.find('.layer_popup');
					obj.close = obj.wrap.find('[layer="close"]');
					obj.eventOk = obj.wrap.find('[layer="eventOk"]');
					sbj.cW = obj.wrap.outerWidth();
					sbj.cH = obj.wrap.outerHeight();
					sbj.cT = sbj.cH > sbj.wH * 0.8 ? sbj.sT + sbj.wH * 0.1 : sbj.sT + (sbj.wH - sbj.cH) / 2;
					sbj.cL = (sbj.wW - sbj.cW) / 2;

					obj.wrap.css({
						'top' : sbj.cT,
						'left' : sbj.cL,
						'padding-bottom' : sbj.wH * 0.1
					});

					obj.wrap.addClass('open');

					$(window).on(sbj.resize, function(){
						sbj.wW = $(window).outerWidth();
						sbj.cL = (sbj.wW - sbj.cW) / 2;
						obj.wrap.css({'left' : sbj.cL});
					});

					function layerClose(){						
						opt.closeCall(obj.data);
						obj.wrap.remove();
						$(window).off(sbj.resize);
					}
					
					function eventOk(){
						//이벤트참여동의 했을경우
						if($("#ck1").is(":checked") && $("#ck2").is(":checked")){
							varEventOk = "ok";
							layerClose();
						}else{
							alert("'개인정보 수집 및 이용' 및 '개인정보 취급 위탁'에 동의하지 않을 경우 이벤트 참여가 제한됩니다. ");
						}
					}

					obj.close.on('click', layerClose);
					obj.back.on('click', layerClose);
					obj.eventOk.on('click', eventOk);

					opt.openCall(obj.data);
				});

				Newriver.TestPopup = obj;
			},
			error: function(xhr){
				alert('['+xhr.status+'] 서버전송오류가 발생했습니다.');
			}
		});
	};
		
	
	var Util = Newriver.Util = {
		MapApi : function(lat, lng, name, target){
			/* <script src="http://maps.google.com/maps/api/js?key=키값넣는곳&sensor=false"></script> */
			var myOptions = {
				  center : new google.maps.LatLng(lat, lng),
				  mapTypeControl : false,
				  zoom : 17,
				  mapTypeId : google.maps.MapTypeId.ROADMAP
			};

			var map = new google.maps.Map(document.getElementById(target), myOptions);
			var myLatlng = new google.maps.LatLng(lat, lng);
			var marker = new google.maps.Marker({
				position : myLatlng,
				map : map,
				title : name
			});
		},

		MatchMedia : function(function1, function2, resize){
			var media = window.matchMedia('(max-width: 768px)');
			var ready = false;

			function matchesAction(paramse){
				if(!paramse.matches){
					if(!ready && resize){return;}
					function1();
				}else{
					if(!ready && resize){return;}
					function2();
				}
			}

			if(matchMedia){
				matchesAction(media);
				media.addListener(function(parameter){
					matchesAction(parameter);
				});
				ready = true;
			}
		},

		LoadMotion : function(){
			var $motion = $('.n-motion');
			var windowT;
			if($motion.length){
				$motion.each(function(){
					var $this = $(this);
					var thisF = false;
					var thisT = $(this).offset().top;
					var thisH = $(this).height() / 2;
					var thisP = thisT + thisH;

					$(window).on('load scroll', function(){
						if(!thisF){
							windowT = $(window).scrollTop() + $(window).height();
							if(windowT > thisP){
								$this.addClass('n-active');
								thisF = true;
							}
						}
					});
				});
			}
		},

		TabAction : function(tab, con){
			var $tab = $(tab).children(),
				$con = $(con).children();

			$tab.on('click', function(){
				$(this).addClass('on').siblings().removeClass('on');
				$con.eq($(this).index()).addClass('on').siblings().removeClass('on');
			});
		},

		PageWheelDisabled : function(object){
			object.on('mousewheel DOMMouseScroll', function (e){
				var e0 = e.originalEvent,
					delta = e0.wheelDelta || -e0.detail;

				this.scrollTop += (delta < 0 ? 1 : -1) * 30;
				e.preventDefault();
			});
		},

		CheckAll : function(all, name){
			var $chkAll = $('input[name='+all+']');
			var $name = $('input[name='+name+']');
			$chkAll.on('change', function(){
				if(this.checked){
					$name.each(function(){
						this.checked = true;
					});
				}else{
					$name.each(function(){
						this.checked = false;
					});
				}
			});
			$name.on('change', function(){
				var flag = true;
				$name.each(function(){
					if(!this.checked){
						flag = false;
						$chkAll[0].checked = false;
					}
				});
				if(flag){
					$chkAll[0].checked = true;
				}
			});
		}
	}

	var UI = Newriver.UI = {
		ContentBottomCall : function(target, action){
			var $target = $(target).parents('#contents');

			$(window).on('load scroll', function(){
				if(($target.position().top + $target.height()) < ($(window).scrollTop() + $(window).height())){
					action();
				}
			});
		},

		HeaderFixedScrollX : function(){
			var $header = $('#header');
			var x, y, supportPageOffset = window.pageXOffset !== undefined;

			$(window).on('load scroll', function(){
				x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
				y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTOp : document.body.scrollTop;

				$header.css({'left':-x});
			});
		},

		HeaderLayer : function(){
			var $noticeTrg = $('#hd_notice_trg');
			var $noticeLayer = $('#hd_notice');
			var $noticeCon = $('#hd_notice .conbody');
			$noticeCon.flag = false;

			var $sreachTrg = $('#hd_sreach_trg');
			var $sreachLayer = $('#hd_sreach');
			$sreachLayer.flag = false;

			function layerToggle(target, type){
				if(type){
					target.addClass('open');
					target.flag = true;
				}else{
					target.removeClass('open');
					target.flag = false;
				}
			}

			$noticeTrg.on('click', function(e){
				e.stopPropagation();
				$sreachTrg.removeClass('on');
				layerToggle($sreachLayer, false);
				if($noticeLayer.flag){
					$(this).removeClass('on');
					layerToggle($noticeLayer, false);
				}else{
					$(this).addClass('on');
					layerToggle($noticeLayer, true);
				}
			});

			$sreachTrg.on('click', function(e){
				e.stopPropagation();
				$noticeTrg.removeClass('on');
				layerToggle($noticeLayer, false);
				if($sreachLayer.flag){
					$(this).removeClass('on');
					layerToggle($sreachLayer, false);
				}else{
					$(this).addClass('on');
					layerToggle($sreachLayer, true);
				}
			});

			Util.PageWheelDisabled($noticeCon);

			$noticeLayer.YJtarget({
				target : false,
				action : function(target){
					if($noticeLayer.flag){
						$noticeTrg.removeClass('on');
						layerToggle($noticeLayer, false);
					}
				}
			});

			$sreachLayer.YJtarget({
				target : false,
				action : function(target){
					if($sreachLayer.flag){
						$sreachTrg.removeClass('on');
						layerToggle($sreachLayer, false);
					}
				}
			});
		},

		MainEduinfo : function(){
			var $wrap = $('#eduinfo');
			var $inner = $('#eduinfo .inner');
			var $open = $('#open_eduinfo');
			var $close = $('#close_eduinfo');
			var flag = false;

			$open.on('click', function(e){
				e.stopPropagation();
				$wrap.addClass('open');
				flag = true;
			});

			$close.on('click', function(e){
				e.stopPropagation();
				$wrap.removeClass('open');
				flag = false;
			});

			$inner.YJtarget({
				target : false,
				action : function(target){
					if(flag){
						$wrap.removeClass('open');
						flag = false;
					}
				}
			});
		},

		GnbAction : function(){
			var $header = $('#header');
			var $depth1 = $('#gnb > ul > li');

			$depth1.on('mouseover focusin', function(){
				$header.addClass('depth2');
				$(this).addClass('on').siblings().removeClass('on');
			});

			$header.on('mouseleave focusout', function(){
				$header.removeClass('depth2');
				$depth1.removeClass('on');
			});
		},

		LnbAction : function(){
			var $depth1 = $('#lnb > ul > li > button');

			$depth1.on('click', function(){
				$(this).parent().toggleClass('on').siblings().removeClass('on');
			});
		},

		FaqList : function(){
			var $trg = $('#faq_list .qbox');

			$trg.on('click', function(){
				$(this).parent('li').toggleClass('on');
			});
		},

		CmtOpen : function(){
			var $btn = $('#cmt_list_wrap .function .reply');

			$btn.on('click', function(){
				$(this).parents('.cmt_sect').toggleClass('open_ccmt');
			});
		}
	}

	var Slider = Newriver.Slider = {
		MainVisual : function(){
			var $slider = $('#mainvisual .slick-wrap');

			$slider.slick({
				arrows : true,
				dots : true,
				infinite : true,
				slidesToShow : 1,
				slidesToScroll : 1,
				autoplay : true,
				autoplaySpeed : 4000,
				adaptiveHeight : true
			});
		},

		MainEducate : function(){
			var $slider = $('#meducate .slick-wrap');
			var $pagers = $('#meducate .tab li');

			$slider.slick({
				arrows : false,
				dots : false,
				infinite : true,
				slidesToShow : 1,
				slidesToScroll : 1
			});

			$slider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
				$pagers.eq(nextSlide).addClass('slick-active').siblings().removeClass('slick-active');
			});

			$pagers.on('click', function(){
				$slider.slick('slickGoTo', $(this).index());
			});
		},

		MainEvent : function(){
			var $slider = $('#mevent .slick-wrap');

			$slider.slick({
				arrows : true,
				dots : false,
				infinite : true,
				slidesToShow : 4,
				slidesToScroll : 1,
				draggable : false
			});
		},

		Cardnews : function(){
			var $slider = $('#cardnews_slider .slick-wrap');

			$slider.slick({
				arrows : true,
				dots : false,
				infinite : true,
				slidesToShow : 3,
				slidesToScroll : 3,
				draggable : true
			});
		},

		ViewSlider : function(){
			var $slider = $('#view_slider .slick-wrap');

			$slider.slick({
				arrows : true,
				dots : false,
				infinite : true,
				slidesToShow : 1,
				slidesToScroll : 1,
				draggable : true
			});

			$(document).on('keydown', function(e){
				if(e.keyCode === 37){
					e.stopPropagation();
					e.preventDefault();
					$slider.slick('slickPrev');
				}
				if(e.keyCode === 39){
					e.stopPropagation();
					e.preventDefault();
					$slider.slick('slickNext');
				}
			});
		}
	}
})(jQuery, window);