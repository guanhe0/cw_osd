/*******************
 *Copyright:Skyworth
 *Author:shibei
 *Data:2016-3-7
 *Description: It is js doucument of inform box
 **********************/
var current_msg = 0;
var $dropDownList = $("#dropDownList");
var $dropDownBox;
function clearDropDownBox()
{
	current_msg = 0;
	$dropDownList.html("");
	Oceanus.hideWidget($('title').text(),true);
}
function hideDropdownBox()
{
	current_msg--;
	$dropDownBox = $dropDownList.children('li').eq(current_msg);
	$dropDownBox.children('img').attr({src: ''});
	$dropDownBox.children('div').text("");
	$dropDownBox.removeClass('drop-down');
	if(current_msg === 0)
	{
		setTimeout(function(){
			clearDropDownBox();
		},600);
	}
}

function showDropdownBox(cmd,msg)
{
	var li_item = "";
	li_item += "<li><img><div class='text-show'>"+msg+"</div></li>";
	$dropDownList.prepend(li_item);
	setTimeout(function(){
		$dropDownBox = $dropDownList.children('li').eq(0);
		$dropDownBox.addClass('drop-down');
		current_msg++;
		if(cmd === "ntf_show_usb")
		{
			$dropDownBox.children('img').attr({src: 'images/icon-usb.png'});
		}
		else if(cmd === "ntf_show_msg")
		{
			$dropDownBox.children('img').attr({src: 'images/icon-msg.png'});
		}
		setTimeout("hideDropdownBox()", 5000);
	},100);
}


function handlePlatformEvent(event) {
	var info = JSON.parse(event);
	if((info.cmd === "ntf_show_usb")||(info.cmd === "ntf_show_msg"))
	{
		console.log("#############################");
		showDropdownBox(info.cmd,info.value);
	}
}
window_id=getUrlValue('window')?parseInt(getUrlValue('window')):0;
Oceanus.addPlatformEventListener(handlePlatformEvent,window_id);
