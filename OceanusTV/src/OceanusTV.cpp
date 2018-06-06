/**************************************************************************
* Copyright:sky
* Author: heji@skyworth.com
* Date:2016-2-22
* Description: app : Oceanus TV
**************************************************************************/
#include "OceanusTV.h"
//#include "OWidget_Source.h"

OceanusTv::OceanusTv(ST_APPCONFIG* app_cfg):OApplication(app_cfg),Oceanus_EventListener(this)
{
	m_pConfig = app_cfg;
	OCEANUS_LOGI("OceanusTv create ");
}

OceanusTv::~OceanusTv()
{
	OCEANUS_LOGI(" ");
}

void OceanusTv::onCreate()
{
	OCEANUS_LOGI(" ");
	//m_pWidgetSource = new (std::nothrow) OWidget_Source(OCEANUS);
	Oceanus_Event::getInstance()->registerEventListener(E_SYSTEM_EVENT_SAVERMODE_CHANGE,this);
}

BOOL OceanusTv::onKey(OCEANUS_INPUT_KEYCODE keyCode,EN_KEY_TYPE keyType)
{
	OCEANUS_LOGI("%d",keyCode);
	if(keyType == E_KEY_TYPE_DOWN)
		{
			switch(keyCode)
			{		
				default:
					return FALSE;
			}
		}
	return FALSE;
}
void OceanusTv::onDestory()
{
	OCEANUS_LOGI(" ");
	Oceanus_Event::getInstance()->unregisterEventListener(E_SYSTEM_EVENT_SAVERMODE_CHANGE,this);
}

void OceanusTv::OnEvent(Oceanus_EventInfo * info)
{
	//OCEANUS_LOGI(" ");
	Json::FastWriter fastwriter;
	Json::Value msg;
	if(info->getEventType() == E_SYSTEM_EVENT_SIGNAL_CHANGE)
		{
			//OCEANUS_LOGI("E_SYSTEM_EVENT_SIGNAL_CHANGE @@@@@@");
			msg["cmd"] = "signal";
			msg["value"] = (int)info->getU32Number();
			SendToJs(fastwriter.write(msg));
		}
	if(info->getEventType() == E_SYSTEM_EVENT_SAVERMODE_CHANGE)
	{
			//OCEANUS_LOGI("E_SYSTEM_EVENT_SAVERMODE_CHANGE @@@@@@");
			ST_POSTEVENT_PARAMS* st_postevent_params;
			info->getObj((void**)&st_postevent_params);
			msg["cmd"] = "savermode";
			msg["value1"] = st_postevent_params->param1;
			msg["value2"] = st_postevent_params->param2;
			SendToJs(fastwriter.write(msg));		
	}
}




