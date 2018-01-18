/*首页功能逻辑开始*/
$(document).ready(function(){
	/*
	*判断页面窗口高度
	*/


    /**
	部逻辑操作
	*/
	/*$(".user_message").click(function(){
		window.location = "../person/home.html";
	});*/

	//登出操作
	$(".logout").click(function(){
		swal({
		  title: "你确定要退出吗？",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  cancelButtonText: "取消",
		  confirmButtonText: "退出",
		  closeOnConfirm: false
		},
		function(){
		  	window.location = "../login.html";
		});
	});

	/*
	*鼠标点击，背景变色
	*/
	var urlstr = location.href;
    var urlstatus=false;
    $("#menu li").each(function () {  
        if ((urlstr + '/').indexOf($(this).attr('href')) > -1&&$(this).attr('href')!='') {
          $(this).addClass('navdown');
        } else {
          $(this).removeClass('navdown');
        }
    });

    /*
    *鼠标移入移出
    */
    $(".pcb_oec").hide();
    $(".order_li").mouseover(function (){
     	$(".pcb_oec").show();
	    $(".pcb_oec").mouseover(function (){
	        $(".pcb_oec").show();
	}).mouseout(function (){
	    $(".pcb_oec").hide();
	});
    }).mouseout(function (){
        $(".pcb_oec").hide();
    });

    /*全局的底部弹出消息框操作逻辑*/
    $(".cancel_new").click(function(){
    	$(".toast_news").toggle(10);
    });
   
     /*获取头像*/
      $.getJSON({
        url:"../../json/person.json",
        cache:false,
        success:function(result,data){
            if(result.data.state==200){
                $(".head").append('<img src="'+result.data.head_img+'" class="hade" />');
                $("#user").text(result.data.user);
            }
        },
        error:function(){}
    });

    /*订单状态根系，显示相关订单信息*/
    $(".toast_news").hide();
    $.getJSON({
    	url:"../../json/1.json",
        cache:false,
    	success:function(result,data){
    		if(result.data.state==200){
                if(result.data.list.new=='' || result.data.list.new_order=='' || result.data.list.new_info==''){
                    $(".toast_news").hide();
                }else{
                    $(".toast_news2").find("span").html("【温馨提示】"+result.data.list.new);
                    $(".toast_news2").find("p").html(result.data.list.new_order+result.data.list.new_info);
                    $(".toast_news").show();
                }
    		}
    		else{
    			$(".toast_news").hide();
    		}
    	},
    	error:function(){
    		$(".toast_news").hide();
 			
    	}
	});

    /*成交量交互*/
      $.getJSON({
        url:"../../json/4.json",
        cache:false,
        success:function(result,data){
            if(result.data.state==1){
                if(result.data){
                    $(".volume").find(".data_year").html(result.data.data_year);
                    $(".volume").find(".data_mouth").html(result.data.data_mouth);
                    $(".volume").find(".data_week").html(result.data.data_week); 
                }
            }
            else{ }
        },
        error:function(){}
    });

    //立即支付页面跳转
    $(".new-pay").on('click',function(){
        window.location = "../order/home.html";
    })

    /*menu菜单信息*/
    $.getJSON({
        url:"../../json/menu.json",
        cache:false,
        success:function(result,data){
            if(result.menu.state==200){
                $(".menu_ul").find(".home_des").html(result.menu.home);
                $(".menu_ul").find(".service_des").html(result.menu.service);
                $(".menu_ul").find(".order_des").html(result.menu.order);
                $(".menu_ul").find(".person_des").html(result.menu.person);
                $(".menu_ul").find(".sale_des").html(result.menu.sale);

                //自助二级下单菜单
                $(".server_order_menu").find(".oem_server_des").html(result.menu.oem_service);
                $(".server_order_menu").find(".weld_server_des").html(result.menu.weld_service);

               //合同管理二级菜单
                $(".order_contract_menu").find(".oem_contract_des").html(result.menu.oem_order);
                $(".order_contract_menu").find(".weld_contract_des").html(result.menu.weld_order);

                //售后二级菜单
                $(".sale_ul").find(".select_des").html(result.menu.select_menu);
                $(".sale_ul").find(".oem_des").html(result.menu.oem_menu);
                $(".sale_ul").find(".weld_des").html(result.menu.weld_menu);
            }
        }
    });
});
/*首页功能逻辑结束*/

