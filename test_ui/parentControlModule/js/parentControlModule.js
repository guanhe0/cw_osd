loadLanguageFile("system.js");
$(function(){
    //获取页面的文档高和宽
    var height= $(document).height();
    var currentRow=0;//当前行

    var tempsystemOptions = allSettingOption.parentControlOptions;

    var opacityDiv = $("#js-all-opacity");
    var allUl = $("#js-allUL");

    var flag_onOff=0;//0----打开，此时就要显示Off



    setOpacityCss();//设置后面的透明层div的样式
    loadSystemOptions();//加载系统设置选项
    setParentControlOnOff();//设置选项是否打开，CEC选项是否可选，并设置当前行样式


    /**
     * 设置后面的透明层div的样式
     */
    function setOpacityCss(){
        opacityDiv.css({
            'position': 'absolute',
            'width': '30%',
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
               allUl.append("<li class='lockul-li-list' id='js-list"+i+"'> <span>"+tempsystemOptions[i][0]+"</span> </li>");
           }
        }else{
            return;
        }
    }

    /**
     * 设置选项是否可选样式
     */
    function setParentControlOnOff(){
        var liChild= allUl.children("li:not(:first)");
        if( flag_onOff == 0){//此时表示打开的，下面的就可以操作了
            liChild.removeClass("no-active");
            setCurrentRowCss(currentRow);
        }else{
            liChild.addClass("no-active");
            setCurrentRowCss(currentRow);
        }
    }
    /**
     * 设置当前行的样式
     */
    function setCurrentRowCss(currentRow) {
        allUl.children("li").removeClass("selected");
        allUl.children("li:eq("+currentRow+")").addClass("selected");
    }
    $(document).keydown(function(event) {
        var keyCode = event.keyCode;
        if (keyCode == numKeyLeft) {//这里只是改了数组中的顺序，而当前中间的选项一直是数组中的第二个值

        } else if (keyCode == numKeyRight) {

        }
        else if (keyCode == numKeyUp) {
            if(flag_onOff == 1){//1---代表是parentControl是关闭的，下面的选项不可选
                return;
            }
            if (currentRow <= 0) {
                currentRow = allUl.children("li").length - 1;
            } else {
                currentRow--;
            }
            setParentControlOnOff();
        } else if (keyCode == numKeyDown) {
            if(flag_onOff == 1){
                return;
            }
            if (currentRow >= (allUl.children("li").length - 1)) {
                currentRow = 0;
            } else {
                currentRow++;
            }
            setParentControlOnOff();
        } else if (keyCode>=numKey.zero && keyCode<=numKey.nine) {



        } else if(keyCode == numKey.enter){
            if(currentRow == 0){
                if(flag_onOff == 0){//此时是打开的，点击确定之后就关闭，下面的列不可操作，并且显示ON
                    $("#js-list0").html(tempsystemOptions[0][1]);
                    flag_onOff = 1;
                    setParentControlOnOff();
                }else{
                    $("#js-list0").html(tempsystemOptions[0][0]);
                    flag_onOff = 0;
                    setParentControlOnOff();
                }
            }else{
                /**
                 * 例：锁10岁---代表10岁往上的节目小孩是不能看的，所以11,12,13,14......都要锁住
                 * 即从当前行currentRow包括当前行往下的所有行都要加上img标签
                 * 而当前行currentRow往上的所有行都要取消img标签
                 *
                 * 要改变tempsystemOptions数组，给数组加一个0/1，来表示是否加了img标签
                 *
                 *  0--加了img标签
                 *  1--没加img标签
                 */
                for(var i in tempsystemOptions){//删除所有img标签
                    $("#js-list"+i+"").find("img").remove();
                }
                var length = allUl.children("li").length;
                for(var i = currentRow; i < length; i++){//给当前行往下包括当前行添加img标签
                    $("#js-list"+i+"").append("<img src='images/key.png' class='key-img'>");
                }

                return;
            }

            return;
        }else if(keyCode == numKey.back){

        }
    });


});
