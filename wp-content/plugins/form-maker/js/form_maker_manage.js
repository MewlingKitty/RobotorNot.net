function remove_whitespace(node) {
  var ttt;
  for (ttt = 0; ttt < node.childNodes.length; ttt++) {
    if (node.childNodes[ttt] && node.childNodes[ttt].nodeType == '3' && !/\S/.test(node.childNodes[ttt].nodeValue)) {
      node.removeChild(node.childNodes[ttt]);
      ttt--;
    }
    else {
      if (node.childNodes[ttt].childNodes.length) {
        remove_whitespace(node.childNodes[ttt]);
      }
    }
  }
  return;
}

function fm_row_handle(section) {
  var fm_section = jQuery(section);
  fm_section.find('.wdform_row_handle').remove();
  var row_handle = jQuery('<div class="wdform_row_handle">' +
    '<span class="fm-ico-draggable"></span>' +
    '<span title="Remove the column" class="page_toolbar fm-ico-delete" onclick="fm_remove_row_popup(this);"></span>' +
    '<span class="add-new-field" onclick="jQuery(\'#cur_column\').removeAttr(\'id\');jQuery(this).parent().parent().attr(\'id\', \'cur_column\').val(1);popup_ready(); Enable(); return false;">' + form_maker_manage.add_new_field + '</span>' +
    '<div class="fm-divider"></div>' +
    '</div>');
  fm_section.prepend(row_handle);
  row_handle.after('<div class="fm-section-overlay"></div>');
}

function sortable_columns() {
  jQuery( "#take" ).sortable({
    cursor: 'move',
    placeholder: "highlight",
    tolerance: "pointer",
    handle: ".form_id_tempform_view_img .fm-ico-draggable",
    items: "> .wdform-page-and-images",
    axis: "y",
		update: function(event, ui) {
      refresh_page_numbers();
    },
  });
  jQuery( ".wdform_page" ).sortable({
    connectWith: ".wdform_page",
    cursor: 'move',
    placeholder: "highlight",
    tolerance: "pointer",
    handle: ".wdform_row_handle",
    cancel: ".add-new-field, .page_toolbar",
    items: "> .wdform_section",
    create: function( event, ui ) {
      jQuery(event.target).find('.wdform_section').each(function() {
        fm_row_handle(this);
      });
    },
    start: function( event, ui ) {
      jQuery('.wdform_row_empty').hide();
    },
    stop: function( event, ui ) {
      fm_rows_refresh();
      jQuery('.wdform_row_empty').show();
    },
  });
  jQuery( ".wdform_column" ).sortable({
		connectWith: ".wdform_column",
		cursor: 'move',
		placeholder: "highlight",
    tolerance: "pointer",
    cancel: ".wdform_section_handle",
    items: "> .wdform_row, #add_field",
		start: function(e, ui) {
      jQuery(".add-new-button").off("click");
      jQuery(".wdform_column").removeClass("fm-hidden");
			jQuery("#cur_column").removeAttr("id");
    },
		stop: function(event, ui) {
		  // Prevent dropping on "New Field" conatiner.
		  if (ui.item.parent().attr("id") == "add_field_cont") {
		    return false;
      }
      if (ui.item.attr("id") == "add_field" && ui.item.parent().attr("id") != "add_field_cont") {
        if (fm_check_something_really_important()) return false;
        nextID = jQuery("#add_field").next(".wdform_row").attr("wdid"); //find next row id for position
				jQuery("#add_field").parent().attr("id", "cur_column");  // add id cur_column to this column
        popup_ready();
				Enable();
        /* In Firfox and Safari click action is working during the drag and drop also */
				jQuery(".add-new-button").removeAttr("onclick");
				return false;
			}
      jQuery(".wdform_column:not(#add_field_cont):empty").addClass("fm-hidden");
      fm_columns_refresh();
		}
  });
}

function all_sortable_events() {
  fm_rows_refresh();
  fm_columns_refresh();
  jQuery(".wdform_row, .wdform_tr_section_break").off("mouseover touchstart").on("mouseover touchstart", function (event) {
    if (!jQuery(this).find('.wdform_arrows').is(':visible')) {
      jQuery('.wdform_arrows').hide();
      jQuery(this).find('.wdform_arrows').show();
      event.preventDefault();
      return false;
    }
  }).off("mouseleave").on("mouseleave", function () {
    jQuery(this).find('.wdform_arrows').hide();
  });
  jQuery(".wdform_section_handle, .wdform_row_handle").off("mouseover touchstart").on("mouseover touchstart", function (event) {
    jQuery(this).parent().addClass('fm-hover');
  }).off("mouseleave").on("mouseleave", function () {
    jQuery(this).parent().removeClass('fm-hover');
  });
}

