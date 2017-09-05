define(['jquery','template','util','bootstrap','form'],function($,template,util){
	//设置导航菜单选中高亮显示
	util.setMenu('/course/list');
	//获取课程菜单
	var csId=util.qs('cs_id');
	//通过后台接口获取课时信息
	$.ajax({
		type:'get',
		url:'/api/course/lesson',
		data:{
			cs_id:csId
		},
		dataType:'json',
		success:function(data){
			var html=template('courseTpl',data.result);
			$('#courseInfo').html(html);
		}
	});




});