// JavaScript Document
//loadLanguageFile("picture.js");
$(document).ready(function(){
		//获nonLinear 的 mode
		var data=[1,21,255,63,253,255,19];
		
		for(var i=0;i<data.length;i++){
			if(i===0){
				if(data[i]===0){
					$(".li-left:eq("+i+")").text("OFF");
				}else $(".li-left:eq("+i+")").text("On");
			}else{
				$(".li-left:eq("+i+")").text(data[i]);
			}
		}
		
		$(document).keydown(function(event){
			var keyCode=event.keyCode;
			var returnValue;
			if(keyCode===numKeyRight){
				if(curRow===0){
					returnValue=setOnOffChange();
				}else{
					returnValue=setNumChange(0,curRow-1,255);
				}
			}else if(keyCode===numKeyLeft){
				if(curRow===0){
					returnValue=setOnOffChange();
				}else{
					returnValue=setNumChange(1,curRow-1);
				}
			}
		});
});
	
