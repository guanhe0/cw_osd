/**************************************************************************
* Copyright:sky
* Author: heji@skyworth.com
* Date:2016-2-22
* Description: app : Oceanus Home
**************************************************************************/
#include "Media.h"


Media::Media(ST_APPCONFIG* app_cfg):OApplication(app_cfg)
{
	m_pConfig = app_cfg;
	OCEANUS_LOGI("Home create ");
}
Media::~Media()
{
	OCEANUS_LOGI(" ");
}
void Media::onCreate()
{
	OCEANUS_LOGI(" ");
}

BOOL Media::onKey(OCEANUS_INPUT_KEYCODE keyCode,EN_KEY_TYPE keyType)
{
	OCEANUS_LOGI(" ");
	return FALSE;
}
void Media::onDestory()
{
	OCEANUS_LOGI(" ");
}


