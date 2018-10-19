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
		NDev				= window.NDev = {};	//Newriber Development script

		NDev.Util			= {};				//공통 유틸 메서드
		NDev.JsonUtil		= {};				//json 관련 메서드
		NDev.FormUtil		= {};				//양식 관련 유틸. 분석후 수정 필요
		NDev.EditorUtil		= {};				//에디터 관련 유틸. 네이버 스마트 에디터 기준. 에디터 변경시 수정 필요.
		NDev.VaildationUtil	= {};				//데이터 체크 유틸. 현재 양식 관련 유틸에도 데이터 체크 메서드가 산재되어 있음. 같이 확인 필요.
		NDev.Board			= {};
		NDev.GlobalNoti		= {};
	}

	/**
	 * 기본적인 기능 정리
	 */
	var Util			= NDev.Util				= {

		/**
		 * #PURE
		 * null 체크
		 * @param  {Object}	value
		 * @return {Boolean}
		 */
		isNull			: function(value) {
			return (value != null && value != undefined && value != "" && value != "null") ? false : true;
		},

		/**
		 * #PURE
		 * 문자열 null 체크
		 * @return {String}
		 */
		nvlString		: function() {
			var parameters = arguments;

			switch(parameters.length) {

				case 1	:

					var value = parameters[parameters.length - 1];

					return (!Util.isNull(value)) ? value : "";

					break;

				case 2	:

					var value		= parameters[parameters.length - 2],
						repairValue	= parameters[parameters.length - 1];

					return (!Util.isNull(value)) ? value : repairValue;

					break;

				default	:
					console.log("NOT FOUNDev ARGUMENTS");

			}
		},

		/**
		 * #PURE
		 * 숫자 null 체크
		 * @return {Number}
		 */
		nvlNumber		: function() {
			var parameters = arguments;

			switch(parameters.length) {

				case 1	:

					var value = parameters[parameters.length - 1];

					return (!Util.isNull(value)) ? value : 0;

					break;

				case 2	:

					var value		= parameters[parameters.length - 2],
						repairValue	= parameters[parameters.length - 1];

					return (!Util.isNull(value)) ? value : repairValue;

					break;

				default	:
					console.log("NOT FOUNDev ARGUMENTS");

			}
		},

		href			: function(path) {
			location.href = path;
		},

		hrefPost		: function(path, names, values) {
			var form	= $("<form></form>", { "method" : "post", "action" : path });

			for(var i = 0; i < names.length; i++) {
				form.append($("<input>", { "type" : "hidden", "name" : names[i], "value" : values[i] }));
			}

			form.appendTo("body");

			form.submit();
		},

		ajaxBefore		: function() {
			$("#page_loader_wrap").removeClass("load");
		},

		ajaxAfter		: function() {
			$("#page_loader_wrap").addClass("load");
		},

		/**
		 * #PURE
		 * 넘어온 value 에 세 자리마다 콤마를 찍어서 반환
		 * @param  {?}      value
		 * @return {String}
		 */
		comma			: function(value) {
			var source		= value.toString().replace(/,/g,''),
				length		= source.length,
				returnValue	= source.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;

			return returnValue;
		},

		checkByte		: function(value) {
			var byte = 0;

			for (var i = 0; i < value.length; i++) {

				var char = escape(value.charAt(i));

				if(char.length == 1) {
					byte ++;
				}
				else if (char.indexOf("%u") != -1) {
					byte += 2;
				}
				else if (char.indexOf("%") != -1) {
					byte ++;
				}
			}

			return byte;
		},

		/**
		 * #JQUERY
		 * 비동기 통신 post
		 * @param {String} uri
		 * @param {json}   data
		 * @param {String} dataType
		 */
		post			: function(uri, data, dataType) {
			var promise	= $.Deferred();

			$.post(uri, data, function(result) { promise.resolve(result); }, dataType).error(function() {
				console.error("Asynchronous JavaScript and XML Erorr");
				promise.reject.apply(null, arguments);
			});

			return promise;
		},

		/**
		 * #JQUERY
		 * 비동기 통신 get
		 * @param {String} uri
		 * @param {json}   data
		 * @param {String} dataType
		 */
		get				: function(uri, data, dataType) {
			var promise	= $.Deferred();

			$.get(uri, data, function(result) { promise.resolve(result); }, dataType).error(function() { promise.reject.apply(null, arguments); });

			return promise;
		}

	};

	/**
	 * Json 관련 기능 정리
	 */
	var JsonUtil		= NDev.JsonUtil			= {

		/**
		 * Json 트리 구조로 변환
		 * @param  {Array}	arrayList
		 * @param  {String}	inheritValue
		 * @param  {String}	uniqueName
		 * @param  {String}	inheritName
		 * @return {Array}
		 */
		jsonTree	: function(arrayList, inheritValue, uniqueName, inheritName) {
			var result		= [],
				transfer	= function(nodes, item, index) {
					if(nodes instanceof Array) {
						return nodes.some(function(node) {

							if(eval("node." + uniqueName) === eval("item." + inheritName)) {

								node.children	= node.children || [];

								return node.children.push(arrayList.splice(index, 1)[0]);

							}

							return transfer(node.children, item, index);

						});
					}
				};

			while(arrayList.length > 0) {
				arrayList.some(function(item, index) {
					return (eval("item." + inheritName) == inheritValue) ? result.push(arrayList.splice(index, 1)[0]) : transfer(result, item, index);
				});
			}

			return result;
		},

		/**
		 * Json 트리구조 노드 검색
		 * @param  {Array}	data
		 * @param  {String}	searchValue
		 * @param  {String}	uniqueName
		 * @return {Json}
		 */
		getNode		: function(data, searchValue, uniqueName) {
			var result;

			for(var i = 0, node; node = data[i]; i++) {

				if(eval("data[i]." + uniqueName) == searchValue) {
					return node;
				}
				else if(node.children) {
					result	= JsonUtil.getNode(node.children, searchValue, uniqueName) || result;
				}

			}

			return result;
		}

	};

	/**
	 * 폼 데이터에 관련된 기능 정의
	 * naver smart editor 사용코드.
	 * editor 변경시 수정 필요
	 * 클래스 명, 요소 등 확인 또는 수정 필요
	 */
	var FormUtil		= NDev.FormUtil			= {

		load			: function(form, action, contentId) {
			var userAgent = navigator.userAgent.toLowerCase();
			if(/trident|msie/.test(userAgent) || /edge/.test(userAgent)) {
				if($("#" + contentId).length > 0) {
					CKEDITOR.replace(contentId, {
						customConfig	: "/resources/backoffice/common/js/dev/ckeditor_config_ie_content.js"
					});
				}
			}
			else {
				if($("#" + contentId).length > 0) {
					CKEDITOR.replace(contentId, {
						customConfig	: "/resources/backoffice/common/js/dev/ckeditor_config_content.js"
					});
				}
			}

			var $form	= $("#" + form);

			$form.unbind("submit").bind("submit", function(e) {
				$("#" + contentId).text(CKEDITOR.instances[contentId].getData());

				if(!NDev.FormUtil.check(form)) {
					return false;
				}
				else {

					if(confirm("작성하신 내용을 저장하시겠습니까?")) {

						$form.attr("action", action);

						$form.find("[name=md]").val('post');

						return true;

					}
					else {
						return false;
					}
				}

				e.preventDefault();
			});
		},

		save			: function(procURI) {
			$(".btnProc").on("click", function() {
				var chk = NDev.FormUtil.valid();
				var dt	= $("#gForm").serialize();
				var msg	= $(this).attr("msg"); + " 하시겠습니까?";

				if(chk && confirm(msg)) {
					$("#gForm").b_post(procURI, dt, "json").done(function(data){
						alert(data.msg);

						if(data.result) {
							location.href = data.uri;
						}
					}).fail(function(){
						alert(arguments[1]);
					});
				}
			});
		},

		proc			: function(procURI) {
			var dt	= $("#gForm").serialize();

			$("#gForm").b_post(procURI, dt, "json").done(function(data){
				alert(data.msg);

				if(data.result) {
					location.href = data.uri;
				}
			}).fail(function(){
				alert(arguments[1]);
			});
		},

		valid : function() {
			var chk = true;

			$('input, select, textarea').each(function() {
				var req = $(this).attr("req");
				var tit = $(this).attr("title")
				var typ = $(this).attr("type");
				var msg = $(this).attr("msg");
				var val = $.trim($(this).val());
				var nod = $(this).prop('nodeName');
				var ckd = $(this).attr("checked");

				msg = (msg == "" || msg == null || msg == undefined) ? "" : msg;

				if(req != null && nod != "" && val === "" && nod != "TEXTAREA") {
					var th = $(this);

					if(nod === "INPUT" && (typ === "text" || typ === "password")) {
						msg = (msg != "" && msg != null && msg != undefined) ? msg : "["+tit+"] 항목을 입력해주세요.";
					} else if(nod === "SELECT") {
						msg = (msg != "" && msg != null && msg != undefined) ? msg : "["+tit+"] 항목을 선택해주세요.";
					}

					alert(msg);
					th.focus();
					chk = false;
					return false;

				} else if(req != null && nod === "INPUT" && typ === "radio") {
					var rdchk = false;

					$(".chkrdo").each(function() {
						if($(this).attr("checked") != null) {
							rdchk = true;
							return false;
						}
					});

					if(!rdchk) {
						msg = (msg != "" && msg != null && msg != undefined) ? msg : "["+tit+"] 항목을 선택해주세요.";
						alert(msg);
						$(this).focus();
						chk = false;
						return false;
					}

				} else if(typ === "number") {
					var step = $(this).attr("step") == undefined ? 0 : $(this).attr("step");

					if(step > 0 && $(this).val() % step > 0) {
						var value	= $(this).val(),
							rest	= value % step,
							result	= value - rest;

						$(this).val(result);
					}

				} else if(req != null && nod === "TEXTAREA") {
					var ckeditor = CKEDITOR.instances['content'];
					var ckeditor1 = CKEDITOR.instances['content1'];
					var ckeditor2 = CKEDITOR.instances['content2'];
					var ckeditor3 = CKEDITOR.instances['content3'];
					var ckeditor4 = CKEDITOR.instances['content4'];

					if (ckeditor != undefined && ckeditor.getData() == "") {
						msg = (msg != "" && msg != null && msg != undefined) ? msg : "["+tit+"] 항목을 입력해주세요.";

						alert(msg);
						ckeditor.focus();
						chk = false;
						return false;
					}

					if (ckeditor1 != undefined && ckeditor1.getData() == "") {
						msg = (msg != "" && msg != null && msg != undefined) ? msg : "["+tit+"] 항목을 입력해주세요.";

						alert(msg);
						ckeditor1.focus();
						chk = false;
						return false;
					}

					if (ckeditor2 != undefined && ckeditor2.getData() == "") {
						msg = (msg != "" && msg != null && msg != undefined) ? msg : "["+tit+"] 항목을 입력해주세요.";

						alert(msg);
						ckeditor2.focus();
						chk = false;
						return false;
					}

					if (ckeditor3 != undefined && ckeditor3.getData() == "") {
						msg = (msg != "" && msg != null && msg != undefined) ? msg : "["+tit+"] 항목을 입력해주세요.";

						alert(msg);
						ckeditor3.focus();
						chk = false;
						return false;
					}

					if (ckeditor4 != undefined && ckeditor4.getData() == "") {
						msg = (msg != "" && msg != null && msg != undefined) ? msg : "["+tit+"] 항목을 입력해주세요.";

						alert(msg);
						ckeditor4.focus();
						chk = false;
						return false;
					}
				}
			});

			return chk;
		},

		/**
		 * 폼 데이터 전송
		 * @param  {String} form
		 * @param  {String} url
		 * @return
		 */
		submit			: function(form, url) {
			var frm	= $("#" + form);

			if(url != "") {
				frm.attr("action", url);
			}

			frm.submit();
		}

	};

	/**
	 * editor 추가 기능 정의
	 * 다른 editor 를 사용하거나
	 * 해당 부분이 제거되면 FormUtil 수정 필요.
	 */
	var EditorUtil		= NDev.EditorUtil		= {

		applyContent	: function(contentId) {
			$("#" + contentId).text(CKEDITOR.instances[contentId].getData());
		},

		inputContent	: function(contentId, html) {
			CKEDITOR.instances[contentId].insertHtml(html);
		}

	};

	/**
	 * FormUtil 안에 있는 양식 체크에 적용되지 않는
	 * 데이터 체크 메서드 기능 정의
	 */
	var VaildationUtil	= NDev.VaildationUtil	= {

		checkList		: function() {
			$(".chk-m").unbind("click").bind("click", function() {
				$(".chk-c").prop("checked", $(this).prop("checked"));

				if($(this).attr("checked") != "checked") {
					$(this).attr("checked", "checked");
					$(".chk-c").attr("checked", "checked");
				} else {
					$(this).removeAttr("checked");
					$(".chk-c").removeAttr("checked");
				}
			});

			$(".chk-c").unbind("click").bind("click", function() {
				var total	= $(".chk-c").length;
				var checked	= $(".chk-c:checked").length;

				if($(this).attr("checked") != "checked") {
					$(this).attr("checked", "checked");
				} else {
					$(this).removeAttr("checked");
				}

				$(".chk-m").prop("checked", (total == checked));
			});
		},

		limitChecked	: function(limit) {
			$(".chk-l").bind("change", function() {
				if($(".chk-l:checked").length > limit) {
					alert("최대 " + limit + "개까지 선택할 수 있습니다.");
					$(this).prop("checked", false);
				}
			});
		},

		isChecked		: function(flag) {
			var total	= flag ? $(".chk-c").length : $(".chk-c[data-required=true]").length;
			var checked	= flag ? $(".chk-c:checked").length : $(".chk-c[data-required=true]:checked").length;

			return (total == checked);
		},

		stringChecked	: function(type) {
			var result	= "";

			$(".chk-" + type + ":checked").each(function() {
				result	+= (result == "") ? $(this).val() : "," + $(this).val();
			});

			return result;
		},

		emailDomain		: function(selectorInput, selectorSelect) {
			$(selectorSelect).bind("change", function() {
				if($(this).val() != "") {
					$(selectorInput).prop("readonly", true);
					$(selectorInput).val($(this).val());
				}
				else {
					$(selectorInput).prop("readonly", false);
					$(selectorInput).val($(this).val());
				}
			});
		},

		checkRegular	: function(value, regular) {
			return regular.test(value);
		},

		onlyNumber		: function() {
			$("input[onlynumber = 'true']").each(function() {
				$(this).unbind("keyup").bind("keyup", function(event) {
					var value = NDev.Util.nvlNumber($(this).val().replace(/[^0-9]/gi, ""));

					value = parseInt(value);

					$(this).val(value);
				});
			});
		}

	};

	var Board	= NDev.Board	= {
		Init	: function() {
			$("#btnSrch").unbind("click").bind("click", function() {
				$("#page").val(1);
				$("#nForm").submit();
			});

			$("#srchWord").unbind("keypress").bind("keypress", function() {
				if(event.keyCode == 13) {
					$("#page").val(1);
					$("#nForm").submit();
				}
			});

			$("#btnBack").unbind("click").bind("click", function() {
				$("#bForm").submit();
			});
		},
		
		ListSubmit : function() {
			$("#page").val(1);
			$("#nForm").submit();
		}
	};

	var GlobalNoti	= NDev.GlobalNoti		= {
		View	: function(noti_no, uri) {
			NDev.Util.post("/gnb/noti/read.mnt", { "noti_no" : noti_no }, "json").done(function(result) {
				switch(result.resultCode) {
					case "0000001" :
						location.href = uri;
						break;
					case "0000002" :
						alert("오류가 발생했습니다. 관리자에게 문의해주세요.");
						break;
					case "0000000" :
						alert("오류가 발생했습니다. 관리자에게 문의해주세요.");
						break;
					case "1111111" :
						alert("로그인이 필요한 서비스 입니다.");
						location.href="/member/sign.mnt";
						break;
					case "2222222" :
						alert("오류가 발생했습니다. 관리자에게 문의해주세요.");
						break;
					case "3333333" :
						alert("오류가 발생했습니다. 관리자에게 문의해주세요.");
						break;
					default :
						alert("오류가 발생했습니다. 관리자에게 문의해주세요.");
				}
			});
		}
	};

	var Site = NDev.Site = {
		Page : function (page) {
			if (page) {
				$("#nForm").removeAttr("action");
				$("#page").val(page);
			}
			$("#nForm").submit();
		},

		Bookmarksite : function() {
			var bookmarkURL = location.href;
	        var bookmarkTitle = document.title;

	        if (window.sidebar && window.sidebar.addPanel) {
	            // Firefox version < 23
	            window.sidebar.addPanel(bookmarkTitle, bookmarkURL, '');

	        } else if ((window.sidebar && (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)) || (window.opera && window.print)) {
	            // Firefox version >= 23 and Opera Hotlist
	        	alert((navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Cmd' : 'Ctrl') + '+D 키를 눌러 즐겨찾기에 등록하실 수 있습니다.');

	        } else if (window.external && ('AddFavorite' in window.external)) {
	            // IE Favorite
	            window.external.AddFavorite(bookmarkURL, bookmarkTitle);

	        } else {
	            // WebKit - Safari/Chrome
	            alert((navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Cmd' : 'Ctrl') + '+D 키를 눌러 즐겨찾기에 등록하실 수 있습니다.');
	        }

		}
	};

	var Layer = NDev.Layer = {
		Init : function() {
			Layer.Open();
			Layer.OpenParam();
		},

		Open : function() {
			$(".layerBtn").on("click", function() {
				var tmp = $(this).attr("tmp");
				var tg 	= $(this).attr("tg");
				var url = "/"+tmp+"/layer/"+tg+".mnt";

				Newriver.AjaxPopup(url);
			});
		},

		OpenParam : function() {
			$(".layerBtnParam").on("click", function() {
				var tmp = $(this).attr("tmp");
				var tg 	= $(this).attr("tg");
				var key	= $(this).attr("key");
				var typ	= $(this).attr("c");
				var url = "/"+tmp+"/layer/"+tg+".mnt?"+key+"="+typ;

				Newriver.AjaxPopup(url);
			});
		}
	};

	var SNS = NDev.SNS = {
		Copy : function() {
			// Create a "hidden" input
			var aux = document.createElement("input");
	
			// Assign it the value of the specified element
			aux.setAttribute("value", location.href);
	
			// Append it to the body
			document.body.appendChild(aux);
	
			// Highlight its content
			aux.select();
	
			// Copy the highlighted text
			document.execCommand("copy");
	
			// Remove it from the body
			document.body.removeChild(aux);
			
			alert("주소가 복사되었습니다.");
		},
			
		Share : function(title, tt_no, mst_no, tt_key, gb) {
			var url		= location.href,
				o 		= "",
		  		device 	= (/Android/i.test(navigator.userAgent)) ? "and" : (/iPhone|iPad|iPod/i.test(navigator.userAgent)) ? "ios" : "pc",
				target 	= "http://www.momntalk.com/snsShare.mnt?tt_no="+tt_no+"&mst_no="+mst_no+"&tt_key="+tt_key,
				tt_dir	= (tt_key === "cont_no") ? "contents/bod" : (tt_key === "rsch_no") ? "contents/rsch" : "",
				snsimg	= "http://www.momntalk.com/resources/frontoffice/images/common/momntalk_share.jpg";
				//snsimg	= (tt_dir != "") ? "http://www.momntalk.com/upload/"+tt_dir+"/"+tt_no : "http://www.momntalk.com/resources/frontoffice/images/common/kakao_share.jpg";

			switch(gb)
			{
				case 0: //facebook
					o = {
						method:'popup',
						url:'http://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(target),
						target : "SnS",
						size : "scrollbars=yes, resizable=yes, top=100, left=100, width=1024, height=600"
					};

					break;

				case 1: //kakaostory
					o = {
						method:'_tmpApp',
					};

					if(device == "pc") {
						Kakao.Story.share({
							url : target,
							text : title
						});

					} else if(device == "and" || device == "ios") {
						Kakao.Story.open({
			        		url : target,
			        		text : title,
			        		urlInfo: {
			        	        title: title,
			        	        desc: title,
			        	        name: title,
			        	        images: snsimg
			        	    }
			        	});

					}
					break;

				case 2: //band
					if(device == "pc" ) {
						o = {
							method:'popup',
							url:'http://www.band.us/plugin/share?body=' + encodeURIComponent(title) + encodeURIComponent('\r\n') + encodeURIComponent(target) + '&route=' + encodeURIComponent(target)
						};
					} else if(device == "and" || device == "ios") {
						o = {
			                method:'web2app',
			                a_param:'create/post?text=' + encodeURIComponent(title) + encodeURIComponent('\r\n') + encodeURIComponent(target),
			                g_param:'create/post?text=' + encodeURIComponent(title) + encodeURIComponent('\r\n') + encodeURIComponent(target),
			                a_store:'itms-apps://itunes.apple.com/app/id542613198?mt=8',
			                g_store:'market://details?id=com.nhn.android.band',
			                a_proto:'bandapp://',
			                g_proto:'scheme=bandapp;package=com.nhn.android.band'
						};
					}

					break;

				case 3: //kakaotalk
					o = {
						method:'_tmpApp',
					};

					if(device == "pc") {
						alert("PC환경에서 사용할 수 없습니다.");

					} else if(device == "and" || device == "ios") {
						 Kakao.Link.sendTalkLink({
							 label : "[Momntalk] " + title,
							 image : {
								 src: snsimg,
								 width: '300',
						         height: '300'
							 },
							 webButton : {
								 text : "[Momntalk] " + title,
								 url : url
							 }
						 });
					}

					break;

				case 4: //naver blog
					o = {
						method :'popup',
						url : "http://blog.naver.com/openapi/share?url=" + encodeURIComponent(target) + "&title=" + encodeURI(title)
					};

					break;

				default:
					alert('지원하지 않는 SNS입니다.');

				return false;
			}

			switch(o.method)
		    {
				case 'location':
					document.location = o.url;
					break;

		        case 'popup':
		        	var popup = window.open(o.url, "_blank", "scrollbars=yes, resizable=yes, top=100, left=100, width=1024, height=600");
		        	if(popup == null || popup.screenLeft == 0) {
		        		alert("팝업차단 설정을 해제해주세요.");
		        	}
		            break;

		        case 'web2app':
		            if(device == "and")
		            {
		                // Android
		                setTimeout(function () {
		                	location.href = 'intent://' + o.g_param + '#Intent;' + o.g_proto + ';end'
						}, 1000);
		            }
		            else if(device == "ios")
		            {
		                // Apple
		            	setTimeout(function() { location.href = o.a_store }, 2000);
		            	setTimeout(function() { location.href = o.a_proto + o.a_param }, 1000);
		            }
		            break;

		        case '_tmpApp':
		        	break;

		        default:
					alert('지원하지 않는 SNS입니다.');
		    }
		}
	}

}));

$(function() {
	/*$.ajaxSetup({
		beforeSend	: NDev.Util.ajaxBefore,
		complete	: NDev.Util.ajaxAfter
	});*/
	
	//var tmpDevice = (/Android/i.test(navigator.userAgent)) ? "and" : (/iPhone|iPad|iPod/i.test(navigator.userAgent)) ? "ios" : "pc"
	
	//if(tmpDevice != "pc") location.href = "http://m.momntalk.com/main.mnt"; 
});

