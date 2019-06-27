var optionsDrag;
var set_tab=1;
(function(Player) {
    var aSlidesArray = new Array();
    var nSlideCounter = 0;
    var nCount = 0;
    var optionsDrop;
    var DragID;
    var DropID;
    var originalPosition;
    var acceptance = false;
    var dropHover = false;
    var showAnswerArr = new Array();
    var AnsDropped = new Array();
    var TryAgain = 0;
    var CorrectOptionArray;
    var OriginalAns;
    var TempArray = new Array();
    var tempArray1 = new Array();
    var oTable = "";
    var oTable1 = "";
    var DragSet = "";
    var DropSet = "";
    var set;
	
	

    $(document).ready(function() {
        init();
		
		$('#main_container').removeAttr('role');
        $("#naviLeft").bind("click keydown", fnBack);
        $("#naviRight").bind("click keydown", fnNext);
        $(".defaultPopUp, .patch").hide();
		$(".begin").trigger('click');
		$(".begin").hide();
		$(".check").addClass('disabled').removeClass('tabindex active');
		$(".check").css('pointer-events', 'none');
//		$(".check").show()//.attr('aria-hidden', 'true')
		$('.droppable .Rowcol .rowPart1').html('').addClass('dropSpotAnsWrapper');
		$(".droppable .dropSpotAnsWrapper").droppable(optionsDrop);
		$(".footer").removeClass('hide');
		set_tabindex()
		
		$('.beginBtn').off('click').on('click',function(){
			$('#page_1 div').removeAttr('role')
			$('#dummy_no').show();
			$('#direction_text').fadeIn(500)
			$('.beginPage').hide();
			$('#page_2').fadeIn(500);
			 $("#show_table").html('');
			$('.check').fadeIn(500)
			resizeApp()
			set_tab=3;
			set_tabindex();
			//$('.tabindex').eq(0).focus();
//			$('#dummy_text_1').attr('aria-hidden',true).attr('role','dialog');
//			$('.tabindex').eq(0).focus();
//			$('#page_1 div').removeAttr('role')
			
//			setTimeout(function(){
//				$("#dummy_page_1").focus();
//				alert('123');
//			},1000)
//			setTimeout(function(){
//				;
//				$('#direction_text').focus();
//			},500)
//			$('#whole_container').attr('role','application');
			$('#begin_dummy_1').hide();
			$('#begin_dummy_2').hide();
			if (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) ||/Edge\/\d./i.test(navigator.userAgent)) {
				//$('#whole_container').removeAttr('role');
				$('#whole_container').attr('role','application');
				$('.rowPart1,.rowPart2,.rowPart3').attr('role','application');
			}else{
				$('#whole_container').attr('role','application');
			}
			$('#dummy_1').focus();
//			$('#direction_text').removeAttr('role')
//			$('#whole_container').removeAttr('role');
			//$(".tabindex").addClass('active');
//			setTimeout(function(){
////				;
//			},100)
			
//			setTimeout(function(){
//			
//			},10);
//			$("#dummy_text_1").attr('role');
			//.removeClass('tabindex');
		if( /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent) ) {
			$('#dummy_1,#dummy_no').html('').attr('aria-hidden','true');
			$('#direction_text').attr('role','text');
			$('.rowPart1,.rowPart2,.rowPart3').attr('role','text');
			$('#whole_container').removeAttr('role');
			$('.feedback').removeAttr('aria-hidden');
		}
		})
		
		$('#next_btn').off('click').on('click',function(){
			$('#dummy_no').show();
			$('.beginPage,.page').hide();
			$('#page_2').show();
			$('#direction_text,#next_btn').show();
			
		    $("#show_table").html('');
			$('.check').show();
//			setTimeout(function(){
				set_tab=3;
//			setTimeout(function(){
				set_tabindex();
//			},10)
//				;
//			},1000)
//			$('#show_table')
//			$('.tabindex').eq(0).focus();
			$('#dummy_1').focus();
//			$('#direction_text').attr('role','application');
			$('#whole_container').attr('role','application');
			if( /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent) ) {
				$('#dummy_1,#dummy_no').html('').attr('aria-hidden','true');
				$('#direction_text').attr('role','text');
				$('.rowPart1,.rowPart2,.rowPart3').attr('role','text');
				$('#whole_container').removeAttr('role');
				$('.feedback').removeAttr('aria-hidden');
//			
		}
			resizeApp()
		})
		
    });

    document.addEventListener('keydown', function(event) {
		//console.log('123')
        if (event.keyCode === 9) {
            $('body').addClass('show-focus-outlines');
            $(".mainContainerR").attr("aria-hidden", "false");
            $(".activityQuestion").attr("aria-hidden", "false");
            $(".tabindex").addClass('active');
        }
        if (event.type === "keydown") {
            $(".tabindex").addClass('active');
        }
    });
    document.addEventListener('click', function(event) {
        $('body').removeClass('show-focus-outlines');
        $(".tabindex").removeClass('active');
//		;
    });

    function EnableSubmit(event) {
        var allDropped = true;
        $('.draggable .dragSpotWrapper').each(function(ind,num) {
			
            if ($(this).find('.ui-draggable').length > 0) {
                allDropped = false;
				return;
            }
        });
		
        if (allDropped) {
			//DisableLeftArrow();
			//DisableRightArrow();
			//set_tabindex();
            $(".feedback > button").hide();
			
            setTimeout(function() {
				//
                $('.check').removeClass('disabled').addClass('tabindex').attr('aria-hidden', 'false');
                $('.check').css('cursor', 'pointer');
                $('.check').css('pointer-events', 'auto');
//				$('#direction_text').removeAttr('role');
                $('.check').css('display', 'block');
                set_tabindex();

				
                if (event.type == 'keydown') {
					setTimeout(function(){
                    	$('.check').show().addClass('active').focus()
					},100);
                } else {
                    $('.check').show().focus();
                }
            }, 100);
        }
    }

    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    function collision($div1, $div2) {
      var x1 = $div1.offset().left;
      var y1 = $div1.offset().top;
      var h1 = $div1.outerHeight(true);
      var w1 = $div1.outerWidth(true);
      var b1 = y1 + h1;
      var r1 = x1 + w1;
      var x2 = $div2.offset().left;
      var y2 = $div2.offset().top;
      var h2 = $div2.outerHeight(true);
      var w2 = $div2.outerWidth(true);
      var b2 = y2 + h2;
      var r2 = x2 + w2;

      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
      //console.log("ok");
      return true;
    }
	
    function init() {
        $(".close-btn").click(function() {
        });
        tempArray1 = [];
        $(".questionText").html(data[0].question);
        $(".direction").html(data[0].direction);
        $(".directionText").html(data[0].directionText);
        OriginalAns = data[0].OriginalAns;
        CorrectOptionArray = data[0].CorrectOptionArray;

        oTable += '<div class="Row RowHead">';
        for (var i = 0; i < data[0].tableInfo[0].tableHeading.length; i++) {
			console.log(data[0].tableInfo[0].tableHeading[i])
            oTable += '<div role="none" aria-label="'+data[0].tableInfo[0].tableHeading[i]+'" class=" col rowPart' + Number(4 - i) + '">' + data[0].tableInfo[0].tableHeading[i] + "</div>";
        }
        oTable += "</div>";

		for(var i=0 in data[0].tableInfo[0].tableData){
                tempArray1.push([   
                                    data[0].tableInfo[0].tableData[i].col1Text,
                                    data[0].tableInfo[0].tableData[i].col2Text,
                                    data[0].tableInfo[0].tableData[i].correctAnswer,
                                    data[0].tableInfo[0].tableData[i].height
                                ]);
            }
		console.log(tempArray1)
		
//			$('.col').attr('aria-label',$('.col').text());
//        for (var i = 0 in data[0].tableInfo[0].tableData) {
//            tempArray1.push([data[0].tableInfo[0].tableData[i].col1Text, data[0].tableInfo[0].tableData[i].col2Text, data[0].tableInfo[0].tableData[i].col3Text, data[0].tableInfo[0].tableData[i].col4Text, data[0].tableInfo[0].tableData[i].correctAnswer,data[0].tableInfo[0].tableData[i].col5Text]);
//        }
//        for (var j = 0; j < tempArray1.length; j++) {
//            var table_data = '';
//             console.log(">>>>>>>",tempArray1[j][5])
//            
//            oTable1 += '<div class="clearfloat"></div><div class="Row Rowcol" aria-hidden="true"><div class="rowPart4 innercol"><span class="boldText">' + tempArray1[j][4] + '</span></div><div class="rowPart3 rowPart2 tabindex innercol " aria-hidden="true" id="dropSpot' + j + '" value="' + tempArray1[j][3] + '" dropped="false">' + tempArray1[j][3] + '</div><div id="dropSpot'+(j+3)+'" class="rowPart2 tabindex rowWidth innercol" dropped="false" aria-hidden="true"><div>' + tempArray1[j][2] + '</div></div><div class="feedback_tick tickCls1" id="tick_' + j + '"></div><div class="feedback_tick tickCls2" id="tick_' + (j + 3) + '"></div></div>';
//            if ((tempArray1.length - 1) == j) {
//                oTable1 += '<div class="Row RowLastcol"><div class="lastpart1 lastcol"></div><div class="lastpart2 lastcol"></div><div class="lastpart3 lastcol"></div><div class="lastpart4 lastcol"></div></div>';
//            }
//
//        }
//		  for (var j = 0; j < tempArray1.length; j++) {
//            var table_data = '';
//             //console.log(">>>>>>>",tempArray1[j][5])
//            
//            oTable1 += '<div class="clearfloat"></div><div class="Row  Rowcol"><div class="rowPart4 innercol"><span class="boldText">' + tempArray1[j][4] + '</span></div><div class="rowPart3  rowPart2 tabindex innercol" role="application" id="dropSpot' + j + '" value="' + tempArray1[j][3] + '" dropped="false" aria-label="This is a '+data[0].tableInfo[0].tableHeading[1]+' of '+data[0].tableInfo[0].tableHeading[0]+', '+data[0].tableInfo[0].tableHeading[0]+' is, '+tempArray1[j][4]+'. '+data[0].rowpart3_aria_label+'">' + tempArray1[j][3] + '</div><div id="dropSpot'+(j+3)+'" role="application"  class="rowPart2 tabindex rowWidth innercol" dropped="false" aria-label="This is a '+data[0].tableInfo[0].tableHeading[2]+' of '+data[0].tableInfo[0].tableHeading[0]+', '+data[0].tableInfo[0].tableHeading[0]+' is, '+tempArray1[j][4]+'. '+data[0].rowpart2_aria_label+'" value="'+tempArray1[j][2]+'"><div>' + tempArray1[j][2] + '</div></div><div class="feedback_tick tickCls1" id="tick_' + j + '"></div><div class="feedback_tick tickCls2" id="tick_' + (j + 3) + '"></div></div>';
//            if ((tempArray1.length - 1) == j) {
//                oTable1 += '<div class="Row RowLastcol"><div class="lastpart1 lastcol"></div><div class="lastpart2 lastcol"></div><div class="lastpart3 lastcol"></div><div class="lastpart4 lastcol"></div></div>';
//            }
////			setTimeout(function(){
////				console.log(j)
////				      $('#dropSpot'+j).text($('#dropSpot'+j).attr('aria-label'));
////			//$('.rowPart2').html($(this).attr('aria-label'));
////					   },100)
//        	}	
			 for(var j=0;j< tempArray1.length;j++){
			console.log(j)
                oTable1+='<div class="clearfloat"></div>'+
                          '<div class="Row Rowcol" >'+
                            '<div id="drop_'+j+'" class="drop_container" style="height:' + tempArray1[j][3]+ ';background-color:#fff"><div dropped="false" height_cont="'+tempArray1[j][3].split('px')[0]+'" aria-label="'+tempArray1[j][2]+'" role="none" class="rowPart1 innercol " style="height:' + tempArray1[j][3]+ ';z-index:'+(j+1)+'" id="dropSpot_'+j+'" value="'+tempArray1[j][2]+'">'+
                                    tempArray1[j][2]+
                            '</div></div>'+
//                            '<div aria-label="'+tempArray1[j][0]+'" role="none" class="rowPart2 innercol " style="height:' + tempArray1[j][3] + '">'+
//                                tempArray1[j][0]+
//                            '</div>'+
					 		'<div dropped="false" role="none"  aria-label="'+tempArray1[j][0].replace(/<br\s*\/?>/gi,' ')+'"  class="rowPart2 innercol "  style="height:' + tempArray1[j][3] + '" >'+
                            tempArray1[j][0]+
                            '</div>'+
                            '<div role="none" aria-label="'+tempArray1[j][1].replace(/<br\s*\/?>/gi,' ')+'"  class="rowPart3 innercol "  style="height:' + tempArray1[j][3] + '" >'+
                            tempArray1[j][1]+
                            '</div>'+
                            '<div class="feedback_tick"  id="tick_'+j+'"></div>'+
                            '</div>';
                if((tempArray1.length-1) == j){
                    oTable1+='<div class="Row RowLastcol">'+
                                '<div class="lastpart1 lastcol"></div>'+
                                '<div class="lastpart2 lastcol"></div>'+
                                '<div class="lastpart3 lastcol"></div>'+
                             '</div>';
                }
            }
//		console.log(oTable1)
//            oTable1=oTable1;
	
//	 $("#tab_container").html(oTable1);
		
		setTimeout(function(){
		$(".dropSpotAnsWrapper").each(function( index ) {
			//console.log(index)
			//$('#dropSpot'+index).html('<span>'+$('#dropSpot'+index).attr('aria-label')+'</span>');
  			//console.log( index + ": " + $( this ).text() );
		});
		},100);
        oTable1 = oTable + oTable1;

        $(".droppable").html(oTable1);
       //$("#show_table").append(oTable1);

        CorrectOptionArray = shuffle(CorrectOptionArray);
        var j = 0;
        for (var i = 0; i < CorrectOptionArray.length; i++) {
            AnsDropped[i] = "";
            if (i % CorrectOptionArray.length == 0) {
                DragSet += '<div class="frame headerFrame' + j + '">';
                j++;
            }
            DragSet += '<div  id="dragSpot_' + i + '_td" class="dragSpotWrapper"><div id="dragSpot_' + i + '" class="box dragSpot " value="' + CorrectOptionArray[i] + '" role="none" dragged="false" aria-label="'+CorrectOptionArray[i].replace(/[^a-zA-Z ]/g, "")+'">' + CorrectOptionArray[i] + '</div><div class="box dragSpot1 grayed" id="gray_' + i + '">' + CorrectOptionArray[i] + '</div></div>';

            if (i % CorrectOptionArray.length == 9) {
                DragSet += '</div>';
            }
            for (var p = 0; p < CorrectOptionArray.length; p++) {
                if ($.inArray(TempArray[i], CorrectOptionArray[p]) > -1) showAnswerArr[p].push('dragSpot_' + i);
            };
        };
        //console.log("showAnswerArr After= ", showAnswerArr);
        $(".draggable").html(DragSet);
        $(".droppables tbody").append(DropSet);
        $(".begin").attr("aria-label", "To begin the activity, press Enter or Spacebar key.");
        $(".check").attr("aria-label", "To check the answers, press the Enter or Space bar key.");
        $(".tryagain").attr("aria-label", "Your answers are incorrect. To try again, press the Enter or Space bar key.");
        $(".showAns").attr("aria-label", "Sorry! your answers are incorrect. To listen the correct answers, press the Enter or Space bar key. To reset and try the question again, press Tab key followed by Enter or Space bar key.");
        $(".Reset").attr("aria-label", "To reset and try the question again, press Enter or Space bar key.");
//        $(".quizeSection").attr("aria-label", " To explore the interactivity press tab key.");
        $("#naviLeft").attr('aria-label', 'previous options')
        $("#naviRight").attr('aria-label', 'next options');
		var containmentArea = $('#containment_container');
		console.log([containmentArea.offset().left, containmentArea.offset().top, 
                ( ( containmentArea.offset().left + ( containmentArea.width() * scale ) ) - ( $(".dragSpotWrapper").width() * scale ) ) ,
                ( ( containmentArea.offset().top + ( containmentArea.height() * scale ) ) - ( $(".dragSpotWrapper").height()  * scale ) ) ])
        optionsDrag = {
            tolerance: "intersect",
//            containment: $(".mainContainerR"),
			 containment: [containmentArea.offset().left, containmentArea.offset().top, 
                ( ( containmentArea.offset().left + ( containmentArea.width() * scale ) ) - ( $(".dragSpotWrapper").width() * scale ) ) ,
                ( ( containmentArea.offset().top + ( containmentArea.height() * scale ) ) - ( $(".dragSpotWrapper").height()  * scale ) ) ],
            revert: function(event, ui) {
                //console.log("acceptance",acceptance,"dropHover",dropHover)
				$('#gray_'+$(this).attr('id').split('_')[1]).hide();
                if(dropHover == false){
                    $(".check").addClass('disabled').css("pointer-events","none").show().css("outline","none");
                }
                if (acceptance == true && dropHover) {
                    return false;
                } else {
                    var anyDropDivTouch = null;
                    var dragDiv = $(this);
                    $(".rowPart1").each(function(){
                        if (collision(dragDiv,$(this)))
                        {
                            anyDropDivTouch = $(this);
                            return false;
                        }
                    });
                    if (anyDropDivTouch == null)
                    {
                        dragDiv.css({
                            "left": "0px",
                            "top": "0px"
                        });
//						
                        var parentDivId = $(this).attr("id")+"_td";
//						console.log(parentDivId)
                        dragDiv.appendTo($("#"+parentDivId));
                        AnsDropped[Number($(this).attr("id").replace("dragSpot_", ""))] = "";
//						setTimeout(function(){
							$(this).parent().attr('dropped','false');
							$(this).parent().attr('aria-label','To select the box by using spacebar or enter key');
//						},10)
						
                        return true;
                    }else{
						//console.log(dragDiv.attr('id').split('_')[1])
						
                        previouslyPlacedDiv = anyDropDivTouch.find(".dragSpot");
                        if (previouslyPlacedDiv.length==0 || previouslyPlacedDiv.css("pointer-events") == "none")
                        {
                            return true;
                        }
//						alert(1)
						$('#gray_'+previouslyPlacedDiv.attr('id').split('_')[1]).hide();
                        var parentDivId = previouslyPlacedDiv.attr("id")+"_td";
                        AnsDropped[Number(previouslyPlacedDiv.attr("id").replace("dragSpot_", ""))] = "";
//						console.log(AnsDropped[Number(previouslyPlacedDiv.attr("id").replace("dragSpot_", ""))])
//						alert('125')
//						console.log(dragDiv.parent())
//						console.log(AnsDropped)
                        previouslyPlacedDiv.appendTo($("#"+parentDivId));
                        DragID = dragDiv.attr("id");
                        anyDropDivTouch.append(dragDiv);
                        AnsDropped[Number(DragID.replace("dragSpot_", ""))] = DragID;
						//dragDiv.parent().attr('aria-label','To select the box by using spacebar or enter key');
						//dragDiv.parent().attr('dropped','false');
//						$(this).parent().attr('dropped','false');
//						$(this).parent().attr('aria-label','To select the box by using spacebar or enter key');
//						;
//						if ( $('.dropSpotAnsWrapper:empty') ) { 
//							console.log($(this).id);
//
//						}
                        return false;
                    }
                set_tabindex();  
                }
              
            },
            start: function(event, ui) {
				$(this).css('border','1px solid #007098')
				$(this).css('border-radius','5px')
                var drgClone = $(this).clone(true);
                dropHover = false;
                $(this).css({
                    "z-index": "500"
                });
                DragID = $(this).attr("id");
                set = 0;
                //console.log("start", set);
				
//				$('html').blur();
//				
            },
//			
			
            drag: function(event, ui) {
				ui.position.left = ui.position.left / scale;
				ui.position.top = ui.position.top / scale;
//				;
				if( /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent) ) {
					$(this).focus();
				}
			},
            stop: function(event, ui) {
                $(this).css("z-index", "0");
				$(this).css('border','1px solid transparent')
                if (set == 0 && !$("#" + DragID).parent().hasClass("dropSpot")) {
					
                    $("#" + DragID).css({
                        "left": "0px",
                        "top": "0px"
                    });
					fnCheckNextBack();

					if($('#dragSpot_'+DragID.split('_')[1]+'_td').children().length==1){
					   	$('#gray_'+DragID.split('_')[1]).show();
//						$("#" + DragID).parent().attr('aria-label','empty');	
						//alert(1)
				   }else{
					   //alert(2)
					   $('#gray_'+DragID.split('_')[1]).hide();
				   }	
					$("#" + DragID).parent().attr('aria-label',$(this).text());
					
					$('.dragSpot[dragged="true"]').removeAttr("tabindex").removeClass("tabindex");
//					alert('1')
                } else {
//					alert('2')
//					$("#" + DragID).parent().attr('aria-label','nooooooo');
                    $("#" + DragID).css({
                        "left": "0",
                        "top": "0"
                    });
                }
				if (!$('.draggable .dragSpotWrapper .dragSpot').length) {
                    DisableLeftArrow();
                    DisableRightArrow();
					console.log('stop area')
					//$('.check').removeClass('disabled').addClass('tabindex')//.attr('aria-hidden', 'false');
                }else{
					fnCheckNextBack()
				}
//				$(".dropSpotAnsWrapper" ).each(function( index ) {
//				 	if($('#dropSpot_'+index).children().length==0){
//						$('#dropSpot_'+index).attr('dropped','false');
//						$('#dropSpot_'+index).attr('aria-label','To select the box by using spacebar or enter key');
//					}
//				});
				$(".rowPart1" ).each(function( index ) {
					if($('#dropSpot_'+index).text().length==0){
						$('#dropSpot_'+index).attr('dropped','false');
						$('#dropSpot_'+index).attr('aria-label','To select the box by using spacebar or enter key');
					}
				else{
						$('#dropSpot_'+index).attr('dropped','true');
						$('#dropSpot_'+index).attr('aria-label',$('#dropSpot_'+index).text());

					}
				});
				
//					$('.dropSpotAnsWrapper').children().length			
				
				
            }
        };
		
        $(".dragSpot").draggable(optionsDrag);
		$(window).on('resize', function(){
			resizeApp();
			var containmentArea = $('#containment_container');
			optionsDrag={
				 containment: [containmentArea.offset().left, containmentArea.offset().top, 
                ( ( containmentArea.offset().left + ( containmentArea.width() * scale ) ) - ( $(".dragSpotWrapper").width() * scale ) ) ,
                ( ( containmentArea.offset().top + ( containmentArea.height() * scale ) ) - ( $(".dragSpotWrapper").height()  * scale ) ) ]
			}
			$(".dragSpot").draggable(optionsDrag);

		});
        optionsDrop = {
            tolerance: "intersect",  
			greedy: true,	
            drop: function(event, ui) {
			event.preventDefault();	
			event.stopPropagation();
			if($(this).children().length > 0)
				{					
					var oldId = $(this).children().attr('id');
					var oldval = $(this).children().attr('value');						
					var num = oldId.split('_')[1];
//					console.log(num+" :: ");
					$('#dragSpot_'+num+'_td').append($(this).children());
					$('#gray_'+num).css('display','none');						
					$('#dragSpot_'+num+'_td').find('.ui-draggable').attr('dragged','false');
					$('#dragSpot_'+num+'_td').find('.ui-draggable').addClass('dragSpot');
				}
				
                $(this).html($(ui.draggable));
				$(this).children().css({'top':'0px','left':'0px','margin':'auto'})
				var ctId = $(this).children(); 
				ctId.removeClass('dragSpot');				
                AnsDropped[Number(DragID.replace("dragSpot_", ""))] = DragID;
                EnableSubmit(event);               
                set = 1;                
                $("#" + DragID).attr('dragged','true');
				
				setTimeout(function(){
					$('#gray_'+(DragID).split('_')[1]).show()//.css({'display':'block'})
					//ctId.removeClass('dragSpot');
					//ctId.addClass('dragSpot');
				},50)
					$(this).attr("dropped", 'true').attr('aria-label', $(this).text() );
					$('.dragSpot[dragged="true"]').removeAttr("tabindex").removeClass("tabindex");	
				
//				for(i=0;i<=$('.dropSpotAnsWrapper').size();i++){
//				//var new_height = $('#dropSpot_'+i).outerHeight()/scale
////				$('#dropSpot_'+i).css('height',$('#dropSpot_'+i).attr('height_cont')*scale+'px');
//				if( /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent) ) {
//					$('#dragSpot_'+i).attr('aria-hidden','true')	
//				}
//			}
//				console.log(DragID)
//				if( /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent) ) {

//				}
				
            },
            over: function(event, ui) {
                dropHover = true;				
				console.log($(this).attr('id'));
            },
            out: function(event, ui) {
                dropHover = false;
            }
        };
