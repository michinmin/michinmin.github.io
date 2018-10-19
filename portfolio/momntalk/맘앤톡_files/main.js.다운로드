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

		NDev.Main	= {};
	}

	var Main	= NDev.Main = {

		Init : function() {
			$(".search").on("click", function(){
				var wd = $(this).attr("wd");
				
				$("#wd").val(wd);
				$("#lForm").submit();
			});
			
			Main.Write();
			Main.Select();
		},
		
		Write : function() {
			$(".mainWrite").on("click", function() {
				NDev.Util.post("/member/loginChk.mnt", "", "json").done(function(result) {
					if(result.rcd == "0000") {
						location.href = "/main/write.mnt"
					}
					
					else {
						Newriver.AjaxPopup("/member/layer/login.mnt");
					}
				});
			});
		},
		
		Select : function() {
			$("#write_mst_no").on("change", function() {
				var val = $(this).val();
				
				$.ajax({
					url: "/main/select.mnt",
					type: "get",
					dataType: "html",
					data: {"mst_no" : val},
					success: function (htm) {
						console.log(htm);
						console.log($.trim(htm).length);
						
						if($.trim(htm).length == 0) {
							$("#write_tab_no").attr("disabled", "disabled");
							$("#write_tab_no").hide();
							$("#write_tab_no").html("");
							
						} else {
							$("#write_tab_no").removeAttr("disabled");
							$("#write_tab_no").show();
							$("#write_tab_no").html(htm);
							
						}
					},
					error: function () { console.log("ERROR"); }
				});
			});
		}
	};

}));