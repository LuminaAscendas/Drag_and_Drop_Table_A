//
//var cont = document.getElementById('mainContainer');
//var isWebkit = 'webkitRequestAnimationFrame' in window;
//var scale = 1;
//var slider_width=$('.slider').width()
//function resizeApp(){
//
//	
//		var winWidth = $("#mainContainer").width();
//		var winHeight = $("#mainContainer").height();
//		var appWidth = cont.offsetWidth;
//		var appHeight = cont.offsetHeight;	
//		winWidth = window.innerWidth; //retrieve current window width
//		winHeight = window.innerHeight;
////		  if(winWidth-60 < appWidth || winHeight-60 < appHeight)
////        {
//	   scale = (((winWidth/appWidth)<(winHeight/appHeight))?(winWidth/appWidth):(winHeight/appHeight))-0.0//-0.15; //scaling
////        }
////            else {
//                
////                scale=1;
////            }
//			
//			cont.style.msTransformOrigin = '0 0';	
//			cont.style.msTransform = "scale("+scale+","+scale+")";
//			cont.style.TransformOrigin = '0 0';	
//			cont.style.Transform = "scale("+scale+")";
//			cont.style.webkitTransformOrigin = '0 0';
//			cont.style.webkitTransform = "scale("+scale+")";
//			cont.style.MozTransformOrigin = '0 0';	
//			cont.style.MozTransform = "scale("+scale+")";
////			$('body').css('height',(bodyheight)+'px');
////			$('body').css('background-size','100% '+(bodyheight)+'px');
////			$('#whole_container').css('height',($("#begin_page").height()*scale)+$("#text_container").height());
//			$('.dropp').css('height',$(".dropp").height()*scale);
////			$('.dropp').css('top',$(".dropp").top()*scale);
////			$('.slider').width($('.slider').width()/scale);
//			cont.style.left = ((winWidth - appWidth )/2)+'px';
//		console.log(cont.style.left);
//	
//}
//
//
//	
//
//resizeApp();
//


var cont = document.getElementById('mainContainer');
var isWebkit = 'webkitRequestAnimationFrame' in window;
var scale = 1;

function resizeApp(){
//	var winHeight = window.innerHeight;
//	var winWidth = window.innerWidth;
    var winWidth = $("#mainContainer").width();
	var winHeight = $("#mainContainer").height();
	var appWidth = cont.offsetWidth;
    var appHeight = cont.offsetHeight;
	winWidth = window.innerWidth; //retrieve current window width
	winHeight = window.innerHeight; //retrieve current window height
	//scale = (((winWidth/appWidth)<(winHeight/appHeight))?(winWidth/appWidth):(winHeight/appHeight))-0.524920;
	//console.log(scale)
    if(winWidth-60 < appWidth || winHeight-60 < appHeight)
        {
	   scale = (((winWidth/appWidth)<(winHeight/appHeight))?(winWidth/appWidth):(winHeight/appHeight))-0.01//-0.15; //scaling
	   // alert(scale)
        }
            else {
                
                scale=1;
            }
    
	if(scale<0.4603448275862069){
		scale=0.4603448275862069;
	}
    //alert(scale);
		cont.style.msTransformOrigin = '0 0';	
		cont.style.msTransform = "scale("+scale+","+scale+")";
		cont.style.TransformOrigin = '0 0';	
		cont.style.Transform = "scale("+scale+")";
		cont.style.webkitTransformOrigin = '0 0';
		cont.style.webkitTransform = "scale("+scale+")";
		cont.style.MozTransformOrigin = '0 0';	
		cont.style.MozTransform = "scale("+scale+")";
		var appWidth = cont.offsetWidth * scale;
		var bodyheight = cont.offsetHeight*scale;
		var bodywidth = cont.offsetWidth*scale;
		var winWidth = window.innerWidth;
		$('body').css('height',(bodyheight-20)+'px');
        cont.style.left = ((winWidth - appWidth )/2)+'px';
}
resizeApp();
