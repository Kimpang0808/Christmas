window.addEventListener("wheel", function(e){
	e.preventDefault();
},{passive : false});
var $html = $("index.html");
var page = 1;
var lastPage = $(".Slideindex").length;

$html.animate({scrollTop:0},10);
$(window).on("wheel", function(e){
 
	if($html.is(":animated")) return;
 
	if(e.originalEvent.deltaY > 0){
		if(page== lastPage) return;
 
		page++;
	}else if(e.originalEvent.deltaY < 0){
		if(page == 1) return;
 
		page--;
	}
	var posTop = (page-1) * $(window).height();
 
	$html.animate({scrollTop : posTop});
 
});
//https://velog.io/@sklove96/%ED%95%9C-%ED%8E%98%EC%9D%B4%EC%A7%80%EC%94%A9-%EC%98%AC%EB%9D%BC%EA%B0%80%EB%8A%94-%EC%8A%A4%ED%81%AC%EB%A1%A4
