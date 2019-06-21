var audioPath = 'assets/audios/01_Case_and_Duct_System_Components/mod_24_act_1_';
var clrTimeout;
var indexNo = 0, audCount = 1;
var wrongAttempt = 1;
var corCnt = 0;
var scoreArray = [3];
var stepCount = 0;
var score = 0;
var scr = 3;
var stageProcess = 1;
var lastPlayed = 1;
var audioSeries = [1, 3];
var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1;
 var oTable1="";
 var oTable="";
var tempArray1 = new Array();
var activityData = {
    score: 0,
    attArr: []
};
var drop_count=0;
var page_no=1;
//var =mainContainer
var resetPress = false;
var numAry = [];
var correct_ans=['Cholera',
				 'Dysentery',
				 'Enteritis',
				 'Typhoid',
				 'Infectious hepatitis',
				 'Poliomyelitis',
				 'Cryptosporidiosis',
				 'Amoebic dysentery',
				 'Schistosomiasis',
				 'Ancylostomiasis'
				]
var qusAry = [{"name_text":"Cholera","number":"0"},
			  {"name_text":"Dysentery","number":"1"},
			  {"name_text":"Enteritis","number":"2"},
			  {"name_text":"Typhoid","number":"3"},
			  {"name_text":"Infectious hepatitis","number":"4"},
			  {"name_text":"Poliomyelitis","number":"5"},
			  {"name_text":"Cryptosporidiosis","number":"6"},
			  {"name_text":"Amoebic dysentery","number":"7"},
			  {"name_text":"Schistosomiasis","number":"8"},
			  {"name_text":"Ancylostomiasis","number":"9"},

//	"Dysentery",
//	"Enteritis",
//	"Typhoid",
//	"Infectious hepatitis",
//	"Poliomyelitis",
//	"Cryptosporidiosis",
//	"Amoebic dysentery",
//	"Schistosomiasis",
//	"Ancylostomiasis"
];
	//["Mode Doors", "Blend Door", "Blower", "Recirculate/<br>Fresh Air Door", "Evaporator", "Heater Core"];

var pageInitialized = false;

