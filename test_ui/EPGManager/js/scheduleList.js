loadLanguageFile("schedule.js");
$(function(){
    var scheduleDiv=$("#js-schedule");
    var height= $(document).height();//获取页面文档的高度
    scheduleDiv.css("height",height);



    var currentRow=1;//默认当前行为总ul的第二行
    var contentUl=$("#js-scheduleUL");
    contentUl.css("height",height-$("#js-title").height());
    var titleList=$("#js-scheduleList");

    var textDelete=deleteText;
    var titleListLength=scheduleList.length;
    var contentLength=scheduleContent.length;
    for(var i in scheduleList ){
        titleList.append("<li>"+scheduleList[i]+"</li>");
    }

    var tempScheduleContent=scheduleContent;//将数据复制一份；
    loadData();//加载数据到列表中
    setCurrentRowCss(currentRow);//设置当前行样式

    function loadData(){
        //判断scheduleContent里面的内容是否为空，如果不为空，就给下面添加一行数据
        if(tempScheduleContent.length!=0){
            //对tempScheduleContent循环放在ul里面
            for(var i in tempScheduleContent){
                /*先将每一行的框架ul画出来*/
                contentUl.append("<li class='schedule-ul-li' id='js-liContent"+i+"'></li> ");
                $("#js-liContent"+i+"").append("<ul class='schedule-ul-row' id='js-li-ulContent"+i+"'></ul>");
                //添加一个删除的div
                $("#js-liContent"+i+"").append("<div class='delete' id='js-delDiv"+i+"'></div>");
                $("#js-delDiv"+i+"").append("<a href='#'>"+textDelete+"</a>");
                var liContent=$("#js-li-ulContent"+i+"");
                //给每一行的ul循环添加每个li
                for(var j in tempScheduleContent[i]){
                    liContent.append("<li>"+tempScheduleContent[i][j]+"</li>");
                }
            }
        }else{
            return;
        }
    }


    //改变当前行的样式，没有选中当前行时
    function setCurrentRowCss(currentRow){

        contentUl.children("li:not([id='js-firstLi'])").removeClass("content-li-selected left-animation");
        contentUl.children("li:eq("+currentRow+")").addClass("content-li-selected");


    }
    //点击键盘左键时将删除按钮显示出来,
    function showDelete(currentRow,keyCode){
        contentUl.children("li:not([id='js-firstLi'])").removeClass("left-animation right-animation");
        if(keyCode==numKeyLeft){
            contentUl.children("li:eq("+currentRow+")").addClass("left-animation");
            $("#js-delDiv"+(currentRow-1)+"").css({
                "display":'block'
            });
        }else if(keyCode==numKeyRight){
            contentUl.children("li:eq("+currentRow+")").addClass("right-animation");

        }
    }


    //键盘事件
    $(document).keydown(function(event){
        var keyCode=event.keyCode;
        if(keyCode==numKeyDown){
            if(currentRow === (tempScheduleContent.length))  currentRow =1;
            else currentRow++;
            //点击上下的时候先将所有的delete的div隐藏
            $(".delete").css({
                "display":'none'
            });
            setCurrentRowCss(currentRow);
        }else if(keyCode==numKeyUp){
            if(currentRow === 1)  currentRow =tempScheduleContent.length;
            else currentRow--;
            //点击上下的时候先将所有的delete的div隐藏
            $(".delete").css({
                "display":'none'
            });
            setCurrentRowCss(currentRow);

        }else if(keyCode==numKeyLeft){
            showDelete(currentRow,keyCode);
        }else if(keyCode==numKeyRight){
            showDelete(currentRow,keyCode);
        }else if (keyCode==numKeyEnter){

            //有left-animation说明delete按钮时存在的
            if(contentUl.children("li:eq("+currentRow+")").hasClass("left-animation")){
                //点击删除按钮删除当前行
                //修改数组,splice函数返回的是删除的那一行，并且会对原数组改变,下标自动改变
                tempScheduleContent.splice(currentRow-1,1);
                contentUl.children().remove();
                // contentUl.find($(".left-animation")).remove();//删除ul中的一个li
                contentUl.append("<li class='schedule-ul-li' id='js-firstLi'></li>");
                $("#js-firstLi").append("<ul class='schedule-ul-row' id='js-scheduleList'></ul>");
                $("#js-firstLi").append("<div class='menu-opacity'></div>");
                for(var i in scheduleList ){
                    $("#js-scheduleList").append("<li>"+scheduleList[i]+"</li>");
                }
                loadData();
                //重新加载数据之后要重新设置样式
                setCurrentRowCss(currentRow);

            }else{
                return;
            }

        }

    });

});

