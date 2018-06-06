// JavaScript Document
loadLanguageFile("channelList.js");
$(function(){
	var $testDiv=$("#js_testDiv");
	//一列显示多少数据
	var numShowList = 8;
	
	//var channelInfo='{index:0,majorChannelNum:-1,minorChannelNum:-1,channelName:"CH1",isHD:"SD",isFav:1,isSkip:1,isLock:1}';
	//var channelInfo=eval('('+channelInfo+')');
	var channelInfo=eval('('+ChannelManager.getCurChannelInfo()+')');
	$testDiv.append("channelInfo:"+channelInfo.index);
	//获取当前的频道值
	var currentChannel =channelInfo.index;
	$testDiv.append("currentIndex:"+currentChannel);
	var currentChannelLi =0;
	//var currentChannel=ChannelManager.getCurrentChannel();
	//频道列表
	/*var channelList = [
		"CH1 SVT1",
		"CH2 SVT2",
		"CH3 SVT3",
		"CH4 SVT3",
		"CH5 SVT3",
		"CH6 SVT3",
		"CH7 SVT3",
	];*/
	//var channelList=[channelInfo,channelInfo,channelInfo,channelInfo,channelInfo,channelInfo,channelInfo,channelInfo];
	
	var channelList=eval('('+ChannelManager.getChannelList(currentChannel,numShowList)+')');
	
	$testDiv.append("channelList:"+channelList[0]["channelName"]);
	//节目列表
	var programList = [];
	var programInfo = "";

	var htmlChannelList = $("#js_channellist");
	var currentProgram =0;
	var currentDate = 0;
	var currentInfo = 1;
	//设置当前选中的频道列
	var currentChannelLi;
	//设置当前选中的节目列
	var currentProgramLi;
	//插入频道函数
	function insertChannelList(){
		for(var i=0;i<numShowList;i++){
			if(channelList[i] == null) return false;
			htmlChannelList.append("<li>"+channelList[i]['channelName']+"</li>");
		}
		changeChannelStyle()
	}
	//插入频道
	insertChannelList(0);
	//改变被选中的频道的样式函数
	function changeChannelStyle(){
		$("#js_channellist li").removeClass("channel-selected");
		$("#js_channellist li").removeClass("channel-current");
		$("#js_channellist li:eq("+currentChannelLi+")").addClass("channel-selected")
	}
	//设置频道列表默认的样式
	//获取时间并显示
	var mydate = new Date();
	var dateList = [];
	var lastDay = getLastMonthDay(mydate.getFullYear(),mydate.getMonth());
	for(var i=0;i<7;i++){

		var numDay = mydate.getDate()+i;
		if(numDay > lastDay){
			numDay = numDay - lastDay;
		}
		var numWeek = mydate.getDay()+i;
		if(numWeek > 6){
			numWeek = numWeek - 7;
		}
		$("#js_datelist").append("<li>"+numDay+"<br />"+weeks[numWeek]+"</li>");
	}
	
	//设置当前的行和列
	var curCol = 0;
	var curRow = 0; 
	//键盘响应事件
	$(document).keydown(function(event){
		var codeKey = event.keyCode;
		if(codeKey === numKeyDown){
			switch(curCol){
				case 0:
					channelUpDown(0);
					break;
				case 1:
					programUpDown(0);
					break;
				case 2:
					infoUpDown(0);
					break;
			}
		}
		else if(codeKey === numKeyUp){
			switch(curCol){
				case 0:
					channelUpDown(1);
					break;
				case 1:
					programUpDown(1);
					break;
				case 2:
					infoUpDown(1);
					break;
			}
		}
		else if(codeKey === numKeyRight){
			switch(curCol){
				case 0:
					showProgramList();
					break;
				case 1:
					showInfoList();
					break;
			}
		}else if(codeKey===numKeyLeft){
			switch(curCol){
				case 0:
					break;
				case 1:
					hideProgramList();
					break;
				case 2:
					hideInfoList();
				}
		}else if(codeKey === numKeyEnter){
			switch(curCol){
				case 0:
					if($(".top-back").css("display")=="block"){
						alert("这里是返回的事件");
					}
					break;
				case 1:
					break;
				case 2:
					location.href=$(".info-selected").data("url");
				}
		}
	});
	//频道上下选择函数
	function channelUpDown(keyEvent){
		currentProgram=0;
		currentDate=0;
		currentInfo=1;
		if(keyEvent === 0){
			//重新覆盖channelList
			channelList=ChannelManager.getChannelList(currentChannel,numShowList);
			if(currentChannelLi === numShowList-1){
				currentChannelLi=0;
				$("#js_channellist li").remove();
				insertChannelList();
			}
			else{
				currentChannelLi++;
				changeChannelStyle();
			}
		}else if(keyEvent===1){
			channelList=ChannelManager.getChannelList(currentChannel,-numShowList);
			if(currentChannelLi ===0){
				currentChannelLi=numShowList-1;
				$("#js_channellist li").remove();
				insertChannelList();
			}
			else{
				currentChannelLi--;
				changeChannelStyle();
			}
		}
		currentChannel=channelList[currentChannelLi]['index'];
	}
	function layoutProgramList(keyEvent){
		if(keyEvent===0){
			for(var i =currentProgram;i<currentProgram+numShowList;i++){
				if(programList[i]==null) return false;
				$("#js_programlist").append("<li>"+programList[i]+"</li>")
			}
		}else  if(keyEvent===1){
			for(var i =currentProgram-1;i>currentProgram-numShowList;i--){
				if(programList[i]==null) return false;
				$("#js_programlist").prepend("<li>"+programList[i]+"</li>")
			}
		}
	}
 	//在第一列上右键处理事件
	function showProgramList(){
		curCol++;
		programList = [
			"14:30 - 15:30   hahaha",
			"15:30 - 16:30   nope",
			"16:30 - 17:30   yeah",
		];//获取节目列表
		//programList=EPGManager.getProgramList(currentChannel);
		$(".list-date").fadeIn(300,function(){
			$(".list-prog").fadeIn(300);
		});
		//布局节目列表
		layoutProgramList(0);
		$(".channel-selected").addClass("channel-current");
		$(".channel-selected").removeClass("channel-selected");
		setCurrentDateAndProgramStyle();
	}
	//设置当前日期和节目的样式
	function setCurrentDateAndProgramStyle(){
		currentProgramLi = currentProgram%numShowList;
		$("#js_datelist li").removeClass("date-selected");
		$("#js_datelist li:eq("+currentDate+")").addClass("date-selected");
		$("#js_programlist li").removeClass("channel-selected");
		$("#js_programlist li:eq("+currentProgramLi+")").addClass("channel-selected");
	}

	//节目键盘上下事件
	function programUpDown(keyEvent){
		currentInfo=1;
		if(keyEvent===0){
			if(currentProgram === programList.length-1) {
				if(currentDate===6)return false;
				currentDate++;
				currentProgram=0
			}
			else{
				currentProgram++;
			}
			if(currentProgram%numShowList === 0){
				$("#js_programlist li").remove();
				layoutProgramList(0);
			} 
			setCurrentDateAndProgramStyle(); 
		}else if(keyEvent===1){
			if(currentProgram === 0){
				if(currentDate==0) return false;
				currentDate--;
				currentProgram=0;
			}else{
				currentProgram--;
			}
			if((currentProgram+1)%numShowList===0){
				layoutProgramList(1);
			}
			setCurrentDateAndProgramStyle();
		}
	}	

	//隐藏频道列表
	function hideProgramList(){
		$(".list-prog").fadeOut(300,function(){
			$("#js_programlist").html("");
			$(".list-date").fadeOut(300);
		});
		curCol=0;
		changeChannelStyle();
	}

	//显示频道信息
	function showInfoList(){
		programInfo ="fdsafaf";
		$(".list,.list-date").hide(300,function(){
			$(".list-info").fadeIn(300);
			$("#js_infolist li:first").html(programInfo);
		});
		curCol=2;
		setCurrentInfoStyle();
	}

	//隐藏频道信息
	function hideInfoList(){
		$(".list,.list-date").show(300,function(){
			$(".list-info").hide();
		});
		curCol=1;
	}
	function setCurrentInfoStyle(){
		$("#js_infolist li").removeClass("info-selected");
		$("#js_infolist li:eq("+currentInfo+")").addClass("info-selected");
	}
	//频道信息列表上下事件
	function infoUpDown(keyEvent){
		if(keyEvent===0){
			if(currentInfo === 3)  return false;
			currentInfo++;
		}else if(keyEvent===1){
			if(currentInfo === 1)  return false;
			currentInfo--;
		}
			setCurrentInfoStyle();
	}
});