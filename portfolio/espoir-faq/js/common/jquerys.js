$(document).ready(function(){
	
	/*
	var faq_item = $('.faqlist').find('.qlist');
	faq_item.on('click', function(){
		$(this).toggleClass('open');
		return false;
	})
	*/
	// headerFixed();
	hnavhover();
	hnavclick();
	hnhoverColor();
	faq_click();//faq list
	paging();
	// snavhover();
	tnavhover();
	snavclick();
	
});
/* FAQ List Function - mouse enter */

/*function faq_click() {
	var faq_item = $('.faqlist').find('.qlist');
	faq_item.find('a').on({
		'mouseenter': function(){
			var chkClass = $(this).parents('.qlist').hasClass('open');
			if(!chkClass){
				faq_item.removeClass('open');
				$(this).parents('.qlist').addClass('open');
			}else{
				$(this).parents('.qlist').removeClass('open');
			}
		},
		'mouseleave': function(){
			var chkClass = $(this).parents('.qlist').hasClass('open');
			if(!chkClass){
				faq_item.removeClass('open');
				$(this).parents('.qlist').addClass('open');
			}else{
				$(this).parents('.qlist').removeClass('open');
			}
		}
	});
};*/
// header-js
/*function headerFixed(){
	var _fixHeaderY = _headerTop;
	var isFix = false;
	var scrollTop = $(window).scrollTop();
	$(window).scroll(function(){
		scrollTop = $(window).scrollTop();
		if ( scrollTop > _fixHeaderY + 50  ) {
			if(!isFix){
				$("#wrap").addClass('fixed');
				isFix = true;
			}
		} else {
			if(isFix){
				$("#wrap").removeClass('fixed');
				isFix = false;
			}
		}
	});
};*/

function hnavhover(){
	var hnavlist = $('.hmenu');
	hnavlist.each(function(){
		$(this).mouseover(function(){
			$(this).css('color', '#fff');
		});
		$(this).mouseout(function(){
			$(this).css('color', "#a3a3a3");
		});
	})
};

function hnavclick() {
	var tb = $('.dep1');
	var tbnav = $('.dep1').find('a');
	tb.each(function(){
		tbnav.on("mouseenter focusin",function(){
			// $(this).addClass("on");
			$(this).find('>div').show();
			//$(this).find('>div').hasClass("dep2");
			// if(dep2nav){
			// 	$('.dep2').show();
			// }
			return false;
		}).on("mouseleave focusout",function(){
			// tb.removeClass("on");
			$(this).find('>div').hide();
			return false;
		});

		// $(".menu").on("mouseleave focusout",function(){
		// 	tb.removeClass("on");
		// });
	});
};

function hnhoverColor(){
	var colorChange = $('.dep1').find('a')
	colorChange.each(function(){
		$(this).mouseover(function(){
			$(this).css('color','#ff463a');
		}).mouseout(function(){
			$(this).css('color','#000');
		});

		/*
		$(this).on({
			'mouseover':function(){
				$(this).css('color','#ff463a')
			},
			'mouseout':function(){
				$(this).css('color','#000')
			}
		});
		*/
	});
};

// faq-js
function faq_click() {
	var faq_item = $('.faqlist').find('.qlist');
	faq_item.find('a').on('click', function(i, e){
		var chkClass = $(this).parent('.qlist').hasClass('open');
		if(!chkClass){
			faq_item.removeClass('open');
			$(this).parent('.qlist').addClass('open');
		}else{
			$(this).parent('.qlist').removeClass('open');
		}
		return false;
	});
};
function tnavhover(){
	var snavlist = $('.topnav').find('li>a');
	snavlist.each(function(){
		$(this).mouseover(function(){
			$(this).css('color', '#000');
		});
		$(this).mouseout(function(){
			$(this).css('color', "#888");
		});
	});
};

function snavhover(){
	var snavlist = $('.sidenav').find('li>a');
	snavlist.each(function(){
		$(this).mouseovr(function(){
			$(this).css('color', '#000');
		});
		$(this).mouseout(function(){
			$(this).css('color', "#888");
		});
	});
};

function paging() {
	var pagingnum = $('.w_paging').find('a');
	pagingnum.each(function(){
		$(this).mouseover(function(){
			$(this).css("background-color", "#e6e6e6");
		});
		$(this).mouseout(function(){
			$(this).css("background-color", "#fff");
		});
	});
};

function snavclick() {
	var snav_click = $('.sidenav').find('.sn_list');
	snav_click.find('a').on('click', function(){
		var checked = $(this).parents('.sn_list').hasClass('on');
		if(!checked){
			snav_click.removeClass('on');
			$(this).parents('.sn_list').addClass('on');
		}else{
			$(this).parents('.sn_list').removeClass('on');
		}
		return false;
	});
};
