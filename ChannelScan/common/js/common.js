function showInfo(info,type,$omask,$singleSettingList,currentRow){
    if(type == 0){
        $omask.css("display","none");
        $singleSettingList.css("display","none");
    }else{
        //获取页面的文档高和宽
        var height= $("body").height();
        var width=  $("body").width();
        $omask.addClass("mask2");
        $omask.css({
            'height':height,
            'width':width,
            'display':'block'
        });
        $singleSettingList.css({
            'width': '350px',
            'height': '200px',
            'position': 'absolute',
            'z-index': '100',
            'background-color': 'gray',
            'left':(width-400)/2+"px",
            'top':(height-300)/2+"px",
            'display':'block',
            'overflow':'hidden'
        });
        $singleSettingList.find("div").text(info);
        $singleSettingList.find("ul").children("li").removeClass("selected");
        $singleSettingList.find("ul").children("li:eq("+currentRow+")").addClass("selected");

    }

}