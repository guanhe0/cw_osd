/*******************
 *Copyright:Skyworth
 *Author:shibei
 *Data:2016-1-13
 *Description: It is js doucument of teletext module,mainly for testing interface
 **********************/
$(function() {

	var flag = 1;
	var $btn = $("#js_btn");

	setTeletext(1);

	function setTeletext(num) {
		if (num === 0) {
			$btn.removeClass('btn-selected').text("Press Enter to Close");
		} else if (num === 1) {
			$btn.addClass('btn-selected').text("Press Enter to Open");
		}
	}

	$(document).keydown(function(event) {
		codeKey = event.keyCode;
		if (codeKey === numKeyEnter) {
			if (flag === 0) {
				setTeletext(1);
				flag = 1;
				//[set]此处开启teletext
				if(JS_TeletextManager.hasTeletextSignal())
					JS_TeletextManager.openTeletext(3);
			} else if (flag === 1) {
				setTeletext(0);
				flag = 0;
				//[set]此处关闭teletext
			}

		}
	});
});