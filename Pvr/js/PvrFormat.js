$(document).ready(function(){
	var num = 8;
	for(var i = 0; i < num; i++){
		$("#size_progress_"+i).progressbar({
			value:37
		})		
	}
	var g_col = 0,g_row = 0,g_col_pre = 0,g_row_pre = 0;
	var col_max = 4,row_max = 3;
	var ok_cancle_a = ["format_ok","format_cancle"];
	var ok_cancle = -1;
	function setOkCancle(col)
	{
		ok_cancle = col;
	}
	function getOkCancle()
	{
		return ok_cancle;
	}
	function setNewCol(col)
	{
		g_col= col;
	}
	function getNewCol()
	{
		return g_col;
	}
	function setNewRow(row)
	{
		g_row = row;
	}
	function getNewRow()
	{
		return g_row;
	}
	function setColPre(col)
	{
		g_col_pre = col;
	}
	function getColPre()
	{
		return g_col_pre;
	}
	function setRowPre(row)
	{
		g_row_pre = row;
	}
	function getRowPre()
	{
		return g_row_pre;
	}
	function proUsb1(col)
	{
		var row_new = getNewRow();
		var row_pre = getRowPre();
		var usb_col,td_str;
		if( row_new != row_pre)
		{
			usb_col = col + 1;
			if(row_pre == 1)//1->0
			{
				
				td_str = ".format_table tr:eq(1) td:eq(" + usb_col + ")";//del row = 1
				$(td_str).removeClass("shift_td_selected");

			}
			else if(row_pre == 2)//2->0
			{
				$("#format_ok").removeClass("format_bt_focus");//del 2
				$("#format_cancle").removeClass("format_bt_focus");//del 2
			}
			td_str = ".format_table tr:eq(0) td:eq(" + usb_col + ")";
			$(td_str).addClass("shift_td_selected");			
		}
		else
		{
			if(col != getColPre())
			{
				usb_col = col + 1;
				td_str = ".format_table tr:eq(0) td:eq(" + usb_col + ")";
				$(td_str).addClass("shift_td_selected");
				usb_col = getColPre() + 1;
				td_str = ".format_table tr:eq(0) td:eq(" + usb_col + ")";
				$(td_str).removeClass("shift_td_selected");
			}			
		}
	}
	function proUsb2(col)
	{
		var row_new = getNewRow(),row_pre = getRowPre();
		var usb_col,td_str;
		if(row_new != row_pre)
		{
			usb_col = col + 1;
			if(row_pre == 0)//0->1
			{
				
				td_str = ".format_table tr:eq(0) td:eq(" + usb_col + ")";
				$(td_str).removeClass("shift_td_selected");				
			}
			else if(row_pre == 2)//2->1
			{
				$("#format_ok").removeClass("format_bt_focus");//del 2
				$("#format_cancle").removeClass("format_bt_focus");//del 2				
			}
			td_str = ".format_table tr:eq(1) td:eq(" + usb_col + ")";
			$(td_str).addClass("shift_td_selected");			
		}
		else 
		{
			if(col != getColPre())
			{
				usb_col = col + 1;
				td_str = ".format_table tr:eq(1) td:eq(" + usb_col + ")";
				$(td_str).addClass("shift_td_selected");
				usb_col = getColPre() + 1;
				td_str = ".format_table tr:eq(1) td:eq(" + usb_col + ")";
				$(td_str).removeClass("shift_td_selected");				
			}
		}
	}
	function proSel(col)
	{
		var row_new = getNewRow(),row_pre = getRowPre();
		var usb_col,td_str,sel_str;
		if(row_new != row_pre)
		{
			if(row_pre == 0)//0->2
			{
				usb_col = getNewCol() + 1;//del 0
				td_str = ".format_table tr:eq(0) td:eq(" + usb_col + ")";
				$(td_str).removeClass("shift_td_selected");	
			}
			else if(row_pre == 1)//1->2
			{
				usb_col = getNewCol() + 1;//del 1
				td_str = ".format_table tr:eq(1) td:eq(" + usb_col + ")";
				$(td_str).removeClass("shift_td_selected");				
			}
			$("#format_ok").addClass("format_bt_focus");//del 2
		}
		else 
		{
			console.log("col = " + col + " pre col = " + getColPre());
			if(col != getColPre())
			{
				sel_str = "#" + ok_cancle_a[col];
			//	alert("col = " + col + "str = " + sel_str);
				$(sel_str).addClass("format_bt_focus");
				
				sel_str = "#" + ok_cancle_a[getColPre()];
			//	alert("col = " + getColPre() + "str = " + sel_str);
				$(sel_str).removeClass("format_bt_focus");
			}
		}
	}
	function proKeyDown(row,col)
	{
		if(row == 0)
		{
			proUsb1(col);
		}
		else if(row == 1)
		{
			proUsb2(col);
		}
		else if(row == 2)
		{
			proSel(col);
		}
		setColPre(col);
		setRowPre(row);
	}
	
	$(document).keydown(function(event){
		var keyCode = event.keyCode;
		var col = 0,row = 0;
		 
		
		switch(keyCode)
		{
			case numKey.up:
				row = getNewRow();
				row = (row +row_max - 1)%row_max;
				
				setRowPre(getNewRow());
				setNewRow(row);
				if(getNewRow() == 2&&getOkCancle() == -1)
				{
					setOkCancle(0);
				}
				break;
			case numKey.down:
				row = getNewRow();
				row = (row + 1)%row_max;
				
				setRowPre(getNewRow());
				setNewRow(row);
				if(getNewRow() == 2&&getOkCancle() == -1)
				{
					setOkCancle(0);
				}				
			break;
			case numKey.left:
			
				col = getNewCol();
				if(getNewRow() < 2)
				{
					col = (col + col_max - 1)%col_max;
				}
				else
				{
					if(getOkCancle() != -1)
					{
						col = 1 - getColPre();
					}
					else 
					{
						col = 0;
					}	
					
				}
				setColPre(getNewCol());
				setNewCol(col);
			break;
			case numKey.right:
				col = getNewCol();
				if(getNewRow() < 2)
				{
					col = (col + 1)%col_max;
				}
				else
				{
					if(getOkCancle() != -1)
					{
						col = 1 - getColPre();
					}
					else 
					{
						col = 0;
					}					
				}
				setColPre(getNewCol());
				setNewCol(col);
			break;
			case numKey.enter:
				proKeyEnter();
			break;
			default:
			break;
		}
		console.log("row = " + getNewRow() + " col = " + getNewCol());
		proKeyDown(getNewRow(),getNewCol());
	})
	td_str = ".format_table tr:eq(0) td:eq(1)";
	$(td_str).addClass("shift_td_selected");
})