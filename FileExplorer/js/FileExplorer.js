/**
 * decription:fileManager js file 
 * author:zhaojie
 * data:2016.3.23
 */
loadLanguageFile("fileExplorer.js");
$(document).ready(function() {
	var curData = {
		file:0,
		top:0,
		type:'disk',
		disk:0,
		category:0,
	};
	var diskDirData = Array();
	
	var isMedia = 1;//是否是media模块

	 var window_id = getUrlValue('window')?parseInt(getUrlValue('window')):0;
     function SystemEventLinstener(event){
     	//在这里设置监听底层事件
     } 

     Oceanus.addPlatformEventListener(SystemEventLinstener,window_id);
	//默认布局的立即执行函数
	(function(){
		loadDiskData();
		$("#js_disk").show();
		if(isMedia === 0){
			$(".left-title").children('div').eq(1).hide();
		}
		$("#js_category").children('li').eq(curData.category).addClass('content-select');
		setTimeout(function(){
			$("#js_disk").children('li').eq(curData.disk).addClass('content-select');
		}, 200);
	})();

	//文件类型的对象数组
	var $contentArr = [
		$("#js_folderCon"),$("#js_pictureCon"),$("#js_videoCon"),$("#js_DocumentCon"),$("#js_otherCon")
	];
	//布局文件的内容
	var fileObject = Array();
	function layoutFileContent(dir){
		//获取文件内容的json对象
		console.log(dir);
		fileObject = JSON.parse(FileManager.getFileDirectoryJson(dir));
		console.log(fileObject);
		for(var i in $contentArr){
			$contentArr[i].html("");
		}
		var htmlStr = "";
		for(var i= 0;i< fileObject.length ;i++){
			switch (fileObject[i].type) {
				case "folder":
					htmlStr = "<li data-index = "+i+"><img src='./img/file-folder.png' /><span>"+fileObject[i].name+"</span></li>";
					$contentArr[0].append(htmlStr);
					break;
				case "picture":
					if(fileObject[i].path !=""){
						htmlStr = "<li d data-index = "+i+"ata-index = "+i+"><img src='"+fileObject[i].path+"' /><span>"+fileObject[i].name+"</span></li>";
					}else htmlStr = "<li><img src='./img/file-picture.png' /><span>"+fileObject[i].name+"</span></li>";
					$contentArr[1].append(htmlStr);
					break;
				case "video":
					htmlStr = "<li data-index = "+i+"><img src='./img/file-video.png' /><span>"+fileObject[i]['name']+"</span></li>";
					$contentArr[2].append(htmlStr);
					break;
				case "doc":
					htmlStr = "<li data-index = "+i+"><img src='./img/file-ebook.png' /><span>"+fileObject[i]['name']+"</span></li>";
					$contentArr[3].append(htmlStr);
					break;
				case "file":
					htmlStr = "<li data-index = "+i+"><img src='./img/file-ebook.png' /><span>"+fileObject[i]['name']+"</span></li>";
					$contentArr[4].append(htmlStr);
					break;
				default:
					// statements_def
					break;
			}
			if(fileObject[i].type === "folder"){

			}
		}
	}
	//设置顶部的改变
	function setTopChange(keyCode){
		var $topTitle=$("#js_topTitle");
		var $topSearch = $("#js_topSearch");
		if(keyCode===numKey.left){
			if(curData.top===0) {
				setLiftIsSelected(1);
				 return false;
			}else{
				curData.top--;
				if(curData.top === $topTitle.children('span').length-1){
					$topSearch.removeClass('top-search-select');
					$topTitle.children('span').eq(curData.top).addClass('content-select');
				}else{
					$topTitle.children('span').removeClass('content-select');
					$topTitle.children('span').eq(curData.top).addClass('content-select');
				}
			}
		}else if(keyCode===numKey.right){
			if(curData.top===$topTitle.children('span').length)  {
				return false;
			}else{ 
				curData.top++;
				if(curData.top === $topTitle.children("span").length){
					console.log("$topTitle.children('span').length-1");
					$topSearch.addClass('top-search-select');
					$topTitle.children('span').eq(curData.top-1).removeClass('content-select');
				}else{
					$topTitle.children('span').removeClass('content-select');
					$topTitle.children('span').eq(curData.top).addClass('content-select');
				}
			}
		}else{
			$topTitle.children('span').removeClass('content-select');
			$topTitle.children('span').eq(curData.top).addClass('content-select');
		}
		console.log(curData.top);
	}

	//文件被选择的效果
	function setContentSelect(){
		curData.type='content';
		curData.top = 0;
		$("#js_topTitle").children('span').removeClass('content-select');
		$("#js_topSearch").removeClass('top-search-select');
		setContentChange();
	}

	//顶部被选择的效果
	function setTopSelect(){
		curData.type='top';
		$("#js_folderCon").children('li').removeClass('content-select');
		setTopChange();
	}
	

	var scrollHeight=$("#js_scroll").height()-$("#js_scroll").children('div').eq(0).height();
	//设置文件的选择
	function setContentChange(keyCode){
		var num=7;
		var $content=$contentArr[curData.category];
		if(keyCode===numKey.left){
			if(curData.file===0){
				if(curData.category === 0){
					setLiftIsSelected(1);
				}else{
					curData.category--;
					curData.file=$contentArr[curData.category].children('li').length-1;
					$content.children('li').removeClass('content-select');
					setContentChange();
				}
				return false;
			}
			else curData.file--;
		}else if(keyCode===numKey.right){
			if(curData.file===$content.children('li').length-1){
				if(curData.category === $contentArr.length-1) return false;
				curData.category++;
				curData.file=0;
				$content.children('li').removeClass('content-select');
				setContentChange();
				return false;
			}else curData.file++;
		}else if(keyCode === numKey.down){
			if((curData.file+num)>$content.children('li').length-1){
				if(curData.category === $contentArr.length-1){
					curData.file = $content.children('li').length-1;
				}else{
					curData.category++;
					setCategoryChange();
					curData.file=curData.file%num;
					$content.children('li').removeClass('content-select');
					setContentChange();
					return false;
				}
			}else curData.file+=num;
		}else if(keyCode === numKey.up){
			if((curData.file-num)<0){
				if(curData.category === 0){
					setTopSelect();
				}else{
					curData.category--;
					setCategoryChange();
					curData.file=parseInt($contentArr[curData.category].children('li').length/num)*num+curData.file;
					if(curData.file > $contentArr[curData.category].children('li').length-1){
						curData.file =  $contentArr[curData.category].children('li').length-1;
					}
					$content.children('li').removeClass('content-select');
					setContentChange();
				}
				return false;
			}
			else if((curData.file-num)<0){
				setTopSelect();
				return false;
			}else curData.file-=num;
		}else if(keyCode === numKey.back){
			// setTopSelect();
			return false;
		}
		var $curContent=$content.children('li').eq(curData.file);
		setContentMode($curContent);

		var scrollMarginTop=scrollHeight*(curData.file/($content.children('li').length-1));
		$("#js_scroll").children('div').stop();
		$("#js_scroll").children('div').animate({marginTop:scrollMarginTop},200);
		$curContent.siblings('.content-select').removeClass('content-select');
		$curContent.addClass('content-select');
	}

	//打开文件的事件
	function openContentFile(){
		var curFileData =  fileObject[$contentArr[curData.category].children('li').eq(curData.file).data('index')];
		//文件打开的操作
		//
		//重新布局文件内容
		console.log(curFileData);
		setTimeout(layoutFileContent(curFileData.path),200);
	}

	//设置右边内容部分的移动
	function setContentMode($object){
		$content=$("#js_content");
		var top=$object.offset().top;
		var topDes = parseInt(top/2);
		var bottom=$('body').height()-$object.height()-top;
		var bottomDes = parseInt(bottom/2);
		$content.stop();
		if(top<100){
			$content.animate({marginTop:'+='+bottomDes/2},100);
		}
		if(bottom<0){
			$content.animate({marginTop:'-='+topDes/2},100);
		}
	}

	//加载磁盘数据
	function loadDiskData() {
        var diskParse = 1024 * 1024 * 1024;
        loadJsFile("usbdisk", "js_diskData","../../system/",function() {
            var $disk = $("#js_disk");
            $disk.html("");
            var mediaStr = "";
            if (typeof(UsbDiskInfoList) == "undefined") return false;
            var used = 0,
                max = 0,
                remain = 0;
            for (var i in UsbDiskInfoList) {
				diskDirData[i] = UsbDiskInfoList[i].dir;
				console.log("disk dir:"+ diskDirData[i]);
                used = (UsbDiskInfoList[i].used / diskParse).toFixed(2);
                max = (UsbDiskInfoList[i].max / diskParse).toFixed(2);
                remain = (UsbDiskInfoList[i].free / diskParse).toFixed(2);
                mediaStr += "<li><div class='disk-info'><div>";
                mediaStr += UsbDiskInfoList[i].name + "(" + UsbDiskInfoList[i].lable + ")";
                mediaStr += "</div><div class='disk-size'>";
                mediaStr += "<div class='disk-size-use' style='width:" + parseInt((used / max) * 100) + "%'></div></div>";
                // mediaStr += "<div>" + programCenter.diskRemain + ":" + remain + programCenter.diskGB + "&nbsp;&nbsp;" + programCenter.diskTotal + ":" + max + programCenter.diskGB + "</div></div></li>";
            }
			layoutFileContent(diskDirData[0]);
            $disk.append(mediaStr);
        });
    };

    //设置左边是否选择的动作
    function setLiftIsSelected(type){
    	if(type === 1){
    		if(isMedia === 0){
				curData.type = "disk";
    		}else if(isMedia === 1){
    			curData.type = "category"
    			setLeftUlChange(1);
    		}
    		curData.file = 0;
    		$("#js_disk").children('li').eq(curData.disk).removeClass('left-enter').addClass('content-select');
    		$("#js_category").children('li').removeClass('left-enter');
    		$("#js_top").find('.content-select').removeClass('content-select');
    		$("#js_category").children('li').eq(curData.category).addClass('content-select');

    		$("#js_content").find('.content-select').removeClass('content-select');
    	}else if(type === 0){
    		curData.type="content";
    		$("#js_disk").children('li').eq(curData.disk).removeClass('content-select').addClass('left-enter');
    		$("#js_category").children('li').eq(curData.category).removeClass('content-select').addClass('left-enter');
    		setTimeout(function(){
    			setContentChange();
    		}, 200);
    		setCategoryEnter();
    	}
    }

    //设置左侧行改变
    function setLeftChange(keyCode){
    	if(curData.type === "disk"){
    		var $leftCon = $("#js_disk");
    		if(keyCode === numKey.up){
    			if(curData.disk === 0) return false;
    			else curData.disk--;
    		}else if(keyCode === numKey.down){
    			if(curData.disk === $leftCon.children('li').length-1) return false;
    			else curData.disk++;
    		}
	    	$leftCon.children('li').removeClass('content-select');
	    	$leftCon.children('li').eq(curData.disk).addClass('content-select');
    	}else if(curData.type === "category"){
    		var $leftCon = $("#js_category");
    		if(keyCode === numKey.up){
    			if(curData.category === 0) return false;
    			else curData.category--;
    		}else if(keyCode === numKey.down){
    			if(curData.category === $leftCon.children('li').length-1) return false;
    			else curData.category++;
    		}
	    	$leftCon.children('li').removeClass('content-select');
	    	$leftCon.children('li').eq(curData.category).addClass('content-select');
    	}
    }

	//设置左边哪一块显示
	function setLeftUlChange(type){
		if(type === 0){
			curData.type = "disk";
			$("#js_disk").addClass('left-ul-select').show();
			$("#js_category").removeClass('left-ul-select').hide();
			$(".left-title").children('div').removeClass('left-title-select');
			$(".left-title").children('div').eq(0).addClass('left-title-select');
		}else if(type === 1){
			if(isMedia === 1){
				curData.type = "category";
				$("#js_category").addClass('left-ul-select').show();
				$("#js_disk").removeClass('left-ul-select').hide();
				$(".left-title").children('div').removeClass('left-title-select');
				$(".left-title").children('div').eq(1).addClass('left-title-select');
			}else{
			}
		}
	}

	//设置type选项跟着右侧的文件改变
	function setCategoryChange(){
		$("#js_category").children('li.left-enter').removeClass('left-enter');
		$("#js_category").children('li').eq(curData.category).addClass('left-enter');
	}
	//设置左边category选择之后右侧文件的显示
	function setCategoryEnter(){
		var titleTop = $(".content-title").eq(curData.category).offset().top-80;
		console.log(titleTop);
		$("#js_content").animate({marginTop:"-="+titleTop}, 200);
	}
	$(document).keydown(function(event) {
		/* Act on the event */
		var keyCode=event.keyCode;
		switch (curData.type) {
			case 'top':
				if(keyCode===numKey.left || keyCode===numKey.right){
					setTopChange(keyCode);
				}
				else if(keyCode===numKey.down){
					setContentSelect();
				}else if(keyCode === numKey.back){
					setLiftIsSelected(1);
				}
				break;
			case 'content':
				if(keyCode === numKey.back){
					setLiftIsSelected(1);
				}else if(keyCode === numKey.enter){
					//打开文件或者文件夹
					openContentFile();
				}else{
					setContentChange(keyCode);
				}
				break;
			case 'disk':
				if(keyCode === numKey.up || keyCode === numKey.down){
					setLeftChange(keyCode);
				}else if(keyCode === numKey.right || keyCode === numKey.enter){
					setLeftUlChange(1)
				}
				break;
			case 'category':
				if(keyCode === numKey.up || keyCode === numKey.down){
					setLeftChange(keyCode);
				}else if(keyCode === numKey.right || keyCode === numKey.enter){
					setLiftIsSelected(0);
				}else if(keyCode === numKey.left){
					setLeftUlChange(0)
				}
				break;
			default:
				// statements_def
				break;
		}
		if(keyCode === numKey.back)
			{
				Oceanus.closeApp($('title').text());
			}
	});
})