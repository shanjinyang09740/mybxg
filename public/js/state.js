//设置遮罩层
define(['jquery'],function($){
	$(document).ajaxStart(function(){
		$('.overlay').show();
	});
	$(document).ajaxStop(function(){
		setTimeout(function(){
			$('.overlay').hide();
		},500);
	});


});