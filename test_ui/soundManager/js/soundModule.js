$(function() {

	var soundModule = {
		soundModeList: [
			"Standard",
			"Music",
			"Movie",
			"Sport",
			"User",
		],
		spdifModeList: [
			"PCM",
			"OFF",
			"RAW"
		],
		audioTypeList: [
			"Normal",
			"Hearing Impaired",
			"Visual Imparired"
		]
	};

	var FLAG_ON = true;
	var FLAG_OFF = false;

	var selectedRow = 0;
	var $menu = $("#js_content");
	var menuLength = $menu.children("li").length - 5;

	var audioVolume = JS_AudioManager.get_audioVolume;
	var $audioVolume = $("#js_audioVolume");
	var $audioVolumeNum = $("#js_audioVolumeNum");

	var earVolume = JS_AudioManager.get_earPhoneVolume;
	var $earVolume = $("#js_earVolume");
	var $earVolumeNum = $("#js_earVolumeNum");

	var treble = JS_AudioManager.get_treble;
	var $treble = $("#js_treble");
	var $trebleNum = $("#js_trebleNum");

	var balance = JS_AudioManager.get_balance;
	var $balance = $("#js_balance");
	var $balanceNum = $("#js_balanceNum");

	var $muteText = $("#js_muteText");
	var $mute = $("#js_mute");
	var $muteColor = $("#js_muteColor");
	var muteFlag = JS_AudioManager.get_muteFlag;

	var $avcText = $("#js_avcText");
	var $avc = $("#js_avc");
	var $avcColor = $("#js_avcColor");
	var avcFlag = JS_AudioManager.get_AvcMode;

	var $srdText = $("#js_srdText");
	var $srd = $("#js_srd");
	var $srdColor = $("#js_srdColor");
	var srdFlag = JS_AudioManager.get_AudioSurroundMode();
	//var srdFlag = false;

	var $autoVolText = $("#js_autoVolText");
	var $autoVol = $("#js_autoVol");
	var $autoVolColor = $("#js_autoVolColor");
	var autoVolFlag = JS_AudioManager.get_AutoVolume();

	var $audioType = $("#js_audioType");
	var audioTypeCol = 0;
	var audioTypeListLength = soundModule.audioTypeList.length;

	var $DRCText = $("#js_DRCText");
	var $DRC = $("#js_DRC");
	var $DRCColor = $("#js_DRCColor");
	var DRCFlag = 1;

	var spdifDelay = 20;
	var $spdifDelay = $("#js_spdifDelay");
	var $spdifDelayNum = $("#js_spdifDelayNum");

	var speakerDelay = 20;
	var $speakerDelay = $("#js_speakerDelay");
	var $speakerDelayNum = $("#js_speakerDelayNum");

	var spdifModeListLength = soundModule.spdifModeList.length;
	var spdifModeCol = JS_AudioManager.get_SpidfOutMode();
	//var spdifModeCol = 0;
	var $spdifMode = $("#js_spdifMode");

	var $soundMode = $("#js_soundMode");

	var soundModeCol = JS_AudioManager.get_audioSoundMode();
	try
	{
		var soundModeSettingStr = JS_AudioManager.getAudioSoundModeSetting();
		console.log("soundModeSettingStr is "+soundModeSettingStr);
	}catch(e){
		console.log("error is :"+e);
	}
	console.log("2 soundModeCol ="+soundModeCol);
	var soundModeListLength = soundModule.soundModeList.length;

	var $eq120 = $("#js_eq120");
	var $eq120Num = $("#js_eq120Num");
	var eq120 = 50;

	var $eq500 = $("#js_eq500");
	var $eq500Num = $("#js_eq500Num");
	var eq500 = 50;

	var $eq1500 = $("#js_eq1500");
	var $eq1500Num = $("#js_eq1500Num");
	var eq1500 = 50;

	var $eq5k = $("#js_eq5k");
	var $eq5kNum = $("#js_eq5kNum");
	var eq5k = 50;

	var $eq10k = $("#js_eq10k");
	var $eq10kNum = $("#js_eq10kNum");
	var eq10k = 50;

	var $120 = $("#js_120");
	var $500 = $("#js_500");
	var $1500 = $("#js_1500");
	var $5k = $("#js_5k");
	var $10k = $("#js_10k");

	$eq120.addClass('isDisabled');
	$eq120Num.addClass('isDisabled-text');
	$120.addClass('isDisabled-text');

	$eq500.addClass('isDisabled');
	$eq500Num.addClass('isDisabled-text');
	$500.addClass('isDisabled-text');

	$eq1500.addClass('isDisabled');
	$eq1500Num.addClass('isDisabled-text');
	$1500.addClass('isDisabled-text');

	$eq5k.addClass('isDisabled');
	$eq5kNum.addClass('isDisabled-text');
	$5k.addClass('isDisabled-text');

	$eq10k.addClass('isDisabled');
	$eq10kNum.addClass('isDisabled-text');
	$10k.addClass('isDisabled-text');

	//setDefault(soundModeCol);
	console.log("1 soundModeCol ="+soundModeCol);
	setEqBand(soundModeCol,soundModeSettingStr);


	/**初始化显示
	需要从底层get相关数据以实现初始化显示
	var audioVolume = ;//声音音量 0-100
	var treble = ;//treble音量0-100
	var balance = ;//balance音量-50-50
	var soundModeCol = ;//声音模式,0~4分表表示："standard","music","movie","sport","user",
	var earVolume = ;//earPhone音量0-100
	var muteFlag = ;//静音标志，0代表关闭，1代表开启
	var avcFlag = ;//AVC标志，0代表关闭，1代表开启
	var srdFlag = ;//AudioSurround模式标志，0代表关闭，1代表开启
	var autoVolFlag = ;//auto volume模式的开关，0代表关闭，1代表开启
	var audioTypeCol = ;/初始化时，显示的audio type的模式，0-2分别代表："Normal","Hearing Imparied","Visual Imparied"
	var DRCFlag = ;//DRC模式的开关，0代表关闭，1代表开启
	var spdifDelay = ;//spidf delay大小 spdifDelay的取值是0-25，增长间隔为10，对应实际取值的0,10,20-250。
	var speakerDelay = ;//speaker delay大小
	var spdifModeCol = ;//初始化时，显示的模式，0-2分别代表"PCM","OFF","RAW"
	var eq120 = ;//Equalizer 120Hz的值
	var eq500 = ;//Equalizer 500Hz的值
	var eq1500 = ;//Equalizer 1500Hz的值
	var eq5k = ;//Equalizer 5kHz的值
	var eq10k = ;//Equalizer 10kHz的值
	*/
	isSelected(selectedRow);
	setSoundMode(soundModeCol);
	setAudioVolume(audioVolume);
	setEarVolume(earVolume);
	setTreble(treble);
	setBalance(balance);
	setMute(muteFlag);
	setAvc(avcFlag);
	setSrd(srdFlag);
	setAutoVol(autoVolFlag);
	setAudioType(audioTypeCol);
	setDRC(DRCFlag);
	setSpdifDelay(spdifDelay);
	setSpeakerDelay(speakerDelay);
	setSpdifMode(spdifModeCol);



	//被选中时，背景变为蓝色
	function isSelected(num) {
		$menu.children('li').removeClass('is-selected');
		$menu.children('li:eq(' + num + ')').addClass('is-selected');
	}
	//AudioSoundMode左右切换时显示不同项
	function setSoundMode(num) {
		switch (num) {
			case 0:
				$soundMode.children('li:eq(1)').text(soundModule.soundModeList[num]);
				$soundMode.children('li:eq(0)').text(" ");
				$soundMode.children('li:eq(2)').text(soundModule.soundModeList[num + 1]);
				break;
			case 1:
			case 2:
			case 3:
				$soundMode.children('li:eq(1)').text(soundModule.soundModeList[num]);
				$soundMode.children('li:eq(0)').text(soundModule.soundModeList[num - 1]);
				$soundMode.children('li:eq(2)').text(soundModule.soundModeList[num + 1]);
				break;
			case 4:
				$soundMode.children('li:eq(1)').text(soundModule.soundModeList[num]);
				$soundMode.children('li:eq(0)').text(soundModule.soundModeList[num - 1]);
				$soundMode.children('li:eq(2)').text(" ");
				break;
			default:
				break;
		}
		//[set]此处需要num对应的mode传到底层
		JS_AudioManager.set_audioSoundMode(num);
	}

	function setAudioVolume(num) {
		$audioVolume.css('width', 2 * num + 'px');
		$audioVolumeNum.text(num);
		//[set]此处需要向底层传数据，让底层把音量set为当前数值num
		JS_AudioManager.set_audioVolume(num);
	}

	function setEarVolume(num) {
		$earVolume.css('width', 2 * num + 'px');
		$earVolumeNum.text(num);
		//[set]此处需要向底层传数据，让底层把音量set为当前数值num
		JS_AudioManager.set_earPhoneVolume(num);
	}

	function setTreble(num) {
		$treble.css('width', 2 * num + 'px');
		$trebleNum.text(num);
		//[set]此处需要向底层传数据，让底层把音量set为当前数值num
		JS_AudioManager.set_treble(num);
	}

	function setBalance(num) {
		$balance.css('width', 2 * num + 'px');
		$balanceNum.text(num - 50);
		//[set]此处需要向底层传数据，让底层把音量set为当前数值num
		JS_AudioManager.set_balance(num);
	}

	function setMute(num) {
		if (num === false) {
			$muteText.removeClass('on-off-text').text("OFF");
			$mute.removeClass('on-off-btn');
			$muteColor.removeClass('on-off-color');
			//[set]此处需要向底层传数据，让底层把静音状态设为关闭状态
			JS_AudioManager.set_muteFlag(false);
		} else if (num === true) {
			$muteText.addClass('on-off-text').text("ON");
			$mute.addClass('on-off-btn');
			$muteColor.addClass('on-off-color');
			//[set]此处需要向底层传数据，让底层把静音状态设为开启状态
			JS_AudioManager.set_muteFlag(true);
		}
	}

	function setAvc(num) {
		if (num === false) {
			$avcText.removeClass('on-off-text').text("OFF");
			$avc.removeClass('on-off-btn');
			$avcColor.removeClass('on-off-color');
			//[set]此处需要向底层传数据，让底层把AVC模式设为关闭状态
			JS_AudioManager.set_AvcMode(false);
		} else if (num === true) {
			$avcText.addClass('on-off-text').text("ON");
			$avc.addClass('on-off-btn');
			$avcColor.addClass('on-off-color');
			//[set]此处需要向底层传数据，让底层把AVC模式设为开启状态
			JS_AudioManager.set_AvcMode(true);					
		}
	}

	function setSrd(num) {
		if (num === false) {
			$srdText.removeClass('on-off-text').text("OFF");
			$srd.removeClass('on-off-btn');
			$srdColor.removeClass('on-off-color');
			//[set]此处需要向底层传数据，让底层把AudioSurround模式设为关闭状态
			JS_AudioManager.set_AudioSurroundMode(false);		
		} else if (num === true) {
			$srdText.addClass('on-off-text').text("ON");
			$srd.addClass('on-off-btn');
			$srdColor.addClass('on-off-color');
			//[set]此处需要向底层传数据，让底层把AudioSurround模式设为开启状态
			JS_AudioManager.set_AudioSurroundMode(true);	
		}
	}

	function setAutoVol(num) {
		if (num === false) {
			$autoVolText.removeClass('on-off-text').text("OFF");
			$autoVol.removeClass('on-off-btn');
			$autoVolColor.removeClass('on-off-color');
			//[set]此处需要向底层传数据，让底层把auto volume模式设为关闭状态
			JS_AudioManager.set_AutoVolume(false);		
		} else if (num === true) {
			$autoVolText.addClass('on-off-text').text("ON");
			$autoVol.addClass('on-off-btn');
			$autoVolColor.addClass('on-off-color');
			//[set]此处需要向底层传数据，让底层把auto volume模式设为开启状态
			JS_AudioManager.set_AutoVolume(true);	
		}
	}

	function setAudioType(num) {
		switch (num) {
			case 0:
				$audioType.children('li:eq(1)').text(soundModule.audioTypeList[num]);
				$audioType.children('li:eq(0)').text(" ");
				$audioType.children('li:eq(2)').text(soundModule.audioTypeList[num + 1]);
				break;
			case 1:
				$audioType.children('li:eq(1)').text(soundModule.audioTypeList[num]);
				$audioType.children('li:eq(0)').text(soundModule.audioTypeList[num - 1]);
				$audioType.children('li:eq(2)').text(soundModule.audioTypeList[num + 1]);
				break;
			case 2:
				$audioType.children('li:eq(1)').text(soundModule.audioTypeList[num]);
				$audioType.children('li:eq(0)').text(soundModule.audioTypeList[num - 1]);
				$audioType.children('li:eq(2)').text(" ");
				break;
			default:
				break;
		}
		//[set]此处需要num对应的mode传到底层
	}

	function setDRC(num) {
		if (num === 0) {
			$DRCText.removeClass('on-off-text').text("OFF");
			$DRC.removeClass('on-off-btn');
			$DRCColor.removeClass('on-off-color');
			//[set]此处需要向底层传数据，让底层把DRC模式设为关闭状态

		} else if (num === 1) {
			$DRCText.addClass('on-off-text').text("ON");
			$DRC.addClass('on-off-btn');
			$DRCColor.addClass('on-off-color');
			//[set]此处需要向底层传数据，让底层把DRC模式设为开启状态	
		}
	}

	function setSpdifDelay(num) {
		$spdifDelay.css('width', 8 * num + 'px');
		$spdifDelayNum.text(num * 10);
		//[set]此处需要向底层传数据，让底层把spdif delay set为当前数值num
		JS_AudioManager.set_SpdifDelay(num);
	}

	function setSpeakerDelay(num) {
		$speakerDelay.css('width', 8 * num + 'px');
		$speakerDelayNum.text(num * 10);
		//[set]此处需要向底层传数据，让底层把speaker delay set为当前数值num
		JS_AudioManager.set_SpeakerDelay(num);
	}

	function setSpdifMode(num) {
		switch (num) {
			case 0:
				$spdifMode.children('li:eq(1)').text(soundModule.spdifModeList[num]);
				$spdifMode.children('li:eq(0)').text(" ");
				$spdifMode.children('li:eq(2)').text(soundModule.spdifModeList[num + 1]);
				break;
			case 1:
				$spdifMode.children('li:eq(1)').text(soundModule.spdifModeList[num]);
				$spdifMode.children('li:eq(0)').text(soundModule.spdifModeList[num - 1]);
				$spdifMode.children('li:eq(2)').text(soundModule.spdifModeList[num + 1]);
				break;
			case 2:
				$spdifMode.children('li:eq(1)').text(soundModule.spdifModeList[num]);
				$spdifMode.children('li:eq(0)').text(soundModule.spdifModeList[num - 1]);
				$spdifMode.children('li:eq(2)').text(" ");
				break;
			default:
				break;
		}
		//[set]此处需要num对应的mode传到底层
		JS_AudioManager.set_SpdifOutMode(num);
	}

	function setEq120(num) {
		$eq120.css('width', 2 * num + 'px');
		$eq120Num.text(num);
		//[set]此处需要向底层传数据，让底层把Equalizer 120Hz对应的值该为num
		JS_AudioManager.set_EqBand120HZ(num);	
	}

	function setEq500(num) {
		$eq500.css('width', 2 * num + 'px');
		$eq500Num.text(num);
		//[set]此处需要向底层传数据，让底层把Equalizer 500Hz对应的值该为num
		JS_AudioManager.set_EqBand500HZ(num);	
	}

	function setEq1500(num) {
		$eq1500.css('width', 2 * num + 'px');
		$eq1500Num.text(num);
		//[set]此处需要向底层传数据，让底层把Equalizer 1500Hz对应的值该为num
		JS_AudioManager.set_EqBand1500HZ(num);	
	}

	function setEq5k(num) {
		$eq5k.css('width', 2 * num + 'px');
		$eq5kNum.text(num);
		//[set]此处需要向底层传数据，让底层把Equalizer 5kHz对应的值该为num
		JS_AudioManager.set_EqBand5KHZ(num);	
	}

	function setEq10k(num) {
		$eq10k.css('width', 2 * num + 'px');
		$eq10kNum.text(num);
		//[set]此处需要向底层传数据，让底层把Equalizer 10kHz对应的值该为num
		JS_AudioManager.set_EqBand10KHZ(num);	
	}

	function setEqBand(soundModeCol,soundModeSettingStr){	
		var soundModeSettingJSON = JSON.parse(soundModeSettingStr);
			console.log("soundModeCol ="+soundModeCol);
			eq120 = soundModeSettingJSON.SoundModeSetting[soundModeCol].eqband1;
			eq500 = soundModeSettingJSON.SoundModeSetting[soundModeCol].eqband2;
			eq1500 = soundModeSettingJSON.SoundModeSetting[soundModeCol].eqband3;
			eq5k = soundModeSettingJSON.SoundModeSetting[soundModeCol].eqband4;
			eq10k = soundModeSettingJSON.SoundModeSetting[soundModeCol].eqband5;

			setEq120(eq120);
			setEq500(eq500);
			setEq1500(eq1500);
			setEq5k(eq5k);
			setEq10k(eq10k);			
	}


	function setDefault(soundModeCol) {
		
		switch (soundModeCol) {
			case 0:
				$eq120.css('width', '100px');
				$eq500.css('width', '100px');
				$eq1500.css('width', '100px');
				$eq5k.css('width', '100px');
				$eq10k.css('width', '100px');
				
				$eq120Num.text("50");
				$eq500Num.text("50");
				$eq1500Num.text("50");
				$eq5kNum.text("50");
				$eq10kNum.text("50");				
				break;
			case 1:
				$eq120.css('width', '182px');
				$eq500.css('width', '100px');
				$eq1500.css('width', '52px');
				$eq5k.css('width', '116px');
				$eq10k.css('width', '182px');

				$eq120Num.text("91");
				$eq500Num.text("50");
				$eq1500Num.text("26");
				$eq5kNum.text("58");
				$eq10kNum.text("91");
				break;
			case 2:
				$eq120.css('width', 2 * 75 + 'px');
				$eq500.css('width', 2 * 26 + 'px');
				$eq1500.css('width', 2 * 26 + 'px');
				$eq5k.css('width', 2 * 91 + 'px');
				$eq10k.css('width', 2 * 75 + 'px');
				
				$eq120Num.text("75");
				$eq500Num.text("26");
				$eq1500Num.text("26");
				$eq5kNum.text("91");
				$eq10kNum.text("75");
				break;
			case 3:
				$eq120.css('width', 2 * 26 + 'px');
				$eq500.css('width', 2 * 26 + 'px');
				$eq1500.css('width', 2 * 83 + 'px');
				$eq5k.css('width', 2 * 83 + 'px');
				$eq10k.css('width', 2 * 50 + 'px');
				
				$eq120Num.text("26");
				$eq500Num.text("26");
				$eq1500Num.text("83");
				$eq5kNum.text("83");
				$eq10kNum.text("50");
				break;
			case 4:
				setEq120(eq120);
				setEq500(eq500);
				setEq1500(eq1500);
				setEq5k(eq5k);
				setEq10k(eq10k);
				break;
			default:
				break;
		}

	}



	//按键相应
	$(document).keydown(function(event) {
		/* Act on the event */
		codeKey = event.keyCode;

		if (codeKey === numKeyDown) {
			if (selectedRow === (menuLength - 1)) {
				selectedRow = 0;
			} else {
				selectedRow++;
			}
			isSelected(selectedRow);
		} else if (codeKey === numKeyUp) {
			if (selectedRow === 0) {
				selectedRow = menuLength - 1;
			} else {
				selectedRow--;
			}
			isSelected(selectedRow);
		} else if (codeKey === numKeyRight) {
			switch (selectedRow) {
				case 0:
					if (spdifModeCol >= 0 && spdifModeCol < (spdifModeListLength - 1))
						spdifModeCol++;
					setSpdifMode(spdifModeCol);
					break;
				case 1:
					if (audioVolume >= 0 && audioVolume < 100) {
						audioVolume++;
					}
					setAudioVolume(audioVolume);
					break;
				case 2:
					if (earVolume >= 0 && earVolume < 100) {
						earVolume++;
					}
					setEarVolume(earVolume);
					break;
				case 3:
					if (muteFlag === false) {
						setMute(FLAG_ON);
						muteFlag = FLAG_ON;
					}
					break;
				case 4:
					if (treble >= 0 && treble < 100) {
						treble++;
					}
					setTreble(treble);
					break;
				case 5:
					if (balance >= 0 && balance < 100) {
						balance++;
					}
					setBalance(balance);
					break;
				case 6:
					if (avcFlag === false) {
						setAvc(FLAG_ON);
						avcFlag = FLAG_ON;
					}
					break;
				case 7:
					if (srdFlag === false) {
						setSrd(FLAG_ON);
						srdFlag = FLAG_ON;
					}
					break;
				case 8:
					if (autoVolFlag === false) {
						setAutoVol(FLAG_ON);
						autoVolFlag = FLAG_ON;
					}
					break;
				case 9:
					if (audioTypeCol >= 0 && audioTypeCol < (audioTypeListLength - 1))
						audioTypeCol++;
					setAudioType(audioTypeCol);
					break;
				case 10:
					if (DRCFlag === 0) {
						setDRC(FLAG_ON);
						DRCFlag = FLAG_ON;
					}
					break;
				case 11:
					if (spdifDelay >= 0 && spdifDelay < 25) {
						spdifDelay++;
					}
					setSpdifDelay(spdifDelay);
					break;
				case 12:
					if (speakerDelay >= 0 && speakerDelay < 25) {
						speakerDelay++;
					}
					setSpeakerDelay(speakerDelay);
					break;
				case 13:
					if (soundModeCol >= 0 && soundModeCol < (soundModeListLength - 1))
						soundModeCol++;
					setSoundMode(soundModeCol);
					setEqBand(soundModeCol,soundModeSettingStr);
					break;
				case 14:
					if (eq120 >= 0 && eq120 < 100) {
						eq120++;
					}
					setEq120(eq120);
					break;
				case 15:
					if (eq500 >= 0 && eq500 < 100) {
						eq500++;
					}
					setEq500(eq500);
					break;
				case 16:
					if (eq1500 >= 0 && eq1500 < 100) {
						eq1500++;
					}
					setEq1500(eq1500);
					break;
				case 17:
					if (eq5k >= 0 && eq5k < 100) {
						eq5k++;
					}
					setEq5k(eq5k);
					break;
				case 18:
					if (eq10k >= 0 && eq10k < 100) {
						eq10k++;
					}
					setEq10k(eq10k);
					break;
				default:
					break;
			}
		} else if (codeKey === numKeyLeft) {
			switch (selectedRow) {
				case 0:
					if (spdifModeCol > 0 && spdifModeCol <= (spdifModeListLength - 1))
						spdifModeCol--;
					setSpdifMode(spdifModeCol);
					break;
				case 1:
					if (audioVolume > 0 && audioVolume <= 100) {
						audioVolume--;
					}
					setAudioVolume(audioVolume);
					break;
				case 2:
					if (earVolume > 0 && earVolume <= 100) {
						earVolume--;
					}
					setEarVolume(earVolume);
					break;
				case 3:
					if (muteFlag === true) {
						setMute(FLAG_OFF);
						muteFlag = FLAG_OFF;
					}
					break;
				case 4:
					if (treble > 0 && treble <= 100) {
						treble--;
					}
					setTreble(treble);
					break;
				case 5:
					if (balance > 0 && balance <= 100) {
						balance--;
					}
					setBalance(balance);
					break;
				case 6:
					if (avcFlag === true) {
						setAvc(FLAG_OFF);
						avcFlag = FLAG_OFF;
					}
					break;
				case 7:
					if (srdFlag === true) {
						setSrd(FLAG_OFF);
						srdFlag = FLAG_OFF;
					}
					break;
				case 8:
					if (autoVolFlag === true) {
						setAutoVol(FLAG_OFF);
						autoVolFlag = FLAG_OFF;
					}
					break;
				case 9:
					if (audioTypeCol > 0 && audioTypeCol <= (audioTypeListLength - 1))
						audioTypeCol--;
					setAudioType(audioTypeCol);
					break;
				case 10:
					if (DRCFlag === 1) {
						setDRC(FLAG_OFF);
						DRCFlag = FLAG_OFF;
					}
					break;
				case 11:
					if (spdifDelay > 0 && spdifDelay <= 25) {
						spdifDelay--;
					}
					setSpdifDelay(spdifDelay);
					break;
				case 12:
					if (speakerDelay > 0 && speakerDelay <= 100) {
						speakerDelay--;
					}
					setSpeakerDelay(speakerDelay);
					break;
				case 13:
					if (soundModeCol > 0 && soundModeCol <= (soundModeListLength - 1))
						soundModeCol--;
					setSoundMode(soundModeCol);
					setEqBand(soundModeCol,soundModeSettingStr);
					break;
				case 14:
					if (eq120 > 0 && eq120 <= 100) {
						eq120--;
					}
					setEq120(eq120);
					break;
				case 15:
					if (eq500 > 0 && eq500 <= 100) {
						eq500--;
					}
					setEq500(eq500);
					break;
				case 16:
					if (eq1500 > 0 && eq1500 <= 100) {
						eq1500--;
					}
					setEq1500(eq1500);
					break;
				case 17:
					if (eq5k > 0 && eq5k <= 100) {
						eq5k--;
					}
					setEq5k(eq5k);
					break;
				case 18:
					if (eq10k > 0 && eq10k <= 100) {
						eq10k--;
					}
					setEq10k(eq10k);
					break;
				default:
					break;
			}
		}
		//判断是否为User模式，不是的话，后面五项不可用
		if (soundModeCol === 4) {
			menuLength = $menu.children("li").length;
			$eq120.removeClass('isDisabled');
			$eq500.removeClass('isDisabled');
			$eq1500.removeClass('isDisabled');
			$eq5k.removeClass('isDisabled');
			$eq10k.removeClass('isDisabled');

			$eq120Num.removeClass('isDisabled-text');
			$eq500Num.removeClass('isDisabled-text');
			$eq1500Num.removeClass('isDisabled-text');
			$eq5kNum.removeClass('isDisabled-text');
			$eq10kNum.removeClass('isDisabled-text');

			$120.removeClass('isDisabled-text');
			$500.removeClass('isDisabled-text');
			$1500.removeClass('isDisabled-text');
			$5k.removeClass('isDisabled-text');
			$10k.removeClass('isDisabled-text');

		} else {
			menuLength = $menu.children("li").length - 5;
			$eq120.addClass('isDisabled');
			$eq500.addClass('isDisabled');
			$eq1500.addClass('isDisabled');
			$eq5k.addClass('isDisabled');
			$eq10k.addClass('isDisabled');

			$eq120Num.addClass('isDisabled-text');
			$eq500Num.addClass('isDisabled-text');
			$eq1500Num.addClass('isDisabled-text');
			$eq5kNum.addClass('isDisabled-text');
			$eq10kNum.addClass('isDisabled-text');

			$120.addClass('isDisabled-text');
			$500.addClass('isDisabled-text');
			$1500.addClass('isDisabled-text');
			$5k.addClass('isDisabled-text');
			$10k.addClass('isDisabled-text');
		}


		//setDefault(soundModeCol);
	});
});