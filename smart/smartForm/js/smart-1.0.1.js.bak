/*
*author    by YaoHang
*version   by 1.0.1
*date      by 2013-11-20
*explian   by smartfrom表单插件整合了其他一些优秀的jquery表单插件结合项目组中的实际问题开发的
*copyright by Yaohang 2013-
**/
( function ( $ ) {
  $.fn.smartForm= function (options) {
     var $_children=this.find("input").each(function(){
			   textShow(this);
	 });
  }
  /**
	 *文本显示
	 */
    function textShow(obj){
	   var smart=$(obj).attr("smart");
	   var type=typeof smart;
	   if(type=="string"){
		       var width=$(obj).width();
			   var height=$(obj).height()+6;
			   var this_=$(obj)[0];
			   var left=(this_.offsetLeft+width);
			   var top=this_.offsetTop
			   var $_div=$("<div></div>");
			   var $_img=$("<img/>");
			   var $_span=$("<span></span>");
				   $_div.addClass("msg_imagetext");
				   $_div.css("left",left);
				   $_div.css("top",top);
				   $_div.height(height);
				   $_div.css("line-height",height+"px");
				   $_img.attr("src","image/error.gif");
				   $_div.append($_img);
				   $_div.append($_span);
			  var  options=analysisSmart(obj,$_div,smart);
			      if(!options.result){
					   $(obj).width(width-20);
					   $(obj).parent().append(options.div);

				  }
	  }
	}
	/**
	*解析smart属性
	*/
	function analysisSmart(obj,$div,smart){
		 var options={result:true,div:$div};
		 var $_span=$($div.find("span"));
		 var $_img=$($div.find("img"));
		    if(smart.indexOf("requird")!=-1){
			   $_span.html($.exp.requird.errorMsg);
			   options.result=false;
			}
		 
		 return options;
	}
} )( jQuery );