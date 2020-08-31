<?php
/*
Plugin Name: Offense Elo
Plugin URI: https://robotornot.net
Description: Offense Elo for Wordpress
Version: 1
Author: 2512
Author URI: https://robotornot.net
*/

$offense_js_num = 0;
define( 'offense_PATH', plugin_dir_path(__FILE__) );


function offense_admin_scripts() {
	wp_enqueue_script('media-upload');
	wp_enqueue_script('thickbox');
	wp_register_script('fm-upload', WP_PLUGIN_URL.'/offense/fmup.js', array('jquery','media-upload','thickbox'));
	wp_enqueue_script('fm-upload');
}

function offense_admin_styles() {
	wp_enqueue_style('thickbox');
}

if (isset($_GET['page']) && $_GET['page'] == 'fmAdd') {
	add_action('admin_print_scripts', 'offense_admin_scripts');
	add_action('admin_print_styles', 'offense_admin_styles');
}


add_action('admin_menu', 'registeroffenseMenuOption');

function offense_check_for_admin()
{
	if (!current_user_can('administrator'))
	wp_die(__( 'You do not have sufficient permissions to manage options for this site.'));
}


function registeroffenseMenuOption() {
	add_menu_page('offense', 'offense', 'administrator', 'offense.php', 'offenseReport',   plugins_url('offense/images/icon.png'), 75);
	
}

add_action('admin_menu', 'registeroffenseSubMenuOpts');

function registeroffenseSubMenuOpts() {
	add_submenu_page( 'offense.php', 'Add Images', 'Add Images', 'administrator', 'OAdd', 'offenseAddImages' ); 
	add_submenu_page( 'offense.php', 'Delete Images', 'Delete Images', 'administrator', 'ODel', 'offenseDelImages' ); 
	add_submenu_page( 'offense.php', 'Settings', 'Settings', 'administrator', 'OSettings', 'offenseSettings' ); 
	add_submenu_page( 'offense.php', 'CSS Settings', 'CSS Settings', 'administrator', 'OCssSettings', 'offenseCssSettings' ); 
}


function offenseCssSettings($force = 0)
{

	offense_check_for_admin();

	$tplPath = plugin_dir_path(__FILE__). "offensecss.tpl";
	$dest = plugin_dir_path(__FILE__). "offensestyle.css";
	$tplc = $tplContents = file_get_contents($tplPath);
	
	print "<div class=\"wrap\"><h2>Settings</h2>";
	
	if(isset($_POST['setcss']) || $force == 1)
	{
		$swidth = offenseGetOption('offense_image_width');
		$sheight = offenseGetOption('offense_image_height');
		
		$healthy = array("__width__", "__height__", "__width_margin__","__table_width__", "__width_by_2__", "__height_by_2__");
		$yummy   = array($swidth, $sheight,($swidth + 4), (($swidth * 2)) , ($swidth)/2 , ($sheight)/2 );
		
		if($force == 0)
		{
			$fh1 = fopen($tplPath,"w");
			fputs($fh1, $_POST['csstpl']);
			fclose($fh1);
			$tplContents = str_replace($healthy, $yummy, $_POST['csstpl']);
		}
		else
		{
			$tplContents = str_replace($healthy, $yummy, $tplContents);
		}		
		
		$fh = fopen($dest,"w");
		
		fputs($fh,$tplContents);
		
		fclose($fh);
		
		if($force == 1)
			return;

	}
	
	print "Touch these only if you know what you are doing!<br>Here, __width__ and __height__ are values that are set in general settings (Link above this in the settings menu).<br>They will be programmatically replaced.<br>For the default design to work, do not ever replace these place holders<br>";
	
	print "<form method=\"post\"><textarea rows=\"25\" cols=\"120\" name=\"csstpl\">$tplc</textarea><br><input type=\"submit\" name=\"setcss\"></form>";
	
	print "</div>";

}

function offenseSetOption($optname,$value)
{
	global $wpdb;
	$optionsTable = $wpdb->prefix."options";
	
	$wpdb->query($wpdb->prepare("delete from $optionsTable where `option_name` = %s",$optname));
	$wpdb->insert( $optionsTable,array( 'option_name' => $optname,'option_value' => $value),array('%s','%s'));
}

function offenseGetOption($optname)
{
	global $wpdb;
	$optionsTable = $wpdb->prefix."options";

	$res = $wpdb->get_row($wpdb->prepare("select * from $optionsTable where `option_name` = %s",$optname));
	return $res->option_value;
}


