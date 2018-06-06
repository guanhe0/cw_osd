loadLanguageFile("auto.js","../../");
$(function(){
    var domObject = {
        $allDiv : $("#js-all"),
        $singalUl : $("#js-singalUl"),
        $searchResultBtn : $("#js-search-resultBtn"),
        $optionDirect : $("#js-optionDirect"),//下面的操作指引部分
        $omask:$("#js-mask"),
        $singleSettingList:$("#js-singleSetting"),
        $atvSettingUl : $("#js-atvSettingUl"),
        $atvSearchUl : $("#js-atvSearchUl"),
        $dvbtSearchUl : $("#js-dvbtSearchUl"),
        $keyBoardUl : $("#js-keyboard")
    };
    var curr = {
        currRowSingal : 0,
        currRowAtvSetting : 0,
        currRowAtvSearch : 0,
        currRowDVBTsearch :0,
        currRowBtn : 0,
        currRowSoundSystem : 0,
        currRowRowColorSystem : 0,
        currRowKeyboard : 0,
        currRowMask : 0
    };
    var flag = {
        SELECT_SINGAL : 0,
        ATV_SETTING : 1,
        ATV_SEARCH : 2,
        DTVS_SEARCH: 3,
        DTVC_SEARCH: 4,
        DVBT_SEARCH: 5,
        DVBT_SEARCH_KEYBOARD : 6
    };
    var currFlag = flag.SELECT_SINGAL;
    //showInfo("aaa",1,domObject.$omask,domObject.$singleSettingList,curr.currRowMask);

    setCurrRowCss(0,0);
    function setCurrRowCss(type,currentRow){
        if(type == 0){//设置信源列表的样式
            domObject.$allDiv.children("div").css("display","none");
            domObject.$allDiv.children("div").eq(0).css("display","block");
            domObject.$singalUl.children("li").removeClass("selected");
            domObject.$singalUl.children("li").eq(currentRow).addClass("selected")
        }else if(type == 1){//操作$searchResultBtn按钮，在atv个all信号下的按钮
            domObject.$searchResultBtn.children("li").removeClass("selected");
            domObject.$searchResultBtn.children("li").eq(currentRow).addClass("selected");
        }else if(type == 2){//操作atv搜台设置页面
            domObject.$atvSettingUl.children("li").removeClass("selected");
            domObject.$atvSettingUl.children("li").eq(currentRow).addClass("selected");
        }else if(type == 3){//操作dvbt页面
            domObject.$dvbtSearchUl.children("li").removeClass("selected");
            domObject.$dvbtSearchUl.children("li").eq(currentRow).addClass("selected");
        }else if(type == 4){//操作keyBoard键盘
            domObject.$keyBoardUl.children("li").removeClass("selected");
            domObject.$keyBoardUl.children("li").eq(currentRow).addClass("selected");
        }else if(type == 5){//操作遮罩层
            domObject.$singleSettingList.find("ul").children("li").removeClass("selected");
            domObject.$singleSettingList.find("ul").children("li").eq(currentRow).addClass("selected");
        }
    }
    function addCurrRowCount(type){
        if(type == 0){//向上
            if(currFlag == flag.SELECT_SINGAL){
                if(curr.currRowSingal <= 0){
                    curr.currRowSingal = 0;
                }else{
                    curr.currRowSingal -- ;
                }
                setCurrRowCss(0,curr.currRowSingal);
            }else if(currFlag == flag.ATV_SETTING){
                if(curr.currRowAtvSetting <= 0){
                    curr.currRowAtvSetting = 0;
                }else{
                    curr.currRowAtvSetting --;
                }
                setCurrRowCss(2,curr.currRowAtvSetting);
            }else if(currFlag == flag.DVBT_SEARCH){
                if(domObject.$dvbtSearchUl.children("li").hasClass("selected")){
                    if(curr.currRowDVBTsearch <= 0){
                        curr.currRowDVBTsearch = 0;
                    }else{
                        curr.currRowDVBTsearch--;
                    }
                    setCurrRowCss(3,curr.currRowDVBTsearch);
                }else if(domObject.$searchResultBtn.children("li").hasClass("selected")){
                    if(curr.currRowBtn <= 0){
                        curr.currRowBtn = 0;
                    }else{
                        curr.currRowBtn--;
                    }
                    setCurrRowCss(1,curr.currRowBtn);
                }
            }
        }else if(type==1){//向下
            if(currFlag == flag.SELECT_SINGAL){
                if(curr.currRowSingal >= domObject.$singalUl.children("li").length - 1){
                    curr.currRowSingal = domObject.$singalUl.children("li").length - 1;
                }else{
                    curr.currRowSingal++;
                }
                setCurrRowCss(0,curr.currRowSingal);
            }else if(currFlag == flag.ATV_SETTING){
                if(curr.currRowAtvSetting >= domObject.$atvSettingUl.children("li").length - 1){
                    curr.currRowAtvSetting = domObject.$atvSettingUl.children("li").length - 1;
                }else{
                    curr.currRowAtvSetting++;
                }
                setCurrRowCss(2,curr.currRowAtvSetting);
            }else if(currFlag == flag.DVBT_SEARCH){
                if(domObject.$dvbtSearchUl.children("li").hasClass("selected")){
                    if(curr.currRowDVBTsearch >= domObject.$dvbtSearchUl.children("li").length - 1){
                        curr.currRowDVBTsearch = domObject.$dvbtSearchUl.children("li").length - 1;
                    }else{
                        curr.currRowDVBTsearch++;
                    }
                    setCurrRowCss(3,curr.currRowDVBTsearch);
                }else if(domObject.$searchResultBtn.children("li").hasClass("selected")){
                    if(curr.currRowBtn >= domObject.$searchResultBtn.children("li").length - 1){
                        curr.currRowBtn = domObject.$searchResultBtn.children("li").length - 1;
                    }else{
                        curr.currRowBtn++;
                    }
                    setCurrRowCss(1,curr.currRowBtn);
                }
            }
        }
    }
    var flag_left_right;//0--左，1--右
    function setAllStyle(keyCode){
        var frequencyAtv = parseFloat($("#js-frequency").text());
        var storageTo = parseInt($("#js-storage").text());
        var current = parseInt($("#js-current").text());
        var system = $("#js-sound").text();
        switch (keyCode){
            case numKey.up:
                if(currFlag == flag.SELECT_SINGAL){//操作信源
                    addCurrRowCount(0);
                }else if(currFlag == flag.ATV_SETTING){
                    addCurrRowCount(0);
                }else if(currFlag == flag.DVBT_SEARCH){
                    if(domObject.$searchResultBtn.children("li").hasClass("selected")){
                        domObject.$searchResultBtn.children("li").removeClass("selected");
                        //开始操作上面的频道号列表
                        $("#js-channelInput").addClass("selected");
                        $("#js-channelInput").focusEnd();
                        curr.currRowBtn = 0;
                    }else {
                        return false;
                    }
                }else if(currFlag == flag.DVBT_SEARCH_KEYBOARD){
                    setKeyboardCurrent(keyCode);
                }
                break;
            case numKey.down:
                if(currFlag == flag.SELECT_SINGAL){//操作信源
                    addCurrRowCount(1);
                }else if(currFlag == flag.ATV_SETTING){//atv
                    addCurrRowCount(1);
                }else if(currFlag == flag.DVBT_SEARCH){
                    if($("#js-channelInput").hasClass("selected")){
                        $("#js-channelInput").removeClass("selected");
                        $("#js-channelInput").blur();
                        setCurrRowCss(1,curr.currRowBtn);
                    }else{
                        return false;
                    }
                }else if(currFlag == flag.DVBT_SEARCH_KEYBOARD){
                   setKeyboardCurrent(keyCode);
                }
                break;
            case  numKey.left:
                if(currFlag == flag.DVBT_SEARCH){
                    addCurrRowCount(0);
                }else if(currFlag == flag.ATV_SETTING){
                    switch (curr.currRowAtvSetting){
                        case 0://search
                            /*frequencyAtv -= 1;
                            $("#js-frequency").text(frequencyAtv);*/
                            //===================================================
                            console.log("===flag_left_right======="+flag_left_right);

                            if(flag_left_right == 1 && flag_scan == 0){//如果是往右搜，还没有搜完，就停止
                                ScanManager.stopAtvManualScan();
                                setScanType("atv_end");
                                return false;
                            }else{
                                flag_left_right = 0;
                                console.log("=============ScanManager.startAtvManualScan=====search=========="+frequencyAtv);
                                frequencyAtv = ScanManager.getCurFrequency();
                                console.log("frequencyAtv:"+frequencyAtv);
                                ScanManager.startAtvManualScan(frequencyAtv,1);//1--down
                            }
                            break;
                        case 1://fine-tone
                            /*frequencyAtv =frequencyAtv - 0.1;
                            $("#js-frequency").text(frequencyAtv.toFixed(2));*/
                            frequencyAtv -= 1;
                            $("#js-frequency").text(frequencyAtv+"MHZ");
                            console.log("=============ScanManager.startAtvManualScan====Fine-Tine===========")
                            ScanManager.startAtvManualScan(frequencyAtv,2);
                            break;
                        case 2://Storage to,在这项调整时，Current不用调整
                            if(storageTo <= 0){
                            }else{
                                storageTo -= 1;
                            }
                            $("#js-storage").text(storageTo);
                            break;
                        case 3://Current，Current调整时Storage to要跟着调整
                            current -= 1;
                            storageTo -= 1;
                            $("#js-current").text(current);
                            $("#js-storage").text(storageTo);
                            console.log("==============ChannelManager.gotoformerchannel()===============")
                            ChannelManager.gotoformerchannel();
                            break;
                        case 4://Sound System
                            if(curr.currRowSoundSystem <= 0){
                                curr.currRowSoundSystem = 0
                            }else{
                                curr.currRowSoundSystem--;
                            }
                            $("#js-sound").text(soundSystem[curr.currRowSoundSystem]);
                            //====================改变后=====================
                            console.log("==============ScanManager.setSoundSystem===============")
                            ScanManager.setSoundSystem(curr.currRowSoundSystem);
                            break;
                        case 5://Color System
                            if(curr.currRowRowColorSystem <= 0){
                                curr.currRowRowColorSystem = 0
                            }else{
                                curr.currRowRowColorSystem--;
                            }
                            $("#js-color").text(colorSystem[curr.currRowRowColorSystem]);
                            console.log("==============ScanManager.setVideoStandard===============")

                            ScanManager.setVideoStandard(curr.currRowRowColorSystem);
                            break;
                    }
                }else if(currFlag == flag.DVBT_SEARCH_KEYBOARD){
                    setKeyboardCurrent(keyCode);
                }
                break;
            case numKey.right:
                if(currFlag == flag.DVBT_SEARCH){
                    addCurrRowCount(1);
                }else if(currFlag == flag.ATV_SETTING){
                    switch (curr.currRowAtvSetting){
                        case 0://search
                            /*frequencyAtv += 1;
                            $("#js-frequency").text(frequencyAtv);*/
                            console.log("----------flag_left_right---------------"+flag_left_right);;
                            if(flag_left_right == 0 && flag_scan == 0){//如果是往右搜，还没有搜完，就停止
                                ScanManager.stopAtvManualScan();
                                setScanType("atv_end");
                                return false;
                            }else{
                                flag_left_right = 1;
                                console.log("============ScanManager.startAtvManualScan======search======"+frequencyAtv);
                                frequencyAtv = ScanManager.getCurFrequency();
                                console.log("frequencyAtv:"+frequencyAtv);
                                ScanManager.startAtvManualScan(frequencyAtv,0);//0===up
                            }
                            break;
                        case 1://fine-tone
                           /* frequencyAtv = frequencyAtv + (0.1);
                            $("#js-frequency").text(frequencyAtv.toFixed(2));*/
                            frequencyAtv += 1;
                            $("#js-frequency").text(frequencyAtv+"MHZ");
                            console.log("============ScanManager.startAtvManualScan=====Fine-Tone=======")
                            ScanManager.startAtvManualScan(frequencyAtv,2);
                            break;
                        case 2://Storage to
                            if(storageTo >= 255){
                            }else{
                                storageTo += 1;
                            }
                            $("#js-storage").text(storageTo);
                            break;
                        case 3://Current
                            current += 1;
                            storageTo += 1;
                            $("#js-current").text(current);
                            $("#js-storage").text(storageTo);
                            console.log("============ChannelManager.gotoNextChannel()============");
                            ChannelManager.gotoNextChannel();
                            break;
                        case 4://Sound System
                            if(curr.currRowSoundSystem >= soundSystem.length - 1){
                                curr.currRowSoundSystem = soundSystem.length - 1;
                            }else{
                                curr.currRowSoundSystem++;
                            }
                            $("#js-sound").text(soundSystem[curr.currRowSoundSystem]);
                            console.log("========== ScanManager.setSoundSystem============")
                            ScanManager.setSoundSystem(curr.currRowSoundSystem);
                            break;
                        case 5://Color System
                            if(curr.currRowRowColorSystem >= colorSystem.length - 1){
                                curr.currRowRowColorSystem = colorSystem.length - 1;
                            }else{
                                curr.currRowRowColorSystem++;
                            }
                            $("#js-color").text(colorSystem[curr.currRowRowColorSystem]);
                            console.log("========== ScanManager.setVideoStandard============")
                            ScanManager.setVideoStandard(curr.currRowRowColorSystem);
                            break;

                    }
                }else if(currFlag == flag.DVBT_SEARCH_KEYBOARD){
                    setKeyboardCurrent(keyCode);
                }
                break;
            case numKey.enter:
                if(currFlag == flag.SELECT_SINGAL){
                    switch (curr.currRowSingal){
                        case 0://atv
                            domObject.$allDiv.children("div").css("display","none");
                            $("#js-atv1").css("display","block");
                            currFlag = flag.ATV_SETTING;
                            curr.currRowAtvSetting = 0;
                            $(".processer").css("width","0px");
                            domObject.$atvSettingUl.css("width","300px");
                            domObject.$atvSettingUl.children("li").removeClass("selected");
                            domObject.$atvSettingUl.children("li").eq(curr.currRowAtvSetting).addClass("selected");
                            //=====================进入该页面就要获取频率=========================
                            console.log("==getCurFrequency=====getcurchannelnumber=====getSoundSystem========getVideoStandard==========")
                            var curSource = SourceManager.getCurSource();
                            if (curSource != 1/*ATV*/)
                            {
                                SourceManager.setInputSource(1/*ATV*/);
                            }
                            var frequency = ScanManager.getCurFrequency();//获取当前频率
                            var current = ChannelManager.getcurchannelnumber();//获取当前频道号
                            var sound = ScanManager.getSoundSystem();//获取sound--index
                            var color = ScanManager.getVideoStandard();//获取color--index
                            console.log(frequency+"----"+current+"---"+sound+"--"+color);
                            $("#js-frequency").text((frequency / 1000) + "MHZ");
                            $("#js-storage").text(current);
                            $("#js-current").text(current+1);
                            $("#js-sound").text(soundSystem[sound]);
                            $("#js-color").text(colorSystem[color]);
                            curr.currRowRowColorSystem = color;
                            curr.currRowSoundSystem = sound;
                              break;
                        case 1://dvbs

                            break;
                        case 2://dvbc

                            break;
                        case 3://dvbt
                            domObject.$allDiv.children("div").css("display","none");
                            $("#js-dvbt").css("display","block");
                            currFlag = flag.DVBT_SEARCH;
                            curr.currRowDVBTsearch = 0;
                            setResultBtn();
                            $("#js-channelInput").addClass("selected").focus();
                            console.log("-----------SourceManager.getCurSource-------------")
                            var curSource = SourceManager.getCurSource();//切通道
                            if (curSource != 11/*DTV*/)
                            {
                                SourceManager.setInputSource(11/*DTV*/);
                            }
                            break;
                    }
                }else if(currFlag == flag.DVBT_SEARCH){
                    if($("#js-channelInput").hasClass("selected")){
                        $("#js-dvbtVHF").removeClass("keyboard-hide").addClass("keyboard-show");
                        currFlag = flag.DVBT_SEARCH_KEYBOARD;
                        domObject.$keyBoardUl.children("li").removeClass("selected");
                        $("#js-channelInput").focusEnd();
                    }else{//在下面的search和Done按钮上
                        if(curr.currRowBtn == 0){//Search
                            var frequencyDtv = parseFloat($("#js-channelInput").val());
                            console.log("=---------ScanManager.setDtvManualScanByRF--------startDtvManualScan------")
                            var value = $("#js-channelInput").val();
                            if(value == "" || value == null || value.indexOf(0) == "0"){
                                console.log("=--------don`t  Scan----------")
                                return ;
                            }
                            ScanManager.setDtvManualScanByRF(frequencyDtv);
                            ScanManager.startDtvManualScan();
                        }else{
                            var cmdJson = "{\"cmd\":\"MANUALSCAN_WIDGET\",\"value\":{\"option\":\"DISMISS\"}}";
                            Oceanus.sendEvent("ChannelScan", cmdJson);
                            currFlag = flag.SELECT_SINGAL;
                            curr.currRowSingal = 0;
                        }
                    }
                }else if(currFlag == flag.DVBT_SEARCH_KEYBOARD){
                    if($("#js-channelInput").hasClass("selected")){
                        $("#js-dvbtVHF").removeClass("keyboard-show").addClass("keyboard-hide");
                        currFlag = flag.DVBT_SEARCH;
                        $("#js-channelInput").focusEnd();
                        return;
                    }
                    setKeyboardValue();
                }else if(currFlag == flag.ATV_SETTING){//按enter键出现左右键的图标
                    switch (curr.currRowAtvSetting){
                        case 0://search,按ok键时出现两个左右图片
                            if(domObject.$atvSettingUl.children("li").eq(0).hasClass("img-show")){
                                domObject.$atvSettingUl.children("li").eq(0).removeClass("img-show").addClass("img-hide");
                            }else{
                                domObject.$atvSettingUl.children("li").eq(0).removeClass("img-hide").addClass("img-show");
                            }
                            break;
                        case 1://fine-tine
                            if(domObject.$atvSettingUl.children("li").eq(0).hasClass("img-show")){
                                domObject.$atvSettingUl.children("li").eq(0).removeClass("img-show").addClass("img-hide");
                            }
                            if(domObject.$atvSettingUl.children("li").eq(1).hasClass("img-show")){
                                domObject.$atvSettingUl.children("li").eq(1).removeClass("img-show").addClass("img-hide");
                            }else{
                                domObject.$atvSettingUl.children("li").eq(1).removeClass("img-hide").addClass("img-show");
                            }
                            break;
                        case 2://Storage TO
                            if(domObject.$atvSettingUl.children("li").eq(1).hasClass("img-show")){
                                domObject.$atvSettingUl.children("li").eq(1).removeClass("img-show").addClass("img-hide");
                            }
                            if(flag_scan == 0){//没搜到台
                                return false;
                            }else if(flag_scan == 1){
                                //==============搜到台就要保存台===================
                                console.log("=========ScanManager.saveAtvChannel==========");
                                ScanManager.saveAtvChannel(parseInt($("#js-storage").text()));
                            }
                            break;
                    }
                }

                break;
            case numKey.back:
                if(currFlag == flag.SELECT_SINGAL){
                    var cmdJson = "{\"cmd\":\"MANUALSCAN_WIDGET\",\"value\":{\"option\":\"DISMISS\"}}";
                    Oceanus.sendEvent("ChannelScan", cmdJson);
                }else if(currFlag == flag.ATV_SETTING ){
                    if(flag_scan == 0){//还没搜到台
                        //showInfo("您确定要停止搜台",1,domObject.$omask,domObject.$singleSettingList,0);
                        ScanManager.stopAtvManualScan();
                        setScanType("atv_end");

                    }else{
                        /*console.log("=========ScanManager.saveAtvChannel=====back=====");
                        ScanManager.saveAtvChannel(parseInt($("#js-storage").text()));
                        setCurrRowCss(0,0);
                        currFlag = flag.SELECT_SINGAL;*/
                    }
                    setCurrRowCss(0,0);
                    currFlag = flag.SELECT_SINGAL;
                    curr.currRowSingal = 0;
                }else if(currFlag == flag.DVBT_SEARCH){
                    //showInfo("您确定要停止搜台",1,domObject.$omask,domObject.$singleSettingList,0);
                    if(flag_scan == 0){//还没搜完，停止搜台并退出
                        ScanManager.stopDtvScan();
                        setScanType("dtv_end");
                    }
                    setCurrRowCss(0,0);
                    currFlag = flag.SELECT_SINGAL;
                    curr.currRowSingal = 0;
                }else if(currFlag == flag.DVBT_SEARCH_KEYBOARD){
                    $("#js-dvbtVHF").removeClass("keyboard-show").addClass("keyboard-hide");
                    $("#js-channelInput").addClass("selected").focus();
                    curr.currRowKeyboard = 0;
                    currFlag = flag.DVBT_SEARCH;
                }
                break;
        }
    }
    function setScanType(type){
        switch (type){
            case "atv_begin":
                var params = {
                    cmd : "MANUAL_SCAN_BEIGN",
                    value : {
                        scanType : "ATV"
                    }
                };
                Oceanus.sendEvent("ChannelScan", JSON.stringify(params));
                break;
            case "atv_end":
                var paramsAtvEnd = {
                    cmd : "MANUAL_SCAN_END",
                    value : {
                        scanType : "ATV"
                    }
                };
                Oceanus.sendEvent("ChannelScan", JSON.stringify(paramsAtvEnd));
                break;
            case "dtv_begin":
                var paramsDtvBeign = {
                    cmd : "MANUAL_SCAN_BEIGN",
                    value : {
                        scanType : "DTV"
                    }
                };
                Oceanus.sendEvent("ChannelScan", JSON.stringify(paramsDtvBeign));
                break;
            case "dtv_end":
                var paramsDtvEnd = {
                    cmd : "MANUAL_SCAN_END",
                    value : {
                        scanType : "DTV"
                    }
                };
                Oceanus.sendEvent("ChannelScan", JSON.stringify(paramsDtvEnd));
                break;

        }
    }
    var flag_scan = 0;//0--正在搜台，1---已搜到台
    function onScanListener(ScanParams){
        console.log(JSON.stringify(ScanParams));
        var scanParams = JSON.parse(ScanParams);
        if(scanParams.scanType === "ATV"){
            var sFreq = (scanParams.frequencyKHz / 1000) + "MHZ";
            $(".processer").css("width",scanParams.percent+"%");
            if(scanParams.percent < 100){
                flag_scan = 0;
                $("#js-frequency").text(sFreq);
            }else{//========在percent为100时说明搜到台了，这时就要刷新页面，把新搜到的台信息显示出来
                console.log("=============ScanManager.stopAtvManualScan======");
                flag_scan = 1;
                var current = ChannelManager.getcurchannelnumber();//获取当前频道号
                var sound = ScanManager.getSoundSystem();//获取sound--index
                var color = ScanManager.getVideoStandard();//获取color--index
                $("#js-frequency").text(sFreq);
                $("#js-current").text(current);
                $("#js-sound").text(soundSystem[sound]);
                $("#js-color").text(colorSystem[color]);
                ScanManager.stopAtvManualScan();
                setScanType("atv_end");
            }
        }else if(scanParams.scanType === "DTV"){
            $("#js-dtvSpan").text(scanParams.dtvCount);
            $("#js-dataSpan").text(scanParams.radioCount);
            $("#js-radioSpan").text(scanParams.dataCount);
            if(scanParams.scanStatus != 8){
                flag_scan = 0;
            }else{
                if(scanParams.dtvCount == 0 && scanParams.radioCount == 0 && scanParams.dataCount == 0){
                    $("#js-warning").text("No Singal");
                }
                flag_scan = 1;
                ScanManager.stopDtvScan();
                setScanType("dtv_end");
            }
        }
    }
    var windowId = getUrlValue('window')?parseInt(getUrlValue('window')):0;
    console.log("windowId: "+windowId);
    Oceanus.addPlatformEventListener(onScanListener,windowId);
    
    function setResultBtn(){
        var liStr;
        liStr = "<li>Search</li><li>Done</li>"
        domObject.$searchResultBtn.children("li").remove();
        domObject.$searchResultBtn.append(liStr).css("display","block");
        $("#js-dvbtVHF").after(domObject.$searchResultBtn);
    }

    /**
     * 设置软键盘的样式
     */
    function setKeyboardCurrent(keyCode){
        switch (keyCode){
            case numKey.down:
                if($("#js-channelInput").hasClass("selected")){
                    $("#js-channelInput").removeClass("selected").blur();
                    setCurrRowCss(4,curr.currRowKeyboard);
                }else if(domObject.$keyBoardUl.children("li").hasClass("selected") && curr.currRowKeyboard <= 6){
                    if(curr.currRowKeyboard < 5){
                        curr.currRowKeyboard += 7;
                    }else if(curr.currRowKeyboard == 6 || curr.currRowKeyboard == 5){
                        curr.currRowKeyboard = 12;
                    }
                    setCurrRowCss(4,curr.currRowKeyboard);
                }else if(domObject.$keyBoardUl.children("li").hasClass("selected") && curr.currRowKeyboard > 6){
                    $("#js-dvbtVHF").removeClass("keyboard-show").addClass("keyboard-hide");
                    $("#js-channelInput").addClass("selected");
                    $("#js-channelInput").focusEnd();
                    curr.currRowKeyboard = 0;
                    currFlag = flag.DVBT_SEARCH;
                }
                break;
            case numKey.up:
                if(domObject.$keyBoardUl.children("li").hasClass("selected") && curr.currRowKeyboard <= 6){
                    $("#js-dvbtVHF").removeClass("keyboard-show").addClass("keyboard-hide");
                    $("#js-channelInput").addClass("selected");
                    $("#js-channelInput").focusEnd();
                    curr.currRowKeyboard = 0;
                    currFlag = flag.DVBT_SEARCH;
                }else if(domObject.$keyBoardUl.children("li").hasClass("selected") && curr.currRowKeyboard > 6){
                    curr.currRowKeyboard -= 7;
                    setCurrRowCss(4,curr.currRowKeyboard);
                }
                break;
            case numKey.left:
                if(document.activeElement.id == ("js-channelInput")){
                    return false;
                }else{
                    if(curr.currRowKeyboard <= 0)return false;
                    curr.currRowKeyboard--;
                    setCurrRowCss(4,curr.currRowKeyboard);
                }

                break;
            case numKey.right:
                if(document.activeElement.id == ("js-channelInput")){
                    return false;
                }else{
                    if(curr.currRowKeyboard >= domObject.$keyBoardUl.children("li").length-1)return false;
                    curr.currRowKeyboard++;
                    setCurrRowCss(4,curr.currRowKeyboard)
                }
                break;
        }
    }

    /**
     * 设置软键盘的值
     */
    function setKeyboardValue(){
        var beforeContent = $("#js-channelInput").val();
        var currentNumber;
        if( 0 <= curr.currRowKeyboard && curr.currRowKeyboard <= 4 ){
            currentNumber = curr.currRowKeyboard + 1;
            $("#js-channelInput").val(beforeContent+currentNumber);
        }else if(7 <=curr.currRowKeyboard && curr.currRowKeyboard<= 10){
            currentNumber = curr.currRowKeyboard - 1;
            $("#js-channelInput").val(beforeContent+currentNumber);
        }else if(curr.currRowKeyboard == 11){
            currentNumber = 0;
            $("#js-channelInput").val(beforeContent+currentNumber);
        }else if(curr.currRowKeyboard == 5){
            currentNumber = ".";
            $("#js-channelInput").val(beforeContent+currentNumber);
        }else if(curr.currRowKeyboard == 6){
            $("#js-channelInput").val(beforeContent.substr(0,beforeContent.length-1));
        }else if(curr.currRowKeyboard == 12){//Enter
            $("#js-dvbtVHF").removeClass("keyboard-show").addClass("keyboard-hide");
            $("#js-channelInput").addClass("selected").focus();
            curr.currRowKeyboard = 0;
            currFlag = flag.DVBT_SEARCH;
        }
    }
    function setMaskStyle(keyCode){
        switch (keyCode){
            case  numKey.left:
                if(curr.currRowMask <= 0){
                    curr.currRowMask = 0;
                }else{
                    curr.currRowMask--;
                }
                setCurrRowCss(5,curr.currRowMask);
                break;
            case numKey.right:
                if(curr.currRowMask >= domObject.$singleSettingList.find("ul").children("li").length - 1){

                }else{
                    curr.currRowMask++;
                }
                setCurrRowCss(5,curr.currRowMask);
                break;
            case numKey.enter:
                if(curr.currRowMask == 0){//确定
                    domObject.$omask.css("display","none");
                    domObject.$singleSettingList.css("display","none");
                    currFlag = flag.SELECT_SINGAL;
                    setCurrRowCss(0,0);
                }else{//取消
                    domObject.$omask.css("display","none");
                    domObject.$singleSettingList.css("display","none");
                    curr.currRowMask = 0;
                }
                break;
            case numKey.back:
                domObject.$omask.css("display","none");
                domObject.$singleSettingList.css("display","none");
                curr.currRowMask = 0;
                break;
        }
    }
    $(document).keydown(function(event){
        var keyCode = event.keyCode;
        if(domObject.$omask.css("display") == "block"){
            setMaskStyle(keyCode);
        }else{
            setAllStyle(keyCode);
        }
    });
});
var input;
$.fn.setCursorPosition = function(position){
    if(this.length == 0) return this;
    return $(this).setSelection(position, position);
}

$.fn.setSelection = function(selectionStart, selectionEnd) {
    if(this.length == 0) return this;
    input = this[0];

    if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    } else if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    }

    return this;
}

$.fn.focusEnd = function(){
    this.setCursorPosition(this.val().length);
}