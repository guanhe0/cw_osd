/**************************************************************************
* Copyright:sky
* Author: heji@skyworth.com
* Date:2016-2-22
* Description: app : Oceanus FileExplorer
**************************************************************************/
#include "FileExplorer.h"

FileExplorer::FileExplorer(ST_APPCONFIG* app_cfg):OApplication(app_cfg),Oceanus_EventListener(this)
{
	m_pConfig = app_cfg;
	OCEANUS_LOGI("FileExplorer create ");
}

FileExplorer::~FileExplorer()
{
	OCEANUS_LOGI(" ");
}

void FileExplorer::onCreate()
{
	OCEANUS_LOGI(" ");
}

BOOL FileExplorer::onKey(OCEANUS_INPUT_KEYCODE keyCode,EN_KEY_TYPE keyType)
{
	OCEANUS_LOGI("%d",keyCode);
	return FALSE;
}
void FileExplorer::onDestory()
{
	OCEANUS_LOGI(" ");
}

void FileExplorer::OnEvent(Oceanus_EventInfo * info)
{
	//OCEANUS_LOGI(" ");
}

