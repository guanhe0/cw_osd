/*******************
 *Copyright:Skyworth
 *Author:zhaojie
 *Data:2016-02-1
 *Description: ProgramCenter js file
 **********************/
loadLanguageFile("programCenter.js");
$(document).ready(function() {
    var sendJsonData = { cmd: '', value: 0 };

    var curMenu = 0;
    var curCol = "menu";

    var $content = $(".content").children("div");
    var $detail = $("#js_detail");

    var menuList = programCenter.arrMenuList;

    var channelListRow = 0,
        channelListNum = 9,
        channelInfoRow = 0,
        channelListFileNum = 3,
        channelListData = Array(),
        channelPageNum = 54, //每个频道文件有多少个频道
        curChannelFile = 0,
        curChannelIndex = 0;

    var myChannelRow = 0,
        myChannelButtonCol = 0,
        myChannelList = Array();

    var mediaRow = 0;
    var diskRow = 0;

    var sortSwitchState = [0, 0],
        sortRow = 0;

    var $channelList = $("#js_channelList");

    //布局menu菜单的内容
    (function(menuList) {
        var $menu = $("#js_menu");
        for (i in menuList) {
            $menu.children("li:eq(" + i + ")").children("span").text(menuList[i]);
        }
    })(menuList);

    //布局channelList操作框的内容
    (function() {
        $(".Favorite").text(programCenter.Favorite);
        $(".Move").text(programCenter.Move);
        $(".Lock").text(programCenter.Lock);
        $(".Skip").text(programCenter.Stick);
        $(".Delete").text(programCenter.Delete);
        var $sortDetail = $("#js_sortDetail");
        for (var i = 0; i < programCenter.arrSortName.length; i++) {
            $sortDetail.children('li').eq(i).html(programCenter.arrSortName[i]);
        }

        //设置各个块的头部的名字显示
        $(".channel-head").text(programCenter.channelHead);
        $(".Stick").text(programCenter.Stick);
        $(".Lock").text(programCenter.Lock);
        $(".Skip").text(programCenter.Skip);
        $(".Remove").text(programCenter.Remove);
    })();

    var EpgData = Array;

    //接受底层返回的数据
    function onProgramCenterEventListener(event) {
        console.log(event);
        var result = JSON.parse(event);
        switch (result.cmd) {
            case "init": //获取默认的数据
                {
                    channelListFileNum = result.value.ChInfoFileCount;
                    break;
                }
            case "search_Ret":
                {
                    var data = result.value;
                    var liStr = "<li>" + data['Number'] + "&nbsp;&nbsp;" + data['Name'] + "</li>";
                    $("#js_searchContent").append(liStr);
                    break;
                }
            case "get_Epg":
                {
                    var channelInfo = channelListData[curChannelIndex];
                    if (result.value.Number === channelInfo.Number && result.value.ServiceType === channelInfo.ServiceType) {
                        EpgData = result.value.reply;
                        layoutEpgData(EpgData);
                    } else {
                        console.log("reject invalid epg event info");
                    }
                    break;
                }
            case "onForeground":
                {
                    loadChannelData();
                    break;
                }
            case "usb_change":
                {
                    loadMediaData();
                    break;
                }
        }
    }
    var windowId = getUrlValue('window')?parseInt(getUrlValue('window')):0;
    console.log("windowId: "+windowId);
    Oceanus.addPlatformEventListener(onProgramCenterEventListener,windowId);

    //布局EPG的信息
    function layoutEpgData(data) {
        var liStr = "";
        $("#js_loadData").hide();
        var startTime, endTime;
        if (data === null) {
            var $channelText = $("#js_channelText");
            $channelText.children('div').text("");
            $channelText.children('div').eq(0).text("No Information");
        } else {
            layoutEpgDetail(data[0]);
            for (var i in data) {
                var startTime = new Date(data[i]['originalTime'] * 1000);
                var endTime = new Date((data[i]['originalTime'] + data[i]['durationTime']) * 1000);
                liStr += "<li>" + startTime.Format("H:mm") + "—" + endTime.Format("H:mm") + "&nbsp;&nbsp;" + data[i]['EventName'] + "</li>";
            }
            $("#js_channelInfo").append(liStr);
        }
    }
    //设置EPG详细信息显示
    function layoutEpgDetail(data) {
        var $channelText = $("#js_channelText");
        $channelText.children('div').eq(0).text(data['EventName']);
        var startTime = new Date(data['originalTime'] * 1000);
        var endTime = new Date((data['originalTime'] + data['durationTime']) * 1000);
        $channelText.children('div').eq(1).text(startTime.Format("h:mm") + "—" + endTime.Format("h:mm"));
    }

    //设置右边的内容部分出现,menu菜单隐藏的动作
    function setRightShow() {
        $(".menu").addClass("position-menu-2").removeClass("position-menu-1");
        $(".content").addClass("position-content-2").removeClass("position-content-1");
        $detail.addClass("position-detail-2").removeClass("position-detail-1");
        switch (curMenu) {
            case 0:
                curCol = "channelList";
                $detail.children("div").eq(curMenu).show();
                setChannelListChangeStyle();
                break;
            case 1:
                curCol = "myChannel";
                myChannelChange();
                break;
            case 2:
                curCol = "media";
                mediaChange();
                break;
                // case 3:
                //     curCol = "sort";
                //     break;
        }
    }

    //设置右边的内容部分消失，menu菜单显示
    function setRightHide() {
        $(".menu").addClass("position-menu-1").removeClass("position-menu-2");
        $(".content").addClass("position-content-1").removeClass("position-content-2");
        curCol = "menu";
        $detail.children("div").eq(curMenu).hide();
        $detail.addClass("position-detail-1").removeClass("position-detail-2");
        switch (curMenu) {
            case 0:
                // $(".channelList").children("div").eq(channelListRow).hide();
                break;
        }
        // channelListRow = 0;
        mediaRow = 0;
        myChannelRow = 0;
        // setChannelListChange();
        $(".channelList-select").removeClass("channelList-select");
    }

    //设置menu的变换样式
    function setMenuStyle(keyCode) {
        var $menu = $("#js_menu");
        if (keyCode === numKey.down) {
            if (curMenu === menuList.length - 1) curMenu = 0;
            else curMenu++;
        } else if (keyCode === numKey.up) {
            if (curMenu === 0) curMenu = menuList.length - 1;
            else curMenu--;
        }
        $menu.children("li.menu-li-select").removeClass("menu-li-select");
        $menu.children("li:eq(" + curMenu + ")").addClass("menu-li-select");
        $content.hide();
        $content.eq(curMenu).show();
    }
    setMenuStyle();


    function setChannelColorPosition($object) {
        var $color = $("#js_channelColor");
        if ($object) {
            $color.show();
            $color.css({
                top: $object.offset().top,
                left: $object.offset().left,
                width: $object.width() + 10,
            });
        } else {
            $color.hide();
        }
    }

    //重新加载js文件
    function loadChannelData() {
        curChannelFile = 0;
        curChannelIndex = 0;
        channelListData = [];
        curChannelFile++;
        loadJsFile("tvprograminfo_" + curChannelFile, "js_programData",function(){
             if (typeof(TvProgramInfoList) == "undefined") {
                return false;
            }
            for (var i = 0; i < TvProgramInfoList.length; i++) {
                if (TvProgramInfoList[i]['isDelete'] === true ||
                    TvProgramInfoList[i]['isHide'] === true ||
                    TvProgramInfoList[i]['isVisible'] === false) {
                    firstChannelIndex = i;
                    break;
                }
            }
            //将频道数据提取能显示的9个存入数组
            var curDataNum = 0;
            for (var i = 0; i < TvProgramInfoList.length; i++) {
                if (curDataNum === channelListNum) break;
                if (TvProgramInfoList[i]['isDelete'] === true ||
                    TvProgramInfoList[i]['isHide'] === true ||
                    TvProgramInfoList[i]['isVisible'] === false) {
                    firstChannelIndex = i;
                } else {
                    channelListData.push(TvProgramInfoList[i]);
                    channelListData[curDataNum].fileNum = curChannelFile;
                    channelListData[curDataNum].oldIndex = i;
                    curDataNum++;
                }
            }
            console.log(channelListData);
            layoutChannelList(channelListData) //布局前9个数据，当前行到第一
            if (curChannelFile === 1) channelListRow = 0;
            else channelListRow = 1;
        });
    }
    loadChannelData();
    //布局channelList每一页的数据
    function layoutChannelList(channelList) {
        var $channel = $("#js_channelList");
        $channel.html("");
        $channel.append("<li class='channel-head'></li>");
        var listStr = "";
        for (var i in channelList) {
            listStr += "<li data-index='" + channelList[i]['Index'] + "' ";
            listStr += ">" + channelList[i]['Number'] + "&nbsp;&nbsp;" + channelList[i]['Name'];
            if (channelList[i]['isLock'] === true) {
                listStr += "<img src='./images/channel_lock.png' />";
            }
            if (channelList[i]['isSkip'] === true) {
                listStr += "<img src='./images/channel_skip.png' />";
            }
            if (channelList[i]['isFavorite'] === true) {
                listStr += "<img src='./images/channel_fav.png' />";
            }
            listStr + -"</li>";
        }
        $channel.append(listStr);
    }

    function channelListPage(type) {
        if (typeof(TvProgramInfoList[curChannelIndex]) == "undefined") {
            if (type === 1) {
                if (curChannelFile === channelListFileNum) {
                    curChannelIndex--;
                    return false;
                } else {
                    curChannelFile++;
                    loadJsFile("tvprograminfo_" + curChannelFile, "js_programData",function(){

                        curChannelIndex = 0;
                        channelListPage(type);
                        setChannelListChangeStyle();
                    });
                }
            } else if (type === 0) {
                if (curChannelIndex === -1 && curChannelFile === 1) {
                    channelListRow = 0;
                    setChannelListChangeStyle();
                    return false;
                }
                curChannelFile--;
                loadJsFile("tvprograminfo_" + curChannelFile, "js_programData",function(){

                    curChannelIndex = TvProgramInfoList.length - 1;
                    channelListPage(type);
                    setChannelListChangeStyle();
                });
            }
        } else {
            loadJsFile("tvprograminfo_" + curChannelFile, "js_programData",function(){
                if (type === 1) { //下一页
                    if (TvProgramInfoList[curChannelIndex]['isDelete'] === true ||
                        TvProgramInfoList[curChannelIndex]['isHide'] === true ||
                        TvProgramInfoList[curChannelIndex]['isVisible'] === false) {
                        curChannelIndex++;
                        channelListPage(1);
                        return false;
                    } else {
                        channelListData.shift();
                        channelListData[channelListNum - 1] = TvProgramInfoList[curChannelIndex];
                        channelListData[channelListNum - 1].fileNum = curChannelFile;
                        channelListData[channelListNum - 1].oldIndex = curChannelIndex;
                    }
                    var showData = channelListData[channelListNum - 1];
                } else if (type === 0) { //上一页

                        if (TvProgramInfoList[curChannelIndex]['isDelete'] === true ||
                            TvProgramInfoList[curChannelIndex]['isHide'] === true ||
                            TvProgramInfoList[curChannelIndex]['isVisible'] === false) {
                            curChannelIndex--;
                            channelListPage(0);
                            return false;
                        } else {
                            channelListData.unshift(TvProgramInfoList[curChannelIndex]);
                            channelListData[0].fileNum = curChannelFile;
                            channelListData[0].oldIndex = curChannelIndex;
                            channelListData.pop();
                        }
                        var showData = channelListData[0];
                }
                var $channel = $("#js_channelList");
                var newChannelStr = "<li data-index='" + showData['Index'] + "' ";
                newChannelStr += ">" + showData['Number'] + "&nbsp;&nbsp;" + showData['Name'];
                if (showData['isLock'] === true) {
                    newChannelStr += "<img src='./images/channel_lock.png' />";
                }
                if (showData['isSkip'] === true) {
                    newChannelStr += "<img src='./images/channel_skip.png' />";
                }
                if (showData['isFavorite'] === true) {
                    newChannelStr += "<img src='./images/channel_fav.png' />";
                }
                newChannelStr + -"</li>";
                if (type === 1) { //下一页
                    $channel.children('li').eq(1).remove();
                    $channel.append(newChannelStr);
                } else if (type === 0) { //上一页
                    $channel.children('li').eq(channelListNum).remove();
                    $channel.children('li').eq(0).after(newChannelStr);
                }
                setChannelListChangeStyle();
            });
        }
    }

    //设置channelList上下选择
    function setChannelListChange(keyCode) {
        setChannelColor();
        if (keyCode == numKey.down) {
            if (channelListRow > 0) {
                if (channelListRow != channelListNum && (channelListData[channelListRow - 1].fileNum != channelListData[channelListRow].fileNum)) {
                    curChannelFile++;
                    loadJsFile("tvprograminfo_" + curChannelFile, "js_programData");
                    curChannelIndex = channelListData[channelListRow].oldIndex;
                }
            }
            if (channelListRow === channelListNum) {
                curChannelIndex++;
                channelListPage(1);
            } else {
                channelListRow++;
                curChannelIndex = channelListData[channelListRow - 1].oldIndex;
            }
        } else if (keyCode === numKey.up) {
            if (channelListRow === 0) return false;
            if (channelListRow === 1) { //如果是第一行，向上翻页
                curChannelIndex = channelListData[channelListRow - 1].oldIndex - 1;
                channelListPage(0);
            } else {
                if (curChannelFile > 1 && channelListRow > 1 && (channelListData[channelListRow - 1].fileNum != channelListData[channelListRow - 2].fileNum)) {
                    curChannelFile--;
                    loadJsFile("tvprograminfo_" + curChannelFile, "js_programData");
                }
                channelListRow--;
                curChannelIndex = channelListData[channelListRow - 1].oldIndex;
            }
        }
        setChannelListChangeStyle();
    }

    //设置channnelList行改变的动作
    function setChannelListChangeStyle() {
        if (channelListRow === 1) {
            $(".channel-info").show();
            $(".channel-head").removeClass("channelList-select");
        } else if (channelListRow === 0) {
            $(".channel-info").hide();
            $(".channel-head").addClass("channelList-select");
        }
        $channelList.children("li.channelList-select").removeClass("channelList-select");
        $channelList.children("li").eq(channelListRow).addClass("channelList-select");
        //向底层发送数据获取频道的详细信息
        $("#js_channelInfo").html("");
        $("#js_loadData").show();
        if (channelListRow > 0) {
            var channelInfo = channelListData[channelListRow - 1];
            if (channelInfo['ServiceType'] === 0) {
                $(".channel-info").hide();
            } else {
                $(".channel-info").show();
                channelInfo.baseTime = JS_TimerManager.getCurTvTimeBySecs();
                var sendEpgData = {
                    'cmd': 'get_Epg',
                    value: channelInfo
                };
                Oceanus.sendEvent("ProgramCenter", JSON.stringify(sendEpgData));
            }
        }

    }

    var curChannelColor = 0;
    //设置channel颜色按钮出现,消失
    function setChannelColor(type) {
        curChannelColor = 0;
        if (channelListRow > 0) {
            if (type === 1) {
                curCol = "channelColor";
                setChannelColorPosition($channelList.children("li.channelList-select"));
                setChannelColorSelect();
            } else {
                curCol = "channelList";
                setChannelColorPosition();
            }
        }
    }

    //设置channel颜色按钮选择
    function setChannelColorSelect(keyCode) {
        var $color = $("#js_channelColor").children('ul').eq(0);
        if (keyCode === numKey.left) {
            if (curChannelColor === 0) curChannelColor = 3;
            else curChannelColor--;
        } else if (keyCode === numKey.right) {
            if (curChannelColor === 3) curChannelColor = 0;
            else curChannelColor++;
        }
        $color.children('li').removeClass('channelColor-select');
        $color.children('li').eq(curChannelColor).addClass('channelColor-select');
    }
    //设置channel颜色按钮按下后的操作
    function setChannelColorEnter() {
        var cmdType = 3;
        var json = {
            cmd: 'set_Attribute',
            value: null
        }
        var oldIndex = channelListData[channelListRow - 1].oldIndex;
        curChannelFile = channelListData[channelListRow - 1].fileNum;
        loadJsFile("tvprograminfo_" + curChannelFile, "js_programData",function(){

            if (curChannelColor === 0) {
                json.cmd = "set_Fav";
                TvProgramInfoList[oldIndex]["isFavorite"] = !TvProgramInfoList[oldIndex]["isFavorite"];
                json.value = TvProgramInfoList[oldIndex];
            } else if (curChannelColor === 1) {
                cmdType = 0;
                TvProgramInfoList[oldIndex]["isDelete"] = !TvProgramInfoList[oldIndex]["isDelete"];
                json.value = {
                    cmd: cmdType,
                    channelInfo: TvProgramInfoList[oldIndex],
                }
            } else if (curChannelColor === 2) {
                cmdType = 1;
                TvProgramInfoList[oldIndex]["isLock"] = !TvProgramInfoList[oldIndex]["isLock"];
                json.value = {
                    cmd: cmdType,
                    channelInfo: TvProgramInfoList[oldIndex],
                }
            } else if (curChannelColor === 3) {
                cmdType = 1;
                TvProgramInfoList[oldIndex]["isSkip"] = !TvProgramInfoList[oldIndex]["isSkip"];
                json.value = {
                    cmd: cmdType,
                    channelInfo: TvProgramInfoList[oldIndex],
                }
            }

            channelListData[channelListRow - 1] = TvProgramInfoList[oldIndex];
            channelListData[channelListRow - 1].fileNum = curChannelFile;
            channelListData[channelListRow - 1].oldIndex = oldIndex;
            Oceanus.sendEvent("ProgramCenter", JSON.stringify(json));
            setChannelListUpdate(cmdType);
            setChannelListChange();
        });
    }
    //设置频道操作后的样式
    var newChannelData =Array;
    function setChannelListUpdate(type) {
        var $curChannel = $channelList.children('li').eq(channelListRow);
        if (type === 0) {
            if (channelListRow === $channelList.children('li').length - 1) {
                channelListRow--;
            }
            if (channelListRow === channelListNum) curChannelIndex++;
            var lastChannelList = channelListData[channelListData.length - 1];
            var lastIndex = lastChannelList.oldIndex + 1;
            if (typeof(TvProgramInfoList[lastIndex]) == "undefined") {
                if (lastChannelList.fileNum === channelListFileNum) {
                    for (var i = channelListRow - 1; i < channelListData.length; i++) {
                        channelListData[i] = channelListData[i + 1];
                    }
                    channelListData.pop();
                    $curChannel.remove();
                } 
                else {
                    if (channelListRow === channelListNum) {
                        curChannelFile++;
                        channelListRow++;
                    }
                    loadJsFile("tvprograminfo_" + (lastChannelList.fileNum + 1), "js_programData",function(){
                        newChannelData = TvProgramInfoList;
                        if (typeof(TvProgramInfoList) == "undefined") return false;
                        curChannelIndex = 0;
                        channelListData[channelListNum - 1] = TvProgramInfoList[curChannelIndex];
                        channelListData[channelListNum - 1].fileNum = curChannelFile + 1;
                        channelListData[channelListNum - 1].oldIndex = -1;
                        setChannelListUpdate(1);
                        setChannelListChangeStyle();
                    });

                }
            } else {
                loadJsFile("tvprograminfo_" + lastChannelList.fileNum, "js_programData",function(){
                    if (TvProgramInfoList[lastIndex]['isDelete'] === true ||
                        TvProgramInfoList[lastIndex]['isHide'] === true ||
                        TvProgramInfoList[lastIndex]['isVisible'] === false) {
                        channelListData[channelListNum - 1] = TvProgramInfoList[lastIndex];
                        channelListData[channelListNum - 1].oldIndex = lastIndex;
                        channelListData[channelListNum - 1].fileNum = curChannelFile + 1;
                        setChannelListUpdate(1);
                        return false;
                    } else {
                        for (var i = channelListRow - 1; i < channelListData.length; i++) {
                            channelListData[i] = channelListData[i + 1];
                        }
                        channelListData[channelListNum - 1] = TvProgramInfoList[lastIndex];
                        channelListData[channelListNum - 1].oldIndex = lastIndex;
                        channelListData[channelListNum - 1].fileNum = lastChannelList.fileNum;
                    }
                    var showData = channelListData[channelListNum - 1];
                    var newChannelStr = "<li data-index='" + showData['Index'] + "' ";
                    newChannelStr += ">" + showData['Number'] + "&nbsp;&nbsp;" + showData['Name'];
                    if (showData['isLock'] === true) {
                        newChannelStr += "<img src='./images/channel_lock.png' />";
                    }
                    if (showData['isSkip'] === true) {
                        newChannelStr += "<img src='./images/channel_skip.png' />";
                    }
                    if (showData['isFavorite'] === true) {
                        newChannelStr += "<img src='./images/channel_fav.png' />";
                    }
                    newChannelStr + -"</li>";

                    $channelList.append(newChannelStr);
                    $curChannel.remove();
                    setChannelListChangeStyle();
                });
            }//DELETE
        } else {
            if (type === 3) {//FAVORITE
                var $mychannel = $("#js_mychannel");
                if (channelListData[channelListRow - 1].isFavorite === true) {
                    myChannelList.push(channelListData[channelListRow - 1]);
                    liStr = "<li><div class='my-channel-li' data-index='" + channelListData[channelListRow - 1]['Index'] + "'>";
                    liStr += channelListData[channelListRow - 1]['Number'] + "&nbsp;&nbsp;" + channelListData[channelListRow - 1]['Name'] + "</div>";
                    liStr += "<div class='channel-button'><ul>" +
                        "<li class='Remove'>Remove</li></ul></div></li>";
                    $mychannel.append(liStr);
                } else {
                    var channelIndex = channelListData[channelListRow - 1].Index;
                    for (var i = 0; i < $mychannel.children('li').length; i++) {
                        if ($mychannel.children('li').eq(i).children('div:eq(0)').data('index') == channelIndex) {
                            for (var j = i; j < myChannelList.length; j++) {
                                myChannelList[i] = myChannelList[i + 1];
                            }
                            myChannelList.pop();
                            $mychannel.children('li').eq(i).remove();
                        }
                    }
                }
            }
            $curChannel.children('img').remove();
            listStr = "";
            if (channelListData[channelListRow - 1]['isLock'] === true) {
                listStr += "<img src='./images/channel_lock.png' />";
            }
            if (channelListData[channelListRow - 1]['isSkip'] === true) {
                listStr += "<img src='./images/channel_skip.png' />";
            }
            if (channelListData[channelListRow - 1]['isFavorite'] === true) {
                listStr += "<img src='./images/channel_fav.png' />";
            }
            $curChannel.append(listStr);
        }
    }

    function switchCh() {
        if (channelListRow === 0) {
            curCol = "search";
            $(".channel-search").show(0);
            $(".content").removeClass("position-content-2").addClass("position-content-3");
            $detail.removeClass("position-detail-2").addClass("position-detail-3");
            $("#js_searchText").focus();
        } else {
            var channelInfo = channelListData[channelListRow - 1];
            var data = {
                cmd: "switch_Ch",
                value: channelInfo,
            };
            Oceanus.sendEvent("ProgramCenter", JSON.stringify(data));
        }
    }

    //设置sort-detail选择的样式
    function setSortChange(keyCode) {
        if (keyCode === numKey.right) {
            if (sortRow === programCenter.arrSortName.length - 1) sortRow = 0;
            else sortRow++;
        } else if (keyCode === numKey.left) {
            if (sortRow === 0) sortRow = programCenter.arrSortName.length - 1;
            else sortRow--;
        }
        $("#js_sortDetail").children('li').removeClass('channelList-select');
        $("#js_sortDetail").children('li').eq(sortRow).addClass('channelList-select');
    }
    //sort选择后的操作
    function setSortChooise() {
        setSortEnterStyle();
        var sendData = { sortType: sortRow };
        sendJsonData.cmd = "sort_Beign";
        sendJsonData.value = sendData;
        Oceanus.sendEvent("ProgramCenter", JSON.stringify(sendJsonData));
    }

    function setSortEnterStyle() {
        var $sort = $("#js_sortDetail");
        $sort.children('li').children('span').remove();
        $sort.children('li').eq(sortRow).prepend("<span>√</span>");
    }
    setSortEnterStyle();
    //设置channelList详细内容显示
    function setChannelListShow() {
        if (channelListRow === 0) {
            curCol = "sort-detail";
            $(".sort-detail").show(0);
            $(".content").removeClass("position-content-2").addClass("position-content-3");
            $detail.removeClass("position-detail-2").addClass("position-detail-3");
            setSortChange();
        } else {
            curCol = "channelInfo";

            setProgramChange();
            $channelList.addClass("channelList-small").removeClass("channelList-big");
            $channelList.find(".channelList-select").removeClass("channelList-select").addClass("channelList-current");
        }
    }
    //隐藏channellist 详细的内容
    function setChannelListHide() {
        curCol = "channelList";
        if (channelListRow === 0) {
            $(".channel-search").hide(0);
            $(".sort-detail").hide(0);
            $("#js_searchText").val("");
            $("#js_searchContent").html("");
            $(".content").removeClass("position-content-3").addClass("position-content-2");
            $detail.removeClass("position-detail-3").addClass("position-detail-2");
        } else {
            channelInfoRow = 0;
            $("#js_channelInfo").children('li.channelList-select').removeClass('channelList-select');
            $channelList.find(".channelList-current").removeClass("channelList-current").addClass("channelList-select");
            $channelList.addClass("channelList-big").removeClass("channelList-small");
            $("#js_channelInfo").animate({ marginTop: '120px' }, 500);
        }
    }

    //搜索页面显示选项显示
    function setSearchChooiseShow(keyCode) {
        if (keyCode === numKey.up) {
            $(".search-chooise").slideDown();
            $(".search-up").slideUp();
            setSearchSelect(keyCode);
        } else if (keyCode === numKey.down) {
            $(".search-chooise").slideUp();
            $(".search-up").slideDown();
            searchRow = 0
        }
    }

    //搜索条件选择
    var searchRow = 0;

    function setSearchSelect(keyCode) {
        var $chooise = $("#js_searchChooise").find('div');
        if (keyCode === numKey.left) {
            if (searchRow === 0) {
                setChannelListHide();
                return false;
            } else searchRow--;
        } else if (keyCode === numKey.right) {
            if (searchRow === $chooise.length - 1) return false;
            else searchRow++;
        } else if (keyCode === numKey.enter) {
            $("#js_searchContent").html("");
            var text = $("#js_searchText").val();
            var isAtv = searchRow === 2 ? true : false;
            var isDtv = searchRow === 1 ? true : false;
            var json = {
                cmd: 'search_CH',
                value: {
                    content: text,
                    isATV: isAtv,
                    isDTV: isDtv
                }
            }
            Oceanus.sendEvent("ProgramCenter", JSON.stringify(json));
        }
        $("#js_searchText").keyup(function(ev) { $(this).val($(this).val()); });
        $chooise.removeClass('search-chooise-select');
        $chooise.eq(searchRow).addClass('search-chooise-select');
        $chooise.children('input').attr({ checked: false });
        $chooise.eq(searchRow).children('input').attr({ checked: true });
    }
    //节目选择
    function setProgramChange(keyCode) {
        var $channelInfo = $("#js_channelInfo");
        if (keyCode === numKey.up) {
            if (channelInfoRow === 0) return false;
            else if (channelInfoRow % 10 == 0) {
                $channelInfo.animate({ marginTop: '+=600px' }, 500);
            }
            channelInfoRow--;
        } else if (keyCode === numKey.down) {
            if (channelInfoRow === $channelInfo.children("li").length - 1) return false;
            else if ((channelInfoRow + 1) % 10 == 0) {
                $channelInfo.animate({ marginTop: '-=600px' }, 500);
            }
            channelInfoRow++;
        }
        layoutEpgDetail(EpgData[channelInfoRow]);
        $channelInfo.children("li.channelList-select").removeClass("channelList-select");
        $channelInfo.children("li").eq(channelInfoRow).addClass("channelList-select");
    }

    function loadMyChannelData() {
        var liStr = "";
        loadJsFile('favoriteList', 'js_favoriteData');
        setTimeout(function() {

            if (typeof(FavoriteList) == "undefined") return false;
            myChannelList = FavoriteList;
            var $myChannel = $("#js_mychannel");
            for (var i in myChannelList) {
                if (myChannelList.hasOwnProperty(i)) {
                    liStr += "<li><div class='my-channel-li' data-index='" + myChannelList[i]['Index'] + "'>";
                    liStr += myChannelList[i]['Number'] + "&nbsp;&nbsp;" + myChannelList[i]['Name'] + "</div>";
                    liStr += "<div class='channel-button'><ul>" +
                        // <li class='Stick'>Stick</li>
                        // <li class='Lock'>Lock</li>
                        // <li class='Skip'>Skip</li>
                        "<li class='Remove'>Remove</li></ul></div></li>";
                }

            }
            $myChannel.html("");
            $myChannel.append(liStr);
        }, 200)
    }
    loadMyChannelData();
    //mychannel 上下选择函数
    function myChannelChange(keyCode) {
        hideChannelButton();
        var $mychannel = $("#js_mychannel");
        if (keyCode === numKey.down) {
            if (myChannelRow === $mychannel.children("li").length - 1) return false;
            myChannelRow++;
        } else if (keyCode === numKey.up) {
            if (myChannelRow === 0) return false;
            myChannelRow--;
        }

        $mychannel.find(".channelList-select").removeClass("channelList-select");
        $mychannel.find(".my-channel-li").eq(myChannelRow).addClass("channelList-select");
    }

    //弹出频道上四个选择按钮
    function showChannelButton() {
        curCol = "channelButton";
        var $mychannel = $("#js_mychannel");
        $mychannel.find(".my-channel-li").eq(myChannelRow).addClass("li-movetoleft");
        $mychannel.find(".channel-button").eq(myChannelRow).addClass("channel-button-show");
        channelButtonChange();
    }
    //隐藏频道操作按钮
    function hideChannelButton() {
        curCol = "myChannel";
        myChannelButtonCol = 0;
        var $mychannel = $("#js_mychannel");
        //向底层发送数据，删除喜爱频道

        $mychannel.find(".my-channel-li").eq(myChannelRow).removeClass("li-movetoleft");
        $mychannel.find(".channel-button").eq(myChannelRow).removeClass("channel-button-show");

        $mychannel.find(".channel-button-select").removeClass("channel-button-select");
    }

    function removeFavorite() {
        var newFav = myChannelList[myChannelRow];
        newFav['isFavorite'] = false;
        var json = {
            cmd: 'set_Fav',
            value: newFav
        }
        for (var i = myChannelRow; i < myChannelList.length; i++) {
            myChannelList[i] = myChannelList[i + 1];
        }
        myChannelList.pop();
        $("#js_mychannel").children('li').eq(myChannelRow).remove();
        Oceanus.sendEvent("ProgramCenter", JSON.stringify(json));
        //删除数组下指定的元素
        var curMychannelIndex = newFav.Index;
        for (var i = 0; i < TvProgramInfoList.length; i++) {
            if (TvProgramInfoList[i].Index === newFav.Index) {
                TvProgramInfoList[i].isFavorite = false;
                for (var j = 0; j < channelListNum; j++) {
                    if (i === channelListData[j].oldIndex) {
                        channelListData[j].isFavorite = false;
                        var $curChannel = $channelList.children('li').eq(j + 1);
                        $curChannel.children('img').remove();
                        var listStr = "";
                        if (channelListData[channelListRow - 1]['isLock'] === true) {
                            listStr += "<img src='./images/channel_lock.png' />";
                        }
                        if (channelListData[channelListRow - 1]['isSkip'] === true) {
                            listStr += "<img src='./images/channel_skip.png' />";
                        }
                        if (channelListData[channelListRow - 1]['isFavorite'] === true) {
                            listStr += "<img src='./images/channel_fav.png' />";
                        }
                        $curChannel.append(listStr);
                    }
                }
                break;
            }
        }
        if (myChannelRow === 0) {
            setRightHide();
        } else {
            myChannelChange(numKey.up);
        }
    }

    //channel button 选择事件
    function channelButtonChange(keyCode) {
        if (keyCode === numKey.right) {
            if (myChannelButtonCol === 3) myChannelButtonCol = 0;
            else myChannelButtonCol++;
        } else if (keyCode === numKey.left) {
            if (myChannelButtonCol === 0) myChannelButtonCol = 3;
            else myChannelButtonCol--;
        }
        var $channelButton = $("#js_mychannel").find(".channel-button").eq(myChannelRow);
        $channelButton.find(".channel-button-select").removeClass("channel-button-select");
        $channelButton.find("li").eq(myChannelButtonCol).addClass("channel-button-select");
    }

    function loadMediaData() {
        var diskParse = 1024 * 1024 * 1024;
        loadJsFile("usbdisk", "js_mediaData", "../../system/", function() {
			var $media = $("#js_mediaExter");
            $media.html("");
			var mediaStr = "";
            if (typeof(UsbDiskInfoList) == "undefined" ) return false;
            console.log(UsbDiskInfoList);
            var used = 0,
                max = 0,
                remain = 0;
            for (var i in UsbDiskInfoList) {
                used = (UsbDiskInfoList[i].used / diskParse).toFixed(2);
                max = (UsbDiskInfoList[i].max / diskParse).toFixed(2);
                remain = (UsbDiskInfoList[i].free / diskParse).toFixed(2);
                console.log(used);
                console.log(max);
                mediaStr += "<li><div></div><div class='disk-info'><div>";
                mediaStr += UsbDiskInfoList[i].name + "(" + UsbDiskInfoList[i].lable + ")";
                mediaStr += "</div><div class='disk-size'>";
                mediaStr += "<div class='disk-size-use' style='width:" + parseInt((used / max) * 100) + "%'></div></div>";
                mediaStr += "<div>" + programCenter.diskRemain + ":" + remain + programCenter.diskGB + "&nbsp;&nbsp;" + programCenter.diskTotal + ":" + max + programCenter.diskGB + "</div></div></li>";
            }
            console.log(mediaStr);
            $media.append(mediaStr);
			UsbDiskInfoList = "";
        });
    };
    loadMediaData();
    //media上下切换事件
    function mediaChange(keyCode) {
        var $media = $("#js_media");
        var $mediaExter = $("#js_mediaExter");
        if (keyCode === numKey.down) {
            if (mediaRow === UsbDiskInfoList.length) return false;
            mediaRow++;
        } else if (keyCode === numKey.up) {
            if (mediaRow === 0) return false;
            mediaRow--;
        }
        if (mediaRow === 0) {
            $media.children('div').eq(0).addClass('channelList-select');
            $mediaExter.children("li.channelList-select").removeClass("channelList-select");
        } else {
            $media.children('div').eq(0).removeClass('channelList-select');
            $mediaExter.children("li.channelList-select").removeClass("channelList-select");
            $mediaExter.children("li").eq(mediaRow - 1).addClass("channelList-select");
        }
    }
    //disk选择事件


    //路径设置显示
    function routeShow(keyCode) {
        if (keyCode === numKey.right) {
            curCol = "route";
            $("#js_route").show(0);
            $(".content").removeClass("position-content-2").addClass("position-content-3");
            $detail.removeClass("position-detail-2").addClass("position-detail-3");
        } else if (keyCode == numKey.left) {
            curCol = "media";
            $("#js_route").hide(0);
            $(".content").removeClass("position-content-3").addClass("position-content-2");
            $detail.removeClass("position-detail-3").addClass("position-detail-2");
        }
    }

    $(document).keydown(function(event) {
        var keyCode = event.keyCode;
        if (keyCode === numKey.green) {
            Oceanus.runApp("ChannelScan");
            return false;
        }
        switch (curCol) {
            case "menu":
                if (keyCode === numKey.down || keyCode === numKey.up) {
                    setMenuStyle(keyCode);
                } else if (keyCode === numKey.right) {
                    //curCol="channelList";
                    setRightShow();
                }
                break;
            case "channelList":
                if (keyCode === numKey.down || keyCode === numKey.up) {
                    setChannelListChange(keyCode);
                } else if (keyCode === numKey.left) {
                    setRightHide();
                } else if (keyCode === numKey.right) {
                    setChannelListShow();
                } else if (keyCode === numKey.red) {
                    setChannelColor(1);
                    // Oceanus.runApp("ChannelEdit");
                } else if (keyCode === numKey.enter) {
                    switchCh();
                }
                break;
            case "channelColor":
                if (keyCode === numKey.down || keyCode === numKey.up) {
                    setChannelListChange(keyCode);
                } else if (keyCode === numKey.left || keyCode === numKey.right) {
                    setChannelColorSelect(keyCode);
                } else if (keyCode === numKey.enter) {
                    setChannelColorEnter();
                } else if (keyCode === numKey.red) {
                    setChannelListChange();
                }
                break;
            case "search":
                if (keyCode === numKey.left || keyCode === numKey.right || keyCode === numKey.enter) {
                    setSearchSelect(keyCode);
                } else if (keyCode === numKey.up || keyCode === numKey.down) {
                    setSearchChooiseShow(keyCode);
                }
                break;
            case "channelInfo":
                if (keyCode === numKey.down || keyCode === numKey.up) {
                    setProgramChange(keyCode);
                } else if (keyCode === numKey.left) {
                    setChannelListHide();
                } else if (keyCode === numKey.right) {}
                break;
            case "myChannel":
                if (keyCode === numKey.down || keyCode === numKey.up) {
                    myChannelChange(keyCode);
                } else if (keyCode === numKey.left) {
                    setRightHide();
                } else if (keyCode === numKey.right) {
                    showChannelButton();
                } else if (keyCode === numKey.enter) {
                    //切换到当前的台
                }
                break;
            case "channelButton":
                /*if(keyCode===numKey.left || keyCode===numKey.right){
                    channelButtonChange(keyCode);
                }else */
                if (keyCode === numKey.down || keyCode === numKey.up) {
                    myChannelChange(keyCode);
                } else if (keyCode === numKey.enter) {
                    hideChannelButton();
                    removeFavorite();
                }
                break;
            case "media":
                if (keyCode === numKey.down || keyCode === numKey.up) {
                    mediaChange(keyCode);
                } else if (keyCode === numKey.left) {
                    setRightHide();
                } else if (mediaRow === 0 && (keyCode === numKey.enter || keyCode === numKey.right)) {
                    routeShow(numKey.right);
                }
                break;
            case "route":
                if (keyCode === numKey.left) {
                    routeShow(keyCode);
                } else if (keyCode === numKey.enter) {}
                break;
            case "sort-detail":
                if (keyCode === numKey.left || keyCode === numKey.right) {
                    if (keyCode === numKey.left && sortRow === 0) {
                        setChannelListHide();
                    } else {
                        setSortChange(keyCode);
                    }
                } else if (keyCode === numKey.enter) {
                    setSortChooise();
                }
                break;
        }

        if (keyCode === numKey.back) {
            if (curCol == "channelList" || curCol == "media" || curCol == "mediaLocal" || curCol == "mediaExter" ||
                curCol == "sort" || curCol == "myChannel") {
                setRightHide();
            }
            if (curCol === "menu") {
                Oceanus.closeApp(($('title').text()));
            }
        }
    });
});
