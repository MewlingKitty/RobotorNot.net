( function( blocks, element, serverSideRender) {
    var el = element.createElement,
        registerBlockType = blocks.registerBlockType,
        ServerSideRender = serverSideRender;
 
        registerBlockType( 'guaven-sqlcharts/gvn-chart-gutenberg', {
            title: 'My SQL Charts',
            icon: 'chart-pie',
            category: 'widgets',
            attributes: {
                chart_id: {
                    type: 'string',
                },
                sqlcharts_inserted_script: {
                    type: 'number'
                }
            },
            description: guaven.description,
            edit: function( props ) {
                if(!props.attributes.chart_id){
                    var chart_id = prompt('Enter chart id:');

                    var already_displayed_charts = JSON.parse(sessionStorage.getItem("sqlcharts_inserted_script")) || []; 
                    sessionStorage.setItem('sqlcharts_inserted_script', JSON.stringify(already_displayed_charts.concat([chart_id])));
                    props.setAttributes( {
                        chart_id: chart_id,
                        sqlcharts_inserted_script: already_displayed_charts.length
                    });
                }
                setTimeout(() => {
                    eval(jQuery('.gvn_charts_script').text())
                }, 2000);
                return (
                    el( ServerSideRender, {
                        block: 'guaven-sqlcharts/gvn-chart-gutenberg',
                        attributes: props.attributes,
                    } )
                );
            }
    } );
}(
    window.wp.blocks,
    window.wp.element,
    window.wp.serverSideRender,
) );