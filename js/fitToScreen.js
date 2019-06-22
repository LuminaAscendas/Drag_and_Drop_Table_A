var cont = document.getElementById('main_container');
var isWebkit = 'webkitRequestAnimationFrame' in window;
var scale = 1;

function resizeApp(){
//	var winHeight = window.innerHeight;
//	var winWidth = window.innerWidth;
    var winWidth = $("#main_container").width();
	var winHeight = $("#main_container").height();
	var appWidth = cont.offsetWidth;
    var appHeight = cont.offsetHeight;
	winWidth = window.innerWidth; //retrieve current window width
	winHeight = window.innerHeight; //retrieve current window height
	//scale = (((winWidth/appWidth)<(winHeight/appHeight))?(winWidth/appWidth):(winHeight/appHeight))-0.524920;
	//console.log(scale)
    if(winWidth-60 < appWidth || winHeight-60 < appHeight)
        {
	   scale = (((winWidth/appWidth)<(winHeight/appHeight))?(winWidth/appWidth):(winHeight/appHeight))-0.02//-0.15; //scaling
        }
            else {
                
                scale=1;
            }
    
//	if(scale<0.4603448275862069){
//		scale=0.4603448275862069;
//	}
    //alert(scale);
//		cont.style.msTransformOrigin = '0 0';	
//		cont.style.msTransform = "scale("+scale+","+scale+")";
//		cont.style.TransformOrigin = '0 0';	
//		cont.style.Transform = "scale("+scale+")";
//		cont.style.webkitTransformOrigin = '0 0';
//		cont.style.webkitTransform = "scale("+scale+")";
//		cont.style.MozTransformOrigin = '0 0';	
//		cont.style.MozTransform = "scale("+scale+")";
	
	
	
//		document.getElementById('containment_container').style.msTransformOrigin = '0 0';	
//		document.getElementById('containment_container').style.msTransform = "scale("+scale+","+scale+")";
//		document.getElementById('containment_container').style.TransformOrigin = '0 0';	
//		document.getElementById('containment_container').style.Transform = "scale("+scale+")";
//		document.getElementById('containment_container').style.webkitTransformOrigin = '0 0';
//		document.getElementById('containment_container').style.webkitTransform = "scale("+scale+")";
//		document.getElementById('containment_container').style.MozTransformOrigin = '0 0';	
//		document.getElementById('containment_container').style.MozTransform = "scale("+scale+")";
	
	
		document.getElementById('whole_container').style.msTransformOrigin = '0 0';	
		document.getElementById('whole_container').style.msTransform = "scale("+scale+","+scale+")";
		document.getElementById('whole_container').style.TransformOrigin = '0 0';	
		document.getElementById('whole_container').style.Transform = "scale("+scale+")";
		document.getElementById('whole_container').style.webkitTransformOrigin = '0 0';
		document.getElementById('whole_container').style.webkitTransform = "scale("+scale+")";
		document.getElementById('whole_container').style.MozTransformOrigin = '0 0';	
		document.getElementById('whole_container').style.MozTransform = "scale("+scale+")";
		var appWidth = cont.offsetWidth * scale;
		var bodyheight = document.getElementById('page_2').height;//*scale;
		var bodywidth = cont.offsetWidth*scale;
		var winWidth = window.innerWidth;
//		$('body').css('height',(bodyheight-20)+'px');
//		$('#containment_container').css('top',$('.droppable').offset().top+'px');
//        cont.style.left = ((winWidth - appWidth )/2)+'px';
		document.getElementById('whole_container').style.left = ((winWidth - appWidth )/2)+'px';
		document.getElementById('direction_text').style.left = ((winWidth - appWidth )/2)+'px';
//		document.getElementById('containment_container').style.left = ((winWidth - appWidth )/2)+'px';
//        cont_1.style.left = ((winWidth - appWidth )/2)+'px';
//	#direction_text
			var containmentArea = $('#containment_container');
			optionsDrag={
				 containment: [containmentArea.offset().left, containmentArea.offset().top, 
                ( ( containmentArea.offset().left + ( containmentArea.width() * scale ) ) - ( $(".dragSpotWrapper").width() * scale ) ) ,
                ( ( containmentArea.offset().top + ( containmentArea.height() * scale ) ) - ( $(".dragSpotWrapper").height()  * scale ) ) ]
			}
			$(".dragSpot").draggable(optionsDrag);
				console.log($('.dropSpotAnsWrapper').size());
			for(i=0;i<=$('.dropSpotAnsWrapper').size();i++){
				//var new_height = $('#dropSpot_'+i).outerHeight()/scale
				$('#dropSpot_'+i).css('height',$('#dropSpot_'+i).attr('height_cont')*scale+'px');
			}
}

resizeApp();
