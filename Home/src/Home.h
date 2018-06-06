/**************************************************************************
* Copyright:sky
* Author: heji@skyworth.com
* Date:2016-2-22
* Description: app : Oceanus Home
**************************************************************************/
#ifndef __OCEANUS_HOME_H__
#define __OCEANUS_HOME_H__
#include "OWindow.h"
#include "OApplication.h"
#include "json/json.h"
#include "json/reader.h"

class Home : public OApplication
{
public:
		Home(ST_APPCONFIG* app_cfg);
		virtual ~Home();
private:
		BOOL onKey(OCEANUS_INPUT_KEYCODE keyCode,EN_KEY_TYPE keyType);
		void onCreate();
		void onDestory();
private:
	ST_APPCONFIG* m_pConfig;
};

#ifdef __cplusplus
extern "C" {
#endif /* __cplusplus */
OApplication* createApp(ST_APPCONFIG* app_cfg)
{
	OCEANUS_LOGI("createApp{%s}",app_cfg->AppName.c_str());
	Home* this_app = new (std::nothrow) Home(app_cfg);
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

