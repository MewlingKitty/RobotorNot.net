=== SQL Chart Builder ===
Contributors: elvinhaci
Tags: sql charts,mysql charts,visualizer,sql reports,dynamic graph,mysql reports,google charts,google chart,mysql to chart,mysql to graph,dynamic chart,dynamic graph
Requires at least: 4.7.0
Tested up to: 5.5.0
Stable tag: 2.2.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Turn Your SQL Queries to Beautiful Dynamic Charts- Pie, Line, Area, Donut, Bar Charts with date/input filters.

== Description ==
The plugin can create beautiful charts based on your SQL queries, then you can use those charts in any part of your website.
You can use both native wp and non-wp mysql tables in your queries.

### Pie chart, Donut chart, Line chart, Bar chart, Column chart, Area chart

= How to use =

1. Give any name to your report.

2. Use our preinstalled chart or create new one yourself: choose desired chart type, type sql query,
enter field names, labels and then press to Publish/Update

3. You can use multiple SQL queries too. Just split them by ; sign. You can also add shortcode argument to SQL query. For example if you
type "select * from wp_posts where ID>{arg1}" then it you can pass arg1 value to the query with  [gvn_schart_2 id="2" arg1="11"] shortcode.

4. After update/save you will see needed shortcode below there. You can use that shortcode anywhere in your website: in pages, posts, widgets etc.

5. Just check "Show table-view data below the graph" in order to get table-list view below each chart.

6. Using "Dynamic Filters" you can create dynamic variables inside SQL code. It also creates corresponding dynamic input form above each chart.

= Dynamic filters =

Use this format: variable_name~default_value~variable_label~variable_type | variable_name~default_value~variable_label~variable_type etc.

* variable_name - any single name you want.
* default_value - default value when no any variable chosen by a user
* variable_label - Label which would be visible at a form above the chart
* variable_type - number, text or date
* ~ is a separator between variable elements.
* | is a separator between variables

For example if to put

limit_tag~10~Count~number | post_date_tag~2010-07-05 17:25:18~Date Published~date,

then you can use this SQL code

select * from wp_posts where post_date<{post_date_tag} limit {limit_tag}

in SQL CODE field.
{post_date_tag} and {limit_tag} would be replaced with dynamic variables.

So, the plugin will automatically recognize it and put corresponding selectboxes above the chart.


= Website =
[https://guaven.com/my-sql-charts/](https://guaven.com/my-sql-charts/)

= Documentation =
[https://guaven.com/my-sql-charts/#docs](https://guaven.com/my-sql-charts/#docs)

= Bug Submission and Forum Support =
[Contact Page](https://guaven.com/contact/solution-request/)

= Please Vote if you liked our plugin =
Your votes really helps us. Thanks.


== Installation ==

1. Upload 'guaven_sqlcharts.zip' to the '/wp-content/plugins/' directory
2. Unzip it.
3. Go to Dashboard/Plugins and Activate the plugin.
4. Go to “Dashboard/My SQL Charts”  to create new charts. You will also see howtouse guide texts there.



== Frequently Asked Questions ==


== Screenshots ==

1. Screenshot 1

2. Screenshot 2

3. Screenshot 3

4. Screenshot 4

5. Screenshot 5


== Changelog ==

= 2.2.0=

* Added width-height support 

* Added "Zero point" to line chart

* Bugfixes

= 2.1.2=

* New feature: Remote Database Connection

* Setting custom & fixed colors for charts

* Small improvement in table-view component

= 2.1.1=

* Fixed small bug in Area Charts

* Chart library has been updated to the latest version

= 2.1.0=

* Dynamic filters added: You can use dynamic date/number/text filters at frontend.

* Table-view support added.

= 2.0.4=

Now you can add custom arguments to the SQL query.

= 2.0.0=

* New non-Google Local Charts added.

* Use multiple mysql queries in one graph.

= 1.0.0=

* Uploaded to Wordpress.org

= 1.0.2=

* Little fixes

= 1.0.5=

* Added WP 4.7 compatibility

* Fixed "multiple charts in one page" issue.
