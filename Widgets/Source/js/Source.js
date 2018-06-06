/**
 * js file of source 
 * author:zhaojie
 * date:2016.3.22
 **/
 loadLanguageFile("source.js","../../");
 $(function(){
 	var curSource = SourceManager.getCurSource(),
 		numSource = 5,
 		curRow = 0
 		// sourceIndexArr = SourceManager.getSourceList();//需要显示的source的index数组
		sourceIndexArr = [0,1,2,3,4,5,6,7,8,9,10,11,12];
 	console.log("curSource:"+curSource);
 	//当前source 在source index 列表中的index
 	var curIndex = sourceIndexArr.indexOf(curSource);
 	//布局source显示的内容
 	var $source = $("#js_source");
 	(function(){
 		var htmlStr = ""; 
 		var firstIndex;
 		if(curIndex+numSource > sourceIndexArr.length){
 			console.log("curIndex+numSource > sourceIndexArr.length");
 			firstIndex = sourceIndexArr.length - numSource;
 			curRow = curIndex+numSource -sourceIndexArr.length;
 		}else{
 			firstIndex = curIndex;
 		}
 		console.log(curIndex);
 		console.log(firstIndex);
 		console.log(curRow);
 		for(var i = 0;i < numSource ; i++){
 			// htmlStr += "<li><img src='./img/source-"+source[i].index+".png' />";
 			htmlStr += "<li><img src='./img/source-1.png' />";
 			htmlStr += "<span>"+source[sourceIndexArr[firstIndex+i]].name+"</span>";
 		}
 		$source.append(htmlStr);
 		setSourceSelect();
 	})();

 	//设置source 选中的样式
 	function setSourceSelect(){
 		$source.children('li').removeClass('source-select');
 		$source.children('li').removeClass('source-enter');
 		$source.children('li').eq(curRow).addClass('source-select');
 	}
 	//设置source左右选择
 	function setSourceChange(keyCode){
 		var htmlStr = "";
 		if(keyCode === numKey.right){
 			if(curRow === numSource -1){
 				if(curIndex === sourceIndexArr.length -1) return false;
 				$source.children('li:first').remove();
 				// htmlStr += "<li><img src='./img/source-"+source[i].index+".png' />";
	 			htmlStr += "<li><img src='./img/source-1.png' />";
	 			htmlStr += "<span>"+source[sourceIndexArr[curIndex+1]].name+"</span>";
	 			$source.append(htmlStr);
 			}else{
 				curRow++;
 			}
 			curIndex++;
 		}else if(keyCode === numKey.left){
			if(curRow === 0){
 				if(curIndex === 0) return false;
 				$source.children('li:last').remove();
 				// htmlStr += "<li><img src='./img/source-"+source[i].index+".png' />";
	 			htmlStr += "<li><img src='./img/source-1.png' />";
	 			htmlStr += "<span>"+source[sourceIndexArr[curIndex-1]].name+"</span>";
	 			$source.prepend(htmlStr);
 			}else{
 				curRow--;
 			}
 			curIndex--;
 		}
 		setSourceSelect();
 	}
 	//设置source确认后的动作
 	function setSourceEnter(){
 		$source.children('li').eq(curRow).addClass('source-enter');
 		SourceManager.setInputSource(sourceIndexArr[curIndex]);
 	}

 	$(document).keydown(function(event) {
 		var keyCode = event.keyCode;
 		console.log("Source_keyCode  ="+keyCode);
 		if(keyCode === numKey.left || keyCode === numKey.right){
			setSourceChange(keyCode);
 		}else if (keyCode === numKey.enter){
 			setSourceEnter();
 		}else if(keyCode === numKeyBack){
 			Oceanus.hideWidget("Source",true);
 		}
 	});
 })