$(function() {
if (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) ||/Edge\/\d./i.test(navigator.userAgent)) {
		//alert()
		$('.Rowcol .rowPart1').attr('aria-label','blank');
		$('.dragEl').attr('role','text');
	}
shuffleInnerData(qusAry);	
shuffleInnerData(numAry);	
	$('.tableImage').attr('aria-label','image')
	
	document.body.onkeyup = function(e){
//		alert()
		if(e.keyCode == 32 || e.keyCode == 13){
			e.preventDefault(e);
//			if(e.target.id!='label_head_1'||e.target.id!='label_head_2'||e.target.id!='label_head_3'){
				$('#'+e.target.id).trigger('click');
//			}
			
		}
		
	}
	

//	$('.tableImage').attr('aria-label','image')
	set_tab()
//	for(k=0;k<=data[0].OriginalAns.length.length;K++){
//		$(".draggable").append('<div id="dragg_'+k+'" class="dragg dragg_'+k+'">k</div>')
//		$(".draggable").append('<div id="dragEl_'+k+'" class="dragg dragEl dragEl_'+k+'" data-thisPar="dragg" data-ansKey="" data-usrAns=""><div></div></div>')
//	}
	for(var i=0; i<data[0].OriginalAns.length; i++){
		$('.draggable').append('<div id="dropp_'+i+'" class="dropp dropp_'+i+'"></div>')
	}
	for(var i=0; i<data[0].OriginalAns.length; i++){
		$('.draggable').append('<div id="dragg_'+i+'" class="dragg dragg_'+i+'"></div>')
	}
	for(var i=0; i<data[0].OriginalAns.length; i++){
		$('.draggable').append('<div id="dragEl_'+i+'" class="dragg dragEl dragEl_'+i+'" data-thisPar="dragg" data-ansKey="" data-usrAns=""><div></div></div>')
	}
	
	 oTable+='<div class="Row RowHead">';
            for(var i=0; i<data[0].tableInfo[0].tableHeading.length; i++){
                oTable+='<div role="none" class="col rowPart'+Number(1+i)+' tabindex" aria-label="'+data[0].tableInfo[0].tableHeading[i]+'">'+data[0].tableInfo[0].tableHeading[i]+"</div>";
            }
            oTable+="</div>";
            
            for(var i=0 in data[0].tableInfo[0].tableData){
                tempArray1.push([   
                                    data[0].tableInfo[0].tableData[i].col1Text,
                                    data[0].tableInfo[0].tableData[i].col2Text,
                                    data[0].tableInfo[0].tableData[i].correctAnswer,
                                    data[0].tableInfo[0].tableData[i].height
                                ]);
            }

            if (resetPress) {
               /* tempArray1=shuffle(tempArray1);*/
            };

            for(var j=0;j< tempArray1.length;j++){
                oTable1+='<div class="clearfloat"></div>'+
                          '<div class="Row Rowcol" >'+
                            '<div aria-label="'+tempArray1[j][2]+'" role="none" class="rowPart1 innercol tabindex" style="height:' + tempArray1[j][3] + '" id="dropSpot'+j+'" value="'+tempArray1[j][2]+'">'+
                                    tempArray1[j][2]+
                            '</div>'+
                            '<div aria-label="'+tempArray1[j][0]+'" role="none" class="rowPart2 innercol tabindex" style="height:' + tempArray1[j][3] + '">'+
                                tempArray1[j][0]+
                            '</div>'+
                            '<div role="none" aria-label="'+tempArray1[j][1].replace(/<br\s*\/?>/gi,' ')+'"  class="rowPart3 innercol tabindex"  style="height:' + tempArray1[j][3] + '" >'+
                            tempArray1[j][1]+
                            '</div>'+
                            '<div class="feedback_tick" style="top:' + ((parseInt(tempArray1[j][3].replace("px", ""))/2)-13) + 'px" id="tick_'+j+'"></div>'+
                            '</div>';
                if((tempArray1.length-1) == j){
                    oTable1+='<div class="Row RowLastcol">'+
                                '<div class="lastpart1 lastcol"></div>'+
                                '<div class="lastpart2 lastcol"></div>'+
                                '<div class="lastpart3 lastcol"></div>'+
                             '</div>';
                }
            }
            oTable1=oTable+oTable1;
	
	 $("#tab_container").html(oTable1);
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
    /*$('#mainWrapper').css({background: '#000'});
    //reportData.currentStep = 1;
    if (pageInitialized) return;
    pageInitialized = true;
    $("#header > #head2").html("CASE AND DUCT SYSTEM");
    $("#graphicImg1").attr("src", "");
    $("#graphicContainer").hide();
    $("#graphicicon,#settingsicon").hide();
    $("#graphicicon").removeClass('graphicicon_active').addClass('graphic_inactive');
    $('#floatWindow').hide();
    $("#floatWindow").css({'left': '750px', 'top': '96px'});*/
    actStart();
	resizeApp();
    //$("#infoicon").css("pointer-events", "auto");
});

