define(['jquery','template','util','uploadify','jcrop','form'],function($,template,util){
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
				width: 80,
				height:'auto',
		        buttonText : '上传图片',
		        itemTemplate : '<span></span>',
		        buttonClass: 'btn btn-success btn-sm upfilebtn',
		        fileObjName : 'cs_cover_original',
		        formData: {cs_id: csId},
		        swf : '/public/assets/uploadify/uploadify.swf',
		        uploader : '/api/uploader/cover',
		        onUploadSuccess : function(f,data){
		        	console.log(data);
		          var data = JSON.parse(data);
		          console.log(data);
		          // 修改图片的URL地址
		          $('.preview img').attr('src',data.result.path);
		        }
			});

			//选中要裁切的图
			var img=$('.preview img').eq(0);
			var nowCrop=null;
			//图片裁切功能

			function cropImage() {
				img.Jcrop({
					boxWidth: 400,
					aspectratio: 2
				},function(){
					// 销毁原来的实例对象，保证只有一个裁切实例
					nowCrop && nowCrop.destroy();
					//保存当前实例
					nowCrop=this;
					//获取图片大小
					var width=this.ui.stage.width;
					var height=this.ui.stage.height;
					//计算选取大小
					var x1,y1,w,h;
					x1=0;
					y1=(height-width/2)/2;
					w=width;
					h=width/2;
					//创建选区
					this.newSelection();
					this.setSelect([x1,y1,w,h]);
					//初始化选区数据
					var datas=$('#cropForm').find('input');
					datas.eq(0).val(x1);
					datas.eq(0).val(y1);
					datas.eq(0).val(w);
					datas.eq(0).val(h);
					//处理选区变化的事件
					img.parent().on('cropend',function(e,s,c){
						// console.log(123);
						//获取选区的参数信息（把选区的参数信息存储到表单中）
						var datas=$('#cropForm').find('input');
						datas.eq(0).val(c.x);
						datas.eq(0).val(c.y);
						datas.eq(0).val(c.w);
						datas.eq(0).val(c.h);
					});
					//图片预览缩略图
					this.initComponent('Thumbnailer',{
						width: 240,
						height: 120,
						mypos: '.thumb'
					});
					//设置缩略图预览位置
					$('.jcrop-thumb').css({
						position: 'absolute',
						top: 0,
						left: 0
					});


				});
			}

			//处理图片裁切功能
			$('#cropBtn').click(function(){
				var flag=$(this).attr('data-flag');
				if(flag){
					//点击过了
					//接下来提交页面
					$('#cropForm').ajaxSubmit({
						type:'post',
						url:'/api/course/update/picture',
						data:{
							cs_id: csId
						},
						success:function(data){
							// console.log(data);
							if(data.code==200){
								location.href='/course/lesson?cs_id='+data.result.cs_id;
							}
						}

					});


				}else{
					//第一次点击
					//实现裁切功能
					cropImage();
					//裁切功能实现后更改按钮的状态
					$(this).attr('data-flag',1);
					$(this).html('保存图片');

				}



			});




		}


	});





});