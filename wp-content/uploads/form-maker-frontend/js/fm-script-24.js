    var fm_currentDate = new Date();
    var FormCurrency_24 = '$';
    var FormPaypalTax_24 = '0';
    var check_submit24 = 0;
    var check_before_submit24 = {};
    var required_fields24 = ["9","10","11","12","13","14"];
    var labels_and_ids24 = {"9":"type_own_select","10":"type_own_select","11":"type_own_select","12":"type_own_select","13":"type_own_select","14":"type_own_select","15":"type_submit_reset"};
    var check_regExp_all24 = [];
    var check_paypal_price_min_max24 = [];
    var file_upload_check24 = [];
    var spinner_check24 = [];
    var scrollbox_trigger_point24 = '20';
    var header_image_animation24 = 'none';
    var scrollbox_loading_delay24 = '0';
    var scrollbox_auto_hide24 = '1';
    var inputIds24 = '[]';
        var update_first_field_id24 = 0;
    var form_view_count24 = 0;
     function before_load24() {
     
}

 function before_submit24() {
      }

 function before_reset24() {
     
}
 function after_submit24() {
     
}    function onload_js24() {    }

    function condition_js24() {    }

    function check_js24(id, form_id) {
      if (id != 0) {
        x = jQuery("#" + form_id + "form_view"+id);
      }
      else {
        x = jQuery("#form"+form_id);
      }
          }

    function onsubmit_js24() {
      
    var disabled_fields = "";
    jQuery("#form24 div[wdid]").each(function() {
      if(jQuery(this).css("display") == "none") {
        disabled_fields += jQuery(this).attr("wdid");
        disabled_fields += ",";
      }
    })
    if(disabled_fields) {
      jQuery("<input type=\"hidden\" name=\"disabled_fields24\" value =\""+disabled_fields+"\" />").appendTo("#form24");
    };    }

    function unset_fields24( values, id, i ) {
      rid = 0;
      if ( i > 0 ) {
        jQuery.each( values, function( k, v ) {
          if ( id == k.split('|')[2] ) {
            rid = k.split('|')[0];
            values[k] = '';
          }
        });
        return unset_fields24(values, rid, i - 1);
      }
      else {
        return values;
      }
    }

    function ajax_similarity24( obj, changing_field_id ) {
      jQuery.ajax({
        type: "POST",
        url: fm_objectL10n.form_maker_admin_ajax,
        dataType: "json",
        data: {
          nonce: fm_ajax.ajaxnonce,
          action: 'fm_reload_input',
          page: 'form_maker',
          form_id: 24,
          inputs: obj.inputs
        },
        beforeSend: function() {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              if ( val != '' && parseInt(wdid) == parseInt(changing_field_id) ) {
                jQuery("#form24 div[wdid='"+ wdid +"']").append( '<div class="fm-loading"></div>' );
              }
            });
          }
        },
        success: function (res) {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              jQuery("#form24 div[wdid='"+ wdid +"'] .fm-loading").remove();
              if ( !jQuery.isEmptyObject(res[wdid]) && ( !val || parseInt(wdid) == parseInt(changing_field_id) ) ) {
                jQuery("#form24 div[wdid='"+ wdid +"']").html( res[wdid].html );
              }
            });
          }
        },
        complete: function() {
        }
      });
    }

    function fm_script_ready24() {
      if (jQuery('#form24 .wdform_section').length > 0) {
        fm_document_ready( 24 );
      }
      else {
        jQuery("#form24").closest(".fm-form-container").removeAttr("style")
      }
      if (jQuery('#form24 .wdform_section').length > 0) {
        formOnload(24);
      }
      var ajaxObj24 = {};
      var value_ids24 = {};
      jQuery.each( jQuery.parseJSON( inputIds24 ), function( key, values ) {
        jQuery.each( values, function( index, input_id ) {
          tagName =  jQuery('#form24 [id^="wdform_'+ input_id +'_elemen"]').attr("tagName");
          type =  jQuery('#form24 [id^="wdform_'+ input_id +'_elemen"]').attr("type");
          if ( tagName == 'INPUT' ) {
            input_value = jQuery('#form24 [id^="wdform_'+ input_id +'_elemen"]').val();
            if ( jQuery('#form24 [id^="wdform_'+ input_id +'_elemen"]').is(':checked') ) {
              if ( input_value ) {
                value_ids24[key + '|' + input_id] = input_value;
              }
            }
            else if ( type == 'text' ) {
              if ( input_value ) {
                value_ids24[key + '|' + input_id] = input_value;
              }
            }
          }
          else if ( tagName == 'SELECT' ) {
            select_value = jQuery('#form24 [id^="wdform_'+ input_id +'_elemen"] option:selected').val();
            if ( select_value ) {
              value_ids24[key + '|' + input_id] = select_value;
            }
          }
          ajaxObj24.inputs = value_ids24;
          jQuery(document).on('change', '#form24 [id^="wdform_'+ input_id +'_elemen"]', function() {
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
          value_ids24[key + '|' + input_id] = id;
          jQuery.each( value_ids24, function( k, v ) {
            key_arr = k.split('|');
            if ( input_id == key_arr[2] ) {
              changing_field_id = key_arr[0];
              count = Object.keys(value_ids24).length;
              value_ids24 = unset_fields24( value_ids24, changing_field_id, count );
            }
          });
          ajaxObj24.inputs = value_ids24;
          ajax_similarity24( ajaxObj24, changing_field_id );
          });
        });
      });
      if ( update_first_field_id24 && !jQuery.isEmptyObject(ajaxObj24.inputs) ) {
        ajax_similarity24( ajaxObj24, update_first_field_id24 );
      }
	  }
    jQuery(function () {
      fm_script_ready24();
    });
    