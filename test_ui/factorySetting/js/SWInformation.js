// JavaScript Document
//loadLanguageFile("picture.js");
$(document).ready(function(){
		//获nonLinear 的 mode
		var data=[419757,"","","","default"];
		for(var i=0;i<data.length;i++){
			$(".li-left:eq("+i+")").text(data[i]);
		}
		
		$(document).keydown(function(event){
			var keyCode=event.keyCode;
			var returnValue;
			if(keyCode===numKeyRight){
			}else if(keyCode===numKeyLeft){
				
			}
		});
});
	
