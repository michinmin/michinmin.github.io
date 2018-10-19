var page_msg = {};

var FaqList = {
	name : "FaqList",
	init : function() {
		
		var f = $("#span_flag_session_storage").text();
		var pid1 = $("#span_esp_pageid").text();
		var pid2 = esp_storage.getItem("ESP_PAGEID");
		
		if (f == "Y" || pid1 == pid2) {
			var html = esp_storage.getItem("LIST_CONTENTS");
			var np = esp_storage.getItem("NOW_PAGE");
			var tp = esp_storage.getItem("TOTAL_PAGE");
			var st = esp_storage.getItem("SCROLL_TOP");

			if (html != "") {
				$("#cs_content_wrap").html(html)
				var frm = $("#frm");
				frm.find("#i_iNowPageNo").val(np);
				frm.find("#i_iTotalPageCnt").val(tp);

				setTimeout(function () {
					$(window).scrollTop(st);
				}, 500);
			}
		}

		FaqList.fn.addBtnEvent();
		
		var faq_item = $('#div_faq_list').find('.faq_item');
		faq_item.find('a').on('click', function(){
			var chkClass = $(this).parents('.faq_item').hasClass('open');
			if(!chkClass){
				faq_item.removeClass('open');
				$(this).parents('.faq_item').addClass('open');
			}else{
				$(this).parents('.faq_item').removeClass('open');
			}
		});
		
		$("#cs_nav").find("a").click(function(e) {
			e.preventDefault();
			
			var frm = $("#frm");
			var tabId = $(this).attr('id');
			
			$("#cs_nav ul li a").removeClass("on");
			$(this).parent("a").addClass("on");
			
			$(this).addClass("on");
			$("#"+tabId).addClass("on");
			
		});
		
		//바로 세부카테고리로 들어올 경우 해당 카테고리 on
		if($("input[name='i_sSubCategorycd']").val() != null){
			$("#"+$("input[name='i_sSubCategorycd']").val()+"").attr("class", "on");
		}
		
		//키워드 값 설정 후 진입할 경우 검색
		if($("input[name='i_sKeyword']").val() != null){
			FaqList.fn.search();
		}
	},
	
	fn : {
		
		addBtnEvent : function() {
			
			$("#searchBtn").unbind("click").click(function(e){
				e.preventDefault();
				
				FaqList.fn.search();
			});
			
			setEnterKey($("#i_sKeyword"), FaqList.fn.search);
			
			$("#cs_navLst").find("a").click(function(e) {
				e.preventDefault();
				var frm = $("#frm");
				var typecd = $(this).attr('id');
				
				$("#hide_page").remove();
				FaqList.fn.addCategory(typecd);
				
			});
			
			//조회수 증가
			$(document).on("click", ".faq_item", function(e) {
				e.preventDefault();
				
				var frm = $("#frm");
				var faqcd = $(this).attr('id');		//선택한 faqcd
				
				var st = $(this).attr('class');		//선택한 class
				
				if(st == "faq_item open"){
					cmAjax({
						url : GLOBAL_WEB_ROOT + "customer/cs_faq_cnt_ajax.do"
						, type : "POST"
						, data : {faqcd : faqcd}
						, dataType : "json"
						, success : function (data, textStatus, jqXHR) {
							if(data.status == "succ") {
								
							}	
						}
					});
				}else {
					return ;
				}
			});
		},
		
		search : function(keyword) {

			var frm = $("form[name='frm']");
			var keyword = $("input[name='i_sKeyword']").val();
			
			cmAjax({
				url : GLOBAL_WEB_ROOT + "customer/cs_faq_list_count_ajax.do"
				, type : "POST"
				, data : frm.serialize()
				, dataType : "json"
				, success : function (data, textStatus, jqXHR) {
					if(data.status == "succ") {
						var search = data.object.searchList;
						if(search == null){
							showMessageBox({message : "검색 결과가 없습니다." });
						}else {
							FaqList.fn.addBold(data, keyword);
						}
					}	
				}
			});
			
		},
		
		//검색 Bold처리
		addBold : function(data, keyword) {
			
			var list = data.object.searchList;
			var items= document.getElementsByTagName('body');
			var len = list != undefined ? list.length : 0; 
			var page = data.object.page;
					
			var arrHtml = [];
			
			if(len > 0) {
				if(keyword.match(items) != -1){
					for(var i in list) {
						list[i].v_title = list[i].v_title.replace(keyword, "<em>"+keyword+"</em>");
					}
				}
				for(var i in list){
					var vo = list[i];
					var pagefn = doT.template(document.getElementById('dot_tabFaqList').text, undefined, undefined);
					arrHtml.push(pagefn(vo));
				}
				$("#faqList").html(arrHtml.join(""));
				faq_click();
			}else if(len == null){
				showMessageBox({
					message : page_msg.no_search
				});
				return false;
			}
			
		},
		
		//수정용
		addCategory : function(typecd) {
			
			var langcd = $("input[name='i_sLangcd']", frm).val();
			
			cmAjax({
				url : GLOBAL_WEB_ROOT + "customer/cs_faq_list_ajax.do"
				, type : "POST"
				, data : {
					i_sTypecd : typecd
					, i_sLangcd : langcd
				}
				, dataType : "html"
				, success : function (html) {
					$("#faqList").empty();
					$("#faqList").append(html);
					faq_click();
				}
			});
		},
		
		getFaqNextPages : function ( pg, tp ) {
			
			if(pg == undefined && pg == ""){
		        pg = 1;
		      }
			
			var frm_faq = $("#frm_faq");
			$("input[name='i_iNowPageNo']",frm_faq).val(pg);
			
			//모바일 경우
			if(tp == "M"){
				pg = fnOnlyNumber(frm_faq.find("input[name='i_iNowPageNo']").val()).number;
				frm_faq.find("input[name='i_iNowPageNo']").val(pg);
				
				cmAjax({
					url : GLOBAL_WEB_ROOT + "customer/cs_faq_list_ajax.do"
					, type : "POST"
					, data : frm_faq.serialize()
					, dataType : "html"
					, success : function (html) {
						$(".list_more").empty();
						$(html).appendTo($("#faqList"));

						var tot_pg = frm_faq.find("input[name='i_iTotalPageCnt']").val();
						faq_click();
					}
				});
				
			} else {
				
				cmAjax({
					url : GLOBAL_WEB_ROOT + "customer/cs_faq_list_ajax.do"
					, type : "POST"
					, data : frm_faq.serialize()
					, dataType : "html"
					, success : function(html){
						
						$("#faqList").empty();
						$(html).appendTo($("#faqList"));
						faq_click();
					}
				});
			}
		},
		
		
		getFaqNextPage : function ( pg, tp ) {
			
			var frm = $("#frm");
			
			if (tp == "M") {
				
				var s = $("input[name='i_sTypecd']", frm).val();
				
				pg = fnOnlyNumber(frm.find("input[name='i_iNowPageNo']").val()).number + 1;
				frm.find("input[name='i_iNowPageNo']").val(pg);

				cmAjax({
					url : GLOBAL_WEB_ROOT + "customer/cs_faq_list_ajax.do"
					, type : "POST"
					, data : frm.serialize()
					, dataType : "html"
					, success : function (html) {
						$(".list_more").empty();
						$(html).appendTo($("#faqList"));

						var tot_pg = frm.find("input[name='i_iTotalPageCnt']").val();

						$("#hide_page").hide();
						
						if (tot_pg == pg) {
							$("#div_faq_list").find(".list_more.ver_m").find("button").hide();
						}
						
						else {

							var btn = $("#div_faq_list").find(".list_more.ver_m").find("button");

							if (GLOBAL_LANGUAGE == "ko") {
								btn.html("더보기 " + pg + "<span>/ " + tot_pg + "</span>" );
							}
							else {
								btn.html("More " + pg + "<span>/ " + tot_pg + "</span>");
							}
						}
					}
				});
			}
			else {
				frm.find("input[name='i_iNowPageNo']").val(pg);
				
				cmAjax({
					url : GLOBAL_WEB_ROOT + "customer/cs_faq_list_ajax.do"
					, type : "POST"
					, data : frm.serialize()
					, dataType : "html"
					, success : function(html){
						
						$("#hide_page").empty();
						$("#faqList").empty();
						$(html).appendTo($("#faqList"));
						faq_click();
					}
				});
			}
		}
		
		, categoryList : function(list, page) {
			
			var pagefn = doT.template(document.getElementById('dot_tabFaqList').text, undefined, undefined);
			
			$(pagefn(list)).appendTo($("#faqList"));
			
			var more_box =$("#div_faq_list").find(".list_more.ver_m");
			
			var pagefn2 = doT.template(document.getElementById('dot_faq_more').text, undefined, undefined);
			
			more_box.html(pagefn2(page));
			
			if (page.i_iTotalPageCnt <= page.i_iNowPageNo) {
				more_box.find("button").hide();
			}
			faq_click();
		}
	} 
}
	
$(function(){
	FaqList.init();
	
});

//faq event
function faq_click() {
	var faq_item = $('.faqList').find('.faq_item');
	faq_item.find('a').on('click', function(){
		var chkClass = $(this).parents('.faq_item').hasClass('open');
		if(!chkClass){
			faq_item.removeClass('open');
			$(this).parents('.faq_item').addClass('open');
		}else{
			$(this).parents('.faq_item').removeClass('open');
		}
	});
};faq_click();

//중복서브밋 방지
var doubleFlag = false;
function doubleFlagCheck() {
	if(doubleFlag){
		return doubleFlag;
	}else {
		doubleFlag = true;
		return false;
	}
}
	