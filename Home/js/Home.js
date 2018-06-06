// JavaScript Document
//loadLanguageFile("picture.js");
$(document).ready(function(){
	
		var curRow = 2;
		var leftCol=0;
		var leftRow=0;
		var rightCol=0;
		var $left=$("#js_left");
		var $test=$("#js_test");
		var rightNum=3;
		
		
		//shibei
		var $menuBar = $("#js_menuBar");
		var menuLength = $("#js_menuBar").children("li").length;
		var titleList = ["User", "Source", "Program", "Cinema", "App", "Search", "Setup"];
	
		isSelected(curRow, 1);
	
	
		function isSelected(num, before) {
			$right=$(".right-ul:eq("+num+")");
			rightCol=0;
			leftCol=0
			$("#js_right").find(".right-selected").removeClass("right-selected");
			
			$right.css({marginLeft:0+"px"});
			$right.find("li div").hide(0);
			//移除所有文字
			$("#js_span").remove();
			//移除所有被选中、消失的动画
			$menuBar.children('li').removeClass('is-selected').removeClass('is-out-selected1').removeClass('is-out-selected2');
			if (before >= 0) {
				//上一个被选中的项的消失动画
				if (num > before) {
					$menuBar.children('li:eq(' + before + ')').addClass('is-out-selected2');
				} else {
					$menuBar.children('li:eq(' + before + ')').addClass('is-out-selected1');
				}
			}
			//被选中的li会出现文字
			$menuBar.children('li:eq(' + num + ')').addClass('is-selected').append('<span id="js_span">' + titleList[curRow] + '</span>');
			//移除所有元素的所有动画
			for (var i = 0; i <= (menuLength - 1); i++) {
				$menuBar.children('li').removeClass('out-move' + i);
				$menuBar.children('li').removeClass('out-move-' + i);
			}
			//根据被选中项的不同，其他块被挤开的动画各自添加
			for (var i = 0; i <= (menuLength - 1); i++) {
				if (i < num && i != before) {
					$menuBar.children('li:eq(' + i + ')').addClass('out-move' + (num - i));
				} else if (i > num && i != before) {
					$menuBar.children('li:eq(' + i + ')').addClass('out-move-' + (i - num));
				}
			}
	
			if (num === 0) {
				$menuBar.css('margin-top', '30px');
			} else if(num === 5){
				$menuBar.css('margin-top', '-100px');
			}else if(num === 6){
				$menuBar.css('margin-top', '-200px');
			}else{
				$menuBar.css('margin-top', '0px');
			}
		}
	
		//选择到顶时
		function topShake() {
			$menuBar.children('li:eq(0)').animate({
					marginTop: 0,
					marginBottom: 15
				}, 100)
				.animate({
					marginTop: 5,
					marginBottom: 10
				}, 500);
		}
	
		//选择到底时
		function bottomeShake() {
			$menuBar.children('li:eq(' + (menuLength - 1) + ')').animate({
					marginTop: 15,
					marginBottom: 5
				}, 100)
				.animate({
					marginTop: 10,
					marginBottom: 10
				}, 500);
		}
		
		
		
		var $right=$(".right-ul:eq("+curRow+")");
		$right.addClass("animated fadeIn");
		var $rightAll=$("#js_right");
		function setRightChange(type){
			$(".right-ul").find("li").children("div").hide();
			$(".right-ul").css({marginLeft:"0px"});
			$right=$(".right-ul:eq("+curRow+")");
			if(type===0){
				$(".right-ul:eq("+(curRow-1)+")").addClass("fadeOut").removeClass("fadeIn");
				$right.removeClass("fadeOut").addClass("animated fadeIn");
			}else{
				$(".right-ul:eq("+(curRow+1)+")").removeClass("fadeIn").addClass("fadeOut");
				$right.removeClass("fadeOut").addClass("animated fadeIn");
			}
			
			if(leftCol!==0){
				$right.children("li").removeClass("right-selected");
				$right.children("li:eq(0)").addClass("right-selected");
			}rightCol=0;
		}
		
		function setRightStyle(type){
			$right=$(".right-ul:eq("+curRow+")");
			
			
			if(type===0){
				if(rightCol<$right.children("li").length-1){
					rightCol++;
				}else return false;
			}else{
				if(rightCol>0){
					rightCol--;
				}else return false;
			}
			
			
			var $curRightLi=$right.children("li:eq("+rightCol+")");
			$right.children("li.right-selected").removeClass("right-selected");
			$curRightLi.addClass("right-selected");
			
			var leftWidth=$(".left").width();
			var leftHeight=$curRightLi.offset().left;
			var rightHeight=$("body").width()-$curRightLi.offset().left-$curRightLi.width();
			var liWidth=$curRightLi.width()*0.9;
			var marginWidth=parseInt($curRightLi.css("marginLeft"));
			var rightLeftHeight = parseInt($right.css("marginLeft"));
			var leftWidth=$(".left").width();
			//判断目前选中的里距离顶部和底部的高度
		    if(leftHeight < marginWidth+leftWidth){
				rightLeftHeight=rightLeftHeight+(liWidth+marginWidth);	
				
				$right.animate({marginLeft:rightLeftHeight+"px"},100);
				
				$right.children("li:eq("+(rightCol)+")").children("div").fadeOut();
			}else if(rightHeight < marginWidth){
				rightLeftHeight=rightLeftHeight-(liWidth+marginWidth);
				$right.animate({marginLeft:rightLeftHeight+"px"},100);
				
				
				$right.children("li:eq("+(rightCol-rightNum)+")").children("div").fadeIn();
			}
			
		}
		
		
		$(document).keydown(function(event){
			var keyCode=event.keyCode;
			if(keyCode===numKey.down){
				if (curRow < (menuLength - 1)) {
				curRow++;
				} else if (curRow === (menuLength - 1)) {
					bottomeShake();
				}
				isSelected(curRow, curRow - 1);
				
				setRightChange(0);
			}else if(keyCode===numKey.up){
				if (curRow > 0) {
				curRow--;
				} else if (curRow === 0) {
					topShake();
				}
				isSelected(curRow, curRow + 1);
				setRightChange(1);
			}else if(keyCode===numKey.right){
				if(leftCol===0){
					leftCol=1;
					$right.children("li:eq(0)").addClass("right-selected");
				}else{
					setRightStyle(0);
				}
			}
			else if(keyCode===numKey.left){
				if(rightCol===0){
					leftCol=0;
					$right.children("li:eq(0)").removeClass("right-selected");
				}else{
					setRightStyle(1);
				}
			}else if(keyCode===numKey.enter){
				if(leftCol===1){
					 if(curRow===6 && rightCol===0){
						Oceanus.runApp("ProgramCenter",true);
					}else if(curRow===0 && rightCol===0){
						Oceanus.runApp("Setting",true);
					}
				}
			}else if(keyCode===numKey.back){
				var this_app = ($('title').text());
				Oceanus.closeApp(this_app,false);
			}
		});
});
