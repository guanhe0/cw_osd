$(document).ready(function(){
	
	var program_name = ["Program Name","Program Name","Program Name","Program Name","Program Name","Program Name","Program Name","Program Name","Program Name","Program Name"];
	var program_len = program_name.length;
	var cur_focus = 2;
	var total = 8;
	var program_start = cur_focus;
	var program_end = program_start + total - 1;
	var pre_focus = cur_focus;
	var edit_index = 0;
	var g_cur_focus = 0;
	function update_tv_list(program_start,program_end,cur_focus){
		var i,start = program_start - 1;
		
		for(i = start; i < program_end; i++){
			var index = i + 1;
			var offset = i - start;
			var name_str = program_name[i];
			var index_str = (index <= 9 ? "0" : "") + index;
			$(".program_name").eq(offset).html(name_str);
			$(".program_index").eq(offset).html(index_str);
		}
		if(cur_focus != pre_focus){//minus
			if(pre_focus - program_start > -1){
				$(".list").eq(pre_focus  - program_start).css("background","");
				$(".list").eq(pre_focus  - program_start).children("img").remove();
			}
			if(cur_focus == 0){
				var src = $("#edit_img").attr("src");
				
				if(src == "./img/edit.png"){
					$("#edit_img").attr("src","./img/edit_highlight.jpg");
				}
				
			}else{
				if($("#edit_img").attr("src") == "./img/edit_highlight.jpg"){
					$("#edit_img").attr("src","./img/edit.png");
				}
			}
			
			
		}
		if(cur_focus  - program_start > -1){//add 
			$(".list").eq(cur_focus  - program_start).css("background","rgba(0,0,255,0.2)");
			var img = document.createElement("img");
			img.src = "./img/left_turn.jpg";
			$(img).addClass("left_turn");
			$(".list").eq(cur_focus  - program_start).append(img);	
		}
		
	}
	
	update_tv_list(program_start,program_end,cur_focus);
	
	function process_key_up(){
		if(cur_focus == -2){
			return;
		}
			pre_focus = cur_focus;
			if(cur_focus > program_start){
				cur_focus--;
			}else{
				if(program_start > 1){
					program_start--;
					program_end--;
					cur_focus--;
				}else{
					cur_focus = 0;
					program_start = 1;
					program_end = total;
				}
			}
		update_tv_list(program_start,program_end,cur_focus);
	}
	
	function process_key_down(){
			if(cur_focus == -2){
				return;
			}
			pre_focus = cur_focus;			
			if(cur_focus < program_end){
				cur_focus++;
			}else{
				if(program_end < program_len){
					program_end++;
					program_start++;
					cur_focus++;
				}else{					
					program_end = program_len;
					program_start = program_end - total + 1;
					cur_focus = program_end;
				}
			}
		update_tv_list(program_start,program_end,cur_focus);
	}
	
	function process_key_enter(){
			if(cur_focus == 0){
				if(edit_index == 0){
					$(".edit_img").css("position","absolute").css("margin-left",0);
					$(".tv_ascend").css("position","absolute").css("margin-left","66%").css("background","blue");
					$(".tv_delete_all").css("position","absolute").css("margin-left","33%").css("background","red");
					process_edit_sel(0);
					cur_focus = -1;
				} 																		
			}else if(cur_focus == -1){
				if(edit_index == 0){//edit
					cur_focus = 0;
					edit_index = 0;
					$(".edit_img").css("position","").css("float","right");
					$(".tv_ascend").css("position","absolute").css("margin-left","33%").css("background","transparent");
					$(".tv_delete_all").css("position","absolute").css("margin-left",0).css("background","transparent");
					
				}else if(edit_index == 1){//delete all
					
				}else if(edit_index == 2){//ascend
					
				}
			}		
	}
	
	function process_key_left(){
		if(cur_focus == -1){
			edit_index = (edit_index + 3 - 1)%3;
			process_edit_sel(edit_index);
		}else if(cur_focus == 0){
			
		}else if(cur_focus >  0){
			pre_delete_program();
		}else if(cur_focus == -2){
			cur_focus = get_cur_focus();
			recover_tv_list_item(cur_focus);
		}
	}
	
	function recover_tv_list_item(cur_focus){
		$(".list").eq(cur_focus  - program_start).children("img").removeClass("img_ml_increse").addClass("left_turn");
		$(".list").eq(cur_focus  - program_start).children(".program_index").removeClass("wid_15p").addClass("program_index");
		$(".list").eq(cur_focus  - program_start).children(".program_name").removeClass("fl").addClass("program_name");
		$(".list").eq(cur_focus  - program_start).children("div").removeClass("del_tvlist text_valign").text("");
	}
	function process_key_right(){
		if(cur_focus == -1){
			edit_index = (edit_index + 3 + 1)%3;
			process_edit_sel(edit_index);
		}else if(cur_focus == 0){
			
		}else if(cur_focus > 0){
			
		}else if(cur_focus == -2){
			cur_focus = get_cur_focus();
			recover_tv_list_item(cur_focus);
		}
	}
	
	function process_edit_sel(cur_index){
		if(cur_index == 0){
			$(".edit_img").css("background","green");
			$(".tv_delete_all").css("background","red");
			$(".tv_ascend").css("background","blue");
		}else if(cur_index == 1){
			$(".edit_img").css("background","");
			$(".tv_delete_all").css("background","green");
			$(".tv_ascend").css("background","blue");			
		}else if(cur_index == 2){
			$(".edit_img").css("background","");
			$(".tv_delete_all").css("background","red");
			$(".tv_ascend").css("background","green");			
		}
	}
	
	function cur_focus_bk(number){
		g_cur_focus = number;
	}
	function get_cur_focus(){
		return g_cur_focus;
	}
	function pre_delete_program(){
		cur_focus_bk(cur_focus);
		
		$(".list").eq(cur_focus  - program_start).children("img").addClass("img_ml_increse");
		$(".list").eq(cur_focus  - program_start).children(".program_index").addClass("wid_15p");
		$(".list").eq(cur_focus  - program_start).children(".program_name").addClass("fl");		
		$(".list").eq(cur_focus  - program_start).children("div").addClass("del_tvlist text_valign").text("Delet");		
		cur_focus = -2;
	}
	
	$(document).keydown(function(event){
		event.preventDefault();
		var keycode = event.keyCode;
		
		switch(keycode){
			case numKey.up:
				process_key_up();
			break;
			case numKey.down:
				process_key_down();
			break;
			case numKey.enter:
				process_key_enter();
			break;
			case numKey.left:
				process_key_left();
			break;
			case numKey.right:
				process_key_right();
			break;
			default:
			break;
		}
		
	})
})