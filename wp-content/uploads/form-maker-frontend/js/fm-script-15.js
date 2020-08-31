    var fm_currentDate = new Date();
    var FormCurrency_15 = '$';
    var FormPaypalTax_15 = '0';
    var check_submit15 = 0;
    var check_before_submit15 = {};
    var required_fields15 = ["3"];
    var labels_and_ids15 = {"3":"type_text","4":"type_star_rating","5":"type_submit_reset"};
    var check_regExp_all15 = [];
    var check_paypal_price_min_max15 = [];
    var file_upload_check15 = [];
    var spinner_check15 = [];
    var scrollbox_trigger_point15 = '20';
    var header_image_animation15 = 'none';
    var scrollbox_loading_delay15 = '0';
    var scrollbox_auto_hide15 = '1';
    var inputIds15 = '[]';
        var update_first_field_id15 = 0;
    var form_view_count15 = 0;
     function before_load15() {
     
}

 function before_submit15() {
      }

 function before_reset15() {
     
}
 function after_submit15() {
     
}    function onload_js15() {
  jQuery("#wdform_4_star_0_15").mouseover(function() {change_src(0,"wdform_4", 15, "red");});
  jQuery("#wdform_4_star_0_15").mouseout(function() {reset_src(0,"wdform_4", 15);});
  jQuery("#wdform_4_star_0_15").click(function() {select_star_rating(0,"wdform_4", 15,"red", "5");});
  jQuery("#wdform_4_star_1_15").mouseover(function() {change_src(1,"wdform_4", 15, "red");});
  jQuery("#wdform_4_star_1_15").mouseout(function() {reset_src(1,"wdform_4", 15);});
  jQuery("#wdform_4_star_1_15").click(function() {select_star_rating(1,"wdform_4", 15,"red", "5");});
  jQuery("#wdform_4_star_2_15").mouseover(function() {change_src(2,"wdform_4", 15, "red");});
  jQuery("#wdform_4_star_2_15").mouseout(function() {reset_src(2,"wdform_4", 15);});
  jQuery("#wdform_4_star_2_15").click(function() {select_star_rating(2,"wdform_4", 15,"red", "5");});
  jQuery("#wdform_4_star_3_15").mouseover(function() {change_src(3,"wdform_4", 15, "red");});
  jQuery("#wdform_4_star_3_15").mouseout(function() {reset_src(3,"wdform_4", 15);});
  jQuery("#wdform_4_star_3_15").click(function() {select_star_rating(3,"wdform_4", 15,"red", "5");});
  jQuery("#wdform_4_star_4_15").mouseover(function() {change_src(4,"wdform_4", 15, "red");});
  jQuery("#wdform_4_star_4_15").mouseout(function() {reset_src(4,"wdform_4", 15);});
  jQuery("#wdform_4_star_4_15").click(function() {select_star_rating(4,"wdform_4", 15,"red", "5");});    }

    function condition_js15() {    }

    function check_js15(id, form_id) {
      if (id != 0) {
        x = jQuery("#" + form_id + "form_view"+id);
      }
      else {
        x = jQuery("#form"+form_id);
      }
          }

    function onsubmit_js15() {
      
  jQuery("<input type=\"hidden\" name=\"wdform_4_star_amount15\" value=\"5\" />").appendTo("#form15");
    var disabled_fields = "";
    jQuery("#form15 div[wdid]").each(function() {
      if(jQuery(this).css("display") == "none") {
        disabled_fields += jQuery(this).attr("wdid");
        disabled_fields += ",";
      }
    })
    if(disabled_fields) {
      jQuery("<input type=\"hidden\" name=\"disabled_fields15\" value =\""+disabled_fields+"\" />").appendTo("#form15");
    };    }

    function unset_fields15( values, id, i ) {
      rid = 0;
      if ( i > 0 ) {
        jQuery.each( values, function( k, v ) {
          if ( id == k.split('|')[2] ) {
            rid = k.split('|')[0];
            values[k] = '';
          }
        });
        return unset_fields15(values, rid, i - 1);
      }
      else {
        return values;
      }
    }

    function ajax_similarity15( obj, changing_field_id ) {
      jQuery.ajax({
        type: "POST",
        url: fm_objectL10n.form_maker_admin_ajax,
        dataType: "json",
        data: {
          nonce: fm_ajax.ajaxnonce,
          action: 'fm_reload_input',
          page: 'form_maker',
          form_id: 15,
          inputs: obj.inputs
        },
        beforeSend: function() {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              if ( val != '' && parseInt(wdid) == parseInt(changing_field_id) ) {
                jQuery("#form15 div[wdid='"+ wdid +"']").append( '<div class="fm-loading"></div>' );
              }
            });
          }
        },
        success: function (res) {
          if ( !jQuery.isEmptyObject(obj.inputs) ) {
            jQuery.each( obj.inputs, function( key, val ) {
              wdid = key.split('|')[0];
              jQuery("#form15 div[wdid='"+ wdid +"'] .fm-loading").remove();
              if ( !jQuery.isEmptyObject(res[wdid]) && ( !val || parseInt(wdid) == parseInt(changing_field_id) ) ) {
                jQuery("#form15 div[wdid='"+ wdid +"']").html( res[wdid].html );
              }
            });
          }
        },
        complete: function() {
        }
      });
    }

    function fm_script_ready15() {
      if (jQuery('#form15 .wdform_section').length > 0) {
        fm_document_ready( 15 );
      }
      else {
        jQuery("#form15").closest(".fm-form-container").removeAttr("style")
      }
      if (jQuery('#form15 .wdform_section').length > 0) {
        formOnload(15);
      }
      var ajaxObj15 = {};
      var value_ids15 = {};
      jQuery.each( jQuery.parseJSON( inputIds15 ), function( key, values ) {
        jQuery.each( values, function( index, input_id ) {
          tagName =  jQuery('#form15 [id^="wdform_'+ input_id +'_elemen"]').prop("tagName");
          type =  jQuery('#form15 [id^="wdform_'+ input_id +'_elemen"]').prop("type");
          if ( tagName == 'INPUT' ) {
            input_value = jQuery('#form15 [id^="wdform_'+ input_id +'_elemen"]').val();
            if ( jQuery('#form15 [id^="wdform_'+ input_id +'_elemen"]').is(':checked') ) {
              if ( input_value ) {
                value_ids15[key + '|' + input_id] = input_value;
              }
            }
            else if ( type == 'text' ) {
              if ( input_value ) {
                value_ids15[key + '|' + input_id] = input_value;
              }
            }
          }
          else if ( tagName == 'SELECT' ) {
            select_value = jQuery('#form15 [id^="wdform_'+ input_id +'_elemen"] option:selected').val();
            if ( select_value ) {
              value_ids15[key + '|' + input_id] = select_value;
            }
          }
          ajaxObj15.inputs = value_ids15;
          jQuery(document).on('change', '#form15 [id^="wdform_'+ input_id +'_elemen"]', function() {
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
          value_ids15[key + '|' + input_id] = id;
          jQuery.each( value_ids15, function( k, v ) {
            key_arr = k.split('|');
            if ( input_id == key_arr[2] ) {
              changing_field_id = key_arr[0];
              count = Object.keys(value_ids15).length;
              value_ids15 = unset_fields15( value_ids15, changing_field_id, count );
            }
          });
          ajaxObj15.inputs = value_ids15;
          ajax_similarity15( ajaxObj15, changing_field_id );
          });
        });
      });
      if ( update_first_field_id15 && !jQuery.isEmptyObject(ajaxObj15.inputs) ) {
        ajax_similarity15( ajaxObj15, update_first_field_id15 );
      }
	  }
    jQuery(document).ready(function () {
      fm_script_ready15();
    });
    