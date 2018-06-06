// JavaScript Document
//loadLanguageFile("picture.js");
$(document).ready(function(){
		//获SSC数组
		var VIF=[
			3,0x7000,0x6a00,0xd4,0,0x3,0xc,0x4,0x7,0x5,0x8,0x20,0x500,0,0x0,0,0x750
		];
		//设置默认的值
		function setDefault(){
			for(var i in VIF){
				if(i==0  || i==4 || i==13 || i==15){
					$(".li-left:eq("+i+")").text(VIF[i]);
				}else{
					$(".li-left:eq("+i+")").text("0x"+VIF[i].toString(16));
				}
			}
		}
		
		setDefault();
		
		$(document).keydown(function(event){
			var keyCode=event.keyCode;
			var returnValue;
			if(keyCode===numKeyRight){
				if(curRow===0 || curRow ===4 || curRow===13 || curRow ===15){
					returnValue=setNumChange(0);//设置后台接口的值
				}else{
					returnValue=setHexChange(0);
				}
			}else if(keyCode===numKeyLeft){
				if(curRow===0 || curRow ===4 || curRow===13 || curRow ===15){
					returnValue=setNumChange(1);//设置后台接口的值
				}else{
					returnValue=setHexChange(1);
				}
			}
		});
});
	