///////////////////////////////////////////////////////////////focus//////////////////////////////////
		$('.dummy_div').on('focus',function(){
//			;
			$('.tabindex').eq(2).focus();
				
//			$('#whole_container').removeAttr('role');
		})
		$('#direction_text').on('focus',function(){
			
//			$('.tabindex').eq(2).focus();
			setTimeout(function(){
				$('#dummy_no').hide();
			},100)
//			$('#direction_text').focus();
//			;
//			setTimeout(function(){
//				$('.tabindex').eq(0).focus();
//			},10);
//			$('#whole_container').removeAttr('role');
		})
		$('#dummy_1').on('focus',function(){
//			;
//			
			if($('#dummy_no').css('display')=='block'){
//				
				$('.tabindex').eq(2).focus();
			}else{
//				alert('2')
//				setTimeout()
				$('.tabindex').eq(3).focus();
				
			}
//			$('#whole_container').removeAttr('role');
		})
		$('#dummy_2').on('focus',function(){
			
//			$('#page_1 div').removeAttr('role')
			setTimeout(function(){
				$('.tabindex').eq(3).focus();
			},100)
		})
		$('#dummy_3').on('focus',function(){
//			$('.tabindex').blur();
//			$('#page_1 div').removeAttr('role')
			
//			$('#page_1 div').removeAttr('role')
//			setTimeout(function(){
				$('.tabindex').eq(3).focus();
//			},100)
		})
		$("#begin_dummy_1").focus(function() {
			$('.tabindex').eq(1).focus();
		});
		$("#begin_dummy_2").focus(function() {
			$('.tabindex').eq(1).focus();
		});
		
