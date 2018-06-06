loadLanguageFile("scan.js");
$(function(){
    /*加载scan.js中的数据显示到页面上*/
    var channelUl=$("#js-channelUl");
    var singleSettingList=$("#js-singleSetting");
    var tempDtvChannelTitle = dtvChannelTitle;
    var tempAtvChannelTitle = atvChannelTitle;
    var tempSingleList = singleList;
    var tempInputValue=inputValue;
    //设置标志位，标志是否已经打开开关
    var flag_dvbs=0;//0表示已经关闭  1表示已经打开
    var flag_dvbt=0;
    var flag_atv=0;

    var currentRow=0;//信号源列表的当前行
    showSingle();//显示信源列表
    setCurrentRowCss(currentRow);//设置信源列表的样式


    var flag_scan=0;//0代表先搜atv和dtv不同时打开，1代表同时打开
    function startAtvScan(){
        ScanManager.addEventListener("AtvScanListener",onAtvScanListener);
        ScanManager.startAtvAutoScan();
    }
    function onAtvScanListener(AtvScanParams){
        var atvScanParams = JSON.parse(AtvScanParams);
        if(atvScanParams.percent != '100'){
            $("#js-scanResult0").text(atvScanParams.scanedChNum);
            $("#js-scanResult1").text(atvScanParams.frequencyKHz);
            $("#js-scanResult2").text(atvScanParams.percent);
        }else{
            if(flag_scan==1){
                flag_atv=0;//此时搜dtv
                flag_dvbt=1;
                showChannelTitle();
                startDtvAutoScan();
            }else{
                return;
            }
        }
    }
    function startDtvAutoScan () {
        ScanManager.addEventListener("DtvScanListener", onDtvScanListener);
        ScanManager.startDtvAutoScan();
    }
    function onDtvScanListener(DtvScanParams) {
        var dtvScanParams = JSON.parse(DtvScanParams);
        if(dtvScanParams.percent != '100'){
            $("#js-scanResult0").text(dtvScanParams.dtvCount);
            $("#js-scanResult1").text(dtvScanParams.radioCount);
            $("#js-scanResult2").text(dtvScanParams.dataCount);
            $("#js-scanResult4").text(dtvScanParams.percent);
        }else{
               return;
        }
    }
    /**
     * 开始搜台
     * 这里要根据信号打开情况判断搜什么信号的台
     */
    function startScanBySingle(){
        if(flag_dvbt==1){//标志位0表示已经关闭  1表示已经打开
            if(flag_atv==1){
                //先搜atv再搜dtv
                flag_scan = 1;//同时打开
                $("#js-mask").css("display",'none');
                $("#js-singleSetting").css("display",'none');
                //先搜atv，所以讲flag_dvbt置为0
                flag_dvbt=0;
                showChannelTitle();
                startAtvScan();
                return;
            }else{
                flag_scan=0;
                //隐藏遮罩层和信源选项模块
                $("#js-mask").css("display",'none');
                $("#js-singleSetting").css("display",'none');
                showChannelTitle();
                startDtvAutoScan();
            }

        }
        if(flag_dvbs==1){
            alert("开始DVB-S搜台");
        }
        if(flag_atv==1){
            if(flag_dvbt==1){
                //先搜atv再搜dtv
                flag_scan = 1;//同时打开
                $("#js-mask").css("display",'none');
                $("#js-singleSetting").css("display",'none');
                //先搜atv，所以讲flag_dvbt置为0
                flag_dvbt=0;
                showChannelTitle();
                startAtvScan();
                return;
            }else{
                flag_scan=0;
                $("#js-mask").css("display",'none');
                $("#js-singleSetting").css("display",'none');
                showChannelTitle();
                startAtvScan();
            }

        }
    }

    function showChannelTitle(){
        channelUl.children().remove();
        if(flag_dvbt==1){//代表搜DTV的台
            if(tempDtvChannelTitle.length != 0){
                for(var i in tempDtvChannelTitle){
                    channelUl.append("<li> <span id='js-title"+i+"'>"+tempDtvChannelTitle[i]+"</span><span id='js-scanResult"+i+"'></span> </li>");
                }
            }else{
                return;
            }

        }else if (flag_atv==1){//代表搜ATV的台
            if(tempAtvChannelTitle.length != 0){
                for(var i in tempAtvChannelTitle){
                    channelUl.append("<li> <span id='js-title"+i+"'>"+tempAtvChannelTitle[i]+"</span><span id='js-scanResult"+i+"'></span> </li>");
                }
            }else{
                return;
            }

        }
    }
    /**
     * 将信源列表读取出来
     */
    function addSingleList(){
        if(tempSingleList.length != 0){
            for(var i in tempSingleList){
                singleSettingList.append("<div class='single'> <div class='single-info'> <span>"+tempSingleList[i]+"</span>"+
                "</div> <div class='wrap' id='js-wrap"+i+"' >"+
                "<div class='icon_switch' id='js-text"+i+"'>ON</div> </div> </div>");
            }
            singleSettingList.append("<div class='enterButton' id='js-inputEnter'>"+tempInputValue+"</div>");
        }else{
            return;
        }
    }
    /*显示遮罩层和信源信息*/
    function showSingle(){
        //获取页面的文档高和宽
        var height= $(document).height();
        var width=  $(document).width();
        //获取可视区域的高和宽
        var mheight=$(window).height();
        /**
         *  设置遮罩层的样式
         */
        var omask=$("#js-mask");
        omask.css({
            'height':height,
            'width':width,
            'display':'block'
        });
        omask.addClass("mask");
        addSingleList();
        /**
         * 设置信源列表的样式
         */
        singleSettingList.css({
            'width': '350px',
            'height': '170px',
            'position': 'absolute',
            'z-index': '100',
            'background-color': '#ffffff',
            'left':(width-400)/2+"px",/*设置居中*/
            'top':(mheight-300)/2+"px",
            'display':'block',
            'overflow':'hidden'
        });
    }
    function setSingleOpen(currentRow){
        if(currentRow==0){
            if(flag_dvbt==0){
                $("#js-wrap"+currentRow+"").addClass("on");
                $("#js-text"+currentRow+"").text("OFF");
                $("#js-text"+currentRow+"").css({
                    'text-align':'right'
                });
                flag_dvbt=1;
            }else{
                $("#js-wrap"+currentRow+"").removeClass("on");
                $("#js-text"+currentRow+"").text("ON");
                $("#js-text"+currentRow+"").css({
                    'text-align':'left'
                });
                flag_dvbt=0;
            }
        }else if(currentRow==1){
            if(flag_atv==0){
                $("#js-wrap"+currentRow+"").addClass("on");
                $("#js-text"+currentRow+"").text("OFF");
                $("#js-text"+currentRow+"").css({
                    'text-align':'right'
                });
                flag_atv=1;
            }else{
                $("#js-wrap"+currentRow+"").removeClass("on");
                $("#js-text"+currentRow+"").text("ON");
                $("#js-text"+currentRow+"").css({
                    'text-align':'left'
                });
                flag_atv=0;
            }

        }
    }
    function setCurrentRowCss(currentRow){
        singleSettingList.children("div").removeClass("single-li-selected enter-selected");
        if(currentRow != singleSettingList.children("div").length-1){
            singleSettingList.children("div:eq("+currentRow+")").addClass("single-li-selected");
        }else{
            singleSettingList.children("div:eq("+currentRow+")").addClass("enter-selected");
        }

    }
    $(document).keydown(function(event) {
        var keyCode=event.keyCode;
        if(keyCode == numKeyLeft){
           setSingleOpen(currentRow);
        }else if(keyCode == numKeyRight){
            setSingleOpen(currentRow);
        }
        else if(keyCode == numKeyUp){
            if(currentRow <= 0){
                currentRow =  singleSettingList.children("div").length-1;
            }else{
                currentRow--;
            }
            setCurrentRowCss(currentRow);
        }else if(keyCode == numKeyDown){
            if(currentRow >= (singleSettingList.children("div").length-1)){
                currentRow = 0;
            }else{
                currentRow++;
            }
            setCurrentRowCss(currentRow);
        }
        else if(keyCode == numKeyEnter){
            if(currentRow == singleSettingList.children("div").length-1 ){
                startScanBySingle();
            }

        }
    });





});










