// JavaScript Document
loadLanguageFile("picture.js");
$(document).ready(function(){
		var dynamicContrastList=picture.arrDynamicContrastList;
		var curRow=0;//获取当前的动态对比度开关
		//var curRow=PictureManager.getDynamicContrast();
		var $list=$("#js_pictureList");
		
		//布局list内容
		for(var i=0;i<dynamicContrastList.length;i++){
			$list.children("li:eq("+i+")").prepend(dynamicContrastList[i]);
		}
		
		
		//设置行的样式
		function setCurLiStyle(){
			$list.children("li").removeClass("content-li-selected");
			$list.children("li:not(.content-li-nouse):eq("+curRow+")").addClass("content-li-selected");
			//在这里设置动态对比度
			//PictureManager.setDynamicContrast(curRow);
		}
		setCurLiStyle();
		
		$(document).keydown(function(event){
			var keyCode=event.keyCode;
			if(keyCode===numKeyDown){
				if(curRow===dynamicContrastList.length-1){
					curRow=0;
				}else curRow++;
				setCurLiStyle();
			}else if(keyCode===numKeyUp){
				if(curRow===0){
					curRow=dynamicContrastList.length-1;
				}else curRow--;
				setCurLiStyle();
			}
		});
});
	
