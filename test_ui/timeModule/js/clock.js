/*******************
 *Copyright:Skyworth
 *Author:shibei
 *Data:2016-1-21
 *Description: It is js doucument of clock setting
 **********************/
var listId = "#js_list";
$(function() {

	var monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	try{
		var clocktime = JS_TimerManager.getCurrentTvTime();
		console.log("clocktime = "+clocktime) ;
	}catch(e){
		console.log("error is "+e);
	}

	var clockTimeJSON = JSON.parse(clocktime);
	//[get] get the value of year
	var year = clockTimeJSON.year;
	var $year = $("#js_year");
	$year.text(year);
	//[get]get the value of month
	var month = clockTimeJSON.month; //0-11
	var $month = $("#js_month");
	$month.text(monthList[month]);
	//[get]get the value of date
	var date = clockTimeJSON.monthDay;
	var $date = $("#js_date");
	$date.text(date);
	//[get]get the value of hour
	var hour = clockTimeJSON.hour;
	var $hour = $("#js_hour");
	$hour.text(hour);
	//[get]get the value of minute
	var minute = clockTimeJSON.minute;
	var $minute = $("#js_minute");
	$minute.text(minute);

	$(document).keydown(function(event) {
		var codeKey = event.keyCode;
		if (codeKey === numKey.left) {
			switch (selectedRow) {
				case 0:
					if (year > 0) {
						year--;
						$year.text(year);
					}
					break;
				case 1:
					if (month > 0) {
						month--;
					} else if (month === 0) {
						month = 11;
					}
					$month.text(monthList[month]);
					break;
				case 2:
					switch (month) {
						case 0:
						case 2:
						case 4:
						case 6:
						case 7:
						case 9:
						case 11:
							if (date > 1) {
								date++
							} else if (date === 1) {
								date = 31;
							}
							$date.text(date);
							break;
						case 3:
						case 5:
						case 8:
						case 10:
							if (date > 1) {
								date--;
							} else if (date === 1) {
								date = 30;
							}
							$date.text(date);
							break;
						case 1:
							if (year % 100 === 0) {
								if (year % 400 === 0) {
									if (date > 1) {
										date--;
									} else if (date = 1) {
										date = 29;
									}
								} else {
									if (date > 1) {
										date--;
									} else if (date = 1) {
										date = 28;
									}
								}
							} else {
								if (year % 4 === 0) {
									if (date > 1) {
										date--;
									} else if (date = 1) {
										date = 29;
									}
								} else {
									if (date > 1) {
										date--;
									} else if (date = 1) {
										date = 28;
									}
								}
							}
							$date.text(date);
							break;
						default:
							break;
					}
					break;
				case 3:
					if (hour > 0) {
						hour--;
					} else if (hour === 0) {
						hour = 23;
					}
					$hour.text(hour);
					break;
				case 4:
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
					year++;
					$year.text(year);
					break;
				case 1:
					if (month < 11) {
						month++;
					} else if (month === 11) {
						month = 0;
					}
					$month.text(monthList[month]);
					break;
				case 2:
					switch (month) {
						case 0:
						case 2:
						case 4:
						case 6:
						case 7:
						case 9:
						case 11:
							if (date < 31) {
								date++
							} else if (date === 31) {
								date = 1;
							}
							$date.text(date);
							break;
						case 3:
						case 5:
						case 8:
						case 10:
							if (date < 30) {
								date++;
							} else if (date === 30) {
								date = 1;
							}
							$date.text(date);
							break;
						case 1:
							if (year % 100 === 0) {
								if (year % 400 === 0) {
									if (date < 29) {
										date++;
									} else if (date >= 29) {
										date = 1;
									}
								} else {
									if (date < 28) {
										date++;
									} else if (date >= 28) {
										date = 1;
									}
								}
							} else {
								if (year % 4 === 0) {
									if (date < 29) {
										date++;
									} else if (date >= 29) {
										date = 1;
									}
								} else {
									if (date < 28) {
										date--;
									} else if (date >= 28) {
										date = 1;
									}
								}
							}
							$date.text(date);
							break;
						default:
							break;
					}
					break;
				case 3:
					if (hour < 23) {
						hour++;
					} else if (hour === 23) {
						hour = 0;
					}
					$hour.text(hour);
					break;
				case 4:
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
		} else if (codeKey === numKey.enter) {
			if (selectedRow === 5) {
				//[set]把此时year,month,date,hour,minute对应的时间设置到底层
				location.href = "timeModule.html";
				var clocktimestr = year+':'+month+':'+date+':'+hour+':'+minute+'0';
				JS_TimerManager.setClkTime(clocktimestr);
			}
		}
	});
});