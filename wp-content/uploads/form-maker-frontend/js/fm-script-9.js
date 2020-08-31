    var fm_currentDate = new Date();
    var FormCurrency_9 = '$';
    var FormPaypalTax_9 = '0';
    var check_submit9 = 0;
    var check_before_submit9 = {};
    var required_fields9 = ["2","3","4","5","6","7"];
    var labels_and_ids9 = {"2":"type_own_select","3":"type_own_select","4":"type_own_select","1":"type_submit_reset","5":"type_own_select","6":"type_own_select","7":"type_own_select","8":"type_text"};
    var check_regExp_all9 = [];
    var check_paypal_price_min_max9 = [];
    var file_upload_check9 = [];
    var spinner_check9 = [];
    var scrollbox_trigger_point9 = '20';
    var header_image_animation9 = 'none';
    var scrollbox_loading_delay9 = '0';
    var scrollbox_auto_hide9 = '1';
    var inputIds9 = '[]';
        var update_first_field_id9 = 0;
    var form_view_count9 = 0;
     function before_load9() {
     
}

 function before_submit9() {
      }

 function before_reset9() {
     
}
 function after_submit9() {
     
}    function onload_js9() {    }

    function condition_js9() {    }

    function check_js9(id, form_id) {
      if (id != 0) {
        x = jQuery("#" + form_id + "form_view"+id);
      }
      else {
        x = jQuery("#form"+form_id);
      }
          }

    function onsubmit_js9() {
      
    var disabled_fields = "";
    jQuery("#form9 div[wdid]").each(function() {
      if(jQuery(this).css("display") == "none") {
        disabled_fields += jQuery(this).attr("wdid");
        disabled_fields += ",";
      }
    })
    if(disabled_fields) {
      jQuery("<input type=\"hidden\" name=\"disabled_fields9\" value =\""+disabled_fields+"\" />").appendTo("#form9");
    };    }

    function unset_fields9( values, id, i ) {
      rid = 0;
      if ( i > 0 ) {
        jQuery.each( values, function( k, v ) {
          if ( id == k.split('|')[2] ) {
            rid = k.split('|')[0];
            values[k] = '';
          }
        });
        return unset_fields9(values, rid, i - 1);
      }
      else {
        return values;
      }
    }

    function ajax_similarity9( obj, changing_field_id ) {
      jQuery.ajax({
        type: "POST",
        url: fm_objectL10n.form_maker_admin_ajax,
        dataType: "json",
        data: {
          nonce: fm_ajax.ajaxnonce,
          action: 'fm_reload_input',
          page: 'form_maker',
          form_id: 9,
          inputs: obj.inputs
        },
        beforeSend: function() {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              if ( val != '' && parseInt(wdid) == parseInt(changing_field_id) ) {
                jQuery("#form9 div[wdid='"+ wdid +"']").append( '<div class="fm-loading"></div>' );
              }
            });
          }
        },
        success: function (res) {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              jQuery("#form9 div[wdid='"+ wdid +"'] .fm-loading").remove();
              if ( !jQuery.isEmptyObject(res[wdid]) && ( !val || parseInt(wdid) == parseInt(changing_field_id) ) ) {
                jQuery("#form9 div[wdid='"+ wdid +"']").html( res[wdid].html );
              }
            });
          }
        },
        complete: function() {
        }
      });
    }

    function fm_script_ready9() {
      if (jQuery('#form9 .wdform_section').length > 0) {
        fm_document_ready( 9 );
      }
      else {
        jQuery("#form9").closest(".fm-form-container").removeAttr("style")
      }
      if (jQuery('#form9 .wdform_section').length > 0) {
        formOnload(9);
      }
      var ajaxObj9 = {};
      var value_ids9 = {};
      jQuery.each( jQuery.parseJSON( inputIds9 ), function( key, values ) {
        jQuery.each( values, function( index, input_id ) {
          tagName =  jQuery('#form9 [id^="wdform_'+ input_id +'_elemen"]').prop("tagName");
          type =  jQuery('#form9 [id^="wdform_'+ input_id +'_elemen"]').prop("type");
          if ( tagName == 'INPUT' ) {
            input_value = jQuery('#form9 [id^="wdform_'+ input_id +'_elemen"]').val();
            if ( jQuery('#form9 [id^="wdform_'+ input_id +'_elemen"]').is(':checked') ) {
              if ( input_value ) {
                value_ids9[key + '|' + input_id] = input_value;
              }
            }
            else if ( type == 'text' ) {
              if ( input_value ) {
                value_ids9[key + '|' + input_id] = input_value;
              }
            }
          }
          else if ( tagName == 'SELECT' ) {
            select_value = jQuery('#form9 [id^="wdform_'+ input_id +'_elemen"] option:selected').val();
            if ( select_value ) {
              value_ids9[key + '|' + input_id] = select_value;
            }
          }
          ajaxObj9.inputs = value_ids9;
          jQuery(document).on('change', '#form9 [id^="wdform_'+ input_id +'_elemen"]', function() {
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
          value_ids9[key + '|' + input_id] = id;
          jQuery.each( value_ids9, function( k, v ) {
            key_arr = k.split('|');
            if ( input_id == key_arr[2] ) {
              changing_field_id = key_arr[0];
              count = Object.keys(value_ids9).length;
              value_ids9 = unset_fields9( value_ids9, changing_field_id, count );
            }
          });
          ajaxObj9.inputs = value_ids9;
          ajax_similarity9( ajaxObj9, changing_field_id );
          });
        });
      });
      if ( update_first_field_id9 && !jQuery.isEmptyObject(ajaxObj9.inputs) ) {
        ajax_similarity9( ajaxObj9, update_first_field_id9 );
      }
	  }
    jQuery(document).ready(function () {
      fm_script_ready9();
    });
    