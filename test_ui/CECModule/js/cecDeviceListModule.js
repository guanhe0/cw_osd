loadLanguageFile("system.js")
$(function(){
    //获取页面的文档高和宽
    var height= $(document).height();
    /*var width=  $(document).width();
    var mheight=$(window).height();*/
    var currentRow=0;//当前行

    var tempsystemOptions = allSettingOption.cecDeviceList;

    var opacityDiv = $("#js-all-opacity");
    var allUl = $("#js-allUL");

    setOpacityCss();//设置后面的透明层div的样式
    loadSystemOptions();//加载系统设置选项
    setCurrentRowCss(currentRow);//设置行样式

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
                //说明该参数没有别的选项，需要点进去设置，那么就是Enter
                allUl.append("<li class='all-ul-li' > <ul class='all-ul-row' > <li >NO ."+i+"</li>"+
                    " <li class='options'> <div class='option'>"+tempsystemOptions[i]+"</div> </li> </ul></li>");
            }
        }else{
            return;
        }
    }

    /**
     * 设置当前行的样式
     */
    function setCurrentRowCss(currentRow) {
        allUl.children("li").children("ul").find("li").removeClass("one-li-selected");
        allUl.children("li").children("ul").children("li").find("div").removeClass("two-li-selected option-selected option-middle-seleted selected").addClass("no-selected");
        var liSelect= allUl.children("li:eq(" + currentRow + ")").children("ul");
        liSelect.children("li:first").addClass("one-li-selected");
        liSelect.children("li").find("div").removeClass("no-selected").addClass("two-li-selected");
    }

    $(document).keydown(function(event) {
        var keyCode=event.keyCode;
        if(keyCode == numKeyLeft){//这里只是改了数组中的顺序，而当前中间的选项一直是数组中的第二个值

        }else if(keyCode == numKeyRight){

        }
        else if(keyCode == numKeyUp){

            if(currentRow <= 0){
                currentRow =  allUl.children("li").length-1;
            }else{
                currentRow--;
            }
            setCurrentRowCss(currentRow)
        }else if(keyCode == numKeyDown){

            if(currentRow >= (allUl.children("li").length-1)){
                currentRow = 0;
            }else{
                currentRow++;
            }
            setCurrentRowCss(currentRow);
        }
        else if(keyCode == numKeyEnter){


        }
    });
});
