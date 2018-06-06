/*******************
 *Copyright:Skyworth
 *Author:shibei
 *Data:2016-02-18
 *Description: It is js doucument of setting,this js is mainly for network keydown
 **********************/
 var curNetType = -1;
$(function() {


	var $netType = $("#js_netType");

	function isSelected(num) {
		$netType.children('li.is-selected-color').removeClass('is-selected-color');
		$netType.children('li:eq(' + num + ')').addClass('is-selected-color');
	}

	// $(document).keydown(function(event) {
	// 	var codeKey = event.keyCode;
	// 	switch (codeKey) {
	// 		case numKey.right:
	// 			if (curMenuBar === 0 && networkFlag) {
	// 				if (curNetType < (netTypeList.length - 1)) {
	// 					curNetType++;
	// 					isSelected(curNetType);
	// 				}
	// 			}
	// 			break;
	// 		case numKey.left:
	// 			if (curMenuBar === 0 && networkFlag) {
	// 				if (curNetType > 0) {
	// 					curNetType--;
	// 					isSelected(curNetType);
	// 				}else if(curNetType === 0){
	// 					curNetType = -1;
	// 					networkFlag = false;
	// 					menuBarFlag = true;
	// 					$netType.children('li.is-selected-color').removeClass('is-selected-color');
	// 				}
	// 			}
	// 		default:
	// 			break;
	// 	}
	// });
});