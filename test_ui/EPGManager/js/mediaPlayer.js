/*******************
 *Copyright:Skyworth
 *Author:shibei
 *Data:2015-12-14
 *Description: control the mediaPlayer ,pause,start play and so on.
 **********************/
$(function() {
	var currentBtn = 0;
	var allBtn = $("#js_btns");
	var BUTTON_LENGTH = 8;

	selectedChange(currentBtn);


	/*
	 *when the button is seleted,the background and border color will change
	 */
	function selectedChange(num) {
		allBtn.children('li').children('div').removeClass('li-selected');
		allBtn.children('li:eq(' + num + ')').children("div").addClass('li-selected');
	}

	/*
	 *when right key and down key is pressed,will change the item that is selected
	 */
	$(document).keydown(function(event) {
		var codeKey = event.keyCode;
		if (codeKey === numKeyRight || codeKey === numKeyDown) {
			if (currentBtn === (BUTTON_LENGTH - 1)) {
				currentBtn = 0
			} else {
				currentBtn++;
			}
			selectedChange(currentBtn);
		}
	});


	/*
	 *when left key and up key is pressed 
	 */
	$(document).keydown(function(event) {
		var codeKey = event.keyCode;
		if (codeKey === numKeyLeft || codeKey === numKeyUp) {
			if (currentBtn === 0) {
				currentBtn = (BUTTON_LENGTH - 1);
			} else {
				currentBtn--;
			}
			selectedChange(currentBtn);
		}
	});

});