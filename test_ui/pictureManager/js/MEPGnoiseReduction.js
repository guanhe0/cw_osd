// JavaScript Document
loadLanguageFile("picture.js");
$(document).ready(function(){
		var noiseReductionList=picture.arrMEPGNoiseReductionList;
		//var curRow=0;//获取当前的数字降噪模式
		var curRow=PictureManager.getMPEGNoiseReduceion();
		var $list=$("#js_pictureList");
		
		//布局list内容
		for(var i=0;i<noiseReductionList.length;i++){
			$list.children("li:eq("+i+")").prepend(noiseReductionList[i]);
		}
		
		
		//设置行的样式
		function setCurLiStyle(){
			$list.children("li").removeClass("content-li-selected");
			$list.children("li:not(.content-li-nouse):eq("+curRow+")").addClass("content-li-selected");
			//在这里设置数字降噪模式
			PictureManager.setMPEGNoiseReduceion(curRow);
		}
		setCurLiStyle();
		
		$(document).keydown(function(event){
			var keyCode=event.keyCode;
			if(keyCode===numKeyDown){
				if(curRow===noiseReductionList.length-1){
					curRow=0;
				}else curRow++;
				setCurLiStyle();
			}else if(keyCode===numKeyUp){
				if(curRow===0){
					curRow=noiseReductionList.length-1;
				}else curRow--;
				setCurLiStyle();
			}
		});
});
	
