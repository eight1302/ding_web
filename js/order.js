/*
*time 2017.10.28
*auth xiaominzhang
*订单管理
*/
$(function(){

  $(".data_oem_1").cxCalendar({
    baseClass: 'cxcalendar_holyday'
  });
  $(".data_oem_2").cxCalendar({
    baseClass: 'cxcalendar_holyday'
  });
  //OEM合同模块开始
	//加载支付流程信息
	$.getJSON({  
        type: "get",  
        url:"../../json/flow.json",  
        async: false, 
        cache:false,
        dataType:"json", 
        success: function(status) {
            console.log(status); 
            if(status.data.state==200){
            	/*加载预付款流程信息*/
               	$.each(status.data.timeline_red, function(idx,obj){
                    var timeline_red;
                    timeline_red='<div class="tow">'+
                        			'<div class="round_red">'+
                        				'<span>'+obj.num+'</span>'+
                        			'</div>'+
                        			'<span>'+obj.title+'</span>'+
                        		'</div>';
                    $(".red_detail").append(timeline_red);
                }); 
                /*加载定金尾款流程信息*/
               	$.each(status.data.timeline_green, function(idx,obj){
                    var timeline_green;
                    timeline_green='<div class="tow">'+
                        			'<div class="round_green">'+
                        				'<span>'+obj.num+'</span>'+
                        			'</div>'+
                        			'<span>'+obj.title+'</span>'+
                        		'</div>';
                    $(".green_detail").append(timeline_green);
                });
            }
        }  
    }); 

	/*显示支付流程*/
	$(".order_flow").mouseover(function (){
		$(".order_flow").css("background","#03a9f4");
        $(".flow").show(); 
        $(".flow").mouseover(function(){
        	$(".flow").show();
        	$(".order_flow").css("background","#03a9f4"); 
        }).mouseout(function(){
        	$(".flow").hide();
        	$(".order_flow").css("background","#c7d1d4");
        });
    }).mouseout(function (){  
        $(".flow").hide();
        $(".order_flow").css("background","#c7d1d4");
   	}); 

   	//主页面展示
   	//默认显示OEM订单管理
   	$(".order_oem_menu").css("background","#03a9f4");
    //OEM订单信息展示
    $.getJSON({  
      type: "get",  
      url:"../../json/oem_reder.json",  
      async: false, 
      cache:false,
      dataType:"json", 
      success: function(status) {
        console.log(status); 
        if(status.data.state==200){
          /*加载OEM合同信息*/
          $.each(status.data.oem, function(idx,obj){
            var oem_html;
            //判断预计交付日期
            oem_html = '<div class="oem_data_detail">'+
                          '<div class="ordinal">'+
                            '<input type="checkbox" name="oem" value="'+obj.id+'">'+
                          '</div>'+
                          '<div class="contract_no">'+obj.contract_no+'</div>'+
                          '<div class="data_order">'+obj.data_order+'</div>'+
                          '<div class="data_play">'+obj.data_play+'</div>'+
                          '<div class="product_name" title="'+obj.product_name+'">'+obj.product_name+'</div>'+
                          '<div class="product_model" title="'+obj.product_model+'">'+obj.product_model+'</div>'+
                          '<div class="product_quantity">'+obj.product_quantity+'</div>'+
                          '<div class="tax">'+obj.tax+'</div>'+
                          '<div class="clients_confirmation">'+
                            '<div class="col-md-12" style="padding: 0;">'+
                              '<div class="col-md-6 user_determine" style="padding: 0;" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'">'+
                                '<span class="icon-ok-circle" style="font-size:18px;line-height: 25px;" title="确认"></span>'+
                              '</div>'+
                              '<div class="col-md-6 user_cancel" style="padding: 0;" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'">'+
                                '<span class="icon-remove" style="font-size:18px;line-height: 25px;" title="取消"></span>'+
                              '</div>'+
                            '</div>'+
                          '</div>'+
                          '<div class="order_status">'+obj.order_status+'</div>'+
                          '<div class="full_payment_rate">'+obj.full_payment_rate+'</div>'+
                          '<div class="down_payment">'+obj.down_payment+'</div>'+
                          '<div class="payment_status">'+obj.payment_status+'</div>'+
                          '<div class="upload_payment">'+
                            '<div class="payment_oem" up_pay_start="'+obj.up_pay_start+'" mode="'+obj.mode+'" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'"><span class=" icon-money" style="font-size:20px;line-height: 24px;" title="上传支付凭证"</span></div>'+
                          '</div>'+
                          '<div class="contract_details" product_id="'+obj.id+'">'+
                            '<div class="conteact_oem" oem_contract_id="'+obj.id+'">合同详情</div>'+
                          '</div>'+
                        '</div>';
            $(".data_detail_oem").append(oem_html);
          });

           //预计交付日期判断
              $(".data_play").each(function(){
                  var play = $(this).html();
                  if(play == "0"){
                    $(this).html("---");
                  }
             });

          var content=40;       //总数
          var pagesize=14;                            //每页显示数据14条
          var pageTotal=Math.ceil(content/pagesize);  //分页数量
          $(".page-left").append('<ul class="pagination" id="page2"></ul>');
          Page({
            num:pageTotal,             //页码数
            startnum:1,
            pagesize:14,             //每页显示的数量
            elem:$('#page2'),       //指定的元素
            callback:function(n){   //回调函数 
                console.log(n);     
            }
          });
        }
      }  
    }); 

    /*获取条件是否含税筛选框的变化*/
    $("#oem_tax").change(function(){
        //预计交付日期判断
        $(".data_play").each(function(){
            var play = $(this).html();
            if(play == "0"){
                $(this).html("---");
            }
        });
      oem_tax = Number($(this).children('option:selected').val());
      switch(oem_tax){
        case 0:
            window.location.reload();
            break;
        case 1:
          $(".data_detail_oem").empty();
           //OEM订单信息展示
          $.getJSON({  
            type: "get",  
            url:"../../json/oem_reder.json",  
            async: false, 
            cache:false,
            dataType:"json", 
            success: function(status) {
              console.log(status); 
              if(status.data.state==200){
                /*加载OEM合同信息*/
                $.each(status.data.tax, function(idx,obj){
                  var oem_html;
                  oem_html = '<div class="oem_data_detail">'+
                                '<div class="ordinal">'+
                                  '<input type="checkbox" name="oem" value="'+obj.id+'">'+
                                '</div>'+
                                '<div class="contract_no">'+obj.contract_no+'</div>'+
                                '<div class="data_order">'+obj.data_order+'</div>'+
                                '<div class="data_play">'+obj.data_play+'</div>'+
                                '<div class="product_name" title="'+obj.product_name+'">'+obj.product_name+'</div>'+
                                '<div class="product_model" title="'+obj.product_model+'">'+obj.product_model+'</div>'+
                                '<div class="product_quantity">'+obj.product_quantity+'</div>'+
                                '<div class="tax">'+obj.tax+'</div>'+
                                '<div class="clients_confirmation">'+
                                  '<div class="col-md-12" style="padding: 0;">'+
                                    '<div class="col-md-6 user_determine" style="padding: 0;" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'">'+
                                      '<span class="icon-ok-circle" style="font-size:18px;line-height: 25px;" title="确认"></span>'+
                                    '</div>'+
                                    '<div class="col-md-6 user_cancel" style="padding: 0;" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'">'+
                                      '<span class="icon-remove" style="font-size:18px;line-height: 25px;" title="取消"></span>'+
                                    '</div>'+
                                  '</div>'+
                                '</div>'+
                                '<div class="order_status">'+obj.order_status+'</div>'+
                                '<div class="full_payment_rate">'+obj.full_payment_rate+'</div>'+
                                '<div class="down_payment">'+obj.down_payment+'</div>'+
                                '<div class="payment_status">'+obj.payment_status+'</div>'+
                                '<div class="upload_payment">'+
                                  '<div class="payment_oem" up_pay_start="'+obj.up_pay_start+'" mode="'+obj.mode+'" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'"><span class=" icon-money" style="font-size:20px;line-height: 24px;" title="上传支付凭证"</span></div>'+
                                '</div>'+
                                '<div class="contract_details" product_id="'+obj.id+'">'+
                                  '<div class="conteact_oem" oem_contract_id="'+obj.id+'">合同详情</div>'+
                                '</div>'+
                              '</div>';
                  $(".data_detail_oem").append(oem_html);
                });
                //预计交付日期判断
                 $(".data_play").each(function(){
                    var play = $(this).html();
                    if(play == "0"){
                        $(this).html("---");
                    }
                });
                var content=status.data.content;       //总数
                var pagesize=14;                            //每页显示数据14条
                var pageTotal=Math.ceil(content/pagesize);  //分页数量
                $(".page-left").append('<ul class="pagination" id="page2"></ul>');
                Page({
                  num:pageTotal,             //页码数
                  startnum:1,
                  pagesize:14,             //每页显示的数量
                  elem:$('#page2'),       //指定的元素
                  callback:function(n){   //回调函数 
                      console.log(n);     
                  }
                });
              }
            }  
          }); 
          break;
          default :
             //OEM订单信息展示
              $(".data_detail_oem").empty();
            $.getJSON({  
              type: "get",  
              url:"../../json/oem_reder.json",  
              async: false, 
              cache:false,
              dataType:"json", 
              success: function(status) {
                console.log(status); 
                if(status.data.state==200){
                  /*加载OEM合同信息*/
                  $.each(status.data.tax_no, function(idx,obj){
                    var oem_html;
                    oem_html = '<div class="oem_data_detail">'+
                                  '<div class="ordinal">'+
                                    '<input type="checkbox" name="oem" value="'+obj.id+'">'+
                                  '</div>'+
                                  '<div class="contract_no">'+obj.contract_no+'</div>'+
                                  '<div class="data_order">'+obj.data_order+'</div>'+
                                  '<div class="data_play">'+obj.data_play+'</div>'+
                                  '<div class="product_name" title="'+obj.product_name+'">'+obj.product_name+'</div>'+
                                  '<div class="product_model" title="'+obj.product_model+'">'+obj.product_model+'</div>'+
                                  '<div class="product_quantity">'+obj.product_quantity+'</div>'+
                                  '<div class="tax">'+obj.tax+'</div>'+
                                  '<div class="clients_confirmation">'+
                                    '<div class="col-md-12" style="padding: 0;">'+
                                      '<div class="col-md-6 user_determine" style="padding: 0;" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'">'+
                                        '<span class="icon-ok-circle" style="font-size:18px;line-height: 25px;" title="确认"></span>'+
                                      '</div>'+
                                      '<div class="col-md-6 user_cancel" style="padding: 0;" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'">'+
                                        '<span class="icon-remove" style="font-size:18px;line-height: 25px;" title="取消"></span>'+
                                      '</div>'+
                                    '</div>'+
                                  '</div>'+
                                  '<div class="order_status">'+obj.order_status+'</div>'+
                                  '<div class="full_payment_rate">'+obj.full_payment_rate+'</div>'+
                                  '<div class="down_payment">'+obj.down_payment+'</div>'+
                                  '<div class="payment_status">'+obj.payment_status+'</div>'+
                                  '<div class="upload_payment">'+
                                    '<div class="payment_oem" up_pay_start="'+obj.up_pay_start+'" mode="'+obj.mode+'" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'"><span class=" icon-money" style="font-size:20px;line-height: 24px;" title="上传支付凭证"</span></div>'+
                                  '</div>'+
                                  '<div class="contract_details" product_id="'+obj.id+'">'+
                                    '<div class="conteact_oem" oem_contract_id="'+obj.id+'">合同详情</div>'+
                                  '</div>'+
                                '</div>';
                    $(".data_detail_oem").append(oem_html);
                  });
                  //预计交付日期判断
                 $(".data_play").each(function(){
                    var play = $(this).html();
                    if(play == "0"){
                        $(this).html("---");
                    }
                });
                  var content=status.data.content;       //总数
                  var pagesize=14;                            //每页显示数据14条
                  var pageTotal=Math.ceil(content/pagesize);  //分页数量
                  $(".page-left").append('<ul class="pagination" id="page2"></ul>');
                  Page({
                    num:pageTotal,             //页码数
                    startnum:1,
                    pagesize:14,             //每页显示的数量
                    elem:$('#page2'),       //指定的元素
                    callback:function(n){   //回调函数 
                        console.log(n);     
                    }
                  });
                }
              }  
            }); 
        }
    });
    
    /*获取条件订单状态筛选框的变化*/
    $("#oem_order_status").change(function(){
        //预计交付日期判断
        $(".data_play").each(function(){
            var play = $(this).html();
            if(play == "0"){
                $(this).html("---");
            }
        });
        oem_payment_status = Number($(this).children('option:selected').val());
        switch(oem_payment_status){
            case 0:
                window.location.reload();
                break;
            case 1:
              $(".data_detail_oem").empty();
               //OEM订单信息展示
              $.getJSON({  
                type: "get",  
                url:"../../json/oem_reder.json",  
                async: false, 
                cache:false,
                dataType:"json", 
                success: function(status) {
                  console.log(status); 
                  if(status.data.state==200){
                    /*加载OEM合同信息*/
                    $.each(status.data.order_xs, function(idx,obj){
                      var oem_html;
                      oem_html = '<div class="oem_data_detail">'+
                                    '<div class="ordinal">'+
                                      '<input type="checkbox" name="oem" value="'+obj.id+'">'+
                                    '</div>'+
                                    '<div class="contract_no">'+obj.contract_no+'</div>'+
                                    '<div class="data_order">'+obj.data_order+'</div>'+
                                    '<div class="data_play">'+obj.data_play+'</div>'+
                                    '<div class="product_name" title="'+obj.product_name+'">'+obj.product_name+'</div>'+
                                    '<div class="product_model" title="'+obj.product_model+'">'+obj.product_model+'</div>'+
                                    '<div class="product_quantity">'+obj.product_quantity+'</div>'+
                                    '<div class="tax">'+obj.tax+'</div>'+
                                    '<div class="clients_confirmation">'+
                                      '<div class="col-md-12" style="padding: 0;">'+
                                        '<div class="col-md-6 user_determine" style="padding: 0;" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'">'+
                                          '<span class="icon-ok-circle" style="font-size:18px;line-height: 25px;" title="确认"></span>'+
                                        '</div>'+
                                        '<div class="col-md-6 user_cancel" style="padding: 0;" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'">'+
                                          '<span class="icon-remove" style="font-size:18px;line-height: 25px;" title="取消"></span>'+
                                        '</div>'+
                                      '</div>'+
                                    '</div>'+
                                    '<div class="order_status">'+obj.order_status+'</div>'+
                                    '<div class="full_payment_rate">'+obj.full_payment_rate+'</div>'+
                                    '<div class="down_payment">'+obj.down_payment+'</div>'+
                                    '<div class="payment_status">'+obj.payment_status+'</div>'+
                                    '<div class="upload_payment">'+
                                      '<div class="payment_oem" up_pay_start="'+obj.up_pay_start+'" mode="'+obj.mode+'" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'"><span class=" icon-money" style="font-size:20px;line-height: 24px;" title="上传支付凭证"</span></div>'+
                                    '</div>'+
                                    '<div class="contract_details" product_id="'+obj.id+'">'+
                                      '<div class="conteact_oem" oem_contract_id="'+obj.id+'">合同详情</div>'+
                                    '</div>'+
                                  '</div>';
                      $(".data_detail_oem").append(oem_html);
                    });
                    //预计交付日期判断
                     $(".data_play").each(function(){
                        var play = $(this).html();
                        if(play == "0"){
                            $(this).html("---");
                        }
                    });
                    var content=status.data.content;       //总数
                    var pagesize=14;                            //每页显示数据14条
                    var pageTotal=Math.ceil(content/pagesize);  //分页数量
                    $(".page-left").append('<ul class="pagination" id="page2"></ul>');
                        Page({
                        num:pageTotal,             //页码数
                        startnum:1,
                        pagesize:14,             //每页显示的数量
                        elem:$('#page2'),       //指定的元素
                        callback:function(n){   //回调函数 
                             console.log(n);     
                            }
                        });
                    }
                }  
            }); 
            break;
            case 2:
                $(".data_detail_oem").empty();
               //OEM订单信息展示
                  $.getJSON({  
                    type: "get",  
                    url:"../../json/oem_reder.json",  
                    async: false, 
                    cache:false,
                    dataType:"json", 
                    success: function(status) {
                      console.log(status); 
                      if(status.data.state==200){
                        /*加载OEM合同信息*/
                        $.each(status.data.order_ud, function(idx,obj){
                          var oem_html;
                          oem_html = '<div class="oem_data_detail">'+
                                        '<div class="ordinal">'+
                                          '<input type="checkbox" name="oem" value="'+obj.id+'">'+
                                        '</div>'+
                                        '<div class="contract_no">'+obj.contract_no+'</div>'+
                                        '<div class="data_order">'+obj.data_order+'</div>'+
                                        '<div class="data_play">'+obj.data_play+'</div>'+
                                        '<div class="product_name" title="'+obj.product_name+'">'+obj.product_name+'</div>'+
                                        '<div class="product_model" title="'+obj.product_model+'">'+obj.product_model+'</div>'+
                                        '<div class="product_quantity">'+obj.product_quantity+'</div>'+
                                        '<div class="tax">'+obj.tax+'</div>'+
                                        '<div class="clients_confirmation">'+
                                          '<div class="col-md-12" style="padding: 0;">'+
                                            '<div class="col-md-6 user_determine" style="padding: 0;" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'">'+
                                              '<span class="icon-ok-circle" style="font-size:18px;line-height: 25px;" title="确认"></span>'+
                                            '</div>'+
                                            '<div class="col-md-6 user_cancel" style="padding: 0;" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'">'+
                                              '<span class="icon-remove" style="font-size:18px;line-height: 25px;" title="取消"></span>'+
                                            '</div>'+
                                          '</div>'+
                                        '</div>'+
                                        '<div class="order_status">'+obj.order_status+'</div>'+
                                        '<div class="full_payment_rate">'+obj.full_payment_rate+'</div>'+
                                        '<div class="down_payment">'+obj.down_payment+'</div>'+
                                        '<div class="payment_status">'+obj.payment_status+'</div>'+
                                        '<div class="upload_payment">'+
                                          '<div class="payment_oem" up_pay_start="'+obj.up_pay_start+'" mode="'+obj.mode+'" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'"><span class=" icon-money" style="font-size:20px;line-height: 24px;" title="上传支付凭证"</span></div>'+
                                        '</div>'+
                                        '<div class="contract_details" product_id="'+obj.id+'">'+
                                          '<div class="conteact_oem" oem_contract_id="'+obj.id+'">合同详情</div>'+
                                        '</div>'+
                                      '</div>';
                          $(".data_detail_oem").append(oem_html);
                        });
                        //预计交付日期判断
                         $(".data_play").each(function(){
                            var play = $(this).html();
                            if(play == "0"){
                                $(this).html("---");
                            }
                        });
                        var content=status.data.content;       //总数
                        var pagesize=14;                            //每页显示数据14条
                        var pageTotal=Math.ceil(content/pagesize);  //分页数量
                        $(".page-left").append('<ul class="pagination" id="page2"></ul>');
                        Page({
                          num:pageTotal,             //页码数
                          startnum:1,
                          pagesize:14,             //每页显示的数量
                          elem:$('#page2'),       //指定的元素
                          callback:function(n){   //回调函数 
                              console.log(n);     
                                }
                            });
                        }
                    }  
                }); 
                break;
                case 3:
                  $(".data_detail_oem").empty();
                   //OEM订单信息展示
                  $.getJSON({  
                    type: "get",  
                    url:"../../json/oem_reder.json",  
                    async: false, 
                    cache:false,
                    dataType:"json", 
                    success: function(status) {
                      console.log(status); 
                      if(status.data.state==200){
                        /*加载OEM合同信息*/
                        $.each(status.data.order_ps, function(idx,obj){
                          var oem_html;
                          oem_html = '<div class="oem_data_detail">'+
                                        '<div class="ordinal">'+
                                          '<input type="checkbox" name="oem" value="'+obj.id+'">'+
                                        '</div>'+
                                        '<div class="contract_no">'+obj.contract_no+'</div>'+
                                        '<div class="data_order">'+obj.data_order+'</div>'+
                                        '<div class="data_play">'+obj.data_play+'</div>'+
                                        '<div class="product_name" title="'+obj.product_name+'">'+obj.product_name+'</div>'+
                                        '<div class="product_model" title="'+obj.product_model+'">'+obj.product_model+'</div>'+
                                        '<div class="product_quantity">'+obj.product_quantity+'</div>'+
                                        '<div class="tax">'+obj.tax+'</div>'+
                                        '<div class="clients_confirmation">'+
                                          '<div class="col-md-12" style="padding: 0;">'+
                                            '<div class="col-md-6 user_determine" style="padding: 0;" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'">'+
                                              '<span class="icon-ok-circle" style="font-size:18px;line-height: 25px;" title="确认"></span>'+
                                            '</div>'+
                                            '<div class="col-md-6 user_cancel" style="padding: 0;" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'">'+
                                              '<span class="icon-remove" style="font-size:18px;line-height: 25px;" title="取消"></span>'+
                                            '</div>'+
                                          '</div>'+
                                        '</div>'+
                                        '<div class="order_status">'+obj.order_status+'</div>'+
                                        '<div class="full_payment_rate">'+obj.full_payment_rate+'</div>'+
                                        '<div class="down_payment">'+obj.down_payment+'</div>'+
                                        '<div class="payment_status">'+obj.payment_status+'</div>'+
                                        '<div class="upload_payment">'+
                                          '<div class="payment_oem" up_pay_start="'+obj.up_pay_start+'" mode="'+obj.mode+'" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'"><span class=" icon-money" style="font-size:20px;line-height: 24px;" title="上传支付凭证"</span></div>'+
                                        '</div>'+
                                        '<div class="contract_details" product_id="'+obj.id+'">'+
                                          '<div class="conteact_oem" oem_contract_id="'+obj.id+'">合同详情</div>'+
                                        '</div>'+
                                      '</div>';
                          $(".data_detail_oem").append(oem_html);
                        });
                            //预计交付日期判断
                         $(".data_play").each(function(){
                            var play = $(this).html();
                            if(play == "0"){
                                $(this).html("---");
                            }
                        });
                        var content=status.data.content;       //总数
                        var pagesize=14;                            //每页显示数据14条
                        var pageTotal=Math.ceil(content/pagesize);  //分页数量
                        $(".page-left").append('<ul class="pagination" id="page2"></ul>');
                            Page({
                            num:pageTotal,             //页码数
                            startnum:1,
                            pagesize:14,             //每页显示的数量
                            elem:$('#page2'),       //指定的元素
                            callback:function(n){   //回调函数 
                                 console.log(n);     
                                }
                            });
                        }
                    }  
                }); 
                break;
                 case 4:
                  $(".data_detail_oem").empty();
                   //OEM订单信息展示
                  $.getJSON({  
                    type: "get",  
                    url:"../../json/oem_reder.json",  
                    async: false, 
                    cache:false,
                    dataType:"json", 
                    success: function(status) {
                      console.log(status); 
                      if(status.data.state==200){
                        /*加载OEM合同信息*/
                        $.each(status.data.order_sc, function(idx,obj){
                          var oem_html;
                          oem_html = '<div class="oem_data_detail">'+
                                        '<div class="ordinal">'+
                                          '<input type="checkbox" name="oem" value="'+obj.id+'">'+
                                        '</div>'+
                                        '<div class="contract_no">'+obj.contract_no+'</div>'+
                                        '<div class="data_order">'+obj.data_order+'</div>'+
                                        '<div class="data_play">'+obj.data_play+'</div>'+
                                        '<div class="product_name" title="'+obj.product_name+'">'+obj.product_name+'</div>'+
                                        '<div class="product_model" title="'+obj.product_model+'">'+obj.product_model+'</div>'+
                                        '<div class="product_quantity">'+obj.product_quantity+'</div>'+
                                        '<div class="tax">'+obj.tax+'</div>'+
                                        '<div class="clients_confirmation">'+
                                          '<div class="col-md-12" style="padding: 0;">'+
                                            '<div class="col-md-6 user_determine" style="padding: 0;" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'">'+
                                              '<span class="icon-ok-circle" style="font-size:18px;line-height: 25px;" title="确认"></span>'+
                                            '</div>'+
                                            '<div class="col-md-6 user_cancel" style="padding: 0;" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'">'+
                                              '<span class="icon-remove" style="font-size:18px;line-height: 25px;" title="取消"></span>'+
                                            '</div>'+
                                          '</div>'+
                                        '</div>'+
                                        '<div class="order_status">'+obj.order_status+'</div>'+
                                        '<div class="full_payment_rate">'+obj.full_payment_rate+'</div>'+
                                        '<div class="down_payment">'+obj.down_payment+'</div>'+
                                        '<div class="payment_status">'+obj.payment_status+'</div>'+
                                        '<div class="upload_payment">'+
                                          '<div class="payment_oem" up_pay_start="'+obj.up_pay_start+'" mode="'+obj.mode+'" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'"><span class=" icon-money" style="font-size:20px;line-height: 24px;" title="上传支付凭证"</span></div>'+
                                        '</div>'+
                                        '<div class="contract_details" product_id="'+obj.id+'">'+
                                          '<div class="conteact_oem" oem_contract_id="'+obj.id+'">合同详情</div>'+
                                        '</div>'+
                                      '</div>';
                          $(".data_detail_oem").append(oem_html);
                        });
                        //预计交付日期判断
                         $(".data_play").each(function(){
                            var play = $(this).html();
                            if(play == "0"){
                                $(this).html("---");
                            }
                        });
                        var content=status.data.content;       //总数
                        var pagesize=14;                            //每页显示数据14条
                        var pageTotal=Math.ceil(content/pagesize);  //分页数量
                        $(".page-left").append('<ul class="pagination" id="page2"></ul>');
                            Page({
                            num:pageTotal,             //页码数
                            startnum:1,
                            pagesize:14,             //每页显示的数量
                            elem:$('#page2'),       //指定的元素
                            callback:function(n){   //回调函数 
                                 console.log(n);     
                                }
                            });
                        }
                    }  
                }); 
                break;
                 case 5:
                  $(".data_detail_oem").empty();
                   //OEM订单信息展示
                  $.getJSON({  
                    type: "get",  
                    url:"../../json/oem_reder.json",  
                    async: false, 
                    cache:false,
                    dataType:"json", 
                    success: function(status) {
                      console.log(status); 
                      if(status.data.state==200){
                        /*加载OEM合同信息*/
                        $.each(status.data.order_fh, function(idx,obj){
                          var oem_html;
                          oem_html = '<div class="oem_data_detail">'+
                                        '<div class="ordinal">'+
                                          '<input type="checkbox" name="oem" value="'+obj.id+'">'+
                                        '</div>'+
                                        '<div class="contract_no">'+obj.contract_no+'</div>'+
                                        '<div class="data_order">'+obj.data_order+'</div>'+
                                        '<div class="data_play">'+obj.data_play+'</div>'+
                                        '<div class="product_name" title="'+obj.product_name+'">'+obj.product_name+'</div>'+
                                        '<div class="product_model" title="'+obj.product_model+'">'+obj.product_model+'</div>'+
                                        '<div class="product_quantity">'+obj.product_quantity+'</div>'+
                                        '<div class="tax">'+obj.tax+'</div>'+
                                        '<div class="clients_confirmation">'+
                                          '<div class="col-md-12" style="padding: 0;">'+
                                            '<div class="col-md-6 user_determine" style="padding: 0;" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'">'+
                                              '<span class="icon-ok-circle" style="font-size:18px;line-height: 25px;" title="确认"></span>'+
                                            '</div>'+
                                            '<div class="col-md-6 user_cancel" style="padding: 0;" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'">'+
                                              '<span class="icon-remove" style="font-size:18px;line-height: 25px;" title="取消"></span>'+
                                            '</div>'+
                                          '</div>'+
                                        '</div>'+
                                        '<div class="order_status">'+obj.order_status+'</div>'+
                                        '<div class="full_payment_rate">'+obj.full_payment_rate+'</div>'+
                                        '<div class="down_payment">'+obj.down_payment+'</div>'+
                                        '<div class="payment_status">'+obj.payment_status+'</div>'+
                                        '<div class="upload_payment">'+
                                          '<div class="payment_oem" up_pay_start="'+obj.up_pay_start+'" mode="'+obj.mode+'" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'"><span class=" icon-money" style="font-size:20px;line-height: 24px;" title="上传支付凭证"</span></div>'+
                                        '</div>'+
                                        '<div class="contract_details" product_id="'+obj.id+'">'+
                                          '<div class="conteact_oem" oem_contract_id="'+obj.id+'">合同详情</div>'+
                                        '</div>'+
                                      '</div>';
                          $(".data_detail_oem").append(oem_html);
                        });
                        //预计交付日期判断
                         $(".data_play").each(function(){
                            var play = $(this).html();
                            if(play == "0"){
                                $(this).html("---");
                            }
                        });
                        var content=status.data.content;       //总数
                        var pagesize=14;                            //每页显示数据14条
                        var pageTotal=Math.ceil(content/pagesize);  //分页数量
                        $(".page-left").append('<ul class="pagination" id="page2"></ul>');
                            Page({
                            num:pageTotal,             //页码数
                            startnum:1,
                            pagesize:14,             //每页显示的数量
                            elem:$('#page2'),       //指定的元素
                            callback:function(n){   //回调函数 
                                 console.log(n);     
                                }
                            });
                        }
                    }  
                }); 
                break;
                 case 6:
                  $(".data_detail_oem").empty();
                   //OEM订单信息展示
                  $.getJSON({  
                    type: "get",  
                    url:"../../json/oem_reder.json",  
                    async: false, 
                    cache:false,
                    dataType:"json", 
                    success: function(status) {
                      console.log(status); 
                      if(status.data.state==200){
                        /*加载OEM合同信息*/
                        $.each(status.data.order_sd, function(idx,obj){
                          var oem_html;
                          oem_html = '<div class="oem_data_detail">'+
                                        '<div class="ordinal">'+
                                          '<input type="checkbox" name="oem" value="'+obj.id+'">'+
                                        '</div>'+
                                        '<div class="contract_no">'+obj.contract_no+'</div>'+
                                        '<div class="data_order">'+obj.data_order+'</div>'+
                                        '<div class="data_play">'+obj.data_play+'</div>'+
                                        '<div class="product_name" title="'+obj.product_name+'">'+obj.product_name+'</div>'+
                                        '<div class="product_model" title="'+obj.product_model+'">'+obj.product_model+'</div>'+
                                        '<div class="product_quantity">'+obj.product_quantity+'</div>'+
                                        '<div class="tax">'+obj.tax+'</div>'+
                                        '<div class="clients_confirmation">'+
                                          '<div class="col-md-12" style="padding: 0;">'+
                                            '<div class="col-md-6 user_determine" style="padding: 0;" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'">'+
                                              '<span class="icon-ok-circle" style="font-size:18px;line-height: 25px;" title="确认"></span>'+
                                            '</div>'+
                                            '<div class="col-md-6 user_cancel" style="padding: 0;" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'">'+
                                              '<span class="icon-remove" style="font-size:18px;line-height: 25px;" title="取消"></span>'+
                                            '</div>'+
                                          '</div>'+
                                        '</div>'+
                                        '<div class="order_status">'+obj.order_status+'</div>'+
                                        '<div class="full_payment_rate">'+obj.full_payment_rate+'</div>'+
                                        '<div class="down_payment">'+obj.down_payment+'</div>'+
                                        '<div class="payment_status">'+obj.payment_status+'</div>'+
                                        '<div class="upload_payment">'+
                                          '<div class="payment_oem" up_pay_start="'+obj.up_pay_start+'" mode="'+obj.mode+'" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'"><span class=" icon-money" style="font-size:20px;line-height: 24px;" title="上传支付凭证"</span></div>'+
                                        '</div>'+
                                        '<div class="contract_details" product_id="'+obj.id+'">'+
                                          '<div class="conteact_oem" oem_contract_id="'+obj.id+'">合同详情</div>'+
                                        '</div>'+
                                      '</div>';
                          $(".data_detail_oem").append(oem_html);
                        });
                        //预计交付日期判断
                         $(".data_play").each(function(){
                            var play = $(this).html();
                            if(play == "0"){
                                $(this).html("---");
                            }
                        });
                        var content=status.data.content;       //总数
                        var pagesize=14;                            //每页显示数据14条
                        var pageTotal=Math.ceil(content/pagesize);  //分页数量
                        $(".page-left").append('<ul class="pagination" id="page2"></ul>');
                            Page({
                            num:pageTotal,             //页码数
                            startnum:1,
                            pagesize:14,             //每页显示的数量
                            elem:$('#page2'),       //指定的元素
                            callback:function(n){   //回调函数 
                                 console.log(n);     
                                }
                            });
                        }
                    }  
                }); 
                break;
                 case 7:
                  $(".data_detail_oem").empty();
                   //OEM订单信息展示
                  $.getJSON({  
                    type: "get",  
                    url:"../../json/oem_reder.json",  
                    async: false, 
                    cache:false,
                    dataType:"json", 
                    success: function(status) {
                      console.log(status); 
                      if(status.data.state==200){
                        /*加载OEM合同信息*/
                        $.each(status.data.order_fx, function(idx,obj){
                          var oem_html;
                          oem_html = '<div class="oem_data_detail">'+
                                        '<div class="ordinal">'+
                                          '<input type="checkbox" name="oem" value="'+obj.id+'">'+
                                        '</div>'+
                                        '<div class="contract_no">'+obj.contract_no+'</div>'+
                                        '<div class="data_order">'+obj.data_order+'</div>'+
                                        '<div class="data_play">'+obj.data_play+'</div>'+
                                        '<div class="product_name" title="'+obj.product_name+'">'+obj.product_name+'</div>'+
                                        '<div class="product_model" title="'+obj.product_model+'">'+obj.product_model+'</div>'+
                                        '<div class="product_quantity">'+obj.product_quantity+'</div>'+
                                        '<div class="tax">'+obj.tax+'</div>'+
                                        '<div class="clients_confirmation">'+
                                          '<div class="col-md-12" style="padding: 0;">'+
                                            '<div class="col-md-6 user_determine" style="padding: 0;" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'">'+
                                              '<span class="icon-ok-circle" style="font-size:18px;line-height: 25px;" title="确认"></span>'+
                                            '</div>'+
                                            '<div class="col-md-6 user_cancel" style="padding: 0;" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'">'+
                                              '<span class="icon-remove" style="font-size:18px;line-height: 25px;" title="取消"></span>'+
                                            '</div>'+
                                          '</div>'+
                                        '</div>'+
                                        '<div class="order_status">'+obj.order_status+'</div>'+
                                        '<div class="full_payment_rate">'+obj.full_payment_rate+'</div>'+
                                        '<div class="down_payment">'+obj.down_payment+'</div>'+
                                        '<div class="payment_status">'+obj.payment_status+'</div>'+
                                        '<div class="upload_payment">'+
                                          '<div class="payment_oem" up_pay_start="'+obj.up_pay_start+'" mode="'+obj.mode+'" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'"><span class=" icon-money" style="font-size:20px;line-height: 24px;" title="上传支付凭证"</span></div>'+
                                        '</div>'+
                                        '<div class="contract_details" product_id="'+obj.id+'">'+
                                          '<div class="conteact_oem" oem_contract_id="'+obj.id+'">合同详情</div>'+
                                        '</div>'+
                                      '</div>';
                          $(".data_detail_oem").append(oem_html);
                        });
                        //预计交付日期判断
                         $(".data_play").each(function(){
                            var play = $(this).html();
                            if(play == "0"){
                                $(this).html("---");
                            }
                        });
                        var content=status.data.content;       //总数
                        var pagesize=14;                            //每页显示数据14条
                        var pageTotal=Math.ceil(content/pagesize);  //分页数量
                        $(".page-left").append('<ul class="pagination" id="page2"></ul>');
                            Page({
                            num:pageTotal,             //页码数
                            startnum:1,
                            pagesize:14,             //每页显示的数量
                            elem:$('#page2'),       //指定的元素
                            callback:function(n){   //回调函数 
                                 console.log(n);     
                                }
                            });
                        }
                    }  
                }); 
                break;
                default :
                    //OEM订单信息展示
                    $(".data_detail_oem").empty();
                    $.getJSON({  
                    type: "get",  
                    url:"../../json/oem_reder.json",  
                    async: false, 
                    cache:false,
                    dataType:"json", 
                    success: function(status) {
                        console.log(status); 
                        if(status.data.state==200){
                        /*加载OEM合同信息*/
                         $.each(status.data.order_bfqs, function(idx,obj){
                            var oem_html;
                            oem_html = '<div class="oem_data_detail">'+
                                      '<div class="ordinal">'+
                                        '<input type="checkbox" name="oem" value="'+obj.id+'">'+
                                      '</div>'+
                                      '<div class="contract_no">'+obj.contract_no+'</div>'+
                                      '<div class="data_order">'+obj.data_order+'</div>'+
                                      '<div class="data_play">'+obj.data_play+'</div>'+
                                      '<div class="product_name" title="'+obj.product_name+'">'+obj.product_name+'</div>'+
                                      '<div class="product_model" title="'+obj.product_model+'">'+obj.product_model+'</div>'+
                                      '<div class="product_quantity">'+obj.product_quantity+'</div>'+
                                      '<div class="tax">'+obj.tax+'</div>'+
                                      '<div class="clients_confirmation">'+
                                        '<div class="col-md-12" style="padding: 0;">'+
                                          '<div class="col-md-6 user_determine" style="padding: 0;" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'">'+
                                            '<span class="icon-ok-circle" style="font-size:18px;line-height: 25px;" title="确认"></span>'+
                                          '</div>'+
                                          '<div class="col-md-6 user_cancel" style="padding: 0;" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'">'+
                                            '<span class="icon-remove" style="font-size:18px;line-height: 25px;" title="取消"></span>'+
                                          '</div>'+
                                        '</div>'+
                                      '</div>'+
                                      '<div class="order_status">'+obj.order_status+'</div>'+
                                      '<div class="full_payment_rate">'+obj.full_payment_rate+'</div>'+
                                      '<div class="down_payment">'+obj.down_payment+'</div>'+
                                      '<div class="payment_status">'+obj.payment_status+'</div>'+
                                      '<div class="upload_payment">'+
                                        '<div class="payment_oem" up_pay_start="'+obj.up_pay_start+'" mode="'+obj.mode+'" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'"><span class=" icon-money" style="font-size:20px;line-height: 24px;" title="上传支付凭证"</span></div>'+
                                      '</div>'+
                                      '<div class="contract_details" product_id="'+obj.id+'">'+
                                        '<div class="conteact_oem" oem_contract_id="'+obj.id+'">合同详情</div>'+
                                      '</div>'+
                                    '</div>';
                            $(".data_detail_oem").append(oem_html);
                        });
                         //预计交付日期判断
                         $(".data_play").each(function(){
                            var play = $(this).html();
                            if(play == "0"){
                                $(this).html("---");
                            }
                        });
                        var content=status.data.content;       //总数
                        var pagesize=14;                            //每页显示数据14条
                        var pageTotal=Math.ceil(content/pagesize);  //分页数量
                        $(".page-left").append('<ul class="pagination" id="page2"></ul>');
                        Page({
                            num:pageTotal,             //页码数
                            startnum:1,
                            pagesize:14,             //每页显示的数量
                            elem:$('#page2'),       //指定的元素
                            callback:function(n){   //回调函数 
                                console.log(n);     
                            }
                        });
                    }
                }  
            }); 
        }
    });

    /*获取条件付款状态筛选框的变换*/
    $("#oem_payment_status").change(function(){
        //预计交付日期判断
        $(".data_play").each(function(){
            var play = $(this).html();
            if(play == "0"){
                $(this).html("---");
                }
            });
        oem_payment_status = Number($(this).children('option:selected').val());
        switch(oem_payment_status){
            case 0:
                window.location.reload();
                break;
            case 1:
              $(".data_detail_oem").empty();
               //OEM订单信息展示
              $.getJSON({  
                type: "get",  
                url:"../../json/oem_reder.json",  
                async: false, 
                cache:false,
                dataType:"json", 
                success: function(status) {
                  console.log(status); 
                  if(status.data.state==200){
                    /*加载OEM合同信息*/
                    $.each(status.data.peymet_some, function(idx,obj){
                      var oem_html;
                      oem_html = '<div class="oem_data_detail">'+
                                    '<div class="ordinal">'+
                                      '<input type="checkbox" name="oem" value="'+obj.id+'">'+
                                    '</div>'+
                                    '<div class="contract_no">'+obj.contract_no+'</div>'+
                                    '<div class="data_order">'+obj.data_order+'</div>'+
                                    '<div class="data_play">'+obj.data_play+'</div>'+
                                    '<div class="product_name" title="'+obj.product_name+'">'+obj.product_name+'</div>'+
                                    '<div class="product_model" title="'+obj.product_model+'">'+obj.product_model+'</div>'+
                                    '<div class="product_quantity">'+obj.product_quantity+'</div>'+
                                    '<div class="tax">'+obj.tax+'</div>'+
                                    '<div class="clients_confirmation">'+
                                      '<div class="col-md-12" style="padding: 0;">'+
                                        '<div class="col-md-6 user_determine" style="padding: 0;" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'">'+
                                          '<span class="icon-ok-circle" style="font-size:18px;line-height: 25px;" title="确认"></span>'+
                                        '</div>'+
                                        '<div class="col-md-6 user_cancel" style="padding: 0;" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'">'+
                                          '<span class="icon-remove" style="font-size:18px;line-height: 25px;" title="取消"></span>'+
                                        '</div>'+
                                      '</div>'+
                                    '</div>'+
                                    '<div class="order_status">'+obj.order_status+'</div>'+
                                    '<div class="full_payment_rate">'+obj.full_payment_rate+'</div>'+
                                    '<div class="down_payment">'+obj.down_payment+'</div>'+
                                    '<div class="payment_status">'+obj.payment_status+'</div>'+
                                    '<div class="upload_payment">'+
                                      '<div class="payment_oem" up_pay_start="'+obj.up_pay_start+'" mode="'+obj.mode+'" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'"><span class=" icon-money" style="font-size:20px;line-height: 24px;" title="上传支付凭证"</span></div>'+
                                    '</div>'+
                                    '<div class="contract_details" product_id="'+obj.id+'">'+
                                      '<div class="conteact_oem" oem_contract_id="'+obj.id+'">合同详情</div>'+
                                    '</div>'+
                                  '</div>';
                      $(".data_detail_oem").append(oem_html);
                    });
                     //预计交付日期判断
                     $(".data_play").each(function(){
                        var play = $(this).html();
                        if(play == "0"){
                            $(this).html("---");
                        }
                    });
                    var content=status.data.content;       //总数
                    var pagesize=14;                            //每页显示数据14条
                    var pageTotal=Math.ceil(content/pagesize);  //分页数量
                    $(".page-left").append('<ul class="pagination" id="page2"></ul>');
                        Page({
                        num:pageTotal,             //页码数
                        startnum:1,
                        pagesize:14,             //每页显示的数量
                        elem:$('#page2'),       //指定的元素
                        callback:function(n){   //回调函数 
                             console.log(n);     
                            }
                        });
                    }
                }  
            }); 
            break;
            case 2:
                $(".data_detail_oem").empty();
               //OEM订单信息展示
                  $.getJSON({  
                    type: "get",  
                    url:"../../json/oem_reder.json",  
                    async: false, 
                    cache:false,
                    dataType:"json", 
                    success: function(status) {
                      console.log(status); 
                      if(status.data.state==200){
                        /*加载OEM合同信息*/
                        $.each(status.data.peymet_all, function(idx,obj){
                          var oem_html;
                          oem_html = '<div class="oem_data_detail">'+
                                        '<div class="ordinal">'+
                                          '<input type="checkbox" name="oem" value="'+obj.id+'">'+
                                        '</div>'+
                                        '<div class="contract_no">'+obj.contract_no+'</div>'+
                                        '<div class="data_order">'+obj.data_order+'</div>'+
                                        '<div class="data_play">'+obj.data_play+'</div>'+
                                        '<div class="product_name" title="'+obj.product_name+'">'+obj.product_name+'</div>'+
                                        '<div class="product_model" title="'+obj.product_model+'">'+obj.product_model+'</div>'+
                                        '<div class="product_quantity">'+obj.product_quantity+'</div>'+
                                        '<div class="tax">'+obj.tax+'</div>'+
                                        '<div class="clients_confirmation">'+
                                          '<div class="col-md-12" style="padding: 0;">'+
                                            '<div class="col-md-6 user_determine" style="padding: 0;" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'">'+
                                              '<span class="icon-ok-circle" style="font-size:18px;line-height: 25px;" title="确认"></span>'+
                                            '</div>'+
                                            '<div class="col-md-6 user_cancel" style="padding: 0;" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'">'+
                                              '<span class="icon-remove" style="font-size:18px;line-height: 25px;" title="取消"></span>'+
                                            '</div>'+
                                          '</div>'+
                                        '</div>'+
                                        '<div class="order_status">'+obj.order_status+'</div>'+
                                        '<div class="full_payment_rate">'+obj.full_payment_rate+'</div>'+
                                        '<div class="down_payment">'+obj.down_payment+'</div>'+
                                        '<div class="payment_status">'+obj.payment_status+'</div>'+
                                        '<div class="upload_payment">'+
                                          '<div class="payment_oem" up_pay_start="'+obj.up_pay_start+'" mode="'+obj.mode+'" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'"><span class=" icon-money" style="font-size:20px;line-height: 24px;" title="上传支付凭证"</span></div>'+
                                        '</div>'+
                                        '<div class="contract_details" product_id="'+obj.id+'">'+
                                          '<div class="conteact_oem" oem_contract_id="'+obj.id+'">合同详情</div>'+
                                        '</div>'+
                                      '</div>';
                          $(".data_detail_oem").append(oem_html);
                        });
                        //预计交付日期判断
                         $(".data_play").each(function(){
                            var play = $(this).html();
                            if(play == "0"){
                                $(this).html("---");
                            }
                        });
                        var content=status.data.content;       //总数
                        var pagesize=14;                            //每页显示数据14条
                        var pageTotal=Math.ceil(content/pagesize);  //分页数量
                        $(".page-left").append('<ul class="pagination" id="page2"></ul>');
                        Page({
                          num:pageTotal,             //页码数
                          startnum:1,
                          pagesize:14,             //每页显示的数量
                          elem:$('#page2'),       //指定的元素
                          callback:function(n){   //回调函数 
                              console.log(n);     
                                }
                            });
                        }
                    }  
                }); 
                break;
                default :
                    //OEM订单信息展示
                    $(".data_detail_oem").empty();
                    $.getJSON({  
                    type: "get",  
                    url:"../../json/oem_reder.json",  
                    async: false, 
                    cache:false,
                    dataType:"json", 
                    success: function(status) {
                        console.log(status); 
                        if(status.data.state==200){
                        /*加载OEM合同信息*/
                         $.each(status.data.peymet_no, function(idx,obj){
                            var oem_html;
                            oem_html = '<div class="oem_data_detail">'+
                                      '<div class="ordinal">'+
                                        '<input type="checkbox" name="oem" value="'+obj.id+'">'+
                                      '</div>'+
                                      '<div class="contract_no">'+obj.contract_no+'</div>'+
                                      '<div class="data_order">'+obj.data_order+'</div>'+
                                      '<div class="data_play">'+obj.data_play+'</div>'+
                                      '<div class="product_name" title="'+obj.product_name+'">'+obj.product_name+'</div>'+
                                      '<div class="product_model" title="'+obj.product_model+'">'+obj.product_model+'</div>'+
                                      '<div class="product_quantity">'+obj.product_quantity+'</div>'+
                                      '<div class="tax">'+obj.tax+'</div>'+
                                      '<div class="clients_confirmation">'+
                                        '<div class="col-md-12" style="padding: 0;">'+
                                          '<div class="col-md-6 user_determine" style="padding: 0;" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'">'+
                                            '<span class="icon-ok-circle" style="font-size:18px;line-height: 25px;" title="确认"></span>'+
                                          '</div>'+
                                          '<div class="col-md-6 user_cancel" style="padding: 0;" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'">'+
                                            '<span class="icon-remove" style="font-size:18px;line-height: 25px;" title="取消"></span>'+
                                          '</div>'+
                                        '</div>'+
                                      '</div>'+
                                      '<div class="order_status">'+obj.order_status+'</div>'+
                                      '<div class="full_payment_rate">'+obj.full_payment_rate+'</div>'+
                                      '<div class="down_payment">'+obj.down_payment+'</div>'+
                                      '<div class="payment_status">'+obj.payment_status+'</div>'+
                                      '<div class="upload_payment">'+
                                        '<div class="payment_oem" up_pay_start="'+obj.up_pay_start+'" mode="'+obj.mode+'" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'"><span class=" icon-money" style="font-size:20px;line-height: 24px;" title="上传支付凭证"</span></div>'+
                                      '</div>'+
                                      '<div class="contract_details" product_id="'+obj.id+'">'+
                                        '<div class="conteact_oem" oem_contract_id="'+obj.id+'">合同详情</div>'+
                                      '</div>'+
                                    '</div>';
                            $(".data_detail_oem").append(oem_html);
                        });
                         //预计交付日期判断
                         $(".data_play").each(function(){
                            var play = $(this).html();
                            if(play == "0"){
                                $(this).html("---");
                            }
                        });
                        var content=status.data.content;       //总数
                        var pagesize=14;                            //每页显示数据14条
                        var pageTotal=Math.ceil(content/pagesize);  //分页数量
                        $(".page-left").append('<ul class="pagination" id="page2"></ul>');
                        Page({
                            num:pageTotal,             //页码数
                            startnum:1,
                            pagesize:14,             //每页显示的数量
                            elem:$('#page2'),       //指定的元素
                            callback:function(n){   //回调函数 
                                console.log(n);     
                            }
                        });
                    }
                }  
            }); 
        }
    });


    //确认按钮判断状态
    $(".user_determine").each(function(){
        var determine = $(this).attr("user_determine_start");
        if(determine == "1"){
            $(this).attr({"disabled":"disabled"});
            $(this).css("background","#bfbfbf");
        }
     });
    //取消按钮判断状态
    $(".user_cancel").each(function(){
        var determine = $(this).attr("user_determine_start");
        if(determine == "1"){
            $(this).attr({"disabled":"disabled"});
            $(this).css("background","#bfbfbf");
            $(this).attr('disabled',"true");
        }
    });
     //上传支付凭证判断状态
    $(".payment_oem").each(function(){
        var up_pay_start = $(this).attr("up_pay_start");
        var determine = $(this).attr("user_determine_start");
        if(determine == "0" || up_pay_start == "1"){
            $(this).attr({"disabled":"disabled"});
            $(this).css("background","#bfbfbf");
        }
    });
    $(".product_name").each(function(){
        var news_maxwidth=5;
        if($(this).text().length>news_maxwidth){
            $(this).text($(this).text().substring(0,news_maxwidth));
            $(this).html($(this).html()+'…');
        }
    });
    $(".product_model").each(function(){
        var news_maxwidth=5;
        if($(this).text().length>news_maxwidth){
            $(this).text($(this).text().substring(0,news_maxwidth));
            $(this).html($(this).html()+'…');
        }
    });



    //获取OEM订单时间段查询
    $(".search_ome_btn").on('click',function(){
      var data_oem_1 = $("#data_oem_1").val(),
          data_oem_2 = $("#data_oem_2").val();

      var oem_data = {
        "data_oem_1" : data_oem_1,
        "data_oem_2" : data_oem_2
      };

      //判断时间段是否为空
      if(data_oem_1 == "" || data_oem_2 == ""){
        return false;
      }
       $(".data_detail_oem").empty();
      //展示时间段OEM数据信息
      $.getJSON({
          type: "get",  
          url:"../../json/oem_reder.json", 
          data : oem_data,
          async: false, 
          cache:false,
          dataType:"json", 
          success: function(status) {
            console.log(status); 
             if(status.data.state==200){
          /*加载OEM合同信息*/
          $.each(status.data.oem, function(idx,obj){
                var oem_html;
                oem_html = '<div class="oem_data_detail">'+
                              '<div class="ordinal">'+
                                '<input type="checkbox" name="oem" value="'+obj.id+'">'+
                              '</div>'+
                              '<div class="contract_no">'+obj.contract_no+'</div>'+
                              '<div class="data_order">'+obj.data_order+'</div>'+
                              '<div class="data_play">'+obj.data_play+'</div>'+
                              '<div class="product_name" title="'+obj.product_name+'">'+obj.product_name+'</div>'+
                              '<div class="product_model" title="'+obj.product_model+'">'+obj.product_model+'</div>'+
                              '<div class="product_quantity">'+obj.product_quantity+'</div>'+
                              '<div class="tax">'+obj.tax+'</div>'+
                              '<div class="clients_confirmation">'+
                                '<div class="col-md-12" style="padding: 0;">'+
                                  '<div class="col-md-6 user_determine" style="padding: 0;" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'">'+
                                   '<span class="icon-ok-circle" style="font-size:18px;line-height: 25px;" title="确认"></span>'+
                                  '</div>'+
                                  '<div class="col-md-6 user_cancel" style="padding: 0;" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'">'+
                                     '<span class="icon-remove" style="font-size:18px;line-height: 25px;" title="取消"></span>'+
                                  '</div>'+
                                '</div>'+
                              '</div>'+
                              '<div class="order_status">'+obj.order_status+'</div>'+
                              '<div class="full_payment_rate">'+obj.full_payment_rate+'</div>'+
                              '<div class="down_payment">'+obj.down_payment+'</div>'+
                              '<div class="payment_status">'+obj.payment_status+'</div>'+
                              '<div class="upload_payment">'+
                                  '<div class="payment_oem" up_pay_start="'+obj.up_pay_start+'" mode="'+obj.mode+'" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'"><span class=" icon-money" style="font-size:20px;line-height: 24px;" title="上传支付凭证"</span></div>'+
                              '</div>'+
                              '<div class="contract_details" product_id="'+obj.id+'">'+
                                '<div class="conteact_oem" oem_contract_id="'+obj.id+'">合同详情</div>'+
                              '</div>'+
                            '</div>';
                $(".data_detail_oem").append(oem_html);
              });
            }
          }  
         });

         //确认按钮判断状态
        $(".user_determine").each(function(){
            var determine = $(this).attr("user_determine_start");
            if(determine == "1"){
                $(this).attr({"disabled":"disabled"});
                $(this).css("background","#bfbfbf");
            }
         });
        //取消按钮判断状态
        $(".user_cancel").each(function(){
            var determine = $(this).attr("user_determine_start");
            if(determine == "1"){
                $(this).attr({"disabled":"disabled"});
                $(this).css("background","#bfbfbf");
                $(this).attr('disabled',"true");
            }
        });
         //上传支付凭证判断状态
        $(".payment_oem").each(function(){
            var up_pay_start = $(this).attr("up_pay_start");
            var determine = $(this).attr("user_determine_start");
            if(determine == "0" || up_pay_start == "1"){
                $(this).attr({"disabled":"disabled"});
                $(this).css("background","#bfbfbf");
            }
        });
        $(".product_name").each(function(){
            var news_maxwidth=5;
            if($(this).text().length>news_maxwidth){
                $(this).text($(this).text().substring(0,news_maxwidth));
                $(this).html($(this).html()+'…');
            }
        });
        $(".product_model").each(function(){
            var news_maxwidth=5;
            if($(this).text().length>news_maxwidth){
                $(this).text($(this).text().substring(0,news_maxwidth));
                $(this).html($(this).html()+'…');
            }
        });
    });

    //删除OEM合同信息
    $(".oem_delete").on('click',function(){
      var oem_contracts = [];
        var oems = $("input[name='oem']");
        $.each(oems,function(key,obj){
            if(obj.checked){
                var oem_contract_id = Number(obj.value);
                oem_contracts.push(oem_contract_id);
            }
        });
        if(oem_contracts.length>0){
           swal({
            title: "您确定要删除本合同以及合同下的产品吗？",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#7B69B3",
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnConfirm: false
            },function(isConfirm){
                if(isConfirm){
                    var dataID={
                        "oem_contracts" : oem_contracts
                    }
                    $.getJSON({
                        url:"../../json/data.json",
                        cache:false,
                        data:dataID,
                        success:function(result){
                            swal("删除成功!");
                            window.location.reload();
                        }
                    });
                }
            })
        }else{
            swal("请选择删除的数据!");
        }
    });

    //确认订单
    $(".user_determine").on('click',function(sweetalert){
        var oem_id= $(this).attr("oem_contract_id");
        var determine = $(this).attr("user_determine_start");
        console.log(oem_id);
         var oem_id={
            "oem_id":oem_id
        };
        if(determine == "0"){
            //数据交互
             $.getJSON({  
                type: "get",  
                url:"../../json/oem_contrat_detail.json",
                data: oem_id,
                async: false, 
                cache:false,
                dataType:"json", 
                success: function(status) {
                  console.log(status); 
                    if(status.data.state==200){
                    /*加载OEM合同信息*/
                       swal({ 
                            title: "点击确认,将执行产品生产", 
                            text: "请尽快上传支付凭证或联系客服!", 
                            timer: 1500, 
                            showConfirmButton: false 
                        });

                    }
                    setTimeout(function(){  //使用  setTimeout（）方法设定定时2000毫秒
                        window.location.reload();//页面刷新
                    },1500);
                }  
            });
        }
    });

    //取消订单
     $(".user_cancel").on('click',function(sweetalert){
        var oem_id= $(this).attr("oem_contract_id");
        var determine = $(this).attr("user_determine_start");
        $(this).css("background","#bfbfbf");
        console.log(oem_id);
         var oem_id={
            "oem_id":oem_id
        };
        if(determine == "0"){
          $(this).parent().parent().parent().remove();
            //数据交互
             $.getJSON({  
                type: "get",  
                url:"../../json/oem_contrat_detail.json",
                async: false, 
                cache:false,
                data : oem_id,
                dataType:"json", 
                success: function(status) {
                  console.log(status); 
                    if(status.data.state==200){
                    /*加载OEM合同信息*/
                       swal({ 
                            title: "合同已取消!", 
                            text: "本合将任务作废，删除!", 
                            timer: 3000, 
                            showConfirmButton: false 
                        });
                    }
                    
                }  
            });
        }
    });

    //上传支付凭证
    $(".payment_oem").on('click',function(sweetalert){
        //判断状态
        var determine = $(this).attr("user_determine_start");
        var oem_id= $(this).attr("oem_contract_id");
        if(determine == "1"){
            var mode = $(this).attr("mode");
            var up_pay_start = $(this).attr("up_pay_start");
            if(up_pay_start == -1){
              //未付款
                $(".overlay_num1").show();
                if(mode == 0){
                    //没有选择方式
                    $(".method").show();
                    var method = 1;
                    //默认选择状态
                    $("#all_pay").prop("checked",true);
                    var first_pay = $("#forst_pay").prop("checked"),
                        all_pay = $("#all_pay").prop("checked");
                    //支付方式判断
                    if(all_pay == true){
                        all_pay = 1;
                        first_pay =0;
                    }
                    if(first_pay == true){
                        all_pay = 0;
                        first_pay =1;
                    }
                    var data_method_after = {
                        "oem_id" : oem_id,
                        "method" : method,
                        "all_pay" : all_pay,
                        "first_pay" : first_pay
                    };
                    //之后上传支付凭证
                    $(".after").on('click',function(){
                        $.getJSON({  
                            type: "get",  
                            url:"../../json/oem_contrat_detail.json",
                            async: false, 
                            cache:false,
                            data : data_method_after,
                            dataType:"json", 
                            success: function(status) {
                              console.log(status); 
                                if(status.data.state==200){
                                    /*加载OEM合同信息*/
                                    if(all_pay == 1){
                                        setTimeout(function(){  //使用  setTimeout（）方法设定定时2000毫秒
                                            window.location.reload();//页面刷新
                                        },100);
                                    }  
                                } 
                            }  
                        });
                    });

                    //立即上传支付凭证
                    $(".now").on('click',function(){
                        $(".method").hide();
                        $(".up_img").hide();
                        $.getJSON({  
                            type: "get",  
                            url:"../../json/oem_contrat_detail.json",
                            async: false, 
                            cache:false,
                            data : data_method_after,
                            dataType:"json", 
                            success: function(status) {
                              console.log(status); 
                                if(status.data.state==200){
                                    /*加载OEM合同信息*/
                                   $(".credentials").show();
                                   $(".file").on('click',function(){
                                        $(".file").empty();
                                        $("#file").change(function(){
                                            var objUrl = getObjectURL(this.files[0]) ;
                                            console.log("objUrl = "+objUrl) ;
                                            if (objUrl) 
                                            {
                                                $(".img").attr("src", objUrl);
                                                $(".img").removeClass("hide");
                                                $(".up_img").show();
                                                $(".text_info").hide();
                                            }
                                            //建立一個可存取到該file的url
                                            function getObjectURL(file) {
                                                var url = null ;
                                                if (window.createObjectURL!=undefined) 
                                                { // basic
                                                    url = window.createObjectURL(file) ;
                                                }
                                                else if (window.URL!=undefined) 
                                                {
                                                    // mozilla(firefox)
                                                    url = window.URL.createObjectURL(file) ;
                                                } 
                                                else if (window.webkitURL!=undefined) {
                                                    // webkit or chrome
                                                    url = window.webkitURL.createObjectURL(file) ;
                                                }
                                                return url ;
                                            }
                                        }) ; 
                                   });
                                   //取消上传凭证
                                    $(".cancal_btn").on('click',function(){
                                        $(".credentials").hide();
                                        $(".overlay_num1").hide();
                                         window.location.reload();//页面刷新
                                    });
                                    //上传支付凭证
                                    $(".up_btn").on('click',function(){
                                        var file = $("#file").val();
                                        console.log(file);
                                        if(file == ""){
                                            $(".text_info").show();
                                            return false;
                                        }

                                        var up_data={
                                            "oem_id" :  oem_id,
                                            "file" : file
                                        };
                                        $.getJSON({  
                                            type: "get",  
                                            url:"../../json/oem_contrat_detail.json",
                                            async: false, 
                                            cache:false,
                                            data : up_data,
                                            dataType:"json", 
                                            success: function(status) {
                                                console.log(status); 
                                                if(status.data.state==200){
                                                    /*加载OEM合同信息*/
                                                    window.location.reload();//页面刷新
                                                } 
                                            }  
                                        });
                                    }); 
                                } 
                            }  
                        });
                    });

                }else{
                    //以选择方式
                    $(".up_img").hide();
                    $(".credentials").show();
                    $(".file").on('click',function(){
                        $(".file").empty();
                        $("#file").change(function(){
                            var objUrl = getObjectURL(this.files[0]) ;
                            console.log("objUrl = "+objUrl) ;
                            if (objUrl) 
                            {
                                $(".img").attr("src", objUrl);
                                $(".img").removeClass("hide");
                                $(".up_img").show();
                                $(".text_info").hide();
                            }
                            //建立一個可存取到該file的url
                            function getObjectURL(file) {
                                var url = null ;
                                if (window.createObjectURL!=undefined) 
                               { // basic
                                    url = window.createObjectURL(file) ;
                                }
                                else if (window.URL!=undefined) 
                                {
                                    // mozilla(firefox)
                                    url = window.URL.createObjectURL(file) ;
                                } 
                                else if (window.webkitURL!=undefined) {
                                    // webkit or chrome
                                    url = window.webkitURL.createObjectURL(file) ;
                                }
                                return url ;
                            }
                        }) ; 
                    });
                    //取消上传凭证
                    $(".cancal_btn").on('click',function(){
                        $(".credentials").hide();
                        $(".overlay_num1").hide();
                         window.location.reload();//页面刷新
                    });
                    //上传支付凭证
                    $(".up_btn").on('click',function(){
                        var file = $("#file").val();
                        console.log(file);
                        if(file == ""){
                            $(".text_info").show();
                            return false;
                        }

                        var up_data={
                            "oem_id" :  oem_id,
                            "file" : file
                        };
                        $.getJSON({  
                            type: "get",  
                            url:"../../json/oem_contrat_detail.json",
                           async: false, 
                            cache:false,
                            data : up_data,
                            dataType:"json", 
                            success: function(status) {
                                console.log(status); 
                                if(status.data.state==200){
                                    /*加载OEM合同信息*/
                                    window.location.reload();//页面刷新
                                } 
                            }  
                        });
                    }); 

                }
            }
            if(up_pay_start == 0 || mode == 1){
                //部分付款
                $(".overlay_num1").show();
                //以选择方式
                $(".up_img").hide();
                $(".credentials").show();
                $(".file").on('click',function(){
                    $(".file").empty();
                    $("#file").change(function(){
                        var objUrl = getObjectURL(this.files[0]) ;
                        console.log("objUrl = "+objUrl) ;
                        if (objUrl) {
                            $(".img").attr("src", objUrl);
                            $(".img").removeClass("hide");
                            $(".up_img").show();
                            $(".text_info").hide();
                        }
                        //建立一個可存取到該file的url
                        function getObjectURL(file) {
                            var url = null ;
                            if (window.createObjectURL!=undefined) { // basic
                                url = window.createObjectURL(file) ;
                            }
                            else if (window.URL!=undefined) {
                                // mozilla(firefox)
                                url = window.URL.createObjectURL(file) ;
                            } 
                            else if (window.webkitURL!=undefined) {
                                // webkit or chrome
                                url = window.webkitURL.createObjectURL(file) ;
                            }
                            return url ;
                        }
                    }) ; 
                });
                //取消上传凭证
                 $(".cancal_btn").on('click',function(){
                    $(".credentials").hide();
                    $(".overlay_num1").hide();
                    window.location.reload();//页面刷新
                });
                //上传支付凭证
                $(".up_btn").on('click',function(){
                    var file = $("#file").val();
                    console.log(file);
                    if(file == ""){
                        $(".text_info").show();
                        return false;
                    }

                    var up_data={
                        "oem_id" :  oem_id,
                        "file" : file
                    };
                    $.getJSON({  
                        type: "get",  
                        url:"../../json/oem_contrat_detail.json",
                        async: false, 
                        cache:false,
                        data : up_data,
                        dataType:"json", 
                        success: function(status) {
                            console.log(status); 
                            if(status.data.state==200){
                                /*加载OEM合同信息*/
                                window.location.reload();//页面刷新
                            } 
                        }  
                    });
                }); 
            }
        }else{
            $(this).attr({"disabled":"disabled"});
        }

    });

    //查看OEM合同下的产品信息
    $(".conteact_oem").on('click',function(){
        var oem_id= $(this).attr("oem_contract_id");
        console.log(oem_id);
        var oem_id={
            "oem_id":oem_id
        };

        $(".overlay_num1").show();
        $(".oem_contract_all_praduct").show();
        $(".cental_pro").on('click',function(){
            $(".overlay_num1").hide();
            $(".oem_contract_all_praduct").hide();
             window.location.reload();

        });
        //展示OEM合同产品详情
        $.getJSON({  
          type: "get",  
          url:"../../json/oem_contrat_detail.json",
          async: false, 
          cache:false,
          dataType:"json", 
          success: function(status) {
            console.log(status); 
            if(status.data.state==200){
              /*加载OEM合同信息*/
              $.each(status.data.oem, function(idx,obj){
                var weld_html;
                weld_html = '<div class="oem_detail_info">'+
                        '<div class="col-md-2 product_no_info" style="padding:0;">'+obj.product_no+'</div>'+
                        '<div class="col-md-2 product_name_info" title="'+obj.product_name+'" style="padding:0;">'+obj.product_name+'</div>'+
                        '<div class="col-md-2 product_model_info" title="'+obj.product_model+'" style="padding:0;">'+obj.product_model+'</div>'+
                        '<div class="col-md-2 product_quantity_info" style="padding:0;">'+obj.product_quantity+'</div>'+
                        '<div class="col-md-2 full_payment_rate_info" style="padding:0;">'+obj.sale+'</div>'+
                        '<div class="col-md-2 product_details_info" style="padding:0;">'+
                            '<div class="product_oem" oem_product_id="'+obj.id+'" style="margin-top: 2px;">产品详情</div>'+
                        '</div>'+
                    ' </div>';
                $(".product_name_info").each(function(){
                    var news_maxwidth=6;
                    if($(this).text().length>news_maxwidth){
                        $(this).text($(this).text().substring(0,news_maxwidth));
                        $(this).html($(this).html()+'…');
                    }
                });
                $(".product_model_info").each(function(){
                    var news_maxwidth=6;
                    if($(this).text().length>news_maxwidth){
                        $(this).text($(this).text().substring(0,news_maxwidth));
                        $(this).html($(this).html()+'…');
                    }
                });
                $(".oem_detail").append(weld_html);
              });
            }
          }  
      });
        //查看本合同下本产品的详细信息
    $(".product_oem").on('click',function(){
        //清空数据
        $(".list_product").empty();
        $(".list_pcb").empty();
        $(".list_pcba").empty();
        $(".list_testing").empty();
        $(".product_oem_bom").empty();
        //展示弹出信息
        $(".overlay_tow").show();
        $(".orders_details_oem").show();
        $(".cental_oem").on('click',function(){
            $(".list_product").empty();
            $(".list_pcb").empty();
            $(".list_pcba").empty();
            $(".list_testing").empty();
            $(".product_oem_bom").empty();
            $(".overlay_tow").hide();
            $(".orders_details_oem").hide();
        });
        var product_id= $(this).attr("oem_product_id");
        console.log(product_id);
        var product_id={
            "product_id":product_id
        };

        //获取产品信息
        $.getJSON({
            type:"get",
            url:"../../json/product.json",
            cache:false,
            data:product_id,
            success:function(result,data){
                if(result.state==200){
                  //产品型号
                  var html_product;
                    html_product = '<div class="col-md-4 product_list" data-field="product_id" data-align="center">'+result.product_number+'</div>'+
                                    '<div class="col-md-4 product_list" data-field="product_id" data-align="center">'+result.product_name+'</div>'+
                                    '<div class="col-md-4 product_list" data-field="product_id" data-align="center">'+result.product_type_number+'</div>';
                  $(".list_product").append(html_product);

                  //产品pcb信息
                  var html_pcb;
                    html_pcb = '<div class="col-md-3 product_list" data-field="product_id" data-align="center">'+result.oem_pcb_cmstart+'*'+result.oem_pcb_cmstop+'</div>'+
                                '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+result.oem_pcb_layer+'</div></div></div></div>'+
                                '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+result.oem_pcb_thickness+'</div>'+
                                '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+result.oem_pcb_spray+'</div>'+
                                '<div class="col-md-3 product_list" data-field="product_id" data-align="center">'+result.oem_pcb_solder+'</div>';
                    $(".list_pcb").append(html_pcb);

                  //产品pcba清单
                  var html_pcba;
                    html_pcba = '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+result.pcba_process+'</div>'+
                                '<div class="col-md-1 product_list" data-field="product_id" data-align="center">'+result.pcba_smt_type+'</div></div></div></div>'+
                                '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+result.pcba_smt_joints+'</div>'+
                                '<div class="col-md-1 product_list" data-field="product_id" data-align="center">'+result.pcba_dip_type+'</div>'+
                                '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+result.pcba_dip_joints+'</div>'+
                                '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+result.pcba_stencil+'</div>'+
                                '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+result.pcba_stencil_num+'</div>';
                  $(".list_pcba").append(html_pcba);

                  //测试组装
                  var html_text;

                    html_text = '<div class="col-md-3 product_list" data-field="product_id" data-align="center">'+result.oem_test_time+'</div>'+
                              '<div class="col-md-3 product_list" data-field="product_id" data-align="center">'+result.oem_assembly_time+'</div>'+
                              '<div class="col-md-3 product_list" data-field="product_id" data-align="center">'+result.oem_prevent_cm2+'</div>'+
                              '<div class="col-md-3 product_list" id="product_smark" data-field="product_id" data-align="center" title="'+result.oem_remark+'">'+
                                '<span class="remark" id="chuang_news">'+result.oem_remark+'</span>'+
                              '</div>';
                  $(".list_testing").append(html_text);
                  $(".remark").each(function(){
                        var maxwidth=2;
                        if($(this).text().length>maxwidth){
                            $(this).text($(this).text().substring(0,maxwidth));
                            $(this).html($(this).html()+'…');
                        }
                    });

                    //bom清单
                    $.each(result.bom, function(idx,obj){
                        var html_bom;
                        html_bom ='<div class="bom_list_oem">'+ 
                            '<div class="col-md-1" data-field="product_id" data-align="center">'+obj.number+'</div>'+
                            '<div class="col-md-2" data-field="product_id" data-align="center">'+obj.name+'</div>'+
                            '<div class="col-md-1" data-field="product_time" data-align="center">'+obj.model_number+'</div>'+
                            '<div class="col-md-1" data-field="product_id" data-align="center">'+obj.encapsulation+'</div>'+
                            '<div class="col-md-1" data-field="product_time" data-align="center">'+obj.accuracy+'</div>'+
                            '<div class="col-md-1" data-field="product_id" data-align="center">'+obj.brands+'</div>'+
                            '<div class="col-md-1" data-field="product_id" data-align="center">'+obj.bit_number+'</div>'+
                            '<div class="col-md-1" data-field="product_time" data-align="center">'+obj.quantity+'</div>'+
                            '<div class="col-md-1" data-field="product_time" data-align="center">'+obj.price+'</div>'+
                            '<div class="col-md-2 oem_bom" data-field="product_id" data-align="center" title="'+obj.remark+'">'+obj.remark+'</div>'+
                            '</div>';   
                        $(".product_oem_bom").append(html_bom);
                        $(".oem_bom").each(function(){
                            var maxwidth=2;
                            if($(this).text().length>maxwidth){
                                $(this).text($(this).text().substring(0,maxwidth));
                                $(this).html($(this).html()+'…');
                            }
                        });
                    }); 
                    }
                }
            });
        });
    });
    //OEM合同模块结束
});
