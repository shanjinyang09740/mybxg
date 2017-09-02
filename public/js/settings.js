define(['jquery','template','util','datepicker','language'],function($,template,util){
	//设置导航菜单选中
	util.setMenu('/main/index');

	//调用后台接口获取数据
	$.ajax({
		type:'get',
		url:'/api/teacher/profile',
		dataType:'json',
		success:function(data){
			var html=template('settingTpl',data.result);
			$('#settingInfo').html(html);
		}


	});

});