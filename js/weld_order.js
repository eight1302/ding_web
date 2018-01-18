/*
*time 2017.10.28
*auth xiaominzhang
*订单管理
*/
$(function(){

  $(".data_weld_1").cxCalendar({
    baseClass: 'cxcalendar_holyday'
  });
  $(".data_weld_2").cxCalendar({
    baseClass: 'cxcalendar_holyday'
  });
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
                //焊接流程提示
                $.each(status.data.timeline_red_weld, function(idx,obj){
                    var timeline_red_weld;
                    timeline_red_weld='<div class="tow">'+
                              '<div class="round_red">'+
                                '<span>'+obj.num+'</span>'+
                              '</div>'+
                              '<span>'+obj.title+'</span>'+
                            '</div>';
                    $(".red_detail_weld").append(timeline_red_weld);
                }); 
                /*加载定金尾款流程信息*/
                $.each(status.data.timeline_green_weld, function(idx,obj){
                    var timeline_green_weld;
                    timeline_green_weld='<div class="tow">'+
                              '<div class="round_green">'+
                                '<span>'+obj.num+'</span>'+
                              '</div>'+
                              '<span>'+obj.title+'</span>'+
                            '</div>';
                    $(".green_detail_weld").append(timeline_green_weld);
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
    $(".order_weld_menu").css("background","#03a9f4");

   //焊接模块开始
  //加载焊接订单信息
  $.getJSON({  
      type: "get",  
      url:"../../json/weld_datail.json",
      async: false, 
      cache:false,
      dataType:"json", 
      success: function(status) {
        console.log(status); 
        if(status.data.state==200){
          /*加载焊接合同信息*/
          $.each(status.data.weld, function(idx,obj){
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
            var weld_html;
            weld_html = '<div class="weld_data_detail">'+
                          '<div class="ordinal">'+
                            '<input type="checkbox" name="weld" value="'+obj.id+'">'+
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
                               '<div class="col-md-6 user_determine" style="padding: 0;" user_determine_start="'+obj.determine+'" weld_contract_id="'+obj.id+'">'+
                                    '<span class="icon-ok-circle" style="font-size:18px;line-height: 25px;" title="确认"></span>'+
                                  '</div>'+
                                  '<div class="col-md-6 user_cancel" style="padding: 0;" user_determine_start="'+obj.determine+'" weld_contract_id="'+obj.id+'">'+
                                     '<span class="icon-remove" style="font-size:18px;line-height: 25px;" title="取消"></span>'+
                                  '</div>'+
                            '</div>'+
                          '</div>'+
                          '<div class="order_status">'+obj.order_status+'</div>'+
                           '<div class="full_payment_rate">'+obj.full_payment_rate+'</div>'+
                          '<div class="down_payment">'+obj.down_payment+'</div>'+
                          '<div class="payment_status">'+obj.payment_status+'</div>'+
                          '<div class="upload_payment">'+
                            '<div class="payment" up_pay_start="'+obj.up_pay_start+'" mode="'+obj.mode+'" user_determine_start="'+obj.determine+'" weld_contract_id="'+obj.id+'"> <span class=" icon-money" style="font-size:20px;line-height: 24px;" title="上传支付凭证"</span></div>'+
                          '</div>'+
                          '<div class="contract_details" product_id="'+obj.id+'">'+
                            '<div class="contract_weld" weld_contract_id="'+obj.id+'">合同详情</div>'+
                          '</div>'+
                        '</div>';
                $(".data_detail_weld").append(weld_html);
             });

            //预计交付日期判断
            $(".data_play").each(function(){
                var play = $(this).html();
                if(play == "undefined"){
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
    $("#weld_tax").change(function(){
      weld_tax = Number($(this).children('option:selected').val());
      switch(weld_tax){
        case 0:
            window.location.reload();
            break;
        case 1:
          $(".data_detail_weld").empty();
           //OEM订单信息展示
          $.getJSON({  
            type: "get",  
            url:"../../json/weld_datail.json",  
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
                  $(".data_detail_weld").append(oem_html);
                });
                //预计交付日期判断
                $(".data_play").each(function(){
                    var play = $(this).html();
                    if(play == "undefined"){
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
              $(".data_detail_weld").empty();
            $.getJSON({  
              type: "get",  
              url:"../../json/weld_datail.json",  
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
                    $(".data_detail_weld").append(oem_html);
                  });
                  //预计交付日期判断
                  $(".data_play").each(function(){
                    var play = $(this).html();
                    if(play == "undefined"){
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
    $("#weld_order_status").change(function(){
        weld_order_status = Number($(this).children('option:selected').val());
        switch(weld_order_status){
            case 0:
                window.location.reload();
                break;
            case 1:
              $(".data_detail_weld").empty();
               //OEM订单信息展示
              $.getJSON({  
                type: "get",  
                 url:"../../json/weld_datail.json",  
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
                      $(".data_detail_weld").append(oem_html);
                    });

                  //预计交付日期判断
                  $(".data_play").each(function(){
                      var play = $(this).html();
                      if(play == "undefined"){
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
                $(".data_detail_weld").empty();
               //OEM订单信息展示
                  $.getJSON({  
                    type: "get",  
                    url:"../../json/weld_datail.json",  
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
                          $(".data_detail_weld").append(oem_html);
                        });
                        //预计交付日期判断
                        $(".data_play").each(function(){
                            var play = $(this).html();
                            if(play == "undefined"){
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
                  $(".data_detail_weld").empty();
                   //OEM订单信息展示
                  $.getJSON({  
                    type: "get",  
                     url:"../../json/weld_datail.json",  
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
                          $(".data_detail_weld").append(oem_html);
                        });
                        //预计交付日期判断
                        $(".data_play").each(function(){
                            var play = $(this).html();
                            if(play == "undefined"){
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
                  $(".data_detail_weld").empty();
                   //OEM订单信息展示
                  $.getJSON({  
                    type: "get",  
                    url:"../../json/weld_datail.json",  
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
                          $(".data_detail_weld").append(oem_html);
                        });
                        //预计交付日期判断
                        $(".data_play").each(function(){
                            var play = $(this).html();
                            if(play == "undefined"){
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
                  $(".data_detail_weld").empty();
                   //OEM订单信息展示
                  $.getJSON({  
                    type: "get",  
                    url:"../../json/weld_datail.json",  
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
                          $(".data_detail_weld").append(oem_html);
                        });
                        //预计交付日期判断
                        $(".data_play").each(function(){
                            var play = $(this).html();
                            if(play == "undefined"){
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
                  $(".data_detail_weld").empty();
                   //OEM订单信息展示
                  $.getJSON({  
                    type: "get",  
                    url:"../../json/weld_datail.json",  
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
                          $(".data_detail_weld").append(oem_html);
                        });
                        //预计交付日期判断
                        $(".data_play").each(function(){
                            var play = $(this).html();
                            if(play == "undefined"){
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
                  $(".data_detail_weld").empty();
                   //OEM订单信息展示
                  $.getJSON({  
                    type: "get",  
                     url:"../../json/weld_datail.json",  
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
                          $(".data_detail_weld").append(oem_html);
                        });
                        //预计交付日期判断
                        $(".data_play").each(function(){
                            var play = $(this).html();
                            if(play == "undefined"){
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
                    $(".data_detail_weld").empty();
                    $.getJSON({  
                    type: "get",  
                    url:"../../json/weld_datail.json",  
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
                            $(".data_detail_weld").append(oem_html);
                        });
                         //预计交付日期判断
                        $(".data_play").each(function(){
                            var play = $(this).html();
                            if(play == "undefined"){
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
    $("#weld_payment_status").change(function(){
        weld_payment_status = Number($(this).children('option:selected').val());
        switch(weld_payment_status){
            case 0:
                window.location.reload();
                break;
            case 1:
              $(".data_detail_weld").empty();
               //OEM订单信息展示
              $.getJSON({  
                type: "get",  
                 url:"../../json/weld_datail.json",  
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
                      $(".data_detail_weld").append(oem_html);
                    });
                    //预计交付日期判断
                    $(".data_play").each(function(){
                        var play = $(this).html();
                        if(play == "undefined"){
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
                $(".data_detail_weld").empty();
               //OEM订单信息展示
                  $.getJSON({  
                    type: "get",  
                    url:"../../json/weld_datail.json",  
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
                          $(".data_detail_weld").append(oem_html);
                        });
                        //预计交付日期判断
                        $(".data_play").each(function(){
                            var play = $(this).html();
                            if(play == "undefined"){
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
                    $(".data_detail_weld").empty();
                    $.getJSON({  
                    type: "get",  
                     url:"../../json/weld_datail.json",  
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
                            $(".data_detail_weld").append(oem_html);
                        });
                         //预计交付日期判断
                        $(".data_play").each(function(){
                            var play = $(this).html();
                            if(play == "undefined"){
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
        }
    });
     //上传支付凭证判断状态
    $(".payment").each(function(){
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

  //获取焊接订单时间段查询
    $(".search_weld_btn").on('click',function(){
      var data_weld_1 = $("#data_weld_1").val(),
          data_weld_2 = $("#data_weld_2").val();

      var weld_data = {
        "data_weld_1" : data_weld_1,
        "data_weld_2" : data_weld_2
      };

      //判断时间段是否为空
      if(data_weld_1 == "" || data_weld_2 == ""){
        return false;
      }
       $(".data_detail_weld").empty();
      //展示时间段焊接数据信息
      $.getJSON({
          type: "get",  
          url:"../../json/weld_datail.json",
          data : weld_data,
          async: false, 
          cache:false,
          dataType:"json", 
          success: function(status) {
            console.log(status); 
            if(status.data.state==200){
              /*加载焊接合同信息*/
              $.each(status.data.weld, function(idx,obj){
                var weld_html;
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
                 weld_html = '<div class="weld_data_detail">'+
                          '<div class="ordinal">'+
                            '<input type="checkbox" name="weld" value="'+obj.id+'">'+
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
                               '<div class="col-md-6 user_determine" style="padding: 0;" user_determine_start="'+obj.determine+'" weld_contract_id="'+obj.id+'">'+
                                    '<span class="icon-ok-circle" style="font-size:18px;line-height: 25px;" title="确认"></span>'+
                                  '</div>'+
                                  '<div class="col-md-6 user_cancel" style="padding: 0;" user_determine_start="'+obj.determine+'" weld_contract_id="'+obj.id+'">'+
                                     '<span class="icon-remove" style="font-size:18px;line-height: 25px;" title="取消"></span>'+
                                  '</div>'+
                            '</div>'+
                          '</div>'+
                          '<div class="order_status">'+obj.order_status+'</div>'+
                           '<div class="full_payment_rate">'+obj.full_payment_rate+'</div>'+
                          '<div class="down_payment">'+obj.down_payment+'</div>'+
                          '<div class="payment_status">'+obj.payment_status+'</div>'+
                          '<div class="upload_payment">'+
                            '<div class="payment" up_pay_start="'+obj.up_pay_start+'" mode="'+obj.mode+'" user_determine_start="'+obj.determine+'" weld_contract_id="'+obj.id+'"> <span class=" icon-money" style="font-size:20px;line-height: 24px;" title="上传支付凭证"</span></div>'+
                          '</div>'+
                          '<div class="contract_details" product_id="'+obj.id+'">'+
                            '<div class="contract_weld" weld_contract_id="'+obj.id+'">合同详情</div>'+
                          '</div>'+
                        '</div>';
            $(".data_detail_weld").append(weld_html);
              });
            }
          }  
      });

    });

      //删除焊接合同信息
    $(".weld_delete").on('click',function(){
      var weld_contracts = [];
        var welds = $("input[name='weld']");
        $.each(welds,function(key,obj){
            if(obj.checked){
                var weld_contract_id = Number(obj.value);
                weld_contracts.push(weld_contract_id);
            }
        });

        if(weld_contracts.length>0){
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
                        "weld_contracts" : weld_contracts
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
        //查看焊接合同下的产品信息
    $(".contract_weld").on('click',function(){
        var weld_id= $(this).attr("weld_contract_id");
        console.log(weld_id);
        var weld_id={
            "weld_id":weld_id
        };
        $(".overlay_num1").show();
        $(".weld_contract_all_praduct").show();
        $(".cental_pro").on('click',function(){
            $(".overlay_num1").hide();
            $(".weld_contract_all_praduct").hide();
             window.location.reload();
        });
        //展示焊接合同产品详情
        $.getJSON({  
          type: "get",  
           url:"../../json/weld_datail.json",
          async: false, 
          cache:false,
          dataType:"json", 
          success: function(status) {
            console.log(status); 
            if(status.data.state==200){
              /*加载焊接合同信息*/
              $.each(status.data.weld, function(idx,obj){
                var weld_html;
                weld_html = '<div class="oem_detail_info">'+
                        '<div class="col-md-2 product_no_info">'+obj.contract_no+'</div>'+
                        '<div class="col-md-2 product_name_info" title="'+obj.product_name+'">'+obj.product_name+'</div>'+
                        '<div class="col-md-2 product_model_info" title="'+obj.product_model+'">'+obj.product_model+'</div>'+
                        '<div class="col-md-2 product_quantity_info">'+obj.down_payment+'</div>'+
                        '<div class="col-md-2 full_payment_rate_info">'+obj.down_payment+'</div>'+
                        '<div class="col-md-2 product_details_info">'+
                            '<div class="product_weld" weld_product_id="'+obj.id+'" style="margin-top: 2px;">产品详情</div>'+
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
                $(".weld_detail").append(weld_html);
              });
            }
          }  
      });
        //查看本合同下本产品的详细信息
    $(".product_weld").on('click',function(){
        $(".list_product").empty();
        $(".list_pcb").empty();
        $(".list_pcba").empty();
        $(".list_testing").empty();
        $(".product_bom").empty();
        $(".overlay_tow_one").show();
        $(".orders_details_weld").show();
        $(".cental_oem").on('click',function(){
            $(".list_product").empty();
            $(".list_pcb").empty();
            $(".list_pcba").empty();
            $(".list_testing").empty();
            $(".product_bom").empty();
            $(".overlay_tow_one").hide();
            $(".orders_details_weld").hide();
        });
        var product_id= $(this).attr("weld_product_id");
        console.log(product_id);
        var product_id={
            "product_id":product_id
        };

        //获取产品信息
        $.getJSON({
            type:"get",
            url:"../../json/weld.json",
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

                    html_text = '<div class="col-md-3 product_list" data-field="product_id" data-align="center">'+result.weld_test_time+'</div>'+
                                '<div class="col-md-3 product_list" data-field="product_id" data-align="center">'+result.weld_assembly_time+'</div>'+
                                '<div class="col-md-3 product_list" data-field="product_id" data-align="center">'+result.weld_prevent_cm2+'</div>'+
                                '<div class="col-md-3 product_list" id="product_smark" data-field="product_id" data-align="center" title="'+result.weld_remark+'">'+
                                    '<span class="remark" id="chuang_news">'+result.weld_remark+'</span>'+
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
                        html_bom ='<div class="bom_list_weld">'+ 
                                '<div class="col-md-1" data-field="product_id" data-align="center">'+obj.number+'</div>'+
                                '<div class="col-md-2" data-field="product_id" data-align="center">'+obj.name+'</div>'+
                                '<div class="col-md-1" data-field="product_time" data-align="center">'+obj.model_number+'</div>'+
                                '<div class="col-md-1" data-field="product_id" data-align="center">'+obj.encapsulation+'</div>'+
                                '<div class="col-md-1" data-field="product_time" data-align="center">'+obj.accuracy+'</div>'+
                                '<div class="col-md-1" data-field="product_id" data-align="center">'+obj.brands+'</div>'+
                                '<div class="col-md-1" data-field="product_id" data-align="center">'+obj.bit_number+'</div>'+
                                '<div class="col-md-1" data-field="product_time" data-align="center">'+obj.quantity+'</div>'+
                                '<div class="col-md-1" data-field="product_time" data-align="center">'+obj.price+'</div>'+
                                '<div class="col-md-2 weld_bom" data-field="product_id" data-align="center" title="'+obj.remark+'">'+obj.remark+'</div>'+
                            '</div>';   
                            $(".product_bom").append(html_bom);
                            $(".weld_bom").each(function(){
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
    //确认订单
    $(".user_determine").on('click',function(sweetalert){
        var weld_id= $(this).attr("weld_contract_id");
        var determine = $(this).attr("user_determine_start");
        console.log(weld_id);
         var weld_id={
            "weld_id":weld_id
        };
        if(determine == "0"){
            //数据交互
             $.getJSON({  
                type: "get",  
                url:"../../json/oem_contrat_detail.json",
                async: false, 
                cache:false,
                data:weld_id,
                dataType:"json", 
                success: function(status) {
                  console.log(status); 
                    if(status.data.state==200){
                    /*加载焊接合同信息*/
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
        var weld_id= $(this).attr("weld_contract_id");
        var determine = $(this).attr("user_determine_start");
        $(this).css("background","#bfbfbf");
        console.log(weld_id);
         var weld_id={
            "weld_id":weld_id
        };
        if(determine == "0"){
           $(this).parent().parent().parent().remove();
            //数据交互
             $.getJSON({  
                type: "get",  
                url:"../../json/oem_contrat_detail.json",
                async: false, 
                cache:false,
                data : weld_id,
                dataType:"json", 
                success: function(status) {
                  console.log(status); 
                    if(status.data.state==200){
                    /*加载焊接合同信息*/
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
    $(".payment").on('click',function(){
        //判断状态
        var determine = $(this).attr("user_determine_start");
        var weld_id= $(this).attr("weld_contract_id");
        if(determine == "1"){
            var mode = $(this).attr("mode");
            var up_pay_start = $(this).attr("up_pay_start");
            if(up_pay_start == -1){
              //未付款
                $(".overlay_num1").show();
                if(mode == 0){
                    //没有选择方式
                    $(".method_weld").show();
                    var method = 1;
                     //默认选择状态
                    $("#all_weld_pay").prop("checked",true);
                    var first_weld_pay = $("#first_weld_pay").prop("checked"),
                        all_weld_pay = $("#allt_weld_pay").prop("checked");
                    //支付方式判断
                    if(all_weld_pay == true){
                        all_weld_pay = 1;
                        first_weld_pay =0;
                    }
                    if(first_weld_pay == true){
                        all_weld_pay = 0;
                        first_weld_pay =1;
                    }
                    var data_method_after = {
                        "weld_id" : weld_id,
                        "method" : method,
                        "all_weld_pay" : all_weld_pay,
                        "first_weld_pay" : first_weld_pay
                    };
                    //之后上传支付凭证
                    $(".after_weld").on('click',function(){
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
                                    /*加载焊接合同信息*/
                                    window.location.reload();//页面刷新
                                } 
                            }  
                        });
                    });

                    //立即上传支付凭证
                    $(".now_weld").on('click',function(){
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
                                    /*加载焊接合同信息*/
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
                                            "weld_id" :  weld_id,
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
                                                    /*加载焊接合同信息*/
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
                            "weld_id" :  weld_id,
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
                                    /*加载焊接合同信息*/
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
                        "weld_id" :  weld_id,
                        "file" : file
                    };
                    $.getJSON({  
                        type: "get",  
                        url:"../../json/weld_detail.json",
                        async: false, 
                        cache:false,
                        data : up_data,
                        dataType:"json", 
                        success: function(status) {
                            console.log(status); 
                            if(status.data.state==200){
                                /*加载焊接合同信息*/
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
    //焊接模块结束

});
