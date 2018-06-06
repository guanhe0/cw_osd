loadLanguageFile("network.js");
$(function(){
    //获取页面的文档高和宽
    var height= $(window).height();
    var currentRow=0;//当前行

    var tempsystemOptions = allNetworkSettings.networkOptions;

    var opacityDiv = $("#js-all-opacity");
    var networkDiv = $("#js-network");




    setOpacityCss();//设置后面的透明层div的样式
    loadSystemOptions();//加载系统设置选项
    setCurrentRowCss(currentRow);


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
                networkDiv.append("<div class='network-option' id='js-networkOption"+i+"'>"+tempsystemOptions[i]+"</div>");
            }
        }
    }

    /**
     * 设置当前行的样式
     */
    function setCurrentRowCss(currentRow) {
        networkDiv.children("div").removeClass("selected");
        networkDiv.children("div:eq("+currentRow+")").addClass("selected");
    }

    $(document).keydown(function(event) {
        var keyCode = event.keyCode;
        if (keyCode == numKey.up) {
            if(currentRow <= 0){
                currentRow =  networkDiv.children("div").length-1;
            }else{
                currentRow--;
            }
            setCurrentRowCss(currentRow);
        } else if (keyCode == numKey.down) {
            if(currentRow >= (networkDiv.children("div").length-1)){
                currentRow = 0;
            }else{
                currentRow++;
            }
            setCurrentRowCss(currentRow);


        } else if(keyCode == numKey.enter){
            if(currentRow == 0){
                window.location.href="networkSettingModule.html";
            }else if(currentRow == 1){
                window.location.href="wifiNetworkModule.html";
            }
        }else if(keyCode == numKey.back){

        }
    });


});
