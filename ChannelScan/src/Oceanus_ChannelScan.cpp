/**************************************************************************
* Copyright:sky
* Author: gengkaiyang
* Date:2016-2-18
* Description: Oceanus input method
**************************************************************************/

#include "Oceanus_ChannelScan.h"
#include "Oceanus_ChannelManager_Types.h"
#include "OSrv_ChannelManager.h"
#include "OSrv_TimerManager.h"
#include "OSrv_EpgManager.h"
#include "OSrv_SqliteService.h"
#include "OSrv_ServiceManager.h"

#define CMD_AUTO_SCAN_BEIGN    		 "AUTO_SCAN_BEIGN"
#define CMD_MANUAL_SCAN_BEIGN    	 "MANUAL_SCAN_BEIGN"
#define CMD_AUTO_SCAN_END      		 "AUTO_SCAN_END"
#define CMD_MANUAL_SCAN_END          "MANUAL_SCAN_END"
#define CMD_AUDO_SCAN_WIDGET     	 "AUTOSCAN_WIDGET"
#define CMD_MANUAL_SCAN_WIDEGT   	 "MANUALSCAN_WIDGET"

BOOL isAutoScan = FALSE;
BOOL isManualScan = FALSE;

Oceanus_ChannelScan::Oceanus_ChannelScan(ST_APPCONFIG* app_cfg) : OApplication(app_cfg),Oceanus_EventListener(NULL)
{
	OCEANUS_LOGI("");
	m_pConfig = app_cfg;
	m_wAutoScan = NULL;
	m_wManualScan = NULL;
}

Oceanus_ChannelScan::~Oceanus_ChannelScan()
{
	OCEANUS_LOGI("");
	if (m_wAutoScan != NULL)
	{
		delete m_wAutoScan;
		m_wAutoScan = NULL;
	}

	if (m_wManualScan != NULL)
	{
		delete m_wManualScan;
		m_wManualScan = NULL;
	}
}

void Oceanus_ChannelScan::onCreate()
{
	OCEANUS_LOGI(" ");

	m_wAutoScan = new (std::nothrow) OWidget_AutoScan("ChannelScan");
	m_wManualScan = new (std::nothrow) OWidget_ManualScan("ChannelScan");	

	setListenerName(ChannelScanListener_Name);
	Oceanus_Event::getInstance()->registerEventListener(E_SYSTEM_EVENT_JS_NOTIFY,this);
	Oceanus_Event::getInstance()->registerEventListener(E_SYSTEM_EVENT_ATV_AUTO_SCAN,this);
	Oceanus_Event::getInstance()->registerEventListener(E_SYSTEM_EVENT_DTV_AUTO_SCAN,this);
	Oceanus_Event::getInstance()->registerEventListener(E_SYSTEM_EVENT_ATV_MANUAL_SCAN,this);
}

BOOL Oceanus_ChannelScan::onKey(OCEANUS_INPUT_KEYCODE keyCode,EN_KEY_TYPE keyType)
{
	OCEANUS_LOGI("keyCode:%d",keyCode);
	return FALSE;
}

void Oceanus_ChannelScan::onDestory()
{
	OCEANUS_LOGI(" ");
	Oceanus_Event::getInstance()->unregisterEventListener(E_SYSTEM_EVENT_JS_NOTIFY, this);
	Oceanus_Event::getInstance()->unregisterEventListener(E_SYSTEM_EVENT_ATV_AUTO_SCAN, this);
	Oceanus_Event::getInstance()->unregisterEventListener(E_SYSTEM_EVENT_DTV_AUTO_SCAN, this);
	Oceanus_Event::getInstance()->unregisterEventListener(E_SYSTEM_EVENT_ATV_MANUAL_SCAN, this);
}

