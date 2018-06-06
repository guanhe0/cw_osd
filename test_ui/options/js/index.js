// JavaScript Document
//loadLanguageFile("picture.js");
var curRow=0;
$(document).ready(function(){
		var $picList= $("#js_list");
		function setLiStyle(){
			$picList.children("li").removeClass("content-li-selected");
			$picList.children("li:eq("+curRow+")").addClass("content-li-selected");
		}
		setLiStyle();
		$(document).keydown(function(event){
			var keyCode=event.keyCode;
			if(keyCode===numKeyDown){
				if(curRow===$("#js_list").children("li").length-1){
					curRow=0;
				}else curRow++;
				setLiStyle();
			}
			else if(keyCode===numKeyUp){
				if(curRow===0){
					curRow=$("#js_list").children("li").length-1;
				}else curRow--;
				setLiStyle();
			}else if(keyCode === numKeyEnter){
				if($(".content-li-selected").data('url')!=null){
					location.href=$(".content-li-selected").data('url');
				}
			}
		});
});
//设置数值行的改变
function setNumChange(){
	var type = arguments[0]?arguments[0]:0;
	var row = arguments[1]?arguments[1]:curRow;
	var maxNum = arguments[2]?arguments[2]:0;
	var num=parseInt($(".li-left:eq("+row+")").text());
	if(type===0){
		if(maxNum!==0 && maxNum===num){
			return false;
		}
		else num++;
	}else{
		if(num===0) return false;
		num--;
	}
	$(".li-left:eq("+row+")").text(num);
	return num;
}
function setHexChange(type){
	var num=parseInt($(".li-left:eq("+curRow+")").text());
	if(type===0){
		num++;
	}else{
		if(num===0) return false;
		num--;
	}
	$(".li-left:eq("+curRow+")").text("0x"+num.toString(16));
	return num;
}
//设置On Off行值的改变
function setOnOffChange(){
	var onOff=$(".li-left:eq("+curRow+")").text();
	var value=0;
	if(onOff=="On"){
		$(".li-left:eq("+curRow+")").text("Off");
	}
	else{
		$(".li-left:eq("+curRow+")").text("On");
		value=1;
	}
	return value;
}
//字符串转换成16进制
function stringToHex(str){
　　　　var val="";
　　　　for(var i = 0; i < str.length; i++){
　　　　　　if(val == "")
　　　　　　　　val = str.charCodeAt(i).toString(16);
　　　　　　else
　　　　　　　　val += "," + str.charCodeAt(i).toString(16);
　　　　}
　　　　return val;
}
//16进制转换成字符串
function hexToString(str){
　　　　var val="";
　　　　var arr = str.split(",");
　　　　for(var i = 0; i < arr.length; i++){
　　　　　　val += arr[i].fromCharCode(i);
　　　　}
　　　　return val;
}