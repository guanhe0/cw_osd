$(document).ready(function() {
	var cellIndex = getUrlValue('id')?parseInt(getUrlValue('id')):0;
	var g_cellIndexPre = cellIndex;
	var cellTotal = 4;
	var cellIndexPre = cellIndex;
	var pvrPlay = 0,pvrStop = 1, pvrTimeShift = 2,pvrTvList = 3;
	var playClass = "glyphicon glyphicon-play-circle";
	var pauseClass = "glyphicon glyphicon-pause";
	var configClass = "glyphicon glyphicon-wrench";
	var listClass = "glyphicon glyphicon-menu-hamburger";
	var stopClass = "glyphicon glyphicon-stop";
	var highlightClass = "pvr_home_highlight";
	var backClass = "glyphicon glyphicon-backward";
	var forwardClass = "glyphicon glyphicon-forward";
	function getCurFocuse(){
		return cellIndex;
	}
	function setCurFocuse(val)
	{
		cellIndex = val;
	}
	function setFocusPre(val){
		g_cellIndexPre = val;
	}
	function getFocusPre(){
		return g_cellIndexPre;
	}
	function setChange(keyCode){
		var $obj = $(".items");
		var cur = getCurFocuse();
		
		
		var imgs = new Array();
		imgs[0] = "glyphicon-play-circle";
		imgs[1] = "glyphicon-pause";
		imgs[2] = "glyphicon-wrench";
		imgs[3] = "glyphicon-menu-hamburger";
		
		
		
		setFocusPre(cur);
		cellIndexPre = getFocusPre();
		console.log("pre = " + cellIndexPre);
		if(keyCode == numKey.left){
			if(cur == 0){
				
				setCurFocuse(cellTotal - 1);
			}else{
				
				setCurFocuse(--cur);
			}				
		}
		else if(keyCode == numKey.right){
			if(cur == cellTotal - 1){
				setCurFocuse(0);
			}
			else{
				
				setCurFocuse(++cur);
			}
		}
		console.log("cur = " + getCurFocuse());
		//pre item set old img
		var class_str = imgs[getFocusPre()];
		$("." + class_str).removeClass("pvr_home_highlight");
		
		class_str = imgs[getCurFocuse()];
		$("." + class_str).addClass("pvr_home_highlight");
	}
	function startTimer(){
		var time = 0,hour = 0,minute = 0,second = 0,tmp = 0;
		var time_str;
		var timer = $.timer(1000,function(){
			time++;
			tmp = time;
			hour = parseInt(tmp/3600,10);
			
			tmp = tmp -  hour*3600;
			minute = parseInt(tmp/60,10);
			tmp = tmp - minute*60;
			second = tmp;
		//	console.log("time = " + time + "hour = " + hour + "minute = " + minute + " second = " + second);
			time_str = ((hour < 10) ? "0":"") + hour + ":" + ((minute < 10) ? "0":"") + minute + ":" + ((second < 10) ? "0":"") + second;
			$("#rec_stauts_time_txt").empty().text(time_str);
			//test
			updateProgress(""+(time%100)+"%");
			//end of test
		});
		return timer;
	}
	function pvrTurnToPlay(){
		playPanelTurn(true);
		playInfoShow(true);
	}
	function playInfoShow(val){
		if(val == false){
			
		}else{
			$("#pvrPlayInfo").addClass("playInfo").removeClass("invisible");
			$("#InfoLeft").addClass("InfoLeft");
			$("#PlayProgress").addClass("PlayProgress");
			$("#CurChannel").addClass("CurChannel");
			$("#InfoRight").addClass("InfoRight");
			$("#diskImg").addClass("diskImg");
			$("#diskMem").addClass("diskMem");
			$("#CurChannelText").addClass("CurChannelText");
			$("#PlayProgressText").addClass("PlayProgressText");
		}
	}
	function playPanelTurn(val){
		if(val == false)
		{
			
		}
		else
		{
			var pauseImgDiv = document.createElement("div");
			$(pauseImgDiv).addClass("la");
			var pauseImg = document.createElement("span");
			$(pauseImg).addClass(pauseClass);
			$(pauseImg).attr("aria-hidden","true");
			$(pauseImgDiv).append(pauseImg);
			$(".items").css("width","510px");
			$(".la").eq(0).children("span").removeClass(playClass).removeClass(highlightClass).addClass(stopClass);
			$(".la").eq(1).children("span").removeClass(pauseClass).addClass(backClass);
			$(".la").eq(2).children("span").removeClass(configClass).addClass(forwardClass);
			
			$(pauseImgDiv).insertBefore($(".la").eq(0));
			$(".items").addClass("ml60 items_left").removeClass("items");			
		}
	}
	function updateProgress(val){
		$(".progress").children("div").eq(0).css("width",val);
	}
	
	startTimer();
	setChange();
	
	$(document).keydown(function(event){
		var keyCode = event.keyCode;
		var cur = getCurFocuse();
		if(keyCode == numKey.left || keyCode == numKey.right){
			setChange(keyCode);
		}else if(keyCode == numKey.enter){
			if(cur == pvrPlay){
				pvrTurnToPlay();
			}else if(cur == pvrStop){
				
			}else if(cur == pvrTimeShift){
				window.location.href = "http://localhost/Osd/Pvr/TimeShift.html";
			}else if(cur == pvrTvList){
				window.location.href = "http://localhost/Osd/Pvr/TvList.html";
			}
		}
		
	})
})