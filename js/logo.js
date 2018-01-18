/*
* 登录业务逻辑编写
* auth@xiaomin.zhang
* time 2017-10-20
*/
$(function(){

	//回车登录操作
	$("body").bind('keyup',function(event) { 
		if(event.keyCode==13){ 
			var user=$("#user").val(),
			pass=$("#pass").val(),
			checkbox=$("#checkbox").prop("checked");
						
			//判断复选框是否选中
			if (checkbox === true) {
				checkbox="1";
			} else {
				checkbox="0";
			}

			//判断密码
			if(pass=="" && !(/^[A-Za-z0-9]{6,20}$/.test(pass))){
				swal("密码不能为空且密码只能为数字、字母！");
			}

			//转换数据格式
			var data={
				"user" : user,
				"pass" : pass,
				"checkbox" : checkbox
			};
			$.ajax({  
		     	type: "get",  
		        url:"../json/1.json",  
		        data:data,// 序列化表单值  
		        async: false, 
		        cache:false,
		        dataType: "json",
		        success: function(status) {
		        	console.log(status); 
		        	if(status.user.state==200){
		        		if(status.user.list.admin==user && status.user.list.pass==pass){
			                window.location.basehref="./home/home.html";
		                }else{   
			                swal("用户名或密码错误，请重新输入！");
		                }
		            }
		        }, 
		        error: function(status) { 
		        	console.log(status); 
		        	if(status==0){
		        		swal("用户名或密码错误，请重新输入！"); 
		        	}
		        }
		 	}); 
		}
	});
	
	//点击登录操作
	$("#logobtn").click(function(sweetalert){
		var user=$("#user").val(),
			pass=$("#pass").val(),
			checkbox=$("#checkbox").prop("checked");
				
		//判断复选框是否选中
		if (checkbox === true) {
			checkbox="1";
		} else {
			checkbox="0";
		}

		//判断密码
		if(pass=="" && !(/^[A-Za-z0-9]{6,20}$/.test(pass))){
		    swal("密码不能为空且密码只能为数字、字母！");
		}

		//转换数据格式
	    var data={
			"user" : user,
			"pass" : pass,
			"checkbox" : checkbox
		};
		$.ajax({  
            type: "get",  
            url:"../json/1.json",  
            data:data,// 序列化表单值  
            async: false,
            cache:false, 
            dataType: "json",
            success: function(status) {
                console.log(status); 
                if(status.user.state==200){
                	if(status.user.list.admin==user && status.user.list.pass==pass){
	                    window.location.href="./home/home.html";
                	}else{   
	                	swal("用户名或密码错误，请重新输入！");
                	}
                }
            }, 
            error: function(status) { 
                console.log(status); 
                if(status==0){
                	swal("用户名或密码错误，请重新输入！"); 
                }
            }
        }); 
	});
});