function offenseSettings()
{
	offense_check_for_admin();
	print "<div class=\"wrap\"><h2>Settings</h2>";
	$chk ='';
	$warnImg = plugins_url()."/offense/images/warning.png";
	//offenseSetOption('offense_append_to_comments',1);

	$settingsVariableList = array(
		array("desc" => "Width of each Image", "name" => "offense_image_width", "type" => "text"),
		array("desc" => "Height of each Image", "name" => "offense_image_height", "type" => "text"),
		array("desc" => "Resize Images to fit box", "name" => "offense_image_fill_box", "type" => "check"),
		array("desc" => "Text for Like both images button", "name" => "offense_draw_text", "type" => "text"),
		array("desc" => "Text for Do not like both button", "name" => "offense_lose_text", "type" => "text")
	);

	// var_dump($_POST);
	
	if(!empty($_POST['seed']))
	{
		print "Settings Saved";

		foreach($settingsVariableList as $optionArray)
		{
			if($optionArray['type'] == "check")
			{
				if(!empty($_POST[$optionArray['name']]))
					offenseSetOption($optionArray['name'],1);
				else
					offenseSetOption($optionArray['name'],0);
			}
			
			if($optionArray['type'] == "text")
			{
				if(!empty($_POST[$optionArray['name']]))
					offenseSetOption($optionArray['name'],$_POST[$optionArray['name']]);
			}

		}
		
		offenseCssSettings(1);
	}

	print '<form action="" method="post"><br><br>';

	print "<table width=\"50%\">";
	foreach($settingsVariableList as $optionArray)
	{
		if($optionArray['type'] == "check" )
		{
			if(offenseGetOption($optionArray['name']))
			{
				$chk = 'checked="checked"';
			}
			else
				$chk = '';

			print 	"<tr><td>{$optionArray['desc']}</td><td><input type=\"checkbox\" $chk name=\"{$optionArray['name']}\"></td></tr>";
		}

		if($optionArray['type'] == "info")
		{
			print "<tr><td>".$optionArray['desc']."</td></tr>";
		}


		if($optionArray['type'] == "text" )
		{
			$prevValue = offenseGetOption($optionArray['name']);
			print 	"<tr><td>{$optionArray['desc']}</td><td><input type=\"text\" $chk name=\"{$optionArray['name']}\" value=\"$prevValue\"></td></tr>";
		}

	}
?>
	<input type="hidden" name="seed" value="1" />
	<tr><td><input name="Submit" type="submit" value="Save Changes" /></td></tr>
</table>
</form></div>

<?php	
			
}

