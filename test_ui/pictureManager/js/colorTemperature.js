// JavaScript Document
loadLanguageFile("picture.js");
$(document).ready(function(){
		var colorTempList=picture.arrColorTempList;
		var colorTempMode=picture.arrColorTempMode;
		var curRow=0;
		var $list=$("#js_pictureList");
		var $mode=$("#js_picmode");
		var userIndex=2;
		var userParam=[68,12,89];//获得用户设置的参数值
		var colorTempParam=picture.arrColorTempParam;
		var $test=$("#js_test");
		//布局list内容
		for(var i=0;i<colorTempList.length;i++){
			$list.children("li:eq("+i+")").prepend(colorTempList[i]);
		}
		
		
		//设置行的样式
		function setCurLiStyle(){
			$list.children("li").removeClass("content-li-selected");
			$list.children("li:not(.content-li-nouse):eq("+curRow+")").addClass("content-li-selected");
		}
		setCurLiStyle();
		
		
		var curModeIndex=0;
		//var  curModeIndex=PictureManager.getColorTemperature(); //获取当前的色温模
		$test.append("当前的色温模式index："+curModeIndex+";--"+colorTempMode[curModeIndex]+"<br/>");
		function addModeText(){
			//调换mode顺序
			var newMode =colorTempMode.slice(curModeIndex-1);
			if(curModeIndex===0){
				for(var m=0;m<colorTempMode.length-1;m++){
					newMode.push(colorTempMode[m]);
				}
			}else{
				for(var m=0;m<curModeIndex-1;m++){
					newMode.push(colorTempMode[m]);
				}
			}
			//布局mode内容
			for(var j=0;j<newMode.length;j++){
				$mode.children("li:eq("+j+")").text(newMode[j]);
			}
		}
		addModeText();
		//第一行模式的选择函数
		function setColorMode(type){
			if(type===0){
				if(curModeIndex=== colorTempMode.length-1) curModeIndex=0;
				else curModeIndex++;
			}else if(type===1){
				if(curModeIndex=== 0) curModeIndex=colorTempMode.length-1;
				else curModeIndex--;
			}
			addModeText();
			setOtherLi();
			setParamStyle();
		};
		//设置mode变化时其他li的样式变化
		function setOtherLi(){
			if(curModeIndex!==userIndex){
				$list.children("li").addClass("content-li-nouse");
				$list.children("li:first").removeClass("content-li-nouse");
			}else{
				$list.children("li").removeClass("content-li-nouse");
			}
		}
		setOtherLi();
		
		//设置不同mode下参数的样式
		function setParamStyle(){
			picture.arrColorTempParam[userIndex]=userParam;
			for(var i=0;i<userParam.length;i++){
				$(".contrast-has:eq("+i+")").width(colorTempParam[curModeIndex][i]+"%").text(colorTempParam[curModeIndex][i]);
			}
		}
		setParamStyle();
		
		//改变参数
		function changeParam(objIndex,keyType){
			if(keyType===0 && userParam[objIndex]>=0 && userParam[objIndex]<100){
				userParam[objIndex]++;
			}else if(keyType===1 && userParam[objIndex]>0 && userParam[objIndex]<=100){
				userParam[objIndex]--;
			}
			$(".contrast-has:eq("+objIndex+")").width(userParam[objIndex]+"%").text(userParam[objIndex]);
			
			//设置user的一项参数值；
		}
		
		$(document).keydown(function(event){
			var keyCode=event.keyCode;
			if(keyCode===numKeyDown){
				if(curModeIndex===userIndex){
					if(curRow===colorTempList.length-1){
						curRow=0;
					}else curRow++;
					setCurLiStyle();
				}
			}else if(keyCode===numKeyUp){
				if(curModeIndex===userIndex){
					if(curRow===0){
						curRow=colorTempList.length-1;
					}else curRow--;
					setCurLiStyle();
				}
			}else if(keyCode===numKeyRight){
				switch(curRow){
					case 0:
						setColorMode(0)
						PictureManager.setColorTemperature(curModeIndex);//设置色温模式
						break;
					case 1:
					 	changeParam(0,0);
						break;
					case 2:
						changeParam(1,0);
						break;
					case 3:
						changeParam(2,0);
						break;
						
				}
			}else if(keyCode===numKeyLeft){
				switch(curRow){
					case 0:
						setColorMode(1);
						PictureManager.setColorTemperature(curModeIndex);//设置色温模式
						break;
					case 1:
						changeParam(0,1);
						break;
					case 2:
						changeParam(1,1);
						break;
					case 3:
						changeParam(2,1);
						break;
						
				}
			}
		});
});
	
