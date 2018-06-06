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
var numKeyBack=8;
var numKey={};
numKey.left=37;
numKey.up=38;
numKey.right=39;
numKey.down=40;
numKey.enter=13;
numKey.back=8;
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
numKey.hyphen=189;

function  loadLanguageFile(fileName){
	var language = 'en';
	var strLanguage = "<script src='../common/language/"+language+"/"+fileName+"' ></script>";
	document.write(strLanguage);
}
$(document).keydown(function(event) {
	var codeKey = event.keyCode;
	//if(codeKey === numKeyBack)  alert("back");
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
        opacity:0.8,
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
        opacity:1,
      }, 100 );
  },
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
