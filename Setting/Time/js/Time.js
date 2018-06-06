/*******************
 *Copyright:Skyworth
 *Author:shibei
 *Data:2016-02-22
 *Description: It is js doucument of setting,this js is mainly for time keydown
 **********************/
var curTimeInfo = -1;
$(function() {

	var TABUP = 1;
	var TABDOWN = 0;

	var curTimeEdit = 0;
	var curZoneEdit = 0;
	var curTimeAuto = 0;
	var curSleepTime = 0;

	var hourMin = 0;
	var hourMax = 23;
	var minuteMin = 0;
	var minuteMax = 59;
	var dateMin = 1;
	var dateMax = 30;
	var monthMin = 1;
	var monthMax = 12;
	var yearMin = 1970;
	var yearMax = 9999;
	var time = {};
	var cur = {};
	var daylightSavingFlag = true;
	


	var $timeInfo = $("#js_timeInfo");
	var $timeEdit = $("#js_timeEdit");
	var $timeAuto = $("#js_autoEdit");
	var $timeBox = $("#js_timeBox");
	var $timeShow = $("#js_timeShow");

	var $zoneBox = $("#js_zoneBox");
	var $zoneCountry = $("#js_country");
	var $zone = $("#js_zone");

	var $sleepTime = $("#js_sleepTime");

	var $hour = $("#js_hour");
	var $minute = $("#js_minute");
	var $date = $("#js_date");
	var $month = $("#js_month");
	var $year = $("#js_year");

	var keyDownState = "timeMenu";
	var timeInfoLength = $timeInfo.children('li').length;


	for (var i = 0; i < timeStr.timeInfoList.length; i++) {
		$(".liTitle").eq(i).children('div:eq(0)').text(timeStr.timeInfoList[i]);
	}
	for (var i = 0; i < timeStr.editTitleList.length; i++) {
		$(".clock").not('.symbol').eq(i).children('div:eq(0)').text(timeStr.editTitleList[i]);
	}
	for (var i = 0; i < timeStr.sleepTimeList.length; i++) {
		$sleepTime.children('li').eq(i).append(timeStr.sleepTimeList[i]);
	}
	$(".clock").css('opacity', '0.5');
	$(".title").text(timeStr.timeSetting);


	clockTabInitial();
	getDaylightSavingFlag();
	dayEnergyStateChange();
	getSleepTimeSate();
	getCountryZoneIndex();



	function getCountryZoneIndex() {
		cur.country = CommonManager.getCountry(); //[get]
		//console.log("country = "+cur.country);
		cur.zone = 0; //[get]
		$("#js_zoneShow").text(countryZoneList[cur.country][cur.zone]);
	}

	function setZone() {
		//[set]
		//把cur.zone对应的时区传下去
	}





	function handlePlatformEvent(event) {
	
		var info = JSON.parse(event);
		//console.log("info.cmd = "+info.cmd+"info.value ="+info.value);
		if (info.cmd === "autosynctime") {
			if(info.value === 10)
			{
				//每分钟同步一次时间
				clockTabInitial();
			}

		}
	}
	opera_omi.addPlatformEventListener(handlePlatformEvent);


	function getSleepTimeSate() {
		curSleepTime = JS_TimerManager.getSleepMode(); //[get]
		$("#js_sleepTimeShow").text(timeStr.sleepTimeList[curSleepTime]);
	}

	function setSleepTime() {
		//set[];
		//curSleepTime = 1;
		//console.log("curSleepTime = "+curSleepTime);
		JS_TimerManager.enterToSleepState(curSleepTime);
		//JS_TimerManager.setSleepMode(curSleepTime);
	}

	function getDaylightSavingFlag() {
		daylightSavingFlag = JS_TimerManager.getDaylightSavingState(); //[get]
		if (daylightSavingFlag) {
			$("#js_daylight").text(timeStr.ON_OFF[1]);
		} else {
			$("#js_daylight").text(timeStr.ON_OFF[0]);
		}
		return daylightSavingFlag;
	}



	function daylightStateChange(flag) {
		if (flag) {
			$("#js_daylight").text(timeStr.ON_OFF[1]);
			flag = true;
			//[set]the daylight saving will be ON
		} else {
			$("#js_daylight").text(timeStr.ON_OFF[0]);
			flag = false;
			//[set]the daylight saving will be OFF
		}
		JS_TimerManager.setDaylightSavingState(flag);
	}

	function getEnergySavingFlag() {
		var flag = false; //[get]
		if (flag) {
			$("#js_energy").text(timeStr.ON_OFF[1]);
		} else {
			$("#js_energy").text(timeStr.ON_OFF[0])
		}
		return flag;
	}



	function dayEnergyStateChange(flag) {
		if (flag) {
			$("#js_energy").text(timeStr.ON_OFF[0]);
			flag = false;
			//[set]the energy saving will be OFF
		} else {
			$("#js_energy").text(timeStr.ON_OFF[1]);
			flag = true;
			//[set]the energy saving will be ON
		}
	}


	function getAutoSyncState() {
		var autosyncstate = JS_TimerManager.getAutoSyncState();
		//console.log("autosyncstate = "+autosyncstate);
		if(autosyncstate)
		{
			curTimeAuto = 0;
		}else{
			curTimeAuto = 1;
		}		
	}

	function getTime() {
		var currenttime = JS_TimerManager.getCurrentTvTime();
		var currenttimeJSON = JSON.parse(currenttime);
		time.year = currenttimeJSON.year; //[get]
		time.month = currenttimeJSON.month; //[get]
		time.date = currenttimeJSON.monthDay; //[get]
		time.hour = currenttimeJSON.hour; //[get]
		time.minute = currenttimeJSON.minute; //[get]
		getAutoSyncState();
		editTabInitial($timeAuto, timeStr.timeAutoList, curTimeAuto);
		isEditable($(".clock"),curTimeAuto);
		dateMax = new Date(time.year, time.month, 0).getDate();
	}

	function setTime() {
		//[set]
		var vtime = time.year + ":" + time.month + ":" + time.date + ":" + time.hour + ":"+time.minute + ":0";
		JS_TimerManager.setAutoSync(false);
		JS_TimerManager.disableAutoClock();
		JS_TimerManager.setClkTime(vtime);
	}

	function autoTime() {
		//自动获取时间，改变对象time的各个值，然后使用showTextRefresh()刷新显示的时间
		JS_TimerManager.setAutoSync(true);
		JS_TimerManager.enableAutoClock();
		clockTabInitial();
	}

	function getTimeStr() {
		var weekday = timeStr.weekDaysList[new Date(time.year, time.month - 1, time.date).getDay()];
		return time.hour + " : " + time.minute + " " + time.date + "-" + time.month + "-" + time.year + " " + weekday;
	}


	function showTextRefresh($show, infoStr) {
		$show.text(infoStr);
	}

	function dateShowRefresh() {
		dateMax = new Date(time.year, time.month, 0).getDate();
		for (var i = -2; i < 3; i++) {
			if ((+time.date + i) < dateMin) {
				$date.children('li').eq(2 + i).text(+time.date + i + dateMax);
			} else if ((+time.date + i) > dateMax) {
				$date.children('li').eq(2 + i).text(+time.date + i - dateMax);
			} else {
				$date.children('li').eq(2 + i).text(+time.date + i);
			}

		}
	}

	function clockTabInitial() {
		getTime();
		for (var i = -2; i < 3; i++) {

			if ((+time.hour + i) < hourMin) {
				$hour.children('li').eq(2 + i).text(+time.hour + i + 24);
			} else if ((+time.hour > hourMax)) {
				$hour.children('li').eq(2 + i).text(+time.hour + i - 24);
			} else {
				$hour.children('li').eq(2 + i).text(+time.hour + i);
			}

			if ((+time.minute + i) < minuteMin) {
				$minute.children('li').eq(2 + i).text(+time.minute + i + 60);
			} else if ((+time.minute + i) > minuteMax) {
				$minute.children('li').eq(2 + i).text(+time.minute + i - 60);
			} else {
				$minute.children('li').eq(2 + i).text(+time.minute + i);
			}

			if ((+time.date + i) < dateMin) {
				$date.children('li').eq(2 + i).text(+time.date + i + dateMax);
			} else if ((+time.date + i) > dateMax) {
				$date.children('li').eq(2 + i).text(+time.date + i - dateMax);
			} else {
				$date.children('li').eq(2 + i).text(+time.date + i);
			}

			if ((+time.month + i) < monthMin) {
				$month.children('li').eq(2 + i).text(+time.month + i + monthMax);
			} else if ((+time.month + i) > monthMax) {
				$month.children('li').eq(2 + i).text(+time.month + i - monthMax);
			} else {
				$month.children('li').eq(2 + i).text(+time.month + i);
			}
			if ((+time.year + i) < yearMin) {
				$year.children('li').eq(2 + i).text(+time.year + i + monthMax);
			} else if ((+time.year + i) > yearMax) {
				$year.children('li').eq(2 + i).text(+time.year + i - monthMax);
			} else {
				$year.children('li').eq(2 + i).text(+time.year + i);
			}
		}
		showTextRefresh($timeShow, getTimeStr());
	}

	function timeTabSwitch($tab, min, max, direction, key) {
		if (!direction) {
			$tab.children('li').eq(0).hide(300, function() {
				$(this).remove();
				var nowNum = $tab.children('li').eq(3).text();
				if (nowNum < max) {
					var addText = +nowNum + 1;
				} else {
					var addText = min;
				}
				$tab.append('<li>' + addText + '</li>');
				time[key] = $tab.children('li').eq(2).text();
				if (key === "month" || key === "year") {
					dateShowRefresh();
				}
			});

		} else {
			var nowNum = $tab.children('li').eq(0).text();
			if (nowNum > min) {
				var addText = nowNum - 1;
			} else {
				var addText = max;
			}
			$tab.prepend('<li style="display: none">' + addText + '</li>');
			$tab.children('li').eq(0).show(300, function() {
				$tab.children('li').eq(5).remove();
				time[key] = $tab.children('li').eq(2).text();
				if (key === "month" || key === "year") {
					dateShowRefresh();
				}

			});
		}
	}

	function editTabInitial($tab, tabList, curNum) {
		for (var i = 0; i <= 4; i++) {
			$tab.children('li').eq(i).empty();
		}
		for (var i = -2; i <= 2; i++) {
			var showText;
			if ((curNum + i) >= 0 && (curNum + i) <= tabList.length) {
				showText = tabList[curNum + i];
				$tab.children('li').eq(2 + i).text(showText);
			}
		}
	}

	function isSelected(num) {
		$timeInfo.children('li.is-selected-color').removeClass('is-selected-color');
		if (num >= 0 && num < timeInfoLength) {
			$timeInfo.children('li:eq(' + num + ')').addClass('is-selected-color');
		}
	}

	function setTabSwitch(num, $tab, tabList, str) {
		var upMin = 1;
		if (tabList.length <= 3) {
			upMin = 0;

		}
		if (!num) {
			var nowIndex = $.inArray($tab.children('li').eq(2).text(), tabList);

			if (nowIndex < (tabList.length - 1)) {
				$tab.children('li').eq(0).hide(300, function() {
					$(this).remove();
					if (nowIndex < (tabList.length - 3)) {
						var addText = tabList[nowIndex + 3];
					} else {
						var addText = " ";
					}
					$tab.append('<li>' + addText + '</li>');
					if (str === "zone") {
						cur.zone++;
					}

				});
			}

		} else {
			var nowIndex = $.inArray($tab.children('li').eq(2).text(), tabList);
			if (nowIndex > 0) {
				if (nowIndex > 2) {
					var addText = tabList[nowIndex - 3];
				} else {
					var addText = " ";
				}
				$tab.prepend('<li style="display: none">' + addText + '</li>');
				$tab.children('li').eq(0).show(300, function() {
					$tab.children('li').eq(5).remove();
					if (str === "zone") {
						cur.zone--;
					}
				});
			}
		}
	}

	function tabSelected($box, num, width) {
		var left = 0;
		switch (num) {
			case 0:
				left = 0;
				$box.css('left', left + 'px').removeClass('width-' + width);
				break;
			case 1:
				left = 245;
				$box.css('left', left + 'px').addClass('width-' + width);
				break;
			case 2:
				left = 425;
				$box.css('left', left + 'px').addClass('width-' + width);
				break;
			case 3:
				left = 595;
				$box.css('left', left + 'px').addClass('width-' + width);
				break;
			case 4:
				left = 775;
				$box.css('left', left + 'px').addClass('width-' + width);
				break;
			case 5:
				left = 955;
				$box.css('left', left + 'px').addClass('width-' + width);
				break;
			default:
				break;
		}
	}


	function tabSelectedBox($box, num) {
		if (num) {
			$box.css('display', 'block');
		} else {
			$box.css('display', 'none');
		}
	}

	function timeEditBack() {
		keyDownState = "timeMenu";
		curTimeEdit = 0;
		getAutoSyncState();
		editBoxShow(false, 350, $timeBox, 0);
		editTabInitial($timeAuto, timeStr.timeAutoList, curTimeAuto);
		$(".clock").css('opacity', '0.5');
		showTextRefresh($timeShow, getTimeStr());
	}


	//from timeEdit menu back to timeMenu
	function backToMenuBar() {
		JSFlags.time = false;
		JSFlags.menuBar = true;
		curTimeInfo = -1
		$timeInfo.children('li.is-selected-color').removeClass('is-selected-color');
		$("#js_menuBar").children('li:eq(' + curMenuBar + ')').addClass('is-selected-bg');
		$("#js_menuBar").children('li').eq(curMenuBar).children('span').addClass('color-blue');
	}

	//flag:[if show the eidt div]
	//height:[the edit div height]
	//$tab:[this element will show which tab is selected]
	//num:which tab will default be selected
	function editBoxShow(flag, height, $tab, num, boxWidth) {
		if (flag) {
			if (num >= 0) {
				tabSelected($tab, num, boxWidth);
			}
			if ($tab) {
				tabSelectedBox($tab, 1);

			}
			$(".timeEdit").eq(curTimeInfo).addClass('edit-show-' + height);
			isSelected(-1);
		} else {
			$(".timeEdit").eq(curTimeInfo).removeClass('edit-show-' + height);
			isSelected(curTimeInfo);
			if ($tab) {
				tabSelectedBox($tab, 0);

			}
		}
	}

	function isEditable($tab, cur) {
		if (!cur) {
			$tab.css('opacity', '0.5');
		} else {
			$tab.css('opacity', '1');
		}
	}

	//initial the country and relevant cities in different zone
	function initialCountryZone() {
		getCountryZoneIndex();
		$zoneCountry.children('li').eq(2).text(countryNameList[cur.country]);
		editTabInitial($zone, countryZoneList[cur.country], cur.zone);
	}

	//in the sleep time module,when one of block is selected
	function sleepTimeIsSelected(num, flag) {
		$sleepTime.children('li.sleep-time-select-only').removeClass('sleep-time-select-only');
		if (flag) {
			$sleepTime.children('li.sleep-time-select').removeClass('sleep-time-select');
			if (num >= 0) {
				$sleepTime.children('li').eq(num).addClass('sleep-time-select sleep-time-select-only');
			}
		} else {
			if (num >= 0) {
				$sleepTime.children('li').eq(num).addClass('sleep-time-select-only');
			}
		}


	}

	function sleepTimeEditBack() {
		keyDownState = "timeMenu";
		editBoxShow(false, 200, null, -1, 100);
		$("#js_sleepTimeShow").text(timeStr.sleepTimeList[curSleepTime]);
		setSleepTime();
	}

	var timeDelayFunc = {};
	timeDelayFunc.sleepTimeEditBack = function() {
		return sleepTimeEditBack
	}
	window.timeDelayFunc = timeDelayFunc;

	function zoneEditBack() {
		keyDownState = "timeMenu";
		editBoxShow(false, 240, $zoneBox, -1, 100);
		$("#js_zoneShow").text(countryZoneList[cur.country][cur.zone]);
	}


	$(document).keydown(function(event) {
		var codeKey = event.keyCode;
		if (JSFlags.time) {
			if (keyDownState === "timeMenu") {
				switch (codeKey) {
					case numKey.enter:
						if (curTimeInfo === -1) {
							curTimeInfo++;
							isSelected(curTimeInfo);
						} else if (curTimeInfo === 0) {
							getTime();
							editBoxShow(true, 350, $timeBox, 0, 100);
							keyDownState = "timeEdit";
						} else if (curTimeInfo === 1) {
							editBoxShow(true, 240, $zoneBox, 1, 200);
							initialCountryZone();
							$zoneBox.css('left', '250px');
							keyDownState = "zoneEdit";
						} else if (curTimeInfo === 2) {
							editBoxShow(true, 200, null, -1, 100)
							keyDownState = "sleepTimeEdit";
							getSleepTimeSate();
							sleepTimeIsSelected(curSleepTime, true);
						} else if (curTimeInfo === 3) {
							daylightSavingFlag = !daylightSavingFlag;
							daylightStateChange(daylightSavingFlag);
						} else if (curTimeInfo === 5) {
							dayEnergyStateChange(getEnergySavingFlag());
						}
						break;
					case numKey.right:
						if (curTimeInfo === -1) {
							curTimeInfo++;
							isSelected(curTimeInfo);
						}
						break;
					case numKey.left:
					case numKey.back:
						backToMenuBar();
						$("#js_menuBar").removeClass('bar-hide');
						break;
					case numKey.down:
						if (curTimeInfo < (timeInfoLength - 1)) {
							curTimeInfo++;
							isSelected(curTimeInfo);
						}
						break;
					case numKey.up:
						if (curTimeInfo > 0) {
							curTimeInfo--;
							isSelected(curTimeInfo);
						}
						break;
					default:
						break;
				}
			} else if (keyDownState === "timeEdit") {
				switch (codeKey) {
					case numKey.enter:
						if ($timeAuto.children('li').eq(2).text() === "Auto") {
							autoTime();
						} else if ($timeAuto.children('li').eq(2).text() === "Manual") {
							setTime();
						}
						timeEditBack();
						break;
					case numKey.back:
						if ($timeAuto.children('li').eq(2).text() === "Manual") {
							setTime();
						}
						timeEditBack();
						break;
					case numKey.right:
						if (curTimeEdit < 5 && ($timeAuto.children('li').eq(2).text() === "Manual")) {
							curTimeEdit++;
							tabSelected($timeBox, curTimeEdit, 100);
						}
						break;
					case numKey.left:
						if (curTimeEdit > 0) {
							curTimeEdit--;
							tabSelected($timeBox, curTimeEdit, 100);
						}
						break;
					case numKey.up:
						if (curTimeEdit === 0) {
							if (curTimeAuto > 0) {
								curTimeAuto--;
								isEditable($(".clock"), curTimeAuto);
							}
							setTabSwitch(TABUP, $timeAuto, timeStr.timeAutoList, null);
						} else if (curTimeEdit === 1) {
							timeTabSwitch($("#js_hour"), hourMin, hourMax, TABUP, "hour");
						} else if (curTimeEdit === 2) {
							timeTabSwitch($("#js_minute"), minuteMin, minuteMax, TABUP, "minute");
						} else if (curTimeEdit === 3) {
							timeTabSwitch($("#js_date"), dateMin, dateMax, TABUP, "date");
						} else if (curTimeEdit === 4) {
							timeTabSwitch($("#js_month"), monthMin, monthMax, TABUP, "month");
						} else if (curTimeEdit === 5) {
							timeTabSwitch($("#js_year"), yearMin, yearMax, TABUP, "year");
						}

						break;
					case numKey.down:
						if (curTimeEdit === 0) {
							if (curTimeAuto < 1) {
								curTimeAuto++;
								isEditable($(".clock"), curTimeAuto);
							}
							setTabSwitch(TABDOWN, $timeAuto, timeStr.timeAutoList);
						} else if (curTimeEdit === 1) {
							timeTabSwitch($("#js_hour"), hourMin, hourMax, TABDOWN, "hour");
						} else if (curTimeEdit === 2) {
							timeTabSwitch($("#js_minute"), minuteMin, minuteMax, TABDOWN, "minute");
						} else if (curTimeEdit === 3) {
							timeTabSwitch($("#js_date"), dateMin, dateMax, TABDOWN, "date");
						} else if (curTimeEdit === 4) {
							timeTabSwitch($("#js_month"), monthMin, monthMax, TABDOWN, "month");
						} else if (curTimeEdit === 5) {
							timeTabSwitch($("#js_year"), yearMin, yearMax, TABDOWN, "year");
						}
						break;
					default:
						break;
				}

			} else if (keyDownState === "zoneEdit") {
				switch (codeKey) {
					case numKey.up:
						if (cur.zone > 0) {
							setTabSwitch(TABUP, $zone, countryZoneList[cur.country], "zone");
						}
						break;
					case numKey.down:
						if (cur.zone < (countryZoneList[cur.country].length - 1)) {
							setTabSwitch(TABDOWN, $zone, countryZoneList[cur.country], "zone");
						}
						break;
					case numKey.enter:
					case numKey.back:
						zoneEditBack();
						setZone();
						break;
					default:
						break;
				}
			} else if (keyDownState === "sleepTimeEdit") {
				switch (codeKey) {
					case numKey.right:
						if (curSleepTime < (timeStr.sleepTimeList.length - 1)) {
							curSleepTime++;
							sleepTimeIsSelected(curSleepTime, false);
						}
						break;
					case numKey.left:
						if (curSleepTime > 0) {
							curSleepTime--;
							sleepTimeIsSelected(curSleepTime, false);
						}
						break;
					case numKey.enter:
					case numKey.back:
						sleepTimeIsSelected(curSleepTime, true);
						setTimeout(window.timeDelayFunc.sleepTimeEditBack(), 200);
						break;
					default:
						break;
				}
			}

		}

	});
});