define(['jquery','template','cookie'],function($,template){
	// NProgress.start();

	// NProgress.done();

	//控制左侧导航菜单的折叠展开
	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});

	//实现退出功能
	$('#logoutBtn').click(function(){
		$.ajax({
			type:'post',
			url:'/api/logout',
			dataType:'json',
			success:function(data){
				if(data.code==200){
					//退出成功
					location.href='/main/login';
				}
			}
		});
		return false; //退出功能用的是a标签，可以去掉return false（阻止浏览器默认行为）
	});

	var sessionId=$.cookie('PHPSESSID');
	// console.log(sessionId);
	// console.log(location.pathname);
	if(!sessionId && location.pathname!='/main/login'){
		location.href='/main/login';
	}

	//获取用户登录信息
		//验证cookie是否存在并进行处理
		var cookie=$.cookie('logInfo');
		var logInfo=cookie?JSON.parse(cookie):{};
        // $('.profile img').attr('src',logInfo.tc_avatar);
        // $('.profile h4').html(logInfo.tc_name);

        //使用模板引擎
        var tpl='<div class="avatar img-circle"><img src={{tc_avatar}}></div><h4>{{tc_name}}</h4>';
        var html=template.render(tpl,logInfo);
        // console.log(logInfo);
        $('#profileId').html(html);


});





	

	

	