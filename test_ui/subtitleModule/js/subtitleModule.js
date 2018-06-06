/*******************
 *Copyright:Skyworth
 *Author:shibei
 *Data:2016-1-13
 *Description: It is js doucument of subtitle module,mainly for testing all interface
 **********************/

$(function() {

	//[get]此处获取到存在的语言存到languageList数组里
	var languageList = ["OFF", "CHINESE", "ENGLISH"];

	var languageListLength = languageList.length;
	var $language = $("#js_language");
	//用于显示字幕内容的元素，如果字幕是底层直接显示的，那就不用这个元素了。
	var $content = $("#js_content");
	//继续当前被选中的行，默认为0，也就是选中第一行。
	var currentRow = 0;


	for (var i = 0; i < languageListLength; i++) {
		$language.append("<li>" + languageList[i] + "</li>");
	}

	isSelected(currentRow);

    //JS_SubtitleManager.getSubtitleInfo();

	function isSelected(num) {
		$language.children('li').removeClass('is-selected');
		$language.children('li:eq(' + num + ')').addClass('is-selected');

	}


	function sleep(sleepTime) {
		 for(var start = Date.now(); Date.now() - start <= sleepTime; ) { } 
	}


	$(document).keydown(function(event) {
		codeKey = event.keyCode;
		if (codeKey === numKey.down) {
			if (currentRow === (languageListLength - 1)) {
				currentRow = 0
			} else {
				currentRow++;
			}
			isSelected(currentRow);
		} else if (codeKey === numKey.up) {
			if (currentRow === 0) {
				currentRow = (languageListLength - 1);
			} else {
				currentRow--;
			}
			isSelected(currentRow);
		} else if (codeKey === numKey.enter) {
			if(currentRow === 0){
				$content.text(" ");
				JS_SubtitleManager.closeSubtitle();
			}else{
				//[set]将此时currentRow对应的languageList[currentRow]的值传到底层，让底层显示对应语言的字幕。
				$content.text(currentRow);

				JS_SubtitleManager.closeSubtitle();
				JS_SubtitleManager.openSubtitle(currentRow);
			}
		}

	});
});