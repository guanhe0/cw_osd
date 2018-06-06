// JavaScript Document
//loadLanguageFile("picture.js");
$(document).ready(function(){
		var ccMode=["On","Off","On and Mute","invalid"];
		var baseStation=["None","CC1","CC2","CC3","CC4","Text1","Text2","Text3","Text4"];
		var advance=["Off","Service1","Service2","Service3","Service4","Service5","Service6"];
		var curCCMode=2;//获取ccmode 的index
		var curBaseStation=1;//获取当前的basestation的index
		var curAdvance=3;//获取当前的advance的index
		
		$(".li-left:eq(0)").text(ccMode[curCCMode]);
		$(".li-left:eq(1)").text(baseStation[curBaseStation]);
		$(".li-left:eq(2)").text(advance[curAdvance]);
		/**设置字符串数组改变的函数
		**@param arr  变换的数组
		**@param index 当前的数组index
		**@param obj  当前的html节点对象
		**@param  左右键操作 默认右键为0，左键传参1
		**/
		function setArrayChange(arr,index,obj){
			var type = arguments[3]?arguments[3]:0;//设置type 默认值为0，默认为右键操作
			if(type === 0){
				if(index===arr.length-1){
					index=0;
				}else index++;
			}else{
				if(index===0){
					index=arr.length-1;
				}else index--;
			}
			obj.text(arr[index]);
			return index;
		}
		
		$(document).keydown(function(event){
			var keyCode=event.keyCode;
			if(keyCode===numKeyRight){
				if(curRow===0){
					curCCMode=setArrayChange(ccMode,curCCMode,$(".li-left:eq(0)"));
				}else if(curRow===1){
					curBaseStation=setArrayChange(baseStation,curBaseStation,$(".li-left:eq(1)"));
				}else{
					curAdvance=setArrayChange(advance,curAdvance,$(".li-left:eq(2)"));
				}
			}else if(keyCode===numKeyLeft){
				if(curRow===0){
					curCCMode=setArrayChange(ccMode,curCCMode,$(".li-left:eq(0)"),1);
				}else if(curRow===1){
					curBaseStation=setArrayChange(baseStation,curBaseStation,$(".li-left:eq(1)"),1);
				}else{
					curAdvance=setArrayChange(advance,curAdvance,$(".li-left:eq(2)"),1);
				}
			}
		});
});
	