function actStart() {
resizeApp();
    /*if (!isFirstTime) {
        $('#startCover,#skipIntroCover').hide();
        setTimeout(function() {
            $("#header > #head2").html(data.frameTitle[2]).css({lineHeight: "20px", "top": "3px"});
            $('#mainContainer').fadeIn('slow', function() {
                playCurrentAudio(audioPath + audCount + '.mp3', 'Act1aud1');
                $("#menuContainer, #menu").hide();
            });
        }, 1000);
        skipIntro = 1;
    }
	else {
        $("#iconBar").hide();
        setTimeout(function() {
            $('#mainContainer').fadeIn('slow', function() {
                playCurrentAudio('./assets/audios/01_Case_and_Duct_System_Components/intro_1.mp3', 'intro');
                $('#cctxt').html("Welcome to the simulation on the air conditioning case and duct system. The case and duct system houses the blower motor, evaporator, heater core, and the mode and blend doors. It conditions the air and distributes it through various vent outlets.");
            });
        }, 1000);
        isFirstTime = false;
        $(this).parent().hide();
        $('#skipIntroCover').show();
    }
    $('#skipBtn').off('click').on('click', enterActivity);
    $("#hornLeft, #hornRight").hide();
	*/
	gameStartFn();
	$('.beginBtn').off('click').on('click',function(){
//	alert();
		
		$('.page').hide();
		$('#page_2').show()
		page_no=2
		set_tab()
		if (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) ||/Edge\/\d./i.test(navigator.userAgent)) {
				$('#mainContainer').removeAttr('role');
			}else{
//				$('#mainContainer').attr('role','application');
			}
})
	$('#nextBtn').off('click').on('click',function(){
		$('#checkBtn').show();
		$('.dragEl').show();
		
		$('.page').hide();
		$('#page_2').show()
		$('.draggable,.dropp').show()
		$('.Rowcol .rowPart1').css({'background':'#fff'});
		$('#nextBtn').hide();
		$('.Rowcol .rowPart1').text('');
		if (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) ||/Edge\/\d./i.test(navigator.userAgent)) {
			$('.Rowcol .rowPart1').attr('aria-label','blank');
		
		}else{
		$('.Rowcol .rowPart1').attr('aria-label','');
		
		}
		
		setTimeout(function(){
			$('.direction').focus();
		},10)
//		alert();
		page_no=3;
		set_tab();
		setTimeout(function(){
			$('#direction').focus();
		},10)
		$('.dragEl').css({'background':'transparent'});
		$('.dragEl div').css({'color':'#006ea1'});
		$('.dropp').droppable({disabled:false})
	})
	$('#reset_btn').off('click').on('click',function(){
		set_tab()
		 tempArray1 = new Array();
	})



function gameStartFn(){	
	var isDropped = false;
	
	$(".dragg").each(function(i, v){
		numAry.push(i);
	});	
	
	
	$(".dragEl").each(function(i, v){
//		$(this).children().attr('aria-label',qusAry[i].name_text)
		$(this).children().attr('role','dialog')
		if (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) ||/Edge\/\d./i.test(navigator.userAgent)) {
			$(this).children().attr('role','text')
			
		}
		if( /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent) ) {
 	// run your code here
		$(this).children().attr('role','text')
//		$('#direction').attr('role','text');
//		$('.rowPart1,.rowPart2,.rowPart3').attr('role','text');
	}
		$(this).children().html(qusAry[i].name_text);
		$(this).attr({"data-ansKey": qusAry[i].number});
	});	
	
	$("#submitBtn").off("click").removeClass("enCls").addClass("disCls");
