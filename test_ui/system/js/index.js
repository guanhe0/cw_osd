// JavaScript Document
loadLanguageFile("picture.js");
$(document).ready(function(){
		var curRow=0;
		var $picList= $("#js_pictureList");
		for(var i=0;i<picture.arrMenuList.length;i++){
			$picList.children("li:eq("+i+")").text(arrMenuList[i]);
		}
		function setLiStyle(){
			$picList.children("li").removeClass("content-li-selected");
			$picList.children("li:eq("+curRow+")").addClass("content-li-selected");
		}
		setLiStyle();
		$(document).keydown(function(event){
			var keyCode=event.keyCode;
			if(keyCode===numKeyDown){
				if(curRow===picture.arrMenuList.length-1){
					curRow=0;
				}else curRow++;
				setLiStyle();
			}
			else if(keyCode===numKeyUp){
				if(curRow===0){
					curRow=picture.arrMenuList.length-1;
				}else curRow--;
				setLiStyle();
			}else if(keyCode === numKeyEnter){
				if($(".content-li-selected").data('url')!=null){
					location.href=$(".content-li-selected").data('url');
				}
			}
		});
});
	
