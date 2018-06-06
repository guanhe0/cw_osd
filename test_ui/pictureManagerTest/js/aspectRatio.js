// JavaScript Document
loadLanguageFile("picture.js");
$(document).ready(function(){
		var aspectRatioList=picture.arrAspectRatioList;
		var curRow=0;//获取当前的图像比例
		//var curRow=PictureManager.getDisplayMode();
		var $list=$("#js_pictureList");
		
		//布局list内容
		for(var i=0;i<aspectRatioList.length;i++){
			$list.children("li:eq("+i+")").prepend(aspectRatioList[i]);
		}
		
		
		//设置行的样式
		function setCurLiStyle(){
			$list.children("li").removeClass("content-li-selected");
			$list.children("li:not(.content-li-nouse):eq("+curRow+")").addClass("content-li-selected");
			//在这里设置图像比例
			//PictureManager.setDisplayMode();
		}
		setCurLiStyle();
		
		$(document).keydown(function(event){
			var keyCode=event.keyCode;
			if(keyCode===numKeyDown){
				if(curRow===aspectRatioList.length-1){
					curRow=0;
				}else curRow++;
				setCurLiStyle();
			}else if(keyCode===numKeyUp){
				if(curRow===0){
					curRow=aspectRatioList.length-1;
				}else curRow--;
				setCurLiStyle();
			}
		});
});
	
