    var fm_currentDate = new Date();
    var FormCurrency_20 = '$';
    var FormPaypalTax_20 = '0';
    var check_submit20 = 0;
    var check_before_submit20 = {};
    var required_fields20 = ["2"];
    var labels_and_ids20 = {"2":"type_own_select","1":"type_submit_reset"};
    var check_regExp_all20 = [];
    var check_paypal_price_min_max20 = [];
    var file_upload_check20 = [];
    var spinner_check20 = [];
    var scrollbox_trigger_point20 = '20';
    var header_image_animation20 = 'none';
    var scrollbox_loading_delay20 = '0';
    var scrollbox_auto_hide20 = '1';
    var inputIds20 = '[]';
        var update_first_field_id20 = 0;
    var form_view_count20 = 0;
     function before_load20() {	
}	
 function before_submit20() {
	 }	
 function before_reset20() {	
}
 function after_submit20() {
  
}    function onload_js20() {    }

    function condition_js20() {    }

    function check_js20(id, form_id) {
      if (id != 0) {
        x = jQuery("#" + form_id + "form_view"+id);
      }
      else {
        x = jQuery("#form"+form_id);
      }
          }

    function onsubmit_js20() {
      
    var disabled_fields = "";
    jQuery("#form20 div[wdid]").each(function() {
      if(jQuery(this).css("display") == "none") {
        disabled_fields += jQuery(this).attr("wdid");
        disabled_fields += ",";
      }
    })
    if(disabled_fields) {
      jQuery("<input type=\"hidden\" name=\"disabled_fields20\" value =\""+disabled_fields+"\" />").appendTo("#form20");
    };    }

    function unset_fields20( values, id, i ) {
      rid = 0;
      if ( i > 0 ) {
        jQuery.each( values, function( k, v ) {
          if ( id == k.split('|')[2] ) {
            rid = k.split('|')[0];
            values[k] = '';
          }
        });
        return unset_fields20(values, rid, i - 1);
      }
      else {
        return values;
      }
    }

    function ajax_similarity20( obj, changing_field_id ) {
      jQuery.ajax({
        type: "POST",
        url: fm_objectL10n.form_maker_admin_ajax,
        dataType: "json",
        data: {
          nonce: fm_ajax.ajaxnonce,
          action: 'fm_reload_input',
          page: 'form_maker',
          form_id: 20,
          inputs: obj.inputs
        },
        beforeSend: function() {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              if ( val != '' && parseInt(wdid) == parseInt(changing_field_id) ) {
                jQuery("#form20 div[wdid='"+ wdid +"']").append( '<div class="fm-loading"></div>' );
              }
            });
          }
        },
        success: function (res) {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              jQuery("#form20 div[wdid='"+ wdid +"'] .fm-loading").remove();
              if ( !jQuery.isEmptyObject(res[wdid]) && ( !val || parseInt(wdid) == parseInt(changing_field_id) ) ) {
                jQuery("#form20 div[wdid='"+ wdid +"']").html( res[wdid].html );
              }
            });
          }
        },
        complete: function() {
        }
      });
    }

    function fm_script_ready20() {
      if (jQuery('#form20 .wdform_section').length > 0) {
        fm_document_ready( 20 );
      }
      else {
        jQuery("#form20").closest(".fm-form-container").removeAttr("style")
      }
      if (jQuery('#form20 .wdform_section').length > 0) {
        formOnload(20);
      }
      var ajaxObj20 = {};
      var value_ids20 = {};
      jQuery.each( jQuery.parseJSON( inputIds20 ), function( key, values ) {
        jQuery.each( values, function( index, input_id ) {
          tagName =  jQuery('#form20 [id^="wdform_'+ input_id +'_elemen"]').prop("tagName");
          type =  jQuery('#form20 [id^="wdform_'+ input_id +'_elemen"]').prop("type");
          if ( tagName == 'INPUT' ) {
            input_value = jQuery('#form20 [id^="wdform_'+ input_id +'_elemen"]').val();
            if ( jQuery('#form20 [id^="wdform_'+ input_id +'_elemen"]').is(':checked') ) {
              if ( input_value ) {
                value_ids20[key + '|' + input_id] = input_value;
              }
            }
            else if ( type == 'text' ) {
              if ( input_value ) {
                value_ids20[key + '|' + input_id] = input_value;
              }
            }
          }
          else if ( tagName == 'SELECT' ) {
            select_value = jQuery('#form20 [id^="wdform_'+ input_id +'_elemen"] option:selected').val();
            if ( select_value ) {
              value_ids20[key + '|' + input_id] = select_value;
            }
          }
          ajaxObj20.inputs = value_ids20;
          jQuery(document).on('change', '#form20 [id^="wdform_'+ input_id +'_elemen"]', function() {
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
          value_ids20[key + '|' + input_id] = id;
          jQuery.each( value_ids20, function( k, v ) {
            key_arr = k.split('|');
            if ( input_id == key_arr[2] ) {
              changing_field_id = key_arr[0];
              count = Object.keys(value_ids20).length;
              value_ids20 = unset_fields20( value_ids20, changing_field_id, count );
            }
          });
          ajaxObj20.inputs = value_ids20;
          ajax_similarity20( ajaxObj20, changing_field_id );
          });
        });
      });
      if ( update_first_field_id20 && !jQuery.isEmptyObject(ajaxObj20.inputs) ) {
        ajax_similarity20( ajaxObj20, update_first_field_id20 );
      }
	  }
    jQuery(function () {
      fm_script_ready20();
    });
    