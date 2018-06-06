/*******************
 *Copyright:Skyworth
 *Author:shibei
 *Data:2016-02-18
 *Description: It is js doucument of setting
 **********************/
loadLanguageFile("setting.js");
var curMenuBar = 4;
var networkFlag = false;
var JSFlags = {};
var CurAdvanced = {};

CurAdvanced.Picture = {};
CurAdvanced.Sound = {};

var displayMode = ["Default", "16:9", "4:3", "Full Screen", "Movie", "Caption", "Panorama", "Person", "Just Scan", "Dot By Dot", "ZOOM1", "ZOOM2", "Invalid"];
var colorTemperatureMode = ["Warm", "Standard", "Cool"];

var picturePath = "/applications/Oceanus/settings/picture/picturesetting_";
var soundPath = "/applications/Oceanus/settings/audio/audiosetting";
var sourceType = SourceManager.getCurSourceName();
picturePath = picturePath + sourceType;
loadJsFileByPath(picturePath, initPictureData);
loadJsFileByPath(soundPath, initSoundData);


function initPictureData() {
	//read picture JSON init data
	var PictureJson = {};
	switch (sourceType) {
		case "ATV":
			PictureJson = picturesetting_ATV;
			break;
		case "CVBS":
			PictureJson = picturesetting_CVBS;
			break;
		case "DTV":
			PictureJson = picturesetting_DTV;
			break;
		case "HDMI":
			PictureJson = picturesetting_HDMI;
			break;
		case "HDMI2":
			PictureJson = picturesetting_HDMI2;
			break;
		case "HDMI3":
			PictureJson = picturesetting_HDMI3;
			break;
		case "HDMI4":
			PictureJson = picturesetting_HDMI4;
			break;
		case "SCART1":
			PictureJson = picturesetting_SCART1;
			break;
		case "SCART2":
			PictureJson = picturesetting_SCART2;
			break;
		case "SVIDEO":
			PictureJson = picturesetting_SVIDEO;
			break;
		case "USB":
			PictureJson = picturesetting_USB;
			break;
		case "VGA":
			PictureJson = picturesetting_VGA;
			break;
		case "YPBPR":
			PictureJson = picturesetting_YPBPR;
			break;
		default:
			break;
	}
	console.log(PictureJson);
	CurAdvanced.Picture.aspectRatio = $.inArray(displayMode[PictureJson.DisplayMode], advancedStr.aspectRatioList);
	CurAdvanced.Picture.colorTemperature = $.inArray(colorTemperatureMode[PictureJson.PictureModeSetting[3].ColorTemp], advancedStr.colorTemperatureList);
	CurAdvanced.Picture.backlight = PictureJson.PictureModeSetting[3].Backlight;

	CurAdvanced.Picture.brightness = PictureJson.PictureModeSetting[3].Brightness;
	CurAdvanced.Picture.contrast = PictureJson.PictureModeSetting[3].Contrast;
	CurAdvanced.Picture.color = PictureJson.PictureModeSetting[3].Saturation;
	CurAdvanced.Picture.tint = PictureJson.PictureModeSetting[3].Hue;
	CurAdvanced.Picture.sharpness = PictureJson.PictureModeSetting[3].Sharpness;

	CurAdvanced.Picture.memc = 1;
	CurAdvanced.Picture.dnr = 2;
	CurAdvanced.Picture.dlc = 0;
	CurAdvanced.Picture.cinemalModel = 1;
	CurAdvanced.Picture.gameModel = 0;
	CurAdvanced.Picture.localDimming = 1;
}

function initSoundData() {
	//read sound JSON init data
	var SoundJson = audiosetting;
	CurAdvanced.Sound.bass = SoundJson.SoundModeSetting[4].Bass;
	CurAdvanced.Sound.treble = SoundJson.SoundModeSetting[4].Treble;
	CurAdvanced.Sound.balance = SoundJson.SoundModeSetting[4].Balance;
	CurAdvanced.Sound.adSwitchFlag = SoundJson.AdSwitch ? true : false;
	CurAdvanced.Sound.avlFlag = SoundJson.Avc ? true : false;
	CurAdvanced.Sound.surroundFlag = SoundJson.SurroundMode ? true : false;
	CurAdvanced.Sound.formatFlag = true;
	CurAdvanced.Sound.output = 1;
}


