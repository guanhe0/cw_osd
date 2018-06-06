/*******************
 *Copyright:Skyworth
 *Author:shibei
 *Data:2016-1-20
 *Description: It is js doucument of time zone
 **********************/
var listId = "#js_list";

$(function() {
	var timeZoneList = [
		"Canary GMT", "London GMT", "Lisbon GMT", "Dublin GMT",
		"Amsterdam GMT+1", "Beograd GMT+1", "Berlin GMT+1", "Brussels GMT+1", "Budapest GMT+1", "Copenhagen GMT+1", "Geneva GMT+1", "Ljubljana GMT+1",
		"Luxembourg GMT+1", "Madrid GMT+1", "Oslo GMT+1", "Paris GMT+1", "Prague GMT+1", "Rome GMT+1", "Stockholm GMT+1", "Warsaw GMT+1", "Vienna GMT+1",
		"Zagreb GMT+1", "Athens GMT+2", "Bucuresti GMT+2", "Helsinki GMT+2", "Istanbul GMT+2", "Sofia GMT+2", "Tallinn GMT+2", "Vilnius GMT+2",
		"Moscow GMT+3", "Western Australia GMT+8", "Beijing GMT+8", "South Australia GMT+9.5", "Northern Territory GMT+9.5", "New South Wales GMT+10",
		"Victoria GMT+10", "Queensland GMT+10", "Tasmania GMT+10", "NewZealand GMT+12", "Azores GMT-1",
	];
	var timeZoneListLength = timeZoneList.length;
	var $menuList = $("#js_list");
	for (var i = 0; i < timeZoneListLength; i++) {
		$menuList.append('<li>' + timeZoneList[i] + '</li>');
	}

	$(document).keydown(function(event) {
		var codeKey = event.keyCode;
		if(codeKey === numKey.enter){
			//[set]此处把timeZoneList[selectedRow]对应的时区传到底层
			location.href="timeModule.html";
		}
	});
});