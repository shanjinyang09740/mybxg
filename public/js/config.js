require.config({
	baseUrl:'/public/assets',
	paths:{
		jquery:'jquery/jquery.min',
		cookie:'jquery-cookie/jquery.cookie',
		common:'../js/common',
		login:'../js/login',
		template:'artTemplate/template-web',
		bootstrap:'bootstrap/js/bootstrap.min',
		teacherList:'../js/teacher-list',
		teacherAdd:'../js/teacher-add',
		index:'../js/index',
		util:"../js/util"
	},
	shim:{
		bootstrap : {
			deps : ['jquery']
		}
	}


});