// JavaScript Document
//loadLanguageFile("picture.js");
$(document).ready(function(){
		//获nonLinear 的 mode
		var modeList=["Volume","Brightness","Contrast","Saturation","SharpNess","Hue","Back Light"];
		var curMode=2;
		var modeData=[0,23,42,67,90];
		var $mode=$("#js_mode");
		var $list=$("#js_list");
		function setMode(){
			//modeData=  //在这里获取data的数据
			$mode.text(modeList[curMode]);
			for(var i=1;i<=modeData.length;i++){
				$(".li-left:eq("+i+")").text(modeData[i-1]);
			}
		}
		setMode();
		
		$(document).keydown(function(event){
			var keyCode=event.keyCode;
			var returnValue;
			if(keyCode===numKeyRight){
				if(curRow===0){
					if(curMode===modeList.length-1){
						curMode=0;
					}else curMode++;
					setMode();
				}else{
					returnValue=setNumChange(0);
				}
			}else if(keyCode===numKeyLeft){
				if(curRow===0){
					if(curMode===0){
						curMode=modeList.length-1;
					}else curMode++;
					setMode();
				}else{
					returnValue=setNumChange(1);
				}
			}
		});
});
	
