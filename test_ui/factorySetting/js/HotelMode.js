// JavaScript Document
//loadLanguageFile("picture.js");
$(document).ready(function(){
		//获nonLinear 的 mode
		var powerModeList=["Direct","Secondary"];
		var curPowerMode=1;
		var data=[1,32,curPowerMode,"Hello World"];
		for(var i=0;i<data.length;i++){
			if(i===0){
				if(data[i]===0) $(".li-left:eq("+i+")").text("Off");
				else $(".li-left:eq("+i+")").text("On");
			}else if(i===2){
				 $(".li-left:eq("+i+")").text(powerModeList[curPowerMode]);
			}else {
				$(".li-left:eq("+i+")").text(data[i]);
			}
		}
		function setPowerMode(){
			var type = arguments[0]?arguments[0]:0;
			if(type===0){
				if(curPowerMode===powerModeList.length-1){
					curPowerMode=0;
				}else curPowerMode++;
			}else{
				if(curPowerMode===0){
					curPowerMode=powerModeList.length-1;
				}else curPowerMode--;
			}
			 $(".li-left:eq("+curRow+")").text(powerModeList[curPowerMode]);
		}
		$(document).keydown(function(event){
			var keyCode=event.keyCode;
			var returnValue;
			if(keyCode===numKeyRight){
				if(curRow===0){
					returnValue=setOnOffChange();
				}else if(curRow===1){
					returnValue=setNumChange(0,curRow-1,100);
				}
				else if(curRow===2){
					 setPowerMode();
				}else if(curRow === 5 || curRow === 6){
				//在这里执行database操作
				}
			}else if(keyCode===numKeyLeft){
				if(curRow===0){
					returnValue=setOnOffChange();
				}else if(curRow===1){
					returnValue=setNumChange(1,curRow-1);
				}
				else if(curRow===2){
					 setPowerMode();
				}else if(curRow === 5 || curRow === 6){
				
				}
			}
		});
});
	
