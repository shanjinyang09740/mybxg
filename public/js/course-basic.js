define(['jquery','template','util'],function($,template,util){
	//设置导航菜单选中高亮显示
	util.setMenu('/course/add');

	//获取课程id
	var csId=util.qs('cs_id');
	// console.log(csId);
	//无论添加还是编辑课程都需要先查询课程信息
	$.ajax({
		type:'get',
		url:'/api/course/basic',
		dataType:'json',
		data:{
			cs_id:csId
		},
		success:function(data){
			// console.log(data);
			if(csId){
				//课程编辑
				data.result.operate='课程编辑';
				var html=template('basicTpl',data.result);
				$('#basicInfo').html(html);
			}else{
				//课程添加
				data.result.operate='课程添加';
				var html=template('basicTpl');
				$('#basicInfo').html(html);
			}
		}
	});


});