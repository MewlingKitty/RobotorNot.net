    var fm_currentDate = new Date();
    var FormCurrency_26 = '$';
    var FormPaypalTax_26 = '0';
    var check_submit26 = 0;
    var check_before_submit26 = {};
    var required_fields26 = ["3","4","5","6","7","8"];
    var labels_and_ids26 = {"3":"type_own_select","4":"type_own_select","5":"type_own_select","6":"type_own_select","7":"type_own_select","8":"type_own_select","2":"type_submit_reset"};
    var check_regExp_all26 = [];
    var check_paypal_price_min_max26 = [];
    var file_upload_check26 = [];
    var spinner_check26 = [];
    var scrollbox_trigger_point26 = '20';
    var header_image_animation26 = 'none';
    var scrollbox_loading_delay26 = '0';
    var scrollbox_auto_hide26 = '1';
    var inputIds26 = '[]';
        var update_first_field_id26 = 0;
    var form_view_count26 = 0;
     function before_load26() {	
}	
 function before_submit26() {
	 }	
 function before_reset26() {	
}
 function after_submit26() {
  
}    function onload_js26() {    }

    function condition_js26() {    }

    function check_js26(id, form_id) {
      if (id != 0) {
        x = jQuery("#" + form_id + "form_view"+id);
      }
      else {
        x = jQuery("#form"+form_id);
      }
          }

    function onsubmit_js26() {
      
    var disabled_fields = "";
    jQuery("#form26 div[wdid]").each(function() {
      if(jQuery(this).css("display") == "none") {
        disabled_fields += jQuery(this).attr("wdid");
        disabled_fields += ",";
      }
    })
    if(disabled_fields) {
      jQuery("<input type=\"hidden\" name=\"disabled_fields26\" value =\""+disabled_fields+"\" />").appendTo("#form26");
    };    }

    function unset_fields26( values, id, i ) {
      rid = 0;
      if ( i > 0 ) {
        jQuery.each( values, function( k, v ) {
          if ( id == k.split('|')[2] ) {
            rid = k.split('|')[0];
            values[k] = '';
          }
        });
        return unset_fields26(values, rid, i - 1);
      }
      else {
        return values;
      }
    }

    function ajax_similarity26( obj, changing_field_id ) {
      jQuery.ajax({
        type: "POST",
        url: fm_objectL10n.form_maker_admin_ajax,
        dataType: "json",
        data: {
          nonce: fm_ajax.ajaxnonce,
          action: 'fm_reload_input',
          page: 'form_maker',
          form_id: 26,
          inputs: obj.inputs
        },
        beforeSend: function() {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              if ( val != '' && parseInt(wdid) == parseInt(changing_field_id) ) {
                jQuery("#form26 div[wdid='"+ wdid +"']").append( '<div class="fm-loading"></div>' );
              }
            });
          }
        },
        success: function (res) {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              jQuery("#form26 div[wdid='"+ wdid +"'] .fm-loading").remove();
              if ( !jQuery.isEmptyObject(res[wdid]) && ( !val || parseInt(wdid) == parseInt(changing_field_id) ) ) {
                jQuery("#form26 div[wdid='"+ wdid +"']").html( res[wdid].html );
              }
            });
          }
        },
        complete: function() {
        }
      });
    }

    function fm_script_ready26() {
      if (jQuery('#form26 .wdform_section').length > 0) {
        fm_document_ready( 26 );
      }
      else {
        jQuery("#form26").closest(".fm-form-container").removeAttr("style")
      }
      if (jQuery('#form26 .wdform_section').length > 0) {
        formOnload(26);
      }
      var ajaxObj26 = {};
      var value_ids26 = {};
      jQuery.each( jQuery.parseJSON( inputIds26 ), function( key, values ) {
        jQuery.each( values, function( index, input_id ) {
          tagName =  jQuery('#form26 [id^="wdform_'+ input_id +'_elemen"]').attr("tagName");
          type =  jQuery('#form26 [id^="wdform_'+ input_id +'_elemen"]').attr("type");
          if ( tagName == 'INPUT' ) {
            input_value = jQuery('#form26 [id^="wdform_'+ input_id +'_elemen"]').val();
            if ( jQuery('#form26 [id^="wdform_'+ input_id +'_elemen"]').is(':checked') ) {
              if ( input_value ) {
                value_ids26[key + '|' + input_id] = input_value;
              }
            }
            else if ( type == 'text' ) {
              if ( input_value ) {
                value_ids26[key + '|' + input_id] = input_value;
              }
            }
          }
          else if ( tagName == 'SELECT' ) {
            select_value = jQuery('#form26 [id^="wdform_'+ input_id +'_elemen"] option:selected').val();
            if ( select_value ) {
              value_ids26[key + '|' + input_id] = select_value;
            }
          }
          ajaxObj26.inputs = value_ids26;
          jQuery(document).on('change', '#form26 [id^="wdform_'+ input_id +'_elemen"]', function() {
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
          value_ids26[key + '|' + input_id] = id;
          jQuery.each( value_ids26, function( k, v ) {
            key_arr = k.split('|');
            if ( input_id == key_arr[2] ) {
              changing_field_id = key_arr[0];
              count = Object.keys(value_ids26).length;
              value_ids26 = unset_fields26( value_ids26, changing_field_id, count );
            }
          });
          ajaxObj26.inputs = value_ids26;
          ajax_similarity26( ajaxObj26, changing_field_id );
          });
        });
      });
      if ( update_first_field_id26 && !jQuery.isEmptyObject(ajaxObj26.inputs) ) {
        ajax_similarity26( ajaxObj26, update_first_field_id26 );
      }
	  }
    jQuery(function () {
      fm_script_ready26();
    });
    