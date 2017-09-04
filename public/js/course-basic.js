define(['jquery','template','util','ckeditor','validate','form'],function($,template,util,CKEDITOR){
	//设置导航菜单选中高亮显示
	util.setMenu('/course/add');

	//获取课程id
	var csId=util.qs('cs_id');

	//添加和编辑的标志位
	var flag=util.qs('flag');

	
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
			if(flag!=1){
				//课程编辑
				data.result.operate='课程编辑';
				var html=template('basicTpl',data.result);
				$('#basicInfo').html(html);
			}else{
				//课程添加
				data.result.operate='课程添加';
				var html=template('basicTpl',data.result);
				$('#basicInfo').html(html);
			}

			CKEDITOR.replace('edi',{
				toolbarGroups:[
					{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
					{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
					{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
					{ name: 'others', groups: [ 'others' ] }
				]
			});


			// 处理二级分类下的下拉联动
			$('#firstType').change(function(){
				$.ajax({
					type:'get',
					url:'/api/category/child',
					data:{cg_id:$(this).val()},
					dataType:'json',
					success:function(data){
						// console.log(data);
						//渲染二级分类列表
						var tpl='<option value="0">请选择二级分类...</option>{{each list}}<option value="{{$value.cg_id}}" {{if cs_cg_id==$value.cg_id}}selected{{/if}} >{{$value.cg_name}}</option>{{/each}}';
						var html=template.render(tpl,{list:data.result});
						$('#secondType').html(html);
					}
				});
			});




			//处理表单提交
			$('#basicForm').validate({
				sendForm:false,
				valid:function(){
					$(this).ajaxSubmit({
						type:'post',
						url:'/api/course/update/basic',
						dataType:'json',
						data:{cs_id : csId},
						success:function(data){
							// console.log(data);
							if(data.code==200){
								location.href='/course/picture?cs_id='+data.result.cs_id;
							}
						}
					});
				}
			})



		}
	});


});