    var fm_currentDate = new Date();
    var FormCurrency_13 = '$';
    var FormPaypalTax_13 = '0';
    var check_submit13 = 0;
    var check_before_submit13 = {};
    var required_fields13 = ["3"];
    var labels_and_ids13 = {"3":"type_text","4":"type_star_rating","5":"type_submit_reset"};
    var check_regExp_all13 = [];
    var check_paypal_price_min_max13 = [];
    var file_upload_check13 = [];
    var spinner_check13 = [];
    var scrollbox_trigger_point13 = '20';
    var header_image_animation13 = 'none';
    var scrollbox_loading_delay13 = '0';
    var scrollbox_auto_hide13 = '1';
    var inputIds13 = '[]';
        var update_first_field_id13 = 0;
    var form_view_count13 = 0;
     function before_load13() {
     
}

 function before_submit13() {
      }

 function before_reset13() {
     
}
 function after_submit13() {
     
}    function onload_js13() {
  jQuery("#wdform_4_star_0_13").mouseover(function() {change_src(0,"wdform_4", 13, "red");});
  jQuery("#wdform_4_star_0_13").mouseout(function() {reset_src(0,"wdform_4", 13);});
  jQuery("#wdform_4_star_0_13").click(function() {select_star_rating(0,"wdform_4", 13,"red", "5");});
  jQuery("#wdform_4_star_1_13").mouseover(function() {change_src(1,"wdform_4", 13, "red");});
  jQuery("#wdform_4_star_1_13").mouseout(function() {reset_src(1,"wdform_4", 13);});
  jQuery("#wdform_4_star_1_13").click(function() {select_star_rating(1,"wdform_4", 13,"red", "5");});
  jQuery("#wdform_4_star_2_13").mouseover(function() {change_src(2,"wdform_4", 13, "red");});
  jQuery("#wdform_4_star_2_13").mouseout(function() {reset_src(2,"wdform_4", 13);});
  jQuery("#wdform_4_star_2_13").click(function() {select_star_rating(2,"wdform_4", 13,"red", "5");});
  jQuery("#wdform_4_star_3_13").mouseover(function() {change_src(3,"wdform_4", 13, "red");});
  jQuery("#wdform_4_star_3_13").mouseout(function() {reset_src(3,"wdform_4", 13);});
  jQuery("#wdform_4_star_3_13").click(function() {select_star_rating(3,"wdform_4", 13,"red", "5");});
  jQuery("#wdform_4_star_4_13").mouseover(function() {change_src(4,"wdform_4", 13, "red");});
  jQuery("#wdform_4_star_4_13").mouseout(function() {reset_src(4,"wdform_4", 13);});
  jQuery("#wdform_4_star_4_13").click(function() {select_star_rating(4,"wdform_4", 13,"red", "5");});    }

    function condition_js13() {    }

    function check_js13(id, form_id) {
      if (id != 0) {
        x = jQuery("#" + form_id + "form_view"+id);
      }
      else {
        x = jQuery("#form"+form_id);
      }
          }

    function onsubmit_js13() {
      
  jQuery("<input type=\"hidden\" name=\"wdform_4_star_amount13\" value=\"5\" />").appendTo("#form13");
    var disabled_fields = "";
    jQuery("#form13 div[wdid]").each(function() {
      if(jQuery(this).css("display") == "none") {
        disabled_fields += jQuery(this).attr("wdid");
        disabled_fields += ",";
      }
    })
    if(disabled_fields) {
      jQuery("<input type=\"hidden\" name=\"disabled_fields13\" value =\""+disabled_fields+"\" />").appendTo("#form13");
    };    }

    function unset_fields13( values, id, i ) {
      rid = 0;
      if ( i > 0 ) {
        jQuery.each( values, function( k, v ) {
          if ( id == k.split('|')[2] ) {
            rid = k.split('|')[0];
            values[k] = '';
          }
        });
        return unset_fields13(values, rid, i - 1);
      }
      else {
        return values;
      }
    }

    function ajax_similarity13( obj, changing_field_id ) {
      jQuery.ajax({
        type: "POST",
        url: fm_objectL10n.form_maker_admin_ajax,
        dataType: "json",
        data: {
          nonce: fm_ajax.ajaxnonce,
          action: 'fm_reload_input',
          page: 'form_maker',
          form_id: 13,
          inputs: obj.inputs
        },
        beforeSend: function() {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              if ( val != '' && parseInt(wdid) == parseInt(changing_field_id) ) {
                jQuery("#form13 div[wdid='"+ wdid +"']").append( '<div class="fm-loading"></div>' );
              }
            });
          }
        },
        success: function (res) {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              jQuery("#form13 div[wdid='"+ wdid +"'] .fm-loading").remove();
              if ( !jQuery.isEmptyObject(res[wdid]) && ( !val || parseInt(wdid) == parseInt(changing_field_id) ) ) {
                jQuery("#form13 div[wdid='"+ wdid +"']").html( res[wdid].html );
              }
            });
          }
        },
        complete: function() {
        }
      });
    }

    function fm_script_ready13() {
      if (jQuery('#form13 .wdform_section').length > 0) {
        fm_document_ready( 13 );
      }
      else {
        jQuery("#form13").closest(".fm-form-container").removeAttr("style")
      }
      if (jQuery('#form13 .wdform_section').length > 0) {
        formOnload(13);
      }
      var ajaxObj13 = {};
      var value_ids13 = {};
      jQuery.each( jQuery.parseJSON( inputIds13 ), function( key, values ) {
        jQuery.each( values, function( index, input_id ) {
          tagName =  jQuery('#form13 [id^="wdform_'+ input_id +'_elemen"]').prop("tagName");
          type =  jQuery('#form13 [id^="wdform_'+ input_id +'_elemen"]').prop("type");
          if ( tagName == 'INPUT' ) {
            input_value = jQuery('#form13 [id^="wdform_'+ input_id +'_elemen"]').val();
            if ( jQuery('#form13 [id^="wdform_'+ input_id +'_elemen"]').is(':checked') ) {
              if ( input_value ) {
                value_ids13[key + '|' + input_id] = input_value;
              }
            }
            else if ( type == 'text' ) {
              if ( input_value ) {
                value_ids13[key + '|' + input_id] = input_value;
              }
            }
          }
          else if ( tagName == 'SELECT' ) {
            select_value = jQuery('#form13 [id^="wdform_'+ input_id +'_elemen"] option:selected').val();
            if ( select_value ) {
              value_ids13[key + '|' + input_id] = select_value;
            }
          }
          ajaxObj13.inputs = value_ids13;
          jQuery(document).on('change', '#form13 [id^="wdform_'+ input_id +'_elemen"]', function() {
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
          value_ids13[key + '|' + input_id] = id;
          jQuery.each( value_ids13, function( k, v ) {
            key_arr = k.split('|');
            if ( input_id == key_arr[2] ) {
              changing_field_id = key_arr[0];
              count = Object.keys(value_ids13).length;
              value_ids13 = unset_fields13( value_ids13, changing_field_id, count );
            }
          });
          ajaxObj13.inputs = value_ids13;
          ajax_similarity13( ajaxObj13, changing_field_id );
          });
        });
      });
      if ( update_first_field_id13 && !jQuery.isEmptyObject(ajaxObj13.inputs) ) {
        ajax_similarity13( ajaxObj13, update_first_field_id13 );
      }
	  }
    jQuery(document).ready(function () {
      fm_script_ready13();
    });
    