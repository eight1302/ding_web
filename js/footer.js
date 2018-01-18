$(function(){
	//自动2秒播放
	$('#myCarousel').carousel({
		interval : 2000,
	});

	//公告列表显示
	$.getJSON({
    	url:"../../json/2.json",
    	cache:false,
    	success:function(result,data){
    		if(result.data.state==200){
    			for(var i=0;i<result.data.ul_list.length;i++){
					console.log(result.data.ul_list.length);
					var htm;
					htm='<li class="showdepartmentview" chuang_id="'+result.data.ul_list[i].id+'">'+
						'<span class="col-md-5 chuang_news" id="chuang_news">'+result.data.ul_list[i].title+'</span>'+
						'<span class="col-md-4 chuang_time" id="chuang_time">'+result.data.ul_list[i].time+'</span>'+
						'<span class="col-md-1 chuang_round">'+'<div class="round">'+'</div>'+
						'</span>'+
						'</li>';
						$(".chuang_news").each(function(){
							var news_maxwidth=10;
							if($(this).text().length>news_maxwidth){
								$(this).text($(this).text().substring(0,news_maxwidth));
								$(this).html($(this).html()+'…');
							}
						});
					$(".bull_news").append(htm);
				}
				$(".showdepartmentview").click(function(){
					$(".overlay_home").show();
					$(".corporate_actions").show();
					$(".corporate_news").empty();
					var id= $(this).attr("chuang_id")-1;
				    var htm;
				    htm='<div class="corporate_news_tital_time">'+
							'<span>'+result.data.ul_list[id].time+'</span>'+
						'</div>'+
						'<div class="corporate_news_tital">'+
							'<div class="company_tital">'+
								'<span class="company_title">'+result.data.ul_list[id].title+'</span>'+
								'<span class="col-btn">'+'<img src="../../img/canel.png" class="company_tital_img">'+'</span>'+
							'</div>'+
							'<div class="conpany_img">'+
								'<img src="'+result.data.ul_list[id].img+'"class="conpany_img_products">'+
								'<p class="tital_p">'+result.data.ul_list[id].news+'</p>'+
							'</div>'+
						'</div>';
					$(".corporate_news").append(htm);
					
					//退出弹出窗
					$(".col-btn").click(function(){
						$(".overlay_home").hide();
						$(".corporate_actions").hide();
					});
				});

    		}else{
    			 $(".toast_news").hide();
    		}
    	},
    	error:function(){
    		$(".toast_news").hide();
    	}
	});

	//订单信息列表
	$.getJSON({
	    url:"../../json/3.json",
	    cache:false,
	    success:function(result,data){
		    if(result.data.state==200){
				var htm1;
				for(var i=0;i<result.data.part.length;i++){
						htm1='<li>'+
							'<span class="order_statu1 col-md-2" id="order_contract">'+
								result.data.part[i].order_contract+
							'</span>'+
							'<span class="order_statu2 col-md-2" id="order_time">'+
								result.data.part[i].order_time+
							'</span>'+
							'<span class="order_statu3 col-md-2" id="order_type">'+
								result.data.part[i].order_type+
							'</span>'+
							'<span class="order_statu4 col-md-2" id="order_payment">'+
								result.data.part[i].order_payment+
							'</span>'+
							'<span class="order_statu5 col-md-2" id="order_status">'+
								result.data.part[i].order_status+
							'</span>'+	
							'<span class="order_statu6 col-md-2" id="order_amount">'+
								result.data.part[i].order_amount+
							'</span>'+	
							'</li>';
						$(".order_ul").append(htm1);
					}
				$("#pay_order").change(function(){
					pay_order_value = $(this).children('option:selected').val();
					for(var i=0;i<result.data.part.length;i++){
					$(".order_ul").append(htm1);
					switch(pay_order_value){
						case "0":
							$(".order_ul").empty();
							for(var i=0;i<result.data.part.length;i++){
								console.log(result.data.part.length);
								htm1='<li>'+
									'<span class="order_statu1 col-md-2" id="order_contract">'+
										result.data.part[i].order_contract+
									'</span>'+
									'<span class="order_statu2 col-md-2" id="order_time">'+
										result.data.part[i].order_time+
									'</span>'+
									'<span class="order_statu3 col-md-2" id="order_type">'+
										result.data.part[i].order_type+
									'</span>'+
									'<span class="order_statu4 col-md-2" id="order_payment">'+
										result.data.part[i].order_payment+
									'</span>'+
									'<span class="order_statu5 col-md-2" id="order_status">'+
										result.data.part[i].order_status+
									'</span>'+	
									'<span class="order_statu6 col-md-2" id="order_amount">'+
										result.data.part[i].order_amount+
									'</span>'+	
									'</li>';
								$(".order_ul").append(htm1);
							}
						break;
						case "1":
							$(".order_ul").empty();
							for(var i=0;i<result.data.part.length;i++){
								if(result.data.part[i].order_payment=="已付款"){
									console.log(result.data.part.length);
									htm1='<li>'+
										'<span class="order_statu1 col-md-2" id="order_contract">'+
											result.data.part[i].order_contract+
										'</span>'+
										'<span class="order_statu2 col-md-2" id="order_time">'+
											result.data.part[i].order_time+
										'</span>'+
										'<span class="order_statu3 col-md-2" id="order_type">'+
											result.data.part[i].order_type+
										'</span>'+
										'<span class="order_statu4 col-md-2" id="order_payment">'+	
											result.data.part[i].order_payment+
										'</span>'+
										'<span class="order_statu5 col-md-2" id="order_status">'+
											result.data.part[i].order_status+
										'</span>'+	
										'<span class="order_statu6 col-md-2" id="order_amount">'+
											result.data.part[i].order_amount+
										'</span>'+	
									'</li>';
									$(".order_ul").append(htm1);
								}
							}
						break;
						case "2":
							$(".order_ul").empty();
							for(var i=0;i<result.data.part.length;i++){
								console.log(result.data.part.length);
								if(result.data.part[i].order_payment=="未付款"){
									htm1='<li>'+
									'<span class="order_statu1 col-md-2" id="order_contract">'+
										result.data.part[i].order_contract+
									'</span>'+
									'<span class="order_statu2 col-md-2" id="order_time">'+
										result.data.part[i].order_time+
									'</span>'+
									'<span class="order_statu3 col-md-2" id="order_type">'+
										result.data.part[i].order_type+
									'</span>'+
									'<span class="order_statu4 col-md-2 nopay" id="order_payment">'+
										result.data.part[i].order_payment+
									'</span>'+
									'<span class="order_statu5 col-md-2" id="order_status">'+
										result.data.part[i].order_status+
									'</span>'+	
									'<span class="order_statu6 col-md-2" id="order_amount">'+
										result.data.part[i].order_amount+
									'</span>'+	
									'</li>';
									$(".order_ul").append(htm1);
								}
							}
						break;
						case "3":
							$(".order_ul").empty();
							for(var i=0;i<result.data.part.length;i++){
								if(result.data.part[i].order_payment=="部分付款"){
									console.log(result.data.part.length);
									htm1='<li>'+
										'<span class="order_statu1 col-md-2" id="order_contract">'+
											result.data.part[i].order_contract+
										'</span>'+
										'<span class="order_statu2 col-md-2" id="order_time">'+
											result.data.part[i].order_time+
										'</span>'+
										'<span class="order_statu3 col-md-2" id="order_type">'+
											result.data.part[i].order_type+
										'</span>'+
										'<span class="order_statu4 col-md-2" id="order_payment">'+	
											result.data.part[i].order_payment+
										'</span>'+
										'<span class="order_statu5 col-md-2" id="order_status">'+
											result.data.part[i].order_status+
										'</span>'+	
										'<span class="order_statu6 col-md-2" id="order_amount">'+
											result.data.part[i].order_amount+
										'</span>'+	
									'</li>';
									$(".order_ul").append(htm1);
								}
							}
						break;
						default:
							$(".order_ul").empty();
							for(var i=0;i<result.data.part.length;i++){
								console.log(result.data.part.length);
									htm1='<li>'+
										'<span class="order_statu1 col-md-2" id="order_contract">'+
											"暂无数据"+
										'</span>'+
										'<span class="order_statu2 col-md-2" id="order_time">'+
											"暂无数据"+
										'</span>'+
										'<span class="order_statu3 col-md-2" id="order_type">'+
											"暂无数据"+
										'</span>'+
										'<span class="order_statu4 col-md-2 nopay" id="order_payment">'+
											"暂无数据"+
										'</span>'+
										'<span class="order_statu5 col-md-2" id="order_status">'+
											"暂无数据"+
										'</span>'+	
										'<span class="order_statu6 col-md-2" id="order_amount">'+
											"暂无数据"+
										'</span>'+	
										'</li>';
									$(".order_ul").append(htm1);
								}
							}
					}		
				});
				$("#order_all").change(function(){
					order_all_value = $(this).children('option:selected').val();
					console.log(order_all_value);
					$(".order_ul").append(htm1);
					switch(order_all_value){
						case "0":
							$(".order_ul").empty();
							for(var i=0;i<result.data.part.length;i++){
								console.log(result.data.part.length);
								htm1='<li>'+
									'<span class="order_statu1 col-md-2" id="order_contract">'+
										result.data.part[i].order_contract+
									'</span>'+
									'<span class="order_statu2 col-md-2" id="order_time">'+
										result.data.part[i].order_time+
									'</span>'+
									'<span class="order_statu3 col-md-2" id="order_type">'+
										result.data.part[i].order_type+
									'</span>'+
									'<span class="order_statu4 col-md-2" id="order_payment">'+
										result.data.part[i].order_payment+
									'</span>'+
									'<span class="order_statu5 col-md-2" id="order_status">'+
										result.data.part[i].order_status+
									'</span>'+	
									'<span class="order_statu6 col-md-2" id="order_amount">'+
										result.data.part[i].order_amount+
									'</span>'+	
									'</li>';
								$(".order_ul").append(htm1);
							}
						break;
						case "1":
							$(".order_ul").empty();
							for(var i=0;i<result.data.part.length;i++){
								if(result.data.part[i].order_status=="销售审核中"){
									console.log(result.data.part.length);
									htm1='<li>'+
										'<span class="order_statu1 col-md-2" id="order_contract">'+
											result.data.part[i].order_contract+
										'</span>'+
										'<span class="order_statu2 col-md-2" id="order_time">'+
											result.data.part[i].order_time+
										'</span>'+
										'<span class="order_statu3 col-md-2" id="order_type">'+
											result.data.part[i].order_type+
										'</span>'+
										'<span class="order_statu4 col-md-2" id="order_payment">'+	
											result.data.part[i].order_payment+
										'</span>'+
										'<span class="order_statu5 col-md-2" id="order_status">'+
											result.data.part[i].order_status+
										'</span>'+	
										'<span class="order_statu6 col-md-2" id="order_amount">'+
											result.data.part[i].order_amount+
										'</span>'+	
									'</li>';
									$(".order_ul").append(htm1);
								}
							}
						break;
						case "2":
							$(".order_ul").empty();
							for(var i=0;i<result.data.part.length;i++){
								console.log(result.data.part.length);
								if(result.data.part[i].order_status=="等待客户确认"){
									htm1='<li>'+
									'<span class="order_statu1 col-md-2" id="order_contract">'+
										result.data.part[i].order_contract+
									'</span>'+
									'<span class="order_statu2 col-md-2" id="order_time">'+
										result.data.part[i].order_time+
									'</span>'+
									'<span class="order_statu3 col-md-2" id="order_type">'+
										result.data.part[i].order_type+
									'</span>'+
									'<span class="order_statu4 col-md-2 nopay" id="order_payment">'+
										result.data.part[i].order_payment+
									'</span>'+
									'<span class="order_statu5 col-md-2" id="order_status">'+
										result.data.part[i].order_status+
									'</span>'+	
									'<span class="order_statu6 col-md-2" id="order_amount">'+
										result.data.part[i].order_amount+
									'</span>'+	
									'</li>';
									$(".order_ul").append(htm1);
								}
							}
						break;
						case "3":
							$(".order_ul").empty();
							for(var i=0;i<result.data.part.length;i++){
								console.log(result.data.part.length);
								if(result.data.part[i].order_status=="上传支付凭证"){
									htm1='<li>'+
									'<span class="order_statu1 col-md-2" id="order_contract">'+
										result.data.part[i].order_contract+
									'</span>'+
									'<span class="order_statu2 col-md-2" id="order_time">'+
										result.data.part[i].order_time+
									'</span>'+
									'<span class="order_statu3 col-md-2" id="order_type">'+
										result.data.part[i].order_type+
									'</span>'+
									'<span class="order_statu4 col-md-2 nopay" id="order_payment">'+
										result.data.part[i].order_payment+
									'</span>'+
									'<span class="order_statu5 col-md-2" id="order_status">'+
										result.data.part[i].order_status+
									'</span>'+	
									'<span class="order_statu6 col-md-2" id="order_amount">'+
										result.data.part[i].order_amount+
									'</span>'+	
									'</li>';
									$(".order_ul").append(htm1);
								}
							}
						break;
						case "4":
							$(".order_ul").empty();
							for(var i=0;i<result.data.part.length;i++){
								console.log(result.data.part.length);
								if(result.data.part[i].order_status=="生产中"){
									htm1='<li>'+
									'<span class="order_statu1 col-md-2" id="order_contract">'+
										result.data.part[i].order_contract+
									'</span>'+
									'<span class="order_statu2 col-md-2" id="order_time">'+
										result.data.part[i].order_time+
									'</span>'+
									'<span class="order_statu3 col-md-2" id="order_type">'+
										result.data.part[i].order_type+
									'</span>'+
									'<span class="order_statu4 col-md-2 nopay" id="order_payment">'+
										result.data.part[i].order_payment+
									'</span>'+
									'<span class="order_statu5 col-md-2" id="order_status">'+
										result.data.part[i].order_status+
									'</span>'+	
									'<span class="order_statu6 col-md-2" id="order_amount">'+
										result.data.part[i].order_amount+
									'</span>'+	
									'</li>';
									$(".order_ul").append(htm1);
								}
							}
						break;
						case "5":
							$(".order_ul").empty();
							for(var i=0;i<result.data.part.length;i++){
								console.log(result.data.part.length);
								if(result.data.part[i].order_status=="已送达"){
									htm1='<li>'+
									'<span class="order_statu1 col-md-2" id="order_contract">'+
										result.data.part[i].order_contract+
									'</span>'+
									'<span class="order_statu2 col-md-2" id="order_time">'+
										result.data.part[i].order_time+
									'</span>'+
									'<span class="order_statu3 col-md-2" id="order_type">'+
										result.data.part[i].order_type+
									'</span>'+
									'<span class="order_statu4 col-md-2 nopay" id="order_payment">'+
										result.data.part[i].order_payment+
									'</span>'+
									'<span class="order_statu5 col-md-2" id="order_status">'+
										result.data.part[i].order_status+
									'</span>'+	
									'<span class="order_statu6 col-md-2" id="order_amount">'+
										result.data.part[i].order_amount+
									'</span>'+	
									'</li>';
									$(".order_ul").append(htm1);
								}
							}
						break;
						case "6":
							$(".order_ul").empty();
							for(var i=0;i<result.data.part.length;i++){
								console.log(result.data.part.length);
								if(result.data.part[i].order_status=="已送达,上传支付凭证"){
									htm1='<li>'+
									'<span class="order_statu1 col-md-2" id="order_contract">'+
										result.data.part[i].order_contract+
									'</span>'+
									'<span class="order_statu2 col-md-2" id="order_time">'+
										result.data.part[i].order_time+
									'</span>'+
									'<span class="order_statu3 col-md-2" id="order_type">'+
										result.data.part[i].order_type+
									'</span>'+
									'<span class="order_statu4 col-md-2 nopay" id="order_payment">'+
										result.data.part[i].order_payment+
									'</span>'+
									'<span class="order_statu5 col-md-2" id="order_status">'+
										result.data.part[i].order_status+
									'</span>'+	
									'<span class="order_statu6 col-md-2" id="order_amount">'+
										result.data.part[i].order_amount+
									'</span>'+	
									'</li>';
									$(".order_ul").append(htm1);
								}
							}
						break;
						case "7":
							$(".order_ul").empty();
							for(var i=0;i<result.data.part.length;i++){
								console.log(result.data.part.length);
								if(result.data.part[i].order_status=="返修中"){
									htm1='<li>'+
									'<span class="order_statu1 col-md-2" id="order_contract">'+
										result.data.part[i].order_contract+
									'</span>'+
									'<span class="order_statu2 col-md-2" id="order_time">'+
										result.data.part[i].order_time+
									'</span>'+
									'<span class="order_statu3 col-md-2" id="order_type">'+
										result.data.part[i].order_type+
									'</span>'+
									'<span class="order_statu4 col-md-2 nopay" id="order_payment">'+
										result.data.part[i].order_payment+
									'</span>'+
									'<span class="order_statu5 col-md-2" id="order_status">'+
										result.data.part[i].order_status+
									'</span>'+	
									'<span class="order_statu6 col-md-2" id="order_amount">'+
										result.data.part[i].order_amount+
									'</span>'+	
									'</li>';
									$(".order_ul").append(htm1);
								}
							}
						break;
						case "8":
							$(".order_ul").empty();
							for(var i=0;i<result.data.part.length;i++){
								console.log(result.data.part.length);
								if(result.data.part[i].order_status=="部分签收"){
									htm1='<li>'+
									'<span class="order_statu1 col-md-2" id="order_contract">'+
										result.data.part[i].order_contract+
									'</span>'+
									'<span class="order_statu2 col-md-2" id="order_time">'+
										result.data.part[i].order_time+
									'</span>'+
									'<span class="order_statu3 col-md-2" id="order_type">'+
										result.data.part[i].order_type+
									'</span>'+
									'<span class="order_statu4 col-md-2 nopay" id="order_payment">'+
										result.data.part[i].order_payment+
									'</span>'+
									'<span class="order_statu5 col-md-2" id="order_status">'+
										result.data.part[i].order_status+
									'</span>'+	
									'<span class="order_statu6 col-md-2" id="order_amount">'+
										result.data.part[i].order_amount+
									'</span>'+	
									'</li>';
									$(".order_ul").append(htm1);
								}
							}
						break;
						default:
							$(".order_ul").empty();
							for(var i=0;i<result.data.part.length;i++){
								console.log(result.data.part.length);
								htm1='<li>'+
									'<span class="order_statu1 col-md-2" id="order_contract">'+
										"暂无数据"+
									'</span>'+
									'<span class="order_statu2 col-md-2" id="order_time">'+
										"暂无数据"+
									'</span>'+
									'<span class="order_statu3 col-md-2" id="order_type">'+
										"暂无数据"+
									'</span>'+
									'<span class="order_statu4 col-md-2 nopay" id="order_payment">'+
										"暂无数据"+
									'</span>'+
									'<span class="order_statu5 col-md-2" id="order_status">'+
										"暂无数据"+
									'</span>'+	
									'<span class="order_statu6 col-md-2" id="order_amount">'+
										"暂无数据"+
									'</span>'+	
									'</li>';
								$(".order_ul").append(htm1);
							}
					}
				})
			}
	    }
	});


	/*订单状态分析echarts饼状图展示消费   支付*/
	var myChart1 = echarts.init(document.getElementById('mychart1'));
	$.getJSON({
    	url:"../../json/3.json",
    	cache:false,
    	success:function(result,data){
    		if(result.order.state==200){
    			
				var trem1_option = {
				    tooltip: {
				        trigger: 'item',
				        formatter: "{a} <br/>{b}: {c} ({d}%)"
				    },
				    legend: {
				        orient: 'vertical',
				        x: 'right',
				        data:['支付','未支付']
				    },
				    color : ['#38b9db','#e15172'],
				    series: [
				        {
				            name:'访问来源',
				            type:'pie',
				            radius: ['40%', '60%'],
				            avoidLabelOverlap: false,
				            label: {
				                normal: {
				                    show: false,
				                    position: 'center'
				                },
				                emphasis: {
				                    show: true,
				                    textStyle: {
				                        fontSize: '10',
				                        fontWeight: 'bold'
				                    }
				                }
				            },
				            labelLine: {
				                normal: {
				                    show: false
				                }
				            },
				            data:[
				                {value:result.order.chart.payorder.pay, name:result.order.chart.payorder.pay_name},
				                {value:result.order.chart.payorder.nopay, name:result.order.chart.payorder.nopay_name}
				            ]
				        }
				    ]
				};
				 myChart1.setOption(trem1_option);
    		}else{}
    	},
    	error:function(){}
	});
	

	/*订单状态分析echarts饼状图展示消费  焊接状态*/
	var myChart2 = echarts.init(document.getElementById('mychart2'));
	$.getJSON({
    	url:"../../json/3.json",
    	cache:false,
    	success:function(result,data){
    		if(result.order.state==200){
    			
				var trem2_option = {
				    tooltip: {
				        trigger: 'item',
				        formatter: "{a} <br/>{b}: {c} ({d}%)"
				    },
				    legend: {
				        orient: 'vertical',
				        x: 'right',
				        data:['焊接','非焊接']
				    },
				    color : ['#6fbe44','#f6da37'],
				    series: [
				        {
				            name:'访问来源',
				            type:'pie',
				            radius: ['40%', '60%'],
				            avoidLabelOverlap: false,
				            label: {
				                normal: {
				                    show: false,
				                    position: 'center'
				                },
				                emphasis: {
				                    show: true,
				                    textStyle: {
				                        fontSize: '10',
				                        fontWeight: 'bold'
				                    }
				                }
				            },
				            labelLine: {
				                normal: {
				                    show: false
				                }
				            },
				            data:[
				                {value:result.order.chart.weldingorder.welding, name:result.order.chart.weldingorder.welding_name},
				                {value:result.order.chart.weldingorder.nowelding, name:result.order.chart.weldingorder.nowelding_name}
				            ]
				        }
				    ]
				};
				myChart2.setOption(trem2_option);
    		}else{}
    	},
    	error:function(){}
	});

	
	/*订单状态分析echarts饼状图展示消费  完成状态*/
	var myChart3 = echarts.init(document.getElementById('mychart3'));
	$.getJSON({
    	url:"../../json/3.json",
    	cache:false,
    	success:function(result,data){
    		if(result.order.state==200){
    			
				var trem3_option = {
				    tooltip: {
				        trigger: 'item',
				        formatter: "{a} <br/>{b}: {c} ({d}%)"
				    },
				    legend: {
				        orient: 'vertical',
				        x: 'right',
				        data:['完成','未完成']
				    },
				    color : ['#cb4fe2','#f96244'],
				    series: [
				        {
				            name:'访问来源',
				            type:'pie',
				            radius: ['40%', '60%'],
				            avoidLabelOverlap: false,
				            label: {
				                normal: {
				                    show: false,
				                    position: 'center'
				                },
				                emphasis: {
				                    show: true,
				                    textStyle: {
				                        fontSize: '10',
				                        fontWeight: 'bold'
				                    }
				                }
				            },
				            labelLine: {
				                normal: {
				                    show: false
				                }
				            },
				            data:[
				               {value:result.order.chart.completeorder.complete, name:result.order.chart.completeorder.complete_name},
				               {value:result.order.chart.completeorder.nocomplete, name:result.order.chart.completeorder.nocomplete_name}
				            ]
				        }
				    ]
				};

				//加载echarts图形
				 myChart3.setOption(trem3_option);
    		}else{}
    	},
    	error:function(){}
	});
	//订单完成状态
	window.onresize = function(){
		myChart1.resize();
		myChart2.resize();
		myChart3.resize();
	}
});			