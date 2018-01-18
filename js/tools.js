$(function(sweetalert) {
// 判断浏览器的版本
    function getOs(){ 
        if(isFirefox=navigator.userAgent.indexOf("Firefox")!=-1){
            var isFirefoxVersion = navigator.userAgent.substring(8,12);
            return "浏览器是火狐"+"版本号"+isFirefoxVersion+"最好选择谷歌5.0以上的版本！"; 
        }else if(isChrome=navigator.userAgent.indexOf("Chrome")!=-1){ 
            var isChromeVersion = navigator.userAgent.substring(8,12);
            if(isChromeVersion < 5.0){
                return "浏览器是谷歌"+"版本号"+isChromeVersion+"最好选择谷歌5.0以上的版本！"; 
            }
        } else if(isSafari=navigator.userAgent.indexOf("Safari")!=-1) { 
            var isSafariVersion = navigator.userAgent.substring(8,12);
            return "浏览器是Safari"+"版本号"+isSafariVersion+"最好选择谷歌5.0以上的版本！";   
        }else if(isOpera=navigator.userAgent.indexOf("Opera")!=-1){ 
            var isOperaVersion = navigator.userAgent.substring(8,12);
            return "浏览器是Opera"+"版本号"+isOpera+"最好选择谷歌5.0以上的版本！"; 
        } else{
            return "最好选择谷歌5.0以上的版本！"; 
        }
    }
    //页面提示信息
    swal(getOs());

    //下载谷歌浏览器的安装包
    $(".chome_down").on('click',function(sweetalert){
        $.ajax({  
            type: "get",  
            url:"../json/menu.json",  
            async: false, 
            cache:false,
            dataType: "json",
            success: function(status) {
                console.log(status); 
                if(status.state==200){
                    try{   
                        var a = document.getElementById("down");  
                        a.href=status.download;   
                    }catch(e){   
                    }   
                }
            }
        });
    });
})

