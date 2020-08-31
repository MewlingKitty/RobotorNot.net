 
 var fm4a = 0;
 var fm4b = 0;
 
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
          url: 'https://robotornot.net/wp-content/plugins/utility/fetch.php',
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
		  beforeSend: function() { jQuery(divname1).html('<img class=\"fmloading\" src="https://robotornot.net/wp-content/plugins/utility/temp/' + 'loading.gif' + '">');
			jQuery(divname2).html('<img class=\"fmloading\" src="https://robotornot.net/wp-content/plugins/utility/temp/' + 'loading.gif' + '">'); }
     });
	 
 }

 
 
jQuery(document).ready(function($) { initPhotoDivs('#utilitystdout3a','#utilitystdout4a',0,0,-1); 


$('#utilitystdout3a').click( function () {   

 // Clicked on left, so right lost
   initPhotoDivs('#utilitystdout3a','#utilitystdout4a',rightId,leftId,0); 
   
   } ); 

   $('#utilityDraw3a').click( function () {   

 // Draw
   initPhotoDivs('#utilitystdout3a','#utilitystdout4a',rightId,leftId,0.5); 
   
   } ); 

   $('#utilityDraw3b').click( function () {   

 // Both lost
   initPhotoDivs('#utilitystdout3a','#utilitystdout4a',rightId,leftId,0); 
   
   } ); 

$('#utilitystdout4a').click( function () { 
// Clicked on right, so right won
initPhotoDivs('#utilitystdout3a','#utilitystdout4a',rightId,leftId,1); } ); 

});