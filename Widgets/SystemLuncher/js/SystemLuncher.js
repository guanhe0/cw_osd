$(document).ready(function(){
	$("#js_loading").hide();
	$("#js_bg").show();
	var window_id = getUrlValue('window')?parseInt(getUrlValue('window')):0;
	function SystemLuncherLinstener(event)
		{
			var $loading = $("#js_loading");
			var $bg = $("#js_bg");
			var info = JSON.parse(event);
			if(info.cmd === "showloading")
			{
				$bg.show();
				$loading.show();
			}
			else if (info.cmd === "hideloading")
			{
				$bg.hide();
				$loading.hide();
			}
			else if (info.cmd === "showbgonly")
			{
				$bg.show();
				$loading.hide();
			}
		}
	
	Oceanus.addPlatformEventListener(SystemLuncherLinstener,window_id);








	
});