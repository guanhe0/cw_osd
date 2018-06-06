
$(function(){
    var domObject = {
        $leftUl:$("#js-leftUl"),
        $allDiv:$("#js-all"),
        $rightDiv:$("#js-rightDiv")
    };
    var curr = {
        currentRow:0
    };

    function onChannelScanEventListener(event) {
        console.log(JSON.stringify(event));
        var info = JSON.parse(event);
        if(info.cmd === "onForeground"){
            domObject.$allDiv.css("opacity","1");
        }
    }
    var windowId = getUrlValue('window')?parseInt(getUrlValue('window')):0;
    console.log("windowId: "+windowId);
    Oceanus.addPlatformEventListener(onChannelScanEventListener,windowId);

    setCurrentRowCss(curr.currentRow);
    function setAllStyle(keyCode){
        switch (keyCode){
            case numKey.down:
                if(curr.currentRow >= domObject.$leftUl.children("li").length - 1){
                    curr.currentRow = domObject.$leftUl.children("li").length - 1;
                }else {
                    curr.currentRow++;
                }
                setCurrentRowCss(curr.currentRow);
                break;
            case numKey.up:
                if(curr.currentRow <= 0){
                    curr.currentRow = 0;
                }else{
                    curr.currentRow -- ;
                }
                setCurrentRowCss(curr.currentRow);
                break;
            case numKey.left:
                return false;
                break;
            case numKey.right:
                domObject.$allDiv.addClass("left-move").css("opacity","1");
                startWidget();
                break;
            case numKey.enter:
                domObject.$allDiv.addClass("left-move").css("opacity","1");
                startWidget();
                break;
            case numKey.back:
                Oceanus.killApp($('title').text());
                break;
        }
    }
    
    function setCurrentRowCss(currentRow){
        domObject.$leftUl.children("li").removeClass("left-selected");
        domObject.$leftUl.children("li:eq("+currentRow+")").addClass("left-selected");
        domObject.$rightDiv.children("div").css("display","none");
        domObject.$rightDiv.children("div").eq(currentRow).css("display","block");
    }

    $(document).keydown(function(event){
        var keyCode = event.keyCode;
        console.log("keyCode:"+keyCode);
        setAllStyle(keyCode);
    });

    /**
     * 启动autoSearch，mannualSearch
     */
    function startWidget(){
        if(curr.currentRow == 0){
            var cmdJson = "{\"cmd\":\"AUTOSCAN_WIDGET\",\"value\":{\"option\":\"SHOW\"}}";
            Oceanus.sendEvent("ChannelScan", cmdJson);
            domObject.$allDiv.removeClass("left-move").css("opacity","0");
        }else if(curr.currentRow == 1){
            var cmdJson = "{\"cmd\":\"MANUALSCAN_WIDGET\",\"value\":{\"option\":\"SHOW\"}}";
            Oceanus.sendEvent("ChannelScan", cmdJson);
            domObject.$allDiv.removeClass("left-move").css("opacity","0");
        }
    }
});