//	var containment_size=
		
	$(window).on('resize', function(){
			resizeApp();	
		var containmentArea=$('#mainContainer');
		$(".dragEl").draggable({
			containment: [containmentArea.offset().left, containmentArea.offset().top, 
                ( ( containmentArea.offset().left + ( containmentArea.width() * scale ) ) - ( $(".dragg").width() * scale ) ) ,
                ( ( containmentArea.offset().top + ( containmentArea.height() * scale ) ) - ( $(".dragg").height()  * scale ) ) ],
			
		});
//		var containmentArea=$('#mainContainer');
//		 var containment_size=[containmentArea.offset().left, containmentArea.offset().top, 
//                ( ( containmentArea.offset().left + ( containmentArea.width() * scale ) ) - ( $(".dragg").width() * scale ) ) ,
//                ( ( containmentArea.offset().top + ( containmentArea.height() * scale ) ) - ( $(".dragg").height()  * scale ) ) ]
//		console.log(containment_size)
		})
}
	
	var containmentArea=$('#mainContainer');
	$(".dragEl").mouseenter(function(){
		if($(this).attr('data-thispar')=='dragg'){
			$(this).css({'border':'1px solid #006ea1'});
		}
	})
	$(".dragEl").mouseleave(function(){
//		if($(this).attr('data-thispar')=='dragg'){
			$(this).css({'border':'0px solid #006ea1'});
//		}
	})
	$(".dragEl").draggable({
 	containment: [containmentArea.offset().left, containmentArea.offset().top, 
                ( ( containmentArea.offset().left + ( containmentArea.width() * scale ) ) - ( $(".dragg").width() * scale ) ) ,
                ( ( containmentArea.offset().top + ( containmentArea.height() * scale ) ) - ( $(".dragg").height()  * scale ) ) ],
//		containment:containment_size,
		stack: ".dragEl",
		start: function(e, ui){
			isDropped = false;
			$(this).css({'border':'1px solid #006ea1;'});
			$(this).css({'display':'table'});
			$(this).css({'background':'rgba(255, 255, 255, 0.7)'});
			
			if (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) ||/Edge\/\d./i.test(navigator.userAgent)) {
			$('#dropSpot'+$(this).attr('data-usrans')).attr('aria-label','blank');
		
		}else{
		$('#dropSpot'+$(this).attr('data-usrans')).attr('aria-label','');
		
		}
			$('#dropSpot'+$(this).attr('data-usrans')).attr('aria-label','');
		},
		drag:function(e,ui){
				ui.position.left = ui.position.left / scale;
				ui.position.top = ui.position.top / scale;	
				$(this).css({'border':'1px solid #006ea1'});
				$(this).css({'display':'table'});
		},
		stop: function(e, ui){
			$(this).css({'border':'0px solid #006ea1;'})
			$(this).css({'background':'transparent'});
			if(!isDropped){
				drop_count--;
				console.log(drop_count)
				var drag_prog=$(this);
				var draggerId1 = $(this).attr("id").split("_")[1];
				var draggerHomeTop = $("#dragg_"+draggerId1).position().top/scale;
				var draggerHomeLeft = $("#dragg_"+draggerId1).position().left/scale;				
				$(this).animate({"top": draggerHomeTop, "left": draggerHomeLeft,'background':'#fff','color':'#006ea1'}).attr({"data-usrAns": "", "data-thisPar": "dragg"});
				$("#submitBtn").off("click").removeClass("enCls").addClass("disCls");
				$(this).css({'display':'table'});
				$(this).attr('tabindex','0').addClass('tab_class');
				
//				console.log($(this).attr('data-usrans'))
				
				$('#'+drag_prog.attr('id')+' div').addClass('tab_index').attr('tabindex','0')
				if(drop_count==qusAry.length){
				$(".dragEl").each(function(i, v){
					if($(this).attr("data-thispar") != "dragg"){
						console.log($(this).attr("data-thispar"))
						$('#checkBtn').css({'opacity':'1','pointer-events':'auto'})
					}else{
						$('#checkBtn').css({'opacity':'0.5','pointer-events':'none'})
					}
				});
			
		}
				else{
						$('#checkBtn').css({'opacity':'0.5','pointer-events':'none'})
					}
			}
			if(drop_count==qusAry.length){
				$(".dragEl").each(function(i, v){
					if($(this).attr("data-thispar") != "dragg"){
						console.log($(this).attr("data-thispar"))
						$('#checkBtn').css({'opacity':'1','pointer-events':'auto'})
					}else{
						$('#checkBtn').css({'opacity':'0.5','pointer-events':'none'})
					}
				});
			
		}
			else{
						$('#checkBtn').css({'opacity':'0.5','pointer-events':'none'})
					}
		}
//			over: function(event, ui) {
//             	
//				alert(1)
//            },
//            out: function(event, ui) {
//                
//				alert(2)
//            }
	});
	
//		alert()
		
