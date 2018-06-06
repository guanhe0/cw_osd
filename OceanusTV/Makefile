############################################################# 
# Makefile for shared library.
# Copyright:sky
# Author: heji@skyworth.com
# Date:2015-12-05
# Description: makefile for app
#############################################################
include $(OCEANUS_ROOT)/Build/Application.mk
#set environment option
##($(TARGET_ARCH),arm)
ifeq ($(TARGET),Mstar)
COMPILER = arm-none-linux-gnueabi-
else
ifeq ($(TARGET),Realtek)
COMPILER = arm-none-linux-gnu-
else
COMPILER = arm-none-linux-gnu-
endif
endif

CC = $(COMPILER)g++

#set your src inc and lib
SRC_DIR = ./src
SRC = $(notdir $(wildcard $(SRC_DIR)/*.cpp))
OBJ_DIR = ./obj
OBJ = $(addprefix $(OBJ_DIR)/,$(patsubst %cpp, %o, $(SRC)))

OBJ_DEP = $(addprefix $(OBJ_DIR)/,$(patsubst %cpp, %d, $(SRC)))
INC += $(SRC_DIR)

STATIC_LIB +=
SHARED_LIB +=


LD_FLAG := $(addprefix -L,$(SHARED_LIB)) $(addprefix -L,$(STATIC_LIB)) \
		  -lOSrv -lOsystemService -losystem -lOWidgets

_TARGE = OceanusTV.so
_TARGE_DIR = ./lib

.PHONY:all clean

#all target
all: $(_TARGE) _TARGET_OSD_DIR

$(OBJ_DIR)/%.d: ./src/%.cpp
	@mkdir -p $(dir $@)
	@set -e; rm -f $@; \
	$(CC) -MM $(CC_FLAG) $< > $@.$$$$; \
	sed 's,\($*\)\.o[ :]*,\$(OBJ_DIR)/$*.o $@ : ,g' < $@.$$$$ > $@; \
	rm -f $@.$$$$

$(OBJ_DIR)/%.o: ./src/%.cpp
	@mkdir -p $(dir $@)
	$(CC) $(CC_FLAG) -c  $< -o $@
-include $(OBJ_DEP)

$(_TARGE):$(OBJ)
	$(CC) $(CC_FLAG) $^ -o $(_TARGE_DIR)/$@ -shared $(LD_FLAG)

_TARGET_OSD_DIR:$(_TARGE)
	@mkdir -p $(_TARGET_OSD_DIR)/$(basename $(_TARGE))
	@cp -r ./* $(_TARGET_OSD_DIR)/$(basename $(_TARGE))
	@rm -fr $(_TARGET_OSD_DIR)/$(basename $(_TARGE))/obj \
			$(_TARGET_OSD_DIR)/$(basename $(_TARGE))/Makefile \
			$(_TARGET_OSD_DIR)/$(basename $(_TARGE))/src
	
clean:
	@rm -fr $(OBJ_DIR) $(foreach target,$(_TARGE),$(_TARGE_DIR)/$(target))

