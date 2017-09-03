define(['jquery','template','util','uploadify'],function($,template,util){
	util.setMenu('/course/add');
	var csId=util.qs('cs_id');
	// console.log(csId);
	//通过后台接口获得封面信息
	$.ajax({
		type:'get',
		url:'/api/course/picture',
		dataType:'json',
		data:{
			cs_id:csId
		},
		success:function(data){
			var html=template('pictureTpl',data.result);
			$('#pictureInfo').html(html);	

			//处理课程封面的上传
			$('#upfile').uploadify({
				width:'80',
				height:'30',
		        buttonText : '选择图片',
		        itemTemplate : '<span></span>',
		        buttonClass: 'btn btn-success btn-sm',
		        fileObjName : 'cs_cover_original',
		        swf : '/public/assets/uploadify/uploadify.swf',
		        uploader : '/api/uploader/cover',
		        onUploadSuccess : function(f,data){
		          var data = JSON.parse(data);
		          console.log(data);
		          // 修改图片的URL地址
		          $('.preview img').attr('src',data.result.path);
		        }
			});



		}


	});





});