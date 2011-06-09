/*!
 * jQuery.placeholder v1.0

 * Copyright 2011 - yeikos
 * GNU General Public License
 * http://www.gnu.org/licenses/gpl-3.0.txt
 */
 
(function($, undefined) {

	// check if the browser supports use placeholder native 
	
	var supportHTML5 = (document.createElement('input').placeholder == undefined) ? false : true, 
	
	// this function will do a backup css
	
		makeCSS = function(type, element) {
	
		var defined = $.placeholder.config.css[type], 
			backup = {};
		
		if (typeof defined == 'object') {
		
			$.each(defined, function(key) { 
			
				backup[key] = $(element).css(key);
				
			});
			
		}
		
		// return new css and backup
		
		return {
			defined: defined,
			backup: backup
		};
		
	};
	
	// call with selector predefined
	
	$.placeholder = function() {
	
		$($.placeholder.config.selectorDefault).placeholder(arguments[0]);

	};

	// script config
	
	$.placeholder.config = {
	
		// force to use this script and not native support
		 
		forced: true,
		
		// default selector used in $.placeholder();
		
		selectorDefault: 'input[type=text],input[type=password],textarea',
		
		// text by default if there is not defined a placeholder
		
		textDefault: 'default',
		
		// css used by the placeholders
		
		css: {
		
			inputText: {
				color: '#A9A9A9'
			},
			
			inputPassword: {
				color: '#A9A9A9'
			},
			
			textarea: {
				color: '#A9A9A9'
			}
		}
		
	};
	
	$.fn.placeholder = function() {
	
		// native support && no forced to use this script

		if (supportHTML5 && !$.placeholder.config.forced) {
		
			return true; // return and use native support
			
		}
	
		var	argv = arguments[0], 
		
		// check if there is placeholder like argument
		
			tag = argv ? false : true;
		
		$.each(this, function(index, element) {
	
			var node = element.nodeName.toLowerCase(),
			
				type = $(element).attr('type').toLowerCase(),
				
				// argument || placeholder attribute || text default
				
				text = tag ? $(element).attr('placeholder') : argv ? argv : $.placeholder.config.textDefault,
				style;
	
			if (node == 'input' && type == 'password') { // <input type="password">

				style = makeCSS('inputPassword', element);
			
				var newAttr = {};

				// copy all attributes with values
				
				$.each(element.attributes, function(subindex, subitem) {
				
					if(subitem.nodeValue && subitem.nodeValue.length) {
						newAttr[subitem.nodeName] = subitem.nodeValue;
					}
		
				});
		
				newAttr.value = text;
				
				// delete dangerous attributes 
				
				delete newAttr.id;
				delete newAttr.type;
				delete newAttr.name;
				
				// create a new element exactly equal but type text new style

				var newElement = $('<input type="text">').attr(newAttr).css(style.defined).hide();
		
				// element copy is added to continuing
				
				$(element).after(newElement).blur(function(event) { 
				
					if(!$(this).val().length) { // no password entered

						$(newElement).show(); // show input text
						$(this).hide(); // hidden input password
						
					}
					
				}).hide();
				
				$(newElement).focus(function(event) {

					$(this).hide(); // hidden input text
					$(element).show().focus(); // show and focus input password
					
				}).show();

				return true;
				
			} else if ((node == 'input' && type == 'text') || node == 'textarea') { // <input type="text"> || <textarea>
			
				style = makeCSS((node == 'input') ? 'inputText' : 'textarea', element);
				
				// special variable
				
				var mutex = true;
				
				$(element).focus(function(event) {

					if (mutex) {
						$(this).css(style.backup).val(''); // unset text
					}

				}).blur(function(event) {
				
					if (!$(this).val().length) {
			
						$(this).css(style.defined).val(text); // set text
					}
				
				}).change(function() {

					mutex = $(this).val().length ? false: true; // check if there is value
			
				}).blur();
				
				return true;
				
			} else {
			
				// input text/password or textarea is required
			
				throw 'jQuery.placeholder: Element is not input type text/password or textarea.';
				
				return false;
				
			}
			
		});

	};
	
})(jQuery);