jQuery(document).on( "dblclick", ".wdform_row, .wdform_tr_section_break", function() {
	edit(jQuery(this).attr("wdid"));
});

function fm_change_radio(elem) {
	if(jQuery( elem ).hasClass( "fm-yes" )) {
		jQuery( elem ).val('0');
		jQuery( elem ).next().val('0');
		jQuery( elem ).removeClass('fm-yes').addClass('fm-no');
		jQuery(elem).find("span").animate({
			right: parseInt(jQuery( elem ).css( "width")) - 14 + 'px'
		}, 400, function() {
		}); 
	}	
	else {
		jQuery( elem ).val('1');
		jQuery( elem ).next().val('1');
		jQuery(elem).find("span").animate({
			right: 0
		}, 400, function() {
			jQuery( elem ).removeClass('fm-no').addClass('fm-yes');
		}); 
	}	
	if(jQuery( elem ).next().attr('name') == 'mail_verify') {
		show_verify_options(jQuery( elem ).val() == 1 ? true : false);
	}	
}
		
function enable_drag() {
	jQuery('.wdform_column').sortable( "enable" );
	jQuery('.wdform_arrows_advanced').hide();
	jQuery( ".wdform_field" ).css("cursor", "");
	jQuery( "#add_field .wdform_field" ).css("cursor", "");
	all_sortable_events();
}

function refresh_() {
	document.getElementById('counter').value = gen;
  jQuery('.wdform-page-and-images').each(function () {
    var cur_page = jQuery(this);
    cur_page.find('[id^=page_next_]').removeAttr('src');
    cur_page.find('[id^=page_previous_]').removeAttr('src');
    cur_page.find('.form_id_tempform_view_img').remove();
  });
  jQuery("#take div").removeClass("ui-sortable ui-sortable-disabled ui-sortable-handle");
	jQuery( "#add_field_cont" ).remove(); // remove add new button from div content
	document.getElementById('form_front').value = fm_base64EncodeUnicode(fm_htmlentities(document.getElementById('take').innerHTML));
}
function fm_base64EncodeUnicode(str) {
  // First we escape the string using encodeURIComponent to get the UTF-8 encoding of the characters,
  // then we convert the percent encodings into raw bytes, and finally feed it to btoa() function.
  utf8Bytes = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
    return String.fromCharCode('0x' + p1);
  });
  return btoa(utf8Bytes);
}
function fm_htmlentities(s){
  var div = document.createElement('div');
  var text = document.createTextNode(s);
  div.style.cssText = "display:none";
  div.appendChild(text);
  return div.innerHTML;
}

function fm_add_submission_email(toAdd_id, value_id, parent_id, cfm_url) {
  var value = jQuery("#" + value_id).val();
  if (value) {
    var mail_div = jQuery("<p>").attr("class", "fm_mail_input").prependTo("#" + parent_id);
    jQuery("<span>").attr("class", "mail_name").text(value).appendTo(mail_div);
    jQuery("<span>").attr("class", "dashicons dashicons-trash").attr("onclick", "fm_delete_mail(this, '" + value + "')").attr("title", "Delete Email").appendTo(mail_div);
    jQuery("#" + value_id).val("");
    jQuery("#" + toAdd_id).val(jQuery("#" + toAdd_id).val() + value + ",");
  }
}

function fm_delete_mail(img, value) {
  jQuery(img).parent().remove();
  jQuery("#mail").val(jQuery("#mail").val().replace(value + ',', ''));
}

function form_maker_options_tabs(id) {
	jQuery("#fieldset_id").val(id);
	jQuery(".fm_fieldset_active").removeClass("fm_fieldset_active").addClass("fm_fieldset_deactive");
	jQuery("#" + id + "_fieldset").removeClass("fm_fieldset_deactive").addClass("fm_fieldset_active");
	jQuery(".fm_fieldset_tab").removeClass("active");
	jQuery("#" + id).addClass("active");

  return false;
}

