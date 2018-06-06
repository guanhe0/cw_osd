/**************************************************************************
* Copyright:sky
* Author: heji@skyworth.com
* Date:2016-2-22
* Description: app : Oceanus Home
**************************************************************************/
#include "Home.h"


Home::Home(ST_APPCONFIG* app_cfg):OApplication(app_cfg)
{
	m_pConfig = app_cfg;
	OCEANUS_LOGI("Home create ");
}
Home::~Home()
{
	OCEANUS_LOGI(" ");
}
void Home::onCreate()
{
	OCEANUS_LOGI(" ");
}

BOOL Home::onKey(OCEANUS_INPUT_KEYCODE keyCode,EN_KEY_TYPE keyType)
{
	OCEANUS_LOGI(" ");
	return FALSE;
}
void Home::onDestory()
{
	OCEANUS_LOGI(" ");
}


