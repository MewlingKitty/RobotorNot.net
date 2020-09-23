    var fm_currentDate = new Date();
    var FormCurrency_14 = '$';
    var FormPaypalTax_14 = '0';
    var check_submit14 = 0;
    var check_before_submit14 = {};
    var required_fields14 = ["2","3","4","5","6","7"];
    var labels_and_ids14 = {"2":"type_own_select","3":"type_own_select","4":"type_own_select","5":"type_own_select","6":"type_own_select","7":"type_own_select","8":"type_submit_reset"};
    var check_regExp_all14 = [];
    var check_paypal_price_min_max14 = [];
    var file_upload_check14 = [];
    var spinner_check14 = [];
    var scrollbox_trigger_point14 = '20';
    var header_image_animation14 = 'none';
    var scrollbox_loading_delay14 = '0';
    var scrollbox_auto_hide14 = '1';
    var inputIds14 = '[]';
        var update_first_field_id14 = 0;
    var form_view_count14 = 0;
     function before_load14() {
     
}

 function before_submit14() {
      }

 function before_reset14() {
     
}
 function after_submit14() {
     
}    function onload_js14() {    }

    function condition_js14() {    }

    function check_js14(id, form_id) {
      if (id != 0) {
        x = jQuery("#" + form_id + "form_view"+id);
      }
      else {
        x = jQuery("#form"+form_id);
      }
          }

    function onsubmit_js14() {
      
    var disabled_fields = "";
    jQuery("#form14 div[wdid]").each(function() {
      if(jQuery(this).css("display") == "none") {
        disabled_fields += jQuery(this).attr("wdid");
        disabled_fields += ",";
      }
    })
    if(disabled_fields) {
      jQuery("<input type=\"hidden\" name=\"disabled_fields14\" value =\""+disabled_fields+"\" />").appendTo("#form14");
    };    }

    function unset_fields14( values, id, i ) {
      rid = 0;
      if ( i > 0 ) {
        jQuery.each( values, function( k, v ) {
          if ( id == k.split('|')[2] ) {
            rid = k.split('|')[0];
            values[k] = '';
          }
        });
        return unset_fields14(values, rid, i - 1);
      }
      else {
        return values;
      }
    }

    function ajax_similarity14( obj, changing_field_id ) {
      jQuery.ajax({
        type: "POST",
        url: fm_objectL10n.form_maker_admin_ajax,
        dataType: "json",
        data: {
          nonce: fm_ajax.ajaxnonce,
          action: 'fm_reload_input',
          page: 'form_maker',
          form_id: 14,
          inputs: obj.inputs
        },
        beforeSend: function() {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              if ( val != '' && parseInt(wdid) == parseInt(changing_field_id) ) {
                jQuery("#form14 div[wdid='"+ wdid +"']").append( '<div class="fm-loading"></div>' );
              }
            });
          }
        },
        success: function (res) {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              jQuery("#form14 div[wdid='"+ wdid +"'] .fm-loading").remove();
              if ( !jQuery.isEmptyObject(res[wdid]) && ( !val || parseInt(wdid) == parseInt(changing_field_id) ) ) {
                jQuery("#form14 div[wdid='"+ wdid +"']").html( res[wdid].html );
              }
            });
          }
        },
        complete: function() {
        }
      });
    }

    function fm_script_ready14() {
      if (jQuery('#form14 .wdform_section').length > 0) {
        fm_document_ready( 14 );
      }
      else {
        jQuery("#form14").closest(".fm-form-container").removeAttr("style")
      }
      if (jQuery('#form14 .wdform_section').length > 0) {
        formOnload(14);
      }
      var ajaxObj14 = {};
      var value_ids14 = {};
      jQuery.each( jQuery.parseJSON( inputIds14 ), function( key, values ) {
        jQuery.each( values, function( index, input_id ) {
          tagName =  jQuery('#form14 [id^="wdform_'+ input_id +'_elemen"]').prop("tagName");
          type =  jQuery('#form14 [id^="wdform_'+ input_id +'_elemen"]').prop("type");
          if ( tagName == 'INPUT' ) {
            input_value = jQuery('#form14 [id^="wdform_'+ input_id +'_elemen"]').val();
            if ( jQuery('#form14 [id^="wdform_'+ input_id +'_elemen"]').is(':checked') ) {
              if ( input_value ) {
                value_ids14[key + '|' + input_id] = input_value;
              }
            }
            else if ( type == 'text' ) {
              if ( input_value ) {
                value_ids14[key + '|' + input_id] = input_value;
              }
            }
          }
          else if ( tagName == 'SELECT' ) {
            select_value = jQuery('#form14 [id^="wdform_'+ input_id +'_elemen"] option:selected').val();
            if ( select_value ) {
              value_ids14[key + '|' + input_id] = select_value;
            }
          }
          ajaxObj14.inputs = value_ids14;
          jQuery(document).on('change', '#form14 [id^="wdform_'+ input_id +'_elemen"]', function() {
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
          value_ids14[key + '|' + input_id] = id;
          jQuery.each( value_ids14, function( k, v ) {
            key_arr = k.split('|');
            if ( input_id == key_arr[2] ) {
              changing_field_id = key_arr[0];
              count = Object.keys(value_ids14).length;
              value_ids14 = unset_fields14( value_ids14, changing_field_id, count );
            }
          });
          ajaxObj14.inputs = value_ids14;
          ajax_similarity14( ajaxObj14, changing_field_id );
          });
        });
      });
      if ( update_first_field_id14 && !jQuery.isEmptyObject(ajaxObj14.inputs) ) {
        ajax_similarity14( ajaxObj14, update_first_field_id14 );
      }
	  }
    jQuery(function () {
      fm_script_ready14();
    });
    