// JavaScript Document
loadLanguageFile("picture.js");
$(document).ready(function(){
		var filmModeList=picture.arrFilmModeList;
		var curRow=0;//获取当前的电影模式开关状态
		//var curRow=PictureManager.getCinemaMode();
		var $list=$("#js_pictureList");
		
		//布局list内容
		for(var i=0;i<filmModeList.length;i++){
			$list.children("li:eq("+i+")").prepend(filmModeList[i]);
		}
		
		
		//设置行的样式
		function setCurLiStyle(){
			$list.children("li").removeClass("content-li-selected");
			$list.children("li:not(.content-li-nouse):eq("+curRow+")").addClass("content-li-selected");
			//在这里设置电影模式开关状态
			//PictureManager.setCinemaMode(curRow);
		}
		setCurLiStyle();
		
		$(document).keydown(function(event){
			var keyCode=event.keyCode;
			if(keyCode===numKeyDown){
				if(curRow===filmModeList.length-1){
					curRow=0;
				}else curRow++;
				setCurLiStyle();
			}else if(keyCode===numKeyUp){
				if(curRow===0){
					curRow=filmModeList.length-1;
				}else curRow--;
				setCurLiStyle();
			}
		});
});
	
