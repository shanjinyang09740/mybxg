define(['jquery','template','util','bootstrap','form'],function($,template,util){
	//设置导航菜单选中高亮显示
	util.setMenu('/course/list');
	//获取课程id
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
			//渲染页面
			var html=template('courseTpl',data.result);
			$('#courseInfo').html(html);

			//实现提交表单公共方法
			function submitForm(url,ctCsId,ctId){
				$('#modalBtn').click(function(){
					var param={ct_cs_id:ctCsId};
					if(ctId){
						param.ct_id=ctId;
					}
					$('#modalForm').ajaxSubmit({
						type:'post',
						url:url,
						data:param,
						dataType:'json',
						success:function(data){
							
							if(data.code==200){
								location.reload();
							}
						}

					});
				});
			}

			//实现添加课时功能
			$('#addBtn').click(function(){
				var html=template('modalTpl',{operate:'添加课时'});
				$('#modalInfo').html(html);
				$('#chapterModal').modal();
				submitForm('/api/course/chapter/add',csId);
			});
			//实现编辑课时功能
			$('.editLesson').click(function(){
				var ctId=$(this).attr('data-ctId');
				$.ajax({
					type:'get',
					url:'/api/course/chapter/edit',
					data: {
						ct_id: ctId
					},
					dataType: 'json',
					success:function(data){
						// console.log(data);
							data.result.operate='编辑课时';
							var html=template('modalTpl',data.result);
							$('#modalInfo').html(html);	
							submitForm('/api/course/chapter/modify',csId,ctId);						
					}

				});
				$('#chapterModal').modal();
			});
		}
	});




});