/**************************************************************************
* Copyright:sky
* Author: heji@skyworth.com
* Date:2016-2-22
* Description: app : Oceanus TV
**************************************************************************/
#ifndef __OCEANUS_TV_H__
#define __OCEANUS_TV_H__
#include "OWindow.h"
#include "OApplication.h"
#include "json/json.h"
#include "json/reader.h"
#include "Oceanus_Event.h"

class OWidget_Source;
class OceanusTv : public OApplication,public Oceanus_EventListener
{
public:
		OceanusTv(ST_APPCONFIG* app_cfg);
		~OceanusTv();
		virtual void OnEvent(Oceanus_EventInfo * info);
private:
		BOOL onKey(OCEANUS_INPUT_KEYCODE keyCode,EN_KEY_TYPE keyType);
		void onCreate();
		void onDestory();
private:
	ST_APPCONFIG* m_pConfig;
	//OWidget_Source* m_pWidgetSource;
};

#ifdef __cplusplus
extern "C" {
#endif /* __cplusplus */
OApplication* createApp(ST_APPCONFIG* app_cfg)
{
	OCEANUS_LOGI("createApp{%s}",app_cfg->AppName.c_str());
	OceanusTv* this_app = new (std::nothrow) OceanusTv(app_cfg);
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

#endif//__OCEANUS_TV_H__

