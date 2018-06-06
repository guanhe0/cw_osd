loadLanguageFile("mediaPlayer.js");
var videoDom = document.getElementById("js-video");
$(function(){
    var DomObject = {
        $videoUl : $("#js-videoUl"),
        $videoDiv : $("#js-videoDiv"),
        $menuUl : $("#js-menuUl"),
        $historyUl : $("#js-historyUl"),
        $scaleUl : $("#js-scaleUl"),
        $video : $("#js-video"),
        $currentTimeSpan : $("#js-currTime"),
        $durationVideo : $("#js-duration"),
        $moveDiv : $("#js-moveDiv"),
        $listDiv : $("#js-listDiv"),
        $setDiv : $("#js-setDiv"),
        $saveImgDiv : $("#js-saveimgDiv")
    };

    var curr = {
       videoList : 0,
       menuList : 0,
       historyList : 0,
       languageList : 0,
       scaleList : 0
    };

    function onEventListener(event){
        var jsonCmd = JSON.parse(event);
        switch (jsonCmd.cmd){
            case "CMD_START_PLAY":
                var mediaType = jsonCmd.value.mediaType;
                var mediaUrl = jsonCmd.value.mediaUrl;
                var mediaCodecs = jsonCmd.value.mediaCodecs;
                console.log("mediaType: "+mediaType+" mediaUrl: "+mediaUrl + " mediaCodecs: "+mediaCodecs);
                var $source = $("<source>");
                $source.attr("src", mediaUrl);
                $source.attr("type", mediaType + ";" +"codecs="+"\""+mediaCodecs+"\"");
                DomObject.$video.append($source);
                videoDom.load();
                break;
            case "CMD_PLAY_LIST":
                break;
            case "CMD_RECORD_PLAY_HISTORY":
                break;
            case "CMD_PLAY_HISTROY":
                break;
        }
    }
    var windowId = getUrlValue('window')?parseInt(getUrlValue('window')):0;
    console.log("windowId: "+windowId);
    Oceanus.addPlatformEventListener(onEventListener,windowId);

    var videoDuration,result;
    function formatSeconds(seconds){
        return [parseInt(seconds / 60 / 60), parseInt(seconds / 60 % 60), parseInt(seconds % 60)].join(":")
            .replace(/\b(\d)\b/g, "0$1");
    }

    videoDom.addEventListener("canplay",function(){
        console.log("Video Can Play --"+videoDom.currentSrc);
        videoDuration = videoDom.duration;
        result = formatSeconds(videoDuration);
        DomObject.$durationVideo.text(result);
        videoDom.play();
        DomObject.$videoUl.children("li").eq(curr.videoList).children("span").attr("class","glyphicon glyphicon-pause");
    });
    
    videoDom.addEventListener("error", function(){
        console.log("Video Play Error");
        switch (videoDom.error.code)
        {
            case MediaError.MEDIA_ERR_ABORTED:
                alert("mediaError MEDIA ERR ABORTED");
                break;
            case MediaError.MEDIA_ERR_NETWORK:
                alert("mediaError MEDIA ERR NETWORK");
                break;
            case MediaError.MEDIA_ERR_DECODE:
                alert("mediaError MEDIA ERR DECODE");
                break;
            case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                alert("mediaError MEDIA ERR SRC NOT SUPPORTED");
                break;
        }
    });

    videoDom.addEventListener("timeupdate", function(){
        $(".timeBar").css("width",(videoDom.currentTime / videoDuration)*100+"%");
        var currentTime = formatSeconds(videoDom.currentTime)
        DomObject.$currentTimeSpan.text(currentTime);
    });

    videoDom.addEventListener("ended", function(){
        if(!videoDom.loop){
            videoDom.currentTime = 0;
            videoDom.pause();
            DomObject.$videoUl.children("li").eq(0).children("span").attr("class","glyphicon glyphicon-play");
        }
    });

    var currentStr = "videoBtnList";
    setCurrentRowCss("video",0);
    function setCurrentRowCss(type){
        if(type == "video"){
            DomObject.$videoUl.children("li").eq(curr.videoList).addClass("selected").siblings().removeClass("selected");
        }else if(type == "menu"){
            if(currentStr == "menuList"){
                var str = "<span class='glyphicon glyphicon-menu-down' aria-hidden='true' id='js-span"+curr.menuList+"'></span>";
                DomObject.$menuUl.children("li").children("div:first-child").removeClass("selected");
                $("span[id*='js-span']").remove();
                DomObject.$menuUl.children("li").eq(curr.menuList).children("div:first-child").addClass("selected").append(str);
                return false;
            }else{
                return false;
            }
        }else if(type == "history"){
            var $historyUl = $("#js-historyUl");
            $historyUl.children("li").eq(curr.historyList).addClass("selected").siblings().removeClass("selected");
        }
    }
    function setCurrentRowIndex(type){
        var $historyUl = $("#js-historyUl");
        if(type == "sub"){
            switch (currentStr){
                case "videoBtnList":
                    if(curr.videoList === 0 ){
                    }else {
                        curr.videoList -- ;
                    }
                    setCurrentRowCss("video")
                    break;
                case "menuList":
                    if(curr.menuList === 0){
                    }else{
                        curr.menuList --;
                    }
                    setCurrentRowCss("menu")
                    break;
                case "historyList":
                    if(curr.historyList === 0){
                        $historyUl.children("li").removeClass("selected");
                        console.log("***********************"+curr.menuList);
                        DomObject.$menuUl.children("li").eq(curr.menuList).children("div:first-child").addClass("selected");
                    }else{
                        curr.historyList --;
                        setCurrentRowCss("history");
                    }

                    break;
            }
        }else if(type == "add"){
            switch (currentStr){
                case "videoBtnList":
                    if(curr.videoList === DomObject.$videoUl.children("li").length - 1 ){
                    }else {
                        curr.videoList ++ ;
                    }
                    setCurrentRowCss("video")
                    break;
                case "menuList":
                    if(curr.menuList === DomObject.$menuUl.children("li").length - 1){
                    }else{
                        curr.menuList ++;
                    }
                    setCurrentRowCss("menu");
                    break;
                case "historyList":
                    if(DomObject.$menuUl.children("li").eq(curr.menuList).children("div:first-child").hasClass("selected")){
                        DomObject.$menuUl.children("li").eq(curr.menuList).children("div:first-child").removeClass("selected");
                        curr.historyList = 0;
                        setCurrentRowCss("history");
                    }else{
                        if(curr.historyList === $historyUl.children("li").length - 1){
                            DomObject.$historyUl.slideUp(1000).delay(100);
                            currentStr = "menuList";
                            curr.menuList ++;
                            setCurrentRowCss("menu");
                        }else{
                            curr.historyList++;
                            setCurrentRowCss("history");
                        }
                    }

                    break;
            }
        }

    }
    //设置视频的当前状态
    function setVideoState(){
        switch (curr.videoList){
            case 0://开始暂停
                if (videoDom.paused){
                    videoDom.play();
                    DomObject.$videoUl.children("li").eq(curr.videoList).children("span").attr("class","glyphicon glyphicon-pause")
                }else{
                    videoDom.pause();
                    DomObject.$videoUl.children("li").eq(curr.videoList).children("span").attr("class","glyphicon glyphicon-play")
                }
                break;
            case 1://停止
                //videoDom.load();//重新加载视频
                videoDom.currentTime = 0;
                videoDom.pause();
                DomObject.$videoUl.children("li").eq(0).children("span").attr("class","glyphicon glyphicon-play")

                break;
            case 2://快退
                forwardOrRewind("rewind")
                break;
            case 3://快进
                forwardOrRewind("forward");
                break;
        }
    }
    //视频的快进后退
    function forwardOrRewind(type){
        switch (type){
            case "forward"://快进
                if(!videoDom.paused){
                    console.log(videoDom.playbackRate+"=========forwards before========="+videoDom.playbackRate);
                    if(videoDom.playbackRate < 0){
                        videoDom.playbackRate = 1;
                    }else{
                        if(videoDom.playbackRate >= 32){
                            console.log("------------playbackstate too big------------");
                            return false;
                        }
                        videoDom.playbackRate = videoDom.playbackRate * 2;
                    }
                    console.log(videoDom.playbackRate+"=========forwards after========="+videoDom.playbackRate);
                }else{
                    return false;
                }
                break;
            case "rewind"://快退
                if(!videoDom.paused){
                    if(videoDom.playbackRate < 0){
                        if(videoDom.playbackRate <= (-32)){
                            console.log("------------playbackstate too small------------");
                            return false;
                        }
                        videoDom.playbackRate = videoDom.playbackRate * 2;
                    }else{
                        videoDom.playbackRate = -1;
                    }
                    console.log(videoDom.playbackRate+"currentTime-------------"+videoDom.currentTime);
                }else{
                    return false;
                }
                break;
        }
    }
    //设置全屏
    function setFullScreen(){

    }
    //显示右侧的菜单
    function showMenu(){
        DomObject.$videoDiv.slideDown(2000).hide();
        DomObject.$menuUl.slideDown(1000).show();
        $("#js-menuDiv").css("z-index","10");
        setCurrentRowCss("menu");
    }
    //隐藏右侧菜单并显示视频播放按钮部分
    function hideMenu(){
        DomObject.$videoDiv.slideUp(2000).show();
        DomObject.$menuUl.slideUp(1000).hide();
        $("#js-menuDiv").css("z-index","-1");
        DomObject.$listDiv.removeClass("selected selected-border");
        curr.menuList = 0;
        curr.videoList = 0;
        currentStr = "videoBtnList";
        setCurrentRowCss("video");
    }
    //显示menu每个li下面的菜单
    function showMenuList(){
        switch (curr.menuList){
            case 0://观看历史
                if(menuList.historyList === null || menuList.historyList.length === 0){
                    return false;
                }else{
                    if(DomObject.$historyUl.css("display") == "block"){
                        DomObject.$historyUl.slideUp(1000).delay(100);
                        currentStr = "menuList";
                    }else{
                        var liStr = "";
                        for(var i in menuList.historyList){
                            liStr += "<li data-index='"+i+"'><span class='glyphicon glyphicon-play' aria-hidden='true'></span><span>"+menuList.historyList[i]+"</span></li>"
                        }
                        DomObject.$historyUl.empty().append(liStr).slideDown(1000).delay(100).show();
                        currentStr = "historyList";
                    }
                }
                break;
            case 1://添加影片
                if(menuList.movieList === null || menuList.movieList.length === 0){
                    return false;
                }else{

                }
                break;
            case 2://设置
                if(DomObject.$setDiv.css("display") == "block"){
                    DomObject.$setDiv.slideUp(1000).delay(100);
                    currentStr = "menuList";
                }else{
                    DomObject.$setDiv.slideDown(1000).delay(100).show();
                    currentStr = "setUp";
                    if(menuList.language === null || menuList.language.length === 0){
                    }else{
                        var listr = "<span class='glyphicon glyphicon-menu-left' aria-hidden='true'></span>";
                        listr += "<span id='js-lanSpan'>"+menuList.language[0]+"</span>";
                        listr += "<span class='glyphicon glyphicon-menu-right' aria-hidden='true'></span>";
                        $("#js-languageSpan").empty().append(listr);
                    }
                }
                break;
            case 3://单帧截图
                //===============显示保存图片文件的页面=======================
                DomObject.$menuUl.slideUp(1000).delay(1000).hide();
                DomObject.$saveImgDiv.slideDown(1000).delay(1000).show();
                break;
            case 4://截取片段

                break;
        }
    }
    //设置语言变换
    function changeLanguage(keyCode){
        if(keyCode === numKey.left){
            if(curr.languageList === 0){

            }else {
                curr.languageList--;
            }
        }else if(keyCode === numKey.right){
            if(curr.languageList === menuList.language.length - 1){
            }else{
                curr.languageList++;
            }
        }
        $("#js-lanSpan").text(menuList.language[curr.languageList]);
    }
    //影片比例的改变
    function changeScale(keyCode){
        if(keyCode === numKey.left){
            if(curr.scaleList === 0){
            }else{
                curr.scaleList--;
            }
        }else if(keyCode === numKey.right){
            if(curr.scaleList === DomObject.$scaleUl.children("li").length - 1){

            }else curr.scaleList++;
        }
        DomObject.$scaleUl.children("li").eq(curr.scaleList).addClass("selected").siblings().removeClass("selected");
    }
    function setAllStyle(keyCode){
        if(keyCode === numKey.back){//================这里是back键======================
            if(DomObject.$menuUl.css("display") == "block"){
                hideMenu();
            }else if(DomObject.$saveImgDiv.css("display") == "block"){
                DomObject.$saveImgDiv.slideUp(1000).delay(1000).hide();
                DomObject.$menuUl.slideDown(1000).delay(1000).show();
                currentStr = "menuList";
                setCurrentRowCss("menu");
            }else{
                //add warning dialog
                Oceanus.killApp($('title').text());
            }
            return false;
        }
        switch (currentStr){
            case "videoBtnList"://四个按钮
                var videoUlLength = DomObject.$videoUl.children("li").length;
                var $timeBar = $(".timeBar");
                if(keyCode === numKey.left){
                    if($timeBar.hasClass("selected")){
                        forwardOrRewind("rewind");
                    }else{
                        if(DomObject.$listDiv.hasClass("selected")){
                            DomObject.$listDiv.removeClass("selected selected-border");
                            DomObject.$moveDiv.addClass("selected selected-border");
                        }else if(DomObject.$moveDiv.hasClass("selected")){
                            DomObject.$moveDiv.removeClass("selected selected-border");
                            DomObject.$videoUl.children("li").eq(curr.videoList).addClass("selected");
                        }else{
                            setCurrentRowIndex("sub");
                        }
                    }

                }else if(keyCode === numKey.right){
                    if($timeBar.hasClass("selected")){
                        forwardOrRewind("forward");
                    }else{
                        if(curr.videoList === videoUlLength - 1){
                            DomObject.$videoUl.children("li").removeClass("selected");
                            if(DomObject.$moveDiv.hasClass("selected")){
                                DomObject.$moveDiv.removeClass("selected selected-border");
                                DomObject.$listDiv.addClass("selected selected-border");
                            }else if(DomObject.$listDiv.hasClass("selected")){
                                return false;
                            }else{
                                DomObject.$moveDiv.addClass("selected selected-border");
                            }

                        }else if(curr.videoList <= videoUlLength - 1){
                            setCurrentRowIndex("add");
                        }
                    }
                }else if(keyCode === numKey.down){
                    if($timeBar.hasClass("selected")){
                        $timeBar.removeClass("selected");
                        setCurrentRowCss("video");
                    }else{
                        return false;
                    }
                }else if(keyCode === numKey.up){
                    if(DomObject.$videoUl.children("li").hasClass("selected") || DomObject.$moveDiv.hasClass("selected") || DomObject.$listDiv.hasClass("selected")){
                        DomObject.$videoUl.children("li").removeClass("selected");
                        DomObject.$moveDiv.removeClass("selected selected-border");
                        DomObject.$listDiv.removeClass("selected selected-border");
                        $timeBar.addClass("selected");
                        curr.videoList = 0;
                    }
                }else if(keyCode === numKey.enter){
                    if(DomObject.$videoUl.children("li").hasClass("selected")){
                        setVideoState();
                    }else if(DomObject.$moveDiv.hasClass("selected")){

                    }else if(DomObject.$listDiv.hasClass("selected")){
                        currentStr = "menuList";
                        showMenu();
                    }
                }
                break;
            case "menuList"://menu菜单
                if(keyCode === numKey.down){
                    setCurrentRowIndex("add")
                }else if(keyCode == numKey.up){
                    setCurrentRowIndex("sub");
                }else if(keyCode === numKey.enter){
                    showMenuList();
                }
                break;
            case "historyList"://历史列表
                if(keyCode === numKey.down){
                    setCurrentRowIndex("add")
                }else if(keyCode === numKey.up){
                    setCurrentRowIndex("sub");
                }else if(keyCode === numKey.enter){
                    showMenuList();
                }
                break;
            case "setUp"://影片比例
                var $addText = $("#js-addText");
                var $settingDiv = $("#js-settingDiv");
                if(keyCode === numKey.left){
                    if($settingDiv.hasClass("selected")){
                        changeLanguage(keyCode);
                    }else if(DomObject.$scaleUl.children("li").hasClass("selected")){
                        changeScale(keyCode);
                    }
                }else if(keyCode === numKey.right){
                    if($settingDiv.hasClass("selected")){
                        changeLanguage(keyCode)
                    }else if(DomObject.$scaleUl.children("li").hasClass("selected")){
                        changeScale(keyCode);
                    }
                }else if(keyCode === numKey.down){
                    if(DomObject.$menuUl.children("li").eq(curr.menuList).children("div:first-child").hasClass("selected")){
                        DomObject.$menuUl.children("li").eq(curr.menuList).children("div:first-child").removeClass("selected");
                        $settingDiv.addClass("selected");
                    }else if($settingDiv.hasClass("selected")){
                        $settingDiv.removeClass("selected");
                        DomObject.$scaleUl.children("li").eq(curr.scaleList).addClass("selected")
                    }else if(DomObject.$scaleUl.children("li").hasClass("selected")){
                        DomObject.$scaleUl.children("li").removeClass("selected");
                        $addText.addClass("selected");
                    }
                }else if(keyCode === numKey.up){
                    if($addText.hasClass("selected")){
                        $addText.removeClass("selected");
                        DomObject.$scaleUl.children("li").eq(curr.scaleList).addClass("selected")
                    }else if(DomObject.$scaleUl.children("li").hasClass("selected")){
                        DomObject.$scaleUl.children("li").removeClass("selected");
                        $settingDiv.addClass("selected");
                    }else if($settingDiv.hasClass("selected")){
                        $settingDiv.removeClass("selected");
                        DomObject.$menuUl.children("li").eq(curr.menuList).children("div:first-child").addClass("selected");
                    }
                }else if(keyCode === numKey.enter){
                    if(DomObject.$menuUl.children("li").eq(curr.menuList).children("div:first-child").hasClass("selected")){
                        showMenuList();
                    }else if(DomObject.$scaleUl.children("li").hasClass("selected")){
                        var liStr = "<span class='glyphicon glyphicon-ok' aria-hidden='true'></span>";
                        DomObject.$scaleUl.children("li").find(".glyphicon").remove();
                        DomObject.$scaleUl.children("li").eq(curr.scaleList).prepend(liStr);
                    }
                }
                break;

        }
    }
    DomObject.$videoUl.on("mouseover","li",function(){
        $(this).addClass("selected").siblings().removeClass("selected");
        curr.videoList = parseInt($(this).data("index"));
        DomObject.$moveDiv.removeClass("selected selected-border");
        DomObject.$listDiv.removeClass("selected selected-border");
        $(".timeBar").removeClass("selected");
    }).on("click","li",function(){
        setVideoState();
    });
    DomObject.$listDiv.mouseover(function(){
        DomObject.$listDiv.addClass("selected selected-border");
        DomObject.$moveDiv.removeClass("selected selected-border");
        DomObject.$videoUl.children("li").removeClass("selected");
        $(".timeBar").removeClass("selected");
    }).click(function(){
        showMenu();
        currentStr = "menuList";
    });
    DomObject.$moveDiv.mouseover(function(){
        DomObject.$moveDiv.addClass("selected selected-border");
        DomObject.$listDiv.removeClass("selected selected-border");
        DomObject.$videoUl.children("li").removeClass("selected");
        $(".timeBar").removeClass("selected");
    }).click(function(){
        //========================处理全屏操作============================
    });
    var timeDrag = false;
    $(".timeBar").mouseover(function(){
        DomObject.$videoUl.children("li").removeClass("selected");
        DomObject.$listDiv.removeClass("selected selected-border");
        DomObject.$moveDiv.removeClass("selected selected-border");
        $(this).addClass("selected");
    }).mousedown(function(e) {
        timeDrag = true;
        updatebar(e.pageX);
    });
    $(document).mouseup(function(e) {
        if(timeDrag) {
            timeDrag = false;
            updatebar(e.pageX);
        }
    }).mousemove(function(e) {
        if(timeDrag) {
            updatebar(e.pageX);
        }
    });
    //update Progress Bar control
    var updatebar = function(x) {
        console.log(x+"===============调整进度条===============");
        var $processer = $('.processer');
        var maxduration = videoDuration;
        var position = x - $processer.offset().left; //Click pos
        var percentage = 100 * position / $processer.width();
        if(percentage > 100) {
            percentage = 100;
        }
        if(percentage < 0) {
            percentage = 0;
        }
        //Update progress bar and video currenttime
        $('.timeBar').css('width', percentage+'%');
        videoDom.currentTime = maxduration * percentage / 100;
    };
    DomObject.$menuUl.on("mouseover","li",function(){
        setCurrentRowCss("menu");
        curr.menuList = parseInt($(this).data("index"));
    }).click(function(){
        showMenuList();
    });
    DomObject.$historyUl.on("mouseover","li",function(){
        DomObject.$menuUl.children("li").children("div:first-child").removeClass("selected");
        setCurrentRowCss("history");
        curr.historyList = parseInt($(this).data("index"));
    }).click(function(){

    });
    $(document).keydown(function(event){
        var keyCode = event.keyCode;
        setAllStyle(keyCode);
    });
});