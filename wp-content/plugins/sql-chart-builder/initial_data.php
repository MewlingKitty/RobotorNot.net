<?php
if (!defined('ABSPATH')) {
    die;
}
function gvn_chart_sample_nonxml_data()
{
    $data['titles'] = array(
        'Sample: Posts by month',
        'Sample: Posts and non-Posts by month',
        'Sample: Posts by year',
        'Sample: Popular users/publishers'
    );
    global $wpdb;
    $data['sql_queries'] = array(
        "select count(*) postcount,SUBSTRING(`post_date`,6,2) monthnum,SUBSTRING(`post_date`,1,4) yearnum,SUBSTRING(`post_date`,1,7) monthandyear from $wpdb->posts  group by monthnum,yearnum  order by monthnum ",

        "select count(*) postcount,SUBSTRING(`post_date`,6,2) monthnum,SUBSTRING(`post_date`,1,4) yearnum,SUBSTRING(`post_date`,1,7) monthandyear from $wpdb->posts where post_type=\"post\"  group by monthnum,yearnum  order by monthnum ;
  select count(*) postcount,SUBSTRING(`post_date`,6,2) monthnum,SUBSTRING(`post_date`,1,4) yearnum,SUBSTRING(`post_date`,1,7) monthandyear from $wpdb->posts where post_type!=\"post\" group by monthnum,yearnum  order by monthnum",

        "select count(*) postcount, SUBSTR(`post_date`,1,4) yearnum from $wpdb->posts  group by yearnum order by yearnum asc limit 10 ",

        "select count(*) as postcount,a.post_author,b.display_name as dname
from $wpdb->posts a
inner join $wpdb->users b ON a.post_author=b.ID
where a.post_status=\"publish\"
group by a.post_author order by postcount desc limit 10"
    );

    $data['others'] = array(

        array(
            'Post count',
            'postcount',
            'Monthes',
            'monthandyear',
            500,
            400,
            'bar_l'
        ),

        array(
            'Posts;non-Posts',
            'postcount',
            'Monthes',
            'monthandyear',
            500,
            400,
            'line_l'
        ),

        array(
            'Post count',
            'postcount',
            'Years',
            'yearnum',
            500,
            400,
            'pie_l'
        ),

        array(
            'Post count',
            'postcount',
            'Display name',
            'dname',
            500,
            400,
            'donut_l'
        )


    );





    foreach ($data['titles'] as $key => $value) {
        $existence = get_page_by_title($value, OBJECT, 'gvn_schart');

        if (empty($existence)) {
            $newid = wp_insert_post(array(
                'post_title' => $value,
                'post_type' => 'gvn_schart',
                'post_status' => 'private'
            ));
            add_post_meta($newid, 'guaven_sqlcharts_code', $data["sql_queries"][$key]);
            add_post_meta($newid, 'guaven_sqlcharts_chartwidth', $data["others"][$key][4]);
            add_post_meta($newid, 'guaven_sqlcharts_chartheight', $data["others"][$key][5]);
            add_post_meta($newid, 'guaven_sqlcharts_xarg_s', $data["others"][$key][3]);
            add_post_meta($newid, 'guaven_sqlcharts_xarg_l', $data["others"][$key][2]);
            add_post_meta($newid, 'guaven_sqlcharts_yarg_s', $data["others"][$key][1]);
            add_post_meta($newid, 'guaven_sqlcharts_yarg_l', $data["others"][$key][0]);
            add_post_meta($newid, 'guaven_sqlcharts_graphtype', $data["others"][$key][6]);

        }
    }



}
?>
