loadLanguageFile("system.js")
$(function(){
    //获取页面的文档高和宽
    var height= $(document).height();
    var width=  $(document).width();
    var mheight=$(window).height();
    var currentRow=0;//当前行
    var cecStatus = CECManager.getCecStatus();
    var autoStandbyStatus = CECManager.getAutoStandbyMode();
    var arvModeStatus = CECManager.getArcMode();

    var tempsystemOptions = allSettingOption.cecOptions
    var tempEnterValue = buttonValue;

    var opacityDiv = $("#js-all-opacity");
    var allUl = $("#js-allUL");

    setOpacityCss();//设置后面的透明层div的样式
    loadSystemOptions();//加载系统设置选项
    setCecOnOff();//设置选项是否打开，CEC选项是否可选，并设置当前行样式

    /**
     * 设置后面的透明层div的样式
     */
    function setOpacityCss(){
        opacityDiv.css({
            'position': 'absolute',
            'width': '50%',
            'height': height,
            'background-color': '#262626',
            'opacity': '0.2',
            'top': '50px'
        });
    }

    /**
     * 加载系统设置选项
     */
    function loadSystemOptions(){
        if(tempsystemOptions.length != 0){
            for(var i in tempsystemOptions){
                if(tempsystemOptions[i].length == 1){//说明该参数没有别的选项，需要点进去设置，那么就是Enter
                    allUl.append("<li class='all-ul-li' > <ul class='all-ul-row' > <li >"+tempsystemOptions[i][0]+"</li>"+
                    "<li class='options'> <div class='option'>"+tempEnterValue+"</div></li></ul></li>");
                }else{
                    allUl.append("<li class='all-ul-li' > <ul class='all-ul-row'> <li >"+tempsystemOptions[i][0]+"</li>"+
                    " <li class='options'> <div class='option' id='js-option"+i+"'>"+
                    "</div> </li> </ul> </li>");
                    var optionDiv = $("#js-option"+i+"");
                    if(tempsystemOptions[i][1].length > 0){
                        for(var j in tempsystemOptions[i][1]){
                            optionDiv.append("<div id='js-option"+i+"-div"+j+"'>"+tempsystemOptions[i][1][j]+"</div>")
                        }
                    }
                }
            }
        }else{
            return;
        }
    }

    /**
     * 设置选项是否可选样式
     */

    function setCecOnOff(){
        var liChild= allUl.children("li:not(:first)").children("ul");

        if( cecStatus == false){
            liChild.children("li").addClass("disable");
            setCurrentRowCss(currentRow);
        }else{
            liChild.children("li").removeClass("disable");
            //打开cec的同时就要获取autoStandby和arcMode的值,并显示在页面上
            setCurrentOption(0);
            if(autoStandbyStatus == true){
                setCurrentOption(2);
            }
            if(arvModeStatus == true){
                setCurrentOption(3)
            }
            setCurrentRowCss(currentRow);
        }
    }

    /**
     * 更换数组元素的位置
     */
    function setCurrentOption(currentRow,key){
        if(key == numKey.left){
            if(tempsystemOptions[currentRow].length > 1){
                var start = tempsystemOptions[currentRow][1].shift();
                tempsystemOptions[currentRow][1].push(start);
                if(tempsystemOptions[currentRow][1].length > 0){
                    for(var j in tempsystemOptions[currentRow][1]){
                        $("#js-option"+currentRow+"-div"+j+"").html(tempsystemOptions[currentRow][1][j]);
                    }
                }
            }
        }else if(key == numKey.right){
            if(tempsystemOptions[currentRow].length > 1){
                var end = tempsystemOptions[currentRow][1].pop();
                tempsystemOptions[currentRow][1].unshift(end);
                if(tempsystemOptions[currentRow][1].length > 0){
                    for(var j in tempsystemOptions[currentRow][1]){
                        $("#js-option"+currentRow+"-div"+j+"").html(tempsystemOptions[currentRow][1][j]);
                    }
                }
            }
        }

    }
    /**
     * 设置当前行的样式
     */
    function setCurrentRowCss(currentRow) {

        allUl.children("li").children("ul").find("li").removeClass("one-li-selected");
        allUl.children("li").children("ul").children("li").find("div").removeClass("two-li-selected option-selected option-middle-seleted selected").addClass("no-selected");

          var liSelect= allUl.children("li:eq(" + currentRow + ")").children("ul");

          var liSelectOptionCount = tempsystemOptions[currentRow].length ;
          if(liSelectOptionCount > 1){
              liSelect.children("li:first").addClass("one-li-selected");
              liSelect.children("li").find("div").removeClass("no-selected").addClass("selected");
              liSelect.children("li:last").children("div").children("div").removeClass("two-li-selected").addClass("option-selected");
              liSelect.children("li:last").children("div").children("div:nth-child(2)").addClass("option-middle-seleted");
              return;
          }
          liSelect.children("li:first").addClass("one-li-selected");
          liSelect.children("li").find("div").removeClass("no-selected").addClass("two-li-selected");
    }

    /**
     * 设置cec当前各个选项的状态
     * @param currentRow
     */
    function setCecOptionStatus(currentRow){
        switch(currentRow)
        {
            case 0:
                if(cecStatus == true){
                    CECManager.setCecStatus(false);
                }else{
                    CECManager.setCecStatus(true);
                }
                setCecOnOff();
                break;
            case 2:
                if(autoStandbyStatus == true){
                    CECManager.setAutoStandbyMode(false);
                }else{
                    CECManager.setAutoStandbyMode(true);
                }
                break;
            case 3:
                if(arvModeStatus == true){
                    CECManager.setArcMode(false);
                }else{
                    CECManager.setArcMode(true);
                }
                break;
        }
    }
    $(document).keydown(function(event) {
        var keyCode=event.keyCode;
        switch(keyCode)
        {
            case numKey.left:
                setCurrentOption(currentRow,keyCode);
                setCecOptionStatus(currentRow);
                break;
            case numKey.right:
                setCurrentOption(currentRow,keyCode);
                setCecOptionStatus(currentRow);
                break;
            case numKey.up:
                if(cecStatus == false){
                    setCecOnOff();
                    return;
                }
                if(currentRow <= 0){
                    currentRow =  allUl.children("li").length-1;
                }else{
                    currentRow--;
                }
                setCecOnOff();
                break;
            case numKey.down:
                if(cecStatus == false){
                    setCecOnOff();
                    return;
                }
                if(currentRow >= (allUl.children("li").length-1)){
                    currentRow = 0;
                }else{
                    currentRow++;
                }
                setCecOnOff();
                break;
            case numKey.enter:
                if(currentRow == 1){//进入设备列表页面
                    window.location.href="cecDeviceList.html";
                }
                break;
        }

    });
});
