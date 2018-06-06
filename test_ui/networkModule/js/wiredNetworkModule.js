loadLanguageFile("network.js")
$(function(){
    //获取页面的文档高和宽
    var height= $(document).height();
    var currentRow=0;//当前行\

    var tempsystemOptions = allNetworkSettings.wiredNetworkOptions;
    var tempEnterValue = buttonValue;

    var opacityDiv = $("#js-all-opacity");
    var allUl = $("#js-allUL");
    var okButton = $("#js-button");

    var flag_isStatic=0;//1---表示获取静态的密码，0----动态获取密码，此时下面的选项是不能选的

    setOpacityCss();//设置后面的透明层div的样式
    loadSystemOptions();//加载系统设置选项
    setStaticOnOff();//设置是静态获取还是动态获取

    /**
     * 设置后面的透明层div的样式
     */
    function setOpacityCss(){
        opacityDiv.css({
            'position': 'absolute',
            'width': '50%',
            'height': height,
            'background-color': '#262626',
            'opacity': '0.3',
            'top': '50px',
            'animation': 'trans 1s ease-out',
            'margin-top':'10px'
        });
    }

    /**
     * 加载系统设置选项
     */
    function loadSystemOptions(){
        if(tempsystemOptions.length != 0){
            for(var i in tempsystemOptions){
                if(tempsystemOptions[i].length == 1){//说明该参数没有别的选项，需要点进去设置，那么就是Enter
                    if(i >= tempsystemOptions.length-1){
                        allUl.append("<li class='all-ul-li' > <ul class='all-ul-row' > <li >"+tempsystemOptions[i][0]+"</li>"+
                        "<li class='options'> <div class='option'><input class='option-value' value='OK' /></div></li></ul></li>");

                    }else{
                        allUl.append("<li class='all-ul-li' > <ul class='all-ul-row' > <li >"+tempsystemOptions[i][0]+"</li>"+
                        "<li class='options'> <div class='option'><input class='option-value' value='"+tempEnterValue+"' /></div></li></ul></li>");

                    }
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
     * 设置是静态获取还是动态获取
     */
    function setStaticOnOff(){
        var liChild = allUl.children("li:not(:first)").children("ul");
        if( flag_isStatic == 0){
            liChild.children("li").addClass("disable");
            setCurrentRowCss(currentRow);
        }else{
            liChild.children("li").removeClass("disable");
            setCurrentRowCss(currentRow);
        }

    }
    /**
     * 设置当前行的样式
     */
    function setCurrentRowCss(currentRow) {
        allUl.children("li").children("ul").find("li").removeClass("one-li-selected");
        allUl.children("li").children("ul").children("li").find("div").removeClass("two-li-selected option-selected option-middle-seleted selected").addClass("no-selected");
        allUl.children("li").children("ul").children("li").find("div").find("input").removeClass("two-li-selected option-selected option-middle-seleted selected").addClass("no-selected");
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
        liSelect.children("li").find("div").find("input").removeClass("no-selected").addClass("two-li-selected");
        liSelect.children("li").find("div").removeClass("no-selected").addClass("two-li-selected");

    }

    $(document).keydown(function(event) {
        var keyCode=event.keyCode;
        if(keyCode == numKeyLeft){//这里只是改了数组中的顺序，而当前中间的选项一直是数组中的第一个值
            if(flag_isStatic == 0){
                flag_isStatic = 1;
            }else{
                flag_isStatic = 0;
            }
            if(tempsystemOptions[currentRow].length > 1){
                var start = tempsystemOptions[currentRow][1].shift();
                tempsystemOptions[currentRow][1].push(start);
                if(tempsystemOptions[currentRow][1].length > 0){
                    for(var j in tempsystemOptions[currentRow][1]){
                        $("#js-option"+currentRow+"-div"+j+"").html(tempsystemOptions[currentRow][1][j]);
                    }
                    setStaticOnOff();
                }
            }
        }else if(keyCode == numKeyRight){
            if(flag_isStatic == 1){
                flag_isStatic = 0;
            }else{
                flag_isStatic = 1;
            }
            if(tempsystemOptions[currentRow].length > 1){
                var end = tempsystemOptions[currentRow][1].pop();
                tempsystemOptions[currentRow][1].unshift(end);
                if(tempsystemOptions[currentRow][1].length > 0){
                    for(var j in tempsystemOptions[currentRow][1]){
                        $("#js-option"+currentRow+"-div"+j+"").html(tempsystemOptions[currentRow][1][j]);
                    }
                    setStaticOnOff();
                }
            }
        }
        else if(keyCode == numKeyUp){
            if(flag_isStatic == 0){
                return;
            }
            if(currentRow <= 0){
                currentRow =  allUl.children("li").length-1;
            }else{
                currentRow--;
            }
            setStaticOnOff();
        }else if(keyCode == numKeyDown){
            if(flag_isStatic == 0 ){
                return;
            }
            if(currentRow >= (allUl.children("li").length-1)){
                //此时应该到0K键了
                currentRow = 0;

            }else{
                currentRow++;
            }
            setStaticOnOff();
        }
        else if(keyCode == numKeyEnter){
            if(currentRow >= (allUl.children("li").length-1)){//操作OK键
                alert("----");
            }else{
                allUl.children("li:eq("+currentRow+")").children("ul").children("li").find("div").find("input").focus();
            }
        }
    });
});
