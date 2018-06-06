// JavaScript Document
//loadLanguageFile("picture.js");
$(document).ready(function(){
		var $list=$("#js_list");
		var diskList=["My Disk1","My Disk2","My Dislk3"];
		
		for(var i=0;i<diskList.length;i++){
			$list.append("<li>"+diskList[i]+"</li>");
		}
		function setLiStyle(){
			$list.children("li").removeClass("content-li-selected");
			$list.children("li:eq("+curRow+")").addClass("content-li-selected");
		}
		setLiStyle();
		$(document).keydown(function(event){
			var keyCode=event.keyCode;
			if(keyCode===numKeyEnter){
				//设置选择的disk的index
				//SetCookie("curDisk",curRow);
			//	if(ReadCookie("curDisk")){
					alert(1);
				//}
				location.href="record.html";
			}	
		});
});
	
