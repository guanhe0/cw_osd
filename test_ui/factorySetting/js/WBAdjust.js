// JavaScript Document
//loadLanguageFile("picture.js");
$(document).ready(function(){
		//获取WBmode数组
		var WBMode=["DTV","ATV","AV1","Component1","PC","HDMI1","HDMI2","HDMI3"];
		var tempMode=["cool","Medium","Warm","User"];
		var curRow=0;
		//获取当前mode 的index 值
		var curMode=2
		var curTempMode=0;
		var $list=$("#js_list");
		var $wbMode=$("#js_ADCMode");
		var $tempMode=$("#js_temperature");
		//获取当前mode 的参数
		var WBData=[1234,456,6754,0,0,0];
		function setLiStyle(){
			$list.children("li").removeClass("content-li-selected");
			$list.children("li:eq("+curRow+")").addClass("content-li-selected");
		}
		setLiStyle();
		function setWBMode(){
			$wbMode.text(WBMode[curMode]);
		}
		
		//设置色温mode
		function setTempMode(){
			$tempMode.text(tempMode[curTempMode]);
			//获取当前mode下的data数组
			for(var i=2;i<=WBData.length+1;i++){
				WBData[i-2]=WBData[i-2]+curTempMode;
				$(".li-left:eq("+i+")").text(WBData[i-2]);
			}
		}
		setTempMode();
		setWBMode();
		function setWBData(type){
			var curWBData=WBData[curRow-2];
			if(type===0){
				curWBData++;
			}
			else if(type===1){
			if(curWBData===0) return false;
				curWBData--;
			}
			WBData[curRow-2]=curWBData;
			$(".li-left:eq("+curRow+")").text(curWBData);
		}
		$(document).keydown(function(event){
			var keyCode=event.keyCode;
			if(keyCode===numKeyDown){
				if(curRow===$("#js_list").children("li").length-1){
					curRow=0;
				}else curRow++;
				setLiStyle();
			}
			else if(keyCode===numKeyUp){
				if(curRow===0){
					curRow=$("#js_list").children("li").length-1;
				}else curRow--;
				setLiStyle();
			}else if(keyCode===numKeyRight){
				if(curRow===0){
					if(curMode===WBMode.length-1){
						curMode=0;
					}else{
						curMode++;
					}
					//设置adcmode
					//获取adcData
					//ADCData=
					setWBMode();
				}else if(curRow===1){
					if(curTempMode===tempMode.length-1){
						curTempMode=0;
					}else{
						curTempMode++;
					}
					setTempMode();
				}else{
					setWBData(0);
				}
			}else if(keyCode===numKeyLeft){
				if(curRow===0){
					if(curMode===0){
						curMode=WBMode.length-1;
					}else{
						curMode--;
					}
					//设置adcmode
					//获取adcData
					//ADCData=
					setTempMode();
				}else if(curRow===1){
					if(curTempMode===0){
						curTempMode=tempMode.length-1;
					}else{
						curTempMode--;
					}
					setTempMode()
				}else{
					setWBData(1);
				}
			}
		});
});
	
