#include "Setting.h"
#define SettingListener_Name "Setting"
class SettingListener:public Oceanus_EventListener
{
public:
	SettingListener(Setting *content):Oceanus_EventListener(this,SettingListener_Name)
	{
		m_pSetting = content;
	}

	void OnEvent(Oceanus_EventInfo * info)
	{
		Json::FastWriter fastwriter;
		Json::Value msg;
		if(info->getEventType() == E_SYSTEM_EVENT_TIME_CHANGE)
		{
			OCEANUS_LOGI("time has change~~......");
			msg["cmd"] = "autosynctime";
			msg["value"] = 10;
			m_pSetting->SendToJs(fastwriter.write(msg));
		}
	}
private:
	Setting* m_pSetting;
};


Setting::Setting(ST_APPCONFIG* app_cfg):OApplication(app_cfg)
{
	OCEANUS_LOGI("");
	m_pConfig = app_cfg;

    m_pSettingListener = new (std::nothrow) SettingListener(this);
	Oceanus_Event::getInstance()->registerEventListener(E_SYSTEM_EVENT_TIME_CHANGE,m_pSettingListener);
}

Setting::~Setting()
{
	OCEANUS_LOGI("");
	if(m_pSettingListener!= NULL)
	{
		Oceanus_Event::getInstance()->unregisterEventListener(E_SYSTEM_TIME_EVENT_TIME_SYNC,m_pSettingListener);
		delete m_pSettingListener;
		m_pSettingListener = NULL;
	}
}

void Setting::onCreate()
{
	OCEANUS_LOGI("");
	m_pCommonManager = OSrv_ServiceManager::getInstance()->getCommonManager();
	Json::Value initInfo;
	Json::Value value;
	initInfo["cmd"] = "initData";
	SetInitJsCmd(initInfo.toStyledString());
}

void Setting::onDestory()
{
	OCEANUS_LOGI("");
}

void Setting::onStop()
{
	OCEANUS_LOGI("");
}

void Setting::onResume()
{
	OCEANUS_LOGI("");
}

void Setting::onBackEnd()
{
	OCEANUS_LOGI("");
	Json::Value initInfo;
	Json::Value value;
	initInfo["cmd"] = "saveData";
	SendToJs(initInfo.toStyledString());
}

void Setting::onForeground()
{
	OCEANUS_LOGI("");
}

BOOL Setting::onKey(OCEANUS_INPUT_KEYCODE keyCode,EN_KEY_TYPE keyType)
{
	OCEANUS_LOGI("");
	if(keyType == E_KEY_TYPE_DOWN)
		{
			switch(keyCode)
			{
				case OKEY_RED:
				return TRUE;
				case OKEY_GREEN:
				return TRUE;
				case OKEY_YELLOW:
				return TRUE;
			}
		}
	return FALSE;
}

