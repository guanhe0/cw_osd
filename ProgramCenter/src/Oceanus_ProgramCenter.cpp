/**************************************************************************
* Copyright:sky
* Author: gengkaiyang
* Date:2016-2-18
* Description: Oceanus input method
**************************************************************************/
#include <sstream>

#include "Oceanus_ProgramCenter.h"
#include "Oceanus_ChannelManager_Types.h"
#include "OSrv_ChannelManager.h"
#include "OSrv_TimerManager.h"
#include "OSrv_EpgManager.h"
#include "OSrv_SqliteService.h"
#include "OSrv_CommonManager.h"
#include "OSrv_ServiceManager.h"
#include "Oceanus_JsSnapshot.h"

#define CMD_SWITCH_CH        "switch_Ch"
#define CMD_SET_FAV          "set_Fav"
#define CMD_SET_ATTRIBUTE    "set_Attribute"
#define CMD_MOVE_CH          "move_Ch"
#define CMD_GET_EPG          "get_Epg"
#define CMD_SEARCH_CH        "search_CH"
#define CMD_SEARCH_RET       "search_Ret"
#define CMD_UPDATE_CH		 "Update_Ch"
#define CMD_INIT             "init"
#define CMD_SORT_BEIGN       "sort_Beign"
#define CMD_SORT_END         "{\"cmd\":\"sort_End\",\"value\":{}}"
#define CMD_USB_CHANGE       "{\"cmd\":\"usb_change\",\"value\":{}}"

Oceanus_ProgramCenter::Oceanus_ProgramCenter(ST_APPCONFIG* app_cfg) : OApplication(app_cfg),Oceanus_EventListener(NULL)
{
	OCEANUS_LOGI("");
	m_pConfig = app_cfg;
}

Oceanus_ProgramCenter::~Oceanus_ProgramCenter()
{
	OCEANUS_LOGI("");
	Oceanus_Event::getInstance()->unregisterEventListener(E_SYSTEM_EVENT_JS_NOTIFY, this);
}

BOOL Oceanus_ProgramCenter::onKey(OCEANUS_INPUT_KEYCODE keyCode,EN_KEY_TYPE keyType)
{
	OCEANUS_LOGI("keyCode:%d",keyCode);
	return FALSE;
}

void Oceanus_ProgramCenter::onCreate()
{
	OCEANUS_LOGI(" ");
	std::ostringstream buf;
	OString initInfo = "{\"cmd\":\"init\",\"value\":{\"ChInfoFileCount\":";
	U32 count = Oceanus_JsSnapshot::getInstance()->getChannelInfoFileCount();
	buf << initInfo << count << "}};";
	SetInitJsCmd(buf.str());
	setListenerName(ProgramCenterListener_Name);		
	Oceanus_Event::getInstance()->registerEventListener(E_SYSTEM_EVENT_JS_NOTIFY,this);
	Oceanus_Event::getInstance()->registerEventListener(E_SYSTEM_EVENT_CHANNEL_STATUS_CHANGE,this);
	Oceanus_Event::getInstance()->registerEventListener(E_SYSTEM_EVENT_USB_NOTIFY,this);
}

void Oceanus_ProgramCenter::onStop()
{
	OCEANUS_LOGI("");
}

void Oceanus_ProgramCenter::onResume()
{
	OCEANUS_LOGI("");
}

void Oceanus_ProgramCenter::onBackEnd()
{
	OCEANUS_LOGI("");
}

void Oceanus_ProgramCenter::onForeground()
{
	OCEANUS_LOGI("");
}

void Oceanus_ProgramCenter::onDestory()
{
	OCEANUS_LOGI(" ");
}