function offenseAddImages()
{

	offense_check_for_admin();
	global $wpdb;
	
	$fmtable = $wpdb->prefix . "offense_images";
	
	$skipped = array();
	$added = array();
	
	print "<h2>Add Images</h2>";
	if(isset($_POST['dir_name']) && $_POST['dir_name'] != '')
	{
		$imagesDir = plugin_dir_path(__FILE__). "data/".$_POST['dir_name'];
		if(is_dir($imagesDir))
		{
			print "Processing ".$_POST['dir_name']."<br>";
			if ($handle = opendir($imagesDir)) 
			{
				$i = 0;
				$entry = array();
				while (false !== ($entry[$i] = readdir($handle))) 
				{
					if($entry[$i] == '.' || $entry[$i] == '..')
						continue;

					$ext = strtolower(pathinfo($entry[$i], PATHINFO_EXTENSION));
					$allowed = array("php","jpg","gif","bmp","jpeg");
					$alflag = 0;
					
					foreach($allowed as $al)
					{
						if($ext == $al)
							$alflag = 1;
					}
					
					if($alflag == 0)
						continue;			

					
					$fileName = $imagesDir."/".$entry[$i];
					$fileHash = md5_file($fileName);
					
					$url = plugins_url()."/offense/data/".$_POST['dir_name']."/".$entry[$i];
					
					if($wpdb->get_row("select * from $fmtable where `hash` = '$fileHash'"))
					{
						array_push($skipped,$fileName);
					}
					else
					{
						
						$wpdb->insert( $fmtable,array( 'url' => $url,'rating' => 1200, 'hash' => $fileHash ),array('%s','%d', '%s'));
						array_push($added,$fileName);
					}
					
					$i++;
				}
				
				closedir($handle);			
				
				print "<h2>Added</h2>";
				foreach($added as $a)
				{
					print "$a<br>";
				}

				print "<h2>Skipped</h2>";
				foreach($skipped as $s)
				{
					print "$s<br>";
				}
				
		}
		else
		{
			print "Directory Does not exist!<br>";
		}
		}
	}
	
	$infoimurl = plugins_url()."/offense/images/info.png";
	
	?>
	
<div id="poststuff" class="metabox-holder" style="width:500px;">
<div id="post-body">
    <div id="post-body-content">
        <div id="namediv" class="stuffbox">
            <h3><label for="link_name">Add Images in Bulk</label></h3>
	    <div class="inside">
<table>
<form action="" method="post">
<tr>
<td>
<input type="text" size="16" name="dir_name" value="" />
</td>
<td>
<input name="dir_submit" type="submit" value="Add Directory" />
</td>
</tr>
<tr><td rowspan="1" colspan="2"><img src="<?php print $infoimurl; ?>"> Refer documentation for more details</b><br><br>Quick Help: Directory should be relative to offense/data/<br>E.g. If you upload a folder called temp to offense/data, then you enter temp<br>If you uploaded a folder called subtemp to temp, you enter temp/subtemp</td></tr>
</form>
</table>
            </div>
        </div>
    </div>
</div>
</div>

	<?php
	
	//print "Directory name. <br><b>Refer documentation for more details</b><br><br>Quick Help: Directory should be relative to offense/data/<br>E.g. If you upload a folder called temp to offense/data, then you enter temp<br>If you uploaded a folder called subtemp to temp, you enter temp/subtemp<br>";
	//print "<form method=\"post\" ><input type=\"text\" name=\"dir_name\"><input type=\"submit\" name=\"dir_submit\"></form>";

		if(isset($_POST['add_badge']) && $_POST['fm_upload_image'] != '')
		{
			$fileHash = md5_file($_POST['fm_upload_image']);
			
					if($wpdb->get_row("select * from $fmtable where `hash` = '$fileHash'"))
					{
						print "<h2>Image you uploaded already exists!</h2>";
					}
					else
					{						
						print "<br>Successfully added Image to database!<br>";
						$wpdb->insert( $fmtable,array( 'url' => $_POST['fm_upload_image'],'rating' => 1200, 'hash' => $fileHash ),array('%s','%d', '%s'));					
					}			
		}
	?>

	<br>

<div id="poststuff" class="metabox-holder" style="width:500px;">
<div id="post-body">
    <div id="post-body-content">
        <div id="namediv" class="stuffbox">
            <h3><label for="link_name">Manually Add New Image</label></h3>
	    <div class="inside">
<table>
<form action="" method="post">
<tr>
<td>
<input id="fm_upload_image" type="text" size="16" name="fm_upload_image" value="" />
</td>
<td>
<input id="fm_upload_image_button" type="button" value="Upload Image" />
</td>
</tr>
<tr><td><input id="save_button" type="submit" value="Add Image" name="add_badge"/></td></tr>
</form>
</table>
            </div>
        </div>
    </div>
</div>
</div>

	
	<?php
		
}

function offenseDelImages()
{

	offense_check_for_admin();

	global $wpdb;
	$fmtable = $wpdb->prefix . "offense_images";
	
	?>
	
	<div id="poststuff" class="metabox-holder" style="width:800px;">
<div id="post-body">
    <div id="post-body-content">
        <div id="namediv" class="stuffbox">
            <h3><label for="link_name">Select Images to Delete</label></h3>
	    <div class="inside">
	
	<?php
	
	if(!isset($_POST['delsubmit']) && !isset($_POST['fmconfirmdel']))
	{
		$topImages = $wpdb->get_results("select * from $fmtable where 1");
		
		print "<form method=\"post\"><table><tr><td>";
		
			$k = 0;
	print "<table>";
	foreach($topImages as $topImage)
	{
		if($k % 6 == 0)
			print "<tr>";
			
		print "<td><table height=\"150\" ><tr><td height=\"130\"><img src=\"{$topImage->url}\" height=\"130\" width=\"100\" ></td><tr><td><input type=\"checkbox\" name=\"{$topImage->id}\" ></td></tr></table></td>";		
		
		$k++;
		
		if($k % 6 == 0)
			print "</tr>";

	}
	print "</table>";
	
	
		print "<br><input type=\"submit\" value=\"Delete\" name=\"delsubmit\">";
		print "</form>";
		
		?>
		
		            </div>
        </div>
    </div>
</div>
</div>

		
		<?php
	}
	else if(isset($_POST['fmconfirmdel']))
	{
		$arr = explode(",",$_POST['fmids']);
		
		foreach($arr as $av)
		{
			if($av == -1)
				break;
				
			print "Deleting $av ..<br>";
			$wpdb->query($wpdb->prepare("delete from $fmtable where `id` = %d",$av));
		}
		
		print "Done!<br>";
		
	}
	else if(isset($_POST['delsubmit']))
	{
		$idstr = '';
		foreach($_POST as $key => $value)
		{
			if($value == 'on')
			{
				$idstr .= "$key,";
			}
		}
		
		$idstr .= "-1";
		print "<h2>Are you sure you want to delete?</h2>";
		print "<form method=\"post\"><input type=\"hidden\" name=\"fmids\" value=\"$idstr\"><input type=\"submit\" value=\"Yes!\" name=\"fmconfirmdel\"></form>";		
	}
	else
	{
	}

}

