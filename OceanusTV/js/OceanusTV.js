/*******************
 *Copyright:Skyworth
 *Author:shibei
 *Data:2016-02-17
 *Description: It is js doucument of idleTv
 **********************/
var window_id = getUrlValue('window')?parseInt(getUrlValue('window')):0;
var t;
var s;
var numLength = 0;
/*
var xPos = 0;
var yPos =0;
var k;
*/

function handlePlatformEvent(event) {
	var $noSignal = $("#js_noSignal");
	var info = JSON.parse(event);
	if (info.cmd === "savermode") {
		if (info.value1 == 80) {
			$noSignal.css('visibility', 'visible');
		} else {
			$noSignal.css('visibility', 'hidden');
		}
	}
}
Oceanus.addPlatformEventListener(handlePlatformEvent,window_id);

function switchchannel(){
	var $number = $("#js_number");
	console.log("type ="+typeof($number.text()));
	if(SourceManager.getCurSource() == 11){
		ChannelManager.ChannelChange(parseInt($number.text()),1);
	}else if(SourceManager.getCurSource() == 1){
		ChannelManager.ChannelChange(parseInt($number.text()),0);
	}
	$number.text(" ");
	numLength = 0;
	numberMax = 4;
}

function timeOut() {
	switchchannel();
}

function timeOutClearChannelNumber(){
	var $number = $("#js_number");
	$number.text(" ");
}
/*
function nosingalmove(){
	var x,y;
	var $noSignal = $("#js_noSignal");
	xPos = (++xPos)%3;
	yPos = (++yPos)%3;
	if(xPos == 0){
		x = 0;
		y = 0;
	}else if(xPos == 1){
		x = 580;
		y = 300;
	}else if(xPos == 2){
		x = 1160;
		y = 600;
	}
	$noSignal.css('margin-left', x+'px');
	$noSignal.css('margin-top', y+'px');
}
*/
$(function() {
	var $number = $("#js_number");
	var $noSignal = $("#js_noSignal");
	var numberMax = 4;

	var numberKeysList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-"];

	$noSignal.css('visibility', 'visible');
	//k = setInterval('nosingalmove()', 2000);

	$(document).keydown(function(event) {
		var codeKey = event.keyCode;
		switch (codeKey) {
				case numKey.source:
				{	
					console.log("press source key");
					Oceanus.showWidget("Source",true);
					Oceanus.focuseWidget("Source",true);
					break;
				}
			case numKey.channelup:
			{
				clearTimeout(s);				
				ChannelManager.gotoformerchannel();
				$number.text(ChannelManager.getcurchannelnumber());
				s = setTimeout('timeOutClearChannelNumber()', 3000);
				break;
			}
			case numKey.channeldown:
			{
				clearTimeout(s);				
				ChannelManager.gotoNextChannel();
				$number.text(ChannelManager.getcurchannelnumber());
				s = setTimeout('timeOutClearChannelNumber()', 3000);
				break;
			}
			case numKey.zero:
			case numKey.one:
			case numKey.two:
			case numKey.three:
			case numKey.four:
			case numKey.five:
			case numKey.six:
			case numKey.seven:
			case numKey.eight:
			case numKey.nine:
			case numKey.hyphen:
				if (numLength < numberMax) {
					numLength++;
					clearTimeout(t);
					switch (codeKey) {
						case numKey.zero:
							$number.text($number.text() + numberKeysList[0]);
							break;
						case numKey.one:
							$number.text($number.text() + numberKeysList[1]);
							break;
						case numKey.two:
							$number.text($number.text() + numberKeysList[2]);
							break;
						case numKey.three:
							$number.text($number.text() + numberKeysList[3]);
							break;
						case numKey.four:
							$number.text($number.text() + numberKeysList[4]);
							break;
						case numKey.five:
							$number.text($number.text() + numberKeysList[5]);
							break;
						case numKey.six:
							$number.text($number.text() + numberKeysList[6]);
							break;
						case numKey.seven:
							$number.text($number.text() + numberKeysList[7]);
							break;
						case numKey.eight:
							$number.text($number.text() + numberKeysList[8]);
							break;
						case numKey.nine:
							$number.text($number.text() + numberKeysList[9]);
							break;
						case numKey.hyphen:
							$number.text($number.text() + numberKeysList[10]);
							numberMax = 5;
							break;
						default:
							break;
					}

					break;
				}
				break;
			case numKey.home:
				Oceanus.runApp("Home");
			break;
			case numKey.red:
				Oceanus.runApp("FileExplorer");
			break;
		}
		switch (codeKey) {
			case numKey.zero:
			case numKey.one:
			case numKey.two:
			case numKey.three:
			case numKey.four:
			case numKey.five:
			case numKey.six:
			case numKey.seven:
			case numKey.eight:
			case numKey.nine:
			case numKey.hyphen:
				if (numLength <= numberMax) {
					t = setTimeout('timeOut()', 3000);
				}
				break;
			case numKey.enter:
			{
				switchchannel();
				break;
			}
			default:
				break;
		}
	});
});