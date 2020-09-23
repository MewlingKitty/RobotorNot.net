    var fm_currentDate = new Date();
    var FormCurrency_17 = '$';
    var FormPaypalTax_17 = '0';
    var check_submit17 = 0;
    var check_before_submit17 = {};
    var required_fields17 = ["2"];
    var labels_and_ids17 = {"2":"type_own_select","1":"type_submit_reset"};
    var check_regExp_all17 = [];
    var check_paypal_price_min_max17 = [];
    var file_upload_check17 = [];
    var spinner_check17 = [];
    var scrollbox_trigger_point17 = '20';
    var header_image_animation17 = 'none';
    var scrollbox_loading_delay17 = '0';
    var scrollbox_auto_hide17 = '1';
    var inputIds17 = '[]';
        var update_first_field_id17 = 0;
    var form_view_count17 = 0;
     function before_load17() {	
}	
 function before_submit17() {
	 }	
 function before_reset17() {	
}
 function after_submit17() {
  
}    function onload_js17() {    }

    function condition_js17() {    }

    function check_js17(id, form_id) {
      if (id != 0) {
        x = jQuery("#" + form_id + "form_view"+id);
      }
      else {
        x = jQuery("#form"+form_id);
      }
          }

    function onsubmit_js17() {
      
    var disabled_fields = "";
    jQuery("#form17 div[wdid]").each(function() {
      if(jQuery(this).css("display") == "none") {
        disabled_fields += jQuery(this).attr("wdid");
        disabled_fields += ",";
      }
    })
    if(disabled_fields) {
      jQuery("<input type=\"hidden\" name=\"disabled_fields17\" value =\""+disabled_fields+"\" />").appendTo("#form17");
    };    }

    function unset_fields17( values, id, i ) {
      rid = 0;
      if ( i > 0 ) {
        jQuery.each( values, function( k, v ) {
          if ( id == k.split('|')[2] ) {
            rid = k.split('|')[0];
            values[k] = '';
          }
        });
        return unset_fields17(values, rid, i - 1);
      }
      else {
        return values;
      }
    }

    function ajax_similarity17( obj, changing_field_id ) {
      jQuery.ajax({
        type: "POST",
        url: fm_objectL10n.form_maker_admin_ajax,
        dataType: "json",
        data: {
          nonce: fm_ajax.ajaxnonce,
          action: 'fm_reload_input',
          page: 'form_maker',
          form_id: 17,
          inputs: obj.inputs
        },
        beforeSend: function() {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              if ( val != '' && parseInt(wdid) == parseInt(changing_field_id) ) {
                jQuery("#form17 div[wdid='"+ wdid +"']").append( '<div class="fm-loading"></div>' );
              }
            });
          }
        },
        success: function (res) {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              jQuery("#form17 div[wdid='"+ wdid +"'] .fm-loading").remove();
              if ( !jQuery.isEmptyObject(res[wdid]) && ( !val || parseInt(wdid) == parseInt(changing_field_id) ) ) {
                jQuery("#form17 div[wdid='"+ wdid +"']").html( res[wdid].html );
              }
            });
          }
        },
        complete: function() {
        }
      });
    }

    function fm_script_ready17() {
      if (jQuery('#form17 .wdform_section').length > 0) {
        fm_document_ready( 17 );
      }
      else {
        jQuery("#form17").closest(".fm-form-container").removeAttr("style")
      }
      if (jQuery('#form17 .wdform_section').length > 0) {
        formOnload(17);
      }
      var ajaxObj17 = {};
      var value_ids17 = {};
      jQuery.each( jQuery.parseJSON( inputIds17 ), function( key, values ) {
        jQuery.each( values, function( index, input_id ) {
          tagName =  jQuery('#form17 [id^="wdform_'+ input_id +'_elemen"]').prop("tagName");
          type =  jQuery('#form17 [id^="wdform_'+ input_id +'_elemen"]').prop("type");
          if ( tagName == 'INPUT' ) {
            input_value = jQuery('#form17 [id^="wdform_'+ input_id +'_elemen"]').val();
            if ( jQuery('#form17 [id^="wdform_'+ input_id +'_elemen"]').is(':checked') ) {
              if ( input_value ) {
                value_ids17[key + '|' + input_id] = input_value;
              }
            }
            else if ( type == 'text' ) {
              if ( input_value ) {
                value_ids17[key + '|' + input_id] = input_value;
              }
            }
          }
          else if ( tagName == 'SELECT' ) {
            select_value = jQuery('#form17 [id^="wdform_'+ input_id +'_elemen"] option:selected').val();
            if ( select_value ) {
              value_ids17[key + '|' + input_id] = select_value;
            }
          }
          ajaxObj17.inputs = value_ids17;
          jQuery(document).on('change', '#form17 [id^="wdform_'+ input_id +'_elemen"]', function() {
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
          value_ids17[key + '|' + input_id] = id;
          jQuery.each( value_ids17, function( k, v ) {
            key_arr = k.split('|');
            if ( input_id == key_arr[2] ) {
              changing_field_id = key_arr[0];
              count = Object.keys(value_ids17).length;
              value_ids17 = unset_fields17( value_ids17, changing_field_id, count );
            }
          });
          ajaxObj17.inputs = value_ids17;
          ajax_similarity17( ajaxObj17, changing_field_id );
          });
        });
      });
      if ( update_first_field_id17 && !jQuery.isEmptyObject(ajaxObj17.inputs) ) {
        ajax_similarity17( ajaxObj17, update_first_field_id17 );
      }
	  }
    jQuery(function () {
      fm_script_ready17();
    });
    