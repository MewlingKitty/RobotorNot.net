    var fm_currentDate = new Date();
    var FormCurrency_25 = '$';
    var FormPaypalTax_25 = '0';
    var check_submit25 = 0;
    var check_before_submit25 = {};
    var required_fields25 = ["3","4","5","6","7","8"];
    var labels_and_ids25 = {"3":"type_own_select","4":"type_own_select","5":"type_own_select","6":"type_own_select","7":"type_own_select","8":"type_own_select","2":"type_submit_reset"};
    var check_regExp_all25 = [];
    var check_paypal_price_min_max25 = [];
    var file_upload_check25 = [];
    var spinner_check25 = [];
    var scrollbox_trigger_point25 = '20';
    var header_image_animation25 = 'none';
    var scrollbox_loading_delay25 = '0';
    var scrollbox_auto_hide25 = '1';
    var inputIds25 = '[]';
        var update_first_field_id25 = 0;
    var form_view_count25 = 0;
     function before_load25() {	
}	
 function before_submit25() {
	 }	
 function before_reset25() {	
}
 function after_submit25() {
  
}    function onload_js25() {    }

    function condition_js25() {    }

    function check_js25(id, form_id) {
      if (id != 0) {
        x = jQuery("#" + form_id + "form_view"+id);
      }
      else {
        x = jQuery("#form"+form_id);
      }
          }

    function onsubmit_js25() {
      
    var disabled_fields = "";
    jQuery("#form25 div[wdid]").each(function() {
      if(jQuery(this).css("display") == "none") {
        disabled_fields += jQuery(this).attr("wdid");
        disabled_fields += ",";
      }
    })
    if(disabled_fields) {
      jQuery("<input type=\"hidden\" name=\"disabled_fields25\" value =\""+disabled_fields+"\" />").appendTo("#form25");
    };    }

    function unset_fields25( values, id, i ) {
      rid = 0;
      if ( i > 0 ) {
        jQuery.each( values, function( k, v ) {
          if ( id == k.split('|')[2] ) {
            rid = k.split('|')[0];
            values[k] = '';
          }
        });
        return unset_fields25(values, rid, i - 1);
      }
      else {
        return values;
      }
    }

    function ajax_similarity25( obj, changing_field_id ) {
      jQuery.ajax({
        type: "POST",
        url: fm_objectL10n.form_maker_admin_ajax,
        dataType: "json",
        data: {
          nonce: fm_ajax.ajaxnonce,
          action: 'fm_reload_input',
          page: 'form_maker',
          form_id: 25,
          inputs: obj.inputs
        },
        beforeSend: function() {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              if ( val != '' && parseInt(wdid) == parseInt(changing_field_id) ) {
                jQuery("#form25 div[wdid='"+ wdid +"']").append( '<div class="fm-loading"></div>' );
              }
            });
          }
        },
        success: function (res) {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              jQuery("#form25 div[wdid='"+ wdid +"'] .fm-loading").remove();
              if ( !jQuery.isEmptyObject(res[wdid]) && ( !val || parseInt(wdid) == parseInt(changing_field_id) ) ) {
                jQuery("#form25 div[wdid='"+ wdid +"']").html( res[wdid].html );
              }
            });
          }
        },
        complete: function() {
        }
      });
    }

    function fm_script_ready25() {
      if (jQuery('#form25 .wdform_section').length > 0) {
        fm_document_ready( 25 );
      }
      else {
        jQuery("#form25").closest(".fm-form-container").removeAttr("style")
      }
      if (jQuery('#form25 .wdform_section').length > 0) {
        formOnload(25);
      }
      var ajaxObj25 = {};
      var value_ids25 = {};
      jQuery.each( jQuery.parseJSON( inputIds25 ), function( key, values ) {
        jQuery.each( values, function( index, input_id ) {
          tagName =  jQuery('#form25 [id^="wdform_'+ input_id +'_elemen"]').attr("tagName");
          type =  jQuery('#form25 [id^="wdform_'+ input_id +'_elemen"]').attr("type");
          if ( tagName == 'INPUT' ) {
            input_value = jQuery('#form25 [id^="wdform_'+ input_id +'_elemen"]').val();
            if ( jQuery('#form25 [id^="wdform_'+ input_id +'_elemen"]').is(':checked') ) {
              if ( input_value ) {
                value_ids25[key + '|' + input_id] = input_value;
              }
            }
            else if ( type == 'text' ) {
              if ( input_value ) {
                value_ids25[key + '|' + input_id] = input_value;
              }
            }
          }
          else if ( tagName == 'SELECT' ) {
            select_value = jQuery('#form25 [id^="wdform_'+ input_id +'_elemen"] option:selected').val();
            if ( select_value ) {
              value_ids25[key + '|' + input_id] = select_value;
            }
          }
          ajaxObj25.inputs = value_ids25;
          jQuery(document).on('change', '#form25 [id^="wdform_'+ input_id +'_elemen"]', function() {
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
          value_ids25[key + '|' + input_id] = id;
          jQuery.each( value_ids25, function( k, v ) {
            key_arr = k.split('|');
            if ( input_id == key_arr[2] ) {
              changing_field_id = key_arr[0];
              count = Object.keys(value_ids25).length;
              value_ids25 = unset_fields25( value_ids25, changing_field_id, count );
            }
          });
          ajaxObj25.inputs = value_ids25;
          ajax_similarity25( ajaxObj25, changing_field_id );
          });
        });
      });
      if ( update_first_field_id25 && !jQuery.isEmptyObject(ajaxObj25.inputs) ) {
        ajax_similarity25( ajaxObj25, update_first_field_id25 );
      }
	  }
    jQuery(function () {
      fm_script_ready25();
    });
    