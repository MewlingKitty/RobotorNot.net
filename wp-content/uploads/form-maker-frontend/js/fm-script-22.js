    var fm_currentDate = new Date();
    var FormCurrency_22 = '$';
    var FormPaypalTax_22 = '0';
    var check_submit22 = 0;
    var check_before_submit22 = {};
    var required_fields22 = ["2"];
    var labels_and_ids22 = {"2":"type_own_select","1":"type_submit_reset"};
    var check_regExp_all22 = [];
    var check_paypal_price_min_max22 = [];
    var file_upload_check22 = [];
    var spinner_check22 = [];
    var scrollbox_trigger_point22 = '20';
    var header_image_animation22 = 'none';
    var scrollbox_loading_delay22 = '0';
    var scrollbox_auto_hide22 = '1';
    var inputIds22 = '[]';
        var update_first_field_id22 = 0;
    var form_view_count22 = 0;
     function before_load22() {	
}	
 function before_submit22() {
	 }	
 function before_reset22() {	
}
 function after_submit22() {
  
}    function onload_js22() {    }

    function condition_js22() {    }

    function check_js22(id, form_id) {
      if (id != 0) {
        x = jQuery("#" + form_id + "form_view"+id);
      }
      else {
        x = jQuery("#form"+form_id);
      }
          }

    function onsubmit_js22() {
      
    var disabled_fields = "";
    jQuery("#form22 div[wdid]").each(function() {
      if(jQuery(this).css("display") == "none") {
        disabled_fields += jQuery(this).attr("wdid");
        disabled_fields += ",";
      }
    })
    if(disabled_fields) {
      jQuery("<input type=\"hidden\" name=\"disabled_fields22\" value =\""+disabled_fields+"\" />").appendTo("#form22");
    };    }

    function unset_fields22( values, id, i ) {
      rid = 0;
      if ( i > 0 ) {
        jQuery.each( values, function( k, v ) {
          if ( id == k.split('|')[2] ) {
            rid = k.split('|')[0];
            values[k] = '';
          }
        });
        return unset_fields22(values, rid, i - 1);
      }
      else {
        return values;
      }
    }

    function ajax_similarity22( obj, changing_field_id ) {
      jQuery.ajax({
        type: "POST",
        url: fm_objectL10n.form_maker_admin_ajax,
        dataType: "json",
        data: {
          nonce: fm_ajax.ajaxnonce,
          action: 'fm_reload_input',
          page: 'form_maker',
          form_id: 22,
          inputs: obj.inputs
        },
        beforeSend: function() {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              if ( val != '' && parseInt(wdid) == parseInt(changing_field_id) ) {
                jQuery("#form22 div[wdid='"+ wdid +"']").append( '<div class="fm-loading"></div>' );
              }
            });
          }
        },
        success: function (res) {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              jQuery("#form22 div[wdid='"+ wdid +"'] .fm-loading").remove();
              if ( !jQuery.isEmptyObject(res[wdid]) && ( !val || parseInt(wdid) == parseInt(changing_field_id) ) ) {
                jQuery("#form22 div[wdid='"+ wdid +"']").html( res[wdid].html );
              }
            });
          }
        },
        complete: function() {
        }
      });
    }

    function fm_script_ready22() {
      if (jQuery('#form22 .wdform_section').length > 0) {
        fm_document_ready( 22 );
      }
      else {
        jQuery("#form22").closest(".fm-form-container").removeAttr("style")
      }
      if (jQuery('#form22 .wdform_section').length > 0) {
        formOnload(22);
      }
      var ajaxObj22 = {};
      var value_ids22 = {};
      jQuery.each( jQuery.parseJSON( inputIds22 ), function( key, values ) {
        jQuery.each( values, function( index, input_id ) {
          tagName =  jQuery('#form22 [id^="wdform_'+ input_id +'_elemen"]').prop("tagName");
          type =  jQuery('#form22 [id^="wdform_'+ input_id +'_elemen"]').prop("type");
          if ( tagName == 'INPUT' ) {
            input_value = jQuery('#form22 [id^="wdform_'+ input_id +'_elemen"]').val();
            if ( jQuery('#form22 [id^="wdform_'+ input_id +'_elemen"]').is(':checked') ) {
              if ( input_value ) {
                value_ids22[key + '|' + input_id] = input_value;
              }
            }
            else if ( type == 'text' ) {
              if ( input_value ) {
                value_ids22[key + '|' + input_id] = input_value;
              }
            }
          }
          else if ( tagName == 'SELECT' ) {
            select_value = jQuery('#form22 [id^="wdform_'+ input_id +'_elemen"] option:selected').val();
            if ( select_value ) {
              value_ids22[key + '|' + input_id] = select_value;
            }
          }
          ajaxObj22.inputs = value_ids22;
          jQuery(document).on('change', '#form22 [id^="wdform_'+ input_id +'_elemen"]', function() {
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
          value_ids22[key + '|' + input_id] = id;
          jQuery.each( value_ids22, function( k, v ) {
            key_arr = k.split('|');
            if ( input_id == key_arr[2] ) {
              changing_field_id = key_arr[0];
              count = Object.keys(value_ids22).length;
              value_ids22 = unset_fields22( value_ids22, changing_field_id, count );
            }
          });
          ajaxObj22.inputs = value_ids22;
          ajax_similarity22( ajaxObj22, changing_field_id );
          });
        });
      });
      if ( update_first_field_id22 && !jQuery.isEmptyObject(ajaxObj22.inputs) ) {
        ajax_similarity22( ajaxObj22, update_first_field_id22 );
      }
	  }
    jQuery(function () {
      fm_script_ready22();
    });
    