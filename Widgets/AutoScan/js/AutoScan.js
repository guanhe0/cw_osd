loadLanguageFile("auto.js","../../");
$(function(){
    console.log("======================"+countries+"==============");
    var domObject = {
        $allDiv : $("#js-all"),
        $singalUl : $("#js-singalUl"),
        $searchResultBtn : $("#js-search-resultBtn"),
        $optionDirect : $("#js-optionDirect"),//下面的操作指引部分
        $omask:$("#js-mask"),
        $singleSettingList:$("#js-singleSetting")
    }
    var curr = {
        currRowSingal : 0,
        currRowAllAtvSearch : 0,
        currRowDVBTsetting : 0,
        currRowDVBTcountry : 0,
        currRowMask : 0
    };
    var flag = {
        SELECT_SINGAL : 0,
        ALL_SEARCH : 1,
        ATV_SEARCH : 2,
        DTVS_SEARCH: 3,
        DTVC_SEARCH: 4,
        DVBT_SETTING: 5,
        DVBT_SETTING_COUNTRIES : 6,//表示当前操作区域在国家列表部分
        DVBT_SEARCH : 7
    };
    var currFlag = flag.SELECT_SINGAL;//默认操作首页信号选择
    //showInfo("sasdad");
    //showInfo("aaa",1,domObject.$omask,domObject.$singleSettingList,curr.currRowMask);
    setCurrentRowCss(0,0);
    var $infoUl = domObject.$singleSettingList.find("ul");
    function setCurrentRowCss(type,currentRow){
        if(type == 0){//在首先进入autoSearch页面的显示样式
            domObject.$allDiv.children("div").css("display","none");
            domObject.$allDiv.children("div").eq(currentRow).css("display","block");
            if(currentRow == 0){
                //var listStr = "<img src='../common/img/select.png' class='img-selected'/>";
                //domObject.$allDiv.children("div").eq(currentRow).children("ul").children("li:first-child").append(listStr);
                domObject.$allDiv.children("div").eq(currentRow).append(domObject.$optionDirect);
                $("#js-searchBtn").addClass("selected");
            }else if(currentRow == 6){
                var liStr = " <li >Exit</li> ";
                domObject.$searchResultBtn.children("li").remove();
                domObject.$searchResultBtn.append(liStr);
                domObject.$searchResultBtn.children("li").removeClass("selected");
                domObject.$searchResultBtn.children("li").eq(0).addClass("selected")
                domObject.$allDiv.children("div").eq(currentRow).append(domObject.$searchResultBtn);
            }
        }else if(type == 1){//操作首页信源列表的当前行样式
            $("#js-searchBtn").removeClass("selected");
            domObject.$singalUl.children("li").removeClass("selected");
            domObject.$singalUl.children("li").eq(currentRow).addClass("selected");
        }else if(type == 2){//操作$searchResultBtn按钮，在atv个all信号下的按钮
            domObject.$searchResultBtn.children("li").removeClass("selected");
            domObject.$searchResultBtn.children("li").eq(currentRow).addClass("selected");
        }else if(type == 3){//操作DVBT左边的ul
            $("#js-search"+curr.currRowSingal+"").children("ul").children("li").removeClass("selected");
            $("#js-search"+curr.currRowSingal+"").children("ul").children("li").eq(currentRow).addClass("selected");
            if(countries != null && countries.length > 0){
                showCountryList();
            }
        }else if(type == 4){//在DVBT信号下的country列表的样式
            var $hListUl = $("#js-search"+curr.currRowSingal+"").find(".h-list");
            var leftWidth = $hListUl.children("li").eq(curr.currRowDVBTcountry).offset().left;
            var liWidth = parseInt($hListUl.children("li").css("width"));
            var marginWidth = parseInt($hListUl.children("li").css("marginLeft"));
            var bodyWidth = parseInt($("body").width());
            var leftHeight = parseInt($hListUl.css("marginLeft"));
            $hListUl.stop(false,true);
            if(leftWidth + liWidth > bodyWidth){//往右时
                leftHeight = leftHeight - liWidth - marginWidth;
                $hListUl.animate({
                    marginLeft : leftHeight
                },10);
            }else if(leftWidth < 130){
                leftHeight = leftHeight + liWidth + marginWidth;
                $hListUl.animate({
                    marginLeft : leftHeight
                },10);

            }
            $("#js-search"+curr.currRowSingal+"").find(".h-list").children("li").removeClass("selected");
            $("#js-search"+curr.currRowSingal+"").find(".h-list").children("li").eq(currentRow).addClass("selected");
        }else if(type == 5){//操作遮罩层上的列表
            $infoUl.children("li").removeClass("selected");
            $infoUl.children("li").eq(currentRow).addClass("selected");
        }
    }
    //设置当前行数并显示样式
    function addCurrRowCount(type){
        if(type == 0){//往前选择
            if(currFlag == flag.SELECT_SINGAL){//在信号选择页面
                if($("#js-searchBtn").hasClass("selected"))return false;
                if(curr.currRowSingal <= 0){
                    curr.currRowSingal = 0;
                }else{
                    curr.currRowSingal--;
                }
                setCurrentRowCss(1,curr.currRowSingal);
            }else if(currFlag == flag.ALL_SEARCH || currFlag == flag.ATV_SEARCH || currFlag === flag.DVBT_SEARCH){

                if(curr.currRowAllAtvSearch <= 0){
                    curr.currRowAllAtvSearch = 0;
                }else{
                    curr.currRowAllAtvSearch--;
                }

                setCurrentRowCss(2,curr.currRowAllAtvSearch);
            }else if(currFlag == flag.DVBT_SETTING){
                $("#js-search"+curr.currRowSingal+"").find(".h-list").remove();
                if(curr.currRowDVBTsetting <= 0){
                    curr.currRowDVBTsetting = 0;
                }else{
                    curr.currRowDVBTsetting--;
                }
                setCurrentRowCss(3,curr.currRowDVBTsetting);
            }else if(currFlag == flag.DVBT_SETTING_COUNTRIES){
                if(curr.currRowDVBTcountry <= 0){
                    curr.currRowDVBTcountry = 0;
                }else{
                    curr.currRowDVBTcountry--;
                }
                setCurrentRowCss(4,curr.currRowDVBTcountry);
            }
        }else if(type == 1){//往后选择
            if(currFlag == flag.SELECT_SINGAL){//在信号选择页面
                if($("#js-searchBtn").hasClass("selected"))return false;
                if(curr.currRowSingal >= domObject.$singalUl.children("li").length - 1){
                    curr.currRowSingal = domObject.$singalUl.children("li").length - 1;
                }else{
                    curr.currRowSingal++;
                }
                setCurrentRowCss(1,curr.currRowSingal);
            }else if(currFlag == flag.ALL_SEARCH || currFlag == flag.ATV_SEARCH || currFlag === flag.DVBT_SEARCH){
                if(curr.currRowAllAtvSearch >= domObject.$searchResultBtn.children("li").length - 1){
                    curr.currRowAllAtvSearch = domObject.$searchResultBtn.children("li").length - 1;
                }else{
                    curr.currRowAllAtvSearch++;
                }
                setCurrentRowCss(2,curr.currRowAllAtvSearch);
            }else if(currFlag == flag.DVBT_SETTING){
                $("#js-search"+curr.currRowSingal+"").find(".h-list").remove();
                if(curr.currRowDVBTsetting >= $("#js-search"+curr.currRowSingal+"").children("ul").children("li").length - 1){

                }else{
                    curr.currRowDVBTsetting++;
                }
                setCurrentRowCss(3,curr.currRowDVBTsetting);
            }else if(currFlag == flag.DVBT_SETTING_COUNTRIES){
                if(curr.currRowDVBTcountry >= $("#js-search"+curr.currRowSingal+"").find(".h-list").children("li").length - 1){

                }else{

                    curr.currRowDVBTcountry++;
                }
                setCurrentRowCss(4,curr.currRowDVBTcountry);
            }
        }
    }
    function setAllStyle(keyCode){
        switch (keyCode){
            case numKey.up:
                if(currFlag == flag.SELECT_SINGAL){//在信号选择页面
                    if(!$("#js-searchBtn").hasClass("selected")){
                        domObject.$singalUl.children("li").removeClass("selected");
                        $("#js-searchBtn").addClass("selected")
                    }else{
                        return false;
                    }
                }else if(currFlag == flag.DVBT_SETTING){
                    addCurrRowCount(0);
                }else if(currFlag == flag.DVBT_SETTING_COUNTRIES){
                    $("#js-search"+curr.currRowSingal+"").find(".h-list").removeClass("horizontalList-move").addClass("horizontalList-noMove");
                    $("#js-search"+curr.currRowSingal+"").find(".h-list").children("li").removeClass("selected");
                    $("#js-search"+curr.currRowSingal+"").children("ul").children("li").eq(curr.currRowDVBTsetting)
                        .removeClass("li-height-change").addClass("li-height-noChange").addClass("selected");
                    currFlag = flag.DVBT_SETTING;
                    curr.currRowDVBTcountry = 0;
                }
                break;
            case numKey.down:
                if(currFlag == flag.SELECT_SINGAL){//在信号选择页面
                    if($("#js-searchBtn").hasClass("selected")){
                        curr.currRowSingal = 0;
                        setCurrentRowCss(1,curr.currRowSingal)
                    }else{
                        return false;
                    }
                }else if(currFlag == flag.DVBT_SETTING){

                    addCurrRowCount(1);
                }else if(currFlag == flag.DVBT_SETTING_COUNTRIES){
                    $("#js-search"+curr.currRowSingal+"").find(".h-list").removeClass("horizontalList-move").addClass("horizontalList-noMove");
                    $("#js-search"+curr.currRowSingal+"").find(".h-list").children("li").removeClass("selected");
                    $("#js-search"+curr.currRowSingal+"").children("ul").children("li").eq(curr.currRowDVBTsetting)
                        .removeClass("li-height-change").addClass("li-height-noChange").addClass("selected");
                    currFlag = flag.DVBT_SETTING;
                    curr.currRowDVBTcountry = 0;
                    addCurrRowCount(1);
                }
                break;
            case  numKey.left:
                if(currFlag != flag.DVBT_SETTING){
                    addCurrRowCount(0);
                }else{
                    return false;
                }
                break;
            case numKey.right:
                if(currFlag != flag.DVBT_SETTING){
                    addCurrRowCount(1);
                }else if(currFlag == flag.DVBT_SETTING){
                    currFlag = flag.DVBT_SETTING_COUNTRIES;
                    $("#js-search"+curr.currRowSingal+"").find(".h-list").removeClass("horizontalList-noMove").addClass("horizontalList-move");
                    $("#js-search"+curr.currRowSingal+"").find("ul").children("li").removeClass("li-height-change").removeClass("li-height-noChange").removeClass("selected");
                    $("#js-search"+curr.currRowSingal+"").find("ul").children("li").eq(curr.currRowDVBTsetting).addClass("li-height-change");
                    $("#js-search"+curr.currRowSingal+"").find(".h-list").removeClass("selected");
                    $("#js-search"+curr.currRowSingal+"").find(".h-list").children("li").eq(curr.currRowDVBTcountry).addClass("selected");

                }
                break;
            case numKey.enter:
                if(currFlag == flag.SELECT_SINGAL){//在信号选择页面
                    if($("#js-searchBtn").hasClass("selected")){//selected时等于选择All搜台
                        var $img = domObject.$allDiv.children("div").eq(0).children("ul").children("li:first-child").find("img");
                        if($img.length > 0){//如果all选择了，就直接全部搜台
                            setSearchDivOption(0);
                            currFlag = flag.ALL_SEARCH;
                        }else{//没选择all时，分别搜台,这里没反应
                            return false;
                        }
                    }else{//选择每一项分别搜台时，就要将all的对号去掉
                        if(curr.currRowSingal == 0){
                            setSearchDivOption(0);
                            currFlag = flag.ALL_SEARCH;
                        } else{
                            if(curr.currRowSingal == 1){//atv
                                setSearchDivOption(0);
                                currFlag = flag.ATV_SEARCH;
                            }else if(curr.currRowSingal == 4){//dtv-t
                                setSearchDivOption(1);
                                currFlag = flag.DVBT_SETTING;
                            }
                        }
                    }
                }else if(currFlag == flag.ALL_SEARCH || currFlag == flag.ATV_SEARCH || currFlag == flag.DVBT_SEARCH){
                    if(domObject.$searchResultBtn.children("li").length > 1){//说明有两个选项，搜台已经结束了
                        if(curr.currRowAllAtvSearch == 0){//Done
                            setCurrentRowCss(0,0);
                            $("#js-searchBtn").removeClass("selected");
                            currFlag = flag.SELECT_SINGAL;
                        }else{//Retry
                            showInfo("您确定要重新搜台？",1,domObject.$omask,domObject.$singleSettingList,curr.currRowMask);
                        }
                    }else{//搜台还没结束
                        //=========================暂停搜台=================================

                        setScanPauseResume("pause",keyCode);
                    }
                }else if(currFlag == flag.DVBT_SETTING_COUNTRIES){
                    var countrieStr = countries[curr.currRowDVBTsetting];
                    var countryArray = {};
                    if(countrieStr.length > 0) {
                        countryArray = countrieStr.toString().split(",");
                    }
                    var country = countryArray[curr.currRowDVBTcountry];

                    
                    //根据国家进行dvbt搜台
                    setCurrentRowCss(0,6);
                    currFlag = flag.DVBT_SEARCH;
                    ScanManager.startDtvAutoScan();
                    setScanType("dtv_begin");
                }
                break;
           case numKey.back:
               console.log("+++++++"+currFlag+"********************************************");
                if(currFlag == flag.SELECT_SINGAL){
                    //--------跳到上一个页面---------
                    var cmdJson = "{\"cmd\":\"AUTOSCAN_WIDGET\",\"value\":{\"option\":\"DISMISS\"}}";
                    Oceanus.sendEvent("ChannelScan", cmdJson);
                }else if(currFlag == flag.ALL_SEARCH || currFlag == flag.ATV_SEARCH || currFlag == flag.DVBT_SEARCH){
                    //=========================调用暂停搜台=============================
                    setScanPauseResume("pause",keyCode);
                }else if(currFlag == flag.DVBT_SETTING){
                    setCurrentRowCss(0,0);
                    $("#js-searchBtn").removeClass("selected");
                    currFlag = flag.SELECT_SINGAL;
                }else if(currFlag == flag.DVBT_SETTING_COUNTRIES){
                    $("#js-search"+curr.currRowSingal+"").find(".h-list").removeClass("horizontalList-move").addClass("horizontalList-noMove");
                    $("#js-search"+curr.currRowSingal+"").find(".h-list").children("li").removeClass("selected");
                    $("#js-search"+curr.currRowSingal+"").children("ul").children("li").eq(curr.currRowDVBTsetting)
                        .removeClass("li-height-change").addClass("li-height-noChange").addClass("selected");
                    currFlag = flag.DVBT_SETTING;
                    /*curr.currRowDVBTcountry = 0;*/
                    addCurrRowCount(0);
                }
                break;
        }
    }

    /**
     * 设置暂停和恢复搜台
     * @param type
     */
    function setScanPauseResume(type,keyCode){
        if(type == "pause"){
            if(flag_scan == 0){//搜ATV
                if(flag_atv == 0){
                    showInfo("您确定要停止搜台？",1,domObject.$omask,domObject.$singleSettingList,curr.currRowMask);
                    console.log("pauseAtvScan")
                    ScanManager.pauseAtvScan();
                }else{
                    if(keyCode == numKey.back){
                        if(currFlag == flag.ATV_SEARCH){
                            domObject.$omask.css("display","none");
                            domObject.$singleSettingList.css("display","none");
                            currFlag = flag.SELECT_SINGAL;
                            curr.currRowSingal = 0;
                            setCurrentRowCss(0,0);
                            $("#js-searchBtn").removeClass("selected");
                        }
                    }
                }
            }else if(flag_scan == 1){//搜DTV
                if(flag_dtv == 0){
                    showInfo("您确定要停止搜台？",1,domObject.$omask,domObject.$singleSettingList,curr.currRowMask);
                    console.log("pauseDtvScan")
                    ScanManager.pauseDtvScan();
                }else{
                    domObject.$omask.css("display","none");
                    domObject.$singleSettingList.css("display","none");
                    currFlag = flag.SELECT_SINGAL;
                    curr.currRowSingal = 0;
                    setCurrentRowCss(0,0);
                    $("#js-searchBtn").removeClass("selected");
                }
            }
        }else if(type == "resume"){

        }
    }
    function setScanType(type){
        switch (type){
            case "atv_begin":
                var params = {
                    cmd : "AUTO_SCAN_BEIGN",
                    value : {
                        scanType : "ATV"
                    }
                };
                Oceanus.sendEvent("ChannelScan", JSON.stringify(params));
                break;
            case "atv_end":
                var paramsAtvEnd = {
                    cmd : "AUTO_SCAN_END",
                    value : {
                        scanType : "ATV"
                    }
                };
                Oceanus.sendEvent("ChannelScan", JSON.stringify(paramsAtvEnd));
                break;
            case "dtv_begin":
                var paramsDtvBeign = {
                    cmd : "AUTO_SCAN_BEIGN",
                    value : {
                        scanType : "DTV"
                    }
                };
                Oceanus.sendEvent("ChannelScan", JSON.stringify(paramsDtvBeign));
                break;
            case "dtv_end":
                var paramsDtvEnd = {
                    cmd : "AUTO_SCAN_END",
                    value : {
                        scanType : "DTV"
                    }
                };
                Oceanus.sendEvent("ChannelScan", JSON.stringify(paramsDtvEnd));
                break;

        }
    }
    var percent = 50;
    var flag_atv = 0;//atv开始还是结束了
    var flag_dtv = 0;
    var flag_scan = 0;//0---atv,1---dtv
    function onScanListener(ScanParams){
        console.log(JSON.stringify(ScanParams));
        var scanParams = JSON.parse(ScanParams);
        percent = scanParams.percent;
        if(scanParams.scanType === "ATV"){
            flag_scan = 0;
            if(currFlag == flag.ALL_SEARCH){//先搜atv再搜dtv
                if(scanParams.percent < 100){
                    var liStrs = " <li >Exit</li> ";
                    domObject.$searchResultBtn.children("li").remove();
                    domObject.$searchResultBtn.append(liStrs);
                    setCurrentRowCss(2,0);
                    $("#js-atvData").text(scanParams.scanedChNum);
                    $(".processer").css("width",scanParams.percent+"%");
                    flag_atv = 0;
                }else{
                    $(".processer").css("width",scanParams.percent+"%");
                    ScanManager.stopAtvScan();
                    flag_atv = 1;
                    setTimeout(function() {
                        $(".processer").css("width",0+"%");
                        console.log("stopAtvScan");
                        setScanType("atv_end");
                    },100);
                    setTimeout(function(){
                        ScanManager.startDtvAutoScan();
                        setScanType("dtv_begin");
                    },500);

                }
            }else if(currFlag == flag.ATV_SEARCH){
                $(".processer").css("width",scanParams.percent+"%");
                if(scanParams.percent < 100){
                    var liStrs = " <li >Exit</li> ";
                    domObject.$searchResultBtn.children("li").remove();
                    domObject.$searchResultBtn.append(liStrs);
                    setCurrentRowCss(2,0);
                    flag_atv = 0;
                    $("#js-atvData2").text(scanParams.scanedChNum);
                    var sFreq = (scanParams.frequencyKHz / 1000) + "Mhz";
                    $("#js-frequency").text(sFreq);
                }else{
                    var liStr = " <li >Done</li><li>Retry</li> ";
                    //对$searchResultBtn进行操作
                    domObject.$searchResultBtn.children("li").remove();
                    domObject.$searchResultBtn.append(liStr);
                    setCurrentRowCss(2,0);
                    flag_atv = 1;
                    ScanManager.stopAtvScan();
                    setTimeout(function() {
                        console.log("stopAtvScan");
                        setScanType("atv_end");
                    },500);
                }
            }
        }else if(scanParams.scanType === "DTV"){
            flag_scan = 1;
            if(currFlag == flag.ALL_SEARCH){
                $(".processer").css("width",scanParams.percent+"%");
                if(scanParams.scanStatus != 8){
                    var liStrs = " <li >Exit</li> ";
                    domObject.$searchResultBtn.children("li").remove();
                    domObject.$searchResultBtn.append(liStrs);
                    setCurrentRowCss(2,0);
                    flag_dtv = 0;
                    $("#js-dtvData").text(scanParams.dtvCount);
                    $("#js-radiData").text(scanParams.radioCount);
                    $("#js-data").text(scanParams.dataCount);
                }else{
                    var liStr = " <li >Done</li><li>Retry</li> ";
                    domObject.$searchResultBtn.children("li").remove();
                    domObject.$searchResultBtn.append(liStr);
                    setCurrentRowCss(2,0);
                    console.log("stopDtvScan");
                    flag_dtv = 1;
                    setScanType("dtv_end");

                }
            }else if(currFlag == flag.DVBT_SEARCH){
                $(".processer").css("width",scanParams.percent+"%");
                if(scanParams.scanStatus != 8){
                    var liStrs = " <li >Exit</li> ";
                    domObject.$searchResultBtn.children("li").remove();
                    domObject.$searchResultBtn.append(liStrs);
                    setCurrentRowCss(2,0);
                    flag_dtv = 0;
                    $("#js-dvbDtv").text(scanParams.dtvCount);
                    $("#js-dvbRadio").text(scanParams.radioCount);
                    $("#js-dvbData").text(scanParams.dataCount);
                    $("#js-dvbCurRfNum").text(scanParams.curRFNum);
                }else{
                    var liStr = " <li >Done</li><li>Retry</li> ";
                    domObject.$searchResultBtn.children("li").remove();
                    domObject.$searchResultBtn.append(liStr);
                    setCurrentRowCss(2,0);
                    flag_dtv = 1;
                    console.log("stopDtvScan");
                    setScanType("dtv_end");
                }
            }
        }
    }
    var windowId = getUrlValue('window')?parseInt(getUrlValue('window')):0;
    console.log("windowId: "+windowId);
    Oceanus.addPlatformEventListener(onScanListener,windowId);
    
    //在遮罩层存在时按键操作
    function setMaskStyle(keyCode) {
        switch (keyCode) {
            case  numKey.left:
                if (curr.currRowMask <= 0) {
                    curr.currRowMask == 0;
                } else {
                    curr.currRowMask--;
                }
                setCurrentRowCss(5, curr.currRowMask);
                break;
            case numKey.right:
                if (curr.currRowMask >= $infoUl.children("li").length - 1) {
                    curr.currRowMask = $infoUl.children("li").length - 1;
                } else {
                    curr.currRowMask++;
                }
                setCurrentRowCss(5, curr.currRowMask);
                break;
            case numKey.enter:
                if(curr.currRowMask == 0){//确定
                    console.log(flag_scan+"--------------------------"+flag_atv);
                    domObject.$allDiv.children("div").eq(0).children("ul").children("li").find("img").remove();
                    domObject.$singalUl.children("li").eq(curr.currRowSingal).append(imgStr);
                    if(flag_scan == 0){//当前搜atv
                        if(flag_atv == 0){//还没有搜完
                            //==================结束atv搜台===================
                            ScanManager.stopAtvScan();
                            setTimeout(function() {
                                console.log("stopAtvScan");
                                setScanType("atv_end");
                            },100);
                        }else {//搜台完了

                        }
                    }else if(flag_scan == 1){//当前搜dtv
                        if(flag_dtv == 0){//dtv还没搜完
                            //========结束dtv搜台=========
                            console.log("stopDtvScan");
                            setScanType("dtv_end");
                            var liStrs = " <li >Exit</li> ";
                            domObject.$searchResultBtn.children("li").remove();
                            domObject.$searchResultBtn.append(liStrs);
                        }else if(flag_dtv == 1){//dtv搜完了，这时就应该结束ALL_SEARCH了

                        }
                    }
                    domObject.$omask.css("display","none");
                    domObject.$singleSettingList.css("display","none");
                    setCurrentRowCss(0,0);
                    $("#js-searchBtn").removeClass("selected");
                    currFlag = flag.SELECT_SINGAL;
                }else if(curr.currRowMask == 1){//取消
                    if(flag_scan == 0){//当前搜atv
                        if(flag_atv == 0){//还没有搜完
                            //==================恢复atv搜台===================
                            console.log("resumeAtvScan");
                            ScanManager.resumeAtvScan();

                        }else if(flag_atv == 1){//搜台完了
                            //===这时就去搜dtv的台了，不用操作
                        }
                    }else if(flag_scan == 1){//当前搜dtv
                        if(flag_dtv == 0){//dtv还没搜完
                            //========恢复dtv搜台=========
                            console.log("resumeDtvScan");
                            ScanManager.resumeDtvScan();
                        }else if(flag_dtv == 1){//dtv搜完了，这时就应该结束ALL_SEARCH了

                        }
                    }
                    domObject.$omask.css("display","none");
                    domObject.$singleSettingList.css("display","none");
                }
                break;
        }
    }
    var imgStr = "<img src='../../ChannelScan/common/img/select.png' class='img-selected'/>";
    //设置选择某个信号事显示的div,并进行搜台操作
    function setSearchDivOption(type){
        domObject.$allDiv.children("div").css("display","none");
        domObject.$allDiv.children("div").eq(0).children("ul").children("li").find("img").remove();
        domObject.$singalUl.children("li").eq(curr.currRowSingal).append(imgStr);
        if(type == 0){
            console.log("======================="+domObject.$searchResultBtn.children("li").length+"==================================")
            $("#js-search"+curr.currRowSingal+"").css("display","block").append(domObject.$searchResultBtn);
            var liStrs = " <li >Exit</li> ";
            domObject.$searchResultBtn.children("li").remove();
            domObject.$searchResultBtn.append(liStrs);
            curr.currRowAllAtvSearch = 0;
            //对$searchResultBtn进行操作
            setCurrentRowCss(2,0);
            if(curr.currRowSingal == 0 || curr.currRowSingal == 1){//ALL搜台,ATV
                ScanManager.startAtvAutoScan();
                setScanType("atv_begin");
            }
        }else{
            $("#js-search"+curr.currRowSingal+"").css("display","block");
            var $ul = $("#js-search"+curr.currRowSingal+"").children("ul").eq(0);
            $ul.children("li").removeClass("selected");
            $ul.children("li").eq(curr.currRowDVBTsetting).addClass("selected");
            if(curr.currRowSingal == 4){//DVB-T,
                showCountryList();
            }
        }
    }
    //改变country列表的内容
    function showCountryList(){
        if(countries != null && countries.length > 0){
            var listr = "";
            var ae = countries[curr.currRowDVBTsetting];
            var countryArray = ae.toString().split(",");
            listr +="<ul class='h-list' id='js-horizontalList'>";
            if(countryArray.length > 0){
                for(var i in countryArray){
                    listr += "<li>"+countryArray[i]+"</li>";
                }
            }
            listr+="</ul>";
        }

        $("#js-search"+curr.currRowSingal+"").children("ul").children("li").find(".h-list").remove();
        $("#js-search"+curr.currRowSingal+"").children("ul").children("li:eq("+curr.currRowDVBTsetting+")").append(listr);
    }
    $(document).keydown(function(event){
        var keyCode = event.keyCode;
        console.log("keyCode:"+ keyCode);
        if(domObject.$omask.css("display") == "block"){
            setMaskStyle(keyCode);
        }else{
            setAllStyle(keyCode);
        }

    });
});