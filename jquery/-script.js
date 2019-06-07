
var numAry = [];
var qusAry = ["Mode Doors", "Blend Door", "Blower", "Recirculate/<br>Fresh Air Door", "Evaporator", "Heater Core"];


	$(document).ready(function(){

		gameStartFn();
	
	});

	
/*Shuffle Array*/
function shuffleInnerData(o){
	o.sort(function() { return 0.5 - Math.random() });
	return o;
}
	
/*Game start here */

function gameStartFn(){	
	var isDropped = false;
	
	$(".dragg").each(function(i, v){
		numAry.push(i);
	});	
	shuffleInnerData(numAry);
	
 	
	$(".dragEl").each(function(i, v){
		$(this).children().html(qusAry[numAry[i]]);
		$(this).attr({"data-ansKey": numAry[i]});
	});

	
	
	$(".dragEl").draggable({
	
		containment:"#gameArea",
		stack:".dragEl",
		start: function(e, ui){
			isDropped = false;
		},	
		stop: function(e, ui){
			if(!isDropped){
				var draggerId1 = $(this).attr("id").split("_")[1];
				var draggerHomeTop = $("#dragg_"+draggerId1).position().top;
				var draggerHomeLeft = $("#dragg_"+draggerId1).position().left;				
				$(this).animate({"top": draggerHomeTop, "left": draggerHomeLeft}).attr({"data-usrAns": "", "data-thisPar": "dragg"});
			}
		}
	});
	
	$(".dropp").droppable({
		drop:function(e, ui){
		isDropped = true;
		var storeOld = "";
		var thisEl = $(this);
		var thisElId0 = thisEl.attr("id").split("_")[0];
		var thisElId1 = thisEl.attr("id").split("_")[1];

		var dragEl = ui.draggable;
		var thisTop = thisEl.position().top;
		var thisLeft = thisEl.position().left;
		var dragElPar = dragEl.attr("data-thisPar");
		var dragElUsrAns = dragEl.attr("data-usrAns");

			$(".dragEl").each(function(i, v){
				if($(this).attr("data-usrAns") != ""){
					if($(this).attr("data-usrAns") == thisElId1){
						storeOld = $(this);
						return false;
					}
				}
			});
			if(storeOld != ""){
				var storeOldPar = storeOld.attr("data-thisPar");
				var storeOldUsrAns = storeOld.attr("data-usrAns");
				var storeOldId1 = storeOld.attr("id").split("_")[1];
			}
			
			if(storeOld == ""){
				dragEl.css({"top": thisTop, "left": thisLeft}).attr({"data-usrAns": thisElId1, "data-thisPar": thisElId0});
			} 
			else if((storeOld != "") && (storeOldPar == "dropp")){				
				eleTop1 = $("#dropp_"+storeOldUsrAns).position().top;
				eleLeft1 = $("#dropp_"+storeOldUsrAns).position().left;
				
				if(dragElPar == "dropp"){					
					eleTop2 = $("#dropp_"+dragElUsrAns).position().top;
					eleLeft2 = $("#dropp_"+dragElUsrAns).position().left;						
					
					dragEl.css({"top": eleTop1, "left": eleLeft1}).attr({"data-usrAns": storeOldUsrAns, "data-thisPar": "dropp"});
					storeOld.animate({"top": eleTop2, "left": eleLeft2}).attr({"data-usrAns": dragElUsrAns, "data-thisPar": "dropp"});
				}
				else if(dragElPar == "dragg"){
					eleTop2 = $("#dragg_"+storeOldId1).position().top;
					eleLeft2 = $("#dragg_"+storeOldId1).position().left;
					
					dragEl.css({"top": eleTop1, "left": eleLeft1}).attr({"data-usrAns": storeOldUsrAns, "data-thisPar": "dropp"});
					storeOld.animate({"top": eleTop2, "left": eleLeft2}).attr({"data-usrAns": dragElUsrAns, "data-thisPar": "dragg"});
				}
			}
			var enContinue = true;
			$(".dragEl").each(function(i, v){
				if($(this).attr("data-thisPar") == "dragg"){
					enContinue = false;
					return false;
				}
			});			
			
			if(enContinue) $("#submitBtn").off("click").on("click", chkAnsFn).removeClass("disCls").addClass("enCls");

			
		}
	});
	
	
}