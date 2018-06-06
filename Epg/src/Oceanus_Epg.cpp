/**************************************************************************
* Copyright:sky
* Author: gengkaiyang
* Date:2016-2-18
* Description: Oceanus input method
**************************************************************************/
#include <sstream>

#include "Oceanus_Epg.h"
#include "Oceanus_ChannelManager_Types.h"
#include "OSrv_ChannelManager.h"
#include "OSrv_TimerManager.h"
#include "OSrv_EpgManager.h"
#include "OSrv_SqliteService.h"
#include "OSrv_CommonManager.h"
#include "OSrv_ServiceManager.h"
#include "Oceanus_JsSnapshot.h"

#define CMD_SWITCH_CH	"CMD_SWITCH_CH"
#define CMD_GET_EVENTS	"CMD_GET_EVENTS"
#define CMD_GET_EVENT_DECRIPTION	"CMD_GET_EVENT_DECRIPTION"

Oceanus_Epg::Oceanus_Epg(ST_APPCONFIG* app_cfg) : OApplication(app_cfg),Oceanus_EventListener(NULL)
{
	OCEANUS_LOGI("");
	m_pConfig = app_cfg;
}

Oceanus_Epg::~Oceanus_Epg()
{
	OCEANUS_LOGI("");
	Oceanus_Event::getInstance()->unregisterEventListener(E_SYSTEM_EVENT_JS_NOTIFY, this);
}

BOOL Oceanus_Epg::onKey(OCEANUS_INPUT_KEYCODE keyCode,EN_KEY_TYPE keyType)
{
	OCEANUS_LOGI("keyCode:%d",keyCode);
	return FALSE;
}

void Oceanus_Epg::onCreate()
{
	OCEANUS_LOGI(" ");
	std::ostringstream buf;
	OString initInfo = "{\"cmd\":\"init\",\"value\":{\"ChInfoFileCount\":";
	U32 count = Oceanus_JsSnapshot::getInstance()->getChannelInfoFileCount();
	buf << initInfo << count << "}};";
	SetInitJsCmd(buf.str());
	setListenerName(EpgListener_Name);		
	Oceanus_Event::getInstance()->registerEventListener(E_SYSTEM_EVENT_JS_NOTIFY,this);
}

void Oceanus_Epg::onStop()
{
	OCEANUS_LOGI("");
}

void Oceanus_Epg::onResume()
{
	OCEANUS_LOGI("");
}

void Oceanus_Epg::onBackEnd()
{
	OCEANUS_LOGI("");
}

void Oceanus_Epg::onForeground()
{
	OCEANUS_LOGI("");
}

void Oceanus_Epg::onDestory()
{
	OCEANUS_LOGI(" ");
}

void Oceanus_Epg::OnEvent(Oceanus_EventInfo * info)
{ 
	OCEANUS_LOGI("");
	OString infoStr = info->getString();
	OCEANUS_LOGD("info:%s", infoStr.c_str());
	if (info->getEventType() == E_SYSTEM_EVENT_JS_NOTIFY)
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
			else if (cmd == CMD_GET_EVENTS)
			{

			}
			else if (cmd == CMD_GET_EVENT_DECRIPTION)
			{

			}
		}
	}
}