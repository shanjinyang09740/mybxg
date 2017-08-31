define(['jquery','template','util','datepicker','language','validate','form'],function($,template,u){
	//设置导航菜单选中
	u.setMenu('/teacher/list');

	//获取编辑讲师的ID
	var tcId=u.qs('tc_id');
		if(tcId){
			//编辑讲师
			$.ajax({
				type:'get',
				url:'/api/teacher/edit',
				dataType:'json',
				data:{
					tc_id:tcId
				},
				success:function(data){
					// console.log(data);
					// 解析页面
					data.result.operate='讲师编辑';
					data.result.teacherAdd='提交';
					var html=template('teacherTpl',data.result);
					$('#teacherInfo').html(html);

					//绑定编辑的提交事件
					submitForm('/api/teacher/update');



				}

			});
		}else{
			//添加讲师
			var html=template('teacherTpl',{operate:'讲师添加', tc_gender:'1',teacherAdd:'添加'});
			$('#teacherInfo').html(html);

			//绑定添加的提交事件
			submitForm('/api/teacher/add');



		}

		//实现表单提交功能

	//法一：封装函数点击事件法
		// function submitForm(url){
		// 	$('#submitBtn').click(function(){
		// 		$.ajax({
		// 			type:'post',
		// 			url:url,
		// 			dataType:'json',
		// 			data:$('#formId').serialize(),
		// 			success:function(data){
		// 				if (data.code==200) {
		// 					location.href='/teacher/list';	
		// 				}
						
		// 			}
		// 		});
		// 	});
		// }
	
	//法二、表单验证插件法
		function submitForm(url){
			$('#formId').validate({
				sendForm:false,
				valid:function(){
					//使用form插件提交表单数据
					$(this).ajaxSubmit({
						type:'post',
						url:url,
						success:function(data){
							if(data.code==200){
								location.href='/teacher/list'
							}	
						}
					})
					

				},
				description:{
					tc_name:{
						required:'用户名不能为空',
						valid:'用户名可以使用'
					},
					tc_pass:{
						required:'密码不能为空',
						pattern:'密码必须为6位数字',
						valid:'密码可以使用'
					},
					tc_join_date:{
						required:'入职时间不能为空'
					}
				}


			});
		}
		


});


