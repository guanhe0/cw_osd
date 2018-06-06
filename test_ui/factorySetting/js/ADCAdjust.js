// JavaScript Document
//loadLanguageFile("picture.js");
$(document).ready(function(){
		var ADCMode=["PC","YPbPr(SD)","YPBPR(HD)","SCART"];
		var curRow=0;
		var curMode=2
		var $list=$("#js_list");
		var $adcMode=$("#js_ADCMode");
		var ADCData=[1234,456,6754,0,0,0];
		function setLiStyle(){
			$list.children("li").removeClass("content-li-selected");
			$list.children("li:eq("+curRow+")").addClass("content-li-selected");
		}
		setLiStyle();
		function setADCMode(){
			$adcMode.text(ADCMode[curMode]);
			for(var i=1;i<=ADCData.length;i++){
				ADCData[i-1]=ADCData[i-1]+curMode;
				$(".li-left:eq("+i+")").text(ADCData[i-1]);
			}
		}
		setADCMode();
		function setADCData(type){
			var curADCData=ADCData[curRow-1];
			if(type===0){
				curADCData++;
			}
			else if(type===1){
			if(curADCData===0) return false;
				curADCData--;
			}
			ADCData[curRow-1]=curADCData;
			$(".li-left:eq("+curRow+")").text(curADCData);
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
					if(curMode===ADCMode.length-1){
						curMode=0;
					}else{
						curMode++;
					}
					//设置adcmode
					//获取adcData
					//ADCData=
					setADCMode();
				}else if(curRow===ADCData.length+1){
				}else{
					setADCData(0);
				}
			}else if(keyCode===numKeyLeft){
				if(curRow===0){
					if(curMode===0){
						curMode=ADCMode.length-1;
					}else{
						curMode--;
					}
					//设置adcmode
					//获取adcData
					//ADCData=
					setADCMode();
				}else if(curMode===ADCMode.length){
				}else{
					setADCData(1);
				}
			}
		});
});
	
