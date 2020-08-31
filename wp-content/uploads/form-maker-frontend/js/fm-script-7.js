    var fm_currentDate = new Date();
    var FormCurrency_7 = '$';
    var FormPaypalTax_7 = '0';
    var check_submit7 = 0;
    var check_before_submit7 = {};
    var required_fields7 = [];
    var labels_and_ids7 = {"2":"type_text","1":"type_submit_reset"};
    var check_regExp_all7 = [];
    var check_paypal_price_min_max7 = [];
    var file_upload_check7 = [];
    var spinner_check7 = [];
    var scrollbox_trigger_point7 = '20';
    var header_image_animation7 = 'none';
    var scrollbox_loading_delay7 = '0';
    var scrollbox_auto_hide7 = '1';
    var inputIds7 = '[]';
        var update_first_field_id7 = 0;
    var form_view_count7 = 0;
     function before_load7() {	
}	
 function before_submit7() {
	 }	
 function before_reset7() {	
}
 function after_submit7() {
  
}    function onload_js7() {    }

    function condition_js7() {    }

    function check_js7(id, form_id) {
      if (id != 0) {
        x = jQuery("#" + form_id + "form_view"+id);
      }
      else {
        x = jQuery("#form"+form_id);
      }
          }

    function onsubmit_js7() {
      
    var disabled_fields = "";
    jQuery("#form7 div[wdid]").each(function() {
      if(jQuery(this).css("display") == "none") {
        disabled_fields += jQuery(this).attr("wdid");
        disabled_fields += ",";
      }
    })
    if(disabled_fields) {
      jQuery("<input type=\"hidden\" name=\"disabled_fields7\" value =\""+disabled_fields+"\" />").appendTo("#form7");
    };    }

    function unset_fields7( values, id, i ) {
      rid = 0;
      if ( i > 0 ) {
        jQuery.each( values, function( k, v ) {
          if ( id == k.split('|')[2] ) {
            rid = k.split('|')[0];
            values[k] = '';
          }
        });
        return unset_fields7(values, rid, i - 1);
      }
      else {
        return values;
      }
    }

    function ajax_similarity7( obj, changing_field_id ) {
      jQuery.ajax({
        type: "POST",
        url: fm_objectL10n.form_maker_admin_ajax,
        dataType: "json",
        data: {
          nonce: fm_ajax.ajaxnonce,
          action: 'fm_reload_input',
          page: 'form_maker',
          form_id: 7,
          inputs: obj.inputs
        },
        beforeSend: function() {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              if ( val != '' && parseInt(wdid) == parseInt(changing_field_id) ) {
                jQuery("#form7 div[wdid='"+ wdid +"']").append( '<div class="fm-loading"></div>' );
              }
            });
          }
        },
        success: function (res) {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              jQuery("#form7 div[wdid='"+ wdid +"'] .fm-loading").remove();
              if ( !jQuery.isEmptyObject(res[wdid]) && ( !val || parseInt(wdid) == parseInt(changing_field_id) ) ) {
                jQuery("#form7 div[wdid='"+ wdid +"']").html( res[wdid].html );
              }
            });
          }
        },
        complete: function() {
        }
      });
    }

    function fm_script_ready7() {
      if (jQuery('#form7 .wdform_section').length > 0) {
        fm_document_ready( 7 );
      }
      else {
        jQuery("#form7").closest(".fm-form-container").removeAttr("style")
      }
      if (jQuery('#form7 .wdform_section').length > 0) {
        formOnload(7);
      }
      var ajaxObj7 = {};
      var value_ids7 = {};
      jQuery.each( jQuery.parseJSON( inputIds7 ), function( key, values ) {
        jQuery.each( values, function( index, input_id ) {
          tagName =  jQuery('#form7 [id^="wdform_'+ input_id +'_elemen"]').prop("tagName");
          type =  jQuery('#form7 [id^="wdform_'+ input_id +'_elemen"]').prop("type");
          if ( tagName == 'INPUT' ) {
            input_value = jQuery('#form7 [id^="wdform_'+ input_id +'_elemen"]').val();
            if ( jQuery('#form7 [id^="wdform_'+ input_id +'_elemen"]').is(':checked') ) {
              if ( input_value ) {
                value_ids7[key + '|' + input_id] = input_value;
              }
            }
            else if ( type == 'text' ) {
              if ( input_value ) {
                value_ids7[key + '|' + input_id] = input_value;
              }
            }
          }
          else if ( tagName == 'SELECT' ) {
            select_value = jQuery('#form7 [id^="wdform_'+ input_id +'_elemen"] option:selected').val();
            if ( select_value ) {
              value_ids7[key + '|' + input_id] = select_value;
            }
          }
          ajaxObj7.inputs = value_ids7;
          jQuery(document).on('change', '#form7 [id^="wdform_'+ input_id +'_elemen"]', function() {
          var id = '';
          var changing_field_id = '';
          if( jQuery(this).prop("tagName") == 'INPUT' ) {
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
          value_ids7[key + '|' + input_id] = id;
          jQuery.each( value_ids7, function( k, v ) {
            key_arr = k.split('|');
            if ( input_id == key_arr[2] ) {
              changing_field_id = key_arr[0];
              count = Object.keys(value_ids7).length;
              value_ids7 = unset_fields7( value_ids7, changing_field_id, count );
            }
          });
          ajaxObj7.inputs = value_ids7;
          ajax_similarity7( ajaxObj7, changing_field_id );
          });
        });
      });
      if ( update_first_field_id7 && !jQuery.isEmptyObject(ajaxObj7.inputs) ) {
        ajax_similarity7( ajaxObj7, update_first_field_id7 );
      }
	  }
    jQuery(document).ready(function () {
      fm_script_ready7();
    });
    