//		$('#page_1 div').focus(function() {
//			$('#page_1 div').removeAttr('role')
//		});
		
		
		
//		
//	$('#dummy_page_1').on('focus',function(){
////		;
//		setTimeout(function(){
//			$('.tabindex').eq(1).focus();
//		},10)
////		setTimeout(function(){
////		$('#direction_text').attr('role','application');
//			//$('.tabindex').eq(1).focus();
////		},1000)
//	})
//		$('#dummy_text_1').on('focus',function(){
//			//$('.tabindex').eq(2).focus();
////			setTimeout(function(){
////				$('#direction_text').removeAttr('role');
////			},20)
//		});
		
		
		
		
		
		
		
		
		
		/////////////////////////////////////////////////////////////////////////////////
		
		
       $(".begin").unbind().bind("click keydown touchend", function(event) {
            if (event.type == "keydown" && event.keyCode != 13 && event.keyCode != 32) {
                return true;
            }
            event.preventDefault();
            $(this).hide();
//		   	$('.page').hide();
//		   	$('#page_2').fadeIn('500')
            $(".check").addClass('disabled').removeClass('tabindex active');
            $(".check").css('pointer-events', 'none');
            //$(".check").show();//.attr('aria-hidden', 'true')
            $('.droppable .Rowcol .rowPart1').html('').addClass('dropSpotAnsWrapper tabindex').attr('aria-label','To select the box by using spacebar or enter key');
            $(".droppable .dropSpotAnsWrapper").droppable(optionsDrop);
            $(".footer").removeClass('hide');
            $(".rowPart1").unbind().bind('keydown', handleDragByKey);
//            setTimeout(function() {
//                if (event.type == "keydown") {
//                    $('.rowPart1[dropped="false"]').first().addClass('active').focus();
//                } else {
//                    $('.rowPart1[dropped="false"]').first().focus();
//                }
//            }, 100);
            set_tabindex();
		   resizeApp()
        });

        $(".check").unbind().bind("click keydown touchend", function(event) {
            if (event.type == "keydown" && event.keyCode != 13 && event.keyCode != 32) {
                return true;
            }
			//alert('1233')
            event.preventDefault();
			//console.log('alert')
            if (!$(this).hasClass('disabled')) {
                CheckAns();
            }

        });

        $(".EnableSubmit").unbind().bind("click keydown touchend", function(event) {
            if (event.type == "keydown" && event.keyCode != 13 && event.keyCode != 32) {
                return true;
            }
            event.preventDefault();
            CheckAns();
        });
        $(".tryagain").unbind().bind("click keydown touchend", function(event) {
            if (event.type == "keydown" && event.keyCode != 13 && event.keyCode != 32) {
                return true;
            }
            event.preventDefault();
            TryAgainPress(aResetElement);
        });
        $(".showAns").unbind().bind("click keydown touchend", function(event) {
            if (event.type == "keydown" && event.keyCode != 13 && event.keyCode != 32) {
                return true;
            }
            event.preventDefault();
            showAns()
        });
        $(".Reset").unbind().bind("click keydown touchend", function(event) {
            if (event.type == "keydown" && event.keyCode != 13 && event.keyCode != 32) {
                return true;
            }
            event.preventDefault();
            ResetFun();
        });
        $(".feedback > button").hide();
        $(".feedback > button.begin").show();
        setTimeout(function() {
            $(".ansCheck").show();
        }, 200);

        /*----------------header navigation--------*/
        $(".draggable .frame").each(function() {
            $(this).css('display', 'none')
            aSlidesArray.push($(this))
            nCount++;
        });
        $(".draggable .headerFrame0").show();
        fnCheckNextBack();
			$(".begin").hide();
            $(".check").addClass('disabled').removeClass('tabindex active');
            $(".check").css('pointer-events', 'none');
            //$(".check").show();//.attr('aria-hidden', 'true')
            $('.droppable .Rowcol .rowPart1').html('').addClass('dropSpotAnsWrapper ');
