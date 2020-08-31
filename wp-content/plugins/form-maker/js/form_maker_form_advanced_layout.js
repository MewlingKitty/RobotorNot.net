var editor;
jQuery(document).on('fm_tab_layout_loaded', function () {
  editor = CodeMirror.fromTextArea(document.getElementById("source"), {
    lineNumbers: true,
    lineWrapping: true,
    mode: "htmlmixed",
    value: form_front
  });
	if (custom_front == '') {
		custom_front = form_front;
	}
	
	if (jQuery('#autogen_layout').is(':checked')) {
		editor.setOption('readOnly',  true);
		editor.setValue(form_front);
	}
	else {
		editor.setOption('readOnly',  false);
		editor.setValue(custom_front);
	}
	
	jQuery('#autogen_layout').on("click", function() {
		autogen(jQuery(this).is(':checked'));
	});
	
	autoFormat();
});
	
function fm_apply_advanced_layout() {
	var tabs_loaded = JSON.parse(jQuery('#fm_tabs_loaded').val());
	if ( inArray('form_layout_tab', tabs_loaded) ) {
		if (jQuery('#autogen_layout').is(':checked')) {
			jQuery('#custom_front').val(custom_front.replace(/\s+/g, ' ').replace(/> </g, '><'));
		} else {
			jQuery('#custom_front').val(editor.getValue().replace(/\s+/g, ' ').replace(/> </g, '><'));
		}
	}
	return true;
}
	
function insertAtCursor_form(myId, myLabel) {
	if (jQuery('#autogen_layout').is(':checked')) {
		alert("Uncheck the Auto-Generate Layout box.");
		return;
	}
	myValue = '<div wdid="' + myId + '" class="wdform_row">%' + myId + ' - ' + myLabel + '%</div>';
	line = editor.getCursor().line;
	ch = editor.getCursor().ch;
	text = editor.getLine(line);
	text1 = text.substr(0, ch);
	text2 = text.substr(ch);
	text = text1 + myValue + text2;
	editor.setLine(line, text);
	editor.focus();
}
	
function autogen(status) {
	if (status) {
		custom_front = editor.getValue();
		editor.setValue(form_front);
		editor.setOption('readOnly', true);
		autoFormat();
	}
	else {
		editor.setValue(custom_front);
		editor.setOption('readOnly', false);
		autoFormat();
	}
}

function autoFormat() {
	CodeMirror.commands["selectAll"](editor);
	editor.autoFormatRange(editor.getCursor(true), editor.getCursor(false));
	editor.scrollTo(0,0);
	return false;
}