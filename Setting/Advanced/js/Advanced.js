/*******************
 *Copyright:Skyworth
 *Author:shibei
 *Data:2016-03-10
 *Description: It is js doucument of the advanced in setting
 **********************/
$(function() {

	var DOMElement = {};


	DOMElement.advancedMenu = $("#js_advancedMenu");
	DOMElement.pictureMenu = $("#js_pictureMenu");
	DOMElement.soundMenu = $("#js_soundMenu");
	DOMElement.pictureSetting = $("#js_pictureSetting");
	DOMElement.colorTemperature = $("#js_colorTemperature");
	DOMElement.backlight = $("#js_backlight");
	DOMElement.aspectRatio = $("#js_aspectRatio");
	DOMElement.skyMode = $("#js_skyMode");
	DOMElement.memcEdit = $("#js_memcEdit");
	DOMElement.dnrEdit = $("#js_dnrEdit");
	DOMElement.outputEdit = $("#js_outputEdit");
	DOMElement.output = $("#js_output");
	DOMElement.formatEdit = $("#js_formatEdit");
	DOMElement.format = $("#js_format");

	DOMElement.soundProgress = DOMElement.soundMenu.find('table div.dot');
	DOMElement.soundProgressNum = DOMElement.soundMenu.find('table td.num');
	DOMElement.progressBar = DOMElement.pictureSetting.find('table div.dot');
	DOMElement.progressBarNum = DOMElement.pictureSetting.find('table td.num');

	initPictureData();

	var keyDownState = "advancedMenu";

	for (var i = 0; i < advancedStr.advancedMenuList.length; i++) {
		DOMElement.advancedMenu.append('<li><span>' + advancedStr.advancedMenuList[i] + '</span></li>');
	}
	for (var i = 0; i < advancedStr.pictureMenuList.length; i++) {
		DOMElement.pictureMenu.children('li').children('span').eq(i).text(advancedStr.pictureMenuList[i]);
	}
	for (var i = 0; i < advancedStr.pictureSettingList.length; i++) {
		DOMElement.pictureSetting.children('li').eq(i).find('td').eq(0).text(advancedStr.pictureSettingList[i]);
	}
	for (var i = 0; i < advancedStr.colorTemperatureList.length; i++) {
		DOMElement.colorTemperature.find('span').eq(i).text(advancedStr.colorTemperatureList[i]);
	}
	for (var i = 0; i < advancedStr.aspectRatioList.length; i++) {
		DOMElement.aspectRatio.find('span').eq(i).text(advancedStr.aspectRatioList[i]);
	}
	for (var i = 0; i < advancedStr.skyModeList.length; i++) {
		DOMElement.skyMode.children('li').eq(i).find('td').eq(0).text(advancedStr.skyModeList[i]);
	}
	for (var i = 0; i < advancedStr.skyModeStateList.length; i++) {
		DOMElement.memcEdit.find('span').eq(i).text(advancedStr.skyModeStateList[i]);
	}
	for (var i = 0; i < advancedStr.skyModeStateList.length; i++) {
		DOMElement.dnrEdit.find('span').eq(i).text(advancedStr.skyModeStateList[i]);
	}
	for (var i = 0; i < advancedStr.soundMenuList.length; i++) {
		DOMElement.soundMenu.children('li').eq(i).find('td').eq(0).text(advancedStr.soundMenuList[i]);
	}
	for (var i = 0; i < advancedStr.outputList.length; i++) {
		DOMElement.output.find('span').eq(i).eq(0).text(advancedStr.outputList[i]);
	}
	DOMElement.backlight.find('td').eq(0).text(advancedStr.backlight);

	var advancedDelayFunc = {};
	advancedDelayFunc.memcBackSkyMode = function() {
		return memcBackSkyMode
	}
	advancedDelayFunc.dnrBackSkyMode = function() {
		return dnrBackSkyMode
	}
	advancedDelayFunc.outputBackSound = function() {
		return outputBackSound
	}
	advancedDelayFunc.formatBackSound = function() {
		return formatBackSound
	}
	advancedDelayFunc.colorTemperatureBackPicture = function() {
		return colorTemperatureBackPicture
	}
	advancedDelayFunc.aspectRatioBackPicture = function(){
		return aspectRatioBackPicture
	}
	window.advancedDelayFunc = advancedDelayFunc;

	$(document).keydown(function(event) {
		var codeKey = event.keyCode;
		if (JSFlags.advanced) {
			if (keyDownState === "advancedMenu") {
				switch (codeKey) {
					case numKey.enter:
						if (CurAdvanced.advanced === -1) {
							CurAdvanced.advanced++;
							isSelected(CurAdvanced.advanced, DOMElement.advancedMenu);
						} else if (CurAdvanced.advanced === 0) {
							advancedToPicture();
						} else if (CurAdvanced.advanced === 1) {
							advancedToSound();
						}
						break;
					case numKey.right:
						if (CurAdvanced.advanced === -1) {
							CurAdvanced.advanced++;
							isSelected(CurAdvanced.advanced, DOMElement.advancedMenu);
						}
						break;
					case numKey.up:
						if (CurAdvanced.advanced > 0) {
							CurAdvanced.advanced--;
							isSelected(CurAdvanced.advanced, DOMElement.advancedMenu);
						}
						break;
					case numKey.down:
						if (CurAdvanced.advanced < (advancedStr.advancedMenuList.length - 1)) {
							CurAdvanced.advanced++;
							isSelected(CurAdvanced.advanced, DOMElement.advancedMenu);
						}
						break;
					case numKey.left:
					case numKey.back:
						advancedBackMenuBar();
						break;
					default:
						break;
				}
			} else if (keyDownState === "pictureMenu") {
				switch (codeKey) {
					case numKey.down:
						if (CurAdvanced.picture < (advancedStr.pictureMenuList.length - 1)) {
							CurAdvanced.picture++;
							isSelected(CurAdvanced.picture, DOMElement.pictureMenu);
						}
						break;
					case numKey.up:
						if (CurAdvanced.picture > 0) {
							CurAdvanced.picture--;
							isSelected(CurAdvanced.picture, DOMElement.pictureMenu);
						}
						break;
					case numKey.enter:
						if (CurAdvanced.picture === 0) {
							pictureToPictureSetting();
						} else if (CurAdvanced.picture === 1) {
							pictureToColorTemperature();
						} else if (CurAdvanced.picture === 2) {
							pictureToBacklight();
						} else if (CurAdvanced.picture === 3) {
							pictureToAspectRatio();
						} else if (CurAdvanced.picture === 4) {
							pictureToSkyMode();
						}
						break;
					case numKey.back:
						pictureBackAdvanced();
						break;
					default:
						break;
				}
			} else if (keyDownState === "pictureSetting") {
				switch (codeKey) {
					case numKey.down:
						if (CurAdvanced.pictureSetting < (advancedStr.pictureMenuList.length - 1)) {
							CurAdvanced.pictureSetting++;
							isSelected(CurAdvanced.pictureSetting, DOMElement.pictureSetting);
						}
						break;
					case numKey.up:
						if (CurAdvanced.pictureSetting > 0) {
							CurAdvanced.pictureSetting--;
							isSelected(CurAdvanced.pictureSetting, DOMElement.pictureSetting);
						}
						break;
					case numKey.right:
						if (CurAdvanced.pictureSetting === 0) {
							if (CurAdvanced.Picture.brightness < 100) {
								CurAdvanced.Picture.brightness++;
								//[set]
								PictureManager.setBrightness(CurAdvanced.Picture.brightness);
								progressBarChange(DOMElement.progressBar.eq(CurAdvanced.pictureSetting),
									DOMElement.progressBarNum.eq(CurAdvanced.pictureSetting), CurAdvanced.Picture.brightness);
							}
						} else if (CurAdvanced.pictureSetting === 1) {
							if (CurAdvanced.Picture.contrast < 100) {
								CurAdvanced.Picture.contrast++;
								//[set]
								PictureManager.setContrast(CurAdvanced.Picture.contrast);
								progressBarChange(DOMElement.progressBar.eq(CurAdvanced.pictureSetting),
									DOMElement.progressBarNum.eq(CurAdvanced.pictureSetting), CurAdvanced.Picture.contrast);
							}
						} else if (CurAdvanced.pictureSetting === 2) {
							if (CurAdvanced.Picture.color < 100) {
								CurAdvanced.Picture.color++;
								//[set]
								PictureManager.setSaturation(CurAdvanced.Picture.color);
								progressBarChange(DOMElement.progressBar.eq(CurAdvanced.pictureSetting),
									DOMElement.progressBarNum.eq(CurAdvanced.pictureSetting), CurAdvanced.Picture.color);
							}
						} else if (CurAdvanced.pictureSetting === 3) {
							if (CurAdvanced.Picture.tint < 100) {
								CurAdvanced.Picture.tint++;
								//[set]
								PictureManager.setHue(CurAdvanced.Picture.tint);
								progressBarChange(DOMElement.progressBar.eq(CurAdvanced.pictureSetting),
									DOMElement.progressBarNum.eq(CurAdvanced.pictureSetting), CurAdvanced.Picture.tint);
							}
						} else if (CurAdvanced.pictureSetting === 4) {
							if (CurAdvanced.Picture.sharpness < 100) {
								CurAdvanced.Picture.sharpness++;
								//[set]
								PictureManager.setSharpness(CurAdvanced.Picture.sharpness);
								progressBarChange(DOMElement.progressBar.eq(CurAdvanced.pictureSetting),
									DOMElement.progressBarNum.eq(CurAdvanced.pictureSetting), CurAdvanced.Picture.sharpness);
							}
						}
						break;
					case numKey.left:
						if (CurAdvanced.pictureSetting === 0) {
							if (CurAdvanced.Picture.brightness > 0) {
								CurAdvanced.Picture.brightness--;
								//[set]
								PictureManager.setBrightness(CurAdvanced.Picture.brightness);
								progressBarChange(DOMElement.progressBar.eq(CurAdvanced.pictureSetting),
									DOMElement.progressBarNum.eq(CurAdvanced.pictureSetting), CurAdvanced.Picture.brightness);
							}
						} else if (CurAdvanced.pictureSetting === 1) {
							if (CurAdvanced.Picture.contrast > 0) {
								CurAdvanced.Picture.contrast--;
								//[set]
								PictureManager.setContrast(CurAdvanced.Picture.contrast);
								progressBarChange(DOMElement.progressBar.eq(CurAdvanced.pictureSetting),
									DOMElement.progressBarNum.eq(CurAdvanced.pictureSetting), CurAdvanced.Picture.contrast);
							}
						} else if (CurAdvanced.pictureSetting === 2) {
							if (CurAdvanced.Picture.color > 0) {
								CurAdvanced.Picture.color--;
								//[set]
								PictureManager.setSaturation(CurAdvanced.Picture.color);
								progressBarChange(DOMElement.progressBar.eq(CurAdvanced.pictureSetting),
									DOMElement.progressBarNum.eq(CurAdvanced.pictureSetting), CurAdvanced.Picture.color);
							}
						} else if (CurAdvanced.pictureSetting === 3) {
							if (CurAdvanced.Picture.tint > 0) {
								CurAdvanced.Picture.tint--;
								//[set]
								PictureManager.setHue(CurAdvanced.Picture.tint);
								progressBarChange(DOMElement.progressBar.eq(CurAdvanced.pictureSetting),
									DOMElement.progressBarNum.eq(CurAdvanced.pictureSetting), CurAdvanced.Picture.tint);
							}
						} else if (CurAdvanced.pictureSetting === 4) {
							if (CurAdvanced.Picture.sharpness > 0) {
								CurAdvanced.Picture.sharpness--;
								//[set]
								PictureManager.setSharpness(CurAdvanced.Picture.sharpness);
								progressBarChange(DOMElement.progressBar.eq(CurAdvanced.pictureSetting),
									DOMElement.progressBarNum.eq(CurAdvanced.pictureSetting), CurAdvanced.Picture.sharpness);
							}
						}
						break;
					case numKey.back:
					case numKey.enter:
						pictureSettingBackPicture();
						break;
					default:
						break;
				}
			} else if (keyDownState === "colorTemperature") {
				switch (codeKey) {
					case numKey.right:
						if (CurAdvanced.Picture.colorTemperature < (advancedStr.colorTemperatureList.length - 1)) {
							CurAdvanced.Picture.colorTemperature++;
							isSelected(CurAdvanced.Picture.colorTemperature, DOMElement.colorTemperature);
						}
						break;
					case numKey.left:
						if (CurAdvanced.Picture.colorTemperature > 0) {
							CurAdvanced.Picture.colorTemperature--
								isSelected(CurAdvanced.Picture.colorTemperature, DOMElement.colorTemperature);
						}
						break;
					case numKey.enter:
						checkChange(CurAdvanced.Picture.colorTemperature, DOMElement.colorTemperature, true);
						break;
					case numKey.back:
						colorTemperatureBackPicture();
						break;
					default:
						break;
				}
			} else if (keyDownState === "backlight") {
				switch (codeKey) {
					case numKey.right:
						if (CurAdvanced.Picture.backlight < 100) {
							CurAdvanced.Picture.backlight++;
							//[set]
							PictureManager.setbacklight(CurAdvanced.Picture.backlight);
							backlightChange(CurAdvanced.Picture.backlight);
						}
						break;
					case numKey.left:
						if (CurAdvanced.Picture.backlight > 0) {
							CurAdvanced.Picture.backlight--;
							//[set]
							PictureManager.setbacklight(CurAdvanced.Picture.backlight);
							backlightChange(CurAdvanced.Picture.backlight);
						}
						break;
					case numKey.back:
					case numKey.enter:
						backlightBackPicture();
						break;
					default:
						break;
				}
			} else if (keyDownState === "aspectRatio") {
				switch (codeKey) {
					case numKey.right:
						if (CurAdvanced.Picture.aspectRatio < (advancedStr.aspectRatioList.length - 1)) {
							CurAdvanced.Picture.aspectRatio++;
							//[set]
							isSelected(CurAdvanced.Picture.aspectRatio, DOMElement.aspectRatio);
						}
						break;
					case numKey.left:
						if (CurAdvanced.Picture.aspectRatio > 0) {
							CurAdvanced.Picture.aspectRatio--;
							isSelected(CurAdvanced.Picture.aspectRatio, DOMElement.aspectRatio);
						}
						break;
					case numKey.enter:
						checkChange(CurAdvanced.Picture.aspectRatio, DOMElement.aspectRatio, true);
						break;
					case numKey.back:
						aspectRatioBackPicture();
						break;
					default:
						break;
				}
			} else if (keyDownState === "skyMode") {
				switch (codeKey) {
					case numKey.down:
						if (CurAdvanced.skyMode < (advancedStr.skyModeList.length - 1)) {
							CurAdvanced.skyMode++;
							isSelected(CurAdvanced.skyMode, DOMElement.skyMode);
						}
						break;
					case numKey.up:
						if (CurAdvanced.skyMode > 0) {
							CurAdvanced.skyMode--;
							isSelected(CurAdvanced.skyMode, DOMElement.skyMode);
						}
						break;
					case numKey.enter:
						if (CurAdvanced.skyMode === 0) {
							skyModeToMemc();
						} else if (CurAdvanced.skyMode === 1) {
							skyModeToDnr();
						} else {
							skyModeRefresh(CurAdvanced.skyMode);
						}
						break;
					case numKey.back:
						skyModeBackPicture();
						break;
					default:
						break;
				}
			} else if (keyDownState === "memcEdit") {
				switch (codeKey) {
					case numKey.right:
						if (CurAdvanced.Picture.memc < (advancedStr.skyModeStateList.length - 1)) {
							CurAdvanced.Picture.memc++;
							isSelected(CurAdvanced.Picture.memc, DOMElement.memcEdit);
						}
						break;
					case numKey.left:
						if (CurAdvanced.Picture.memc > 0) {
							CurAdvanced.Picture.memc--;
							isSelected(CurAdvanced.Picture.memc, DOMElement.memcEdit);
						}
						break;
					case numKey.enter:
						checkChange(CurAdvanced.Picture.memc, DOMElement.memcEdit, true);
						break;
					case numKey.back:
						memcBackSkyMode();
						break;
					default:
						break;
				}
			} else if (keyDownState === "dnrEdit") {
				switch (codeKey) {
					case numKey.right:
						if (CurAdvanced.Picture.dnr < (advancedStr.skyModeStateList.length - 1)) {
							CurAdvanced.Picture.dnr++;
							isSelected(CurAdvanced.Picture.dnr, DOMElement.dnrEdit);
						}
						break;
					case numKey.left:
						if (CurAdvanced.Picture.dnr > 0) {
							CurAdvanced.Picture.dnr--;
							isSelected(CurAdvanced.Picture.dnr, DOMElement.dnrEdit);
						}
						break;
					case numKey.enter:
						checkChange(CurAdvanced.Picture.dnr, DOMElement.dnrEdit, true);
						break;
					case numKey.back:
						dnrBackSkyMode();
						break;
					default:
						break;
				}
			} else if (keyDownState === "soundMenu") {
				switch (codeKey) {
					case numKey.down:
						if (CurAdvanced.sound < (advancedStr.soundMenuList.length - 1)) {
							CurAdvanced.sound++;
							isSelected(CurAdvanced.sound, DOMElement.soundMenu);
						}
						break;
					case numKey.up:
						if (CurAdvanced.sound > 0) {
							CurAdvanced.sound--;
							isSelected(CurAdvanced.sound, DOMElement.soundMenu);
						}
						break;
					case numKey.right:
						if (CurAdvanced.sound === 0) {
							if (CurAdvanced.Sound.bass < 100) {
								CurAdvanced.Sound.bass++;
								JS_AudioManager.setBassVolume(CurAdvanced.Sound.bass);
								progressBarChange(DOMElement.soundProgress.eq(CurAdvanced.sound), DOMElement.soundProgressNum.eq(CurAdvanced.sound), CurAdvanced.Sound.bass);
							}
						} else if (CurAdvanced.sound === 1) {
							if (CurAdvanced.Sound.treble < 100) {
								CurAdvanced.Sound.treble++;
								JS_AudioManager.set_treble(CurAdvanced.Sound.treble);
								progressBarChange(DOMElement.soundProgress.eq(CurAdvanced.sound), DOMElement.soundProgressNum.eq(CurAdvanced.sound), CurAdvanced.Sound.treble);
							}
						} else if (CurAdvanced.sound === 2) {
							if (CurAdvanced.Sound.balance < 50) {
								CurAdvanced.Sound.balance++;
								JS_AudioManager.set_balance(CurAdvanced.Sound.balance);
								progressBarChange(DOMElement.soundProgress.eq(CurAdvanced.sound), DOMElement.soundProgressNum.eq(CurAdvanced.sound), CurAdvanced.Sound.balance, true);
							}
						}
						break;
					case numKey.left:
						if (CurAdvanced.sound === 0) {
							if (CurAdvanced.Sound.bass > 0) {
								CurAdvanced.Sound.bass--;
								JS_AudioManager.setBassVolume(CurAdvanced.Sound.bass);
								progressBarChange(DOMElement.soundProgress.eq(CurAdvanced.sound), DOMElement.soundProgressNum.eq(CurAdvanced.sound), CurAdvanced.Sound.bass);
							}
						} else if (CurAdvanced.sound === 1) {
							if (CurAdvanced.Sound.treble > 0) {
								CurAdvanced.Sound.treble--;
								JS_AudioManager.set_treble(CurAdvanced.Sound.treble);
								progressBarChange(DOMElement.soundProgress.eq(CurAdvanced.sound), DOMElement.soundProgressNum.eq(CurAdvanced.sound), CurAdvanced.Sound.treble);
							}
						} else if (CurAdvanced.sound === 2) {
							if (CurAdvanced.Sound.balance > -50) {
								CurAdvanced.Sound.balance--;
								JS_AudioManager.set_balance(CurAdvanced.Sound.balance);
								progressBarChange(DOMElement.soundProgress.eq(CurAdvanced.sound), DOMElement.soundProgressNum.eq(CurAdvanced.sound), CurAdvanced.Sound.balance, true);
							}
						}
						break;
					case numKey.enter:
						if (CurAdvanced.sound > 2 && CurAdvanced.sound < 6) {
							soundRefresh(CurAdvanced.sound);
						} else if (CurAdvanced.sound == 6) {
							soundToFormat();
						} else if (CurAdvanced.sound === 7) {
							soundToOutput();
						}
						break;
					case numKey.back:
						soundBackAdvanced();
						break;
					default:
						break;
				}
			} else if (keyDownState === "outputEdit") {
				switch (codeKey) {
					case numKey.right:
						if (CurAdvanced.Sound.output < (advancedStr.outputList.length - 1)) {
							CurAdvanced.Sound.output++;
							isSelected(CurAdvanced.Sound.output, DOMElement.output);
						}
						break;
					case numKey.left:
						if (CurAdvanced.Sound.output > 0) {
							CurAdvanced.Sound.output--;
							isSelected(CurAdvanced.Sound.output, DOMElement.output);
						}
						break;
					case numKey.enter:
						checkChange(CurAdvanced.Sound.output, DOMElement.output, true);
						break;
					default:
						break;
				}
			} else if (keyDownState === "formatEdit") {
				switch (codeKey) {
					case numKey.right:
						if (CurAdvanced.Sound.format < (advancedStr.formatList.length - 1)) {
							CurAdvanced.Sound.format++;
							isSelected(CurAdvanced.Sound.format, DOMElement.format);
						}
						break;
					case numKey.left:
						if (CurAdvanced.Sound.format > 0) {
							CurAdvanced.Sound.format--;
							isSelected(CurAdvanced.Sound.format, DOMElement.format);
						}
						break;
					case numKey.enter:
						checkChange(CurAdvanced.Sound.format, DOMElement.format, true);
						break;
					default:
						break;
				}
			}
		}
	});

	//=============================back=====================================


	function formatBackSound() {
		DOMElement.formatEdit.removeClass('edit-show');
		isSelected(-1, DOMElement.format);
		isSelected(CurAdvanced.sound, DOMElement.soundMenu);
		keyDownState = "soundMenu";
		DOMElement.soundMenu.animate({
			top: 0
		}, 300);
		keyDownState = "soundMenu";
	}

	function advancedBackMenuBar() {
		isSelected(-1, DOMElement.advancedMenu);
		$("#js_menuBar").removeClass('bar-hide');
		JSFlags.advanced = false;
		JSFlags.menuBar = true;
		CurAdvanced.advanced = -1
		$("#js_menuBar").children('li:eq(' + curMenuBar + ')').addClass('is-selected-bg');
		DOMElement.advancedMenu.animate({
			marginTop: '0'
		}, 300);
	}

	function outputBackSound() {
		DOMElement.outputEdit.removeClass('edit-show');
		isSelected(-1, DOMElement.output);
		isSelected(CurAdvanced.sound, DOMElement.soundMenu);
		keyDownState = "soundMenu";
		DOMElement.soundMenu.animate({
			top: 0
		}, 300);
		keyDownState = "soundMenu";
	}

	function pictureBackAdvanced() {
		isSelected(-1, DOMElement.pictureMenu);
		isSelected(CurAdvanced.advanced, DOMElement.advancedMenu);
		menuShowChange(DOMElement.advancedMenu, DOMElement.pictureMenu);
		keyDownState = "advancedMenu";
		CurAdvanced.picture = 0;
	}

	function soundBackAdvanced() {
		isSelected(-1, DOMElement.soundMenu);
		isSelected(CurAdvanced.advanced, DOMElement.advancedMenu);
		menuShowChange(DOMElement.advancedMenu, DOMElement.soundMenu);
		keyDownState = "advancedMenu";
		CurAdvanced.sound = 0;
	}

	function dnrBackSkyMode() {
		DOMElement.dnrEdit.removeClass('edit-show');
		isSelected(-1, DOMElement.dnrEdit);
		isSelected(CurAdvanced.skyMode, DOMElement.skyMode);
		keyDownState = "skyMode";
	}


	function memcBackSkyMode() {
		DOMElement.memcEdit.removeClass('edit-show');
		isSelected(-1, DOMElement.memcEdit);
		isSelected(CurAdvanced.skyMode, DOMElement.skyMode);
		keyDownState = "skyMode";
	}

	function skyModeBackPicture() {
		isSelected(-1, DOMElement.skyMode);
		isSelected(CurAdvanced.picture, DOMElement.pictureMenu);
		menuShowChange(DOMElement.pictureMenu, DOMElement.skyMode);
		keyDownState = "pictureMenu";
		CurAdvanced.skyMode = 0;
	}

	function aspectRatioBackPicture() {
		isSelected(-1, DOMElement.aspectRatio);
		isSelected(CurAdvanced.picture, DOMElement.pictureMenu);
		// menuShowChange(DOMElement.pictureMenu, DOMElement.aspectRatio);
		DOMElement.aspectRatio.addClass('height-none');
		keyDownState = "pictureMenu";
		$("div.showBox").eq(4).removeClass('width-1280');
	}

	function colorTemperatureBackPicture() {
		isSelected(-1, DOMElement.colorTemperature);
		isSelected(CurAdvanced.picture, DOMElement.pictureMenu);
		// menuShowChange(DOMElement.pictureMenu, DOMElement.colorTemperature);
		DOMElement.colorTemperature.addClass('height-none');
		keyDownState = "pictureMenu";
	}

	function pictureSettingBackPicture() {
		CurAdvanced.pictureSetting = 0;
		isSelected(-1, DOMElement.pictureSetting);
		isSelected(CurAdvanced.picture, DOMElement.pictureMenu);
		// menuShowChange(DOMElement.pictureMenu, DOMElement.pictureSetting);
		DOMElement.pictureSetting.addClass('height-none');
		keyDownState = "pictureMenu";
		//[set]1.CurAdvanced.brightness,2.CurAdvanced.contrast,3.CurAdvanced.color,4.CurAdvanced.tint,5.CurAdvanced.sharpness
	}

	function backlightBackPicture() {
		isSelected(-1, DOMElement.backlight);
		isSelected(CurAdvanced.picture, DOMElement.pictureMenu);
		// menuShowChange(DOMElement.pictureMenu, DOMElement.backlight);
		DOMElement.backlight.addClass('height-none');
		keyDownState = "pictureMenu";
	}


	//===============================to===========================================
	function pictureToPictureSetting() {
		isSelected(-1, DOMElement.pictureMenu);
		isSelected(CurAdvanced.pictureSetting, DOMElement.pictureSetting);
		// menuShowChange(DOMElement.pictureSetting, DOMElement.pictureMenu);
		DOMElement.pictureSetting.removeClass('height-none');
		keyDownState = "pictureSetting";
		initialPictureSetting();
	}

	function pictureToColorTemperature() {
		isSelected(-1, DOMElement.pictureMenu);
		// menuShowChange(DOMElement.colorTemperature, DOMElement.pictureMenu);
		DOMElement.colorTemperature.removeClass('height-none');
		keyDownState = "colorTemperature";
		isSelected(CurAdvanced.Picture.colorTemperature, DOMElement.colorTemperature);
		checkChange(CurAdvanced.Picture.colorTemperature, DOMElement.colorTemperature);
	}

	function pictureToBacklight() {
		// CurAdvanced.backlight = 30; //[get]
		backlightChange(CurAdvanced.Picture.backlight);
		isSelected(-1, DOMElement.pictureMenu);
		isSelected(0, DOMElement.backlight);
		// menuShowChange(DOMElement.backlight, DOMElement.pictureMenu);
		DOMElement.backlight.removeClass('height-none');
		keyDownState = "backlight";
	}

	function pictureToAspectRatio() {
		// CurAdvanced.aspectRatio = 1; //[get]
		keyDownState = "aspectRatio";
		isSelected(-1, DOMElement.pictureMenu);
		isSelected(CurAdvanced.Picture.aspectRatio, DOMElement.aspectRatio);
		// menuShowChange(DOMElement.aspectRatio, DOMElement.pictureMenu);
		DOMElement.aspectRatio.removeClass('height-none');
		checkChange(CurAdvanced.Picture.aspectRatio, DOMElement.aspectRatio);
		$("div.showBox").eq(4).addClass('width-1280');
	}

	function skyModeToMemc() {
		isSelected(CurAdvanced.Picture.memc, DOMElement.memcEdit);
		isSelected(-1, DOMElement.skyMode);
		DOMElement.memcEdit.addClass('edit-show');
		checkChange(CurAdvanced.Picture.memc, DOMElement.memcEdit);
		keyDownState = "memcEdit";
	}

	function skyModeToDnr() {
		isSelected(CurAdvanced.Picture.dnr, DOMElement.dnrEdit);
		isSelected(-1, DOMElement.skyMode);
		DOMElement.dnrEdit.addClass('edit-show');
		checkChange(CurAdvanced.Picture.dnr, DOMElement.dnrEdit);
		keyDownState = "dnrEdit";
	}

	function advancedToPicture() {
		isSelected(-1, DOMElement.advancedMenu);
		isSelected(CurAdvanced.picture, DOMElement.pictureMenu);
		menuShowChange(DOMElement.pictureMenu, DOMElement.advancedMenu);
		keyDownState = "pictureMenu";
	}

	function advancedToSound() {
		isSelected(-1, DOMElement.advancedMenu);
		isSelected(CurAdvanced.sound, DOMElement.soundMenu);
		menuShowChange(DOMElement.soundMenu, DOMElement.advancedMenu);
		keyDownState = "soundMenu";
		initialSound();
	}

	function pictureToSkyMode() {
		isSelected(-1, DOMElement.pictureMenu);
		isSelected(CurAdvanced.skyMode, DOMElement.skyMode);
		menuShowChange(DOMElement.skyMode, DOMElement.pictureMenu);
		initialSkyMode();
		keyDownState = "skyMode";
	}

	function soundToOutput() {
		// CurAdvanced.output = 1; //[get]
		isSelected(-1, DOMElement.soundMenu);
		isSelected(CurAdvanced.Sound.output, DOMElement.output);
		DOMElement.outputEdit.addClass('edit-show');
		checkChange(CurAdvanced.Sound.output, DOMElement.output);
		DOMElement.soundMenu.animate({
			top: -180
		}, 300);
		keyDownState = "outputEdit";
	}

	function soundToFormat() {
		isSelected(-1, DOMElement.soundMenu);
		isSelected(CurAdvanced.Sound.format, DOMElement.format);
		DOMElement.formatEdit.addClass('edit-show');
		checkChange(CurAdvanced.Sound.format, DOMElement.format);
		DOMElement.soundMenu.animate({
			top: -180
		}, 300);
		keyDownState = "formatEdit";
	}


	//==========================initial=======================================

	function initialSound() {
		soundRefresh(-1);
		progressBarChange(DOMElement.soundProgress.eq(0), DOMElement.soundProgressNum.eq(0), CurAdvanced.Sound.bass);
		progressBarChange(DOMElement.soundProgress.eq(1), DOMElement.soundProgressNum.eq(1), CurAdvanced.Sound.treble);
		progressBarChange(DOMElement.soundProgress.eq(2), DOMElement.soundProgressNum.eq(2), CurAdvanced.Sound.balance, true);
	}

	function initialPictureSetting() {
		progressBarChange(DOMElement.progressBar.eq(0), DOMElement.progressBarNum.eq(0), CurAdvanced.Picture.brightness);
		progressBarChange(DOMElement.progressBar.eq(1), DOMElement.progressBarNum.eq(1), CurAdvanced.Picture.contrast);
		progressBarChange(DOMElement.progressBar.eq(2), DOMElement.progressBarNum.eq(2), CurAdvanced.Picture.color);
		progressBarChange(DOMElement.progressBar.eq(3), DOMElement.progressBarNum.eq(3), CurAdvanced.Picture.tint);
		progressBarChange(DOMElement.progressBar.eq(4), DOMElement.progressBarNum.eq(4), CurAdvanced.Picture.sharpness);
	}

	function initialSkyMode() {
		skyModeRefresh(-1);
	}



	//===============================================================================

	/*
	 *it will refresh the content of sound menu to show,when one of them is changed
	 *if num < 0: it means inital the content to show when firstly show.
	 */
	function soundRefresh(num) {
		if (num < 0 || num === 3) {
			if (num > 0) {
				CurAdvanced.Sound.adSwitchFlag = !CurAdvanced.Sound.adSwitchFlag;
				//[set]
				JS_AudioManager.setADEnable(CurAdvanced.Sound.adSwitchFlag ? true : false);
			}
			DOMElement.soundMenu.children('li').eq(3).find('td').eq(1).text(CurAdvanced.Sound.adSwitchFlag ? ON_OFF[1] : ON_OFF[0]);

		}
		if (num < 0 || num === 4) {
			if (num > 0) {
				CurAdvanced.Sound.avlFlag = !CurAdvanced.Sound.avlFlag;
				//[set]
				JS_AudioManager.set_AvcMode(CurAdvanced.Sound.avlFlag ? true : false);
			}
			DOMElement.soundMenu.children('li').eq(4).find('td').eq(1).text(CurAdvanced.Sound.avlFlag ? ON_OFF[1] : ON_OFF[0]);

		}
		if (num < 0 || num === 5) {
			if (num > 0) {
				CurAdvanced.Sound.surroundFlag = !CurAdvanced.Sound.surroundFlag;
				//[set]
				JS_AudioManager.set_AudioSurroundMode(CurAdvanced.Sound.surroundFlag ? true : false)
			}
			DOMElement.soundMenu.children('li').eq(5).find('td').eq(1).text(CurAdvanced.Sound.surroundFlag ? ON_OFF[1] : ON_OFF[0]);
		}
		if (num < 0 || num === 6) {
			DOMElement.soundMenu.children('li').eq(6).find('td').eq(1).text(advancedStr.formatList[CurAdvanced.Sound.format]);
		}
		if (num < 0 || num === 7) {
			DOMElement.soundMenu.children('li').eq(7).find('td').eq(1).text(advancedStr.outputList[CurAdvanced.Sound.output]);
		}
	}

	/*
	 *it will refresh the content of skyMode to show,when one of them is changed
	 *if num < 0: it means inital the content to show when firstly show.
	 */
	function skyModeRefresh(num) {
		if (num < 0 || num === 0) {
			DOMElement.skyMode.children('li').eq(0).find('td').eq(1).text(advancedStr.skyModeStateList[CurAdvanced.Picture.memc]);
		}
		if (num < 0 || num === 1) {
			DOMElement.skyMode.children('li').eq(1).find('td').eq(1).text(advancedStr.skyModeStateList[CurAdvanced.Picture.dnr]);
		}
		if (num < 0 || num === 2) {
			if (num > 0) {
				CurAdvanced.Picture.dlc = !CurAdvanced.Picture.dlc;
				//[set]
			}
			DOMElement.skyMode.children('li').eq(2).find('td').eq(1).text(CurAdvanced.Picture.dlc ? ON_OFF[1] : ON_OFF[0]);
		}
		if (num < 0 || num === 3) {
			if (num > 0) {
				CurAdvanced.Picture.cinemalModel = !CurAdvanced.Picture.cinemalModel;
				//[set]
			}
			DOMElement.skyMode.children('li').eq(3).find('td').eq(1).text(CurAdvanced.Picture.cinemalModel ? ON_OFF[1] : ON_OFF[0]);
		}
		if (num < 0 || num === 4) {
			if (num > 0) {
				CurAdvanced.Picture.gameModel = !CurAdvanced.Picture.gameModel;
				//[set]
			}
			DOMElement.skyMode.children('li').eq(4).find('td').eq(1).text(CurAdvanced.Picture.gameModel ? ON_OFF[1] : ON_OFF[0]);
		}
		if (num < 0 || num === 5) {
			if (num > 0) {
				CurAdvanced.Picture.localDimming = !CurAdvanced.Picture.localDimming;
				//[set]
			}
			DOMElement.skyMode.children('li').eq(5).find('td').eq(1).text(CurAdvanced.Picture.localDimming ? ON_OFF[1] : ON_OFF[0]);
		}
	}

	/*
	 *change the progressbar show,if fourth param is exist and the value is ture,
	 *it means will show "balance",the value will between -50 to 50.
	 *else,the value will be 100-0 as defualt
	 */
	function progressBarChange($dot, $num, value) {
		var flag = arguments[3] ? arguments[3] : false;
		if (flag) {
			$dot.css('left', ((value + 50) * 3 - 10) + 'px');
		} else {
			$dot.css('left', (value * 3 - 10) + 'px');
		}
		$num.text(value);
	}

	function backlightChange(num) {
		DOMElement.backlight.find('table div.dot').css('left', (num * 3 - 10) + 'px');
		DOMElement.backlight.find('table td.num').text(num);
	}

	/*
	 *change menu to show
	 */
	function menuShowChange($show, $hide) {
		$show.removeClass('menu-hide').addClass('menu-show');
		$hide.removeClass('menu-show').addClass('menu-hide');
	}

	/*
	 *when the keyCode is enter,the picture of check will change to show
	 *if third 
	 */
	function checkChange(num, $tab) {
		var flag = arguments[2] ? arguments[2] : false;

		$tab.children('li.check-show').removeClass('check-show');
		$tab.children('li').eq(num).addClass('check-show');

		if ($tab === DOMElement.colorTemperature && flag) {
			var temp = $.inArray(advancedStr.colorTemperatureList[CurAdvanced.Picture.colorTemperature], colorTemperatureMode);
			PictureManager.setColorTemperature(temp);
			setTimeout(window.advancedDelayFunc.colorTemperatureBackPicture(), 200);
		} else if ($tab === DOMElement.aspectRatio && flag) {
			//[set] aspect ratio
			var temp = $.inArray(advancedStr.aspectRatioList[CurAdvanced.Picture.aspectRatio], displayMode);
			PictureManager.setDisplayMode(temp);
			setTimeout(window.advancedDelayFunc.aspectRatioBackPicture(), 200);
		} else if ($tab === DOMElement.memcEdit && flag) {
			skyModeRefresh(0);
			setTimeout(window.advancedDelayFunc.memcBackSkyMode(), 200);
			//[set]memc
		} else if ($tab === DOMElement.dnrEdit && flag) {
			skyModeRefresh(1);
			setTimeout(window.advancedDelayFunc.dnrBackSkyMode(), 200);
			//[set]dnr
		} else if ($tab === DOMElement.output && flag) {
			soundRefresh(7);
			setTimeout(window.advancedDelayFunc.outputBackSound(), 200);
			//[set]output
		} else if ($tab === DOMElement.format && flag) {
			soundRefresh(6);
			setTimeout(window.advancedDelayFunc.formatBackSound(), 200);
		}

	}

	/*
	 *when is selected,the background will be blue
	 */
	function isSelected(num, $tab) {
		$tab.find('li.is-selected-blue').removeClass('is-selected-blue');
		if (num >= 0) {
			$tab.stop(false, true);
			var nowLi = $tab.children('li').eq(num);
			var position = nowLi.offset();
			nowLi.addClass('is-selected-blue');
			if ($tab === DOMElement.advancedMenu) {
				if (720 - parseInt(position.top) <= 90 && num !== (advancedStr.advancedMenuList.length - 1)) {
					$tab.animate({
						marginTop: '-=250'
					}, 300);
				} else if (parseInt(position.top) < 90 && num) {
					$tab.animate({
						marginTop: '+=250'
					}, 300);
				}
			}
		}
	}

	function initPictureData() {
		CurAdvanced.advanced = -1;
		CurAdvanced.picture = 0;
		CurAdvanced.pictureSetting = 0;
		CurAdvanced.skyMode = 0;
		CurAdvanced.sound = 0;
	}


});