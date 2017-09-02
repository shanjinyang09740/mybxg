define(['jquery','template','util','ckeditor','datepicker','uploadify','region','validate','form','state'],function($,template,util,CKEDITOR){
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

			//添加富文本编辑插件
			//法一：
			// CKEDITOR.replace('editor',function(){
			// 	config.toolbar[
			// 		{ name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
			// 		{ name: 'editing', items: [ 'Scayt' ] },
			// 		{ name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
			// 		{ name: 'insert', items: [ 'Image', 'Table', 'HorizontalRule', 'SpecialChar' ] },
			// 		{ name: 'tools', items: [ 'Maximize' ] },
			// 		{ name: 'document', items: [ 'Source' ] },
			// 		'/',
			// 		{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Strike', '-', 'RemoveFormat' ] },
			// 		{ name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote' ] },
			// 		{ name: 'styles', items: [ 'Styles', 'Format' ] },
			// 		{ name: 'about', items: [ 'About' ] }
					
			// 	];
			// });

			//法二：
			CKEDITOR.replace('editor',{
				toolbarGroups:[
					{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
					{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
					{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
					{ name: 'others', groups: [ 'others' ] }

				]
			});

			//处理表单提交
			
			// console.log(hometown);
			console.log
			$('#settingForm').validate({
				sendForm:false,
				valid:function(){
					//同步富文本信息到textarea中
					for(var instance in CKEDITOR.instances){
						CKEDITOR.instances[instance].updateElement();
					}

					//获取省市县名称
					var p=$('#p option:selected').text();
					var c=$('#c option:selected').text();
					var d=$('#d option:selected').text();
					var hometown=p+'|'+c+'|'+d;
					//验证通过，提交表单
					$(this).ajaxSubmit({
						type:'post',
						url:'/api/teacher/modify',
						dataType:'json',
						data:{
							tc_hometown:hometown
						},
						success:function(data){
							if(data.code==200){
								location.reload();
							}
						}
					});
				}
			});

		}


	});

});