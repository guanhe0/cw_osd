/**************************************************************************
* Copyright:sky
* Author: gengkaiyang
* Date:2016-2-18
* Description: Oceanus EPG
**************************************************************************/
#ifndef __OCEANUS_EPG__
#define __OCEANUS_EPG__

#include "OWindow.h"
#include "Oceanus_Event.h"
#include "OApplication.h"

class Oceanus_Epg : public OApplication, public Oceanus_EventListener
{
public:
	Oceanus_Epg(ST_APPCONFIG* app_cfg);
	virtual ~Oceanus_Epg();
	
	void OnEvent(Oceanus_EventInfo * info);

private:
	ST_APPCONFIG* m_pConfig;
	
	BOOL onKey(OCEANUS_INPUT_KEYCODE keyCode,EN_KEY_TYPE keyType);

	void onStop();
	void onResume();
	void onBackEnd();
	void onForeground();
	void onCreate();
	void onDestory();
};

#ifdef __cplusplus
extern "C" {
#endif /* __cplusplus */
OApplication* createApp(ST_APPCONFIG* app_cfg)
{
	OCEANUS_LOGI("createApp{%s}",app_cfg->AppName.c_str());
	Oceanus_Epg* this_app = new (std::nothrow) Oceanus_Epg(app_cfg);
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

#endif // __OCEANUS_EPG__