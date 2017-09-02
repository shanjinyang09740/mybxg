define(['jquery','template','util','datepicker','uploadify','region'],function($,template,util){
	//设置导航菜单选中
	util.setMenu('/main/index');

	//调用后台接口获取数据
	$.ajax({
		type:'get',
		url:'/api/teacher/profile',
		dataType:'json',
		success:function(data){
			// console.log(data);
			var html=template('settingTpl',data.result);
			$('#settingInfo').html(html);

			//处理头像上传
			$('#upfile').uploadify({
				 width : 120,
		        height : 120,
		        buttonText : '',
		        itemTemplate : '<span></span>',
		        fileObjName : 'tc_avatar',
		        swf : '/public/assets/uploadify/uploadify.swf',
		        uploader : '/api/uploader/avatar',
		        onUploadSuccess : function(f,data){
		          var data = JSON.parse(data);
		          // 修改图片的URL地址
		          $('.preview img').attr('src',data.result.path);
		        }
			});

			//省市县三级联动
			$('#select').region({
				url:'/public/assets/jquery-region/region.json'
			});

		}


	});

});