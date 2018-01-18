$(function(){

	//加载返修流程信息
	$.getJSON({  
        type: "get",  
        url:"../../json/oem_menu.json",  
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
                        			'<span class="one">'+obj.title+'</span>'+
                        		'</div>';
                    $(".red_detail").append(timeline_red);
                }); 
            }
        }  
    });

    //展示OEM返修产品信息
     //展示返修产品列表
    $.getJSON({  
        type: "get",  
        url:"../../json/weld_menu_data.json",  
        async: false, 
        cache:false,
        dataType:"json", 
        success: function(status) {
            console.log(status); 
            if(status.data.state==200){
                /*加载预付款流程信息*/
                $.each(status.data.oem_menu_data, function(idx,obj){
                    var oem_menu_data;
                    oem_menu_data = '<div class="contract_product">'+
                                        '<div class="contract_no">'+obj.contract_no+'</div>'+
                                        '<div class="contract_data">'+obj.contract_data+'</div>'+
                                        '<div class="pooduct_no">'+obj.pooduct_no+'</div>'+
                                        '<div class="pooduct_name">'+obj.pooduct_name+'</div>'+
                                        '<div class="product_type">'+obj.product_type+'</div>'+
                                        '<div class="product_quantity">'+obj.product_quantity+'</div>'+
                                        '<div class="contract_state">'+obj.contract_state+'</div>'+
                                        '<div class="logistics">'+
                                            '<div class="log_info" product_id="'+obj.id+'">填写</div>'+
                                        '</div>'+
                                        '<div class="selcet_pro">'+
                                             '<div class="selcet_detail" product_id="'+obj.id+'">查看详情</div>'+
                                        '</div>'+
                                    '</div>';
                    $(".oem_contracts").append(oem_menu_data);
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

        //查询合同信息
    $(".con_btn").on('click',function(){
        var contract_no = $("#contract_no").val();
        if(contract_no == "" || !(/[A-Z]-[0-9]{2}-[0-9]{4}/.test(contract_no))){
            return false;
        }
        //展示返修产品列表
        $.getJSON({  
            type: "get",  
            url:"../../json/weld_menu_data.json",
            async: false, 
            cache:false,
            dataType:"json", 
            success: function(status) {
                console.log(status); 
                if(status.data.state==200){
                    /*加载预付款流程信息*/
                    $(".oem_contracts").empty();
                    $.each(status.data.select_one_product, function(idx,obj){
                        var select_one_product;
                        select_one_product = '<div class="contract_product">'+
                                        '<div class="contract_no">'+obj.contract_no+'</div>'+
                                        '<div class="contract_data">'+obj.contract_data+'</div>'+
                                        '<div class="pooduct_no">'+obj.pooduct_no+'</div>'+
                                        '<div class="pooduct_name">'+obj.pooduct_name+'</div>'+
                                        '<div class="product_type">'+obj.product_type+'</div>'+
                                        '<div class="product_quantity">'+obj.product_quantity+'</div>'+
                                        '<div class="contract_state">'+obj.contract_state+'</div>'+
                                        '<div class="logistics">'+
                                            '<div class="log_info" product_id="'+obj.id+'" style="background:#9a9a9a;">填写</div>'+
                                        '</div>'+
                                        '<div class="selcet_pro">'+
                                             '<div class="selcet_detail" product_id="'+obj.id+'" style="background:#9a9a9a;">查看详情</div>'+
                                        '</div>'+
                                    '</div>';
                        $(".oem_contracts").append(select_one_product);
                    }); 
                }
            }  
        });
    });

    //判断产品名称、型号
     $(".pooduct_name").each(function(){
        var news_maxwidth=4;
        if($(this).text().length>news_maxwidth){
            $(this).text($(this).text().substring(0,news_maxwidth));
            $(this).html($(this).html()+'…');
        }
    });
    $(".product_type").each(function(){
        var news_maxwidth=4;
        if($(this).text().length>news_maxwidth){
            $(this).text($(this).text().substring(0,news_maxwidth));
            $(this).html($(this).html()+'…');
        }
    });

    //展示返修产品信息
    $(".selcet_detail").on('click',function(){
        $(".product_repair").show();
        $(".product_question").show();

        //取消按钮操作
        $(".cental_pro_one").on('click',function(){
            window.location.reload();
            $(".product_repair").hide();
            $(".product_question").hide();
        });
        //展示返修产品列表
        $.getJSON({  
            type: "get",  
            url:"../../json/weld_menu_data.json",
            async: false, 
            cache:false,
            dataType:"json", 
            success: function(status) {
                console.log(status); 
                if(status.data.state==200){
                    /*加载预付款流程信息*/
                    $.each(status.data.product, function(idx,obj){
                        $("#img_oem").attr("src", obj.img_oem);
                        $("#textare_oem").html(obj.textare_oem);
                    }); 
                }
            }  
        });
    });

    //填写物流信息
    $(".log_info").on('click',function(){
        $(".product_repair").show();
        $(".logis_product").show();

        //取消按钮操作
        $(".cental_pro_one").on('click',function(){
            window.location.reload();
            $(".product_repair").hide();
            $(".logis_product").hide();
        });
       
       //判断快递选项
       //判断快递选项
        $("#distribution").change(function(sweetalert){
             var distribution = $("#distribution").val();
            switch(distribution){
                case "0" :
                    if(distribution = "0"){
                        $("#delivery").val("");
                        $("#delivery").attr("disabled",false);
                        $("#con_on").val("");
                        $("#con_on").attr("disabled",false); 
                    }
                break;
                case "甲方配送" :
                    if(distribution = "甲方配送"){
                        $("#delivery").val("甲方配送");
                        $("#delivery").attr("disabled","disabled"); 
                        $("#con_on").val("甲方配送");
                        $("#con_on").attr("disabled","disabled"); 
                    }
                break;
                default :
                    if(distribution = "0"){
                        $("#delivery").val("");
                        $("#delivery").attr("disabled",false);
                        $(".sel_opt").attr("disabled","disabled");
                        $("#con_on").val("");
                        $("#con_on").attr("disabled",false);
                    }
                break;
            }
        });

        //提交信息
        $(".weld_repair_btn").on("click",function(){
            var distribution = $("#distribution").val(),
                delivery = $("#delivery").val(),
                con_on = $("#con_on").val();
            
            if(distribution == "0" ){
                swal("配送方式不能为空");
                return false;
            }
            if(!delivery){
                swal("快递方式不能为空");
                return false;
            }

            //数据格式转换为json对象
            var data_distr = {
                "distribution" : distribution,
                "delivery" : delivery,
                "con_on" : con_on
            };
            $.getJSON({  
                type: "get",  
                url: "../../json/oem_menu_data.json",
                data: data_distr,
                async: false, 
                cache:false,
                dataType:"json", 
                success: function(status) {
                    console.log(status); 
                    if(status.data.state==200){
                        swal("提交成功");
                        window.location.reload();
                        $(".product_repair").hide();
                        $(".logis_product").hide();
                    }
                    else{
                        swal("提交失败");
                    }
                }  
            });
        });
    });
});