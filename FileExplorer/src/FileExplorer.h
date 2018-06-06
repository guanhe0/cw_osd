/**************************************************************************
* Copyright:sky
* Author: heji@skyworth.com
* Date:2016-2-22
* Description: app : Oceanus TV
**************************************************************************/
#ifndef __OCEANUS_FILE_EXPLORER_H__
#define __OCEANUS_FILE_EXPLORER_H__
#include "OWindow.h"
#include "OApplication.h"
#include "json/json.h"
#include "json/reader.h"
#include "Oceanus_Event.h"

class FileExplorer : public OApplication,public Oceanus_EventListener
{
public:
		FileExplorer(ST_APPCONFIG* app_cfg);
		~FileExplorer();
		virtual void OnEvent(Oceanus_EventInfo * info);
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
	FileExplorer* this_app = new (std::nothrow) FileExplorer(app_cfg);
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

#endif//__OCEANUS_FILE_EXPLORER_H__

