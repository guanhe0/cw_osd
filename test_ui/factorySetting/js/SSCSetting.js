// JavaScript Document
//loadLanguageFile("picture.js");
$(document).ready(function(){
		//获SSC数组
		var SSC=[
			1,24,0,20,0,0,352,200
		];
		//设置默认的值
		function setDefault(){
			for(var i in SSC){
				if(i==0 || i==5){
					if(SSC[i]==0) $(".li-left:eq("+i+")").text("Off");
					else  $(".li-left:eq("+i+")").text("On");
				}else{
					$(".li-left:eq("+i+")").text(SSC[i]);
				}
			}
		}
		
		setDefault();
		
		$(document).keydown(function(event){
			var keyCode=event.keyCode;
			var returnValue;
			if(keyCode===numKeyRight){
				if(curRow===0 || curRow ===5){
					returnValue=setOnOffChange();//设置后台接口的值
				}else if((curRow>0 && curRow<5)  || curRow>5 ){
					returnValue=setNumChange(0);
				}
			}else if(keyCode===numKeyLeft){
				if(curRow===0 || curRow ===5){
					returnValue=setOnOffChange();//设置后台接口的值
				}else if((curRow>0 && curRow<5)  || curRow>5 ){
					returnValue=setNumChange(1);
				}
			}
		});
});
	
