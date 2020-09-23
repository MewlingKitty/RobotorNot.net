    var fm_currentDate = new Date();
    var FormCurrency_19 = '$';
    var FormPaypalTax_19 = '0';
    var check_submit19 = 0;
    var check_before_submit19 = {};
    var required_fields19 = ["18"];
    var labels_and_ids19 = {"18":"type_own_select","16":"type_submit_reset"};
    var check_regExp_all19 = [];
    var check_paypal_price_min_max19 = [];
    var file_upload_check19 = [];
    var spinner_check19 = [];
    var scrollbox_trigger_point19 = '20';
    var header_image_animation19 = 'none';
    var scrollbox_loading_delay19 = '0';
    var scrollbox_auto_hide19 = '1';
    var inputIds19 = '[]';
        var update_first_field_id19 = 0;
    var form_view_count19 = 0;
     function before_load19() {
     
}

 function before_submit19() {
      }

 function before_reset19() {
     
}
 function after_submit19() {
     
}    function onload_js19() {    }

    function condition_js19() {    }

    function check_js19(id, form_id) {
      if (id != 0) {
        x = jQuery("#" + form_id + "form_view"+id);
      }
      else {
        x = jQuery("#form"+form_id);
      }
          }

    function onsubmit_js19() {
      
    var disabled_fields = "";
    jQuery("#form19 div[wdid]").each(function() {
      if(jQuery(this).css("display") == "none") {
        disabled_fields += jQuery(this).attr("wdid");
        disabled_fields += ",";
      }
    })
    if(disabled_fields) {
      jQuery("<input type=\"hidden\" name=\"disabled_fields19\" value =\""+disabled_fields+"\" />").appendTo("#form19");
    };    }

    function unset_fields19( values, id, i ) {
      rid = 0;
      if ( i > 0 ) {
        jQuery.each( values, function( k, v ) {
          if ( id == k.split('|')[2] ) {
            rid = k.split('|')[0];
            values[k] = '';
          }
        });
        return unset_fields19(values, rid, i - 1);
      }
      else {
        return values;
      }
    }

    function ajax_similarity19( obj, changing_field_id ) {
      jQuery.ajax({
        type: "POST",
        url: fm_objectL10n.form_maker_admin_ajax,
        dataType: "json",
        data: {
          nonce: fm_ajax.ajaxnonce,
          action: 'fm_reload_input',
          page: 'form_maker',
          form_id: 19,
          inputs: obj.inputs
        },
        beforeSend: function() {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              if ( val != '' && parseInt(wdid) == parseInt(changing_field_id) ) {
                jQuery("#form19 div[wdid='"+ wdid +"']").append( '<div class="fm-loading"></div>' );
              }
            });
          }
        },
        success: function (res) {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              jQuery("#form19 div[wdid='"+ wdid +"'] .fm-loading").remove();
              if ( !jQuery.isEmptyObject(res[wdid]) && ( !val || parseInt(wdid) == parseInt(changing_field_id) ) ) {
                jQuery("#form19 div[wdid='"+ wdid +"']").html( res[wdid].html );
              }
            });
          }
        },
        complete: function() {
        }
      });
    }

    function fm_script_ready19() {
      if (jQuery('#form19 .wdform_section').length > 0) {
        fm_document_ready( 19 );
      }
      else {
        jQuery("#form19").closest(".fm-form-container").removeAttr("style")
      }
      if (jQuery('#form19 .wdform_section').length > 0) {
        formOnload(19);
      }
      var ajaxObj19 = {};
      var value_ids19 = {};
      jQuery.each( jQuery.parseJSON( inputIds19 ), function( key, values ) {
        jQuery.each( values, function( index, input_id ) {
          tagName =  jQuery('#form19 [id^="wdform_'+ input_id +'_elemen"]').prop("tagName");
          type =  jQuery('#form19 [id^="wdform_'+ input_id +'_elemen"]').prop("type");
          if ( tagName == 'INPUT' ) {
            input_value = jQuery('#form19 [id^="wdform_'+ input_id +'_elemen"]').val();
            if ( jQuery('#form19 [id^="wdform_'+ input_id +'_elemen"]').is(':checked') ) {
              if ( input_value ) {
                value_ids19[key + '|' + input_id] = input_value;
              }
            }
            else if ( type == 'text' ) {
              if ( input_value ) {
                value_ids19[key + '|' + input_id] = input_value;
              }
            }
          }
          else if ( tagName == 'SELECT' ) {
            select_value = jQuery('#form19 [id^="wdform_'+ input_id +'_elemen"] option:selected').val();
            if ( select_value ) {
              value_ids19[key + '|' + input_id] = select_value;
            }
          }
          ajaxObj19.inputs = value_ids19;
          jQuery(document).on('change', '#form19 [id^="wdform_'+ input_id +'_elemen"]', function() {
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
          value_ids19[key + '|' + input_id] = id;
          jQuery.each( value_ids19, function( k, v ) {
            key_arr = k.split('|');
            if ( input_id == key_arr[2] ) {
              changing_field_id = key_arr[0];
              count = Object.keys(value_ids19).length;
              value_ids19 = unset_fields19( value_ids19, changing_field_id, count );
            }
          });
          ajaxObj19.inputs = value_ids19;
          ajax_similarity19( ajaxObj19, changing_field_id );
          });
        });
      });
      if ( update_first_field_id19 && !jQuery.isEmptyObject(ajaxObj19.inputs) ) {
        ajax_similarity19( ajaxObj19, update_first_field_id19 );
      }
	  }
    jQuery(function () {
      fm_script_ready19();
    });
    