//		
            $(".droppable .dropSpotAnsWrapper").droppable(optionsDrop);
            $(".footer").removeClass('hide');
			set_tabindex();
//		
    }

    function ResetFun() {
		$('.page').hide();
//		$('#whole_container').hide()
		Correct = 0;
        animAllDivs();
        $(".EnableSubmit").off("click");
        $(".tryagain").off("click");
        $(".showAns").off("click");
        $(".Reset").off("click");
        $('.feedback_tick').removeClass('correct').hide();
        showAnswerArr = new Array();
        AnsDropped = new Array();
        TryAgain = 0;
        nSlideCounter = 0;
        aSlidesArray = new Array();
        nCount = 0;
        CorrectOptionArray;
        TempArray = new Array();
        tempArray1 = new Array();
        DragSet = "";
        DropSet = "";
        QuestionArray = "";
        $("title").empty();
        $(".dropSpot").empty();
        $(".containerTitle").empty();
        $(".questionText").empty();
        $(".direction").empty()//.hide();
        $(".directionText").empty();
        $(".droppable").empty();
        $(".draggable").empty();
        $(".footer").addClass('hide');
		$('.drop_container').css('background-color','#fff');
        oTable = "";
        oTable1 = "";
        init();
		set_tab=3;
		$("#show_table").html('');
		
		 $('.tabindex').eq(0).focus();
		 setTimeout(function() {
			 $(".begin").trigger('click');
		  }, 50);
		 setTimeout(function() {
//		 	 $('.page').hide();
//			 $('#whole_container').show();
		     $('#page_2').hide().fadeIn("250");
			 $('.check').hide().fadeIn("250")
			 set_tabindex();	
		 },100)
//			 $('#whole_container').fadeIn(700)
			
			 
//		$('#direction_text').removeAttr('role')
		
		
		
       // $(".mainContainerR").focus();
		
           // $('.rowPart2[dropped="false"]').first().focus();
          
//		$()
//	   $('#direction_text').focus();
		$('#page_1 div').removeAttr('role')
		
		
//		$('#dummy_no').show();
//		$('#dummy_1').focus();
		//$('#whole_container').removeAttr('role');
		$(".dropSpotAnsWrapper" ).each(function( index ) {
//			if($('#dropSpot_'+index).children().length==0){
//				$('#dropSpot_'+index).attr('dropped','false');
//				$('#dropSpot_'+index).attr('aria-label','To select the box by using spacebar or enter key');
//			}
			
		for(i=0;i<=OriginalAns.length;i++){
			$('#dropSpot_'+i).attr('dropped','false');
			$('#dropSpot_'+i).attr('aria-label',"To select the box by using spacebar or enter key");
		}
		});
    }
    var aResetElement = new Array();

    function TryAgainPress(arr) {
        $(".feedback > button").hide();
        setTimeout(function() {
            $('.feedback_tick').css('visibility','hidden');
            $(".frame").hide();
            EnableRightArrow();
            $(".frame:first").show();
            nSlideCounter = 0
            $(".check").addClass('disabled').removeClass('active tabindex').removeAttr('tabindex').show();
			$(".dragSpot").draggable({disabled: false});
        }, 200);
        for (var i = 0; i < arr.length; i++) {

            $(".draggable #" + arr[i] + "_td").append($("#" + arr[i]));
            $("#" + arr[i]).attr("tabindex", "1");
			//console.log(arr[i])
			
			//console.log(arr[i]);
            //console.log("  ", $("#" + arr[i]).attr("class"))
            $(".draggable .dragbox").removeAttr('style').css('position', 'relative');
			//console.log(i);
			
			if($('#dragSpot_'+arr[i].split('_')[1]+'_td').children().length==1){
				   		//alert('1');
				$('.grayed').hide();	
				$('#gray_'+arr[i].split('_')[1]).show();
//				$('#gray_'+arr[i].split('_')[1]).attr('aria-label',$('#dragSpot_'+arr[i].split('_')[1]+'_td').children().text());
//				alert(1)
				console.log($('#gray_'+arr[i]));
		   }else{
			    $('#gray_'+arr[i].split('_')[1]).hide();
//				$('#gray_'+arr[i].split('_')[1]).attr('aria-label','To select the box by using spacebar or enter key')
		   }
//			alert('1235')

        };
        setTimeout(function() {
            set_tabindex();
            $('.rowPart1[dropped="false"]').first().focus();
        }, 300);
		$(".rowPart1" ).each(function( index ) {
			if($('#dropSpot_'+index).text().length==0){
				$('#dropSpot_'+index).attr('dropped','false');
				$('#dropSpot_'+index).attr('aria-label','To select the box by using spacebar or enter key');
			}
		else{
				$('#dropSpot_'+index).attr('dropped','true');
				$('#dropSpot_'+index).attr('aria-label',$('#dropSpot_'+index).text());
				
			}
		});
		
    }

    function showAns() {

        animAllDivs();
        //console.log("showans", $(this));
        $('.droppable .dropSpotAnsWrapper').each(function() {
            $(this).html($(this).attr('value'));
            $(this).removeClass('dropSpotAnsWrapper');
			$('.feedback_tick').addClass('correct').css('visibility','visible')
        }); 
		
		
       
        $('.showAns').hide();
        $('.Reset').show().focus();
		for(i=0;i<=OriginalAns.length;i++){
			$('#dropSpot_'+i).attr('aria-label',OriginalAns[i]);
		}
		$('.drop_container').css('background-color','rgb(240, 240, 240)')
    }


    function showAnswer() {
        animAllDivs();
        for (var i = 0; i < OriginalAns.length; i++) {
            $(".dragSpot").each(function() {
                if ($(this).attr("value") == tempArray1[i][1]) {
                    $("#dropSpot" + i).append($(this));
                    $(this).css("background-color", "#A0C446").css({
                        "left": "20px",
                        "top": "7px",
                        "position": "relative"
                    });;
                    $(".dragSpot").draggable({
                        disabled: true
                    });
                }
            });
        };
        $(".feedback > button").hide();
        $(".Reset").show().focus();
    }
	
