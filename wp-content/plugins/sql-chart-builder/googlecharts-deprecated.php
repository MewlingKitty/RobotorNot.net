<?php
if (!defined('ABSPATH')) {
    die;
}
/*********************************Google Charts section**************************************/

function guaven_sqlcharts_google_shortcode($atts)
{
    global $wpdb;
    $sql           = html_entity_decode(get_post_meta($atts['id'], 'guaven_sqlcharts_code', true));
    $sql=gvn_chart_put_variables($sql,$atts['id']);
    $blacklister_f = gvn_chart_check_sql_query($sql);
    if ($blacklister_f == 1)
        return 'You given SQL code contains forbidden commands. Remember that you should only use SELECT queries';

    for($i=1;$i<20;$i++){ $replacearg=!empty($atts["arg".$i])?$atts["arg".$i]:0;
        $sql=str_replace("{arg".$i."}",esc_sql($replacearg),$sql);}
    $sql_arr=explode(";",$sql);
    $fvs = $wpdb->get_results($sql_arr[0]);

    $wpdb->show_errors();
    ob_start();
    $wpdb->print_error();
    $printerror = ob_get_clean();

    if ($printerror != '' and strpos($printerror, "[]") === false)
        return $printerror;
    elseif (empty($fvs))
        return 'Your SQL returnes empty date, please recheck your SQL query above';
    else {
        ob_start();
        global $sqlcharts_inserted_script;
        if (empty($sqlcharts_inserted_script))
            $sqlcharts_inserted_script = 1;?>
     <script type="text/javascript">;
       google.charts.load('current', {'packages':[<?php
        $tip_g = get_post_meta($atts['id'], 'guaven_sqlcharts_graphtype', true);

        echo guaven_sqlcharts_libloads($tip_g, 'packages'); ?>]});
      google.charts.setOnLoadCallback(drawChart_<?php echo $sqlcharts_inserted_script;?>);
      csv_data='';csv_title='';
      function drawChart_<?php echo $sqlcharts_inserted_script;?>() {
    <?php
        $html_temp = '';
        $csv_temp  = '';
        $post_g    = get_post($atts['id']);
        $xarg_s    = get_post_meta($atts['id'], 'guaven_sqlcharts_xarg_s', true);
        $xarg_l    = get_post_meta($atts['id'], 'guaven_sqlcharts_xarg_l', true);
        $yarg_s    = get_post_meta($atts['id'], 'guaven_sqlcharts_yarg_s', true);
        $yarg_l    = get_post_meta($atts['id'], 'guaven_sqlcharts_yarg_l', true);

        $graph_width  = get_post_meta($atts['id'], 'guaven_sqlcharts_chartwidth', true);
        $graph_height = get_post_meta($atts['id'], 'guaven_sqlcharts_chartheight', true);

        if (!empty($atts["width"])) {
            $graph_width = intval($atts['width']);
        }
        if (!empty($atts["height"])) {
            $graph_height = intval($atts['height']);
        }

        foreach ($fvs as $fv) {
            $html_temp .= "['{$fv->$xarg_s}', {$fv->$yarg_s}, '#b87333'],";
            $csv_temp .= addslashes($fv->$xarg_s) . "," . addslashes($fv->$yarg_s) . "<br>";

        }
?>
        csv_data='<?php echo $csv_temp;?>';
        csv_title='<?php echo '' . $xarg_l . ',' . $yarg_l . '';?><br>';
      var data = google.visualization.arrayToDataTable([
         ['<?php echo $xarg_l;?>', '<?php echo $yarg_l;?>', { role: 'style' }],
        <?php echo $html_temp;?>
      ]);

        var options = {
          <?php echo $tip_g == '3dpie' ? "is3D: true," : '';?>
          chart_<?php echo $sqlcharts_inserted_script;?>: {
            title: '<?php echo $post_g->post_title;?>',
          }
        };

var chart_<?php
        echo $sqlcharts_inserted_script;
?> = new google.visualization.<?php
        echo guaven_sqlcharts_libloads(get_post_meta($atts['id'], 'guaven_sqlcharts_graphtype', true), 'charts');
?>(document.getElementById('columnchart_material_<?php echo $sqlcharts_inserted_script;?>'));


      var my_div = document.getElementById('chart_div_<?php echo $sqlcharts_inserted_script;?>');
       google.visualization.events.addListener(chart_<?php echo $sqlcharts_inserted_script;?>, 'ready', function () {
      my_div.innerHTML = '<img src="' + chart_<?php echo $sqlcharts_inserted_script;?>.getImageURI() + '">';
    });

        chart_<?php echo $sqlcharts_inserted_script;?>.draw(data, options);
      }
    </script>

<?php echo gvn_chart_top_form($atts);?>

<div id="chart_div_<?php        echo $sqlcharts_inserted_script;?>" style="display:none"></div>
<a href="javascript://" onclick="saveaspng('chart_div_<?php        echo $sqlcharts_inserted_script;?>')">Save as PNG</a>
<a href="javascript://" onclick="exportcsv()">Export CSV</a>
<div id="columnchart_material_<?php  echo $sqlcharts_inserted_script;?>" style="width:<?php echo $graph_width > 0 ? intval($graph_width) : '500';?>px;
height: <?php  echo $graph_height > 0 ? intval($graph_height) : '400';?>px"></div>
<?php
        $sqlcharts_inserted_script++;

        return ob_get_clean();
    }
}
add_shortcode('gvn_schart', 'guaven_sqlcharts_google_shortcode');
