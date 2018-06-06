$(document).ready(function(){
	var g_row_new = 0,g_col_new = 0,g_row = 0,g_col = 0;
	var total_row = 4;
	
	var col_array = new Array(total_row);
	/*
	var img = new Image();
	img.src = "./img/selected.jpg";
	$(img).addClass("selected");
	*/
	var sp = document.createElement("span");
	var ok_class = "glyphicon glyphicon-ok";
	$(sp).addClass(ok_class);
	
	$(".shift_size").children("td").eq(0).addClass("shift_td_selected");
	//$(".shift_size").children("td").eq(1).append(img);
	$(".shift_size").children("td").eq(1).append(sp);
	
	var num = 8;
	for(var i = 0; i < num; i++){
		$("#size_progress_"+i).progressbar({
			value:37
		})		
	}
	
	for(var j = 0; j < total_row; j++){
		col_array[j] = new Array();
		switch(j){
			case 0:
				col_array[j] = [0,1,2,3,4];
			break;
			case 1:
			case 2:
				col_array[j] = [0,1,2,3];
			break;
			case 3:
				col_array[j] = [0];
			break;
			default:
			break;
		}
	}
	function proKeyDown(row,col){
		if(row == 0){
			proTimeShiftSize(col);
		}else if(row == 1){
			proTimeShiftUsb1(col);
		}else if(row == 2){
			proTimeShiftUsb2(col);
		}else if(row == 3){
			proTimeShiftFormat(col);				
		}
		setRowBk(row);
		setColBk(col);	
	}
	function proTimeShiftSize(col){
		var usb_col = 0,td_str;
		if(col != g_col_new){col = g_col_new;}
		if(g_row_new != getRowBk()){
			if(getRowBk() == 1){//1->0
				usb_col = col + 1;
				td_str = "#shift_table2 tr:eq(0) td:eq(" + usb_col + ")";
				$(td_str).removeClass("shift_td_selected");
				
				$(".shift_size").children("td").eq(2*col).addClass("shift_td_selected");
			//	$(".shift_size").children("td").eq(2*col + 1).append(sp);
			}
		}else{
			if(col != getColBk()){
				
				$(".shift_size").children("td").eq(2*getColBk() + 1).remove("span");
				$(".shift_size").children("td").eq(2*getColBk()).removeClass("shift_td_selected");
				
			//	$(".shift_size").children("td").eq(2*col + 1).append(sp);
				$(".shift_size").children("td").eq(2*col).addClass("shift_td_selected");
			}			
		}
	}
	function proTimeShiftUsb2(col){
		var usb_col = 0,td_str;
		if(col != g_col_new)
		{col = g_col_new;}
		if(g_row_new != getRowBk()){
			if(getRowBk() == 1){//1->2
				usb_col = col + 1;
				td_str = "#shift_table2 tr:eq(0) td:eq(" + usb_col + ")";
				$(td_str).removeClass("shift_td_selected");
				td_str = "#shift_table2 tr:eq(1) td:eq(" + usb_col + ")";
				$(td_str).addClass("shift_td_selected");								
			}else if(getRowBk() == 3){//3->2
				usb_col = col + 1;
				td_str = "#shift_table2 tr:eq(1) td:eq(" + usb_col + ")";
				$(td_str).addClass("shift_td_selected");
				usb_col = 0;
				td_str = ".disk_format_tb tr:eq(1) td:eq(" + usb_col + ")";
				$(td_str).removeClass("shift_td_selected");
			}
		}else{
			if(col != getColBk()){
				usb_col = col + 1;
				td_str = "#shift_table2 tr:eq(1) td:eq(" + usb_col + ")";
				$(td_str).addClass("shift_td_selected");
				usb_col = getColBk()+1;
				td_str = "#shift_table2 tr:eq(1) td:eq(" + usb_col + ")";
				$(td_str).removeClass("shift_td_selected");				
			}			
		}
	}
	function proTimeShiftUsb1(col){
		var usb_col = 0,td_str;
		if(col != g_col_new){col = g_col_new;}
		if(g_row_new != getRowBk()){
			if(getRowBk() == 0){//0->1
				$("span").remove();				
				$(".shift_size").children("td").eq(2*getColBk()).removeClass("shift_td_selected");
				
				usb_col = (g_col_new + 1) > (col_array[g_row_new].length) ? 1:(g_col_new + 1);
				console.log("col = " + col + "g_row_new = " + g_row_new + "length = " + col_array[g_row_new+1].length);
				td_str = "#shift_table2 tr:eq(0) td:eq(" + usb_col + ")";
				$(td_str).addClass("shift_td_selected");
				g_col_new = usb_col-1;
			}else if(getRowBk() == 2){//2->1
				usb_col = col + 1;
				td_str = "#shift_table2 tr:eq(0) td:eq(" + usb_col + ")";
				$(td_str).addClass("shift_td_selected");
				td_str = "#shift_table2 tr:eq(1) td:eq(" + usb_col + ")";
				$(td_str).removeClass("shift_td_selected");				
			}
		}else{
			if(col != getColBk()){
				usb_col = col + 1;
				td_str = "#shift_table2 tr:eq(0) td:eq(" + usb_col + ")";
				$(td_str).addClass("shift_td_selected");
				usb_col = getColBk() + 1;
				td_str = "#shift_table2 tr:eq(0) td:eq(" + usb_col + ")";
				$(td_str).removeClass("shift_td_selected");
			}			
		}		
	}
	function proTimeShiftFormat(col){
		var usb_col = 0,td_str;
			if(col != g_col_new){col = g_col_new;}
			if(g_row_new != getRowBk()){//2->3
			usb_col = 0;
			td_str = ".disk_format_tb tr:eq(1) td:eq(" + usb_col + ")";		
			$("#shift_format").focus();
			g_col_new = usb_col;
			usb_col = getColBk()+1;
			td_str = ".shift_table2 tr:eq(1) td:eq(" + usb_col + ")";
			$(td_str).removeClass("shift_td_selected");
		}else{
			//do nothing
		}
	}
	function setRowBk(row){
		g_row_pre = row;
	}
	function getRowBk(){
		return g_row_pre;
	}
	function setColBk(col){
		g_col_pre = col;
	}
	function getColBk(){
		return g_col_pre;
	}
	function proKeyEnter(){
		var row = g_row_new,col = g_col_new;
		if(row == 0){
			var cl = $(".shift_size").children("td").eq(2*col+1).children("span").attr("class");
			
			if(typeof cl != "undefined"){
				$(".shift_size").children("td").eq(2*col + 1).children("span").remove();
			}else{
				$(".shift_size").children("td").eq(2*col + 1).append(sp);		
			}
		}else if(row == 1||row == 2){
			
		}else if(row == 3){//format
			window.location.href = "http://localhost/Osd/Pvr/PvrFormat.html";
		}
	}
	var cur_row_count = 0;
	$(document).keydown(function(event){
		var keyCode = event.keyCode;
		setRowBk(g_row_new);
		setColBk(g_col_new);
		
		switch(keyCode){
			case numKey.up:
				g_row_new = (g_row_new + total_row - 1)%total_row;	
			break;
			case numKey.down:
				g_row_new = (g_row_new + total_row + 1)%total_row;	
			break;
			case numKey.left:
				cur_row_count = col_array[g_row_new].length;
			
				g_col_new = (g_col_new + cur_row_count - 1)%cur_row_count;
			break;
			case numKey.right:
				cur_row_count = col_array[g_row_new].length;
				
				g_col_new = (g_col_new + cur_row_count + 1)%cur_row_count;
			break;
			case numKey.enter:
				proKeyEnter();
			break;
			default:
			break;
		}
		proKeyDown(g_row_new,g_col_new);
	})
	
})