//	})
	
	
	$(".dropp").droppable({
		tolerance:'touch',
		drop:function(e, ui){
		
		console.log(drop_count);
			$(this).css({'display':'block'});
			
//			drop_count++;
			isDropped = true;
			var storeOld = "";
			var thisEl = $(this);
			var thisElId0 = thisEl.attr("id").split("_")[0];
			var thisElId1 = thisEl.attr("id").split("_")[1];
			var dragEl = ui.draggable;
			var thisTop = thisEl.position().top/scale;
			var thisLeft = thisEl.position().left/scale;
			var dragElPar = dragEl.attr("data-thisPar");
			var dragElUsrAns = dragEl.attr("data-usrAns");						
//			$('ui.draggable').css({'display':'block'});
			$(".dragEl").each(function(i, v){
				if($(this).attr("data-usrAns") != ""){
					if($(this).attr("data-usrAns") == thisElId1){
						storeOld = $(this);
						return false;
					}
				}
			});			
//			$(".dragEl").each(function(i, v){
//				if($(this).attr("data-thispar") == "dropp"){
//					//alert()
//					console.log('123')
//				}
//			});
			if(storeOld != ""){
				var storeOldPar = storeOld.attr("data-thisPar");
				var storeOldUsrAns = storeOld.attr("data-usrAns");
				var storeOldId1 = storeOld.attr("id").split("_")[1];
			}
			
			if(storeOld == ""){
				dragEl.css({"top": thisTop, "left": thisLeft}).attr({"data-usrAns": thisElId1, "data-thisPar": thisElId0});
				$("#dropSpot"+thisElId1).attr('aria-label',dragEl.text())
			} 
			else if((storeOld != "") && (storeOldPar == "dropp")){				
				eleTop1 = $("#dropp_"+storeOldUsrAns).position().top/scale;
				eleLeft1 = $("#dropp_"+storeOldUsrAns).position().left/scale;
				
				if(dragElPar == "dropp"){
//					alert('para')
					drop_count=drop_count-1;
					console.log(drop_count)
					eleTop2 = $("#dropp_"+dragElUsrAns).position().top/scale;
					eleLeft2 = $("#dropp_"+dragElUsrAns).position().left/scale;						
					
					dragEl.css({"top": eleTop1, "left": eleLeft1}).attr({"data-usrAns": storeOldUsrAns, "data-thisPar": "dropp"});
					storeOld.animate({"top": eleTop2, "left": eleLeft2,'background':'#fff','color':'#006ea1'}).attr({"data-usrAns": dragElUsrAns, "data-thisPar": "dropp"});
					$("#dropSpot"+dragElUsrAns).attr('aria-label',$("#dropSpot"+storeOldUsrAns).attr('aria-label'))
					$("#dropSpot"+storeOldUsrAns).attr('aria-label',$("#dropSpot"+dragElUsrAns).attr('aria-label'))
					
				}
				else if(dragElPar == "dragg"){
					
					eleTop2 = $("#dragg_"+storeOldId1).position().top/scale;
					eleLeft2 = $("#dragg_"+storeOldId1).position().left/scale;
					
					dragEl.css({"top": eleTop1, "left": eleLeft1}).attr({"data-usrAns": storeOldUsrAns, "data-thisPar": "dropp"});
					storeOld.animate({"top": eleTop2, "left": eleLeft2,'background':'#fff','color':'#006ea1'}).attr({"data-usrAns": dragElUsrAns, "data-thisPar": "dragg"});
//					alert()
					drop_count=drop_count-1;
					$("#dropSpot"+thisElId1).attr('aria-label',dragEl.text())
					
				}
				
			}
			//var enContinue = true;
			$(".dragEl").each(function(i, v){
				if($(this).attr("data-thisPar") == "dragg"){
					enContinue = false;
//					alert('123')
					//$('#checkBtn').show()
					return false;
				}
			});
			drop_count++;
			console.log(drop_count)
//			if($('.dragEl').attr('data-thispar')=='dropp'){
//				console.log('123')
//			}
			$(this).css({'width':'0px !important','height':'0px !important'})
			$("#submitBtn").off("click").on("click", chkAnsFn).removeClass("disCls").addClass("enCls");
			console.log(dragEl.text())
			$("#dropSpot"+thisElId1).attr('aria-label',dragEl.text())
//			$("#dropSpot"+thisElId1).attr('aria-label',dragEl.text())
//			dragEl.removeAttr('tabindex').removeClass('tab_index');
			$('#'+dragEl.attr('id')+' div').removeAttr('tabindex').removeClass('tab_index');
		},
//		over: function(event, ui) {
//		  alert(1)
//		},
//		out: function(event, ui) {
//		   alert(2)
//    	},
	});
