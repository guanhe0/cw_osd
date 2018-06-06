var time_id;
function closeWindow(time){
	time_id = setTimeout(function(){
		Oceanus.hideWidget($('title').text(),true);
	},time*1000)
}

$(document).ready(function() {
	function setVolumeStyle(volume){
		var $volume=$("#js_volume");
		if(volume>=0  && volume < 5){
			$("#js_volume").removeClass("progress_25");
			$("#js_volume").addClass("progress_5");
		}else if(volume>=5  && volume < 25){
			$("#js_volume").removeClass("progress_50");
			$("#js_volume").removeClass("progress_5");
			$("#js_volume").addClass("progress_25");
		}else if(volume>=25  && volume < 50){
			$("#js_volume").removeClass("progress_75");
			$("#js_volume").removeClass("progress_25");
			$("#js_volume").addClass("progress_50");
		}else if(volume>=50  && volume < 75){
			$("#js_volume").removeClass("progress_100");
			$("#js_volume").removeClass("progress_50");
			$("#js_volume").addClass("progress_75");
		}else if(volume>=75  && volume <= 100){
			$("#js_volume").removeClass("progress_75");
			$("#js_volume").addClass("progress_100");
		}
		$("#js_volume").children("div").css({width:volume+"%"});
	}
	function VolumeControlLinstener(event)
	{
		var info = JSON.parse(event);
		if(info.cmd === "setAudioVolume")
		{
			clearTimeout(time_id);
			closeWindow(5);
			setVolumeStyle(info.value);
		}
	}	
	opera_omi.addPlatformEventListener(VolumeControlLinstener);


});
