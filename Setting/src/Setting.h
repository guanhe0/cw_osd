#ifndef _SETTING_H_
#define _SETTING_H_

#include "OWindow.h"
#include "Oceanus_Debug.h"
#include "OApplication.h"
#include "json/json.h"
#include "json/reader.h"
#include "OSrv_CommonManager.h"
#include "OSrv_ServiceManager.h"
#include "Oceanus_Event.h"

class Setting:public OApplication
{
public:
	Setting(ST_APPCONFIG* app_cfg);
	~Setting();
private:
		BOOL onKey(OCEANUS_INPUT_KEYCODE keyCode,EN_KEY_TYPE keyType);
		void onStop();
		void onResume();
		void onBackEnd();
		void onForeground();
		void onCreate();
		void onDestory();
private:
	ST_APPCONFIG* m_pConfig;
	OSrv_CommonManager* m_pCommonManager;
	Oceanus_EventListener* m_pSettingListener;
};

#ifdef __cplusplus
extern "C" {
#endif /* __cplusplus */
OApplication* createApp(ST_APPCONFIG* app_cfg)
{
	OCEANUS_LOGI("createApp{%s}",app_cfg->AppName.c_str());
	Setting* this_app = new (std::nothrow) Setting(app_cfg);
	ASSERT(this_app);
	return this_app;
}

void destoryApp(OApplication* this_app)
{
	delete this_app;
	this_app = NULL;
}

#ifdef __cplusplus
} 
#endif/* __cplusplus */

#endif