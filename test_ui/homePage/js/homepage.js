// JavaScript Document
//loadLanguageFile("picture.js");
$(document).ready(function(){
		var curRow=0;
		var leftCol=0;
		var leftRow=0;
		var rightCol=0;
		var $left=$("#js_left");
		var $test=$("#js_test");
		var bodiHeight=$("body").height();
		
		
		
		function setLeftStyle(type){
			if(type===0){
				if(curRow<$left.children("li").length-1){
						curRow++;
				}else return false;
			}else{
				if(curRow>0){
						curRow--
					}else return false;
			}
			serRightChange(type);
			
			
			var $curLeftLi=$left.children("li:eq("+curRow+")");
			$left.children("li.left-selected").removeClass("left-selected");
			$curLeftLi.addClass("left-selected");
			var topHeight=$curLeftLi.offset().top;
			var bottomHeight=$("body").height()-$curLeftLi.offset().top-$curLeftLi.height();
			var liHeight=$curLeftLi.height()*0.85;
			var marginHeight=parseInt($curLeftLi.css("marginTop"));
			var leftTopHeight = parseInt($("#js_leftDiv").css("top"));
			//判断目前选中的里距离顶部和底部的高度
		    if(topHeight < marginHeight){
				leftTopHeight=leftTopHeight+(liHeight+marginHeight*2);	
				
				$("#js_leftDiv").animate({top:leftTopHeight+"px"});
			}else if(bottomHeight < marginHeight){
				leftTopHeight=leftTopHeight-(liHeight+marginHeight*2);
				$("#js_leftDiv").animate({top:leftTopHeight+"px"});
			}
		}
		
		var $right=$(".right-ul:eq("+curRow+")");
		$right.show();
		var $rightAll=$("#js_right");
		function serRightChange(type){
			$right=$(".right-ul:eq("+curRow+")");
			var marginTop=parseInt($rightAll.css("marginTop"));
			if(type===0){
				marginTop=marginTop-$right.height();
				$rightAll.animate({marginTop:marginTop},1000);
				$right.addClass("right-hide").removeClass("right-show");
				$(".right-ul:eq("+(curRow+1)+")").addClass("right-show").removeClass("right-hide");
			}else{
				marginTop=marginTop+$right.height();
				$rightAll.animate({marginTop:marginTop},1000);
				$right.addClass("right-hide").removeClass("right-show");
				$(".right-ul:eq("+(curRow-1)+")").addClass("right-show").removeClass("right-hide");
			}
			
			
			if(leftCol!==0){
				$right.children("li").removeClass("right-selected");
				$right.children("li:eq(0)").addClass("right-selected");
			}
			
			rightCol=0;
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
				
				$right.animate({marginLeft:rightLeftHeight+"px"});
			}else if(rightHeight < marginWidth){
				rightLeftHeight=rightLeftHeight-(liWidth+marginWidth);
				$right.animate({marginLeft:rightLeftHeight+"px"});
			}
			
		}
		
		
		$(document).keydown(function(event){
			var keyCode=event.keyCode;
			if(keyCode===numKey.down){
				setLeftStyle(0)
			}else if(keyCode===numKey.up){
				setLeftStyle(1);
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
			}
		});
});
