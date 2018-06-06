// JavaScript Document
/*******************
*Copyright:Skyworth
*Author:jever
*Data:2015-12-04
*Description: common  js  functions file ,call this in each html document
**********************/

/*
*load  kinds of language file
*@param  <String>  filename     file  which  need to be introduced  ;
* how to use:   add to your js code
*/
//keyboard  number 
var numKeyLeft=37;
var numKeyUp=38;
var numKeyRight=39;
var numKeyDown=40;
var numKeyEnter=13;
var numKeyBack=461;
var numKey={};
numKey.left=37;
numKey.up=38;
numKey.right=39;
numKey.down=40;
numKey.enter=13;
numKey.back=461;
//数字键
numKey.zero=48;
numKey.one=49;
numKey.two=50;
numKey.three=51;
numKey.four=52;
numKey.five=53;
numKey.six=54;
numKey.seven=55;
numKey.eight=56;
numKey.nine=57;
numKey.hyphen = 189;
numKey.home = 116;
numKey.red=403;
numKey.green=404;
numKey.yellow=405;
numKey.blue=406;
numKey.channelup=427;
numKey.channeldown=428;
numKey.source=104;

function  loadLanguageFile(fileName){
    var path = arguments[1]?arguments[1]:"../"
	var language = 'en';
	var strLanguage = "<script src='"+path+"common/language/"+language+"/"+fileName+"' ></script>";
	document.write(strLanguage);
}

function loadJsFileByPath(filePath,func) {
  var scriptTag = document.getElementById("js_common");
  var oScript = document.createElement("script");
  oScript.type = "text/javascript";
  oScript.src = filePath + ".js";
  insertAfter(oScript,scriptTag,func);
}

function insertAfter(newelement, targetelement,func) {
  var parent = targetelement.parentNode;
  if (parent.lastChild == targetelement) {
    parent.a(newelement);
  } else {
    parent.insertBefore(newelement, targetelement.nextSibling);
  }
   newelement.onload = newelement.onreadystatechange = function(){
    if(!this.readyState || this.readyState == "loaded" || this.readyState == "complete"){
      func();
    }
    newelement.onload = newelement.onreadystatechange = null;
  }
}

//获取js文件
//调用形式  loadJsFile(fileName,fileNum,scriptId,[filePath])
function loadJsFile(fileName,scriptId){
		// var filePath=arguments[3]?arguments[3]:"./data/";
    var filePath = "";
    if(typeof(arguments[2]) === "string"){
      filePath=arguments[2]
    }else {
		  filePath="../../data/channel/";
      // filePath="./data/";
    }
    var callBack = arguments[arguments.length-1];
		fileName=filePath+fileName;
    var oHead = document.getElementsByTagName('HEAD').item(0);
		var scriptTag=document.getElementById(scriptId);
    oHead.removeChild(scriptTag);
		//scriptTag.remove();
		var oScript= document.createElement("script"); 
		oScript.type = "text/javascript"; 
		oScript.id=scriptId;
		oScript.src=fileName+".js"; 
		oHead.appendChild(oScript); 
    if(typeof(callBack) == "function"){
       oScript.onload = oScript.onreadystatechange = function() { 
        if (oScript.readyState && oScript.readyState != 'loaded' && oScript.readyState != 'complete') 
            return; 
        oScript.onreadystatechange = oScript.onload = null; 
        callBack(); 
      }; 
    }
}

function loadDataJsFile(name,module){
	var path="../../settings/"+module+"/"+name+".js";
	var strPath="<script src='"+path+"'></script>";
	alert(strPath);
	document.write(strPath);
}
$(document).keydown(function(event) {
	var codeKey = event.keyCode;
	if(codeKey === numKey.back)
    history.go(-1);
	//else if(codeKey===numKey.down) alert("fa");
});
function getLastMonthDay(year,month){    
               var   firstdate = year + '-' + month + '-01';  
               var  day = new Date(year,month,0);   
               var lastdate =day.getDate();//获取当月最后一天日期    
  //给文本控件赋值。同下  
               return lastdate;  
}  

