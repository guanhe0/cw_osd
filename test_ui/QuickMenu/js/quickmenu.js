$(function() {
	var displaymodelist = ["Auto","16:9","4:3","Caption","Panorama","Moive","Zoom1","Zoom2"];
	var scenemodelist = ["scene1","scene2","scene3","scene4","user"];
	var sleeptimerlist = ["Off","5Minutes","15Minutes","30Minutes","60Minutes","90Minutes","120Minutes"];

	var selectedRow = 0;
	var $menu = $("#js_content");
	var menuLength = $menu.children("li").length - 4;

	var displaymodeindex = PictureManager.getDisplayMode();
	var $displaymode = $("#js_displaymode");
	var displaymodelength = displaymodelist.length;
	
	console.log("currentSceneId_ATV = "+currentSceneId_ATV);
	var scenemodeindex = currentSceneId_ATV;

	var $scenemode = $("#js_scenemode");
	var scenemodelength = scenemodelist.length;

	var backlightindex = PictureManager.getbacklight();
	var $backlight = $("#js_backlight");
	var $backlightnum = $("#js_backlightnum");

	var sleeptimerindex = JS_TimerManager.getSleepMode();
	console.log("sleeptimerindex = "+sleeptimerindex);
	/*
	if(sleeptimerindex < 0 || sleeptimerindex >= 12)
	{
		sleeptimerindex = 3;
	}
	*/
	var $sleeptimer = $("#js_sleeptimer");
	var sleeptimerlength = sleeptimerlist.length;

	isSelected(selectedRow);
	setDisplayMode(displaymodeindex);
	setSceneMode(scenemodeindex);
	setSleepTimer(sleeptimerindex);
	setBackLight(backlightindex);


	//被选中时，背景变为蓝色
	function isSelected(num) {
		$menu.children('li').removeClass('is-selected');
		$menu.children('li:eq(' + num + ')').addClass('is-selected');
	}
	//displaymodelist左右切换时显示不同项
	function setDisplayMode(num) {
		switch (num) {
			case 0:
				$displaymode.children('li:eq(1)').text(displaymodelist[num]);
				$displaymode.children('li:eq(0)').text(" ");
				$displaymode.children('li:eq(2)').text(displaymodelist[num + 1]);
				break;
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
				$displaymode.children('li:eq(1)').text(displaymodelist[num]);
				$displaymode.children('li:eq(0)').text(displaymodelist[num - 1]);
				$displaymode.children('li:eq(2)').text(displaymodelist[num + 1]);
				break;
			case 7:
				$displaymode.children('li:eq(1)').text(displaymodelist[num]);
				$displaymode.children('li:eq(0)').text(displaymodelist[num - 1]);
				$displaymode.children('li:eq(2)').text(" ");
				break;
			default:
				break;
		}
		//[set]此处需要num对应的mode传到底层
		PictureManager.setDisplayMode(num);
	}

	//scenemodelist左右切换时显示不同项
	function setSceneMode(num) {
		switch (num) {
			case 0:
				$scenemode.children('li:eq(1)').text(scenemodelist[num]);
				$scenemode.children('li:eq(0)').text(" ");
				$scenemode.children('li:eq(2)').text(scenemodelist[num + 1]);
				break;
			case 1:
			case 2:
			case 3:
				$scenemode.children('li:eq(1)').text(scenemodelist[num]);
				$scenemode.children('li:eq(0)').text(scenemodelist[num - 1]);
				$scenemode.children('li:eq(2)').text(scenemodelist[num + 1]);
				break;
			case 4:
				$scenemode.children('li:eq(1)').text(scenemodelist[num]);
				$scenemode.children('li:eq(0)').text(scenemodelist[num - 1]);
				$scenemode.children('li:eq(2)').text(" ");
				break;
			default:
				break;
		}
		//[set]此处需要num对应的mode传到底层
		JS_SceneTableManager.modifyCurrentSceneId(num,1);
	}

	//sleeptimerlist左右切换时显示不同项
	function setSleepTimer(num) {
		switch (num) {
			case 0:
				$sleeptimer.children('li:eq(1)').text(sleeptimerlist[num]);
				$sleeptimer.children('li:eq(0)').text(" ");
				$sleeptimer.children('li:eq(2)').text(sleeptimerlist[num + 1]);
				break;
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
				$sleeptimer.children('li:eq(1)').text(sleeptimerlist[num]);
				$sleeptimer.children('li:eq(0)').text(sleeptimerlist[num - 1]);
				$sleeptimer.children('li:eq(2)').text(sleeptimerlist[num + 1]);
				break;
			case 6:
				$sleeptimer.children('li:eq(1)').text(sleeptimerlist[num]);
				$sleeptimer.children('li:eq(0)').text(sleeptimerlist[num - 1]);
				$sleeptimer.children('li:eq(2)').text(" ");
				break;
			default:
				break;
		}
		//[set]此处需要num对应的mode传到底层
		JS_TimerManager.setSleepMode(num);
	}

	function setBackLight(num){
		$backlight.css("width",2*num +'px');
		$backlightnum.text(num);
		//设置到底层
		PictureManager.setbacklight(num);
	}

	//按键相应
	$(document).keydown(function(event) {
		codeKey = event.keyCode;

		if (codeKey === numKeyDown) {
			if (selectedRow === (menuLength - 1)) {
				selectedRow = 0;
			} else {
				selectedRow++;
			}
			isSelected(selectedRow);
		} else if (codeKey === numKeyUp) {
			if (selectedRow === 0) {
				selectedRow = menuLength - 1;
			} else {
				selectedRow--;
			}
			isSelected(selectedRow);
		}else if (codeKey === numKeyRight) {
			switch(selectedRow)
			{
				case 0:
					if(displaymodeindex >= 0 && displaymodeindex < displaymodelength-1 )
					{
						displaymodeindex++;
					}else if(displaymodeindex == (displaymodelength-1)){
						displaymodeindex = 0;
					}
					setDisplayMode(displaymodeindex);
					break;
				case 1:
					if(scenemodeindex >= 0 && scenemodeindex < scenemodelength-1)
					{
						scenemodeindex++;
					}else if(scenemodeindex == (scenemodelength -1)){
						scenemodeindex = 0;
					}
					setSceneMode(scenemodeindex);
					break;
				case 2:
					if(backlightindex >= 0 && backlightindex < 100)
					{
						backlightindex++;
					}
					setBackLight(backlightindex);
					break;
				case 3:
					if(sleeptimerindex >=0 && sleeptimerindex < sleeptimerlength-1)
					{
						sleeptimerindex++;
					}else if(sleeptimerindex == (sleeptimerlength - 1)){
						sleeptimerindex = 0;
					}
					setSleepTimer(sleeptimerindex);
					break;
			}
		}else if(codeKey === numKeyLeft){
			switch(selectedRow)
			{
				case 0:
					if(displaymodeindex > 0 && displaymodeindex < displaymodelength )
					{
						displaymodeindex--;
					}else if(displaymodeindex == 0){
						displaymodeindex = displaymodelength - 1;
					}
					setDisplayMode(displaymodeindex);
					break;
				case 1:
					if(scenemodeindex > 0 && scenemodeindex < scenemodelength)
					{
						scenemodeindex--;
					}else if(scenemodeindex == 0){
						scenemodeindex = scenemodelength - 1;
					}
					setSceneMode(scenemodeindex);					
					break;
				case 2:
					if(backlightindex > 0 && backlightindex <= 100)
					{
						backlightindex--;
					}
					setBackLight(backlightindex);				
					break;
				case 3:
					if(sleeptimerindex >0 && sleeptimerindex < sleeptimerlength)
					{
						sleeptimerindex--;
					}else if(sleeptimerindex == 0){
						sleeptimerindex = sleeptimerlength - 1;
					}
					setSleepTimer(sleeptimerindex);				
					break;
			}			
		}
	});

});