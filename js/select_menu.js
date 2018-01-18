/*
*time 2017.12.5
*auth xiaominzhang
*返修订单选择
*/
$(function(){

	//加载返修流程信息
	$.getJSON({  
        type: "get",  
        url:"../../json/select_menu.json",  
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

    //展示返修产品列表
    $.getJSON({  
        type: "get",  
        url:"../../json/select_menu_product.json",  
        async: false, 
        cache:false,
        dataType:"json", 
        success: function(status) {
            console.log(status); 
            if(status.data.state==200){
            	/*加载预付款流程信息*/
               	$.each(status.data.select_menu_product, function(idx,obj){
                    var select_menu_product;
                   	select_menu_product = '<div class="contract_product">'+
                   							'<div class="contract_no">'+obj.contract_no+'</div>'+
                   							'<div class="pooduct_name">'+obj.pooduct_name+'</div>'+
                   							'<div class="product_data">'+obj.product_data+'</div>'+
                   							'<div class="product_type">'+obj.product_type+'</div>'+
                   							'<div class="contract_state">'+obj.contract_state+'</div>'+
                   							'<div class="product_quantity">'+obj.product_question+'</div>'+
                   							'<div class="selcet_btn" select_menu_product="'+obj.id+'">选择返修产品</div>'+
                   						'</div>';
                    $(".contracts").append(select_menu_product);
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
	        url:"../../json/select_menu_product.json",  
	        async: false, 
	        cache:false,
	        dataType:"json", 
	        success: function(status) {
	            console.log(status); 
	            if(status.data.state==200){
	            	/*加载预付款流程信息*/
	            	$(".contracts").empty();
	               	$.each(status.data.select_one_product, function(idx,obj){
	                    var select_one_product;
	                   	select_one_product = '<div class="contract_product">'+
	                   							'<div class="contract_no">'+obj.contract_no+'</div>'+
	                   							'<div class="pooduct_name">'+obj.pooduct_name+'</div>'+
	                   							'<div class="product_data">'+obj.product_data+'</div>'+
	                   							'<div class="product_type">'+obj.product_type+'</div>'+
	                   							'<div class="contract_state">'+obj.contract_state+'</div>'+
	                   							'<div class="product_quantity">'+obj.product_question+'</div>'+
	                   							'<div class="selcet_btn" select_menu_product="'+obj.id+'" style="background:#7d858c">选择返修产品</div>'+
	                   						'</div>';
	                    $(".contracts").append(select_one_product);
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

   	//选择返修产品
   	$(".selcet_btn").on('click',function(){
   		var select_menu_product = $(this).attr("select_menu_product");
   		$(".overlay_repair").show();
   		$(".overlay_product").show();

   		//取消按钮操作
   		$(".cental_pro").on('click',function(){
   			window.location.reload();
   			$(".overlay_repair").hide();
   			$(".overlay_product").hide();
   		});
   		 //展示返修产品列表
	    $.getJSON({  
	        type: "get",  
	        url:"../../json/select_menu_product.json",  
	        async: false, 
	        cache:false,
	        dataType:"json", 
	        success: function(status) {
	            console.log(status); 
	            if(status.data.state==200){
	            	/*加载预付款流程信息*/
	               	$.each(status.data.product, function(idx,obj){
	                    var product;
	                   	product = '<div class="products_destrion">'+
	                   							'<div class="no"><input type="checkbox" id="no" name="signs" value='+obj.id+'></div>'+
	                   							'<div class="number">'+obj.number+'</div>'+
	                   							'<div class="name1">'+obj.pooduct_name+'</div>'+
	                   							'<div class="type">'+obj.product_type+'</div>'+
	                   							'<div class="quantity">'+obj.product_question+'</div>'+
	                   							'<div class="re_quantity"><input type="text" name="repair" id="repair_question" value="" style="height: 28px;width: 30%;border-radius: 10px;"></div>'+
	                   							'<div class="up">'+
	                   								'<div class="up_btn" product_id="'+obj.id+'" style="width: 80%;height: 25px;background: #3296ec;margin-top: 6px;line-height: 25px;border-radius: 15px;color: #fff;cursor: pointer;">上传</div>'+
	                   							'</div>'+
	                   						'</div>';
	                    $(".products_info").append(product);
	                }); 
	            }
	        }  
	    });

	    //上传质量问题
	    $(".up_btn").on('click',function(){
	    	var product_id = $(this).attr("product_id");
	    	$(".product_repair").show();
	    	$(".product_question").show();
	    	$(".cental_pro_one").on('click',function(){
	    		$(".product_question").hide();
            	$(".product_repair").hide();
	    	});
			
			$(".file").on('click',function(){
	            $(".file").empty();
	            $("#file").change(function(){
	            	var objUrl = getObjectURL(this.files[0]) ;
	              	console.log("objUrl = "+objUrl) ;
	                if (objUrl){
	                    $(".img").attr("src", objUrl);
	                    $(".imgs").show();
	                }
	                //建立一個可存取到該file的url
	                function getObjectURL(file) {
	                    var url = null ;
	                    if (window.createObjectURL!=undefined){ // basic
	                        url = window.createObjectURL(file) ;
	                    }
	                    else if (window.URL!=undefined){
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

            //点击提交质量问题,将数据放到数组中
            $(".product_repair_btn").on('click',function(sweetalert){
            	var id=product_id;
            	if(id){
            		var textare = $("#textare").val(),
            		file = $("#file").val();
	            	if(textare == '' && file == ''){
	            		swal("产品质量描述以及图片不能为空!");
	            	}
	            	var product = {
	            		"id" : id,
	            		"textare" : textare,
	            		"file" : file
	            	};
            	}
            	porducts.push(product);
	            $(".product_question").hide();
	            $(".product_repair").hide();
            });
	    });


	    //返修产品的全局数据
		var porducts=[];

		//提交数据到返修列表
		$(".add_repair").on('click',function(sweetalert){
			var pro_num = [];
			 //返修产品个数
	        var pro_quantity = []
	        var signs = $("input[name='signs']");
	        $.each(signs,function(key,obj){
	            if(obj.checked){
	                var productId = Number(obj.value);
	                pro_num.push(productId);
	            }
	        });
	        
            var repairs = $("input[name='repair']");
            $.each(repairs,function(key,obj){
                if(obj){
                    var repair_question = Number(obj.value);
                    pro_quantity.push(repair_question); 
                }
            });

            //去除值为零的数据
			var removeItem = 0;  
			pro_quantity = $.grep(pro_quantity, function(value) {
			 	return value != removeItem;
			});

			//去除相同的元素
			var sum = porducts.length;
			for (var i = 0; i < sum; ++i) {
				for (var j = 0; j < sum; ++j) {
					//要注意，不能自己跟自己比
					if (i != j) {
					    if (porducts[i].id.indexOf(porducts[j].id) != -1)  {
					        porducts.splice(j,1);
					        sum--;
					               
					    }
					}        
				}
			}

			if(pro_num.length!==pro_quantity.length || pro_num.length!==porducts.length){
				swal("提交数据不匹配!");
				return false;
			}

			//判断序和产品的id是否相同
			var q = pro_num.length;
			for(var m=0;m<q;m++){
				var ba=pro_num[m];
				var aa=Number(porducts[m].id);
				if(ba != aa){
					swal("提交的产品质量和产品序号不匹配！");
					return false;
				}
			}

			//获取提交返修时间
		    var myDate = new Date();
		    var year=myDate.getFullYear();   //获取当前年
		    var month=myDate.getMonth()+1;   //获取当前月
		    var date=myDate.getDate();       //获取当前日
		    var now_time=year+'.'+month+"."+date;

			//合并数据
			var data = [];
			var a = pro_num.length;
			for(var s=0;s<a;s++){
				var json = {
					"pro_num" : pro_num[s],
					"pro_quantity" : pro_quantity[s],
					"porducts" : porducts[s],
					"now_time" : now_time
				};
				data.push(json);	
			}
			 
	       console.log(data);
	        $.getJSON({  
                type: "get",  
                url:"../../json/select_menu_product.json",
                async: false, 
                cache:false,
                data : data,
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
   	});
});