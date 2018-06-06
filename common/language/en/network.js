var allNetworkSettings={
    networkOptions:[
        "Wired Network",
        "Wifi Network"
    ],
    wiredNetworkOptions:[
        [
            "Configuration",
            [
                "Static",/*静态的ip，可以自己设置*/
                "DHCP"/*动态获取ip*/
            ]
        ],
        ["ip"],
        ["Netmask"],//---默认网关
        ["Gateway"],//---子网掩码
        ["DNS"],
        ["MAC Address"],
        ["    "]

    ],
    wifiNetworkOptions:[
        [
            "WiFi",
            [
                "ON",
                "OFF"
            ]
        ],
        ["Show info"]
    ],
    useWifiOptions:[/*可用的wifi名称*/
        "makeitture",
        "aaaa",
        "628",
        "yyyyy",
        "yikayong"

    ],
    wifiPassTitle:"Please input password",
    wifiWrongPassTitle:"pass is Wrong,please input again"
}
var buttonValue="Enter";