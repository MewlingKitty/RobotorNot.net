    var fm_currentDate = new Date();
    var FormCurrency_21 = '$';
    var FormPaypalTax_21 = '0';
    var check_submit21 = 0;
    var check_before_submit21 = {};
    var required_fields21 = ["2"];
    var labels_and_ids21 = {"2":"type_own_select","8":"type_submit_reset"};
    var check_regExp_all21 = [];
    var check_paypal_price_min_max21 = [];
    var file_upload_check21 = [];
    var spinner_check21 = [];
    var scrollbox_trigger_point21 = '20';
    var header_image_animation21 = 'none';
    var scrollbox_loading_delay21 = '0';
    var scrollbox_auto_hide21 = '1';
    var inputIds21 = '[]';
        var update_first_field_id21 = 0;
    var form_view_count21 = 0;
     function before_load21() {
     
}

 function before_submit21() {
      }

 function before_reset21() {
     
}
 function after_submit21() {
     
}    function onload_js21() {    }

    function condition_js21() {    }

    function check_js21(id, form_id) {
      if (id != 0) {
        x = jQuery("#" + form_id + "form_view"+id);
      }
      else {
        x = jQuery("#form"+form_id);
      }
          }

    function onsubmit_js21() {
      
    var disabled_fields = "";
    jQuery("#form21 div[wdid]").each(function() {
      if(jQuery(this).css("display") == "none") {
        disabled_fields += jQuery(this).attr("wdid");
        disabled_fields += ",";
      }
    })
    if(disabled_fields) {
      jQuery("<input type=\"hidden\" name=\"disabled_fields21\" value =\""+disabled_fields+"\" />").appendTo("#form21");
    };    }

    function unset_fields21( values, id, i ) {
      rid = 0;
      if ( i > 0 ) {
        jQuery.each( values, function( k, v ) {
          if ( id == k.split('|')[2] ) {
            rid = k.split('|')[0];
            values[k] = '';
          }
        });
        return unset_fields21(values, rid, i - 1);
      }
      else {
        return values;
      }
    }

    function ajax_similarity21( obj, changing_field_id ) {
      jQuery.ajax({
        type: "POST",
        url: fm_objectL10n.form_maker_admin_ajax,
        dataType: "json",
        data: {
          nonce: fm_ajax.ajaxnonce,
          action: 'fm_reload_input',
          page: 'form_maker',
          form_id: 21,
          inputs: obj.inputs
        },
        beforeSend: function() {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              if ( val != '' && parseInt(wdid) == parseInt(changing_field_id) ) {
                jQuery("#form21 div[wdid='"+ wdid +"']").append( '<div class="fm-loading"></div>' );
              }
            });
          }
        },
        success: function (res) {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              jQuery("#form21 div[wdid='"+ wdid +"'] .fm-loading").remove();
              if ( !jQuery.isEmptyObject(res[wdid]) && ( !val || parseInt(wdid) == parseInt(changing_field_id) ) ) {
                jQuery("#form21 div[wdid='"+ wdid +"']").html( res[wdid].html );
              }
            });
          }
        },
        complete: function() {
        }
      });
    }

    function fm_script_ready21() {
      if (jQuery('#form21 .wdform_section').length > 0) {
        fm_document_ready( 21 );
      }
      else {
        jQuery("#form21").closest(".fm-form-container").removeAttr("style")
      }
      if (jQuery('#form21 .wdform_section').length > 0) {
        formOnload(21);
      }
      var ajaxObj21 = {};
      var value_ids21 = {};
      jQuery.each( jQuery.parseJSON( inputIds21 ), function( key, values ) {
        jQuery.each( values, function( index, input_id ) {
          tagName =  jQuery('#form21 [id^="wdform_'+ input_id +'_elemen"]').prop("tagName");
          type =  jQuery('#form21 [id^="wdform_'+ input_id +'_elemen"]').prop("type");
          if ( tagName == 'INPUT' ) {
            input_value = jQuery('#form21 [id^="wdform_'+ input_id +'_elemen"]').val();
            if ( jQuery('#form21 [id^="wdform_'+ input_id +'_elemen"]').is(':checked') ) {
              if ( input_value ) {
                value_ids21[key + '|' + input_id] = input_value;
              }
            }
            else if ( type == 'text' ) {
              if ( input_value ) {
                value_ids21[key + '|' + input_id] = input_value;
              }
            }
          }
          else if ( tagName == 'SELECT' ) {
            select_value = jQuery('#form21 [id^="wdform_'+ input_id +'_elemen"] option:selected').val();
            if ( select_value ) {
              value_ids21[key + '|' + input_id] = select_value;
            }
          }
          ajaxObj21.inputs = value_ids21;
          jQuery(document).on('change', '#form21 [id^="wdform_'+ input_id +'_elemen"]', function() {
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
          value_ids21[key + '|' + input_id] = id;
          jQuery.each( value_ids21, function( k, v ) {
            key_arr = k.split('|');
            if ( input_id == key_arr[2] ) {
              changing_field_id = key_arr[0];
              count = Object.keys(value_ids21).length;
              value_ids21 = unset_fields21( value_ids21, changing_field_id, count );
            }
          });
          ajaxObj21.inputs = value_ids21;
          ajax_similarity21( ajaxObj21, changing_field_id );
          });
        });
      });
      if ( update_first_field_id21 && !jQuery.isEmptyObject(ajaxObj21.inputs) ) {
        ajax_similarity21( ajaxObj21, update_first_field_id21 );
      }
	  }
    jQuery(function () {
      fm_script_ready21();
    });
    