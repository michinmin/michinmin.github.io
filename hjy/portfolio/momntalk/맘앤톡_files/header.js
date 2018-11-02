////////////////////////////////////////////////////////////////////////////////
////																		////
////////////////////////////////////////////////////////////////////////////////
"use strict";

(function(root, factory) {

	if(typeof define === "function" && define.amd) {
		define(factory);
	}
	else if(typeof exports === "object") {
		module.exports = factory();
	}
	else {
		root.newriver = factory();
	}

}(this, function() {

	if("undefined" === typeof window.NDev) {
		NDev		= window.NDev = {};	//Newriber Development script

		NDev.Head	= {};
	}

	var Head	= NDev.Head = {

		Init : function() {
			$("#hwd").on("mouseover focusin keyup keydown", function(e) {
				if(e.keyCode == 13) {
					var ac = $(this).attr("ac");
					var wd = $("#hwd").val();
					
					if(wd.length < 2) {
						alert("2글자 이상 입력해주세요.");
						return false;
					}

					if(wd != "") {
						$("#hForm").attr("action", "/search/result.mnt");
						$("#hForm").submit();
					} else {
						location.href = ac;
					}
				}
			});

			$("#hbtn").on("click", function(){
				var ac = $(this).attr("ac");
				var wd = $("#hwd").val();

				if(wd.length < 2) {
					alert("2글자 이상 입력해주세요.");
					return false;
				}
				
				if(wd != "") {
					$("#hForm").attr("action", "/search/result.mnt");
					$("#hForm").submit();
				} else {
					location.href = ac;
				}
			});

			/**
			 * GNB 레이어 팝업
			 * ui.js 참고
			 */
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
					NDev.Util.post("/gnb/noti/list.mnt", null, "html").done(function(result) {
						$("#noti_list").html(result);
						$noticeTrg.addClass('on');
						$noticeTrg.removeClass('new');
						layerToggle($noticeLayer, true);
					});
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

			Newriver.Util.PageWheelDisabled($noticeCon);
			Newriver.UI.GnbAction();

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

		}
	};

}));