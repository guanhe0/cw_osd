/*******************
 *Copyright:Skyworth
 *Author:shibei
 *Data:2016-1-21
 *Description: It is js doucument of off time setting
 **********************/
var listId = "#js_list";
$(function() {

	var offTimeList = [
		"OFF",
		"Once",
		"Every Day",
		"Mon.~Fri.",
		"Mon.~Sat.",
		"Sat.~Sun.",
		"Sunday"
	];

	try{
		var offtimestr = JS_TimerManager.getOffTimer();
		console.log("offtimestr = "+offtimestr);
	}catch(e){
		console.log("error is "+e);
	}

	var offTimeJSON = JSON.parse(offtimestr);

	var offTimeListLength = offTimeList.length;
	var offTime = offTimeJSON.timerperiod;
	var $offTime = $("#js_offTime");

	//初始化显示
	setOffTime(offTime);


	//[get]get the value of hour
	var hour = offTimeJSON.hour;
	var $hour = $("#js_hour");
	$hour.text(hour);
	var $hourText = $("#js_hourText");
	//[get]get the value of minute
	var minute = offTimeJSON.minute;
	var $minute = $("#js_minute");
	$minute.text(minute);
	var $minuteText = $("#js_minuteText");



	function setOffTime(num) {
		if (num === 0) {
			$offTime.children('li:eq(0)').text(" ");
			$offTime.children('li:eq(1)').text(offTimeList[num]);
			$offTime.children('li:eq(2)').text(offTimeList[num + 1]);
		} else if (num === (offTimeListLength - 1)) {
			$offTime.children('li:eq(0)').text(offTimeList[num - 1]);
			$offTime.children('li:eq(1)').text(offTimeList[num]);
			$offTime.children('li:eq(2)').text("");
		} else {
			$offTime.children('li:eq(0)').text(offTimeList[num - 1]);
			$offTime.children('li:eq(1)').text(offTimeList[num]);
			$offTime.children('li:eq(2)').text(offTimeList[num + 1]);
		}
		//[set] 需要像底层设置，把num对应的模式存储下来

	}

	function setDisabled(num) {
		if (num === 0) {
			$hour.addClass('is-disabled');
			$hourText.addClass('is-disabled');
			$minute.addClass('is-disabled');
			$minuteText.addClass('is-disabled');
		} else {
			$hour.removeClass('is-disabled');
			$hourText.removeClass('is-disabled');
			$minute.removeClass('is-disabled');
			$minuteText.removeClass('is-disabled');
		}
	}

	$(document).keydown(function(event) {
		var codeKey = event.keyCode;
		if (codeKey === numKey.left) {
			switch (selectedRow) {
				case 0:
					if (offTime > 0 && offTime <= (offTimeListLength - 1)) {
						offTime--;
						setOffTime(offTime);
						if (offTime === 0) {
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
				default:
					break;
			}

		} else if (codeKey === numKey.right) {
			switch (selectedRow) {
				case 0:
					if (offTime >= 0 && offTime < (offTimeListLength - 1)) {
						offTime++;
						setOffTime(offTime);
						if (offTime !== 0) {
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
				default:
					break;
			}
		} else if (codeKey === numKey.down) {
			if (selectedRow === 0 && offTime === 0) {
				selectedRow = selectedRow + 2;
			}
		} else if (codeKey === numKey.up) {
			if (selectedRow === 3 && offTime === 0) {
				selectedRow = selectedRow - 2;
			}
		} else if (codeKey === numKey.enter) {
			if (selectedRow === 3) {
				location.href = "timeModule.html";
				//[set]此处把off time 的模式offTimeList[offTime]和具体时间hour、minute传到底层。
				if(offTime == 0){

				}else{
					var setofftime = {'hour':hour;'minute':minute};
					JS_TimerManager.setOffTimer(setofftime,offTime);
				}
			}
		}
	});
});