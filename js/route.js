//页面路由跳转
$(function(){
	//nav导航页路由跳转开始
	//首页路由切换
	$("ul .home_li").on('click',function(){
		window.location = "../home/home.html";
	});
	//自助下单路由切换
	$(".server_order_menu").hide();
	$("#service_li").mouseover(function (){  
        $(".server_order_menu").show();
        $(".server_order_menu").mouseover(function (){  
	        $(".server_order_menu").show(); 
	    }).mouseout(function (){
			$(".server_order_menu").hide();
		});
    }).mouseout(function (){
		$(".server_order_menu").hide();
	});

    //oem产品信息
	$("ul .oem_server_menu").on('click',function(){
		window.location = "../service/home.html";
	});
	//焊接产品信息
	$("ul .weld_server_menu").on('click',function(){
		window.location = "../weld_service/home.html";
	});

	//合同管理路由切换
	$(".order_contract_menu").hide();
	$("#order_li").mouseover(function (){  
        $(".order_contract_menu").show();
        $(".order_contract_menu").mouseover(function (){  
	        $(".order_contract_menu").show(); 
	    }).mouseout(function (){
			$(".order_contract_menu").hide();
		});
    }).mouseout(function (){
		$(".order_contract_menu").hide();
	});

    //oem合同信息
	$("ul .oem_contract_menu").on('click',function(){
		window.location = "../order/home.html";
	});
	//焊接合同信息
	$("ul .weld_contract_menu").on('click',function(){
		window.location = "../weld_order/home.html";
	});


	//个人中心路由切换
	$("ul .person_li").on('click',function(){
		window.location = "../person/home.html";
	});
	//售后设置路由切换
	$(".sale_menu").hide();
	$("#sale_li").mouseover(function (){  
        $(".sale_menu").show();
        $(".sale_menu").mouseover(function (){  
	        $(".sale_menu").show(); 
	    }).mouseout(function (){
			$(".sale_menu").hide();
		});
    }).mouseout(function (){
		$(".sale_menu").hide();
	});
	//选择返修产品
	$("ul .select_menu").on('click',function(){
		window.location ="../select_menu/home.html";
	});
	//oem产品
	$("ul .oem-menu").on('click',function(){
		window.location ="../oem_menu/home.html";
	});
	//选择焊接产品
	$("ul .weld-menu").on('click',function(){
		window.location ="../weld_menu/home.html";
	});

    //退出页面全屏
    function fullScreen(el) {  
      	var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen,wscript;  
      	if(typeof rfs != "undefined" && rfs) {  
          	return rfs.call(el);  
      	}
  	}  
  	function exitFullScreen(el) {  
      	var el= document,  
          	cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen,wscript;  
      	if (typeof cfs != "undefined" && cfs) {  
        	return  cfs.call(el);;  
      	}  
     
      	if (typeof window.ActiveXObject != "undefined") {  
          	wscript = new ActiveXObject("WScript.Shell");  
          	if (wscript != null) {  
              	wscript.SendKeys("{F11}");  
          	}  
    	}  
  	}  
  	var content = document.documentElement; 
	$(".fullscreen").on('click',function(event){
	  	fullScreen(content);
	  	
	}); 	 
});