function offense_hof( $atts , $content = null){ 

	global $wpdb;
	$fmtable = $wpdb->prefix . "offense_images";;
	
	$topImages = $wpdb->get_results("select * from $fmtable where 1 order by `rating` DESC limit 0,20");
	
	$k = 0;
	print "<table>";
	foreach($topImages as $topImage)
	{
		if($k % 6 == 0)
			print "<tr>";
			
		//print "<td><table><tr><td><img src=\"{$topImage->url}\" width=\"100\" ></td></tr><tr><td>{$topImage->rating}</td></tr></table></td>";		
		
		print "<td><table><tr><td><img src=\"{$topImage->url}\" width=\"100\" ></td></tr></table></td>";		
		
		$k++;
		
		if($k % 6 == 0)
			print "</tr>";

	}
	print "</table>";

}


function offenseReport()
{

	offense_check_for_admin();
	global $wpdb;
	$fmtable = $wpdb->prefix . "offense_images";;
	
	print "<h2>offense Report</h2>";
	$topImages = $wpdb->get_results("select * from $fmtable where 1 order by `rating` DESC limit 0,20");

?>

	<div id="poststuff" class="metabox-holder" style="width:800px;">
<div id="post-body">
    <div id="post-body-content">
        <div id="namediv" class="stuffbox">
            <h3><label for="link_name">Top 20 Performing Photos</label></h3>
	    <div class="inside">
<?php	
	$k = 0;
	print "<table>";
	foreach($topImages as $topImage)
	{
		if($k % 6 == 0)
			print "<tr>";
			
		print "<td><table><tr><td><a href=\"{$topImage->url}\" target=\"_blank\"><img src=\"{$topImage->url}\" height=\"130\" width=\"100\" ></a></td></tr><tr><td>{$topImage->rating}</td></tr></table></td>";		
		
		$k++;
		
		if($k % 6 == 0)
			print "</tr>";

	}
	print "</table>";
	
	?>
	
	</div>
        </div>
    </div>
</div>
</div>
	
	<?php
}

function offense_page_scripts() {
	wp_enqueue_script('jquery');
}

