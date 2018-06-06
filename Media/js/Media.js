//JavaScript Document
// 
// 

$(document).ready(function() {
	var rowsIcon=getUrlValue('id')?parseInt(getUrlValue('id')):0;
	var rowsRight=0;
	var curType='left';

	var iconName=['Movie','Picture','Ebook','Music'];

	function setRightPosition($object){
		var $selected=$("#js_selected");
		if($object){
			var top=$object.offset().top+5;
			var height=58;
		}else {
			var top=0;
			var height=0;
		}
		$selected.stop();
		$selected.animate({
			height:height,	
			top:top,
		},100);
	}

	function setLeftChange(keyCode){
		var $left=$("#js_left");
		var $curIcon1=$left.children('li').eq(rowsIcon);
		$curIcon1.children('span').hide();
		if(keyCode===numKey.up){
			if(rowsIcon===0) {
				 return false;
			}
			else rowsIcon--;
		}else if(keyCode===numKey.down){
			if(rowsIcon===3)  {
				return false;
			}
			else rowsIcon++;
		}

		rowsRight=0;
		$("#js_right").css({
			marginTop:0,
		});
		$curIcon1.stop();
		$curIcon1.animate({
			height:123},
			300, function() {
			loadNewImg($(this).children('img'),1);
		});

		$curIcon2=$left.children('li').eq(rowsIcon);
		$curIcon2.children('span').show().text(iconName[rowsIcon]);
		loadNewImg($curIcon2.children('img'));
		$curIcon2.stop();
		$curIcon2.animate({
			height:354},
			300, function() {
				loadNewImg($(this).children('img'));
		});
	}
	setLeftChange();

	function setRightSelect(){
		curType='right';
		setRightChange();
	}

	function setLeftSelect(){
		curType='left';
		$("#js_right").children('li.right-li-select').removeClass('right-li-select');
		setRightPosition();
	}
	function setRightChange(keyCode){
		var $right=$("#js_right");
		if(keyCode===numKey.up){
			if(rowsRight===0){
				return false;
			}
			else rowsRight--;
			if((rowsRight+1)%9===0){
				$right.animate({
					marginTop:"+=600px",
				},200,function(){
					setRightPosition($curRight);
				});
			}
		}else if(keyCode===numKey.down){
			if(rowsRight===$right.children('li').length-1){
				return false;
			}else rowsRight++;
			if(rowsRight%9===0){
				$right.animate({
					marginTop:"-=600px",
				},200,function(){
					setRightPosition($curRight);
				});
			}
		}


		var $curRight=$right.children('li').eq(rowsRight);
		$curRight.siblings('li').removeClass('right-li-select');
		$curRight.addClass('right-li-select');
		setRightPosition($curRight);
	}

	$(document).keydown(function(event) {
		/* Act on the event */
		var keyCode=event.keyCode;
		switch (curType) {
			case 'left':
				if(keyCode===numKey.up || keyCode===numKey.down){
					setLeftChange(keyCode);
				}
				else if(keyCode===numKey.right){
					setRightSelect();
				}
				break;
			case 'right':
				if(keyCode===numKey.up || keyCode===numKey.down){
					setRightChange(keyCode);
				}
				else if(keyCode===numKey.left){
					setLeftSelect();
				}
				break;
			default:
				// statements_def
				break;
		}
		if(keyCode === numKey.back)
		{
			var this_app = ($('title').text());
			Oceanus.closeApp(this_app,false);
		}
	});
})