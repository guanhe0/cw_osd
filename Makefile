############################################################# 
# Makefile for shared library.
# Copyright:sky
# Author: heji@skyworth.com
# Date:2015-12-05
# Description: makefile for app
#############################################################
include ./AppList.mk
include $(OCEANUS_ROOT)/Build/Application.mk
.PHONY:all clean
$(warning $(APP_LIST))
$(warning $(_TARGET_OSD_DIR))
#all target
all:
	@mkdir -p $(_TARGET_OSD_DIR)/common
	@cp -r ./common/* $(_TARGET_OSD_DIR)/common
	@cp -r ./Widgets $(_TARGET_OSD_DIR)
	@cp -r ./application.xml $(_TARGET_OSD_DIR)
	@for n in $(APP_LIST); do $(MAKE) -C $$n ||exit "$$?"; done
clean:
	@rm -fr $(_TARGET_OSD_DIR)
	@for n in $(APP_LIST); do $(MAKE) -C $$n clean; done

