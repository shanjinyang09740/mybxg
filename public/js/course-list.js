define(['jquery','template','util'],function($,template,util){
	//添加导航菜单选中高亮显示功能
	util.setMenu(location.pathname);

	//调用接口，获取数据，渲染页面
	$.ajax({
		type:'get',
		url:'/api/course',
		dataType:'json',
		success:function(data){
			// console.log(data);
			var html=template('courseListTpl',{list:data.result});
			$('#courseListInfo').html(html);
		}
	});


});