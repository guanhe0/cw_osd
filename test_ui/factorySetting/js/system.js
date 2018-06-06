// JavaScript Document
//loadLanguageFile("picture.js");
$(document).ready(function(){
		//获取WBmode数组
		//获取的index 值
		var systemIndex=[1,1,1,1,1,1,1,1];
		var powerOnMode=["Direct","Secondary","Memory"];
		var powerOnRow=2;
		//设置system值
		function layoutSystemData(){
			for(var i=0;i<systemIndex.length;i++){
				if(i===powerOnRow){
					$(".li-left:eq("+i+")").text(powerOnMode[systemIndex[i]]);
				}
				else{
					if(systemIndex[i]===0){
						$(".li-left:eq("+i+")").text("Off");
					}else {
						$(".li-left:eq("+i+")").text("On");
					}
				}
			}
		}
		layoutSystemData();
		function setSystemData(type){
			if(curRow===powerOnRow){
				if(type===0){
					if(systemIndex[powerOnRow]===powerOnMode.length-1){
						systemIndex[powerOnRow]=0;
					}
					else systemIndex[powerOnRow]++;
				}else if(type===1){
					if(systemIndex[powerOnRow]===0){
						systemIndex[powerOnRow]=powerOnMode.length-1;
					}
					else systemIndex[powerOnRow]--;
				}
				$(".li-left:eq("+powerOnRow+")").text(powerOnMode[systemIndex[powerOnRow]]);
			}else{
				if(systemIndex[curRow]===0){
					systemIndex[curRow]=1;
					$(".li-left:eq("+curRow+")").text("On");
				}else{
					systemIndex[curRow]=0;
					$(".li-left:eq("+curRow+")").text("Off");
				}
			}
			//设置接口
			switch(curRow){
				case 0://设置 factory  mode
				case 1://设置aging mode
				case 2://设置  Power on mode
				case 3://设置 uart enable
				case 4://设置 mount config
				case 5://设置 white pattern
				case 6://设置 wdt
				case 7://设置Ram log
			}
		}
		$(document).keydown(function(event){
			var keyCode=event.keyCode;
			if(keyCode===numKeyRight){
				if(curRow<8){
					  setSystemData(0)
				}
			}else if(keyCode===numKeyLeft){
				if(curRow<8){
					  setSystemData(1)
				}
			}
			else if(keyCode===numKeyEnter){
				if(curRow>=8){
					//设置ok键按下后调用的接口
					switch(curRow){
						case 8: //设置reset all
						case 9: //设置restore factory default
						case 10://设置burn Mac
						case 11://设置 burn HDCP KEY
						case 12://设置burn WIDI KEY
						case 13://设置 burn all
					}
				}
			}
		});
});
	