function set_type(type) {
	switch (type) {
		case 'post':
			document.getElementById('post').removeAttribute('style');
			document.getElementById('page').setAttribute('style', 'display:none');
			document.getElementById('custom_text').setAttribute('style', 'display:none');
			document.getElementById('url_wrap').setAttribute('style', 'display:none');
			break;
		case 'page':
			document.getElementById('page').removeAttribute('style');
			document.getElementById('post').setAttribute('style', 'display:none');
			document.getElementById('custom_text').setAttribute('style', 'display:none');
			document.getElementById('url_wrap').setAttribute('style', 'display:none');
			break;
		case 'custom_text':
			document.getElementById('page').setAttribute('style', 'display:none');
			document.getElementById('post').setAttribute('style', 'display:none');
			document.getElementById('custom_text').removeAttribute('style');
			document.getElementById('url_wrap').setAttribute('style', 'display:none');
			break;
		case 'url_wrap':
			document.getElementById('page').setAttribute('style', 'display:none');
			document.getElementById('post').setAttribute('style', 'display:none');
			document.getElementById('custom_text').setAttribute('style', 'display:none');
			document.getElementById('url_wrap').removeAttribute('style');
			break;
		case 'none':
			document.getElementById('page').setAttribute('style', 'display:none');
			document.getElementById('post').setAttribute('style', 'display:none');
			document.getElementById('custom_text').setAttribute('style', 'display:none');
			document.getElementById('url_wrap').setAttribute('style', 'display:none');
			break;
	}
}

function check_isnum(e) {
  var chCode1 = e.which || e.keyCode;
  if ( chCode1 > 31
		&& (chCode1 < 48 || chCode1 > 57)
		&& (chCode1 != 46)
		&& (chCode1 != 45)
		&& (chCode1 < 35 || chCode1 > 40) ) {
    return false;
  }
  return true;
}

// Check Email.
function fm_check_email(id) {
  if (document.getElementById(id) && jQuery('#' + id).val() != '') {
    var email_array = jQuery('#' + id).val().split(',');
	/* Regexp is also for Cyrillic alphabet */
	var re = /^[\u0400-\u04FFa-zA-Z0-9.+_-]+@[\u0400-\u04FFa-zA-Z0-9.-]+\.[\u0400-\u04FFa-zA-Z]{2,61}$/;
    for (var email_id = 0; email_id < email_array.length; email_id++) {
      var email = email_array[email_id].replace(/^\s+|\s+$/g, '');
      if ( email && ! re.test( email ) && email.indexOf('{') === -1 ) {
        alert('This is not a valid email address.');

        /*  Do only if there is active class */
        if( jQuery('#submenu li a').hasClass('active') ) {
            var activeTabId = jQuery("#submenu .active").attr("id");
            var error_cont_id = jQuery('#' + id).closest(".fm_fieldset_deactive").attr("id");

            if(typeof error_cont_id != 'undefined') {
              var error_tab_id = error_cont_id.split("_fieldset");
              tab_id = error_tab_id[0];

              /* If current active and error active tabs are the same */
              if ( activeTabId !=  tab_id ) {
                var activeContentId = activeTabId +"_fieldset";
                jQuery("#"+activeContentId).removeClass("fm_fieldset_active");
                jQuery("#"+activeContentId).removeClass("fm_fieldset_deactive");
                jQuery("#" + error_cont_id).addClass("fm_fieldset_active");
                jQuery("#submenu .active").removeClass('active');
                jQuery("#" + tab_id).addClass("active");
              }
            }
        } else {
            var error_cont_id = jQuery('#' + id).closest(".fm_fieldset_deactive").attr("id");
            if(typeof error_cont_id != 'undefined') {
              var tab_id = error_cont_id.split("_fieldset");
              tab_id = tab_id[0];

              jQuery("#" + error_cont_id).removeClass("fm_fieldset_deactive");
              jQuery("#" + error_cont_id).addClass("fm_fieldset_active");
              jQuery("#" + tab_id).addClass("active");
            }
        }

        jQuery('#' + id).css('border', '1px solid #FF0000');
        jQuery('#' + id).focus();
        jQuery('html, body').animate({
          scrollTop:jQuery('#' + id).offset().top - 200
        }, 500);
        return true;
      }
    }
		jQuery('#' + id).css('border', '1px solid #ddd');
  }

  return false;
}

function wdhide(id) {
	document.getElementById(id).style.display = "none";
}
function wdshow(id) {
	document.getElementById(id).style.display = "block";
}
function delete_field_condition(id) {
	var cond_id = id.split("_");
	document.getElementById("condition"+cond_id[0]).removeChild(document.getElementById("condition_div"+id));
}

