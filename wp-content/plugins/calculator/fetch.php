<?php

require_once("../../../wp-config.php");
require_once("../../../wp-includes/wp-db.php");
require_once("elo.php");

$wpdb = new wpdb(DB_USER, DB_PASSWORD, DB_NAME, DB_HOST);

$fmdb = $table_prefix."calculator_images";

if(isset($_GET['score']) && $_GET['score'] != '')
{

	$rid = $_GET['rid'];
	$lid = $_GET['lid'];
	
	$score = (float) $_GET['score'];

	if($score == 0 || $score == 1 || $score == 0.5)
	{
		$left = $wpdb->get_row($wpdb->prepare("select * from $fmdb where id = %d",$lid));
		$right = $wpdb->get_row($wpdb->prepare("select * from $fmdb where id = %d",$rid));
		
		$ratingA = $right->rating;
		$ratingB = $left->rating;
		$scoreA = $score;
		$scoreB = (1 - $score);

		$nr = new calculatorRating($ratingA,$ratingB,$scoreA,$scoreB);
		$ratingUpdate = $nr->getNewRatings();
		
		$wpdb->update( $fmdb, array( 'rating' => $ratingUpdate['a']), array( 'id' =>  $rid ), array( '%f'), array( '%d' ) );
		$wpdb->update( $fmdb, array( 'rating' => $ratingUpdate['b']), array( 'id' =>  $lid ), array( '%f'), array( '%d' ) );
	}
}

$ids = $wpdb->get_col("select * from $fmdb where matching != 0");
$maxids = count($ids);
$retryCount = 0;


while(1) {
	$retryCount++;
	
	if($retryCount > 10)
	{
		print "Tries exceeded 1";
		break;
	}
		
	$id = $ids[rand(0,$maxids)];
	$left = $wpdb->get_row($wpdb->prepare("select * from $fmdb where id = %d",$id));
	
	$tries = 0;
	while(($id2 = $ids[rand(0,$maxids)]) == $id)
	{
		$tries++;
		if($tries > 10)
		{
			print "Tries exceed";
			break;
		}
	}
	$right = $wpdb->get_row($wpdb->prepare("select * from $fmdb where id = %d",$id2));
	
	if($left->url != '' && $right->url != '')
	{
		print json_encode(array('left'=> $left->url, 'right' => $right->url, 'leftid'=> $left->id, 'rightid' => $right->id));
		break;
	}
	
}


/*
retryimages:

	$retryCount++;
	
	if($retryCount > 10)
		goto fmfin;
		
	$id = $ids[rand(0,$maxids)];
	$left = $wpdb->get_row($wpdb->prepare("select * from $fmdb where `id` = %d",$id));
	
	$tries = 0;
	while(($id2 = $ids[rand(0,$maxids)]) == $id)
	{
		$tries++;
		if($tries > 100)
			break;
	}
	$right = $wpdb->get_row($wpdb->prepare("select * from $fmdb where `id` = %d",$id2));
	
	if($left->url == '' || $right->url == '')
		goto retryimages;
	
	fmfin:
	print json_encode(array('left'=> $left->url, 'right' => $right->url, 'leftid'=> $left->id, 'rightid' => $right->id));
*/

/*if ($handle = opendir('temp')) {
	$i = 0;
	$entry = array();
    while (false !== ($entry[$i] = readdir($handle))) {
        $i++;
    }
	
    closedir($handle);
	
	if(isset($_GET['num']))
	{
		print json_encode(array('left'=> $entry[rand(0,$i)], 'right' => $entry[rand(0,$i)]));
	}
	else
		print $entry[rand(0,$i)];
	return;
}*/

?>