// JavaScript Document
var picture={
	arrMenuList:[
		"Picture Mode",
		"Color Temperature",
		"Aspect Ratio",
		"Noise Reduction",
		"MPEG Noise Reduction",
		"Dynamic Contrast",
		"Film Mode",
	],
	arrPictureList:[
		"Picture Mode",
		"Contrast",
		"Brightness",
		"Color",
		"Sharpness",
		"Tint",
		"Backlight"
	],
	arrPictureMode:[
		"Standrad",
		// ** E_PICTURE_MODE_STANDAR
	   "Vivid",
		// ** E_PICTURE_MODE_VIVID
		"Soft",
	   // ** E_PICTURE_MODE_SOFT
	   "User",
	   // **  E_PICTURE_MODE_USER
	   "Game",
	   // **  E_PICTURE_MODE_GAME
	   "Auto",
	   // **  E_PICTURE_MODE_AUTO
	   "Natural",
	   // **  E_PICTURE_MODE_NATURAL
	   "Sports",
	   // **  E_PICTURE_MODE_SPORTS
	   "PC",
	   // **  E_PICTURE_MODE_PC
	   "Dymanic",
	   // **  E_PICTURE_MODE_DYMANIC
	   "Invalid",
	   // **  E_PICTURE_MODE_INVALID
	],
	
	objModeData:[
		[34,45,31,22,77,23],
		[43,43,54,34,56,43],
		[33,44,55,66,77,88],
		
		[],
		[23,54,12,22,77,23],
		[34,45,31,22,77,23],
		
		[34,45,31,22,77,23],
		[43,43,54,34,56,43],
		[33,44,55,66,77,88],
		
		[34,45,31,22,77,23],
		[43,43,54,34,56,43],
	],
	arrColorTempList:[
		"Color",
		"Red",
		"Green",
		"Blue"
	],
	arrColorTempMode:[
		"Medium",
		"Warm",
		"User",
		"Cool",
	],
	arrColorTempParam:[
		[34,54,56],
		[67,45,27],
		[0,0,0],
		[45,34,78],
	],
	arrAspectRatioList:[
		"Default",
		"16:9",
		"4:3",
		"Auto",
		"Movie",
		"Caption",
		"Panorama",
		"Person",
		"Just Scan",
		"P2P",
		"ZOOM1",
		"ZOOM2",
		"Invalid"
	],
	arrNoiseReductionList:[
		"Off",
		"Low",
		"Middle",
		"High",
    	"Auto",
		"Invalid"
	],
	arrMEPGNoiseReductionList:[
		"Off",
		"Low",
		"Middle",
		"High",
    	"Auto",
		"Invalid"
	],
	arrDynamicContrastList:[
		"Off",
		"On",
		"Num"
	],
	arrFilmModeList:[
		"Off",
		"On",
	]
	
};
