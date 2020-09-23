    var fm_currentDate = new Date();
    var FormCurrency_23 = '$';
    var FormPaypalTax_23 = '0';
    var check_submit23 = 0;
    var check_before_submit23 = {};
    var required_fields23 = [];
    var labels_and_ids23 = {"2":"type_own_select","1":"type_submit_reset"};
    var check_regExp_all23 = [];
    var check_paypal_price_min_max23 = [];
    var file_upload_check23 = [];
    var spinner_check23 = [];
    var scrollbox_trigger_point23 = '20';
    var header_image_animation23 = 'none';
    var scrollbox_loading_delay23 = '0';
    var scrollbox_auto_hide23 = '1';
    var inputIds23 = '[]';
        var update_first_field_id23 = 0;
    var form_view_count23 = 0;
     function before_load23() {	
}	
 function before_submit23() {
	 }	
 function before_reset23() {	
}
 function after_submit23() {
  
}    function onload_js23() {    }

    function condition_js23() {    }

    function check_js23(id, form_id) {
      if (id != 0) {
        x = jQuery("#" + form_id + "form_view"+id);
      }
      else {
        x = jQuery("#form"+form_id);
      }
          }

    function onsubmit_js23() {
      
    var disabled_fields = "";
    jQuery("#form23 div[wdid]").each(function() {
      if(jQuery(this).css("display") == "none") {
        disabled_fields += jQuery(this).attr("wdid");
        disabled_fields += ",";
      }
    })
    if(disabled_fields) {
      jQuery("<input type=\"hidden\" name=\"disabled_fields23\" value =\""+disabled_fields+"\" />").appendTo("#form23");
    };    }

    function unset_fields23( values, id, i ) {
      rid = 0;
      if ( i > 0 ) {
        jQuery.each( values, function( k, v ) {
          if ( id == k.split('|')[2] ) {
            rid = k.split('|')[0];
            values[k] = '';
          }
        });
        return unset_fields23(values, rid, i - 1);
      }
      else {
        return values;
      }
    }

    function ajax_similarity23( obj, changing_field_id ) {
      jQuery.ajax({
        type: "POST",
        url: fm_objectL10n.form_maker_admin_ajax,
        dataType: "json",
        data: {
          nonce: fm_ajax.ajaxnonce,
          action: 'fm_reload_input',
          page: 'form_maker',
          form_id: 23,
          inputs: obj.inputs
        },
        beforeSend: function() {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              if ( val != '' && parseInt(wdid) == parseInt(changing_field_id) ) {
                jQuery("#form23 div[wdid='"+ wdid +"']").append( '<div class="fm-loading"></div>' );
              }
            });
          }
        },
        success: function (res) {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              jQuery("#form23 div[wdid='"+ wdid +"'] .fm-loading").remove();
              if ( !jQuery.isEmptyObject(res[wdid]) && ( !val || parseInt(wdid) == parseInt(changing_field_id) ) ) {
                jQuery("#form23 div[wdid='"+ wdid +"']").html( res[wdid].html );
              }
            });
          }
        },
        complete: function() {
        }
      });
    }

    function fm_script_ready23() {
      if (jQuery('#form23 .wdform_section').length > 0) {
        fm_document_ready( 23 );
      }
      else {
        jQuery("#form23").closest(".fm-form-container").removeAttr("style")
      }
      if (jQuery('#form23 .wdform_section').length > 0) {
        formOnload(23);
      }
      var ajaxObj23 = {};
      var value_ids23 = {};
      jQuery.each( jQuery.parseJSON( inputIds23 ), function( key, values ) {
        jQuery.each( values, function( index, input_id ) {
          tagName =  jQuery('#form23 [id^="wdform_'+ input_id +'_elemen"]').attr("tagName");
          type =  jQuery('#form23 [id^="wdform_'+ input_id +'_elemen"]').attr("type");
          if ( tagName == 'INPUT' ) {
            input_value = jQuery('#form23 [id^="wdform_'+ input_id +'_elemen"]').val();
            if ( jQuery('#form23 [id^="wdform_'+ input_id +'_elemen"]').is(':checked') ) {
              if ( input_value ) {
                value_ids23[key + '|' + input_id] = input_value;
              }
            }
            else if ( type == 'text' ) {
              if ( input_value ) {
                value_ids23[key + '|' + input_id] = input_value;
              }
            }
          }
          else if ( tagName == 'SELECT' ) {
            select_value = jQuery('#form23 [id^="wdform_'+ input_id +'_elemen"] option:selected').val();
            if ( select_value ) {
              value_ids23[key + '|' + input_id] = select_value;
            }
          }
          ajaxObj23.inputs = value_ids23;
          jQuery(document).on('change', '#form23 [id^="wdform_'+ input_id +'_elemen"]', function() {
          var id = '';
          var changing_field_id = '';
          if( jQuery(this).attr("tagName") == 'INPUT' ) {
            if( jQuery(this).is(':checked') ) {
              id = jQuery(this).val();
            }
            if( jQuery(this).attr('type') == 'text' ) {
              id = jQuery(this).val();
            }
          }
          else {
            id = jQuery(this).val();
          }
          value_ids23[key + '|' + input_id] = id;
          jQuery.each( value_ids23, function( k, v ) {
            key_arr = k.split('|');
            if ( input_id == key_arr[2] ) {
              changing_field_id = key_arr[0];
              count = Object.keys(value_ids23).length;
              value_ids23 = unset_fields23( value_ids23, changing_field_id, count );
            }
          });
          ajaxObj23.inputs = value_ids23;
          ajax_similarity23( ajaxObj23, changing_field_id );
          });
        });
      });
      if ( update_first_field_id23 && !jQuery.isEmptyObject(ajaxObj23.inputs) ) {
        ajax_similarity23( ajaxObj23, update_first_field_id23 );
      }
	  }
    jQuery(function () {
      fm_script_ready23();
    });
    