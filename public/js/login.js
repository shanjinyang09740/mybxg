define(['jquery','cookie'],function($){
	//实现登录功能
        $('#loginBtn').click(function(){
            $.ajax({
                type:'post',
                url:'/api/login',
                data:$('#formIn').serialize(),
                dataType:'json',
                success:function(data){
                    
                    if(data.code==200){
                        //存储用户信息cookie，将获取的数据result对象使用JSON.stringify()方法转换成字符串并设置根路径
                        $.cookie('logInfo',JSON.stringify(data.result),{path:'/'});
                        location.href='/main/index';
                    }else{
                        console.log('用户名或密码错误');
                    }
                }
            });
            return false; //登录功能用的是submit（默认具有提交行为），必须要用return false（阻止浏览器默认行为）
        });

});