void Oceanus_ChannelScan::OnEvent(Oceanus_EventInfo * info)
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
			if(cmd == CMD_AUTO_SCAN_BEIGN)
			{
				OCEANUS_LOGI("");
				isAutoScan = TRUE;
				isManualScan = FALSE;
			}
			else if(cmd == CMD_MANUAL_SCAN_BEIGN)
			{
				OCEANUS_LOGI("");
				isAutoScan = FALSE;
				isManualScan = TRUE;
			}
			else if(cmd == CMD_AUTO_SCAN_END && isAutoScan == TRUE)
			{
				if(value["scanType"].asString() == "ATV")
				{
					OSrv_ServiceManager::getInstance()->getChannelManager()->changeToFirstChannel(E_FRIST_OCHANNEL_ATV);
				}
				else if(value["scanType"].asString() == "DTV")
				{
					OSrv_ServiceManager::getInstance()->getChannelManager()->changeToFirstChannel(E_FRIST_OCHANNEL_DTV);
				}
				OSrv_ServiceManager::getInstance()->getSqliteService()->clearProgramInfo(E_OCOUNT_ALL);
				ST_CHANNEL_INFO channelInfo;
			    U32 chCount = OSrv_ServiceManager::getInstance()->getChannelManager()->getChannelNumber(E_OCOUNT_ALL);
				OCEANUS_LOGI("chCount = %d",chCount);
			    for(U32 index = 0; index < chCount; index++)
			    {
				    OSrv_ServiceManager::getInstance()->getChannelManager()->getChannelInfobyDBIndex(index,&channelInfo);
					OSrv_ServiceManager::getInstance()->getSqliteService()->insertTVProgramInfo(channelInfo);
				}
			}
			else if(cmd == CMD_MANUAL_SCAN_END && isManualScan == TRUE)
			{
				if(value["scanType"].asString() == "ATV")
				{
					OSrv_ServiceManager::getInstance()->getChannelManager()->changeToFirstChannel(E_FRIST_OCHANNEL_ATV);
				}
				else if(value["scanType"].asString() == "DTV")
				{
					OSrv_ServiceManager::getInstance()->getChannelManager()->changeToFirstChannel(E_FRIST_OCHANNEL_DTV);
				}
				OSrv_ServiceManager::getInstance()->getSqliteService()->clearProgramInfo(E_OCOUNT_ALL);
				ST_CHANNEL_INFO channelInfo;
			    U32 chCount = OSrv_ServiceManager::getInstance()->getChannelManager()->getChannelNumber(E_OCOUNT_ALL);
				OCEANUS_LOGI("chCount = %d",chCount);
			    for(U32 index = 0; index < chCount; index++)
			    {
				    OSrv_ServiceManager::getInstance()->getChannelManager()->getChannelInfobyDBIndex(index,&channelInfo);
					OSrv_ServiceManager::getInstance()->getSqliteService()->insertTVProgramInfo(channelInfo);
				}
			}
			else if (cmd == CMD_AUDO_SCAN_WIDGET)
			{
				/*if (m_wAutoScan == NULL)
				{
					m_wAutoScan = new (std::nothrow) OWidget_AutoScan("ChannelScan");
				}*/

				OString option = value["option"].asString();
				if (option == "SHOW")
				{
					if (!m_wAutoScan->isShow())
					{
						m_wAutoScan->Show();
						m_wAutoScan->Focus();
					}
				}
				else if (option == "DISMISS")
				{
					if (m_wAutoScan->isShow())
					{
						m_wAutoScan->Hide();
						//delete m_wAutoScan;
						//m_wAutoScan = NULL;
						SendToJs(CMD_ON_FOREGROUND);
					}
				}
			}
			else if (cmd == CMD_MANUAL_SCAN_WIDEGT)
			{
				/*if (m_wManualScan == NULL)
				{
					m_wManualScan = new (std::nothrow) OWidget_ManualScan("ChannelScan");
				}*/

				OString option = value["option"].asString();
				if (option == "SHOW")
				{
					if (!m_wManualScan->isShow())
					{
						m_wManualScan->Show();
						m_wManualScan->Focus();
					}
				}
				else if (option == "DISMISS")
				{
					if (m_wManualScan->isShow())
					{
						m_wManualScan->Hide();
						//delete m_wManualScan;
						//m_wManualScan = NULL;
						SendToJs(CMD_ON_FOREGROUND);
					}
				}
			}
		}
	}
	else if(info->getEventType() == E_SYSTEM_EVENT_ATV_AUTO_SCAN)
	{
		m_wAutoScan->SendToJs(infoStr);
	}
	else if(info->getEventType() == E_SYSTEM_EVENT_DTV_AUTO_SCAN)
	{
		if(m_wAutoScan->isShow())
		{
			m_wAutoScan->SendToJs(infoStr);
		}
		else 
		{
			m_wManualScan->SendToJs(infoStr);
		}
	}
	else if(info->getEventType() == E_SYSTEM_EVENT_ATV_MANUAL_SCAN)
	{
		m_wManualScan->SendToJs(infoStr);
	}
}