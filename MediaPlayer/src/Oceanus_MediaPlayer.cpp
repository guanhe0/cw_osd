/**************************************************************************
* Copyright:sky
* Author: gengkaiyang
* Date:2016-2-18
* Description: Oceanus MediaPlayer
**************************************************************************/
#include <sstream>

#include "Oceanus_MediaPlayer.h"

#define CMD_START_PLAY				"CMD_START_PLAY"
#define CMD_PLAY_LIST				"CMD_PLAY_LIST"
#define CMD_RECORD_PLAY_HISTORY		"CMD_RECORD_PLAY_HISTORY"
#define CMD_PLAY_HISTROY            "CMD_PLAY_HISTROY"

EN_INPUT_SOURCE_TYPE preSource = E_INPUT_SOURCE_STORAGE;

Oceanus_MediaPlayer::Oceanus_MediaPlayer(ST_APPCONFIG* app_cfg) : OApplication(app_cfg),Oceanus_EventListener(NULL)
{
	OCEANUS_LOGI("");
	m_pConfig = app_cfg;
}

Oceanus_MediaPlayer::~Oceanus_MediaPlayer()
{
	OCEANUS_LOGI("");
	Oceanus_Event::getInstance()->unregisterEventListener(E_SYSTEM_EVENT_JS_NOTIFY, this);
}

BOOL Oceanus_MediaPlayer::onKey(OCEANUS_INPUT_KEYCODE keyCode,EN_KEY_TYPE keyType)
{
	OCEANUS_LOGI("keyCode:%d",keyCode);
	if (keyType == E_KEY_TYPE_DOWN)
	{
		if(keyCode == OKEY_RED)
		{
			OString jsonCmd = "{\"cmd\":\"CMD_START_PLAY\",\"value\":{\"mediaType\":\"video/webm\", \
			\"mediaUrl\":\"/usb/sda1/testvideo.webm\", \"mediaCodecs\":\"vp8,vorbis\"}}";
			/*OString jsonCmd = "{\"cmd\":\"CMD_START_PLAY\",\"value\":{\"mediaType\":\"video/mp4\", \
			\"mediaUrl\":\"/usb/sda1/testvideo.mp4\", \"mediaCodecs\":\"avc1.4D401E, mp4a.40.2\"}}";*/
			SendToJs(jsonCmd);
		}
	}
	return FALSE;
}

void Oceanus_MediaPlayer::onCreate()
{
	OCEANUS_LOGI("");
	setListenerName(MediaPlayerListener_Name);	
	Oceanus_Event::getInstance()->registerEventListener(E_SYSTEM_EVENT_JS_NOTIFY,this);
	preSource = (EN_INPUT_SOURCE_TYPE)OSrv_ServiceManager::getInstance()->getSourceManager()->getCurInputSource();
	if( preSource != E_INPUT_SOURCE_STORAGE)
	{
		OSrv_ServiceManager::getInstance()->getSourceManager()->setInputSource(E_INPUT_SOURCE_STORAGE);
	}
}

void Oceanus_MediaPlayer::onStop()
{
	OCEANUS_LOGI("");
}

void Oceanus_MediaPlayer::onResume()
{
	OCEANUS_LOGI("");
}

void Oceanus_MediaPlayer::onBackEnd()
{
	OCEANUS_LOGI("");
	OSrv_ServiceManager::getInstance()->getSourceManager()->setInputSource(preSource);
}

void Oceanus_MediaPlayer::onForeground()
{
	OCEANUS_LOGI("");
	preSource = (EN_INPUT_SOURCE_TYPE)OSrv_ServiceManager::getInstance()->getSourceManager()->getCurInputSource();
	if( preSource != E_INPUT_SOURCE_STORAGE)
	{
		OSrv_ServiceManager::getInstance()->getSourceManager()->setInputSource(E_INPUT_SOURCE_STORAGE);
	}
}

void Oceanus_MediaPlayer::onDestory()
{
	OCEANUS_LOGI(" ");
}

void Oceanus_MediaPlayer::OnEvent(Oceanus_EventInfo * info)
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
		}
	}
}