function change_choices(value, ids, types, params) {
	value = value.split("_");
	global_index = value[0];
	id = value[1];
	index = value[2];
	ids_array = ids.split("@@**@@");
	types_array = types.split("@@**@@");
	params_array = params.split("@@**@@");

	switch(types_array[id]) {
		case "type_text":
		case "type_password":
		case "type_textarea":
		case "type_name":
		case "type_submitter_mail":
		case "type_number":
		case "type_phone":
		case "type_paypal_price":
		case "type_paypal_price_new":
		case "type_spinner":
		case "type_date_new":
		case "type_phone_new":
			if(types_array[id]=="type_number" || types_array[id]=="type_phone")
				var keypress_function = "return check_isnum_space(event)";
			else
				if(types_array[id]=="type_paypal_price" || types_array[id]=="type_paypal_price_new")
					var keypress_function = "return check_isnum_point(event)";
				else
					var keypress_function = "";
		
			if(document.getElementById("field_value"+global_index+"_"+index).tagName=="SELECT") {
				document.getElementById("condition_div"+global_index+"_"+index).removeChild(document.getElementById("field_value"+global_index+"_"+index));				
				var label_input = document.createElement('input');
					label_input.setAttribute("id", "field_value"+global_index+'_'+index);
					label_input.setAttribute("type", "text");
					label_input.setAttribute("value", "");	
					label_input.setAttribute("class", "fm_condition_field_input_value");

					label_input.setAttribute("onKeyPress", keypress_function);

				document.getElementById("condition_div"+global_index+"_"+index).insertBefore(label_input,document.getElementById("delete_condition"+global_index+"_"+index));
				document.getElementById("condition_div"+global_index+"_"+index).insertBefore(document.createTextNode(' '),document.getElementById("delete_condition"+global_index+"_"+index));
			}
			else {
				document.getElementById("field_value"+global_index+'_'+index).value="";
				document.getElementById("field_value"+global_index+'_'+index).setAttribute("onKeyPress", keypress_function);
			}
		break;
		
		case "type_own_select":
		case "type_radio":
		case "type_checkbox":
			if(types_array[id]=="type_own_select")
				w_size = params_array[id].split('*:*w_size*:*');
			else
				w_size = params_array[id].split('*:*w_flow*:*');
		
			w_choices = w_size[1].split('*:*w_choices*:*');
			w_choices_array = w_choices[0].split('***');
			if(w_size[1].indexOf('*:*w_value_disabled*:*') !== -1){
				w_value_disabled = w_size[1].split('*:*w_value_disabled*:*');
				w_choices_value = w_value_disabled[1].split('*:*w_choices_value*:*');
				w_choices_value_array = w_choices_value[0].split('***');
			}
			else{
				w_choices_value_array = w_choices_array;
			}
			
			var choise_select = document.createElement('select');
				choise_select.setAttribute("id", "field_value"+global_index+'_'+index);
				choise_select.setAttribute("class", "fm_condition_field_select_value");

				if(types_array[id]== "type_checkbox") {
					choise_select.setAttribute('multiple', 'multiple');
					choise_select.setAttribute('class', 'multiple_select');
				}

			for(k=0; k<w_choices_array.length; k++) {
				var choise_option = document.createElement('option');
					choise_option.setAttribute("id", "choise_"+global_index+'_'+k);
					choise_option.setAttribute("value", w_choices_value_array[k]);
					choise_option.innerHTML = w_choices_array[k];	
					if(w_choices_array[k].indexOf('[') === -1 && w_choices_array[k].indexOf(']') === -1) {
            choise_select.appendChild(choise_option);
          }
			}
			
			document.getElementById("condition_div"+global_index+"_"+index).removeChild(document.getElementById("field_value"+global_index+"_"+index));
			document.getElementById("condition_div"+global_index+"_"+index).insertBefore(choise_select,document.getElementById("delete_condition"+global_index+"_"+index));
			document.getElementById("condition_div"+global_index+"_"+index).insertBefore(document.createTextNode(' '),document.getElementById("delete_condition"+global_index+"_"+index));
		
		break;	
		
		case "type_paypal_select":	
		case "type_paypal_radio":
		case "type_paypal_checkbox":
		case "type_paypal_shipping":
			if(types_array[id]=="type_paypal_select")
				w_size = params_array[id].split('*:*w_size*:*');
			else
				w_size = params_array[id].split('*:*w_flow*:*');
		
			w_choices = w_size[1].split('*:*w_choices*:*');
			w_choices_array = w_choices[0].split('***');

			w_choices_price = w_choices[1].split('*:*w_choices_price*:*');
			w_choices_price_array = w_choices_price[0].split('***');
			
			var choise_select = document.createElement('select');
				choise_select.setAttribute("id", "field_value"+global_index+'_'+index);
				choise_select.setAttribute("class", "fm_condition_field_select_value");

				if(types_array[id]== "type_paypal_checkbox") {
					choise_select.setAttribute('multiple', 'multiple');
					choise_select.setAttribute('class', 'multiple_select');
				}

			for(k=0; k<w_choices_array.length; k++) {
				var choise_option = document.createElement('option');
					choise_option.setAttribute("id", "choise_"+global_index+'_'+k);
					choise_option.setAttribute("value", w_choices_array[k]+'*:*value*:*'+w_choices_price_array[k]);
					choise_option.innerHTML = w_choices_array[k];	
					if(w_choices_array[k].indexOf('[') === -1 && w_choices_array[k].indexOf(']') === -1) {
						choise_select.appendChild(choise_option);
					}
			}
			
			document.getElementById("condition_div"+global_index+"_"+index).removeChild(document.getElementById("field_value"+global_index+"_"+index));
			document.getElementById("condition_div"+global_index+"_"+index).insertBefore(choise_select,document.getElementById("delete_condition"+global_index+"_"+index));
			document.getElementById("condition_div"+global_index+"_"+index).insertBefore(document.createTextNode(' '),document.getElementById("delete_condition"+global_index+"_"+index));
		break;	
		case "type_address":
			countries = form_maker.countries;
		
		var choise_select = document.createElement('select');
			choise_select.setAttribute("id", "field_value"+global_index+'_'+m);
      choise_select.setAttribute("class", "fm_condition_field_select_value");
      jQuery.each( countries, function( key, value ) {
        var choise_option = document.createElement('option');
        choise_select.setAttribute("id", "field_value" + global_index + '_' + index);
        choise_option.setAttribute("value", value);
        choise_option.innerHTML = value;

        choise_select.appendChild(choise_option);
      });
			
			document.getElementById("condition_div"+global_index+"_"+index).removeChild(document.getElementById("field_value"+global_index+"_"+index));
			document.getElementById("condition_div"+global_index+"_"+index).insertBefore(choise_select,document.getElementById("delete_condition"+global_index+"_"+index));
			document.getElementById("condition_div"+global_index+"_"+index).insertBefore(document.createTextNode(' '),document.getElementById("delete_condition"+global_index+"_"+index));
			
		break;
	}
}

