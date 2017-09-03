require.config({
	baseUrl:'/public/assets',
	paths:{
		jquery:'jquery/jquery.min',
		cookie:'jquery-cookie/jquery.cookie',
		common:'../js/common',
		login:'../js/login',
		settings:'../js/settings',
		template:'artTemplate/template-web',
		bootstrap:'bootstrap/js/bootstrap.min',
		datepicker:'bootstrap-datepicker/js/bootstrap-datepicker',
		language:'bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
		validate:'validate/jquery-validate',
		uploadify:'uploadify/jquery.uploadify.min',
		region:'jquery-region/jquery.region',
		ckeditor:'ckeditor/ckeditor',
		nprogress:'nprogress/nprogress',
		form:'form/jquery.form',
		teacherList:'../js/teacher-list',
		teacherAdd:'../js/teacher-add',	
		index:'../js/index',
		util:"../js/util",
		state:'../js/state',
		courseList:'../js/course-list',
		courseAdd:'../js/course-add',
		courseBasic:'../js/course-basic',
		coursePicture:'../js/course-picture'
	},
	shim:{
		bootstrap : {
			deps : ['jquery']
		},
		language : {
			deps : ['jquery']
		},
		validate : {
			deps : ['jquery']
		},
		settings : {
			deps:['jquery']
		},
		uploadify:{
			deps:['jquery']
		},
		ckeditor:{
			exports:'CKEDITOR'
		}
	}


});