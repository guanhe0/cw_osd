// JavaScript Document
$(function(){
	var curLeft=0,curRight=0,curCol=0;
	var $left=$("#js_left");
	var $right=$("#js_right");
	function setLeftStyle(){
		$left.children("li").removeClass("li-selected");
		$left.children("li:eq("+curLeft+")").addClass("li-selected").removeClass("li-current");
	}
	setLeftStyle();
	function showRight(){
		$right.children("ul").hide();
		$right.children("ul:eq("+curLeft+")").show();
	}
	showRight();
	function removeLeftStyle(){
		$left.children("li:eq("+curLeft+")").addClass("li-current");
		$left.children("li:eq("+curLeft+")").removeClass("li-selected");
	}
	function setRightStyle(){
		$right.children("ul:eq("+curLeft+")").children("li").removeClass("li-selected");
		$right.children("ul:eq("+curLeft+")").children("li:eq("+curRight+")").addClass("li-selected");
	}
	function removeRightStyle(){
		$right.children("ul:eq("+curLeft+")").children("li").removeClass("li-selected");
		curRight=0;
	}
	$(document).keydown(function(event){
		var leftLength=$left.children("li").length;
		var rightLength=$right.children("ul:eq("+curLeft+")").children("li").length;
		var keyCode=event.keyCode;
		if(keyCode===numKeyDown){
			switch(curCol){
				case(0):
					if(curLeft===leftLength-1){
						curLeft=0;
					}else{
						curLeft++;
					}
					setLeftStyle();
					showRight();
					break;
				case(1):
					if(curRight===rightLength-1){
						curRight=0;
					}else{
						curRight++;
					}
					setRightStyle();
					break;
			}
		}
		else if(keyCode===numKeyUp){
			switch(curCol){
				case(0):
					if(curLeft===0){
						curLeft=leftLength-1;
					}else{
						curLeft--;
					}
					setLeftStyle();
					showRight();
					break;
				case(1):
					if(curRight===0){
						curRight=rightLength-1;
					}else{
						curRight--;
					}
					setRightStyle();
					break;
			}
		}
		else if(keyCode===numKeyRight){
			switch(curCol){
				case(0):
					removeLeftStyle();
					setRightStyle();
					curCol++;
					break;
			}
		}
		else if(keyCode===numKeyLeft){
			switch(curCol){
				case(1):
					setLeftStyle();
					removeRightStyle();
					curCol--;
					break;
			}
		}
		else if(keyCode===numKeyEnter){
			if($(".li-selected").data("url")!=null){
				location.href=$(".li-selected").data("url");
				
			}
		}
	});
});