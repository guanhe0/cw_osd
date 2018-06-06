/**************************************************************************
* Copyright:sky
* Author: gengkaiyang
* Date:2016-2-18
* Description: Oceanus input method
**************************************************************************/
#ifndef __OCEANUS_CHANNEL_SCAN__
#define __OCEANUS_CHANNEL_SCAN__

#include "OWindow.h"
#include "Oceanus_Event.h"
#include "OApplication.h"
#include "OWidget_AutoScan.h"
#include "OWidget_ManualScan.h"


class Oceanus_ChannelScan : public OApplication, public Oceanus_EventListener
{
public:
	Oceanus_ChannelScan(ST_APPCONFIG* app_cfg);
	virtual ~Oceanus_ChannelScan();
	
	void OnEvent(Oceanus_EventInfo * info);

private:
	ST_APPCONFIG* m_pConfig;

	OWidget_AutoScan* m_wAutoScan;
	OWidget_ManualScan* m_wManualScan;

	BOOL onKey(OCEANUS_INPUT_KEYCODE keyCode,EN_KEY_TYPE keyType);
	void onCreate();
	void onDestory();
};

#ifdef __cplusplus
extern "C" {
#endif /* __cplusplus */
OApplication* createApp(ST_APPCONFIG* app_cfg)
{
	OCEANUS_LOGI("createApp{%s}",app_cfg->AppName.c_str());
	Oceanus_ChannelScan* this_app = new (std::nothrow) Oceanus_ChannelScan(app_cfg);
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

#endif // __OCEANUS_CHANNEL_SCAN__