function handlePlatformEvent(event) {

	var result = JSON.parse(event);
	if (result.cmd == "initData") {

	}
	if (result.cmd == "saveData") {
		//save Picture Data to JSON file
		var PictureData = CurAdvanced.Picture;
		PictureData.aspectRatio = $.inArray(advancedStr.aspectRatioList[PictureData.aspectRatio], displayMode);
		PictureData.colorTemperature = $.inArray(advancedStr.aspectRatioList[PictureData.colorTemperature], colorTemperatureMode);
		var updatePictureData = {
			'cmd': 'Update_Vedio',
			Value: PictureData
		}

		//save Sound Data to JSON file
		var SoundData = CurAdvanced.Sound;
		var updateSoundData = {
			'cmd': 'Update_Audio',
			Vaule: SoundData
		}
		Oceanus.sendEvent("JsSnapshot", updatePictureData);
		Oceanus.sendEvent("JsSnapshot", updateSoundData);
	}
}
// opera_omi.addPlatformEventListener(handlePlatformEvent);


JSFlags.time = false;
JSFlags.advanced = false;
JSFlags.menuBar = true;

$(function() {

	var menuBarLength = 5;
	var $menuBar = $("#js_menuBar");

	//mainMenu
	for (var i = 0; i < menuBarList.length; i++) {
		$menuBar.find('span:eq(' + i + ')').text(menuBarList[i]);
		$(".showBox").eq(i).css('display', 'none');
	}

	// //network
	// for (var i = 0; i < netTypeList.length; i++) {
	// 	$("#js_netType" + i).text(netTypeList[i]);
	// }
	// for (var i = 0; i < wiredStateList.length; i++) {
	// 	$("#js_wiredState" + i).text(wiredStateList[i]);
	// }
	// for (var i = 0; i < infoDHCPList.length; i++) {
	// 	$("#js_infoDHCP" + i).text(infoDHCPList[i]);
	// }



	$(".showBox").eq(curMenuBar).css('display', 'block');
	isSelected(curMenuBar, curMenuBar - 1);

	$(document).keydown(function(event) {
		var codeKey = event.keyCode;
		switch (codeKey) {
			case numKey.down:
				if (JSFlags.menuBar) {
					if (curMenuBar < (menuBarLength - 1)) {
						curMenuBar++;
						isSelected(curMenuBar, curMenuBar - 1);
					}
					break;
				}

			case numKey.up:
				if (JSFlags.menuBar) {
					if (curMenuBar > 0) {
						curMenuBar--;
						isSelected(curMenuBar, curMenuBar + 1);
					}
				}

				break;
			case numKey.right:
				$("#js_menuBar").addClass('bar-hide');
				if (curMenuBar === 0 && JSFlags.menuBar) {
					// networkFlag = true;
					// menuBarFlag = false;
					// $menuBar.children('li.is-selected-bg').removeClass('is-selected-bg');
				} else if (curMenuBar === 1 && JSFlags.menuBar) {
					menuBarToTime();
				} else if (curMenuBar === 4 && JSFlags.menuBar) {
					menuBarToAdvanced();
				}

				break;
			case numKey.left:
				break;
			case numKey.enter:
				$("#js_menuBar").addClass('bar-hide');
				if (curMenuBar === 1 && JSFlags.menuBar) {
					menuBarToTime();
				} else if (curMenuBar === 4 && JSFlags.menuBar) {
					menuBarToAdvanced();
				}
				break;
			case numKey.back:
				{
					if (JSFlags.menuBar) {
						Oceanus.closeApp($('title').text(), false);
					}
				}
			default:
				break;
		}
	});

	function menuBarToTime() {
		JSFlags.time = true;
		JSFlags.menuBar = false;
		$menuBar.children('li.is-selected-bg').removeClass('is-selected-bg');
		$menuBar.children('li').eq(curMenuBar).children('span').removeClass('color-blue');
	}

	function menuBarToAdvanced() {
		JSFlags.advanced = true;
		JSFlags.menuBar = false;
		$menuBar.children('li.is-selected-bg').removeClass('is-selected-bg');
		$menuBar.children('li').eq(curMenuBar).children('span').removeClass('color-blue');
	}

	function isSelected(num, beforeNum) {
		if (beforeNum >= 0 && beforeNum <= (menuBarLength - 1)) {
			// loadNewImg($menuBar.children('li').eq(beforeNum).children('img'), 1);
			$menuBar.children('li').eq(beforeNum).removeClass('is-selected-bg');
			$menuBar.children('li').eq(beforeNum).children('span').removeClass('color-blue');
			$(".showBox").eq(beforeNum).css('display', 'none');
		}
		// loadNewImg($menuBar.children('li').eq(num).children('img'), 0);
		$menuBar.children('li').eq(num).addClass('is-selected-bg');
		$menuBar.children('li').eq(num).children('span').addClass('color-blue');
		$(".showBox").eq(num).css('display', 'block');
	}
});