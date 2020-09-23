    var fm_currentDate = new Date();
    var FormCurrency_27 = '$';
    var FormPaypalTax_27 = '0';
    var check_submit27 = 0;
    var check_before_submit27 = {};
    var required_fields27 = ["3","4","5","6","7","8"];
    var labels_and_ids27 = {"3":"type_own_select","4":"type_own_select","5":"type_own_select","6":"type_own_select","7":"type_own_select","8":"type_own_select","2":"type_submit_reset"};
    var check_regExp_all27 = [];
    var check_paypal_price_min_max27 = [];
    var file_upload_check27 = [];
    var spinner_check27 = [];
    var scrollbox_trigger_point27 = '20';
    var header_image_animation27 = 'none';
    var scrollbox_loading_delay27 = '0';
    var scrollbox_auto_hide27 = '1';
    var inputIds27 = '[]';
        var update_first_field_id27 = 0;
    var form_view_count27 = 0;
     function before_load27() {	
}	
 function before_submit27() {
	 }	
 function before_reset27() {	
}
 function after_submit27() {
  
}    function onload_js27() {    }

    function condition_js27() {    }

    function check_js27(id, form_id) {
      if (id != 0) {
        x = jQuery("#" + form_id + "form_view"+id);
      }
      else {
        x = jQuery("#form"+form_id);
      }
          }

    function onsubmit_js27() {
      
    var disabled_fields = "";
    jQuery("#form27 div[wdid]").each(function() {
      if(jQuery(this).css("display") == "none") {
        disabled_fields += jQuery(this).attr("wdid");
        disabled_fields += ",";
      }
    })
    if(disabled_fields) {
      jQuery("<input type=\"hidden\" name=\"disabled_fields27\" value =\""+disabled_fields+"\" />").appendTo("#form27");
    };    }

    function unset_fields27( values, id, i ) {
      rid = 0;
      if ( i > 0 ) {
        jQuery.each( values, function( k, v ) {
          if ( id == k.split('|')[2] ) {
            rid = k.split('|')[0];
            values[k] = '';
          }
        });
        return unset_fields27(values, rid, i - 1);
      }
      else {
        return values;
      }
    }

    function ajax_similarity27( obj, changing_field_id ) {
      jQuery.ajax({
        type: "POST",
        url: fm_objectL10n.form_maker_admin_ajax,
        dataType: "json",
        data: {
          nonce: fm_ajax.ajaxnonce,
          action: 'fm_reload_input',
          page: 'form_maker',
          form_id: 27,
          inputs: obj.inputs
        },
        beforeSend: function() {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              if ( val != '' && parseInt(wdid) == parseInt(changing_field_id) ) {
                jQuery("#form27 div[wdid='"+ wdid +"']").append( '<div class="fm-loading"></div>' );
              }
            });
          }
        },
        success: function (res) {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              jQuery("#form27 div[wdid='"+ wdid +"'] .fm-loading").remove();
              if ( !jQuery.isEmptyObject(res[wdid]) && ( !val || parseInt(wdid) == parseInt(changing_field_id) ) ) {
                jQuery("#form27 div[wdid='"+ wdid +"']").html( res[wdid].html );
              }
            });
          }
        },
        complete: function() {
        }
      });
    }

    function fm_script_ready27() {
      if (jQuery('#form27 .wdform_section').length > 0) {
        fm_document_ready( 27 );
      }
      else {
        jQuery("#form27").closest(".fm-form-container").removeAttr("style")
      }
      if (jQuery('#form27 .wdform_section').length > 0) {
        formOnload(27);
      }
      var ajaxObj27 = {};
      var value_ids27 = {};
      jQuery.each( jQuery.parseJSON( inputIds27 ), function( key, values ) {
        jQuery.each( values, function( index, input_id ) {
          tagName =  jQuery('#form27 [id^="wdform_'+ input_id +'_elemen"]').attr("tagName");
          type =  jQuery('#form27 [id^="wdform_'+ input_id +'_elemen"]').attr("type");
          if ( tagName == 'INPUT' ) {
            input_value = jQuery('#form27 [id^="wdform_'+ input_id +'_elemen"]').val();
            if ( jQuery('#form27 [id^="wdform_'+ input_id +'_elemen"]').is(':checked') ) {
              if ( input_value ) {
                value_ids27[key + '|' + input_id] = input_value;
              }
            }
            else if ( type == 'text' ) {
              if ( input_value ) {
                value_ids27[key + '|' + input_id] = input_value;
              }
            }
          }
          else if ( tagName == 'SELECT' ) {
            select_value = jQuery('#form27 [id^="wdform_'+ input_id +'_elemen"] option:selected').val();
            if ( select_value ) {
              value_ids27[key + '|' + input_id] = select_value;
            }
          }
          ajaxObj27.inputs = value_ids27;
          jQuery(document).on('change', '#form27 [id^="wdform_'+ input_id +'_elemen"]', function() {
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
          value_ids27[key + '|' + input_id] = id;
          jQuery.each( value_ids27, function( k, v ) {
            key_arr = k.split('|');
            if ( input_id == key_arr[2] ) {
              changing_field_id = key_arr[0];
              count = Object.keys(value_ids27).length;
              value_ids27 = unset_fields27( value_ids27, changing_field_id, count );
            }
          });
          ajaxObj27.inputs = value_ids27;
          ajax_similarity27( ajaxObj27, changing_field_id );
          });
        });
      });
      if ( update_first_field_id27 && !jQuery.isEmptyObject(ajaxObj27.inputs) ) {
        ajax_similarity27( ajaxObj27, update_first_field_id27 );
      }
	  }
    jQuery(function () {
      fm_script_ready27();
    });
    