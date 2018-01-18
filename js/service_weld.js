/* 自助下单功能逻辑开始*/
$(function(){

    //订单管理路由跳转结束
    $(".data1").cxCalendar({
        baseClass: 'cxcalendar_holyday'
    });
    $(".data2").cxCalendar({
        baseClass: 'cxcalendar_holyday'
    });
     //获取当前时间
    var myDate = new Date();
    var year=myDate.getFullYear();   //获取当前年
    var month=myDate.getMonth()+1;   //获取当前月
    var date=myDate.getDate();       //获取当前日
    var now_time=year+'.'+month+"."+date;

    //展示焊接信息自助下单获取信息业务逻辑编写开始
    $.getJSON({
        url:"../../json/data_weld.json",
        cache:false,
        success:function(result,data){
            if(result.orderlist.state==200){
                $.each(result.orderlist.weld, function(idx,obj){
                    var html;
                    html = '<div class="product_all">'+
                            '<div class="col-md-1 product_list" data-field="state" data-checkbox="true">'+'<input type="checkbox" name="sign" style="width: 15px;height: 15px;" value="'+obj.id+'" />'+'</div>'+
                            '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+obj.product_id+'</div>'+
                            '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+obj.product_time+'</div>'+
                            '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+obj.product_name+'</div>'+
                            '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+obj.product_number+'</div>'+
                            '<div class="col-md-2 product_list" name="sign" data-field="product_id" data-align="center" id="product_type" value="'+obj.product_type+'">'+obj.product_type+'</div>'+
                            '<div class="col-md-1 product_details_weld" data-field="product_id" data-align="center" product_id="'+obj.id+'">查看详情</div>';
                    $(".page_list_weld").append(html);         
                }); 
                var content=result.orderlist.content;       //总数
                var pagesize=14;                            //每页显示数据14条
                var pageTotal=Math.ceil(content/pagesize);  //分页数量
                var html;
                html='<ul class="pagination" id="page2"></ul>';
                $(".page-left").append(html);
                Page({
                    num:pageTotal,             //页码数
                    startnum:1,
                    pagesize:1,             //每页显示的数量
                    elem:$('#page2'),       //指定的元素
                    callback:function(n){   //回调函数 
                        console.log(n);     
                    }
                });

                //查看详情
                $(".product_details_weld").on('click',function(){
                    //加载弹出遮盖层
                    var id= $(this).attr("product_id");
                    console.log(id);
                    var id_data={
                        "id":id
                    };
                    $(".overlay_weld_tow").show();
                    $(".orders_weld_details").show();
                                   
                    $(".cental_pro").on('click',function(){
                        $(".overlay_weld_tow").hide();
                        $(".orders_weld_details").hide();
                        window.location.reload();
                    });

                    //获取产品信息
                    $.getJSON({
                        url:"../../json/weld.json",
                        cache:false,
                        data:id_data,
                        success:function(result,data){
                            if(result.state==200){
                                //产品型号
                                var html_product;
                                html_product = '<div class="col-md-4 product_list">'+result.product_number+'</div>'+
                                                '<div class="col-md-4 product_list">'+result.product_name+'</div>'+
                                                '<div class="col-md-4 product_list">'+result.product_type_number+'</div>';
                                $(".weld_list").append(html_product);

                                //下载按钮
                                var html_downlod;
                                html_downlod = '<div class="col-md-5 pcb_downlode" title="PCB下载">'+
                                                    '<a href="" target="blank" id="pcb_down" style="color:#fff;">PCB</a>'+
                                                '</div>'+
                                            '<div class="col-md-5 coordinate_downlode" title="坐标文件下载">'+
                                                '<a href="" target="blank" id="coordinate_down" style="color:#fff;">坐标</a>'+
                                            '</div>'+
                                            '<div class="col-md-5 process_downlode" title="工艺文件下载">'+
                                                '<a href="" target="blank" id="process_down" style="color:#fff;">工艺</a>'+
                                            '</div>'+
                                            '<div class="col-md-5 bom_downlode" title="BOM文件下载">'+
                                                '<a href="" target="blank" id="bom_down" style="color:#fff;">BOM</a>'+
                                            '</div>';   
                                $(".list_downlod").append(html_downlod);

                                //产品pcba清单
                                var html_pcba;
                                html_pcba = '<div class="col-md-2 product_list">'+result.pcba_process+'</div>'+
                                            '<div class="col-md-1 product_list">'+result.pcba_smt_type+'</div></div></div></div>'+
                                            '<div class="col-md-2 product_list">'+result.pcba_smt_joints+'</div>'+
                                            '<div class="col-md-1 product_list">'+result.pcba_dip_type+'</div>'+
                                            '<div class="col-md-2 product_list">'+result.pcba_dip_joints+'</div>'+
                                            '<div class="col-md-2 product_list">'+result.pcba_stencil+'</div>'+
                                            '<div class="col-md-2 product_list">'+result.pcba_stencil_num+'</div>';
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
                            }
                            //下载PCB文件
                            $(".pcb_downlode").on('click',function(){
                                 $.ajax({  
                                    type: "get",  
                                    url:"../../json/menu.json",  
                                    async: false, 
                                    cache:false,
                                    dataType: "json",
                                    success: function(status) {
                                        console.log(status); 
                                        if(status.state==200){
                                            try{   
                                                var a = document.getElementById("pcb_down");  
                                                a.href=status.pcb;   
                                            }catch(e){   
                                            }   
                                        }
                                    }
                                });
                            });

                            //下载工艺文件
                            $(".process_downlode").on('click',function(){
                                 $.ajax({  
                                    type: "get",  
                                    url:"../../json/menu.json",  
                                    async: false, 
                                    cache:false,
                                    dataType: "json",
                                    success: function(status) {
                                        console.log(status); 
                                        if(status.state==200){
                                            try{   
                                                var a = document.getElementById("process_down");  
                                                a.href=status.pcb;   
                                            }catch(e){   
                                            }   
                                        }
                                    }
                                });
                            });

                            //下载坐标文件
                            $(".coordinate_downlode").on('click',function(){
                                 $.ajax({  
                                    type: "get",  
                                    url:"../../json/menu.json",  
                                    async: false, 
                                    cache:false,
                                    dataType: "json",
                                    success: function(status) {
                                        console.log(status); 
                                        if(status.state==200){
                                            try{   
                                                var a = document.getElementById("coordinate_down");  
                                                a.href=status.pcb;   
                                            }catch(e){   
                                            }   
                                        }
                                    }
                                });
                            });

                            //下载bom文件
                            $(".bom_downlode").on('click',function(){
                                 $.ajax({  
                                    type: "get",  
                                    url:"../../json/menu.json",  
                                    async: false, 
                                    cache:false,
                                    dataType: "json",
                                    success: function(status) {
                                        console.log(status); 
                                        if(status.state==200){
                                            try{   
                                                var a = document.getElementById("bom_down");  
                                                a.href=status.bom;   
                                            }catch(e){   
                                            }   
                                        }
                                    }
                                });
                            });
                        }
                    });
                    
                    //获取bom信息
                     //获取产品信息
                    $.getJSON({
                        url:"../../json/weld.json",
                        cache:false,
                        data:id_data,
                        success:function(result,data){
                            if(result.state==200){
                                //bom表头
                                $.each(result.bom_tital, function(idx,obj){
                                    var bom_tital;
                                    bom_tital ='<div class="col-md-1">'+obj.numbering+'</div>'+
                                                '<div class="col-md-2">'+obj.name+'</div>'+
                                                '<div class="col-md-1">'+obj.type+'</div>'+
                                                '<div class="col-md-1">'+obj.encapsulation+'</div>'+
                                                '<div class="col-md-2">'+obj.bit_number+'</div>'+
                                                '<div class="col-md-1">'+obj.accuracy+'</div>'+
                                                '<div class="col-md-2">'+obj.brands+'</div>'+
                                                '<div class="col-md-1">'+obj.quantity+'</div>'+
                                                '<div class="col-md-1">备注</div>';
                                    $(".product_tr_weld").append(bom_tital);
                                });
                                //bom清单
                                $.each(result.bom, function(idx,obj){
                                    var html_bom;
                                    html_bom ='<div class="bom_list_oem">'+ 
                                            '<div class="col-md-1">'+obj.number+'</div>'+
                                            '<div class="col-md-2">'+obj.name+'</div>'+
                                            '<div class="col-md-1">'+obj.model_number+'</div>'+
                                            '<div class="col-md-1">'+obj.encapsulation+'</div>'+
                                            '<div class="col-md-2">'+obj.accuracy+'</div>'+
                                            '<div class="col-md-1">'+obj.brands+'</div>'+
                                            '<div class="col-md-2">'+obj.bit_number+'</div>'+
                                            '<div class="col-md-1">'+obj.quantity+'</div>'+
                                            '<div class="col-md-1 weld_bom" title="'+obj.remark+'">'+obj.remark+'</div>'+
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
            }else{
                swal("暂无数据！");
            }
        },
        error:function(result,sweetalert){
            swal("暂无数据！");
        }
    });


    //查询时间段的信息
    $(".search_btn").on('click',function(){
        var data1 = $("#data1").val(),
            data2 = $("#data2").val();
        if(data1 == "" || data2 == ""){
            return false;
        }
        var data_time = {
            "data1" : data1,
            "data2" : data2
        };
           
        //数据交互
        $(".page_list_weld").empty();
        $.getJSON({
            type: "post",  
            url:"../../json/data1.json",
            data:data_time,// 序列化表单值  
            async: false, 
            cache:false,
            dataType:"json", 
            success:function(result,data){
                if(result.orderlist.state==200){
                    $.each(result.orderlist.list, function(idx,obj){
                        var html;
                        html = '<div class="product_all">'+
                            '<div class="col-md-1 product_list" data-field="state" data-checkbox="true">'+'<input type="checkbox" name="sign" style="width: 15px;height: 15px;" value="'+obj.id+'" />'+'</div>'+
                            '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+obj.product_id+'</div>'+
                            '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+obj.product_time+'</div>'+
                            '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+obj.product_name+'</div>'+
                            '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+obj.product_number+'</div>'+
                            '<div class="col-md-2 product_list" name="sign" data-field="product_id" data-align="center" id="product_type" value="'+obj.product_type+'">'+obj.product_type+'</div>'+
                            '<div class="col-md-1 product_details_weld" data-field="product_id" data-align="center" product_id="'+obj.id+'">'+obj.product_details+'</div>';
                        $(".page_list_weld").append(html);          
                    }); 
                    var content=result.orderlist.content;       //总数
                    var pagesize=14;                            //每页显示数据14条
                    var pageTotal=Math.ceil(content/pagesize);  //分页数量
                    var html;
                    html='<ul class="pagination" id="page2"></ul>';
                    $(".page-left").append(html);
                    Page({
                        num:pageTotal,             //页码数
                        startnum:1,
                        pagesize:1,             //每页显示的数量
                        elem:$('#page2'),       //指定的元素
                        callback:function(n){   //回调函数 
                            console.log(n);     
                        }
                    });
                }else{
                    swal("暂无数据！");
                }
            },
            error:function(result,sweetalert){
                swal("暂无数据！");
            }
        });            
    });
   

    /*下单按钮以及图层业务逻辑展示*/
    $(".product_menu_weld_add").on('click',function(){
        $(".overflow_weld").show();
        $(".weld_details").show();
        //退出焊接下单页面
        $(".cental_pro").on('click',function(){
            $(".overflow_weld").hide();
            $(".weld_details").hide();
            window.location.reload();
        });
    });

     /*自助下单获取信息业务逻辑编写结束*/

    //删除焊接单个产品
    $(".product_menu_weld_dele").on('click',function(){
        var productIds = [];
        var signs = $("input[name='sign']");
        $.each(signs,function(key,obj){
            if(obj.checked){
                var productId = Number(obj.value);
                productIds.push(productId);
            }
        });
        if(productIds.length>0){
           swal({
            title: "您确定要删除选中的产品吗？",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#7B69B3",
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnConfirm: false
            },function(isConfirm){
                if(isConfirm){
                    var dataID={
                        "productIds":productIds
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

      //点击图片上传pcb文件
    $(".uplod_weld_pcb").on('click',function(sweetalert){
        document.getElementById("weld_pcb_file").click();
    });

    //点击图片上传坐标文件
    $(".uplod_weld_coordinate").on('click',function(sweetalert){
        document.getElementById("weld_coordinate_file").click();
    });

     //点击图片工艺文件
    $(".uplod_weld_process").on('click',function(sweetalert){
        document.getElementById("weld_process_file").click();
    });

     //点击图片BOM文件
    $(".uplod_weld_bom").on('click',function(sweetalert){
        document.getElementById("weld_bom_file").click();
    });

    /*weld产品信息填写业务逻辑编写*/
    $(".add_weld_product").on('click',function(sweetalert){
        swal({
            title: "",
            text: "您确定添加此产品到产品列表吗？",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#7B69B3",
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnConfirm: false
        },function(isConfirm){
            if(isConfirm){
                //获取焊接订单新数据信息
                var weld_product_name = $("#weld_product_name").val(),
                    weld_product_type = $("#weld_product_type").val(),
                    weld_pcba_process = $("#weld_pcba_process").val(),
                    weld_pcba_smt_type = $("#weld_pcba_smt_type").val(),
                    weld_pcba_smt_joints = $("#weld_pcba_smt_joints").val(),
                    weld_pcba_dip_type = $("#weld_pcba_dip_type").val(),
                    weld_pcba_dip_joints = $("#weld_pcba_dip_joints").val(),
                    weld_pcba_stencil = $("#weld_pcba_stencil").val(),
                    weld_pcba_stencil_number = $("#weld_pcba_stencil_number").val(),
                    weld_test_time = $("#weld_test_time").val(),
                    weld_prevent_cm2 = $("#weld_prevent_cm2").val(),
                    weld_remark = $("#weld_remark").val(),
                    product_class_type = $("#product_class_type").val();

                //数据库json格式
                var weld_data={
                    "weld_product_name" : weld_product_name,
                    "weld_product_type" : weld_product_type,
                    "weld_pcba_process" : weld_pcba_process,
                    "weld_pcba_smt_type" : weld_pcba_smt_type,
                    "weld_pcba_smt_joints" : weld_pcba_smt_joints,
                    "weld_pcba_dip_type" : weld_pcba_dip_type,
                    "weld_pcba_dip_joints" : weld_pcba_dip_joints,
                    "weld_pcba_stencil" : weld_pcba_stencil,
                    "weld_pcba_stencil_number" : weld_pcba_stencil_number,
                    "weld_test_time" : weld_test_time,
                    "weld_prevent_cm2" : weld_prevent_cm2,
                    "weld_remark" : weld_remark,
                    "product_class_type" : product_class_type,
                    "now_time":now_time
                };


                //判断weld信息不能为空的选项信息
                    
                if(weld_product_name=="" || weld_pcba_process=="" || weld_pcba_smt_type=="" || weld_pcba_dip_type==""){
                    swal("信息不能为空!");
                    return false;
                }

                //判断焊接点数、组装时间
                if(!(/[0-9]/.test(weld_pcba_smt_joints)) || !(/[0-9]/.test(weld_pcba_dip_joints)) || !(/[0-9]/.test(weld_pcba_smt_type)) || !(/[0-9]/.test(weld_pcba_dip_type))){
                    swal("SMT和DIP的种类、焊接点数必须是数字!");
                    return false;
                }

                //判断产品编号以及钢网编号
                if(weld_product_type=="" || (/[\u4e00-\u9fa5]/.test(weld_product_type))){
                    swal("产品型号不能为空、汉字或全角符号！");
                    return false;
                }
                if(weld_pcba_stencil_number!=""){
                    if((/[\u4e00-\u9fa5]/.test(weld_pcba_stencil_number))){
                        swal("钢网编号不能为汉字或全角符号！");
                        return false;
                    }
                }

                //判断焊接点数、组装时间           
                 if(weld_test_time!=""){
                    if(!(/[0-9]/.test(weld_test_time))){
                        swal("焊接产品测试时间必须是数字!");
                        return false;
                   }
                }
                   
                if(weld_prevent_cm2!=""){
                    if(!(/[0-9]/.test(weld_prevent_cm2))){
                        swal("喷涂三防必须是数字!");
                        return false;
                    }
                }
                //数据库交互
                $.getJSON({  
                    type: "post",  
                    url:"../../json/2.json",  
                    data:weld_data,// 序列化表单值  
                    async: false, 
                    cache:false,
                    dataType:"json", 
                    error: function(status) { 
                        console.log(status); 
                        if(status.weldproduct.state==0){
                            swal({
                            title: "添加失败!",
                            type: "error",
                            timer: 5000,
                            showConfirmButton: false,
                            sleep : 20000
                        });  
                        window.location.reload();
                        }
                    },  
                    success: function(status) {
                        console.log(status); 
                        if(status.weldproduct.state==200){
                           swal({
                                title: "添加成功",
                                text:"点击OK，进行下一步上传文件操作"
                            },function(){
                                $(".overlay_uplod").show();
                                $(".file_uplod").show();

                                var id = status.weldproduct.id;
                                console.log(id);

                                //上传pcb文件
                                $(".add_pcb").on('click',function(sweetalert){
                                    var  weld_pcb_file = $("#weld_pcb_file").val();
                                    
                                    //判断pcb文件
                                    if(weld_pcb_file==""){
                                        swal("PCB文件不能为空!");
                                        return false;
                                    }else{
                                        var fileTypes = new Array("rar","zip","tar","gzip","jar");  //定义可支持的文件类型数组
                                        var weld_pcb="0";
                                        var newFileName = weld_pcb_file.split('.');
                                        newFileName = newFileName[newFileName.length-1];
                                        for(var i=0;i<fileTypes.length;i++){
                                            if(fileTypes[i] == newFileName){
                                                weld_pcb = "1";
                                            }
                                        }
                                        if(weld_pcb == "0"){
                                           swal("PCB文件必须是rar,zip,tar,gzip,jar压缩文件！");
                                            return false;
                                        }
                                    }
                                        
                                    var pcb_data = {
                                        "id" :id,
                                        "weld_pcb_file" : weld_pcb_file
                                    };
                                    $.getJSON({  
                                        type: "get",  
                                        url:"../../json/2.json",  
                                        data:pcb_data,// 序列化表单值  
                                        async: false, 
                                        cache:false,
                                        dataType:"json", 
                                        success: function(status) { 
                                            console.log(status);
                                            if(status.text==200){
                                                $(".progress_pcb").show();
                                                var timer=5;
                                                var countdown = setInterval(CountDown,1000);
                                                function CountDown(){
                                                    $(".time1").html("正在上传，请稍等,倒计时"+timer+"s");
                                                    if(timer==0){
                                                        $(".time1").html("上传PCB文件成功").css({"font-size":"18px","color":"#00ff45"});
                                                        $(".prog").hide();
                                                        clearInterval(countdown);
                                                    }
                                                    timer--;
                                                }    
                                            }
                                            if(status.text!=200){
                                                $(".progress_pcb").show();
                                                var timer=5;
                                                var countdown = setInterval(CountDown,1000);
                                                function CountDown(){
                                                    $(".time1").html("正在上传，请稍等,倒计时"+timer+"s");
                                                    if(timer==0){
                                                        swal("上传PCB文件失败，请重新上传");
                                                        $(".progress_pcb").hide();
                                                        clearInterval(countdown);
                                                    }
                                                    timer--;
                                                }    
                                            }
                                        },
                                    });
                                });

                                //上传BOM的excel文件
                                $(".add_bom").on('click',function(){
                                    var weld_bom_file = $("#weld_bom_file").val();
                                    
                                    //ome判定
                                     //判断bom文件
                                    if(weld_bom_file==""){
                                        swal("BOM不能为空!");
                                        return false;
                                    }else{
                                         var fileTypes = new Array("xlsx","xls");  //定义可支持的文件类型数组
                                        var weld_bomfile = "0";
                                        var newFileName = weld_bom_file.split('.');
                                        newFileName = newFileName[newFileName.length-1];
                                        for(var i=0;i<fileTypes.length;i++){
                                            if(fileTypes[i] == newFileName){
                                                weld_bomfile = "1";
                                            }
                                        }
                                        if(weld_bomfile == "0"){
                                            swal("BOM文件必须是xlsx、xls！");
                                            return false;
                                        }
                                    }

                                    var bom_data = {
                                        "id" :id,
                                        "weld_bom_file" : weld_bom_file
                                    };
                                    $.getJSON({  
                                        type: "get",  
                                        url:"../../json/2.json",  
                                        data:bom_data,// 序列化表单值  
                                        async: false, 
                                        cache:false,
                                        dataType:"json", 
                                        success: function(status) { 
                                            console.log(status);
                                            if(status.text==200){
                                                $(".progress_bom").show();
                                                var timer=5;
                                                var countdown = setInterval(CountDown,1000);
                                                function CountDown(){
                                                    $(".time2").html("正在上传，请稍等,倒计时"+timer+"s");
                                                    if(timer==0){
                                                        $(".time2").html("上传BOM文件成功").css({"font-size":"18px","color":"#00ff45"});
                                                        $(".prog_bom").hide();
                                                        clearInterval(countdown);
                                                    }
                                                    timer--;
                                                }       
                                            }
                                            if(status.text!=200){
                                                $(".progress_bom").show();
                                                var timer=5;
                                                var countdown = setInterval(CountDown,1000);
                                                function CountDown(){
                                                    $(".time2").html("正在上传，请稍等,倒计时"+timer+"s");
                                                    if(timer==0){
                                                        swal("上传BOM文件失败，请重新上传");
                                                        $(".progress_bom").hide();
                                                        clearInterval(countdown);
                                                    }
                                                    timer--;
                                                }    
                                            }
                                        },
                                    });
                                });

                                 //上传坐标文件
                                $(".add_coordinate").on('click',function(){
                                    var  weld_coordinate_file = $("#weld_coordinate_file").val();
                                    var dis = 0;

                                    //判断坐标文件
                                    if(weld_coordinate_file != ''){
                                        var fileTypes = new Array("rar","zip","tar","gzip","jar");  //定义可支持的文件类型数组
                                        var weld_coordinate = "0";
                                        var newFileName = weld_coordinate_file.split('.');
                                        dis = 1;
                                        newFileName = newFileName[newFileName.length-1];
                                        for(var i=0;i<fileTypes.length;i++){
                                            if(fileTypes[i] == newFileName){
                                                weld_coordinate = "1";
                                            }
                                        }
                                        if(weld_coordinate == "0"){
                                            swal("坐标文件必须是rar,zip,tar,gzip,jar压缩文件！");
                                            return false;
                                        }
                                    }
                
                                    var coordinate_data = {
                                        "id" :id,
                                        "weld_coordinate_file" : weld_coordinate_file
                                    }
                                    if(dis == 0){
                                        swal("请上传坐标文件！");
                                        return false;
                                    }
                                    
                                    $.getJSON({  
                                        type: "get",  
                                        url:"../../json/2.json",  
                                        data:coordinate_data,// 序列化表单值  
                                        async: false, 
                                        cache:false,
                                        dataType:"json", 
                                        success: function(status) { 
                                            console.log(status);
                                            if(status.text==200){
                                                $(".progress_coordinate").show();
                                                var timer=5;
                                                var countdown = setInterval(CountDown,1000);
                                                function CountDown(){
                                                    $(".time4").html("正在上传，请稍等,倒计时"+timer+"s");
                                                    if(timer==0){
                                                        $(".time4").html("上传坐标文件成功").css({"font-size":"18px","color":"#00ff45"});
                                                        $(".prog_coordinate").hide();
                                                        clearInterval(countdown);
                                                    }
                                                    timer--;
                                                }       
                                            }
                                            if(status.text!=200){
                                                $(".progress_coordinate").show();
                                                var timer=5;
                                                var countdown = setInterval(CountDown,1000);
                                                function CountDown(){
                                                    $(".time4").html("正在上传，请稍等,倒计时"+timer+"s");
                                                    if(timer==0){
                                                        swal("上传坐标文件失败，请重新上传");
                                                        $(".progress_coordinate").hide();
                                                        clearInterval(countdown);
                                                    }
                                                    timer--;
                                                }    
                                            }
                                        },
                                    });
                                });

                                //上传工艺文件
                                $(".add_process").on('click',function(){
                                    var   weld_process_file = $("#weld_process_file").val();
                                    var dis_one = 0;
                                    //工艺文件
                                    if(weld_process_file != ''){
                                        var fileTypes = new Array("rar","zip","tar","gzip","jar");  //定义可支持的文件类型数组
                                        var weld_process = "0";
                                        var newFileName = weld_process_file.split('.');
                                        dis_one = 1;
                                        newFileName = newFileName[newFileName.length-1];
                                        for(var i=0;i<fileTypes.length;i++){
                                            if(fileTypes[i] == newFileName){
                                                weld_process = "1";
                                            }
                                        }
                                        if(weld_process == "0"){
                                            swal("工艺文件必须是rar,zip,tar,gzip,jar压缩文件！");
                                            return false;
                                        }
                                    }
                                     
                                    var process_data = {
                                        "id" :id,
                                        "weld_process_file" : weld_process_file
                                    };
                                     
                                     if(dis_one == 0){
                                        swal("请上传工艺文件");
                                        return false;
                                     }
                                    
                                    $.getJSON({  
                                        type: "get",  
                                        url:"../../json/2.json",  
                                        data:process_data,// 序列化表单值  
                                        async: false, 
                                        cache:false,
                                        dataType:"json", 
                                        success: function(status) { 
                                            console.log(status);
                                            if(status.text==200){
                                                $(".progress_process").show();
                                                var timer=5;
                                                var countdown = setInterval(CountDown,1000);
                                                function CountDown(){
                                                    $(".time3").html("正在上传，请稍等,倒计时"+timer+"s");
                                                    if(timer==0){
                                                        $(".time3").html("上传工艺文件成功").css({"font-size":"18px","color":"#00ff45"});
                                                        $(".prog_process").hide();
                                                        clearInterval(countdown);
                                                    }
                                                    timer--;
                                                }       
                                            }
                                            if(status.text!=200){
                                                $(".progress_process").show();
                                                var timer=5;
                                                var countdown = setInterval(CountDown,1000);
                                                function CountDown(){
                                                    $(".time3").html("正在上传，请稍等,倒计时"+timer+"s");
                                                    if(timer==0){
                                                        swal("上传工艺文件失败，请重新上传");
                                                        $(".progress_process").hide();
                                                        clearInterval(countdown);
                                                    }
                                                    timer--;
                                                }
                                            }    
                                        }
                                    });
                                    
                                });

                                //点击完成按钮
                                $(".complete").on('click',function(){
                                    window.location.reload();
                                });

                            }); 
                        }
                    }  
                }); 
            }
        });
    })
    /*weld产品信息填写业务逻辑编写*/

    /*修改焊接产品信息开始*/
    $(".product_menu_weld_update").on('click',function(){
        var productIds = [];
        var signs = $("input[name='sign']");
        $.each(signs,function(key,obj){
            if(obj.checked){
                var productId = Number(obj.value);
                productIds.push(productId);
            }
        });

        if(productIds.length == 1){
            $.getJSON({
            url:"../../json/5.json",
            cache:false,
            data:productIds,
            success:function(result){
                $(".overflow_weld").show();
                $(".weld_details").show();
                $(".cental_pro").on('click',function(){
                    $(".overlay_one").hide();
                    $(".add_products").hide();
                    window.location.reload();
                });
                //修改焊接订单
                //焊接信息
                $("#weld_product_name").val(result.weld_product_name);
                $("#weld_product_type").val(result.weld_product_type);
                $("#weld_pcba_process").val(result.weld_pcba_process);
                $("#weld_pcba_smt_type").val(result.weld_pcba_smt_type);
                $("#weld_pcba_smt_joints").val(result.weld_pcba_smt_joints);
                $("#weld_pcba_dip_type").val(result.weld_pcba_dip_type);
                $("#weld_pcba_dip_joints").val(result.weld_pcba_dip_joints);
                $("#weld_pcba_stencil").val(result.weld_pcba_stencil);
                $("#weld_pcba_stencil_number").val(result.weld_pcba_stencil_number);
                $("#weld_test_time").val(result.weld_test_time);
                $("#weld_prevent_cm2").val(result.weld_prevent_cm2);
                $("#weld_remark").val(result.weld_remark);

                //修改信息
                $(".add_weld_product").on('click',function(sweetalert){
                    swal({
                        title: "",
                        text: "您确定添加此产品到产品列表吗？",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#7B69B3",
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        closeOnConfirm: false
                    },function(isConfirm){
                        if(isConfirm){
                            //获取焊接订单新数据信息
                            var weld_product_name = $("#weld_product_name").val(),
                                weld_product_type = $("#weld_product_type").val(),
                                weld_pcba_process = $("#weld_pcba_process").val(),
                                weld_pcba_smt_type = $("#weld_pcba_smt_type").val(),
                                weld_pcba_smt_joints = $("#weld_pcba_smt_joints").val(),
                                weld_pcba_dip_type = $("#weld_pcba_dip_type").val(),
                                weld_pcba_dip_joints = $("#weld_pcba_dip_joints").val(),
                                weld_pcba_stencil = $("#weld_pcba_stencil").val(),
                                weld_pcba_stencil_number = $("#weld_pcba_stencil_number").val(),
                                weld_test_time = $("#weld_test_time").val(),
                                weld_prevent_cm2 = $("#weld_prevent_cm2").val(),
                                weld_remark = $("#weld_remark").val(),
                                product_class_type = $("#product_class_type").val();

                            //数据库json格式
                            var weld_data={
                                "weld_product_name" : weld_product_name,
                                "weld_product_type" : weld_product_type,
                                "weld_pcba_process" : weld_pcba_process,
                                "weld_pcba_smt_type" : weld_pcba_smt_type,
                                "weld_pcba_smt_joints" : weld_pcba_smt_joints,
                                "weld_pcba_dip_type" : weld_pcba_dip_type,
                                "weld_pcba_dip_joints" : weld_pcba_dip_joints,
                                "weld_pcba_stencil" : weld_pcba_stencil,
                                "weld_pcba_stencil_number" : weld_pcba_stencil_number,
                                "weld_test_time" : weld_test_time,
                                "weld_prevent_cm2" : weld_prevent_cm2,
                                "weld_remark" : weld_remark,
                                "product_class_type" : product_class_type,
                                "now_time":now_time
                            };


                            //判断weld信息不能为空的选项信息
                                
                            if(weld_product_name=="" || weld_pcba_process=="" || weld_pcba_smt_type=="" || weld_pcba_dip_type==""){
                                swal("信息不能为空!");
                                return false;
                            }

                            //判断焊接点数、组装时间
                            if(!(/[0-9]/.test(weld_pcba_smt_joints)) || !(/[0-9]/.test(weld_pcba_dip_joints)) || !(/[0-9]/.test(weld_pcba_smt_type)) || !(/[0-9]/.test(weld_pcba_dip_type))){
                                swal("SMT和DIP的种类、焊接点数必须是数字!");
                                return false;
                            }

                            //判断产品编号以及钢网编号
                            if(weld_product_type=="" || (/[\u4e00-\u9fa5]/.test(weld_product_type))){
                                swal("产品型号不能为空、汉字或全角符号！");
                                return false;
                            }
                            if(weld_pcba_stencil_number!=""){
                                if((/[\u4e00-\u9fa5]/.test(weld_pcba_stencil_number))){
                                    swal("钢网编号不能为汉字或全角符号！");
                                    return false;
                                }
                            }

                            //判断焊接点数、组装时间           
                             if(weld_test_time!=""){
                                if(!(/[0-9]/.test(weld_test_time))){
                                    swal("焊接产品测试时间必须是数字!");
                                    return false;
                               }
                            }
                               
                            if(weld_prevent_cm2!=""){
                                if(!(/[0-9]/.test(weld_prevent_cm2))){
                                    swal("喷涂三防必须是数字!");
                                    return false;
                                }
                            }
                            //数据库交互
                            $.getJSON({  
                                type: "post",  
                                url:"../../json/2.json",  
                                data:weld_data,// 序列化表单值  
                                async: false, 
                                cache:false,
                                dataType:"json", 
                                error: function(status) { 
                                    console.log(status); 
                                    if(status.weldproduct.state==0){
                                        swal({
                                        title: "添加失败!",
                                        type: "error",
                                        timer: 5000,
                                        showConfirmButton: false,
                                        sleep : 20000
                                    });  
                                    window.location.reload();
                                    }
                                },  
                                success: function(status) {
                                    console.log(status); 
                                    if(status.weldproduct.state==200){
                                       swal({
                                            title: "添加成功",
                                            text:"点击OK，进行下一步上传文件操作"
                                        },function(){
                                            $(".overlay_uplod").show();
                                            $(".file_uplod").show();

                                            var id = status.weldproduct.id;
                                            console.log(id);
                                            //上传pcb文件
                                            $(".add_pcb").on('click',function(sweetalert){
                                                var  weld_pcb_file = $("#weld_pcb_file").val();
                                                
                                                //判断pcb文件
                                                if(weld_pcb_file==""){
                                                    swal("PCB文件不能为空!");
                                                    $(".add_pcb").attr('disabled',true);
                                                    $(".add_pcb").css("background","#eee");
                                                    return false;
                                                }else{
                                                     $(".add_pcb").attr('disabled',false);
                                                    var fileTypes = new Array("rar","zip","tar","gzip","jar");  //定义可支持的文件类型数组
                                                    var weld_pcb="0";
                                                    var newFileName = weld_pcb_file.split('.');
                                                    newFileName = newFileName[newFileName.length-1];
                                                    for(var i=0;i<fileTypes.length;i++){
                                                        if(fileTypes[i] == newFileName){
                                                        weld_pcb = "1";
                                                        　}
                                                    }
                                                    if(weld_pcb == "0"){
                                                       swal("PCB文件必须是rar,zip,tar,gzip,jar压缩文件！");
                                                        return false;
                                                    }
                                                }
                                                    
                                                var pcb_data = {
                                                    "id" :id,
                                                    "weld_pcb_file" : weld_pcb_file
                                                };
                                                $.getJSON({  
                                                    type: "get",  
                                                    url:"../../json/2.json",  
                                                    data:pcb_data,// 序列化表单值  
                                                    async: false, 
                                                    cache:false,
                                                    dataType:"json", 
                                                    success: function(status) { 
                                                        console.log(status);
                                                        if(status.text==200){
                                                            $(".progress_pcb").show();
                                                            var timer=5;
                                                            var countdown = setInterval(CountDown,1000);
                                                            function CountDown(){
                                                                $(".time1").html("正在上传，请稍等,倒计时"+timer+"s");
                                                                if(timer==0){
                                                                    $(".time1").html("上传PCB文件成功").css({"font-size":"18px","color":"#00ff45"});
                                                                    $(".prog").hide();
                                                                    clearInterval(countdown);
                                                                }
                                                                timer--;
                                                            }    
                                                        }
                                                        if(status.text!=200){
                                                            $(".progress_pcb").show();
                                                            var timer=5;
                                                            var countdown = setInterval(CountDown,1000);
                                                            function CountDown(){
                                                                $(".time1").html("正在上传，请稍等,倒计时"+timer+"s");
                                                                if(timer==0){
                                                                    swal("上传PCB文件失败，请重新上传");
                                                                    $(".progress_pcb").hide();
                                                                    clearInterval(countdown);
                                                                }
                                                                timer--;
                                                            }    
                                                        }
                                                    },
                                                });
                                            });

                                            //上传BOM的excel文件
                                            $(".add_bom").on('click',function(){
                                                var weld_bom_file = $("#weld_bom_file").val();
                                                
                                                //ome判定
                                                 //判断bom文件
                                                if(weld_bom_file==""){
                                                    swal("BOM不能为空!");
                                                    return false;
                                                }else{
                                                     var fileTypes = new Array("xlsx","xls");  //定义可支持的文件类型数组
                                                    var weld_bomfile = "0";
                                                    var newFileName = weld_bom_file.split('.');
                                                    newFileName = newFileName[newFileName.length-1];
                                                    for(var i=0;i<fileTypes.length;i++){
                                                        if(fileTypes[i] == newFileName){
                                                            weld_bomfile = "1";
                                                        }
                                                    }
                                                    if(weld_bomfile == "0"){
                                                        swal("BOM文件必须是xlsx、xls！");
                                                        return false;
                                                    }
                                                }

                                                var bom_data = {
                                                    "id" :id,
                                                    "weld_bom_file" : weld_bom_file
                                                };
                                                $.getJSON({  
                                                    type: "get",  
                                                    url:"../../json/2.json",  
                                                    data:bom_data,// 序列化表单值  
                                                    async: false, 
                                                    cache:false,
                                                    dataType:"json", 
                                                    success: function(status) { 
                                                        console.log(status);
                                                        if(status.text==200){
                                                            $(".progress_bom").show();
                                                            var timer=5;
                                                            var countdown = setInterval(CountDown,1000);
                                                            function CountDown(){
                                                                $(".time2").html("正在上传，请稍等,倒计时"+timer+"s");
                                                                if(timer==0){
                                                                    $(".time2").html("上传BOM文件成功").css({"font-size":"18px","color":"#00ff45"});
                                                                    $(".prog_bom").hide();
                                                                    clearInterval(countdown);
                                                                }
                                                                timer--;
                                                            }       
                                                        }
                                                        if(status.text!=200){
                                                            $(".progress_bom").show();
                                                            var timer=5;
                                                            var countdown = setInterval(CountDown,1000);
                                                            function CountDown(){
                                                                $(".time2").html("正在上传，请稍等,倒计时"+timer+"s");
                                                                if(timer==0){
                                                                    swal("上传BOM文件失败，请重新上传");
                                                                    $(".progress_bom").hide();
                                                                    clearInterval(countdown);
                                                                }
                                                                timer--;
                                                            }    
                                                        }
                                                    },
                                                });
                                            });

                                             //上传坐标文件
                                            $(".add_coordinate").on('click',function(){
                                                var  weld_coordinate_file = $("#weld_coordinate_file").val();
                                                var dis = 0;

                                                //判断坐标文件
                                                if(weld_coordinate_file != ''){
                                                    var fileTypes = new Array("rar","zip","tar","gzip","jar");  //定义可支持的文件类型数组
                                                    var weld_coordinate = "0";
                                                    var newFileName = weld_coordinate_file.split('.');
                                                    dis = 1;
                                                    newFileName = newFileName[newFileName.length-1];
                                                    for(var i=0;i<fileTypes.length;i++){
                                                        if(fileTypes[i] == newFileName){
                                                            weld_coordinate = "1";
                                                        }
                                                    }
                                                    if(weld_coordinate == "0"){
                                                        swal("坐标文件必须是rar,zip,tar,gzip,jar压缩文件！");
                                                        return false;
                                                    }
                                                }
                            
                                                var coordinate_data = {
                                                    "id" :id,
                                                    "weld_coordinate_file" : weld_coordinate_file
                                                }
                                                if(dis == 0){
                                                    swal("请上传坐标文件！");
                                                    return false;
                                                }
                                               
                                                $.getJSON({  
                                                    type: "get",  
                                                    url:"../../json/2.json",  
                                                    data:coordinate_data,// 序列化表单值  
                                                    async: false, 
                                                    cache:false,
                                                    dataType:"json", 
                                                    success: function(status) { 
                                                        console.log(status);
                                                        if(status.text==200){
                                                            $(".progress_coordinate").show();
                                                            var timer=5;
                                                            var countdown = setInterval(CountDown,1000);
                                                            function CountDown(){
                                                                $(".time4").html("正在上传，请稍等,倒计时"+timer+"s");
                                                                if(timer==0){
                                                                    $(".time4").html("上传坐标文件成功").css({"font-size":"18px","color":"#00ff45"});
                                                                    $(".prog_coordinate").hide();
                                                                    clearInterval(countdown);
                                                                }
                                                                timer--;
                                                            }       
                                                        }
                                                        if(status.text!=200){
                                                            $(".progress_coordinate").show();
                                                            var timer=5;
                                                            var countdown = setInterval(CountDown,1000);
                                                            function CountDown(){
                                                                $(".time4").html("正在上传，请稍等,倒计时"+timer+"s");
                                                                if(timer==0){
                                                                    swal("上传坐标文件失败，请重新上传");
                                                                    $(".progress_coordinate").hide();
                                                                    clearInterval(countdown);
                                                                }
                                                                timer--;
                                                            }    
                                                        }
                                                    },
                                                });
                                            });

                                            //上传工艺文件
                                            $(".add_process").on('click',function(){
                                                var   weld_process_file = $("#weld_process_file").val();
                                                var dis_one = 0;
                                                //工艺文件
                                                if(weld_process_file != ''){
                                                    var fileTypes = new Array("rar","zip","tar","gzip","jar");  //定义可支持的文件类型数组
                                                    var weld_process = "0";
                                                    var newFileName = weld_process_file.split('.');
                                                    dis_one = 1;
                                                    newFileName = newFileName[newFileName.length-1];
                                                    for(var i=0;i<fileTypes.length;i++){
                                                        if(fileTypes[i] == newFileName){
                                                            weld_process = "1";
                                                        }
                                                    }
                                                    if(weld_process == "0"){
                                                        swal("工艺文件必须是rar,zip,tar,gzip,jar压缩文件！");
                                                        return false;
                                                    }
                                                }
                                                 
                                                var process_data = {
                                                    "id" :id,
                                                    "weld_process_file" : weld_process_file
                                                };
                                                 
                                                 if(dis_one == 0){
                                                    swal("请上传工艺文件");
                                                    return false;
                                                 }

                                                $.getJSON({  
                                                    type: "get",  
                                                    url:"../../json/2.json",  
                                                    data:process_data,// 序列化表单值  
                                                    async: false, 
                                                    cache:false,
                                                    dataType:"json", 
                                                    success: function(status) { 
                                                        console.log(status);
                                                        if(status.text==200){
                                                            $(".progress_process").show();
                                                            var timer=5;
                                                            var countdown = setInterval(CountDown,1000);
                                                            function CountDown(){
                                                                $(".time3").html("正在上传，请稍等,倒计时"+timer+"s");
                                                                if(timer==0){
                                                                    $(".time3").html("上传工艺文件成功").css({"font-size":"18px","color":"#00ff45"});
                                                                    $(".prog_process").hide();
                                                                    clearInterval(countdown);
                                                                }
                                                                timer--;
                                                            }       
                                                        }
                                                        if(status.text!=200){
                                                            $(".progress_process").show();
                                                            var timer=5;
                                                            var countdown = setInterval(CountDown,1000);
                                                            function CountDown(){
                                                                $(".time3").html("正在上传，请稍等,倒计时"+timer+"s");
                                                                if(timer==0){
                                                                    swal("上传工艺文件失败，请重新上传");
                                                                    $(".progress_process").hide();
                                                                    clearInterval(countdown);
                                                                }
                                                                timer--;
                                                            }
                                                        }    
                                                    }
                                                });
                                            });
                                            //点击完成按钮
                                            $(".complete").on('click',function(){
                                                window.location.reload();
                                            });

                                        }); 
                                    }
                                }  
                            }); 
                        }
                    });
                })
                /*weld产品信息填写业务逻辑编写*/
            }       
        });
        }else{
            swal("请选择一个产品进行修改!");
        } 
    });
    /*修改产品信息结束*/

    /*下单业务逻辑编写开始*/
    $(".product_menu_weld_order").on('click',function(sweetalert){
        var productIds = [];
        var signs = $("input[name='sign']");
        $.each(signs,function(key,obj){
            if(obj.checked){
                var product_Id = Number(obj.value);
                productIds.push(product_Id);
            }
        });

        if(productIds.length>0){
            //加载弹出遮盖层
            swal.close();
            $(".overflow_three1").show();
            $(".shop_orders").show();
            $(".cental_pro").on('click',function(){
                window.location.reload();
            });

            //展示产品信息列表开始
            $.getJSON({  
                    type: "get",  
                    url:"../../json/order.json",  
                    async: false, 
                    cache:false,
                    dataType:"json", 
                    error: function(status) { 
                        console.log(status); 
                        if(status.data.state==0){
                            swal({
                                title: "暂务数据!",
                                type: "error",
                                timer: 5000,
                                showConfirmButton: false,
                                sleep : 20000
                            });  
                        }
                    },  
                    success: function(status) {
                       console.log(status);
                       $(".user_ares").empty();
                        if(status.data.state==200){
                           $.each(status.data.data, function(idx,obj){
                                var order_info_html;
                                order_info_html='<div class="order_info" style="margin-top: 15px;background: #fff;">'+
                                    ' <div class="pro_da" style="margin-left: 20px;margin-top:5px;">'+
                                        '<div class="whpro" style="height: 18px;margin-top:5px;"></div>'+
                                        '<span class="whpro_name" style="line-height: 25px;margin-top:5px;">产品：'+obj.order_name+'</span>'+
                                        '<input type="text" name="product_order_id"  value="'+obj.id+'" style="display:none;">'+
                                    '</div>'+
                                    '<div class="order_shop" style="height: 75px;"><!--weld bom信息TUDO-->'+
                                        ' <div class="depart_info">'+
                                            '<span class="col-md-2" style="margin: 0;padding: 0;line-height: 50px;">产品编号：'+obj.order_num+'</span>'+
                                            '<span class="col-md-2" style="margin: 0;padding: 0;line-height: 50px;">产品名称：'+obj.order_name+'</span>'+
                                            '<span class="col-md-2" style="margin: 0;padding: 0;line-height: 50px;">产品型号：'+obj.order_type+'</span>'+
                                            '<span class="col-md-2" style="margin: 0;padding: 0;line-height: 50px;">'+
                                                '<span  style="color: red;">*</span>生产总数：'+
                                                '<input type="text" name="production_num" style="width: 80px;height: 25px;">'+
                                            '</span>'+
                                            '<div class="col-md-4" style="margin: 0;padding: 0;">'+
                                                '<span class="col-md-2" style="color:red;line-height:20px;">备注：</span>'+
                                                '<textarea class="col-md-10 text" name="text_info" id="text" value="" style="height: 65px;resize:none;margin: 0;padding: 0;overflow-y:visible " placeholder="如果此产品发送地址不同，填写详细的联系人、电话、公司地址、发货数量、发货方式，用分号隔开"></textarea>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>';
                               $(".order_list").append(order_info_html);
                            }); 

                        }
                    }  
                }); 

            //展示产品信息列表结束

            //弹出快递
            $(".add_delivery").on('click',function(){
                $(".overlay_tow").show();
                $(".delivery").show();
                $(".insert_delivery").on('click',function(){
                    var delivery=$("#delivery").val();
                    $(".overlay_tow").hide();
                    $(".delivery").hide();
                     //清除数据
                    $(".express_y").empty();
                    $(".express_way").append('<span class="express_y">'+delivery+'</span>');
                });
            });

            $(".add_button").on('click',function(){
                $(".adress_information").toggle(10);
            });
            //弹出地址
            $(".add_adres").on('click',function(){
                $(".overlay_tow").show();
                $(".addres").show();
                //获取地址信息
                $.getJSON({  
                    type: "get",  
                    url:"../../json/address.json",  
                    async: false, 
                    cache:false,
                    dataType:"json", 
                    error: function(status) { 
                        console.log(status); 
                        if(status.data.state==0){
                            swal({
                                title: "暂务数据!",
                                type: "error",
                                timer: 5000,
                                showConfirmButton: false,
                                sleep : 20000
                            });  
                        }
                    },  
                    success: function(status) {
                       console.log(status);
                       $(".user_ares").empty();
                        if(status.data.state==200){
                           $.each(status.data.ul_list, function(idx,obj){
                                var html;
                                html = '<div class="delivery_all">'+
                                        '<div class="col-md-1 product_list" data-field="state" data-checkbox="true" style="margin: 0;padding: 0;">'+
                                            '<input type="radio" name="delivery" id="id" value="'+obj.id+'" />'+
                                        '</div>' +
                                        '<div class="col-md-2 product_list" data-field="product_id" data-align="center" style="margin: 0;padding: 0;">'+obj.name+'</div>'+
                                        '<div class="col-md-2 product_list" data-field="product_id" data-align="center" style="margin: 0;padding: 0;">'+obj.contact+'</div>'+
                                        '<div class="col-md-7 product_list" data-field="product_id" data-align="center" style="margin: 0;padding: 0;" style="overflow: hidden;">'+obj.address+'</div>'+
                                    '</div>'
                                $(".user_ares").append(html);
                            }); 

                        }
                    }  
                }); 
                 //添加地址到下单也页面中
               $(".insert_address").on('click',function(sweetalert){
                    //隐藏弹出层
                    $(".overlay_tow").hide();
                    $(".addres").hide();

                    //添加用户数据
                     var userId;
                    var delivery = $("input[name='delivery']");
                    $.each(delivery,function(key,obj){
                        if(obj.checked){
                            var user_Id = Number(obj.value);
                            userId=user_Id;
                        }
                    });
                   $.getJSON({  
                        type: "get",  
                        url:"../../json/address.json",  
                        async: false, 
                        cache:false,
                        dataType:"json", 
                        success: function(status) {
                           console.log(status);
                           $(".user_ares").empty();
                            if(status.data1.state==200){
                                $(".express_n").empty();
                                $(".express_p").empty();
                                $(".express_a").empty();
                                $(".express_s").find("p").empty();
                                $(".express_name").append('<span class="express_n">'+status.data1.data2.name+'</span>');
                                $(".express_phone").append('<span class="express_p">'+status.data1.data2.contact+'</span>');
                                $(".express_address").append('<span class="express_a">'+status.data1.data2.address+'</span>');
                                $(".express_s").find("p").append('<input type="text" id="express_s" value="'+status.data1.data2.id+'" style="display:none;">');
                            }
                        }  
                    }); 
                });
            });

            //添加新地址
           $(".appent_address").on('click',function(){
                var province = $("#province").val(),
                    city = $("#city").val(),
                    district =$("#district").val(),
                    name = $("#name").val(),
                    contact = $("#contact").val(),
                    text_detail  = $("#text_detail").val(),
                    address=province+" "+city+" "+district+" "+text,
                    address1=province+" "+city+" "+district;
                    var data={
                        "name" : name,
                        "contact" : contact,
                        "address" : address
                    };

                    var data1={
                        "name" : name,
                        "contact" : contact,
                        "address1" : address1,
                        "text_detail" : text_detail
                    };

                if(name==""){
                    swal("联系人不能为空!");
                    return false;
                }
                if(contact=="" || !(/^1[34578]\d{9}$/.test(contact))){
                    swal("请填写手机号且注意格式！");
                }    
                if(text.length<=2){
                     swal("详细地址不能小于2字!");
                    return false;
                }
                var html;
                html = '<div class="delivery_all" style="overflow: hidden;">'+
                    '<div class="col-md-1 product_list" data-field="state" data-checkbox="true" style="margin: 0;padding: 0;">'+
                        '<input type="radio" name="delivery" id="id" value="-1" />'+
                    '</div>' +
                    '<div class="col-md-2 product_list" data-field="product_id" data-align="center" style="margin: 0;padding: 0;">'+name+'</div>'+
                    '<div class="col-md-2 product_list" data-field="product_id" data-align="center" style="margin: 0;padding: 0;">'+contact+'</div>'+
                    '<div class="col-md-7 product_list" data-field="product_id" data-align="center" style="margin: 0;padding: 0;" style="overflow: hidden;">'+address+'</div>'+
                '</div>'
                $(".user_ares").append(html);

                //将信息添加到相应的页面中
                $.getJSON({  
                    type: "post",  
                    url:"../../json/address.json",  
                    async: false, 
                    data:data1,// 序列化表单值  
                    cache:false,
                    dataType:"json", 
                    success: function(status) {
                        if(status.data.state==200){
                            $(".addres").hide();
                            $(".overlay_tow").hide(); 
                        } 
                    }  
                }); 
            });

            //生成订单
            $(".sales_review").on('click',function(sweetalert){

                //需下单种类的数数组
                var product_order_ids = [];
                var product = $("input[name='product_order_id']");
                $.each(product,function(key,obj){
                    if(obj){
                        var id = Number(obj.value);
                        product_order_ids.push(id);
                    }
                });

                //拼成json数据 需下单种类的数数组
                var product_order_id = {
                    "product_order_ids" : product_order_ids
                };

                //产品下单发货地址
                var delivery_ids=$("#express_s").val();
                if(delivery_ids==""){
                    swal("请选择发货地址");
                    return false;
                }

                //拼成json数据 产品下单发货地址
                var delivery_id = {
                    "delivery_ids" : delivery_ids
                };

                //下单个产品生产总数
                var production_nums = [];
                var num = $("input[name='production_num']");
                 $.each(num,function(key,obj){
                    if(obj){
                        var production_num = Number(obj.value);
                        production_nums.push(production_num); 
                    }
                });

                //获取是否含税信息
                var order_tax = $("#order_tax").val();
                if(order_tax == "" || order_tax == "-1"){
                    swal("请选择是否含税");
                    return false;
                }

                for(var i=0;i<production_nums.length;i++){
                    if(production_nums[i]=="" || !(/[0-9]/.test(production_nums[i]))){
                        swal("生产总数不能为零且必须是数字！");
                        return false;
                    }
                }
                //拼成json数据 下单个产品生产总数
                var production_num = {
                    "production_nums" : production_nums
                };

                //快递方式
                var  express_address = $(".express_y").text();
                if(express_address==""){
                    swal("快递不能为空");
                    return false;
                }

                //拼成json数据 快递方式
                var express_addres = {
                    "express_address" : express_address
                };

                //获取产品备注信息
                var text_infos = [];
                var express_info = $("textarea[name='text_info']");
                 $.each(express_info,function(key,obj){
                    if(obj){
                        var express_address_info = obj.value;
                        text_infos.push(express_address_info);
                    }
                });

                //拼成json数据 快获取产品备注信息
                var text_info = {
                    "text_infos" : text_infos
                };

                //销售审核中数据json
                var contact_data = {
                    "product_order_id" : product_order_id,
                    "delivery_id" : delivery_id,
                    "production_num" : production_num,
                    "express_addres" : express_addres,
                    "text_info" : text_info,
                    "order_tax" : order_tax
                };
                
                //销售审核接口
               $.getJSON({  
                    type: "post",  
                    url:"../../json/6.json",  
                    async: false, 
                    data:contact_data,// 序列化表单值  
                    cache:false,
                    dataType:"json", 
                    success: function(status) {
                        if(status.contact.state==200){
                            $(".shop_orders").hide();
                            $(".overflow_three1").hide();
                            window.location.reload();

                        }else{
                            swal("c");
                        } 
                    }  
                }); 
            });   

         }else{
            swal("请选择产品!");
         }
    });
    /*下单业务逻辑编写结束*/
})
/*自助下单功能逻辑开始*/