void Oceanus_ProgramCenter::OnEvent(Oceanus_EventInfo * info)
{
	OCEANUS_LOGI("");
	OString infoStr = info->getString();
	OCEANUS_LOGD("info:%s", infoStr.c_str());
	if(info->getEventType() == E_SYSTEM_EVENT_JS_NOTIFY)
	{
		Json::Reader reader;
		Json::Value params;
		if(reader.parse(infoStr, params))
		{
			OString cmd = params["cmd"].asString();
			Json::Value value = params["value"];
			if (cmd == CMD_SWITCH_CH)
			{
				U32 serviceType = value["ServiceType"].asInt();
				U32 channelNumber = value["Number"].asInt();
				BOOL ret = OSrv_ServiceManager::getInstance()->getChannelManager()->ChannelChange(channelNumber, serviceType);
			}
			else if (cmd == CMD_GET_EPG)
			{
				U32 serviceType = value["ServiceType"].asInt();
				U32 channelNumber = value["Number"].asInt();
				OCEANUS_LOGD("Number:%d ServiceType: %d", channelNumber, serviceType);
				U32 baseTime = value["baseTime"].asInt();//OSrv_ServiceManager::getInstance()->getInstance()->getTimerManager()->getCurTvTimeBySeconds();
				if(serviceType != E_SERVICE_ATV)
				{
					OSrv_ServiceManager::getInstance()->getEpgManager()->enableEpgBarkerChannel();
					U32 maxCount = OSrv_ServiceManager::getInstance()->getEpgManager()->getDvbEventCount(serviceType, channelNumber, baseTime);
					OCEANUS_LOGD("maxCount:%d", maxCount);
					if (maxCount > 0)
					{
						OString eventInfoList = OSrv_ServiceManager::getInstance()->getEpgManager()->getEventInfo(serviceType, channelNumber, baseTime, maxCount);
						Json::Value epgEventList;
						if(reader.parse(eventInfoList, epgEventList))
						{
							value["reply"] = epgEventList;
							params["value"] = value;
							Json::FastWriter writer;
							SendToJs(writer.write(params));
						}
					}
					else
					{
						value["reply"];
						params["value"] = value;
						Json::FastWriter writer;
						SendToJs(writer.write(params));
					}	
					OSrv_ServiceManager::getInstance()->getEpgManager()->disableEpgBarkerChannel();
				}
			}
			else if (cmd == CMD_SET_ATTRIBUTE)
			{
				U32 setCmd = value["cmd"].asInt();
				Json::Value channelInfo = value["channelInfo"];
				BOOL attributeValue = FALSE;
				U32 channelNumber = channelInfo["Number"].asInt();
				U32 serviceType = channelInfo["ServiceType"].asInt();
				EN_CHANNEL_ATTRIBUTE_TYPE type = (EN_CHANNEL_ATTRIBUTE_TYPE)setCmd;
				switch(type)
				{
					case E_CHANNEL_ATTRIBUTE_DELETE:
						attributeValue = channelInfo["isDelete"].asBool()?TRUE:FALSE;
						break;
					case E_CHANNEL_ATTRIBUTE_LOCK:
						attributeValue = channelInfo["isLock"].asBool()?TRUE:FALSE;
						break;
					case E_CHANNEL_ATTRIBUTE_SKIP:
						attributeValue = channelInfo["isSkip"].asBool()?TRUE:FALSE;
						break;
					case E_CHANNEL_ATTRIBUTE_HIDE:
						attributeValue = channelInfo["isHide"].asBool()?TRUE:FALSE;
						break;
					default:
						return;
				}
				OSrv_ServiceManager::getInstance()->getChannelManager()->setChannelAttributes(type, channelNumber, serviceType, attributeValue);
				
				Json::Value jParams;
				jParams["cmd"] = "Update_Ch";
				Json::Value jValue;
				jValue["cmdOfCh"] = cmd;
				jValue["channelInfo"] = channelInfo;
				jParams["value"] = jValue;
				Json::FastWriter writer;
				Oceanus_Event::getInstance()->sendEvent(JsSnapshotListener_Name, writer.write(jParams));
						
				if (type == E_CHANNEL_ATTRIBUTE_DELETE)
				{
					if (serviceType == E_SERVICE_ATV)
					{
						U32 chNumber = OSrv_ServiceManager::getInstance()->getChannelManager()->getCurChannelNumber();
		                if (chNumber > 0xFF)
		                {
		                    chNumber = 0;
		                }
		                OSrv_ServiceManager::getInstance()->getChannelManager()->ChannelChange(chNumber, E_SERVICE_ATV);
					}
					else
					{
						OSrv_ServiceManager::getInstance()->getCommonManager()->playCurProgram();
					}
				}
			}
			else if (cmd == CMD_SET_FAV)
			{
				U32 channelNumber = value["Number"].asInt();
				U32 serviceType = value["ServiceType"].asInt();
				BOOL optionValue = value["isFavorite"].asBool()?TRUE:FALSE;
				if (optionValue == TRUE)
				{
					OSrv_ServiceManager::getInstance()->getChannelManager()->addChannelToFavList(channelNumber, serviceType, 0);
				}
				else 
				{
					OSrv_ServiceManager::getInstance()->getChannelManager()->deleteChannelFav(channelNumber, serviceType, 0);
				}
				Json::Value jParams;
				jParams["cmd"] = "Update_Ch";
				Json::Value jValue;
				jValue["cmdOfCh"] = cmd;
				jValue["channelInfo"] = value;
				jParams["value"] = jValue;
				Json::FastWriter writer;
				Oceanus_Event::getInstance()->sendEvent(JsSnapshotListener_Name, writer.write(jParams));
			}
			else if (cmd == CMD_MOVE_CH)
			{
				U32 sourcePosition = value["sourcePosition"].asInt();
				U32 targetPosition = value["targetPosition"].asInt();
				OSrv_ServiceManager::getInstance()->getChannelManager()->channelMove(sourcePosition, targetPosition);
			}
			else if(cmd == CMD_SEARCH_CH)
			{
				OCEANUS_LOGD(CMD_SEARCH_CH);
				OSrv_ServiceManager::getInstance()->getSqliteService()->searchTVProgramInfo(value.toStyledString());
			}
			else if(cmd == CMD_SEARCH_RET)
			{
				OCEANUS_LOGD(CMD_SEARCH_RET);
				SendToJs(infoStr);
			}
			else if(cmd == CMD_SORT_BEIGN)
			{
				U8 type = value["sortType"].asInt();
				BOOL result = Oceanus_JsSnapshot::getInstance()->buildSortedChannel(type);
				OCEANUS_LOGE("Notification Sort End result:%d", result);
				if(result == TRUE)
				{
					SendToJs(CMD_SORT_END);
				}
			}
		}
	}
	else if(info->getEventType() == E_SYSTEM_EVENT_USB_NOTIFY)
	{
		SendToJs(CMD_USB_CHANGE);
	}
}