function add_condition_fields(num, ids1, labels1, types1, params1) {
	ids = ids1.split("@@**@@");
	labels = labels1.split("@@**@@");
	types = types1.split("@@**@@");
	params = params1.split("@@**@@");
	
	for(i=500; i>=0; i--) {
		if(document.getElementById('condition_div'+num+'_'+i))
			break;
	}
	m=i+1;
	
	var condition_div = document.createElement('div');
		condition_div.setAttribute("id", "condition_div"+num+'_'+m);
	
	var labels_select = document.createElement('select');
		labels_select.setAttribute("id", "field_labels"+num+'_'+m);
		labels_select.setAttribute("onchange", "change_choices(options[selectedIndex].id+'_"+m+"','"+ids1+"','"+types1+"','"+params1.replace(/\'/g,"\\'")+"')");
   		labels_select.setAttribute("class", "fm_condition_field_labels");

	for(k=0; k<labels.length; k++) {
		if(ids[k]!=document.getElementById('fields'+num).value) {
			var labels_option = document.createElement('option');
				labels_option.setAttribute("id", num+"_"+k);
				labels_option.setAttribute("value", ids[k]);
				labels_option.innerHTML = labels[k];	
				
			labels_select.appendChild(labels_option);	
		}
	}
	
	condition_div.appendChild(labels_select);	
	condition_div.appendChild(document.createTextNode(' '));
	
	var is_select = document.createElement('select');
		is_select.setAttribute("id", "is_select"+num+'_'+m);
		is_select.setAttribute("class", "fm_condition_is_select");


	var	is_option = document.createElement('option');
		is_option.setAttribute("id", "is");
		is_option.setAttribute("value", "==");
		is_option.innerHTML = "is";

	var	is_notoption = document.createElement('option');
		is_notoption.setAttribute("id", "is_not");
		is_notoption.setAttribute("value", "!=");
		is_notoption.innerHTML = "is not";
	
	var	is_likoption = document.createElement('option');
		is_likoption.setAttribute("id", "like");
		is_likoption.setAttribute("value", "%");
		is_likoption.innerHTML = "like";
		
	var	is_notlikoption = document.createElement('option');
		is_notlikoption.setAttribute("id", "not_like");
		is_notlikoption.setAttribute("value", "!%");
		is_notlikoption.innerHTML = "not like";
		
	var	is_emptyoption = document.createElement('option');
		is_emptyoption.setAttribute("id", "empty");
		is_emptyoption.setAttribute("value", "=");
		is_emptyoption.innerHTML = "empty";
		
	var	is_notemptyoption = document.createElement('option');
		is_notemptyoption.setAttribute("id", "not_empty");
		is_notemptyoption.setAttribute("value", "!");
		is_notemptyoption.innerHTML = "not empty";
		
		
		is_select.appendChild(is_option);	
		is_select.appendChild(is_notoption);
        is_select.appendChild(is_likoption);
        is_select.appendChild(is_notlikoption);
        is_select.appendChild(is_emptyoption);
        is_select.appendChild(is_notemptyoption);		

		condition_div.appendChild(is_select);
		condition_div.appendChild(document.createTextNode(' '));
		
	if(ids[0]!=document.getElementById('fields'+num).value)
		var index_of_field = 0;
	else
		var index_of_field = 1;
	
	switch(types[index_of_field]) {
		case "type_text":
		case "type_star_rating":
		case "type_password":
		case "type_textarea":
		case "type_name":
		case "type_submitter_mail":
		case "type_phone":
		case "type_number":
		case "type_paypal_price":
		case "type_paypal_price_new":
		case "type_spinner":
		case "type_date_new":
		case "type_phone_new":
		if(types[index_of_field]=="type_number" || types[index_of_field]=="type_phone")
				var keypress_function = "return check_isnum_space(event)";
			else
				if(types[index_of_field]=="type_paypal_price" || types[index_of_field]=="type_paypal_price_new")
					var keypress_function = "return check_isnum_point(event)";
				else
					var keypress_function = "";
		
		var label_input = document.createElement('input');
			label_input.setAttribute("id", "field_value"+num+'_'+m);
			label_input.setAttribute("type", "text");
			label_input.setAttribute("value", "");	
			label_input.setAttribute("class", "fm_condition_field_input_value");

			label_input.setAttribute("onKeyPress", keypress_function);
			
		condition_div.appendChild(label_input);
		
		break;
		
		case "type_checkbox":
		case "type_radio":
		case "type_own_select":
			if(types[index_of_field]=="type_own_select")
				w_size = params[index_of_field].split('*:*w_size*:*');
			else
				w_size = params[index_of_field].split('*:*w_flow*:*');
				
			w_choices = w_size[1].split('*:*w_choices*:*');
			w_choices_array = w_choices[0].split('***');
			
			if(w_size[1].indexOf('*:*w_value_disabled*:*') !== -1){
				w_value_disabled = w_size[1].split('*:*w_value_disabled*:*');
				w_choices_value = w_value_disabled[1].split('*:*w_choices_value*:*');
				w_choices_value_array = w_choices_value[0].split('***');
			}
			else{
				w_choices_value_array = w_choices_array;
			}
			
			var choise_select = document.createElement('select');
				choise_select.setAttribute("id", "field_value"+num+'_'+m);
				choise_select.style.cssText = "vertical-align: top; width:200px;";
				if(types[index_of_field]== "type_checkbox") {
					choise_select.setAttribute('multiple', 'multiple');
					choise_select.setAttribute('class', 'multiple_select');
				}
					
			for(k=0; k<w_choices_array.length; k++)	 {
				var choise_option = document.createElement('option');
					choise_option.setAttribute("id", "choise_"+num+'_'+k);
					choise_option.setAttribute("value", w_choices_value_array[k]);
					choise_option.innerHTML = w_choices_array[k];	
					
				if(w_choices_array[k].indexOf('[') === -1 && w_choices_array[k].indexOf(']') === -1) {
					choise_select.appendChild(choise_option);
				}
			}
			condition_div.appendChild(choise_select);	
			
		break;
		
		case "type_paypal_select":
		case "type_paypal_checkbox":
		case "type_paypal_radio":
		case "type_paypal_shipping":
			if(types[index_of_field]=="type_paypal_select")
				w_size = params[index_of_field].split('*:*w_size*:*');
			else
				w_size = params[index_of_field].split('*:*w_flow*:*');
				
			w_choices = w_size[1].split('*:*w_choices*:*');
			w_choices_array = w_choices[0].split('***');
			
			w_choices_price = w_choices[1].split('*:*w_choices_price*:*');
			w_choices_price_array = w_choices_price[0].split('***');
			
			var choise_select = document.createElement('select');
				choise_select.setAttribute("id", "field_value"+num+'_'+m);
				choise_select.style.cssText = "vertical-align: top; width:200px;";
				if(types[index_of_field]== "type_paypal_checkbox") {
					choise_select.setAttribute('multiple', 'multiple');
					choise_select.setAttribute('class', 'multiple_select');
				}
					
			for(k=0; k<w_choices_array.length; k++)	 {
				var choise_option = document.createElement('option');
					choise_option.setAttribute("id", "choise_"+num+'_'+k);
					choise_option.setAttribute("value", w_choices_array[k]+'*:*value*:*'+w_choices_price_array[k]);
					choise_option.innerHTML = w_choices_array[k];	
					
				if(w_choices_array[k].indexOf('[') === -1 && w_choices_array[k].indexOf(']') === -1 ) {
					choise_select.appendChild(choise_option);
				}
			}
			condition_div.appendChild(choise_select);	
		break;
		
		case "type_address":
      countries = form_maker.countries;
		
		var choise_select = document.createElement('select');
			choise_select.setAttribute("id", "field_value"+num+'_'+m);
      choise_select.setAttribute("class", "fm_condition_field_select_value");
      jQuery.each( countries, function( key, value ) {
        var choise_option = document.createElement('option');
        choise_option.setAttribute("id", "choise_" + num + '_' + k);
        choise_option.setAttribute("value", value);
        choise_option.innerHTML = value;

        choise_select.appendChild(choise_option);
      });
			condition_div.appendChild(choise_select);	
		break;
	}
	condition_div.appendChild(document.createTextNode(' '));
	
	var	trash_icon = document.createElement('span');
		trash_icon.setAttribute('class', 'dashicons dashicons-trash');
		trash_icon.setAttribute('id','delete_condition'+num+'_'+m);
		trash_icon.setAttribute('onClick','delete_field_condition("'+num+'_'+m+'")');
		trash_icon.style.cssText = "vertical-align: middle";

	condition_div.appendChild(trash_icon);
	document.getElementById('condition'+num).appendChild(condition_div);
}

function add_condition(ids1, labels1, types1, params1, all_ids, all_labels) {
	for(i=500; i>=0; i--) {
		if(document.getElementById('condition'+i))
			break;
	}
	
	num=i+1;

	ids = all_ids.split("@@**@@");
	labels = all_labels.split("@@**@@");

	var condition_div = document.createElement('div');
		condition_div.setAttribute("id", "condition"+num);
		condition_div.setAttribute("class", "fm_condition");
	
	var conditional_fields_div = document.createElement('div');
		conditional_fields_div.setAttribute("id", "conditional_fileds"+num);
	
	var show_hide_select = document.createElement('select');
		show_hide_select.setAttribute("id", "show_hide"+num);
		show_hide_select.setAttribute("name", "show_hide"+num);
		show_hide_select.setAttribute("class", "fm_condition_show_hide");

	var show_option = document.createElement('option');
		show_option.setAttribute("value", "1");
		show_option.innerHTML = "show";

	var hide_option = document.createElement('option');
		hide_option.setAttribute("value", "0");
		hide_option.innerHTML = "hide";	
	
	show_hide_select.appendChild(show_option);
	show_hide_select.appendChild(hide_option);
	
	var fields_select = document.createElement('select');
		fields_select.setAttribute("id", "fields"+num);
		fields_select.setAttribute("name", "fields"+num);
    	fields_select.setAttribute("class", "fm_condition_fields");

	for(k=0; k<labels.length; k++) {
		var fields_option = document.createElement('option');
			fields_option.setAttribute("value", ids[k]);
			fields_option.innerHTML = labels[k];
			
		fields_select.appendChild(fields_option);
	}

	var span = document.createElement('span');
		span.innerHTML = 'if';	
				
	var all_any_select = document.createElement('select');
		all_any_select.setAttribute("id", "all_any"+num);
		all_any_select.setAttribute("name", "all_any"+num);
		all_any_select.setAttribute("class", "fm_condition_all_any");


	var all_option = document.createElement('option');
		all_option.setAttribute("value", "and");
		all_option.innerHTML = "all";

	var any_option = document.createElement('option');
		any_option.setAttribute("value", "or");
		any_option.innerHTML = "any";	
		
	all_any_select.appendChild(all_option);
	all_any_select.appendChild(any_option);

	var span1 = document.createElement('span');
    	span1.style.maxWidth ='235px';
    	span1.style.width ='100%';
    	span1.style.display='inline-block';
		span1.innerHTML = 'of the following match:';

	var add_icon = document.createElement('span');
		add_icon.setAttribute('class', 'dashicons dashicons-plus-alt');
		add_icon.setAttribute('onClick','add_condition_fields("'+num+'", "'+ids1+'", "'+labels1.replace(/\'/g,"\\'").replace(/\"/g,"&quot;")+'", "'+types1.replace(/\'/g,"\\'").replace(/\"/g,"&quot;")+'", "'+params1.replace(/\'/g,"\\'").replace(/\"/g,"&quot;")+'")');
	
	var delete_icon = document.createElement('span');
		delete_icon.setAttribute('class','dashicons dashicons-trash');
		delete_icon.setAttribute('onClick','delete_condition("'+num+'")');		
	
	conditional_fields_div.appendChild(show_hide_select);	
	conditional_fields_div.appendChild(document.createTextNode(' '));
	conditional_fields_div.appendChild(fields_select);
	conditional_fields_div.appendChild(document.createTextNode(' '));
	conditional_fields_div.appendChild(span);	
	conditional_fields_div.appendChild(document.createTextNode(' '));
	conditional_fields_div.appendChild(all_any_select);	
	conditional_fields_div.appendChild(document.createTextNode(' '));
	conditional_fields_div.appendChild(span1);	
	conditional_fields_div.appendChild(document.createTextNode(' '));
	conditional_fields_div.appendChild(delete_icon);	
	conditional_fields_div.appendChild(document.createTextNode(' '));
	conditional_fields_div.appendChild(add_icon);	

	condition_div.appendChild(conditional_fields_div);	
	document.getElementById('conditions_fieldset_wrap').appendChild(condition_div);	
}

function delete_condition(num) {
	document.getElementById('conditions_fieldset_wrap').removeChild(document.getElementById('condition'+num));	
}

function acces_level(length) {
	var value='';
	for(i=0; i<=parseInt(length); i++) {
    if (document.getElementById('user_'+i).checked) {
      value=value+document.getElementById('user_'+i).value+',';			
    }	
  }
	document.getElementById('user_id_wd').value=value;
}

function check_isnum_space(e) {
	var chCode1 = e.which || e.keyCode;	
	if (chCode1 ==32) {
		return true;
  }
  if (chCode1 > 31 && (chCode1 < 48 || chCode1 > 57)) {
		return false;
  }
	return true;
}

function check_isnum_point(e) {
  var chCode1 = e.which || e.keyCode;	
	if (chCode1 ==46) {
		return true;
	}
	if (chCode1 > 31 && (chCode1 < 48 || chCode1 > 57)) {
    return false;
  }
	return true;
}

function check_stripe_required_fields() {
  if (jQuery('#paypal_mode2').prop('checked')) {
    if (jQuery('#stripemode').val() == '1') {
      fields = ['live_sec', 'live_pub'];
      fields_titles = ['Live secret key', 'Live publishable key'];
    }
    else {
      fields = ['test_sec', 'test_pub'];
      fields_titles = ['Test secret key', 'Test publishable key'];
    }
    for (i=0; i < fields.length; i++) {
      if (!jQuery('#' + fields[i]).val()) {
        jQuery('#' + fields[i]).focus();
        alert(fields_titles[i] + ' is required.');
        return true;
      }
    }
  }
  return false;
}

function check_calculator_required_fields() {
	var empty_textarea = 0;
	jQuery(jQuery('#wd_calculated_field_table').find('[id^="wdc_equation_"]')).each(function() {
		if(jQuery( this ).val() == ''){
			var field_id = jQuery( this ).attr('id').replace('wdc_equation_','');
			var label_name = jQuery(jQuery('#wd_calculated_field_table').find("[data-field='" + field_id + "']")).html();
			empty_textarea = 1;
			jQuery( this ).focus();
			alert('Set equation for the field ' + label_name);
		}
		if(empty_textarea == 1)
			return false;
		});
	if(empty_textarea == 1)
		return true;
		
	return false;
}

function set_theme() {
  theme_id = jQuery('#theme').val() == '0' ? default_theme : jQuery('#theme').val();
  jQuery("#edit_css").attr("onclick", "window.open('"+ theme_edit_url +"&current_id=" + theme_id + "'); return false;");
  if (jQuery('#theme option:selected').attr('data-version') == 1) {
    jQuery("#old_theme_notice").show();
  }
  else {
    jQuery("#old_theme_notice").hide();
  }
}