$("#checkBtn").off("click").on("click",chkAnsFn)//.removeClass("disCls").addClass("enCls");
$("#tryBtn").off("click").on("click",try_again)//.removeClass("disCls").addClass("enCls");
$("#show_answer").off("click").on("click",show_answer)//.removeClass("disCls").addClass("enCls");
$("#reset_btn").off("click").on("click",reset_function)//.removeClass("disCls").addClass("enCls");
	$('.slideImgBegin').attr('aria-label','some human diseases transmitted by polluted water')
	if( /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent) ) {
 	// run your code here
		$('#direction').attr('role','text');
		$('.tab_container').attr('role','table');
		$('.rowPart1,.rowPart2,.rowPart3').attr('role','text');
//		$('.rowPart1,.rowPart2,.rowPart3').attr('aria-label','text');
	}
	
	//-------------------------------------------------------------//
//	page_start
	$('#page_start').on('focus',function(){
			$('.tab_index').eq(1).focus();	
		})
		$('#page_stop').on('focus',function(){
			$('.tab_index').eq(1).focus();
		})
		$('#page2_start').on('focus',function(){
			$('.tab_index').eq(1).focus();	
			
		})
		$('#page2_stop').on('focus',function(){
			$('.tab_index').eq(1).focus();
		})
		$('#page3_start').on('focus',function(){
			$('.tab_index').eq(1).focus();	
		})
		$('#page3_stop').on('focus',function(){
			$('.tab_index').eq(1).focus();
		})
		$('#direction').on('focusout',function(){
//			$('#mainContainer').removeAttr('role');
		});
		$('#dummy_1').on('focus',function(){
//			$('.tab_index').eq(1).focus();
			$('#direction').attr('role','application');
			setTimeout(function(){
				$('.tab_index').eq(1).focus();
				$('#whole_container').removeAttr('role');
				$('#direction').removeAttr('role');
			},100)

		})
	
}
var game_try=0;

function reset_function(){
	set_tab()
	$('#reset_btn').hide();
	$('.feedback_tick').removeClass('correct').hide();
	$('#nextBtn').show();
	$('.dragg').show();
	$(".dragEl").each(function(i, v){
		var thisUsrAns  = $(this).attr("data-usrAns");
		var thisAnsKey  = $(this).attr("data-ansKey");
		var thisId1 = $(this).attr("id").split("_")[1];
		var homeTop = $("#dragg_"+thisId1).position().top/scale;
		var homeLeft = $("#dragg_"+thisId1).position().left/scale;

		var ansTop = $("#dropp_"+thisAnsKey).position().top/scale;
		var ansLeft = $("#dropp_"+thisAnsKey).position().left/scale;
		$(this).animate({"top": homeTop, "left": homeLeft,'background':'#fff','color':'#006ea1'}).attr({"data-usrAns": "", "data-thisPar": "dragg"}).hide();
		$(this).draggable({ disabled: false });
	});
		$('.page').hide();
		$('#page_2').show()
		$('.draggable,.dropp').show()
		//$('.Rowcol .rowPart1').css({'background':'#fff'});
		$('#nextBtn').show();
		$('.dragEl,.draggable,#checkBtn').hide(); 
		$('#checkBtn').hide(); 
		//$('.Rowcol .rowPart1').text('');
		$('#checkBtn').css({'opacity':'0.5','pointer-events':'none'})//.show();
		//$('.dragEl div').css({'color':'#006ea1'});
//		$('.dragg').css({'background':'#fff'});
//	$('.dragg').css({'background':'transparent'});
		drop_count=0;
		game_try=0;
		corCnt=0
	
}

