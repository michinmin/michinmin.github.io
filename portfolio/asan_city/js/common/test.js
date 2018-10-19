$(function(){
	
})

$(document).ready(function(){
	$('.bxslider').bxSlider({
		mode: 'fade',
		infiniteLoop: true,
		speed: 500,
		slideMargin: 0,
		captions: true,
		pager: true,
		pagerType: 'full',
		controls: true, //좌우 버튼 생성 유/무 || 필요없을 때 false
		nextText: 'Next', //우측버튼에 보여질 텍스트
		prevText: 'Prev', //좌측버튼에 보여질 텍스트
		autoControls: true, //play / stop / puase 버튼들을 노출시키는 옵션 입니다.
		startText: 'Start', //재생시 보이는 텍스트
		stopText: 'Stop', //정지시 보이는 텍스트
		autoControlsCombine: false,

		// 자동
		auto: true, //자동 슬라이드
		pause: 4000, //슬라이드 정지 후 다음 슬라이드 보여질 속도
		autoStart: true,
		autoDirection: 'next', //슬라이드 보여질 방향 제어
		autoHover: true, //마우스 hover시 슬라이드 제어
		autoDelay: 1, //슬라이드 정지 시간
		
	})
})