function offense_parse( $atts , $content = null){
 global $offense_js_num;
 $offense_js_num++;
 
  
 $outDiv1 = "offensestdout{$offense_js_num}a";
 $drawDiv1 = "offenseDraw{$offense_js_num}a";
 $drawDiv2 = "offenseDraw{$offense_js_num}b";
 
 //print "<table><tr><td><div id=\"$drawDiv1\" class=\"fmdraw\">Both!</div></td><td><div id=\"$drawDiv2\" class=\"fmnone\">Neither</div></td></tr></table>";
 //print "<div id=\"$drawDiv1\" class=\"fmdraw\">Both!</div><div id=\"$drawDiv2\" class=\"fmnone\">Neither</div><br>";
 
 $lt = offenseGetOption('offense_draw_text');
 $hb = offenseGetOption('offense_lose_text');
 
 $lt = $lt ==''? "Like Both!" : $lt;
 $hb = $hb ==''? "Hate Both" : $hb;
  
 $k1 =  "<button id=\"$drawDiv1\" class=\"fmdraw\">$lt</button>";
 $k2 = " <button id=\"$drawDiv2\" class=\"fmdraw\">$hb</button><br>";
 
 $pt = 0;
 
 if($pt) print "<table width=\"300px\" class=\"fmt\" ><tr><td>";
  print "<div id=\"fmwrap\" >";
 
 /* print "<div style=\"width: 500px;\" id=\"fmwinner\" >";
 print '<div style="float:left;"><img width="75" src="http://localhost/wordpress/wp-content/plugins/offense/data/actors/Johansson_scarlett.jpg"></div><div style="float: right;">Stat1<br>stat2</div>';
 print "</div>"; */
 print "<div style=\"clear:both;\"></div>";
   print "<div id=\"$outDiv1\" class=\"fml\"></div>";
 $outDiv1 = "#offensestdout{$offense_js_num}a";
 $drawDiv1 = "#offenseDraw{$offense_js_num}a";
 $drawDiv2 = "#offenseDraw{$offense_js_num}b";
 
 $vsimg = plugins_url()."/offense/images/vs.png";
 if($pt) print "<td><img src=\"$vsimg\" ></td>";
 if($pt)  print "</td><td>";
  $offense_js_num++;
 $outDiv2 = "offensestdout{$offense_js_num}a";
 print "<div id=\"$outDiv2\" class=\"fmr\"></div>";
 $outDiv2 = "#offensestdout{$offense_js_num}a";
 if($pt)  print "</td></tr></table>";
print "<div style=\"clear:both;\"></div>";
 print "<div id=\"fmbuttonwrap\">";
 print $k1;
 print $k2;
 print "</div>";
 
  print "</div>"; // end fmwrap
 
 $fh = fopen(offense_PATH."offense_{$offense_js_num}.js","w");
 if(!$fh)
 {
	print "Unable to open file for offense";
	return;
 }
 
 //$openJs = "jQuery(document).ready(function($) { $('$outDiv1').click( function () {alert('1');} ); $('$outDiv2').click( function () {alert('2');} ); });";
 $fmlid = "fm{$offense_js_num}a";
 $fmrid = "fm{$offense_js_num}b";
 
 $imr = '';
 $imrw = offenseGetOption('offense_image_width');
 $imrh = offenseGetOption('offense_image_height');
 
 if(offenseGetOption('offense_image_fill_box'))
 {
	$imr = "width = \"$imrw\" height = \"$imrh\"";
 }
 
 
 $fetchPhotoLink = plugins_url('offense/fetch.php');
 $fetchPhotoBase = plugins_url('offense/temp/');
 $openJs = <<<DE
 
 var $fmlid = 0;
 var $fmrid = 0;
 
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
          url: '$fetchPhotoLink',
          success:function(data1){
			objh = jQuery.parseJSON(data1);
			prevObj = objh; 
			rightId = objh.rightid;
			leftId = objh.leftid;
			jQuery(divname1).html('<img class=\"fmimage\" $imr src="' + objh.left + '">');
			jQuery(divname2).html('<img class=\"fmimage\" $imr src="' + objh.right + '">');
		 },
          error: function(errorThrown){
               alert('error');
               console.log(errorThrown);
          },
		  beforeSend: function() { jQuery(divname1).html('<img class=\"fmloading\" src="$fetchPhotoBase' + 'loading.gif' + '">');
			jQuery(divname2).html('<img class=\"fmloading\" src="$fetchPhotoBase' + 'loading.gif' + '">'); }
     });
	 
 }

 
 
jQuery(document).ready(function($) { initPhotoDivs('$outDiv1','$outDiv2',0,0,-1); 


$('$outDiv1').click( function () {   

 // Clicked on left, so right lost
   initPhotoDivs('$outDiv1','$outDiv2',rightId,leftId,0); 
   
   } ); 

   $('$drawDiv1').click( function () {   

 // Draw
   initPhotoDivs('$outDiv1','$outDiv2',rightId,leftId,0.5); 
   
   } ); 

   $('$drawDiv2').click( function () {   

 // Both lost
   initPhotoDivs('$outDiv1','$outDiv2',rightId,leftId,0); 
   
   } ); 

$('$outDiv2').click( function () { 
// Clicked on right, so right won
initPhotoDivs('$outDiv1','$outDiv2',rightId,leftId,1); } ); 

});
DE;

 fprintf($fh,$openJs);
 
 fclose($fh);
	
 wp_register_script("offense_{$offense_js_num}", WP_PLUGIN_URL."/offense/offense_{$offense_js_num}.js", array('jquery'));
 wp_enqueue_script("offense_{$offense_js_num}");
 
}
add_shortcode( 'offense', 'offense_parse' );

add_shortcode( 'offense_hall_of_fame', 'offense_hof' );

add_action('wp_head', 'offense_page_scripts');

add_action( 'wp_enqueue_scripts', 'add_offense_stylesheet' );

    /**
     * Enqueue plugin style-file
     */
    function add_offense_stylesheet() {
        // Respects SSL, Style.css is relative to the current file
        wp_register_style( 'offense-style', plugins_url('offensestyle.css', __FILE__) );
        wp_enqueue_style( 'offense-style' );
    }
	
function offense_install() 
{

	require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
	// Create tables
	global $wpdb;
	
$fmprefix = $wpdb->prefix;
$sql = "
CREATE TABLE IF NOT EXISTS `{$fmprefix}offense_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `rating` double NOT NULL,
  `hash` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);";

dbDelta($sql);

offenseSetOption('offense_image_width',220);
offenseSetOption('offense_image_height',330);
offenseSetOption('offense_image_fill_box',330);

}

register_activation_hook(__FILE__,'offense_install');

?>