function show_answer(){
//	qusAry
//	alert()
	set_tab()
	$('.dragg,.dropp,#show_answer,#tryBtn').hide()
	$('#reset_btn').show().attr('tabindex','0').addClass('tab_index');
	$('.Rowcol .rowPart1').css({'background':'#ededed'});
	$('.feedback_tick').addClass('correct').show();
	
//	for(var i=0; i<=qusAry;i++){
//		$('#dropSpot'+i).text(qusAry[i]);
//		console.log(i)
//	}
	//$(".rowPart1").each(function(index){
	for(i=0;i<=correct_ans.length;i++){	
		$('#dropSpot'+i).text('')
		$('#dropSpot'+i).text(correct_ans[i]);
		console.log(correct_ans[i])
	}
//	$('').css('#ededed;')
	
	
}
function chkAnsFn(){
	if($('#checkBtn').css('pointer-events')=='none'){
		return false;
	}

	set_tab()
	
	game_try++;
	if(game_try>=2){
		$('#show_answer').show().attr('tabindex','0').addClass('tab_index');
		$('#tryBtn').css({'left':'42px'})
	}
	else{
		$('#show_answer').hide()
		$('#tryBtn').css({'left':'0px'})
	}
	console.log('clicked');
//	alert()
//	if($(this).hasClass("submitBtns")){
	$('#tryBtn').show()
	$('#checkBtn').hide()
		var allCor = true;		
		corCnt = 0;
		$(".dragEl").each(function(i, v){
			if($(this).attr("data-thisPar") == "dropp"){
				var thisUsrAns  = $(this).attr("data-usrAns");
				var thisAnsKey  = $(this).attr("data-ansKey");
				var thisId1 = $(this).attr("id").split("_")[1];
				var homeTop = $("#dragg_"+thisId1).position().top/scale;
				var homeLeft = $("#dragg_"+thisId1).position().left/scale;
				
				var ansTop = $("#dropp_"+thisAnsKey).position().top/scale;
				var ansLeft = $("#dropp_"+thisAnsKey).position().left/scale;
				
				if(thisUsrAns == thisAnsKey){
					$("#imgId_"+thisUsrAns).removeClass("inCorAns").addClass("corAns");
					$(this).draggable("disable");
					$("#dropp_"+thisAnsKey).droppable("disable");
					$("#dropSpot"+thisAnsKey).css({'background':'#ededed','color':'#000'});
					$("#dragEl_"+thisId1).css({'color':'#000'});
					$("#dragEl_"+thisId1+" div").css({'color':'#000'});
					$("#dragEl_"+thisId1+" div").removeAttr('tabindex').removeClass('tab_index');
					corCnt++;
					console.log(corCnt);
					if(corCnt==qusAry.length){
						$('#reset_btn').show();
						$('#show_answer,#tryBtn').hide();
						$('.feedback_tick').addClass('correct').show();
						$('.Rowcol .rowPart1').css({'background':'#ededed'});
						
					}
					
				}
				else{
					if(wrongAttempt < 3){
						console.log($(this).attr('data-usrans'))
						$('#tick_'+$(this).attr('data-usrans')).show();
						//$(this).css({background:'red'});//.animate({"top": homeTop, "left": homeLeft}).attr({"data-usrAns": "", "data-thisPar": "dragg"})
						$("#submitBtn").off("click").removeClass("enCls").addClass("disCls");
					}
					else{
						$(this).animate({"top": ansTop, "left": ansLeft,'background':'#fff','color':'#006ea1'}).attr({"data-usrAns": "", "data-thisPar": "dragg"}).draggable("disable");
						$(".dropp").droppable("disable");
						$(".imgCls").removeClass("inCorAns").addClass("corAns");
						$("#submitBtn").hide();
						$("#continueBtn").show().off("click").on("click", continueFn);
					}
					allCor = false;					
				}				
			}
			
		});		
//	}	
//	setTimeout(function(){
		$(".dragEl").draggable("disable")
		$(".dragEl div").removeAttr('tabindex').removeClass('tab_index');
//		alert()
//	},10)
}

