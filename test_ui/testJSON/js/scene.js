

$(function(){ 
$("#btn").click(function(){
var $audio = $("#audio"); 
//var audioHtml = obj2string(getSoundSettingObject());//存储数据的变量
$audio.html("audioHtml");//显示处理后的数据

var $scene = $("#scene");
var sceneHtml = obj2string(getSceneObject(1));
$scene.html(sceneHtml);
})
})

var SourceList = ["VGA","ATV","CVBS","SVIDEO","YPBPR","SCART1","SCART2","HDMI","HDMI2",
					"HDMI3","HDMI4","DTV","USB"];
var TableNameList= ["Table1","Table2","Table3","Table4","User"];

function getSceneObject(SourceIndex)
{
	switch(SourceIndex)
	{
		case 0:
			return sceneTable_VGA;
		case 1:
			return sceneTable_ATV;
		case 2:
			return sceneTable_CVBS;
		case 3:
			return sceneTable_SVIDEO;
		case 4:
			return sceneTable_YPBPR;
		case 5:
			return sceneTable_SCART1;
		case 6:
			return sceneTable_SCART2;
		case 7:
			return sceneTable_SCART3;
		case 8:
			return sceneTable_HDMI;
		case 9:
			return sceneTable_HDMI2;
		case 10:
			return sceneTable_HDMI3;
		case 11:
			return sceneTable_HDMI4;
		case 12:
			return sceneTable_DTV;
		case 13:
			return sceneTable_USB;
	}	
}

function getPictureSettingObject(SourceIndex)
{
	//picture里面的对象
	switch(SourceIndex)
	{
		case 0:
			return pictureSetting_VGA;
		case 1:
			return pictureSetting_ATV;
		case 2:
			return pictureSetting_CVBS;
		case 3:
			return pictureSetting_SVIDEO;
		case 4:
			return PictureSetting_YPBPR;
		case 5:
			return PictureSetting_SCART1;
		case 6:
			return PictureSetting_SCART2;
		case 7:
			return PictureSetting_SCART3;
		case 8:
			return PictureSetting_HDMI;
		case 9:
			return PictureSetting_HDMI2;
		case 10:
			return PictureSetting_HDMI3;
		case 11:
			return PictureSetting_HDMI4;
		case 12:
			return PictureSetting_DTV;
		case 13:
			return PictureSetting_USB;
	}
}

function getSoundSettingObject()
{
	//audio.js里面的对象
	return soundSetting;
}

function obj2string(o){ 
 var r=[]; 
 if(typeof o=="string"){ 
  return "\""+o.replace(/([\'\"\\])/g,"\\$1").replace(/(\n)/g,"\\n").replace(/(\r)/g,"\\r").replace(/(\t)/g,"\\t")+"\""; 
 } 
 if(typeof o=="object"){ 
  if(!o.sort){ 
   for(var i in o){ 
    r.push(i+":"+obj2string(o[i])); 
   } 
   if(!!document.all&&!/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)){ 
    r.push("toString:"+o.toString.toString()); 
   } 
   r="{"+r.join()+"}"; 
  }else{ 
   for(var i=0;i<o.length;i++){ 
    r.push(obj2string(o[i])) 
   } 
   r="["+r.join()+"]"; 
  } 
  return r; 
 } 
 return o.toString(); 
}