var Correct = 0;
    function CheckAns() {
		$('.grayed').show();
        aResetElement = [];
        TryAgain++;
        
        for (var i = 0; i < CorrectOptionArray.length; i++) {
            var tempVal = ($(".droppable #" + "dropSpot_" + i).attr("value"));
            var userVal = ($(".droppable #" + "dropSpot_" + i).children().attr("value"));

            //console.log("value::::::::::::::",tempVal, userVal)
            if (typeof userVal == 'undefined') continue;
			//console.log("dine::::",tempVal,userVal)
            if (tempVal == userVal) {
                Correct++;
                $(".droppable #" + "dropSpot_" + i).removeClass('dropSpotAnsWrapper');
				$('#drop_'+i).css('background-color','#f0f0f0')
                $(".droppable #" + "dropSpot_" + i).html(tempVal);
				$(".droppable #" + "dropSpot_" + i).droppable({disabled: true});
//				$(".droppable #" + "dropSpot_" + i)
            } else {
                var tId = $(".droppable #" + "dropSpot_" + i).children().attr("id");
                $(".droppable #" + "dropSpot_" + i).children().attr("dragged", "false").addClass('tabindex');
                $(".droppable #" + "dropSpot_" + i).attr("dropped", "false");
                $(".droppable #" + "tick_" + i).css('visibility','visible');
                aResetElement.push(tId);
				console.log(aResetElement)
                AnsDropped[$.inArray(tId, AnsDropped)] = "";
            }
			
        };
        //console.warn(TryAgain, " && ", Correct, " != ", CorrectOptionArray.length);
        $(".feedback > button").hide();
        if (TryAgain <= data[0].attempt && Correct != CorrectOptionArray.length) {
            setTimeout(function() {
                $(".tryagain").show().focus();
                set_tabindex();
            }, 200);
        } else if (Correct != CorrectOptionArray.length) {
            setTimeout(function() {
                $(".showAns").show().focus();
                $(".Reset").show()
                set_tabindex();
            }, 200);
        } else {
            setTimeout(function() {
                $(".Reset").show().focus();
                set_tabindex();
            }, 200);
        }
		setTimeout(function() {$(".dragSpot").draggable({disabled: true});}, 300);
		
    }

    function fnCheckNextBack() {
        if (nSlideCounter == 0) {
            DisableLeftArrow();
            EnableRightArrow();
        } else if (nSlideCounter == aSlidesArray.length - 1) {
            EnableLeftArrow();
            DisableRightArrow();
        } else {
            EnableLeftArrow();
            EnableRightArrow();
        }
        set_tabindex();
        $(".headerFrame" + nSlideCounter + " .dragSpot[dragged='false']").first().focus();
    }
    Player.returnPageArray = function() {
        return aSlidesArray;
    }

    function fnBack(event) {
        if (event.type == "keydown" && event.keyCode != 13 && event.keyCode != 32) {
			//alert(1);
            return true;
        	//alert("enter pressed")
        }
        	event.preventDefault();
		
		set_tabindex();
		
		$('#dragSpot_0').addClass('active').focus();
        if (nSlideCounter > 0) {
            nSlideCounter--;
            $(".frame").hide();
            $(".headerFrame" + nSlideCounter).show();
        } else {
            DisableLeftArrow();
        }
        fnCheckNextBack();
    }

    function fnNext(event) {
        if (event.type == "keydown" && event.keyCode != 13 && event.keyCode != 32) {
			//alert(2);
            return true;
        }
        event.preventDefault();
		set_tabindex();
		$('#dragSpot_3').addClass('active').focus();
        if (nSlideCounter < (nCount - 1)) {
            nSlideCounter++;
            EnableRightArrow();
            $(".frame").hide();
            $(".headerFrame" + nSlideCounter).show();
        } else {
            DisableRightArrow();
        }
        fnCheckNextBack()
    }

    function EnableLeftArrow() {
        $("#naviLeft").removeClass("leftArrowDisable").addClass("leftArrowEnable tabindex").css({
            "pointer-events": "auto",
            "cursor": "pointer"
        });
    }

    function DisableLeftArrow() {
        $("#naviLeft").removeClass("leftArrowEnable tabindex").addClass("leftArrowDisable").removeAttr('tabindex').css({
            "pointer-events": "none",
            "cursor": "default"
        });
    }

    function EnableRightArrow() {
        $("#naviRight").removeClass("rightArrowDisable").addClass("rightArrowEnable tabindex").css({
            "pointer-events": "auto",
            "cursor": "pointer"
        });
    }

    function DisableRightArrow() {
        $("#naviRight").removeClass("rightArrowEnable tabindex").addClass("rightArrowDisable").removeAttr('tabindex').css({
            "pointer-events": "none",
            "cursor": "default"
        });
    }

    function animAllDivs() {

        $('.activityQuestion').hide();
        $('.activityQuestion').fadeIn('slow');

        $('.quizeSection').hide();
        $('.quizeSection').fadeIn('slow');

        $('.feedback').hide();
        $('.feedback').fadeIn('slow');

    }

    var prevDroppedItem = '';

    function handleDragByKey(event) {
        if (event.type == "keydown" && event.keyCode != 13 && event.keyCode != 32) {
            return true;
			//;
        }
        	event.preventDefault();	
		//alert('2')dropSpotPosition
        prevDroppedItem = '';
        dropSpotPosition = $(this);
        prevDroppedItem = $(this).find('.dragSpot');
		//console.log($(this).find('.dragSpot').attr());
        $('.rowPart1[dropped="false"]').each(function(index) {
//			;
            $(".dragSpot[dragged='false']").unbind('keydown').bind('keydown', handleDropByKey);
        });
        $(".headerFrame" + nSlideCounter + " .dragSpot[dragged='false']").first().focus();
        //console.log()
        var count = 0;

        $('.headerFrame' + nSlideCounter + ' .dragSpot').each(function() {
            if ($(this).attr('class')) {
                count += 1;
            }
        });
         if (count == 0) {
            if($("#naviRight").hasClass('rightArrowDisable')){
                $('#naviLeft').focus();
            }
            else{
                $('#naviRight').focus();
            }
        }
		
		//alert('123')
    }
    function handleDropByKey(event) {
        if (event.type == "keydown" && event.keyCode != 13 && event.keyCode != 32) {
            return true;
			//;
			
        }
        	event.preventDefault(); 
//		if (!$('.draggable .dragSpotWrapper .dragSpot').length) {
//				alert('2222')
//				DisableLeftArrow();
//				DisableRightArrow();
//				$('.check').removeClass('disabled').addClass('tabindex').attr('aria-hidden', 'false');
//			}else{
//				fnCheckNextBack()
//		}
        if ($(dropSpotPosition).attr("dropped") != "true") {
//			;
            tempDragKey = $(this);
            tempkey = tempDragKey.parent();
            $(dropSpotPosition).html('');
            DragID = $(this).attr("id");
			$(dropSpotPosition).attr('aria-label','To select the box by using spacebar or enter key');
//			
            $(this).append($("#" + DragID));
            AnsDropped[Number(DragID.replace("dragSpot_", ""))] = DragID;
	
			if($('#dragSpot_'+DragID.split('_')[1]+'_td').children().length==1){
				$('#gray_'+DragID.split('_')[1]).hide();		   
		   }
			else{
			   $('#gray_'+DragID.split('_')[1]).show();
		   }

            $(dropSpotPosition).attr("dropped", 'true').attr('aria-label', $(this).html() );
            tempDragKey.position({ of: $(dropSpotPosition)
            });
            tempDragKey.appendTo($(dropSpotPosition));
            tempDragKey.css({
                "left": "0px",
                "top": "0px",
                "margin": "0px",
                "outline": "none"
            });
			
            $(this).attr("dragged", "true");
            $(this).attr("tabindex", -1).removeClass("tabindex");
            $(dropSpotPosition).removeAttr("tabindex");
           
            $('.rowPart1').css("outline", "none");
           
//			setTimeout(function(){
//				;
//			},1000)
            set_tabindex();
			setTimeout(function(){
				$('.rowPart1[dropped="false"]').first().focus();
			},10)
//			
            EnableSubmit(event);
			
//			$('.rowPart1[dropped="false"]').first().focus();
			
			//DisableLeftArrow();
			//DisableRightArrow();
//			if (!$('.draggable .dragSpotWrapper .dragSpot').length) {
//				alert('2222')
//				$('.check').removeClass('disabled').addClass('tabindex').attr('aria-hidden', 'false');
//			}else{
//				fnCheckNextBack()
//		}
			
        } else {
			console.log(prevDroppedItem.attr('id'))
            var id = prevDroppedItem.attr('id').split('_')[1];
            $('#dragSpot_' + id + '_td').append(prevDroppedItem);
            $(prevDroppedItem).attr("dragged", "false").addClass("tabindex");
            set_tabindex();
            tempDragKey = $(this);
            tempkey = tempDragKey.parent();
            $(dropSpotPosition).html('');
//			alert('12')
			$(dropSpotPosition).attr('aria-label','To select the box by using spacebar or enter key');
            DragID = $(this).attr("id");
            $(this).append($("#" + DragID));
			if($('#dragSpot_'+DragID.split('_')[1]+'_td').children().length==1){
				$('#gray_'+DragID.split('_')[1]).hide();		   
		    }
            AnsDropped[Number(DragID.replace("dragSpot_", ""))] = DragID;

			//$(this).removeAttr('tabindex');
            $(dropSpotPosition).attr("dropped", 'true').attr('aria-label', $(this).html());
            tempDragKey.position({ of: $(dropSpotPosition)
            });

            tempDragKey.appendTo($(dropSpotPosition));
            tempDragKey.css({
                "left": "0px",
                "top": "0px",
                "margin": "0px",
                "outline": "none"
            });
			if($('#dragSpot_'+tempDragKey.attr('id').split('_')[1]+'_td').children().length==2){
				$('#gray_'+tempDragKey.attr('id').split('_')[1]).hide();
			}else{
				$('#gray_'+tempDragKey.attr('id').split('_')[1]).show();
				
			}
			if($('#dragSpot_'+prevDroppedItem.attr('id').split('_')[1]+'_td').children().length==2){
				$('#gray_'+prevDroppedItem.attr('id').split('_')[1]).hide();
			}else{
				$('#gray_'+prevDroppedItem.attr('id').split('_')[1]).show();
				
			}
			 $(dropSpotPosition).attr("dropped", 'true').attr('aria-label', $(this).html());
            $(this).attr("dragged", "true");
//            $(this).attr("tabindex", -1).removeClass("tabindex");
//            $(dropSpotPosition).removeAttr("tabindex");
            $('.rowPart1').css("outline", "none");
            $('.rowPart1[dropped="false"]').first().focus();
            EnableSubmit(event);
            set_tabindex();
		
        }
		
    }
	
	
	function set_tabindex(){
		$('.tabindex').removeClass('tabindex').removeAttr('tabindex');
	   
		if(set_tab==1){			
			$('#begin_dummy_1').addClass('tabindex');
			$('.slideImgBegin').addClass('tabindex');
			$('#begin_btn').addClass('tabindex');
			$('#begin_dummy_2').addClass('tabindex');
		}else if(set_tab==2){
			$('#dummy_1').addClass('tabindex');
			$('.dummy_div').addClass('tabindex');
			$('#dummy_no').addClass('tabindex');
			$('#direction_text').addClass('tabindex');
			$('.col').addClass('tabindex');
			$('.rowPart1').addClass('tabindex');
			$('.rowPart2').addClass('tabindex');
			$('.rowPart3').addClass('tabindex');
			$('#next_btn').addClass('tabindex');
			$('.image_table').addClass('tabindex');
			$('#dummy_2').addClass('tabindex');
		}else if(set_tab==3){
//			alert('444')
			$('#dummy_1').addClass('tabindex');
			$('.dummy_div').addClass('tabindex');
			$('#dummy_no').addClass('tabindex');
		    $('#direction_text').addClass('tabindex');
			$('.col').addClass('tabindex');
			$('.rowPart1').addClass('tabindex');
			$('.rowPart2').addClass('tabindex');
			$('.rowPart3').addClass('tabindex');				
			$('.dragSpot').addClass('tabindex');
			$('.check').addClass('tabindex');
			$('.tryagain').addClass('tabindex');
			$('.showAns').addClass('tabindex');
			$('.Reset').addClass('tabindex');
			$('.image_table').addClass('tabindex');
			$('#dummy_3').addClass('tabindex');
		 }
		 var tab_index = 1;
 		$(".tabindex:visible").each(function(index) {
			 
            $(this).attr("tabindex", 0);
            tab_index++;
        });
		$('.dragSpot[dragged="true"]').removeAttr("tabindex").removeClass("tabindex");
	}
		if( /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent) ) {
			$('#dummy_1,#dummy_no').html('').attr('aria-hidden','true');
			$('#direction_text').attr('role','text');
			$('.rowPart1,.rowPart2,.rowPart3').attr('role','text');
			$('#whole_container').removeAttr('role');
//			
		}
})(App = App || {})
var App;