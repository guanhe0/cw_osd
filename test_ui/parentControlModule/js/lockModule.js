loadLanguageFile("system.js");
$(function(){
    //获取页面的文档高和宽
    var height= $(document).height();
    var width=  $(document).width();
    var mheight=$(window).height();
    var currentRow=0;//当前行

    var tempsystemOptions = allSettingOption.lockControlOptions;
    var tempEnterValue = buttonValue;
    var tempPassword = allSettingOption.newPass;

    var opacityDiv = $("#js-all-opacity");
    var allUl = $("#js-allUL");
    var passTitle = $("#js-passTitle");
    var oldPassTitle = $("#js-oldPassTitle");
    var newPassTitle = $("#js-newPassTitle");


    var flag_mask=0;//是否显示遮罩层，根据该标志来判断按键是对下面的页面操作，还时密码框操作；0---显示，1--不显示
    var flag_numCount=0;//输入密码框的计数，按下数字键之后计次数
    var flag_isChangePass=0;//是否重设密码，0---只显示输入密码，1---显示修改密码的框
    var flag_changePass_numCount = 0;//修改密码框的计数，按下数字键计数

    setOpacityCss();//设置后面的透明层div的样式
    loadSystemOptions();//加载系统设置选项
    setLockOnOff();//设置选项是否打开，CEC选项是否可选，并设置当前行样式
    showMsak();


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
     * 显示遮罩层和密码框
     * */

    function showMsak(){
        /**
         *  设置遮罩层的样式
         */
        var omask=$("#js-mask");
        var passDiv=$("#js-password");
        var setPassDiv=$("#js-changePassword");
        if(flag_mask == 0){
            omask.css({
                'height':height,
                'width':width,
                'display':'block'
            });
            if(currentRow == 0){
                flag_isChangePass = 0;
                passTitle.html(allSettingOption.passTitle);
                passDiv.css({
                    'left':(width-400)/2+"px",
                    'top':(mheight-150)/2+"px",
                    'display':'block'
                });
            }else if(currentRow == 1){
                flag_isChangePass = 1;
                $("#js-newPassInput0").val("");
                $("#js-newPassInput1").val("");
                $("#js-newPassInput2").val("");
                $("#js-newPassInput3").val("");

                $("#js-newPassInput4").val("");
                $("#js-newPassInput5").val("");
                $("#js-newPassInput6").val("");
                $("#js-newPassInput7").val("");
                $("#js-newPassInput7").blur();
                $("#js-newPassInput0").focus();
                oldPassTitle.html(allSettingOption.changePassTitle[0]);
                newPassTitle.html(allSettingOption.changePassTitle[1]);
                oldPassTitle.css("color","inherit");
                setPassDiv.css({
                    'left':(width-400)/2+"px",
                    'top':(mheight-150)/2+"px",
                    'display':'block'
                });
            }

        }
        if(flag_mask==1){
            omask.css("display","none");
            passDiv.css("display","none");
            setPassDiv.css("display","none");
        }


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
    function setLockOnOff(){
        var liChild= allUl.children("li:not(:first)").children("ul");
        if( tempsystemOptions[0][1][1] == "OFF"){
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
    $(document).keydown(function(event) {
        var keyCode = event.keyCode;
        if (keyCode == numKeyLeft) {//这里只是改了数组中的顺序，而当前中间的选项一直是数组中的第二个值
            if (flag_mask == 0) {//显示遮罩层，不能处理下面的页面
                return;
            }
            if (tempsystemOptions[currentRow].length > 1) {
                var start = tempsystemOptions[currentRow][1].shift();
                tempsystemOptions[currentRow][1].push(start);
                if (tempsystemOptions[currentRow][1].length > 0) {
                    for (var j in tempsystemOptions[currentRow][1]) {
                        $("#js-option" + currentRow + "-div" + j + "").html(tempsystemOptions[currentRow][1][j]);
                    }
                    setLockOnOff();
                }
            }
        } else if (keyCode == numKeyRight) {
            if (flag_mask == 0) {//显示遮罩层，不能处理下面的页面
                return;
            }
            if (tempsystemOptions[currentRow].length > 1) {
                var end = tempsystemOptions[currentRow][1].pop();
                tempsystemOptions[currentRow][1].unshift(end);
                if (tempsystemOptions[currentRow][1].length > 0) {
                    for (var j in tempsystemOptions[currentRow][1]) {
                        $("#js-option" + currentRow + "-div" + j + "").html(tempsystemOptions[currentRow][1][j]);
                    }
                    setLockOnOff()
                }
            }
        }
        else if (keyCode == numKeyUp) {
            if (flag_mask == 0) {//显示遮罩层，不能处理下面的页面
                return;
            }
            if (tempsystemOptions[0][1][1] == "OFF") {
                setLockOnOff();
                return;
            }
            if (currentRow <= 0) {
                currentRow = allUl.children("li").length - 1;
            } else {
                currentRow--;
            }
            setLockOnOff()
        } else if (keyCode == numKeyDown) {
            if (flag_mask == 0) {//显示遮罩层，不能处理下面的页面
                return;
            }
            if (tempsystemOptions[0][1][1] == "OFF") {
                setLockOnOff();
                return;
            }
            if (currentRow >= (allUl.children("li").length - 1)) {
                currentRow = 0;
            } else {
                currentRow++;
            }
            setLockOnOff();
        } else if (keyCode>=numKey.zero && keyCode<=numKey.nine) {
            if (flag_mask == 0 ) {
                if(flag_isChangePass == 0){//----操作输入密码框
                    if (flag_numCount == 0) {
                        $("#js-passInput0").focus();
                        flag_numCount++;
                    } else if (flag_numCount == 1) {
                        $("#js-passInput1").focus();
                        flag_numCount++;
                    } else if (flag_numCount == 2) {
                        $("#js-passInput2").focus();
                        flag_numCount++;
                    } else if (flag_numCount == 3) {
                        $("#js-passInput3").focus();
                    }
                }else if(flag_isChangePass == 1){//---操作修改密码框
                    if(flag_changePass_numCount == 0){
                        $("#js-newPassInput0").focus();
                        flag_changePass_numCount++;
                    }else if(flag_changePass_numCount == 1){
                        $("#js-newPassInput1").focus();
                        flag_changePass_numCount++;
                    }else if(flag_changePass_numCount == 2){
                        $("#js-newPassInput2").focus();
                        flag_changePass_numCount++;
                    }else if(flag_changePass_numCount == 3){
                        $("#js-newPassInput3").focus();
                        flag_changePass_numCount++;
                    }else if(flag_changePass_numCount == 4){
                        $("#js-newPassInput4").focus();
                        flag_changePass_numCount++;
                    }else if(flag_changePass_numCount == 5){
                        $("#js-newPassInput5").focus();
                        flag_changePass_numCount++;
                    }else if(flag_changePass_numCount == 6){
                        $("#js-newPassInput6").focus();
                        flag_changePass_numCount++;
                    }else if(flag_changePass_numCount == 7){
                        $("#js-newPassInput7").focus();
                    }
                }
            }


        } else if(keyCode == numKey.enter){
            if(flag_mask == 1){//遮罩层已经不存在了
                if(currentRow == 1){///----操作setPassword
                    flag_mask=0;
                    showMsak();
                }else if(currentRow == 2){//----Parent Control
                    window.location.href = "parentControlModule.html";
                }else if(currentRow == 3){//---Channel Control
                    window.location.href = "../EPGManager/EPG.html"
                }
            }
            return;
        }else if(keyCode == numKey.back){
            if(flag_mask == 0){//遮罩层存在时，返回就是隐藏遮罩层
                if(flag_isChangePass == 0){
                    //逐个删除
                        if(flag_numCount == 0){
                            flag_mask = 1;
                            showMsak();
                        }else{
                            $("#js-passInput"+flag_numCount+"").val("");
                            flag_numCount--;
                            $("#js-passInput"+flag_numCount+"").focus();
                        }


                } else if(flag_isChangePass == 1){
                    if($("#js-newPassInput0").val().length==0){
                        flag_mask = 1;
                        showMsak();
                    }else{
                        if(flag_changePass_numCount == 0){
                            flag_mask = 1;
                            showMsak();
                        }else{
                            $("#js-newPassInput"+flag_changePass_numCount+"").val("");
                            flag_changePass_numCount--;
                            $("#js-newPassInput"+flag_changePass_numCount+"").focus();
                        }
                    }
                }


            }else{
                return;
            }
        }
    });
    var text0 ,text1 ,text2,text3 ;
    $("#js-passInput3").keyup(function(){
        text0 = $("#js-passInput0").val();
        text1 = $("#js-passInput1").val();
        text2 = $("#js-passInput2").val();
        text3 = $("#js-passInput3").val();
        if (text0 == tempPassword[0] && text1 == tempPassword[1] && text2 == tempPassword[2] && text3 == tempPassword[3]) {
            flag_mask = 1;
            flag_numCount = 0;
            showMsak();
        } else {
            flag_mask = 0;
            flag_numCount = 0;
            passTitle.css("color","red");
            passTitle.html(allSettingOption.wrongPassWaringTitle);
            $("#js-passInput0").val("");
            $("#js-passInput1").val("");
            $("#js-passInput2").val("");
            $("#js-passInput3").val("");
            $("#js-passInput3").blur();
            return;
        }
    });
    var newText0,newText1,newText2,newText3;
    $("#js-newPassInput7").keyup(function(){
        text0 = $("#js-newPassInput0").val();
        text1 = $("#js-newPassInput1").val();
        text2 = $("#js-newPassInput2").val();
        text3 = $("#js-newPassInput3").val();

        newText0 = $("#js-newPassInput4").val();
        newText1 = $("#js-newPassInput5").val();
        newText2 = $("#js-newPassInput6").val();
        newText3 = $("#js-newPassInput7").val();

        if (text0 == tempPassword[0] && text1 == tempPassword[1] && text2 == tempPassword[2] && text3 == tempPassword[3]) {
            flag_mask = 1;
            tempPassword[0] = newText0;
            tempPassword[1] = newText1;
            tempPassword[2] = newText2;
            tempPassword[3] = newText3;
            flag_changePass_numCount = 0;
            showMsak();
        } else {
            flag_mask = 0;
            flag_changePass_numCount = 0;

            oldPassTitle.html(allSettingOption.wrongPassWaringTitle);
            oldPassTitle.css("color","red");
            $("#js-newPassInput0").val("");
            $("#js-newPassInput1").val("");
            $("#js-newPassInput2").val("");
            $("#js-newPassInput3").val("");

            $("#js-newPassInput4").val("");
            $("#js-newPassInput5").val("");
            $("#js-newPassInput6").val("");
            $("#js-newPassInput7").val("");

        }
    });
});
