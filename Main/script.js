var total_section = 0;
var current_idx = 0;
var screen_h = 0;
var page_h = 0;

$(document).ready(function(){
	init();
	
	$('body').on('scroll touchmove mousewheel', function(event) {	
		
		event.preventDefault();
		event.stopPropagation();		
	
		isScroll = true;		
		var direction = event.originalEvent.wheelDelta;
		var y = 0;

		if(direction > 0){
			current_idx --;
			if(current_idx < 0){current_idx = -1;}
			y = current_idx * page_h;
		}
		else{
			current_idx ++;
			if(current_idx > total_section){
				current_idx = total_section;
				return;
			}
			
			y = current_idx * page_h;		
		}
		$('html,body').animate({scrollTop: y}, 500);	
	});
});

$( window ).resize(function() {
	setHeight();
});


function init(){
	
	setHeight();
	
	total_section = $('#onepage > section').length;
	last_y = page_h * total_section;
}	

function setHeight(){
	
	screen_h = document.body.clientHeight;
	page_h = screen_h;
	$("#onepage > section").height(page_h);
}