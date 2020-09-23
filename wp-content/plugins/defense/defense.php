<?php
/*
Plugin Name: Defense Elo
Plugin URI: https://robotornot.net
Description: Defense Elo for Wordpress
Version: 1
Author: 2512
Author URI: https://robotornot.net
*/

$defense_js_num = 0;
define( 'defense_PATH', plugin_dir_path(__FILE__) );


function defense_admin_scripts() {
	wp_enqueue_script('media-upload');
	wp_enqueue_script('thickbox');
	wp_register_script('fm-upload', WP_PLUGIN_URL.'/defense/fmup.js', array('jquery','media-upload','thickbox'));
	wp_enqueue_script('fm-upload');
}

function defense_admin_styles() {
	wp_enqueue_style('thickbox');
}

if (isset($_GET['page']) && $_GET['page'] == 'fmAdd') {
	add_action('admin_print_scripts', 'defense_admin_scripts');
	add_action('admin_print_styles', 'defense_admin_styles');
}


add_action('admin_menu', 'registerdefenseMenuOption');

function defense_check_for_admin()
{
	if (!current_user_can('administrator'))
	wp_die(__( 'You do not have sufficient permissions to manage options for this site.'));
}


function registerdefenseMenuOption() {
	add_menu_page('defense', 'defense', 'administrator', 'defense.php', 'defenseReport',   plugins_url('defense/images/icon.png'), 75);
	
}

add_action('admin_menu', 'registerdefenseSubMenuOpts');

function registerdefenseSubMenuOpts() {
	add_submenu_page( 'defense.php', 'Add Images', 'Add Images', 'administrator', 'DAdd', 'defenseAddImages' ); 
	add_submenu_page( 'defense.php', 'Delete Images', 'Delete Images', 'administrator', 'DDel', 'defenseDelImages' ); 
	add_submenu_page( 'defense.php', 'Settings', 'Settings', 'administrator', 'DSettings', 'defenseSettings' ); 
	add_submenu_page( 'defense.php', 'CSS Settings', 'CSS Settings', 'administrator', 'DCssSettings', 'defenseCssSettings' ); 
}


