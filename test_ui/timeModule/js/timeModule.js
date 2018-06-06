/*******************
 *Copyright:Skyworth
 *Author:shibei
 *Data:2016-1-14
 *Description: It is js doucument of time module
 **********************/
$(function() {

	//注释中[set]开头的表示需要把当前的值传到底层
	//注释中[get]开头的表示需要从底层取信息

	var timeList = [
		"OFF",
		"10 min",
		"20 min",
		"30 min",
		"60 min",
		"90 min",
		"120 min",
		"180 min",
		"240 min"
	];

	var monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	//睡眠时间选项长度
	var timeListLength = timeList.length;


	//[get]get到当前sync开关状态，0代表关，1代表开
	var syncFlag = JS_TimerManager.getAutoSyncState();
	var $syncText = $("#js_syncText");
	var $sync = $("#js_sync");
	var $syncColor = $("#js_syncColor");

	var $show = $("#js_sleepTime");
	var $content = $("#js_content");

	//Clock中字体和时间元素对象
	var $tvTime = $("#js_tvTime");
	var $clock = $("#js_clock")

	//Time Zone中相关对象
	var $zoneTitle = $("#js_zoneTitle");
	var $zoneBtn = $("#js_zoneBtn");


	//省电模式开关相关对象的获取
	var flag = JS_TimerManager.getDaylightSavingState();
	var $saveText = $("#js_saveText");
	var $save = $("#js_save");
	var $saveColor = $("#js_saveColor");

	//auto sleep
	var autoSleepFlag = JS_TimerManager.getAutoSleepState();
	var $autoSleepText = $("#js_autoSleepText");
	var $autoSleep = $("#js_autoSleep");
	var $autoSleepColor = $("#js_autoSleepColor");


	var menuLength = $content.children('li').length;


	//[get]tvTime需要从底层读到当前tv的时间，然后显示
	var year = 2016;
	var month = 0;
	var date = 21;
	var hour = 12;
	var minute = 12;
	var tvTime = year + " " + monthList[month] + " " + date + " " + hour + ":" + minute;

	//[get]已经设置的睡眠时间，0-8分别和数组timeList对应,需要get
	var timeSelected = JS_TimerManager.getSleepMode();
	//给选中的行，默认为第一行
	var selected = 0;

	//显示获得得系统时间
	$tvTime.text(tvTime);
	//初始化页面显示
	setSync(syncFlag);
	setSelected(selected);
	setSleepTime(timeSelected);
	setSave(flag);
	setClockDisable(syncFlag);
	setZoneDisable(syncFlag);
	setAutoSleep(autoSleepFlag);

	//auto sync开关显示
	function setSync(num) {
		if (num === false) {
			$syncText.removeClass('on-off-text').text("OFF");
			$sync.removeClass('on-off-btn');
			$syncColor.removeClass('on-off-color');
			//[set]此处关闭了省电模式
			JS_TimerManager.setAutoSync(num);
		} else if (num === true) {
			$syncText.addClass('on-off-text').text("ON");
			$sync.addClass('on-off-btn');
			$syncColor.addClass('on-off-color');
			//[set]此处关闭了省电模式
			JS_TimerManager.setAutoSync(num);
		}
	}

	//当auto sync开启的时候，Clock不可编辑
	function setClockDisable(num) {
		if (num === 1) {
			$tvTime.addClass('is-disabled');
			$clock.addClass('is-disabled');
		} else {
			$tvTime.removeClass('is-disabled');
			$clock.removeClass('is-disabled');
		}

	}

	//当auto sync开启的时候，time zone才可编辑
	function setZoneDisable(num) {
		if (num === 0) {
			$zoneTitle.addClass('is-disabled');
			$zoneBtn.addClass('is-disabled');
		} else {
			$zoneTitle.removeClass('is-disabled');
			$zoneBtn.removeClass('is-disabled');
		}
	}
	//设置省电模式开关显示
	function setSave(num) {
		if (num === false) {
			$saveText.removeClass('on-off-text').text("OFF");
			$save.removeClass('on-off-btn');
			$saveColor.removeClass('on-off-color');
			//[set]此处关闭了省电模式
			JS_TimerManager.setAutoSleepTimerEnable(false);
		} else if (num === true) {
			$saveText.addClass('on-off-text').text("ON");
			$save.addClass('on-off-btn');
			$saveColor.addClass('on-off-color');
			//[set]此处关闭了省电模式
			JS_TimerManager.setAutoSleepTimerEnable(true);
		}
	}

	//当被选中时，背景为蓝色
	function setSelected(num) {
		$content.children('li').removeClass('selected');
		$content.children('li:eq(' + num + ')').addClass('selected');
	}

	//设置睡眠时间
	function setSleepTime(num) {
		if (num === 0) {
			$show.children('li:eq(0)').text(" ");
			$show.children('li:eq(1)').text(timeList[num]);
			$show.children('li:eq(2)').text(timeList[num + 1]);
		} else if (num === (timeListLength - 1)) {
			$show.children('li:eq(0)').text(timeList[num - 1]);
			$show.children('li:eq(1)').text(timeList[num]);
			$show.children('li:eq(2)').text("");
		} else {
			$show.children('li:eq(0)').text(timeList[num - 1]);
			$show.children('li:eq(1)').text(timeList[num]);
			$show.children('li:eq(2)').text(timeList[num + 1]);
		}
		//[set] 需要像底层设置，把num对应的睡眠时间设置
		JS_TimerManager.setSleepMode(num);
	}


	//设置auto sleep模式开关显示
	function setAutoSleep(num) {
		if (num === false) {
			$autoSleepText.removeClass('on-off-text').text("OFF");
			$autoSleep.removeClass('on-off-btn');
			$autoSleepColor.removeClass('on-off-color');
			//[set]此处关闭了auto sleep模式
			JS_TimerManager.setAutoSleepTimerEnable(false);
		} else if (num === true) {
			$autoSleepText.addClass('on-off-text').text("ON");
			$autoSleep.addClass('on-off-btn');
			$autoSleepColor.addClass('on-off-color');
			//[set]此处关闭了auto sleep模式
			JS_TimerManager.setAutoSleepTimerEnable(true);
		}
	}



	$(document).keydown(function(event) {
		var codeKey = event.keyCode;
		if (codeKey === numKey.down) {
			if (selected === (menuLength - 1)) {
				selected = 0;
			} else {
				selected++;
			}
			if (selected === 1) {
				if (syncFlag === true) {
					selected++;
				}
			} else if (selected === 2) {
				if (syncFlag === false) {
					selected++;
				}
			}
			setClockDisable(syncFlag);
			setZoneDisable(syncFlag);
			setSelected(selected);
		} else if (codeKey === numKey.up) {
			if (selected === 0) {
				selected = menuLength - 1;
			} else {
				selected--;
			}
			if (selected === 1) {
				if (syncFlag === true) {
					selected--;
				}
			} else if (selected === 2) {
				if (syncFlag === false) {
					selected--;
				}
			}
			setClockDisable(syncFlag);
			setZoneDisable(syncFlag);
			setSelected(selected);
		} else if (codeKey === numKey.right) {
			switch (selected) {
				case 0:
					if (syncFlag === false) {
						setSync(true);
						syncFlag = true;
						setClockDisable(syncFlag);
						setZoneDisable(syncFlag);
					}
					break;
				case 3:
					if (timeSelected >= 0 && timeSelected < (timeListLength - 1)) {
						timeSelected++;
						setSleepTime(timeSelected);
					}
					break;
				case 4:
					if (flag === false) {
						setSave(true);
						flag = true;
					}
					break;
				case 5:
					if (autoSleepFlag === false) {
						setAutoSleep(true);
						autoSleepFlag = true;
					}
					break;
				default:
					break;
			}
		} else if (codeKey === numKey.left) {
			switch (selected) {
				case 0:
					if (syncFlag === true) {
						setSync(false);
						syncFlag = false;
						setClockDisable(syncFlag);
						setZoneDisable(syncFlag);
					}
					break;
				case 3:
					if (timeSelected > 0 && timeSelected <= (timeListLength - 1)) {
						timeSelected--;
						setSleepTime(timeSelected);
					}
					break;
				case 4:
					if (flag === true) {
						setSave(false);
						flag = false;
					}
					break;
				case 5:
					if (autoSleepFlag === true) {
						setAutoSleep(false);
						autoSleepFlag = false;
					}
					break;
				default:
					break;
			}
		} else if (codeKey === numKey.enter) {
			switch (selected) {
				case 1:
					location.href = "clock.html";
					break;
				case 2:
					location.href = "timeZone.html";
					break;
				case 6:
					location.href = "offTime.html";
					break;
				case 7:
					location.href = "onTime.html"
					break;
				default:
					break;
			}


		}
	});
});