//jQuery time
var z = 0;
var m = 0;
var p = 0;

$(window).on('load',function(){
	$('.loader').addClass('hidden');
});

$(document).ready(function(){
    //custom variable...
    
	
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function(){
	console.log("next button clicked!");
	if($("input[name='email']").val() === '' || $("input[name='email']").val() == null){
		$("input[name='email']").focus();
		alert('fill the email');

	}
	else{
	if(animating) return false;
	animating = true;

	current_fs = $(this).parent();
	next_fs = $(this).parent().next();

	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

	//show the next fieldset
	next_fs.show();
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'transform': 'scale('+scale+')'});
			next_fs.css({'left': left, 'opacity': opacity});
		},
		duration: 800,
		complete: function(){
			current_fs.hide();
			animating = false;
		},
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
}
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;

	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();

	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

	//show the previous fieldset
	previous_fs.show();
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		},
		duration: 800,
		complete: function(){
			current_fs.hide();
			animating = false;
		},
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});




	//For Template..
	$('.click-c').click(function(){
		  $('.come_soon').removeClass('come-view');
          $('.template').addClass('template-view');
          $('.status').addClass('status-view');
              $('#home').css({"background-color":"#3498DB"});
            $('#cover').css({"background-color":"#3498DB"});
            $('#resume').css({"background-color":"#154360"});
            $('#cv').css({"background-color":"#3498DB"});
         //for status
         if(p === 0){
           $('#x12').removeClass('activ');
           $('.x12').css("color","#3498DB");
           m = 0;
           p=1;
         }
    });

	//For Status..
	$('.hom').click(function(){
		$('.template').removeClass('template-view');
		$('.status').removeClass('status-view');
		$('.come_soon').removeClass('come-view');
		    $('#home').css({"background-color":"#154360"});
            $('#cover').css({"background-color":"#3498DB"});
            $('#resume').css({"background-color":"#3498DB"});
            $('#cv').css({"background-color":"#3498DB"});
    $('.ent_form').removeClass('ent-view');
    p=0;
	});

  //For Form..
    $('.clc').click(function(){
	    $('.ent_form').addClass('ent-view');
      if(m === 0){
         $('#x12').addClass('activ');
         $('.x12').css("color","#27AE60");
        m = 1;
      }
    })

	//Status..
	var x = 'x';
		var y = 1;

		$('.progress').click(function() {
			 if(z === 0){
        //1. select the div element..
          z = z+1;
          x = x+y;
          console.log(x);
          if(y <= 3){
             y = parseInt(y)+1;
            }else{
              y = 1;
              x = 'x';
            }

        //2. add the active class to it...
          $('#'+x).addClass('activ');
          $('.'+x).css("color","#27AE60");
       }
		});

   
  //For back of coming soon...
   $('.bs').click(function(){
		 $('.come_soon').removeClass('come-view');
		    $('#home').css({"background-color":"#3498DB"});
            $('#cover').css({"background-color":"#3498DB"});
            $('#resume').css({"background-color":"#154360"});
            $('#cv').css({"background-color":"#3498DB"});
	 })


	//Comming Soon...
    $('.click-cs').click(function(){
		$('.come_soon').addClass('come-view');
		//$('.status').addClass('status-view');
	});
	
});




	//Top Navigation..
	function chan(id){
		if(id == 'home'){
			$('#home').css({"background-color":"#154360"});
			$('#cover').css({"background-color":"#3498DB"});
			$('#resume').css({"background-color":"#3498DB"});
			$('#cv').css({"background-color":"#3498DB"});
		}else if(id == 'cover'){
			$('#cover').css({"background-color":"#154360"});
			$('#home').css({"background-color":"#3498DB"});
			$('#resume').css({"background-color":"#3498DB"});
			$('#cv').css({"background-color":"#3498DB"});
		}else if(id == 'resume'){
			$('#home').css({"background-color":"#3498DB"});
			$('#cover').css({"background-color":"#3498DB"});
			$('#resume').css({"background-color":"#154360"});
			$('#cv').css({"background-color":"#3498DB"});
		}
		else{
			$('#home').css({"background-color":"#3498DB"});
			$('#cover').css({"background-color":"#3498DB"});
			$('#resume').css({"background-color":"#3498DB"});
			$('#cv').css({"background-color":"#154360"});
		}
	}
	
//Back button to select Template...
function but(){
	    console.log("back button!!");
		$('.ent_form').removeClass('ent-view');
		$('#x12').removeClass('activ');
        $('.x12').css("color","#3498DB");
		m=0;
}

//Submit form...
function btn_sub(){
	 console.log("In Main.js "+temp_num);
    	// console.log('we are inside main script!!');
		//$("#sec").load("/temp");
		var nm = $('#Name').val();
		var em = $('#Email').val();
		var ph = $('#Phone').val();
		var ad = $('#Address').val();
		var temp_n = temp_num;
		$.post("/temp",
		{
			name: nm,
		 	email: em,
			phone: ph,
			add: ad,
			temp_number: temp_n
		},
		function(data, status){
			//alert("Data: " + data + "\nStatus: " + status);
			
			$("#sec").html(data);
		});
}	
	


//Back button to form...
	function back_but_form(){
		console.log("Its running!!");
		$.post("/temp",
		{temp_number: 0},
		function(data, status){
			//alert("Data: " + data + "\nStatus: " + status);
			$('#sec').html("");
			$("#sec").html(data);
		});
	}

	
	
	
	