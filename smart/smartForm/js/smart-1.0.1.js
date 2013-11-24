/*
*author    by YaoHang
*version   by 1.0.1
*date      by 2013-11-20
*explian   by 根据以往开发经验综合网络上目前比较流行的框架，整合出smartForm
*copyright by Yaohang 2013-
**/
( function ( $ ) {
  //定义元素列表
  $.extend({Element:{
	  	  span:"<span></span>",
	  	  div:"<div></div>",
	  	  img:"<img></img>",
	  	  br:"</br>",
	  	  nbsp:"&nbsp;"
	  	  },
	  	  config:{
	  	  	showOnlyMessage:false,   //false:每次只提醒一个元素的失败,true:提示所有元素
	  	  	showAllMessage:true,     //false:只显示校验失败信息，true:校验正确和失败都显示
	  	  	showType:1,              //错误提示模式1:为图文并茂,2:alert，3：dialog浮动
	  	  	eventOnblur:true,        //true:在失去焦点的时候触发校验事件,false:在点击提交按钮的时候触发校验事件
	  	  	ajaxSubmit:false,        //false:表单提交,function(){}ajax提交
	  	  	inputReduction:20        //text元素缩减长度
	  	  }
  });
  $.fn.extend({
  	smartForm:function (options) {
  	 var $_form=$(this);
     var $_children=this.find("input").each(function(count){
     	     var options=null;
     	      switch($.config.showType){
     	      	case 1:
     	      	   $(this).bind("blur",function(){
     	      	   	  options=textShow({current:this});
     	      	   	  if(!options.result){
     	      	   	  	//$_form.data(count,$(this).attr("id"));
     	      	   	  	//window.console.log($_form.data(count));
     	      	   	  }
     	      	   });
     	      	  break;
     	      	case 2:
     	      	  break;
     	      	case 3:
     	      	  break;
     	      } 
			   if($.config.showOnlyMessage&&!options.result){
			   	 return false;
			   }
	 });
  }
  });
  /**
	 * 提示模式一，图文并茂，在元素后方追加显示
	 * obj 当前校验的对象
	 */
    function textShow(objs){
       var $_obj=$(objs.current);
	   var smart=$_obj.attr("smart");
	   var type=typeof smart;
	   var  options=null;
	   if(type=="string"){
	   	       var smartStatus=typeof($_obj.attr("smart-status"));
		       var width=$_obj.width();
			   var height=$_obj.height()+6;
			   var this_=objs.current;
			   var left=(this_.offsetLeft+width);
			   var top=this_.offsetTop
			   var $_div=elementFactory($.Element.div);
			   var $_img=elementFactory($.Element.img);
			   var $_span=elementFactory($.Element.span);
				   $_div.addClass("msg_imagetext");
				   if(smartStatus!="undefined"){
				   	   left+=$.config.inputReduction;
				   }
				   $_div.css("left",left);
				   $_div.css("top",top);
				   $_div.height(height);
				   $_div.css("line-height",height+"px");
				   $_div.append($_img);
				   $_div.append($_span);
				   $_div.attr("id","smart-"+$_obj.attr("id"));
				   smart=$.parseJSON(smart);
			       options=analysisSmart(objs.current,$_div,smart);
			       var $_smartElement=$("#smart-"+$_obj.attr("id"));
			      if($.config.showAllMessage||!options.result){
			      	  //if($.config.showOnlyMessage){
				      	   //如果当前是第一次提醒那么input元素进行缩减
				      	   if(smartStatus=="undefined"){
					      	   	var size=$_obj.width()-$.config.inputReduction;
					      	  	$_obj.stop().animate({width:size},500);
				      	   }
			      	 // }
			      	   //删除原有对象，追加信息的错误信息
					   var $_parent=$_obj.parent();
					       if($_smartElement.length>0){
					       	 $_smartElement.remove();
					       }
					       $_parent.append(options.div);
						   //给当前校验元素添加校验状态
						   $_obj.attr("smart-status",options.result);
				  }else{
				  	if($_smartElement.length>0){
				  		$_smartElement.remove();
				  		var size=$_obj.width()+$.config.inputReduction;
				  		$_obj.stop().animate({width:size},500);
				  		$_obj.removeAttr("smart-status");
				  		
				  	}
				  }
	  }
	  return options;
	}
		/**
		* 解析smart属性
		* obj 当前校验对象
		* $_div 错误信息容器
		* smart smart属性值
		*/
	var analysisSmart=function (obj,$_div,smart){
		 var options={result:true,div:$_div};
		 var $_obj=$(obj);
		 var $_span=$($_div.find("span"));
		 var $_img=$($_div.find("img"));
		 var value=$_obj.val();
		if(typeof(smart.required)=="boolean"&&smart.required){
			 if($_obj.elementType({type:"checkbox"})){
			 	
			 }else if($_obj.elementType({type:"radio"})){
			 	
			 }else{
			 	//非空
			 	if(value==null||value.length==0){
			 		$_span.html($.exp.required.errorMsg);
			 		options.result=false;
			 	}
			 	//最大长度
			 	if(typeof(smart.minSize)=="number"){
			 		if(options.result&&$_obj.val().length<smart.minSize){
			 			$_span.html($.exp.minSize.errorMsg+smart.minSize);
			 			options.result=false;
			 		}
			 		
			 	}
			 	//最小长度
			 	if(typeof(smart.maxSize)=="number"){
			 		if(options.result&&$_obj.val().length>smart.maxSize){
			 			$_span.html($.exp.maxSize.errorMsg+smart.maxSize);
			 			options.result=false;
			 		}
			 		
			 	}
			 }
			 
		 }
		 	//一致性
			 	if(typeof(smart.request)=="string"){
			 		var $_a=$("#"+smart.request);
			 		if(value!=$_a.val()){
			 			$_span.html($.exp.request.errorMsg);
			 			options.result=false;
			 		}
			 	}
			 	//组合
			 	if(typeof(smart.customer)=="string"){
			 		var reg=$.exp[smart.customer].exp;
			 		if(reg.test(value)==false){
			 			$_span.html($.exp[smart.customer].errorMsg);
			 			options.result=false;
			 		}
			 	}
		 
		 if(!options.result){
		 	$_img.attr("src","image/error.gif");
		 	$_div.css("color","red");
		 }else{
		 	$_img.attr("src","image/success.png");
		 	$_span.html($.exp.required.successMsg);
		 	$_div.css("color","#41CE36");
		 }
		 return options;
	}
	
	/**
	 * 元素生成器
	 * options html字符串
	 */
   var elementFactory=function(options){
   	   var obj=$(options);
   	   return obj;
   }
    /**
     * 元素判断器 
     * options {type:"需要判断的类型"}
     */
     $.fn.elementType=function(options){
     	  var type=this.attr("type");
     	  if(type!=null&&type==options.type){
     	  	 return true;
     	  }
     	  return false;
     }
     
} )( jQuery );