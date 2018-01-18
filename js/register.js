/*
*注册业务逻辑编写
*auth@xiaomin.zhang
*time 2017-10-21
*/
//表单注册
$(function(){
	var timer; //控制时间变量
	$.idcode.setCode();
	//获取手机验证码
	$("#security_button").click(function(sweetalert){
		//$("#security_button").html("倒计时！");

		var IsBy = $.idcode.validateCode();
		var phone=$("#phone").val();
		if(IsBy == false){
			swal("请输入验证码");
			return false;
		}
		if(phone=="" || !(/^1[34578]\d{9}$/.test(phone))){
			swal("请填写手机号且注意格式！");
			return false;
		}else{
			$("#phone_msg").hide();
			swal("验证码已发送，请在2分钟内完成验证码填写！");
			var timer=120;
			$("#security_button").attr('disabled',"true");
			var countdown = setInterval(CountDown,1000);
			function CountDown(){
				$("#security_button").html(timer+"s重新获取");
				if(timer==0){
					$("#security_button").removeAttr("disabled");
					$("#security_button").html("重新获取");
					clearInterval(countdown);
				}
				timer--;
			}		
		}
		var data_phone={
			"phone":phone
		};
		if(IsBy == true){
			$.ajax({
				type:"post",
				url:"", //获取验证码接口
				data:data_phone,
				 cache:false,
				dataType:"json",
				success : function(data){
					if(data.status==1){
						//验证码已发送
						swal("验证码已发送，请在30分钟内完成验证码填写！");
						//倒计时
						$("#security_button").attr("disabled",false);
					}
				}
			});
		}else{
			wsal("请输入验证码");
			return false;
		}	
	});

	$("#regbtn1").click(function(sweetalert){
        swal({
        	title: "",
	    	text: "您确定要注册吗？",
	    	type: "warning",
	    	showCancelButton: true,
	    	confirmButtonColor: "#7B69B3",
	    	confirmButtonText: "确定",
	    	cancelButtonText: "取消",
	    	closeOnConfirm: false
        },function(isConfirm){
        	if(isConfirm){
        		var user=$("#user").val(),
				phone=$("#phone").val(),
				pass=$("#pass").val(),
				company=$("#company").val(),
				pass_confirm=$("#pass_confirm").val(),
				security = $("#security").val(),
				provinces = $("#provinces").val(),
				checkbox=$("#checkbox1").prop("checked");
				 //判断复选框是否选中，如果没选中，弹出提示框
				if (checkbox === true) {
					checkbox="1";
		        } else {
					checkbox="0";
					swal("请阅读相关协议且同意协议内容");
		        }
		       //弹出框提示
		        //验证用户名提交信息
		        if(user==""){
		        	swal("请完成表单填写！")
		        	$("#msg_user").html("用户名不为空！");
		        	return false;
		        }else{
		        	$("#user_msg").hide();
		        }
		        
		         //验证手机提交信息
		        if(phone==""){
		        	swal("请完成表单填写！")
		        	$("#msg_phone").html("手机号不能为空！");
		        	return false;
		        }else if(!(/^1[34578]\d{9}$/.test(phone))){
		        	swal("手机号格式不对！");
		        	$("#msg_company").html("手机号格式不对！");
		        	return false;
		        }else{
		        	$("#phone_msg").hide();
		        }

		        //公司名称
		         if(company==""){
		        	swal("请完成表单填写！")
		        	$("#msg_provinces").html("公司名称不能为空");
		        	return false;
		        }else{
		        	$("#company_msg").hide();
		        }

		        //验证密码提交信息
				if(pass==""){
					swal("请完成表单填写！")
		        	$("#msg_pass").html("密码不能为空！");
		        	return false;
		        }else if(!(/^[A-Za-z0-9]{6,20}$/.test(pass))){
		        	swal("密码输入6-20位数字或字母！");
		        	$("#msg_pass").html("密码输入6-20位数字或字母！");
		        	return false;
		        }else if(pass.length>=6 || pass.length<=20){
		        	$("#pass_msg").hide();
		        }

		        //验证确认密码信息
		        if(pass_confirm == ""){
		        	swal("请完成表单填写！")
					$("#msg_confirm").html("密码确认不能为空！");
					return false;
		        }else if(pass_confirm != pass && !(/^[A-Za-z0-9]{6,20}$/.test(pass_confirm))){
		        	swal("密码不一致！");
					$("#msg_confirm").html("密码不一致！");
					return false;
		        }else{
		        	$("#confirm_msg").hide();
		        }
		        //验证码信息验证
		        if(security==""){
		        	swal("请完成表单填写！")
		        	return false;
		        	$("#msg_security").html("请完填写验证码！");
		        }else if(!(/^[A-Za-z0-9]{4}$/.test(security))){
		        	swal("验证码为6位数字或字母！");
		        }else{
		        	$("security_msg").hide();
		        }

		        //数据json表单
		        data={
		        	"user" : user,
		        	"phone" : phone,
		        	"pass" : pass,
		        	"pass_confirm" : pass_confirm,
		        	"checkbox" : checkbox,
		        	"provinces" : provinces
		        };
		        //数据提交
		        $.ajax({  
                	type: "post",  
               	 	url:"SearchInfo/QueryMoreInfo",  
                	data:data,// 序列化表单值  
                	async: false, 
                	 cache:false,
                	dataType:"json", 
                	error: function(status=1) { 
                		console.log(status); 
                		if(status==0){
                			swal({
                			title: "登录失败!",
				            type: "error",
				            timer: 5000,
				            showConfirmButton: false,
				            sleep : 20000
                		});  
                    	window.location.href="";  
                		}
                	},  
                	success: function(status=1) {
                		console.log(status); 
                		if(status==1){
                			swal({
                			title: "登录成功!",
				            type: "success",
				            timer: 5000,
				            showConfirmButton: false
                		});  
                    	window.location.href="";  
                		}
                	}  
            	}); 
        	}
        });
	});
});

