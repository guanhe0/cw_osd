$(function(){
	var curRow=0;
	var curCol=1;
	function setRowStyle(){
		$("#js_left li").removeClass("row-selected");
		$("#js_left>li:eq("+curRow+")").addClass("row-selected");
	}
	setRowStyle();

	function setColStyle(numRow){
		if(dateCurArr[numRow-1]===1)
			$("#js_left>li:eq("+numRow+") ul").children("li:eq(0)").html(" ");
		else $("#js_left>li:eq("+numRow+") ul").children("li:eq(0)").html(dateCurArr[numRow-1]-1);
		$("#js_left>li:eq("+numRow+") ul").children("li:eq(1)").html(dateCurArr[numRow-1]);
		if(dateCurArr[numRow-1]===dateMaxArr[numRow-1])
			$("#js_left>li:eq("+numRow+") ul").children("li:eq(2)").html(" ");
		else $("#js_left>li:eq("+numRow+") ul").children("li:eq(2)").html(dateCurArr[numRow-1]+1);
	}
	for(var i=0;i<$("#js_left>li").length;i++){
		$("#js_left>li:eq("+i+") ul").children("li:eq("+curCol+")").addClass("col-selected");
	}
	function setNumChange(state){
		if(state===0){
			if(dateCurArr[curRow-1]===dateMaxArr[curRow-1]) return false;
			dateCurArr[curRow-1]++;
			setColStyle(curRow);
		}
		if(state===1){
			if(dateCurArr[curRow-1]===1) return false;
			dateCurArr[curRow-1]--;
			setColStyle(curRow);
		}
	}
	var mydate=new Date();
	var curMonth=mydate.getMonth();
	var curDay=mydate.getDate();
	var curHour=mydate.getHours();
	var curMin=mydate.getMinutes();
	var dateMaxArr=[12,getLastMonthDay(mydate.getFullYear(),curMonth),24,60];
	var dateCurArr=[curMonth,curDay,curHour,curMin];
	//布局时间
	for(var i=1;i<$("#js_left>li").length;i++){
		setColStyle(i)
	}


	var channelList=['CH1','CH2','CH3'];
	var curChannel=0;
	function setChannelStyle(numChannel){
		if(numChannel===0)
			$("#js_left>li:eq(0) ul").children("li:eq(0)").html(" ");
		else $("#js_left>li:eq(0) ul").children("li:eq(0)").html(channelList[numChannel-1]);
		$("#js_left>li:eq(0) ul").children("li:eq(1)").html(channelList[numChannel]);
		if(numChannel===channelList.length-1)
			$("#js_left>li:eq(0) ul").children("li:eq(2)").html(" ");
		else $("#js_left>li:eq(0) ul").children("li:eq(2)").html(channelList[numChannel+1]);
	}
	setChannelStyle(curChannel);
	$(document).keydown(function(event){
		var keyCode = event.keyCode;
		if(keyCode === numKeyDown){
			if(curRow === ($("#js_left>li").length-1)) curRow=0;
			else curRow++;
			setRowStyle();
		}else if(keyCode === numKeyUp){
			if(curRow === 0) curRow=($("#js_left>li").length-1);
			else curRow--;
			setRowStyle();
		}
		else if(keyCode === numKeyRight){
			if(curRow===0){
				if(curChannel===channelList.length-1)  return false;
				curChannel++;
				setChannelStyle(curChannel);
			}
			else setNumChange(0);
		}else if(keyCode === numKeyLeft){
			if(curRow===0){
				if(curChannel===0)  return false;
				curChannel--;
				setChannelStyle(curChannel);
			}
			else setNumChange(1);
		}
	})
})