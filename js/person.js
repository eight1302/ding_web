/*
* 个人中心业务逻辑编写
* author：xiaominzhang
* time: 2017/11/20
*/
$(function(){
	//获取个人中心的信息
	$.getJSON({  
       	type: "GET",
       	url:"../../json/person.json",  
       	async: false, 
       	cache:false,
       	dataType:"json", 
       	success: function(status) {

      	    console.log(status); 
       	    if(status.data.state==200){
       	        //基本信息
       	        $(".avatar-view").append('<img src="'+status.data.head_img+'" style="width: 100%;height: 100%;border-radius: 100%;">');
       	        $("#basic_numbering").text(status.data.basic_numbering);
       	        $("#basic_ompany").val(status.data.basic_ompany);
       	        $("#basic_phone").val(status.data.basic_phone);
       	        $("#basic_qq").val(status.data.basic_qq);
       	        $("#basic_mail").val(status.data.basic_mail);
       	        $("#basic_fax").val(status.data.basic_fax);

       	        //增值税开票信息
	       	    $("#vat_company").val(status.data.vat_company);
				$("#vat_ein").val(status.data.vat_ein);
				$("#vat_address").val(status.data.vat_address);
				$("#vat_opening_bank").val(status.data.vat_opening_bank);
				$("#vat_phone").val(status.data.vat_phone);
				$("#vat_account").val(status.data.vat_account);

				//开票收件资料
				$("#billing_person").val(status.data.billing_person);
				$("#billing_phone").val(status.data.billing_phone);
				$("#billing_address").val(status.data.billing_address);

				$.each(status.data.person_address, function(idx,obj){
                    var person_address_html;
                        person_address_html='<div class="col-md-3 address_list">'+
                        	'<div class="col-md-12" style="margin-top: 15px;">'+
                        		'<span style="float: left;">'+obj.name+'（收）</span>'+
                        		'<span style="float: right;">'+obj.phone+'</span>'+
                        	'</div>'+
                        	'<div class="address col-md-12">'+
                        		'<span>'+obj.encapsulation+'</span>'+
                        	'</div>'+
                        	'<div class="col-md-12">'+
                        		'<div class="col-md-6">'+
                        			'<div class="col-md-12 check" id="'+obj.id+'" start="'+obj.st+'">'+
                        				'<span>默认地址</span>'+
                        			'</div>'+
                        		'</div>'+
                        		'<div class="col-md-6">'+
                        			'<div class="col-md-6 edit" id="'+obj.id+'">'+
                        				'<span class="icon-edit" style="font-size: 20px;line-height: 30px;"></span>'+
                        			'</div>'+
                        			'<div class="col-md-6 delete" id="'+obj.id+'">'+
                        				'<span class="icon-trash"  style="font-size: 20px;line-height: 30px;"></span>'+
                        			'</div>'+
                        		'</div>'+
                        	'</div>'+
                        '</div>';
                    $(".to_address_info").append(person_address_html);
                    if(obj.st == "1"){
                    	var moren;
                    	moren=
                    	'<div  class="col-md-3" style="padding: 0;">'+
	                    	'<span style="color: red;font-size: 10px;margin-right:10px;">(默认收货地址)</span>'+
	                    	'<label>联系人姓名：</label>'+
	                    	'<span class="person_name">'+obj.name+'&nbsp;&nbsp;&nbsp;<i>(收)</i></span>'+
	                    '</div>'+
	                    '<div class="col-md-3"  style="padding: 0;">'+
	                    	'<label>电话号码：</label>'+
	                    	'<span class="phone">'+obj.phone+'</span>'+
	                    '</div>'+
	                    '<div class="col-md-6"  style="padding: 0;">'+
	                    	'<label>收货地址：</label>'+
	                    	'<span class="address">'+obj.encapsulation+'</span>'+
	                    '</div>';
                    	$(".to_address").append(moren);
                    }
                 
                }); 
       	    }
       	}  
    }); 

      //确认按钮判断状态
    $(".check").each(function(){
        var start = $(this).attr("start");
        if(start == "1"){
            $(this).css({"padding":"0","max-width":"90px","cursor":"pointer","background":"red","text-align":"center","font-size:":"10px","width":"80px","height":"25px","line-height":"25px","border-radius":"6px","color":"#fff"});
        }
    });


	//选择默认地址
	$(".check").on('click',function(){
		var id = $(this).attr("id");
		var data_acqu = {
			"id" : id
		};
		//数据库交互
        $.getJSON({  
            type: "post",  
            url:"../../json/1.json",  
          	data:data_acqu,// 序列化表单值  
            async: false, 
            cache:false,
            dataType:"json", 
            success: function(status) {
                console.log(status); 
                if(status.oemproduct.state==200){
                 	window.location.href="../../view/person/home.html";
                }
            }  
        }); 
	});
	
	//上传头像
	$(".avatar-view").on('click',function(){
		$(".overlay_num1").show();
		$(".credentials").show();
		$(".cancal_btn").on('click',function(){
			$(".overlay_num1").show();
			$(".credentials").show();
			 window.location.reload();
		});
		$(".up_img").hide();
		$(".file").on('click',function(){
            $(".file").empty();
            $("#file").change(function(){
            	var objUrl = getObjectURL(this.files[0]) ;
              	console.log("objUrl = "+objUrl) ;
                if (objUrl){
                    $(".img").attr("src", objUrl);
                    $(".img").removeClass("hide");
                    $(".up_img").show();
                    $(".text_info").hide();
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
        $(".up_btn").on('click',function(){
        	
        	var file = $("#file").val();
            console.log(file);
            if(file == ""){
                $(".text_info").show();
                return false;
            }

            var up_data={
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
                        window.location.reload();//页面刷新
                    } 
                }  
            });
        });
	});

	//用户基本信息
	$(".basic_btn").on('click',function(sweetalert){
		var basic_ompany = $("#basic_ompany").val(),
			basic_phone = $("#basic_phone").val(),
			basic_qq = $("#basic_qq").val(),
			basic_mail = $("#basic_mail").val(),
			basic_fax = $("#basic_fax").val();

		//判断数据不能为空
		if(basic_ompany == "" || basic_fax == ""){
			swal("基本信息不能为空！");
			return false;
		}
		//判断电话
		if(basic_phone == "" || !(/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/.test(basic_phone))){
			swal("电话格式不对！");
			return false;
		}

		//判断qq
		if(basic_qq == "" || !(/^[1-9][0-9]{4,15}$/.test(basic_qq))){
			swal("qq号格式不对！");
			return false;
		}

		//判断邮箱
		if(basic_mail == "" || !(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(basic_mail))){
			swal("邮箱格式不对！");
			return false;
		}

		//数据转换为json对象
		var data_basic = {
			"basic_ompany" : basic_ompany,
			"basic_phone" : basic_phone,
			"basic_qq" : basic_qq,
			"basic_mail" : basic_mail,
			"basic_fax" : basic_fax
		};

		//数据库交互
        $.getJSON({  
            type: "post",  
            url:"../../json/1.json",  
          	data:data_basic,// 序列化表单值  
            async: false, 
            cache:false,
            dataType:"json", 
            error: function(status) { 
                console.log(status); 
                if(status.oemproduct.state==0){
                    swal({
                        title: "添加失败!",
                        type: "error",
                        timer: 5000,
                        showConfirmButton: false,
                        sleep : 20000
                    });  
                    window.location.href="../../view/person/home.html";
                }
            },  
            success: function(status) {
                console.log(status); 
                if(status.oemproduct.state==200){
                    swal({
	                    title: status.oemproduct.info,
	                    type: "success",
	                    timer: 3000,
	                    showConfirmButton: false
                	});  
                 	window.location.href="../../view/person/home.html";
                }
            }  
        }); 
	});

	//增值税开票信息
	$(".vat_btn").on('click',function(sweetalert){
		var vat_company = $("#vat_company").val(),
			vat_ein = $("#vat_ein").val(),
			vat_address = $("#vat_address").val(),
			vat_opening_bank = $("#vat_opening_bank").val(),
			vat_phone = $("#vat_phone").val(),
			vat_account = $("#vat_account").val();

		//判断数据不能为空
		if(vat_company == "" || vat_address == "" || vat_opening_bank == ""){
			swal("增值税开票信息不能为空！");
			return false;
		}
		//判断电话
		if(vat_phone == "" || !(/^1[34578]\d{9}$/.test(vat_phone))){
			swal("电话格式不对！");
			return false;
		}

		//判断税号
		if(vat_ein == "" || !(/^[A-Za-z0-9]{15,20}$/.test(vat_ein))){
			swal("税号格式不对！");
			return false;
		}

		//判断账户信息
		if(vat_account == "" || !(/^[0-9]\d{15,19}$/.test(vat_account))){
			swal("开户账号格式不对！");
			return false;
		}

		//数据转换为json对象
		var data_vat = {
			"vat_company" : vat_company,
			"vat_ein" : vat_ein,
			"vat_address" : vat_address,
			"vat_opening_bank" : vat_opening_bank,
			"vat_phone" : vat_phone,
			"vat_account" : vat_account
		};

		//数据库交互
        $.getJSON({  
            type: "post",  
            url:"../../json/1.json",  
          	data:data_vat,// 序列化表单值  
            async: false, 
            cache:false,
            dataType:"json", 
            error: function(status) { 
                console.log(status); 
                if(status.oemproduct.state==0){
                    swal({
                        title: "添加失败!",
                        type: "error",
                        timer: 5000,
                        showConfirmButton: false,
                        sleep : 20000
                    });  
                    window.location.href="../../view/person/home.html";
                }
            },  
            success: function(status) {
                console.log(status); 
                if(status.oemproduct.state==200){
                    swal({
	                    title: status.oemproduct.info,
	                    type: "success",
	                    timer: 3000,
	                    showConfirmButton: false
                	});  
                 	window.location.href="../../view/person/home.html";
                }
            }  
        }); 
	});

	//开票收件资料业务逻辑编写
	$(".billing_btn").on('click',function(sweetalert){
		var billing_person = $("#billing_person").val(),
			billing_phone = $("#billing_phone").val(),
			billing_address = $("#billing_address").val();

		//判断数据不能为空
		if(billing_person == "" || billing_address == ""){
			swal("开票收件信息不能为空！");
			return false;
		}
		//判断电话
		if(billing_phone == "" || !(/^1[34578]\d{9}$/.test(billing_phone))){
			swal("电话格式不对！");
			return false;
		}

		//数据转换为json对象
		var data_billing = {
			"billing_person" : billing_person,
			"billing_phone" : billing_phone,
			"billing_address" : billing_address
		};

		//数据库交互
        $.getJSON({  
            type: "post",  
            url:"../../json/1.json",  
          	data:data_billing,// 序列化表单值  
            async: false, 
            cache:false,
            dataType:"json", 
            error: function(status) { 
                console.log(status); 
                if(status.oemproduct.state==0){
                    swal({
                        title: "添加失败!",
                        type: "error",
                        timer: 5000,
                        showConfirmButton: false,
                        sleep : 20000
                    });  
                    window.location.href="../../view/person/home.html";
                }
            },  
            success: function(status) {
                console.log(status); 
                if(status.oemproduct.state==200){
                    swal({
	                    title: status.oemproduct.info,
	                    type: "success",
	                    timer: 3000,
	                    showConfirmButton: false
                	});  
                 	window.location.href="../../view/person/home.html";
                }
            }  
        }); 
	});

	//删除地址
	$(".delete").on('click',function(sweetalert){
		var id = $(this).attr("id");
		var delete_id = {
			"id" : id
		};
		//数据库交互
	    $.getJSON({  
	        type: "post",  
	        url:"../../json/1.json",  
	        data:delete_id,// 序列化表单值  
	        async: false, 
	        cache:false,
	        dataType:"json",
	        success: function(status) {
	            console.log(status); 
	            if(status.oemproduct.state==200){
	                window.location.href="home.html";
	            }
	        }  
	    }); 
	});

	//修改地址
	$(".edit").on('click',function(sweetalert){
		var id = $(this).attr("id");
		var edit_id = {
			"id" : id
		};
		$(".overlay_num1").show();
		$(".new_address").show();
		$.getJSON({  
	        type: "GET",  
	        url:"../../json/edit_address.json",  
	        data:edit_id,// 序列化表单值  
	        async: false, 
	        cache:false,
	        dataType:"json",
	        success: function(status) {
	            console.log(status); 
	            //点击取消，退出
				$(".cental_pro").on('click',function(sweetalert){
					$(".overlay_num1").hide();
					$(".new_address").hide();
					//点击取消，退出
				});
	            if(status.data.state==200){
	                $("#new_name").val(status.data.name);
	                $("#new_phone").val(status.data.phone);
	                $("#province").val(status.data.province);
	                $("#city").val(status.data.city);
	                $("#district").val(status.data.district);
	                $("#new_detail").text(status.data.new_detail);
	            }
	            $(".add_new").on('click',function(sweetalert){
					var new_name = $("#new_name").val(),
						new_phone = $("#new_phone").val(),
						province = $("#province").val(),
						city = $("#city").val(),
						district = $("#district").val(),
						new_detail = $("#new_detail").val();

						//判断联系人
						if(new_name == ""){
							swal("联系人姓名不能为空!");
							return false;
						}

						//判断电话格式
						if(new_phone == "" || !(/^1[34578]\d{9}$/.test(new_phone))){
							swal("电话格式不对！");
							return false;
						}

						//判断详细信息
						if(new_detail.length<2){
							swal("详细地址不能小于2位！");
							return false;
						}

						if(!province){
							swal("所在省不能为空!");
							return false;
						}
						if(!city){
							swal("所在市不能为空!");
							return false;
						}

					var edit_data = {
						"new_name" : new_name,
						"new_phone" : new_phone,
						"province" : province,
						"city" : city,
						"district" : district,
						"new_detail" : new_detail,
						"id" : id
					}

					//数据库交互
			        $.getJSON({  
			            type: "post",  
			            url:"../../json/1.json",  
			          	data:edit_data,// 序列化表单值  
			            async: false, 
			            cache:false,
			            dataType:"json", 
			            error: function(status) { 
			                console.log(status); 
			                if(status.oemproduct.state==0){
			                    swal({
			                        title: "添加失败!",
			                        type: "error",
			                        timer: 5000,
			                        showConfirmButton: false,
			                        sleep : 20000
			                    });  
			                    window.location.href="../../view/person/home.html";
			                }
			            },  
			            success: function(status) {
			                console.log(status); 
			                if(status.oemproduct.state==200){
			                    swal({
				                    title: status.oemproduct.info,
				                    type: "success",
				                    timer: 3000,
				                    showConfirmButton: false
			                	});  
			                 	window.location.href="../../view/person/home.html";
			                }
			            }  
			        }); 
				});
	            
	        }  
	    }); 

	});

	//新增收货地址
	$(".add_new_address").on('click',function(sweetalert){
		$(".overlay_num1").show();
		$(".new_address").show();
		//点击取消，退出
		$(".cental_pro").on('click',function(sweetalert){
			$(".overlay_num1").hide();
			$(".new_address").hide();
			//点击取消，退出
		});
		//添加收货地址
		$(".add_new").on('click',function(sweetalert){
			var new_name = $("#new_name").val(),
				new_phone = $("#new_phone").val(),
				province = $("#province").val(),
				city = $("#city").val(),
				district = $("#district").val(),
				new_detail = $("#new_detail").val();
			//判断联系人
			if(new_name == ""){
				swal("联系人姓名不能为空!");
				return false;
			}

			//判断电话格式
			if(new_phone == "" || !(/^1[34578]\d{9}$/.test(new_phone))){
				swal("电话格式不对！");
				return false;
			}

			//判断详细信息
			if(new_detail.length<2){
				swal("详细地址不能小于2位！");
				return false;
			}

			//数据格式转换
			var data_new_address = {
				"new_name" : new_name,
				"new_phone" : new_phone,
				"province" : province,
				"city" : city,
				"district" : district,
				"new_detail" : new_detail
			};

			//数据库交互
	        $.getJSON({  
	            type: "post",  
	            url:"../../json/1.json",  
	          	data:data_new_address,// 序列化表单值  
	            async: false, 
	            cache:false,
	            dataType:"json", 
	            error: function(status) { 
	                console.log(status); 
	                if(status.oemproduct.state==0){
	                    swal({
	                        title: "添加失败!",
	                        type: "error",
	                        timer: 5000,
	                        showConfirmButton: false,
	                        sleep : 20000
	                    });  
	                    window.location.href="../../view/person/home.html";
	                }
	            },  
	            success: function(status) {
	                console.log(status); 
	                if(status.oemproduct.state==200){
	                    swal({
		                    title: status.oemproduct.info,
		                    type: "success",
		                    timer: 3000,
		                    showConfirmButton: false
	                	});  
	                 	window.location.href="../../view/person/home.html";
	                }
	            }  
	        }); 

		});
	});
});