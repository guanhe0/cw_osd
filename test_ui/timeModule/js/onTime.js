/*******************
 *Copyright:Skyworth
 *Author:shibei
 *Data:2016-1-21
 *Description: It is js doucument of on time setting
 **********************/
var listId = "#js_list";
$(function() {

	var onTimeList = [
		"OFF",
		"Once",
		"Every Day",
		"Mon.~Fri.",
		"Mon.~Sat.",
		"Sat.~Sun.",
		"Sunday"
	];
	var sourceList = [
		"DTV",
		"Radio",
		"Data",
		"ATV",
		"Component 1",
		"PC-RGB",
		"HDMI 1",
		"HDMI 2",
		"HDMI 3",
		"AV 1"
	];

	var onTimeListLength = onTimeList.length;
	var sourceListLength = sourceList.length;
	var onTime = 1;
	var $onTime = $("#js_onTime");


	//[get]get the value of hour
	var hour = 12;

	var $hour = $("#js_hour");
	$hour.text(hour);
	var $hourText = $("#js_hourText");

	//[get]get the value of minute
	var minute = 12;

	var $minute = $("#js_minute");
	$minute.text(minute);
	var $minuteText = $("#js_minuteText");

	var $sourceTitle = $("#js_sourceTitle");
	var $source = $("#js_source");
	var $channelTitle = $("#js_channelTitle");
	var $volumeTitle = $("#js_volumeTitle");
	var $volumeText = $("#js_volumeText");
	var $tab = $("#js_tab");

	//[get]get the value of volume
	var volume = 50;
	//[get]get the input source type
	var inputSource = 3;

	//初始化显示
	setOnTime(onTime);
	$volumeText.text(volume);
	setInputSource(inputSource);


	function setInputSource(num) {
		if (num === 0) {
			$source.children('li:eq(0)').text(" ");
			$source.children('li:eq(1)').text(sourceList[num]);
			$source.children('li:eq(2)').text(sourceList[num + 1]);
		} else if (num === (sourceListLength - 1)) {
			$source.children('li:eq(0)').text(sourceList[num - 1]);
			$source.children('li:eq(1)').text(sourceList[num]);
			$source.children('li:eq(2)').text("");
		} else {
			$source.children('li:eq(0)').text(sourceList[num - 1]);
			$source.children('li:eq(1)').text(sourceList[num]);
			$source.children('li:eq(2)').text(sourceList[num + 1]);
		}
		//[set]需要像底层设置，把num对应的模式存储下来
	}


	function setOnTime(num) {
		if (num === 0) {
			$onTime.children('li:eq(0)').text(" ");
			$onTime.children('li:eq(1)').text(onTimeList[num]);
			$onTime.children('li:eq(2)').text(onTimeList[num + 1]);
		} else if (num === (onTimeListLength - 1)) {
			$onTime.children('li:eq(0)').text(onTimeList[num - 1]);
			$onTime.children('li:eq(1)').text(onTimeList[num]);
			$onTime.children('li:eq(2)').text("");
		} else {
			$onTime.children('li:eq(0)').text(onTimeList[num - 1]);
			$onTime.children('li:eq(1)').text(onTimeList[num]);
			$onTime.children('li:eq(2)').text(onTimeList[num + 1]);
		}
		//[set]需要像底层设置，把num对应的模式存储下来
	}

	function setDisabled(num) {
		if (num === 0) {
			$hour.addClass('is-disabled');
			$hourText.addClass('is-disabled');
			$minute.addClass('is-disabled');
			$minuteText.addClass('is-disabled');
			$sourceTitle.addClass('is-disabled');
			$tab.addClass('is-disabled');
			$channelTitle.addClass('is-disabled');
			$volumeTitle.addClass('is-disabled');
			$volumeText.addClass('is-disabled');
		} else {
			$hour.removeClass('is-disabled');
			$hourText.removeClass('is-disabled');
			$minute.removeClass('is-disabled');
			$minuteText.removeClass('is-disabled');
			$sourceTitle.removeClass('is-disabled');
			$tab.removeClass('is-disabled');
			$channelTitle.removeClass('is-disabled');
			$volumeTitle.removeClass('is-disabled');
			$volumeText.removeClass('is-disabled');
		}
	}

	$(document).keydown(function(event) {
		var codeKey = event.keyCode;
		if (codeKey === numKey.left) {
			switch (selectedRow) {
				case 0:
					if (onTime > 0 && onTime <= (onTimeListLength - 1)) {
						onTime--;
						setOnTime(onTime);
						if (onTime === 0) {
							setDisabled(0);
						} else {
							setDisbaled(1);
						}
					}
					break;
				case 1:
					if (hour > 0) {
						hour--;
					} else if (hour === 0) {
						hour = 23;
					}
					$hour.text(hour);
					break;
				case 2:
					if (minute > 0) {
						minute--;
					} else if (minute === 0) {
						minute = 59;
					}
					$minute.text(minute);
					break;
					case 3:
					if (inputSource > 0 && inputSource <= (sourceListLength - 1)) {
						inputSource--;
						setInputSource(inputSource);
					}
					break;
				case 5:
					if (volume > 0) {
						volume--;
					} else if (volume === 0) {
						volume = 100;
					}
					$volumeText.text(volume);
					break;
				default:
					break;
			}

		} else if (codeKey === numKey.right) {
			switch (selectedRow) {
				case 0:
					if (onTime >= 0 && onTime < (onTimeListLength - 1)) {
						onTime++;
						setOnTime(onTime);
						if (onTime !== 0) {
							setDisabled(1);
						}
					}
					break;
				case 1:
					if (hour < 23) {
						hour++;
					} else if (hour === 23) {
						hour = 0;
					}
					$hour.text(hour);
					break;
				case 2:
					if (minute < 59) {
						minute++;
					} else if (minute === 59) {
						minute = 0;
					}
					$minute.text(minute);
					break;
				case 3:
					if (inputSource >= 0 && inputSource < (sourceListLength - 1)) {
						inputSource++;
						setInputSource(inputSource);
					}
					break;
				case 5:
					if (volume < 100) {
						volume++;
					} else if (volume === 100) {
						volume = 0;
					}
					$volumeText.text(volume);
					break;
				default:
					break;
			}
		} else if (codeKey === numKey.down) {
			if (selectedRow === 0 && onTime === 0) {
				selectedRow = selectedRow + 5;
			}
		} else if (codeKey === numKey.up) {
			if (selectedRow === 6 && onTime === 0) {
				selectedRow = selectedRow - 5;
			}
		} else if (codeKey === numKey.enter) {
			if (selectedRow === 6) {
				location.href = "timeModule.html";
				//[set]此处把on time 的模式onTimeList[onTime]
				//[set]具体hour、minute、input source、channel、volume传到底层。
				//[set]把input source 的模式sourceList[inputSource]传到底层
			}
		}
	});
});