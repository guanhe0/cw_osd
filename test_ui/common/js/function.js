/*******************
 *Copyright:Skyworth
 *Author:shibei
 *Data:2016-1-20
 *Description: some common function
 1.have to import base.css
 2.have to define "listId" in other js document
 3.can use selectedRow to know which row is selected
 **********************/

var selectedRow = 0;
$(function() {
	var $menuList = $(listId);
	isSelected(selectedRow);
	$(document).keydown(function(event) {
		codeKey = event.keyCode;
		if (codeKey === numKey.down) {
			if (selectedRow === ($menuList.children("li").length - 1)) {
			} else {
				selectedRow++;
			}
			isSelected(selectedRow);
		}else if(codeKey === numKey.up){
			if(selectedRow === 0){
			}else{
				selectedRow--;
			}
			isSelected(selectedRow);
		}
	});

	function isSelected(num) {
	$menuList.children('li').removeClass('is-selected');
	$menuList.children('li:eq(' + num + ')').addClass('is-selected');
}
});