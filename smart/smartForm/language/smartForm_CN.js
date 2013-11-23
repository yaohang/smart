/**
 * 定义校验规则,用户可遵循规范自定义
 * @author Yaohang
 * @version 1.0.0
 */
(function(){
$.extend({exp:{
	 required:{
	   exp:"none",
	   errorMsg:"此项不允许为空!",
	   successMsg:"输入正确!"
	  },
	 maxSize:{
	 	errorMsg:"最大字符长度不能超过"
	 },
	 minSize:{ 
	 	errorMsg:"最小字符长度不能超过"
	 },
	 request:{
	 	errorMsg:"两次密码不一致!"
	 }
}});
})(jQuery);