function defenseCssSettings($force = 0)
{

	defense_check_for_admin();

	$tplPath = plugin_dir_path(__FILE__). "defensecss.tpl";
	$dest = plugin_dir_path(__FILE__). "defensestyle.css";
	$tplc = $tplContents = file_get_contents($tplPath);
	
	print "<div class=\"wrap\"><h2>Settings</h2>";
	
	if(isset($_POST['setcss']) || $force == 1)
	{
		$swidth = defenseGetOption('defense_image_width');
		$sheight = defenseGetOption('defense_image_height');
		
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

function defenseSetOption($optname,$value)
{
	global $wpdb;
	$optionsTable = $wpdb->prefix."options";
	
	$wpdb->query($wpdb->prepare("delete from $optionsTable where `option_name` = %s",$optname));
	$wpdb->insert( $optionsTable,array( 'option_name' => $optname,'option_value' => $value),array('%s','%s'));
}

function defenseGetOption($optname)
{
	global $wpdb;
	$optionsTable = $wpdb->prefix."options";

	$res = $wpdb->get_row($wpdb->prepare("select * from $optionsTable where `option_name` = %s",$optname));
	return $res->option_value;
}


function defenseSettings()
{
	defense_check_for_admin();
	print "<div class=\"wrap\"><h2>Settings</h2>";
	$chk ='';
	$warnImg = plugins_url()."/defense/images/warning.png";
	//defenseSetOption('defense_append_to_comments',1);

	$settingsVariableList = array(
		array("desc" => "Width of each Image", "name" => "defense_image_width", "type" => "text"),
		array("desc" => "Height of each Image", "name" => "defense_image_height", "type" => "text"),
		array("desc" => "Resize Images to fit box", "name" => "defense_image_fill_box", "type" => "check"),
		array("desc" => "Text for Like both images button", "name" => "defense_draw_text", "type" => "text"),
		array("desc" => "Text for Do not like both button", "name" => "defense_lose_text", "type" => "text")
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
					defenseSetOption($optionArray['name'],1);
				else
					defenseSetOption($optionArray['name'],0);
			}
			
			if($optionArray['type'] == "text")
			{
				if(!empty($_POST[$optionArray['name']]))
					defenseSetOption($optionArray['name'],$_POST[$optionArray['name']]);
			}

		}
		
		defenseCssSettings(1);
	}

	print '<form action="" method="post"><br><br>';

	print "<table width=\"50%\">";
	foreach($settingsVariableList as $optionArray)
	{
		if($optionArray['type'] == "check" )
		{
			if(defenseGetOption($optionArray['name']))
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
			$prevValue = defenseGetOption($optionArray['name']);
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

function defenseAddImages()
{

	defense_check_for_admin();
	global $wpdb;
	
	$fmtable = $wpdb->prefix . "defense_images";
	
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
					
					$url = plugins_url()."/defense/data/".$_POST['dir_name']."/".$entry[$i];
					
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
	
	$infoimurl = plugins_url()."/defense/images/info.png";
	
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
<tr><td rowspan="1" colspan="2"><img src="<?php print $infoimurl; ?>"> Refer documentation for more details</b><br><br>Quick Help: Directory should be relative to defense/data/<br>E.g. If you upload a folder called temp to defense/data, then you enter temp<br>If you uploaded a folder called subtemp to temp, you enter temp/subtemp</td></tr>
</form>
</table>
            </div>
        </div>
    </div>
</div>
</div>

	<?php
	
	//print "Directory name. <br><b>Refer documentation for more details</b><br><br>Quick Help: Directory should be relative to defense/data/<br>E.g. If you upload a folder called temp to defense/data, then you enter temp<br>If you uploaded a folder called subtemp to temp, you enter temp/subtemp<br>";
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

function defenseDelImages()
{

	defense_check_for_admin();

	global $wpdb;
	$fmtable = $wpdb->prefix . "defense_images";
	
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

function defense_hof( $atts , $content = null){ 

	global $wpdb;
	$fmtable = $wpdb->prefix . "defense_images";;
	
	$topImages = $wpdb->get_results("select * from $fmtable where searching != 0");
	
	$k = 0;
	print "<table>";
	foreach($topImages as $topImage)
	{
		if($k % 6 == 0)
			print "<tr>";
			
		print "<p>Defense Score</p><tr><td>{$topImage->rating}</td></tr></table></td>";		
		
		$k++;
		
		if($k % 6 == 0)
			print "</tr>";

	}
	print "</table>";

}

function defense_search( $atts , $content = null){ 

	global $wpdb;
	$fmtable = $wpdb->prefix . "defense_images";;
	
	$topImages = $wpdb->get_results("select * from $fmtable where 1 order by `rating` DESC limit 0,20");
	
	$k = 0;
	print "<table>";
	foreach($topImages as $topImage)
	{
		if($k % 6 == 0)
			print "<tr>";
			
		print "<td><table><tr><td><img src=\"{$topImage->url}\" width=\"100\" ></td></tr><tr><td>{$topImage->rating}</td></tr></table></td>";		
		
		$k++;
		
		if($k % 6 == 0)
			print "</tr>";

	}
	print "</table>";

}

function defenseReport()
{

	defense_check_for_admin();
	global $wpdb;
	$fmtable = $wpdb->prefix . "defense_images";;
	
	print "<h2>Defense Report</h2>";
	$topImages = $wpdb->get_results("select * from $fmtable where 1 order by `rating` DESC");

?>

	<div id="poststuff" class="metabox-holder" style="width:800px;">
<div id="post-body">
    <div id="post-body-content">
        <div id="namediv" class="stuffbox">
            <h3><label for="link_name">Leaderboard</label></h3>
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

function defense_page_scripts() {
	wp_enqueue_script('jquery');
}

function defense_parse( $atts , $content = null){
 global $defense_js_num;
 $defense_js_num++;
 
  
 $outDiv1 = "defensestdout{$defense_js_num}a";
 $drawDiv1 = "defenseDraw{$defense_js_num}a";
 $drawDiv2 = "defenseDraw{$defense_js_num}b";
 
 //print "<table><tr><td><div id=\"$drawDiv1\" class=\"fmdraw\">Both!</div></td><td><div id=\"$drawDiv2\" class=\"fmnone\">Neither</div></td></tr></table>";
 //print "<div id=\"$drawDiv1\" class=\"fmdraw\">Both!</div><div id=\"$drawDiv2\" class=\"fmnone\">Neither</div><br>";
 
 $lt = defenseGetOption('defense_draw_text');
 $hb = defenseGetOption('defense_lose_text');
 
 $lt = $lt ==''? "Like Both!" : $lt;
 $hb = $hb ==''? "Hate Both" : $hb;
  
 $k1 =  "<button id=\"$drawDiv1\" class=\"fmdraw\">$lt</button>";
 $k2 = " <button id=\"$drawDiv2\" class=\"fmdraw\">$hb</button><br>";
 
 $pt = 0;
 
 if($pt) print "<table width=\"300px\" class=\"fmt\" ><tr><td>";
  print "<div id=\"fmwrap\" >";
 
 /* print "<div style=\"width: 500px;\" id=\"fmwinner\" >";
 print '<div style="float:left;"><img width="75" src="http://localhost/wordpress/wp-content/plugins/defense/data/actors/Johansson_scarlett.jpg"></div><div style="float: right;">Stat1<br>stat2</div>';
 print "</div>"; */
 print "<div style=\"clear:both;\"></div>";
   print "<div id=\"$outDiv1\" class=\"fml\"></div>";
 $outDiv1 = "#defensestdout{$defense_js_num}a";
 $drawDiv1 = "#defenseDraw{$defense_js_num}a";
 $drawDiv2 = "#defenseDraw{$defense_js_num}b";
 
 $vsimg = plugins_url()."/defense/images/vs.png";
 if($pt) print "<td><img src=\"$vsimg\" ></td>";
 if($pt)  print "</td><td>";
  $defense_js_num++;
 $outDiv2 = "defensestdout{$defense_js_num}a";
 print "<div id=\"$outDiv2\" class=\"fmr\"></div>";
 $outDiv2 = "#defensestdout{$defense_js_num}a";
 if($pt)  print "</td></tr></table>";
print "<div style=\"clear:both;\"></div>";
 print "<div id=\"fmbuttonwrap\">";
 print $k1;
 print $k2;
 print "</div>";
 
  print "</div>"; // end fmwrap
 
 $fh = fopen(defense_PATH."defense_{$defense_js_num}.js","w");
 if(!$fh)
 {
	print "Unable to open file for defense";
	return;
 }
 
 //$openJs = "jQuery(document).ready(function($) { $('$outDiv1').click( function () {alert('1');} ); $('$outDiv2').click( function () {alert('2');} ); });";
 $fmlid = "fm{$defense_js_num}a";
 $fmrid = "fm{$defense_js_num}b";
 
 $imr = '';
 $imrw = defenseGetOption('defense_image_width');
 $imrh = defenseGetOption('defense_image_height');
 
 if(defenseGetOption('defense_image_fill_box'))
 {
	$imr = "width = \"$imrw\" height = \"$imrh\"";
 }
 
 
 $fetchPhotoLink = plugins_url('defense/fetch.php');
 $fetchPhotoBase = plugins_url('defense/temp/');
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
	
 wp_register_script("defense_{$defense_js_num}", WP_PLUGIN_URL."/defense/defense_{$defense_js_num}.js", array('jquery'));
 wp_enqueue_script("defense_{$defense_js_num}");
 
}
add_shortcode( 'defense', 'defense_parse' );

add_shortcode( 'defense_hall_of_fame', 'defense_hof' );

add_shortcode( 'defense_search', 'defense_s' );

add_action('wp_head', 'defense_page_scripts');

add_action( 'wp_enqueue_scripts', 'add_defense_stylesheet' );

    /**
     * Enqueue plugin style-file
     */
    function add_defense_stylesheet() {
        // Respects SSL, Style.css is relative to the current file
        wp_register_style( 'defense-style', plugins_url('defensestyle.css', __FILE__) );
        wp_enqueue_style( 'defense-style' );
    }
	
function defense_install() 
{

	require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
	// Create tables
	global $wpdb;
	
$fmprefix = $wpdb->prefix;
$sql = "
CREATE TABLE IF NOT EXISTS `{$fmprefix}defense_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `rating` double NOT NULL,
  `hash` varchar(255) NOT NULL,
  `matching` int(11) NOT NULL,
  `searching` int(11) NOT NULL,
  PRIMARY KEY (`id`)
);";

dbDelta($sql);

defenseSetOption('defense_image_width',220);
defenseSetOption('defense_image_height',330);
defenseSetOption('defense_image_fill_box',330);

}

register_activation_hook(__FILE__,'defense_install');

?>
