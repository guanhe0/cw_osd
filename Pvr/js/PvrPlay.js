$(document).ready(function(){
	var cellIndex = getUrlValue('id')?parseInt(getUrlValue('id')):0;
	var cellTotal = 5;
	function setChange(keyCode){
		var $obj = $(".items");
		var $curIcon = $obj.children(".la").eq(cellIndex);
		var imgs = new Array();
		imgs[0] = PvrImg["pause"];
		imgs[1] = PvrImg["stop"];
		imgs[2] = PvrImg["backword"];
		imgs[3] = PvrImg["foreword"];
		imgs[4] = PvrImg["tvlist"];
		
		var oldImageSrc = imgs[cellIndex];
		if(keyCode == numKey.left){
			if(cellIndex == 0){
				cellIndex = cellTotal - 1;
			}else{
				cellIndex--;
			}				
		}
		else if(keyCode == numKey.right){
			if(cellIndex == cellTotal - 1){
				cellIndex = 0;
			}
			else{
				cellIndex++;
			}
		}

		//old icon set old img
		var newImageSrc = PvrImg["highlight"];
		
		$curIcon.stop();
		$curIcon.animate({width:"100px"},300,function(){$(this).children('img').attr("src",oldImageSrc)});
		
		var $newIcon = $obj.children(".la").eq(cellIndex);
		$newIcon.stop();
		$newIcon.animate({width:"100px"},300,function(){$(this).children('img').attr("src",newImageSrc)});		
	}
	setChange();
	
	$(document).keydown(function(event){
		var keyCode = event.keyCode;
		if(keyCode == numKey.left || keyCode == numKey.right){
			setChange(keyCode);
		}else if(keyCode == numKey.enter){
			//Oceanus.runApp("ProgramCenter",true);
		}		
	})	
})