//根据键值获取数组元素存入新数组
function  getKeysArray(arr1,keyarr){
	var newArr=new Array();
	for(var i=0;i<keyarr.length;i++){
		newArr.push(arr1[keyarr[i]]);
	}
	return newArr;
}
jQuery.fn.extend({
  shakeTop:function(){
    $(this).animate({ 
        marginTop: -10,
		marginBottom:10,
        opacity:0.8
      }, 100 ).animate({ 
        marginTop: 0,
		marginBottom:0,
        opacity:0.9
      }, 100 ).animate({ 
	  	marginTop:10,
        marginBottom: -10,
        opacity:1
      }, 100).animate({ 
	  	marginTop:0,
        marginBottom: 0,
        opacity:1
      }, 100 );
  }
});
/***
* @param {string} cookieName Cookie名称
* @param {string} cookieValue Cookie值
* @param {number} time Cookie过期时间，秒为单位
*/
function SetCookie(cookieName,cookieValue,time) {
    /*当前日期*/
    var today = new Date();
    /*Cookie过期时间*/
    var expire = new Date();
    /*如果未设置nDays参数或者nDays为0，取默认值1*/
    if(time == null || time == 0) time = 60;
    /*计算Cookie过期时间*/
    expire.setTime(today.getTime() + 1000*time );
    /*设置Cookie值*/
    document.cookie = cookieName + "=" + escape(cookieValue)
        + ";expires=" + expire.toGMTString();
}
/***
*读取指定的Cookie值
*@param {string} cookieName Cookie名称
*/
function ReadCookie(cookieName) {
    var theCookie = "" + document.cookie;
    var ind = theCookie.indexOf(cookieName);
    if(ind==-1 || cookieName=="") return "";
    var ind1 = theCookie.indexOf(';',ind);
    if(ind1==-1) ind1 = theCookie.length;
    /*读取Cookie值*/
    return unescape(theCookie.substring(ind+cookieName.length+1,ind1));
}

/***
*从json数组中查找，并返回对象
*@param {string} cookieName Cookie名称
*/
function getObjectArrayIndex(arr,key,val){
  for(var i in arr){
    if(arr[i][key]==val) return arr[i];
  }
}

/***
*从json数组中查找，并返回对象
*@param {string} cookieName Cookie名称
*/
function getObjectArrayIndex(arr,key,val){
  for(var i in arr){
    if(arr[i][key]==val) return arr[i];
  }
}
/*
修改img标签的图片地址
@param  $object  图片对象
@param type   默认0，为0时添加字符，其他时减去字符
@param addstr  默认 ‘-s’ 
 */
function loadNewImg($object){
  if($object.length>0){
    var srcStr=$object.attr('src');
    var format=srcStr.substr(-4);
    var type=arguments[1]?arguments[1]:0;
    var addStr=arguments[2]?arguments[2]:'-s';

    var imgArr=Array();
    var imgStr="";
    if(type===0){
     if(srcStr.indexOf(addStr+'.')>0){
      imgStr=srcStr;
     }else {
      imgArr=srcStr.split(format);
      imgStr=imgArr[0]+addStr+format;
    }
    }else{
      if(srcStr.indexOf(addStr+'.')>0){
        imgArr=srcStr.split(addStr+'.');
        imgStr=imgArr[0]+format;
      }else imgStr=srcStr;
    }
    $object.attr({
       src: imgStr
    });
  }
}
function loadNewBgImg($object){
  if($object.length>0){
    var srcStr=$object.css("backgroundImage");
    var format=srcStr.substr(-5);
    var type=arguments[1]?arguments[1]:0;
    var addStr=arguments[2]?arguments[2]:'-s';

    var imgArr=Array();
    var imgStr="";
    if(type===0){
     if(srcStr && srcStr.indexOf(addStr+'.')>0){
      imgStr=srcStr;
     }else {
      imgArr=srcStr.split(format);
      imgStr=imgArr[0]+addStr+format;
    }
    }else{
      if(srcStr && srcStr.indexOf(addStr+'.')>0){
        imgArr=srcStr.split(addStr+'.');
        imgStr=imgArr[0]+format;
      }else imgStr=srcStr;
    }
    $object.css({
       "backgroundImage": imgStr
    });
  }
}

/*
**获取地址栏传递的参数值
*@param key  参数的名字
 */
function getUrlValue(key){
  var str=location.search;
  var arr=str.split(key+'=');
  if(arr[1]  && arr[1].indexOf('&')>0){
    arr=arr[1].split('&');
    arr=arr[0];
  }else arr=arr[1];
  return arr;
}
Date.prototype.Format=function(fmt) {           
    var o = {           
    "M+" : this.getMonth()+1, //月份           
    "d+" : this.getDate(), //日           
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时           
    "H+" : this.getHours(), //小时           
    "m+" : this.getMinutes(), //分           
    "s+" : this.getSeconds(), //秒           
    "q+" : Math.floor((this.getMonth()+3)/3), //季度           
    "S" : this.getMilliseconds() //毫秒           
    };           
    var week = {           
    "0" : "/u65e5",           
    "1" : "/u4e00",           
    "2" : "/u4e8c",           
    "3" : "/u4e09",           
    "4" : "/u56db",           
    "5" : "/u4e94",           
    "6" : "/u516d"          
    };           
    if(/(y+)/.test(fmt)){           
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));           
    }           
    if(/(E+)/.test(fmt)){           
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);           
    }           
    for(var k in o){           
        if(new RegExp("("+ k +")").test(fmt)){           
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));           
        }           
    }           
    return fmt;           
}       