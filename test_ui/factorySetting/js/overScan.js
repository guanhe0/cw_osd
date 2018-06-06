// JavaScript Document
//loadLanguageFile("picture.js");
$(document).ready(function(){
		//获取WBmode数组
		//获取当前mode 的index 值
		//获取当前mode 的参数
		var curSource="DTV";
		var sourceData=[32,32,32,23];
		
		$("#js_inputSource").text(curSource);
		function layoutScanData(){
			for(var i=1;i<=sourceData.length;i++){
				$(".li-left:eq("+i+")").text(sourceData[i-1]);
			}
		}
		layoutScanData();
		function setScanData(type){
			var curScanData=sourceData[curRow-1];
			if(type===0){
				curScanData++;
			}
			else if(type===1){
			if(curScanData===0) return false;
				curScanData--;
			}
			sourceData[curRow-1]=curScanData;
			$(".li-left:eq("+curRow+")").text(curScanData);
		}
		$(document).keydown(function(event){
			var keyCode=event.keyCode;
			if(keyCode===numKeyRight){
				if(curRow>0){
					 setScanData(0);
				}
			}else if(keyCode===numKeyLeft){
				if(curRow>0){
					 setScanData(1);
				}
			}
			else if(keyCode===numKeyEnter){
				return false;
			}
		});
});
	
