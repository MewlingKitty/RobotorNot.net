    var fm_currentDate = new Date();
    var FormCurrency_16 = '$';
    var FormPaypalTax_16 = '0';
    var check_submit16 = 0;
    var check_before_submit16 = {};
    var required_fields16 = ["2","3"];
    var labels_and_ids16 = {"4":"type_text","2":"type_checkbox","3":"type_textarea","1":"type_submit_reset"};
    var check_regExp_all16 = [];
    var check_paypal_price_min_max16 = [];
    var file_upload_check16 = [];
    var spinner_check16 = [];
    var scrollbox_trigger_point16 = '20';
    var header_image_animation16 = 'none';
    var scrollbox_loading_delay16 = '0';
    var scrollbox_auto_hide16 = '1';
    var inputIds16 = '[]';
        var update_first_field_id16 = 0;
    var form_view_count16 = 0;
     function before_load16() {	
}	
 function before_submit16() {
	 }	
 function before_reset16() {	
}
 function after_submit16() {
  
}    function onload_js16() {    }

    function condition_js16() {    }

    function check_js16(id, form_id) {
      if (id != 0) {
        x = jQuery("#" + form_id + "form_view"+id);
      }
      else {
        x = jQuery("#form"+form_id);
      }
          }

    function onsubmit_js16() {
      
				  jQuery("<input type=\"hidden\" name=\"wdform_2_allow_other16\" value=\"no\" />").appendTo("#form16");
				  jQuery("<input type=\"hidden\" name=\"wdform_2_allow_other_num16\" value=\"0\" />").appendTo("#form16");
    var disabled_fields = "";
    jQuery("#form16 div[wdid]").each(function() {
      if(jQuery(this).css("display") == "none") {
        disabled_fields += jQuery(this).attr("wdid");
        disabled_fields += ",";
      }
    })
    if(disabled_fields) {
      jQuery("<input type=\"hidden\" name=\"disabled_fields16\" value =\""+disabled_fields+"\" />").appendTo("#form16");
    };    }

    function unset_fields16( values, id, i ) {
      rid = 0;
      if ( i > 0 ) {
        jQuery.each( values, function( k, v ) {
          if ( id == k.split('|')[2] ) {
            rid = k.split('|')[0];
            values[k] = '';
          }
        });
        return unset_fields16(values, rid, i - 1);
      }
      else {
        return values;
      }
    }

    function ajax_similarity16( obj, changing_field_id ) {
      jQuery.ajax({
        type: "POST",
        url: fm_objectL10n.form_maker_admin_ajax,
        dataType: "json",
        data: {
          nonce: fm_ajax.ajaxnonce,
          action: 'fm_reload_input',
          page: 'form_maker',
          form_id: 16,
          inputs: obj.inputs
        },
        beforeSend: function() {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              if ( val != '' && parseInt(wdid) == parseInt(changing_field_id) ) {
                jQuery("#form16 div[wdid='"+ wdid +"']").append( '<div class="fm-loading"></div>' );
              }
            });
          }
        },
        success: function (res) {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              jQuery("#form16 div[wdid='"+ wdid +"'] .fm-loading").remove();
              if ( !jQuery.isEmptyObject(res[wdid]) && ( !val || parseInt(wdid) == parseInt(changing_field_id) ) ) {
                jQuery("#form16 div[wdid='"+ wdid +"']").html( res[wdid].html );
              }
            });
          }
        },
        complete: function() {
        }
      });
    }

    function fm_script_ready16() {
      if (jQuery('#form16 .wdform_section').length > 0) {
        fm_document_ready( 16 );
      }
      else {
        jQuery("#form16").closest(".fm-form-container").removeAttr("style")
      }
      if (jQuery('#form16 .wdform_section').length > 0) {
        formOnload(16);
      }
      var ajaxObj16 = {};
      var value_ids16 = {};
      jQuery.each( jQuery.parseJSON( inputIds16 ), function( key, values ) {
        jQuery.each( values, function( index, input_id ) {
          tagName =  jQuery('#form16 [id^="wdform_'+ input_id +'_elemen"]').prop("tagName");
          type =  jQuery('#form16 [id^="wdform_'+ input_id +'_elemen"]').prop("type");
          if ( tagName == 'INPUT' ) {
            input_value = jQuery('#form16 [id^="wdform_'+ input_id +'_elemen"]').val();
            if ( jQuery('#form16 [id^="wdform_'+ input_id +'_elemen"]').is(':checked') ) {
              if ( input_value ) {
                value_ids16[key + '|' + input_id] = input_value;
              }
            }
            else if ( type == 'text' ) {
              if ( input_value ) {
                value_ids16[key + '|' + input_id] = input_value;
              }
            }
          }
          else if ( tagName == 'SELECT' ) {
            select_value = jQuery('#form16 [id^="wdform_'+ input_id +'_elemen"] option:selected').val();
            if ( select_value ) {
              value_ids16[key + '|' + input_id] = select_value;
            }
          }
          ajaxObj16.inputs = value_ids16;
          jQuery(document).on('change', '#form16 [id^="wdform_'+ input_id +'_elemen"]', function() {
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
          value_ids16[key + '|' + input_id] = id;
          jQuery.each( value_ids16, function( k, v ) {
            key_arr = k.split('|');
            if ( input_id == key_arr[2] ) {
              changing_field_id = key_arr[0];
              count = Object.keys(value_ids16).length;
              value_ids16 = unset_fields16( value_ids16, changing_field_id, count );
            }
          });
          ajaxObj16.inputs = value_ids16;
          ajax_similarity16( ajaxObj16, changing_field_id );
          });
        });
      });
      if ( update_first_field_id16 && !jQuery.isEmptyObject(ajaxObj16.inputs) ) {
        ajax_similarity16( ajaxObj16, update_first_field_id16 );
      }
	  }
    jQuery(document).ready(function () {
      fm_script_ready16();
    });
    