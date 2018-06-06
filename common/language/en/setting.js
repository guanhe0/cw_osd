/*******************
 *Copyright:Skyworth
 *Author:shibei
 *Data:2016-02-18
 *Description: all of text is belong to setting.js
 **********************/
var menuBarList = ["Network", "Time", "PVR", "scene", "Advanced"];
var netTypeList = ["Wired Network", "Wi-Fi Network"];
var wiredStateList = ["Network Configuration DHCP", "Network Configuration Static"];
var infoDHCPList = ["IP", "Netmask", "Gateway", "DNS"];

var ON_OFF = ["OFF","ON"];

var timeStr = {
	timeSetting: "Time Setting",
	timeInfoList: ["Current Time", "Time Zone", "Sleep Time", "Daylight Saving", "Auto ON/OFF", "Energy Saving"],
	timeTypeList: ["PM", "24-Hour Time", "AM"],
	timeAutoList: ["Auto", "Manual"],
	editTitleList: ["Hour", "Minute", "Date", "Month", "Year"],
	weekDaysList: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thuesday", "Friday", "Saturday"],
	ON_OFF:["OFF","ON"],
	sleepTimeList:["OFF","10min","20min","30min","60min","90min","120min","180min","240min","360min","480min"]
};

var advancedStr = {
	advancedMenuList : ["Picture","Sound","Channel Search","EWS Local Postal Codes","Countries/Regions",
	"Language","Sky Link","Ginga Application","Closed Caption","Restore Default","Store Mode","SW Update"],
	pictureMenuList : ["Picture Setting","Color Temperature","Backlight","Aspect Ratio","SkyMode"],
	pictureSettingList : ["Brigtness","Contrast","Color","Tint","Sharpness"],
	colorTemperatureList : ["Standard","Cool","Warm"],
	backlight : "Backlight",
	aspectRatioList : ["16:9","4:3","Movie","Full Screen","Caption","Panorama","Dot By Dot"],
	skyModeList : ["MEMC","DNR/NR","DLC","Cinema Model","Game Model","Local Dimming"],
	skyModeStateList : ["OFF","Middle","Low","High"],
	soundMenuList:["Bass","Treble","Balance","AD Switch","AVL","Surround","Audio Format","Output"],
	outputList : ["Line Out","Earphone"],
	formatList : ["Auto","PCM"]
};

var countryNameList = [
	"Australia", "Austria", "Belgium", "Bulgaria", "Croatia", "Czech", "Denmark", "Finland", "France", "Germany",
	"Greece", "Hungary", "Italy", "Luxembourg", "Netherland", "Norway", "Poland", "Portugal", "Rumania", "Russia",
	"Serbia", "Slovenia", "Spain", "Sweden", "Switzerland", "UK", "New Zealand", "Arab", "Estonia", "Hebrew",
	"Latvia", "Slovakia", "Turkey", "Ireland", "Japan", "Philippines", "Thailand", "Maldives", "Uruguay", "Peru",
	"Argentina", "Chile", "Venezuela", "Ecuador", "Costarica", "Paraguay", "Bolivia", "Belize", "Nicaragua", "Guatemala",
	"China", "Taiwan", "Brazil", "Canada", "Mexico", "United States", "South Korea", "Fiji", "Uzbek", "Tajikistan",
	"Ethiopia", "Azerbaijan", "South Africa", "Algeria", "Egypt", "Saudi Arabia", "Iran", "Iraq", "Namibia", "Jordan",
	"Kuwait", "Indonesia", "Israel", "Qatar", "Nigeria", "Zimbabwe", "Lithuania", "Morocco", "Tunis", "India",
	"Vietnam", "HongKong", "Colombia", "Malaysia", "Singapore", "Others"
];
var countryZoneList = [
	["Sydney","Lord_Howe","Adelaide","Perth","Eucla"],
	["Vienna"],
	["Brussels"],
	["Sofia"],
	["Zagreb"],
	["Prague"],
	["Copenhagen"],
	["Helsinki"],
	["Paris"],
	["Berlin"],

	["Athens"],
	["Budapest"],
	["Rome"],
	["Luxembourg"],
	["Amsterdam","Curacao"],
	["Oslo"],
	["Warsaw"],
	["Lisbon","Azores"],
	["null"],
	["Kaliningrad","Moscow","Samara","Yekaterinburg","Novosibirsk","Krasnoyarsk","Irkutsk","Yakutsk","Vladivostok","Magadan","Kamchatka"],

	["Belgrade"],
	["Ljubljana"],
	["Madrid","Canary"],
	["Stockholm"],
	["Zurich"],
	["London"],
	["Chatham","Auckland"],
	["Tripoli","Riyadh","Damascus","Dubai"],
	["Tallinn"],
	["null"],

	["Riga"],
	["Bratislava"],
	["Istanbul"],
	["Dublin"],
	["Tokyo"],
	["Manila"],
	["Bangkok"],
	["Maldives"],
	["Montevideo"],
	["Lima"],

	["Buenos_Aires"],
	["Santiago","Easter"],
	["Caracas"],
	["Guayaquil","Galapagos"],
	["Costa_Rica"],
	["Asuncion"],
	["La_Paz"],
	["Belize"],
	["Managua"],
	["Guatemala"],

	["Shanghai"],
	["Taipei"],
	["Noronha","Sao_Paulo","Manaus"],
	["St_Johns","Halifax","Toronto","Winnipeg","Edmonton","Vancouver"],
	["Mexico_City","Chihuahua","Tijuana"],
	["Wake","Johnston","Midway","New_York","Chicago","Denver","Los_Angeles","Anchorage","Honolulu"],
	["Seoul"],
	["Fiji"],
	["Tashkent"],
	["Dushanbe"],

	["Addis_Ababa"],
	["Baku"],
	["Johannesburg"],
	["Algiers"],
	["Cairo"],
	["Riyadh"],
	["Tehran"],
	["Baghdad"],
	["Windhoek"],
	["Amman"],

	["Kuwait"],
	["Jayapura","Makassar","Jakarta"],
	["Jerusalem"],
	["Qatar"],
	["Lagos"],
	["Harare"],
	["Vilnius"],
	["Casablanca"],
	["Tunis"],
	["Calcutta"],

	["Saigon"],
	["Hong_Kong"],
	["Bogota"],
	["Kuala_Lumpur"],
	["Singapore"],
	["Others"]
];