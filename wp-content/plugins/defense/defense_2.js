 
 var fm2a = 0;
 var fm2b = 0;
 
 var rightId = 0;
 var leftId = 0;
 var score = 0;
 
 var prevObj = 0;
 
 function initPhotoDivs(divname1,divname2,ri,li,score)
 {
 
	if(score == 0)
	{
		// left won
		//jQuery("#fmwinner").html('<img width="100" src="'+prevObj.left+'">');
	}
	else if(score == 1)
	{
		// right won
		//jQuery("#fmwinner").html('<img width="100" src="'+prevObj.right+'">');
	}
	else if(score == 0.5)
	{
		// Tie
	}
 
	 
	jQuery.ajax({
	     data:{
               'rid':ri,
			   'lid':li,
			   'score':score
			   },
          url: 'https://robotornot.net/wp-content/plugins/defense/fetch.php',
          success:function(data1){
			objh = jQuery.parseJSON(data1);
			prevObj = objh; 
			rightId = objh.rightid;
			leftId = objh.leftid;
			jQuery(divname1).html('<img class=\"fmimage\" width = "220" height = "330" src="' + objh.left + '">');
			jQuery(divname2).html('<img class=\"fmimage\" width = "220" height = "330" src="' + objh.right + '">');
		 },
          error: function(errorThrown){
               alert('error');
               console.log(errorThrown);
          },
		  beforeSend: function() { jQuery(divname1).html('<img class=\"fmloading\" src="https://robotornot.net/wp-content/plugins/defense/temp/' + 'loading.gif' + '">');
			jQuery(divname2).html('<img class=\"fmloading\" src="https://robotornot.net/wp-content/plugins/defense/temp/' + 'loading.gif' + '">'); }
     });
	 
 }

 
 
jQuery(document).ready(function($) { initPhotoDivs('#defensestdout1a','#defensestdout2a',0,0,-1); 


$('#defensestdout1a').click( function () {   

 // Clicked on left, so right lost
   initPhotoDivs('#defensestdout1a','#defensestdout2a',rightId,leftId,0); 
   
   } ); 

   $('#defenseDraw1a').click( function () {   

 // Draw
   initPhotoDivs('#defensestdout1a','#defensestdout2a',rightId,leftId,0.5); 
   
   } ); 

   $('#defenseDraw1b').click( function () {   

 // Both lost
   initPhotoDivs('#defensestdout1a','#defensestdout2a',rightId,leftId,0); 
   
   } ); 

$('#defensestdout2a').click( function () { 
// Clicked on right, so right won
initPhotoDivs('#defensestdout1a','#defensestdout2a',rightId,leftId,1); } ); 

});