/*******************
 *Copyright:Skyworth
 *Author:shibei
 *Data:2015-12-12
 *Description: show the name and size of storage devices
 **********************/
$(function() {
	arrUsbList = [
		"C:aaa fuse 1274M",
		"D:bbb fuse 1274M",
		"E:ccc fuse 1274M",
		"F:ddd fuse 1274M"
	];

	var usbList = $("#js_ul");
	var arrUsbListLength = arrUsbList.length;

	/*
	 *show the name and size of useful device in screen 
	 */
	for (var i in arrUsbList) {
		usbList.append("<li class='select-list-li'>" + arrUsbList[i] + "</li>");
	}
	var itemSeleted = 0;
	selectedChange(itemSeleted);


	/*
	 *when item is seleted,the background-color will be changed to "blue"
	 */
	function selectedChange(num) {
		usbList.children("li").css("background-color", "rgba(55,55,55,0)");
		usbList.children("li:eq(" + num + ")").css("background-color", "#0099FF");
	}

	/*
	 *when right key is pressed
	 */
	$(document).keydown(function(event) {
		var codeKey = event.keyCode;
		if (codeKey === numKeyRight || codeKey === numKeyDown) {
			if (itemSeleted === (arrUsbListLength - 1)) {
				itemSeleted = 0;
			} else {
				itemSeleted++;
			}
			selectedChange(itemSeleted);
		}
	});

	/*
	 *when left key is pressed
	 */
	$(document).keydown(function(event) {
		var codeKey = event.keyCode;
		if (codeKey === numKeyLeft || codeKey === numKeyUp) {
			if (itemSeleted === 0) {
				itemSeleted = arrUsbListLength - 1;
			} else {
				itemSeleted--;
			}
			selectedChange(itemSeleted);
		}
	});

	/*
	 *when enter key is pressed
	 */
	$(document).keydown(function(event) {
		var codeKey = event.keyCode;
		if (codeKey === numKeyEnter) {
			window.open("mediaPlayer.html", "_self");
		}
	});

});