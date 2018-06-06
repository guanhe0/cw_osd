// JavaScript Document
loadLanguageFile("picture.js");
$(document).ready(function(){
		//alert(pictureList[0]);
		var currentRow = 0; //set current keyboard  position
		var list = $("#js_pictureList");
		var lengthPictureList = arrPictureList.length;
		var lengthPicturMode = arrPictureMode.length;
		for(var i in arrPictureList){
			list.append("<li>"+arrPictureList[i]+"</li>");
		}//layout   
		list.append("<li>hahahah</li>");
		
		//设置被选择的行的class，键盘上下调用此函数
		function setCurrentRowCss(){
			list.children("li").removeClass("content-li-selected");
			list.children("li:not(.content-li-nouse):eq("+currentRow+")").addClass("content-li-selected");
		} 
		setCurrentRowCss();	
		
		var arrPicMode = new Array();
		//var arrPicModeList = PictureManager.getDisplayMode();
		//document.write(arrPicModeList.length);
		arrPicMode = arrPictureMode;//将宏数组变量复制，避免删除和添加操作改
		
		var currentMode =9;   //获取当前的picturenMode变数组
		//var currentMode =PictureManager.getPictureMode();
		//mode改变时设置数据选项的样式
		function setModeChangeStyle(){
			if(currentMode === 3){
				list.children("li").removeClass("content-li-nouse");
			}else{
				for(var listnum=1;listnum<8;listnum++){
					list.children("li:eq("+listnum+")").addClass("content-li-nouse");
				}
			}
		}
		setModeChangeStyle();
		var userModeParams=[]
		if(currentMode===3){
			userModeParams = [43,43,54,76,34,56,43];
		}else{
			userModeParams = [50,50,50,50,50,50,50];
		}
		var objModeParam = [50,50,50,50,50,50,50];
		//mode改变时改变各个参数的值
		function changeParamsValue(numMode){
			if(numMode!==3){
				for(var i in objModeParam){
					objModeParam[i]=objModeData[numMode][i];
				}
			}else{
			for(var i in objModeParam){
					objModeParam[i]=userModeParams[i];
				}	
			}
			setCurrentContrast();
			setCurrentBright();
			setCurrentColor();
			setCurrentSharp();
			setCurrentColorTemplate();
			setCurrentTint();
			setCurrentBack();
		}
		changeParamsValue(currentMode);
		/*********************************************
		mode调节
		**********************************************/
		var modeHtml = "<div class='pic-mode'><ul id='js_picmode' >";
		//在当前mode将mode数组倒置
		var newArrPicMode = arrPicMode.slice(currentMode-1);
		for(var m=0;m<currentMode-1;m++){
			newArrPicMode.push(arrPicMode[m]);
		}
		for(var i in newArrPicMode){
			if(i==1){
				modeHtml += "<li id='js_selectedMode' data-currentMode='"+i+"'>"+newArrPicMode[i]+"</li>";
			}else
			{
				modeHtml += "<li>"+newArrPicMode[i]+"</li>";
			}
		}
		modeHtml+="</ul></div>";
		list.children("li:first").append(modeHtml);
		//左键选择mode事件
		function pictureModeSelectRight(){
			var firstMode = $("#js_picmode li:first").html();
			for(var n =0;n<lengthPicturMode;n++){
				if(n===(lengthPicturMode-1)){
					$("#js_picmode li:eq("+n+")").html(firstMode);
				}
				else $("#js_picmode li:eq("+n+")").html($("#js_picmode li:eq("+(n+1)+")").html());
			}
			
			if(currentMode ===10) currentMode=0;
			else currentMode++;
			setModeChangeStyle();
			changeParamsValue(currentMode)
		}
		//右键选择mode事件
		function pictureModeSelectLeft(){
			var lastMode = $("#js_picmode li:last").html();
			for(var n =lengthPicturMode-1;n>=0;n--){
				//alert(n);
				if(n===0){
					$("#js_picmode li:eq("+n+")").html(lastMode);
				}
				else $("#js_picmode li:eq("+n+")").html($("#js_picmode li:eq("+(n-1)+")").html());
			}
			if(currentMode ===0) currentMode=10;
			else currentMode--;
			setModeChangeStyle();
			changeParamsValue(currentMode)
		}
		
		//选择mode时改变参数的值。
		
		/***************************************************
		contrast  对比度调节
		***************************************************/
		var htmlContrast = "<div class='contrast'><div class='contrast-has' id='js_contrast'></div></div>";
		list.children("li:eq(1)").append(htmlContrast);

		function setCurrentContrast(){
			$("#js_contrast").css("width",objModeParam[0]+"%").html(objModeParam[0]);
		}
		setCurrentContrast();
		//改变对比度
		function  changeContrast(keyevent){
			if(keyevent===0 &&  objModeParam[0]>0 && objModeParam[0]<=100){
				objModeParam[0]--;
			}else if(keyevent===1 &&  objModeParam[0]>=0 && objModeParam[0]<100){
				objModeParam[0]++;
			}
			setCurrentContrast();
		}
		/***************************************************
		Brightness 亮度调节
		***************************************************/
		var htmlBright = "<div class='contrast'><div class='contrast-has' id='js_bright'></div></div>";
		list.children("li:eq(2)").append(htmlBright); 
		function setCurrentBright(){
			$("#js_bright").css("width",objModeParam[1]+"%").html(objModeParam[1]);
		}
		setCurrentBright();
		function  changeBright(keyevent){
			if(keyevent===0 &&  objModeParam[1]>0 && objModeParam[1]<=100){
				objModeParam[1]--;
			}else if(keyevent===1 &&  objModeParam[1]>=0 && objModeParam[1]<100){
				objModeParam[1]++;
			}
			setCurrentBright();
		}
		/***************************************************
		Color 饱和度调节
		***************************************************/
		var htmlColor = "<div class='contrast'><div class='contrast-has' id='js_color'></div></div>";
		list.children("li:eq(3)").append(htmlColor);
		function setCurrentColor(){
			$("#js_color").css("width",objModeParam[2]+"%").html(objModeParam[2]);
		}
		setCurrentColor();
		function  changeColor(keyevent){
			if(keyevent===0 &&  objModeParam[2]>0 && objModeParam[2]<=100){
				objModeParam[2]--;
			}else if(keyevent===1 &&  objModeParam[2]>=0 && objModeParam[2]<100){
				objModeParam[2]++;
			}
			setCurrentColor();
		}
		
		/***************************************************
		ColorTemplate  色温调节
		***************************************************/
		var htmlColorTemplate = "<div class='contrast'><div class='contrast-has' id='js_colorTemplate'></div></div>";
		list.children("li:eq(4)").append(htmlColorTemplate);
		function setCurrentColorTemplate(){
			$("#js_colorTemplate").css("width",objModeParam[3]+"%").html(objModeParam[3]);
		}
		setCurrentColorTemplate();
		function  changeColorTemplate(keyevent){
			if(keyevent===0 &&  objModeParam[3]>0 && objModeParam[3]<=100){
				objModeParam[3]--;
			}else if(keyevent===1 &&  objModeParam[3]>=0 && objModeParam[3]<100){
				objModeParam[3]++;
			}
			setCurrentColorTemplate();
		}
		
		/***************************************************
		Sharpness  清晰度调节
		***************************************************/
		var htmlSharp = "<div class='contrast'><div class='contrast-has' id='js_sharp'></div></div>";
		list.children("li:eq(5)").append(htmlSharp);
		function setCurrentSharp(){
			$("#js_sharp").css("width",objModeParam[4]+"%").html(objModeParam[4]);
		}
		setCurrentSharp();
		function  changeSharp(keyevent){
			if(keyevent===0 &&  objModeParam[4]>0 && objModeParam[4]<=100){
				objModeParam[4]--;
			}else if(keyevent===1 &&  objModeParam[4]>=0 && objModeParam[4]<100){
				objModeParam[4]++;
			}
			setCurrentSharp();
		}
		/***************************************************
		Tint  色彩调节
		***************************************************/
		var htmlTint = "<div class='contrast'><div class='contrast-has' id='js_tint'></div></div>";
		list.children("li:eq(6)").append(htmlTint);
		function setCurrentTint(){
			$("#js_tint").css("width",objModeParam[5]+"%").html(objModeParam[5]);
		}
		setCurrentTint();
		function  changeTint(keyevent){
			if(keyevent===0 &&  objModeParam[5]>0 && objModeParam[5]<=100){
				objModeParam[5]--;
			}else if(keyevent===1 &&  objModeParam[5]>=0 && objModeParam[5]<100){
				objModeParam[5]++;
			}
			setCurrentTint();
		}
		/***************************************************
		Backlight  背光调节
		***************************************************/
		var htmlBack = "<div class='contrast'><div class='contrast-has' id='js_back'></div></div>";
		list.children("li:eq(7)").append(htmlBack);
		function setCurrentBack(){
			$("#js_back").css("width",objModeParam[6]+"%").html(objModeParam[6]);
		}
		setCurrentBack();
		function  changeBack(keyevent){
			if(keyevent===0 &&  objModeParam[6]>0 && objModeParam[6]<=100){
				objModeParam[6]--;
			}else if(keyevent===1 &&  objModeParam[6]>=0 && objModeParam[6]<100){
				objModeParam[6]++;
			}
			setCurrentBack();
		}
		
		
		
		//键盘事件
		$(document).keydown(function(event){
			var codeKey = event.keyCode;
			if(codeKey === numKeyDown){
				var lengthList = list.children("li:not(.content-li-nouse)").length;
				if(currentRow === (lengthList-1))  currentRow =0;
				else currentRow++;
				setCurrentRowCss();
			}else if(codeKey === numKeyUp ){
				var lengthList = list.children("li:not(.content-li-nouse)").length;
				if(currentRow===0) currentRow =lengthList-1;
				else currentRow--;
				setCurrentRowCss();
			}else if(codeKey === numKeyLeft){
				if(currentRow===0) pictureModeSelectLeft();
				if(currentMode === 3){
					switch(currentRow){
						case 1:
							changeContrast(0);
							break;
						case 2:
							changeBright(0);
							break;
						case 3:
							changeColor(0);
							break;
						case 4:
							changeColorTemplate(0);
							break;
						case 5:
							changeSharp(0);
							break;
						case 6:
							changeTint(0);
							break;
						case 7:
							changeBack(0);
							break;
					}
				}
			}else if(codeKey === numKeyRight){
				if(currentRow===0) pictureModeSelectRight();
				if(currentMode === 3){
				switch(currentRow){
					case 1:
						changeContrast(1);
						break;
					case 2:
						changeBright(1);
						break;
					case 3:
						changeColor(1);
						break;
					case 4:
						changeColorTemplate(1);
						break;
					case 5:
						changeSharp(1);
						break;
					case 6:
						changeTint(1);
						break;
					case 7:
						changeBack(1);
						break;
				}
				}
			}
			
			$("#js_test").html(currentRow+$("#js_selectedMode").html()+"...."+objModeParam[0]);
		});

		
});
	
