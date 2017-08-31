define(['jquery','template','util','bootstrap'],function($,template,u){
	//设置导航菜单选中高亮显示
	u.setMenu(location.pathname);

	//获取url参数中指定的参数值
	// var ret=u.qs('flag');
	// var res=u.qs('abc');
	// console.log(res);


	$.ajax({
		type:'get',
		url:'/api/teacher',
		dataType:'json',
		success:function(data){
			// console.log(data);
			var html=template('teacherTpl',{list:data.result});
			$('#teacherInfo').html(html);

			//绑定预览点击事件
			$('.observe').click(function(){
				var tcId=$(this).parent().attr('data-id');
				$.ajax({
					type:'get',
					url:'/api/teacher/view',
					dataType:'json',
					data:{
						tc_id:tcId
					},
					success:function(data){
						console.log(data);
						var html=template('infoTpl',data.result);
						console.log(html);
						$('#teacherMode').html(html);

						//显示模态框
						$('#teacherModal').modal();
					}

				});

			});

			//绑定启用/注销事件
			$('.writeOff').click(function(){
				var td=$(this).closest('td');
				var tcId=td.attr('data-id');
				var tcStatus=td.attr('data-status')
				var that=this;
				$.ajax({
					type:'post',
					url:'/api/teacher/handle',
					dataType:'json',
					data:{
						tc_id:tcId,
						tc_status:tcStatus
					},
					success:function(data){
						td.attr('data-status',data.result.tc_status);
						if(data.result.tc_status==0){
							$(that).html('注 销');
						}else{
							$(that).html('启 用');
						}
					}
				});
			});


		}




	})



});