function try_again(){
//	set_tab()
	$(".dragEl").each(function(i, v){
		$('#show_answer').hide();
		if($(this).attr("data-thisPar") == "dropp"){
			var this_prog = $(this)
			var thisUsrAns  = $(this).attr("data-usrAns");
			var thisAnsKey  = $(this).attr("data-ansKey");
			var thisId1 = $(this).attr("id").split("_")[1];
			var homeTop = $("#dragg_"+thisId1).position().top/scale;
			var homeLeft = $("#dragg_"+thisId1).position().left/scale;

			var ansTop = $("#dropp_"+thisAnsKey).position().top/scale;
			var ansLeft = $("#dropp_"+thisAnsKey).position().left/scale;

			if(thisUsrAns != thisAnsKey){
				
				$(this).animate({"top": homeTop, "left": homeLeft,'background':'#fff','color':'#006ea1'}).attr({"data-usrAns": "", "data-thisPar": "dragg"});
				 $(this).draggable({ disabled: false });
				$('#'+this_prog.attr('id')+' div').attr('tabindex','0').addClass('tab_index');
				$('.feedback_tick').hide();
				$('#tryBtn').hide();
				$('#checkBtn').css({'opacity':'0.5','pointer-events':'none'}).show();
//				console.log(drop_count)
				drop_count=corCnt;
			}
				
			
		}
	});
}

function continueFn(){	
	endscrfn(1,0);
}

function corWrongAttemptFn(){	
	if(corCnt == 10){
		$("#infoicon").addClass("repeatDisable");
		console.log("hi K ", $("#infoicon"));
		$("#submitBtn").hide();
		$("#continueBtn").show().off("click").on("click", continueFn);
		
		if((wrongAttempt >= 1) && (wrongAttempt <= 3)) updateScore((scr - (wrongAttempt-1)), wrongAttempt);
		
		activityEnd((scr - (wrongAttempt-1)), 0, activityData.attArr);
	}	
	else if((wrongAttempt > 3) && (corCnt != 6)){		
		$("#infoicon").addClass("repeatDisable");
		updateScore(0, (wrongAttempt-1));
		activityEnd(0, 0, activityData.attArr);
	}
}


var enterActivity = function() {
    $('#safetyScreen').show();
    $('#safeStart').hide();
    audObj.pauseAudio();
    $('#fbAudioPlayer').attr('src', './assets/audios/common/safety.mp3');
    $('#fbAudioPlayer')[0].play();
    $('#safeStart').show();
    /**/$('#safeStart').off('click').on('click', function() {
        $("#header > #head2").html(data.frameTitle[2]).css({lineHeight: "20px", "top": "3px"});
        $('#safetyScreen').hide();
        $('#fbAudioPlayer')[0].pause();
        skipIntro = 1;
        playCurrentAudio(audioPath + audCount + '.mp3', 'Act1aud1');
        $('#skipIntroCover').hide();
        $("#iconBar").show();
    });
}


//function shuffleInnerData(o){
//	o.sort(function() { return 0.5 - Math.random() });
//	return o;
//}
function shuffleInnerData(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}


function set_tab(){
	if(page_no==1){
		$('.tab_index').removeClass('tab_index').removeAttr('tabindex');
		$('.slideImgBegin').addClass('tab_index');
		$('#page_start,#page_stop,#dummy_text').addClass('tab_index');
		$('.beginBtn').addClass('tab_index');
	}else if(page_no==2){
		$('.tab_index').removeClass('tab_index').removeAttr('tabindex');
		$('#page2_start,#page2_stop,#dummy_1').addClass('tab_index');
		$('#direction,.tableImage').addClass('tab_index');
		$('.rowPart1,.rowPart2,.rowPart3,#nextBtn').addClass('tab_index');
	}else if(page_no==3){
		$('.tab_index').removeClass('tab_index').removeAttr('tabindex');
		$('#page3_start,#page3_stop').addClass('tab_index');
		$('#direction,.tableImage').addClass('tab_index');
		$('.dragEl div,#checkBtn').addClass('tab_index');
		$('.rowPart1,.rowPart2,.rowPart3,#nextBtn').addClass('tab_index');
	}
//	$('#nextBtn,#checkBtn,#tryBtn,#show_answer,#reset_btn').addClass('tab_index');
//	$('.dragg').addClass('tab_index');
	$('.tab_index').each(function(){
		setTimeout(function(){
    		$('.tab_index').attr('tabindex','0')//.focus().blur();
		},10)
  });
}