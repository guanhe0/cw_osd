// JavaScript Document
// 
$(document).ready(function($) {
	var curType="day";
	var rows={
		day:0,
		channel:0,
	};

	function setDayChange(keyCode){
		var $day=$("#js_day");
		if(keyCode===numKey.down){
			rows.day++;
		}else if(keyCode===numKey.up){
			rows.day--;
		}
		$day.children('.li-select').removeClass('li-select day-select');
		$day.children('li').eq(rows.day).addClass('li-select day-select');
	}
	setDayChange();

	function setDayRight(){
		curType='channel';
		setChannelChange();
	}

	function setChannelChange(keyCode){
		var $channel=$("#js_channel");
		if(keyCode===numKey.down){
			rows.channel++;
		}else if(keyCode===numKey.up){
			rows.channel--;
		}
		$channel.children('.li-select').removeClass('li-select');
		$channel.children('li').eq(rows.channel).addClass('li-select');
	}
	$(document).keydown(function(event) {
		/* Act on the event */
		var keyCode=event.keyCode;
		switch (curType) {
			case "day":
				if(keyCode===numKey.up ||　keyCode===numKey.down){
					setDayChange(keyCode);
				}
				else if(keyCode===numKey.left || keyCode===numKey.right){
					setDayRight();
				}
				break;
			case "channel":
				if(keyCode===numKey.up ||　keyCode===numKey.down){
					setChannelChange(keyCode);
				}
				break;
			default:
				// statements_def
				break;
		}
	});
});