    var fm_currentDate = new Date();
    var FormCurrency_8 = '$';
    var FormPaypalTax_8 = '0';
    var check_submit8 = 0;
    var check_before_submit8 = {};
    var required_fields8 = [];
    var labels_and_ids8 = {"1":"type_submit_reset"};
    var check_regExp_all8 = [];
    var check_paypal_price_min_max8 = [];
    var file_upload_check8 = [];
    var spinner_check8 = [];
    var scrollbox_trigger_point8 = '20';
    var header_image_animation8 = 'none';
    var scrollbox_loading_delay8 = '0';
    var scrollbox_auto_hide8 = '1';
    var inputIds8 = '[]';
        var update_first_field_id8 = 0;
    var form_view_count8 = 0;
     function before_load8() {
     
}

 function before_submit8() {
      }

 function before_reset8() {
     
}
 function after_submit8() {
     
}    function onload_js8() {    }

    function condition_js8() {    }

    function check_js8(id, form_id) {
      if (id != 0) {
        x = jQuery("#" + form_id + "form_view"+id);
      }
      else {
        x = jQuery("#form"+form_id);
      }
          }

    function onsubmit_js8() {
      
    var disabled_fields = "";
    jQuery("#form8 div[wdid]").each(function() {
      if(jQuery(this).css("display") == "none") {
        disabled_fields += jQuery(this).attr("wdid");
        disabled_fields += ",";
      }
    })
    if(disabled_fields) {
      jQuery("<input type=\"hidden\" name=\"disabled_fields8\" value =\""+disabled_fields+"\" />").appendTo("#form8");
    };    }

    function unset_fields8( values, id, i ) {
      rid = 0;
      if ( i > 0 ) {
        jQuery.each( values, function( k, v ) {
          if ( id == k.split('|')[2] ) {
            rid = k.split('|')[0];
            values[k] = '';
          }
        });
        return unset_fields8(values, rid, i - 1);
      }
      else {
        return values;
      }
    }

    function ajax_similarity8( obj, changing_field_id ) {
      jQuery.ajax({
        type: "POST",
        url: fm_objectL10n.form_maker_admin_ajax,
        dataType: "json",
        data: {
          nonce: fm_ajax.ajaxnonce,
          action: 'fm_reload_input',
          page: 'form_maker',
          form_id: 8,
          inputs: obj.inputs
        },
        beforeSend: function() {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              if ( val != '' && parseInt(wdid) == parseInt(changing_field_id) ) {
                jQuery("#form8 div[wdid='"+ wdid +"']").append( '<div class="fm-loading"></div>' );
              }
            });
          }
        },
        success: function (res) {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              jQuery("#form8 div[wdid='"+ wdid +"'] .fm-loading").remove();
              if ( !jQuery.isEmptyObject(res[wdid]) && ( !val || parseInt(wdid) == parseInt(changing_field_id) ) ) {
                jQuery("#form8 div[wdid='"+ wdid +"']").html( res[wdid].html );
              }
            });
          }
        },
        complete: function() {
        }
      });
    }

    function fm_script_ready8() {
      if (jQuery('#form8 .wdform_section').length > 0) {
        fm_document_ready( 8 );
      }
      else {
        jQuery("#form8").closest(".fm-form-container").removeAttr("style")
      }
      if (jQuery('#form8 .wdform_section').length > 0) {
        formOnload(8);
      }
      var ajaxObj8 = {};
      var value_ids8 = {};
      jQuery.each( jQuery.parseJSON( inputIds8 ), function( key, values ) {
        jQuery.each( values, function( index, input_id ) {
          tagName =  jQuery('#form8 [id^="wdform_'+ input_id +'_elemen"]').prop("tagName");
          type =  jQuery('#form8 [id^="wdform_'+ input_id +'_elemen"]').prop("type");
          if ( tagName == 'INPUT' ) {
            input_value = jQuery('#form8 [id^="wdform_'+ input_id +'_elemen"]').val();
            if ( jQuery('#form8 [id^="wdform_'+ input_id +'_elemen"]').is(':checked') ) {
              if ( input_value ) {
                value_ids8[key + '|' + input_id] = input_value;
              }
            }
            else if ( type == 'text' ) {
              if ( input_value ) {
                value_ids8[key + '|' + input_id] = input_value;
              }
            }
          }
          else if ( tagName == 'SELECT' ) {
            select_value = jQuery('#form8 [id^="wdform_'+ input_id +'_elemen"] option:selected').val();
            if ( select_value ) {
              value_ids8[key + '|' + input_id] = select_value;
            }
          }
          ajaxObj8.inputs = value_ids8;
          jQuery(document).on('change', '#form8 [id^="wdform_'+ input_id +'_elemen"]', function() {
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
          value_ids8[key + '|' + input_id] = id;
          jQuery.each( value_ids8, function( k, v ) {
            key_arr = k.split('|');
            if ( input_id == key_arr[2] ) {
              changing_field_id = key_arr[0];
              count = Object.keys(value_ids8).length;
              value_ids8 = unset_fields8( value_ids8, changing_field_id, count );
            }
          });
          ajaxObj8.inputs = value_ids8;
          ajax_similarity8( ajaxObj8, changing_field_id );
          });
        });
      });
      if ( update_first_field_id8 && !jQuery.isEmptyObject(ajaxObj8.inputs) ) {
        ajax_similarity8( ajaxObj8, update_first_field_id8 );
      }
	  }
    jQuery(document).ready(function () {
      fm_script_ready8();
    });
    