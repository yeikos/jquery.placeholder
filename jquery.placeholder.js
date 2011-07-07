/*!
 * @name jQuery.placeholder v1.1
 * @autor yeikos
 
 * Copyright 2011 - https://github.com/yeikos/jquery.placeholder
 * GNU General Public License
 * http://www.gnu.org/licenses/gpl-3.0.txt
 */
 
(function($, undefined) {

	$('html > head').append('<style> .jqueryPlaceholder { color: #A9A9A9; } </style>');

	var supportHTML5 = function() {// check if the browser supports use placeholder native 
	
		var node = arguments[0], 
			type = arguments[1],
			element = document.createElement(node);
		
		if (type) { 
		
			element.type = type;

		}
		
		return (element.placeholder == undefined) ? false : true;
		
	};
	
	// call with selector predefined
	
	$.placeholder = function() {
	
		$($.placeholder.config.selector).placeholder(arguments[0]);

	};

	// script config
	
	$.placeholder.config = {
	
		// force to use this script when there is native support (only if there is not a placeholder like argument when call to $.placeholder)
		 
		forced: true,
		
		support: {
		
			// check native placeholder
			
			inputText: supportHTML5('input', 'text'),
			inputPassword: supportHTML5('input', 'password'),
			textarea: supportHTML5('textarea')
			
		},

		// default selector used in $.placeholder();
		
		selector: 'input[type=text],input[type=password],textarea',

		// css class used by the placeholders
		
		classPlaceholder: 'jQueryPlaceholder'
		
	};

	$.fn.placeholder = function() {

		var option = arguments[0],
			config = $.placeholder.config;
		
		$.each(this, function(index, element) {

			var node = element.nodeName.toLowerCase(),
			
				type = ($(element).attr('type') || '').toLowerCase(),

				text = (option != undefined) ? option : $(element).attr('placeholder'),
				
				style;
				
			if (typeof option != 'boolean') { // no action
			
				if (!text) { // no text placeholder
	
					return true;
					
				} else if ($(element).attr('placeholder') != text) { // differents placeholders (overlays with placeholder jquery & placeholder attribute html)
		
					$(element).attr('placeholder', text);
					
				}
				
			}

			if ((node == 'input' && (type == 'text' || type == 'password')) || node == 'textarea') { // text, password, textarea
			
				// if previous call (remove element created)
				
				var newElement = $(element).data('placeholderElement');
				
				if (newElement) {
			
					newElement.remove();
					
				}
				
				if (option === false) { // disable placeholder
				
					$(element).
					unbind('blur.placeholder'). // delete unbind
					removeClass(config.classPlaceholder). // remove class
					data('placeholderElement', ''). // delete link to element
					data('placeholder', text). // save placeholder text
					attr('placeholder', ''). // delete placeholder attribute
					show();
					
					return true;
					
				} else if (option === true) { // enable placeholder
		
					text = $(element).data('placeholder');
					
					$(element).attr('placeholder', text);
				
				}
				
				// check if there is native support
			
				type = (node == 'textarea') ? 'textarea' : (type == 'text') ? 'inputText' : 'inputPassword';
				
				if (config.support[type] && !config.forced) {
				
					return true;

				}
			
				// copy all attributes with values of element
				
				var newAttr = {};

				$.each(element.attributes, function(subindex, subitem) {
				
					if (subitem.nodeValue && subitem.nodeValue.length) {
					
						newAttr[subitem.nodeName] = subitem.nodeValue;
						
					}
		
				});
		
				newAttr.value = text;
		
				// id is unique, if there are two elements with same id always get the first so it new element will go to next
				
				delete newAttr.placeholder; // placeholder is not need
				delete newAttr.type; // if its password it will set to text
				delete newAttr.name; // delete dangerous attributes 
	
				// create a new element exactly equal but type text new style
			
				newElement = $('<input type="text">').attr(newAttr).addClass(config.classPlaceholder).hide();

				// element copy is added to next
			
				$(element).data('placeholderElement', newElement).after(newElement).bind('blur.placeholder', function(event) { 
				
					if(!$(this).val().length) { // no input entered

						$(newElement).show(); // show input text
						$(this).hide(); // hidden input password
						
					}
					
				});
	
				$(newElement).bind('focus.placeholder', function(event) {

					$(this).hide(); // hidden input text
					$(element).show().trigger('focus'); // show and focus input password
					
				});

				// if there is value, show original element, else, show new element with placeholder
				
				if ($(element).val().length) {
				
					$(newElement).hide();
					$(element).show();

				} else {
				
					$(element).hide();
					$(newElement).show();
					
				}

			} else {
			
				// input text/password or textarea is required
			
				throw 'jQuery.placeholder: Element is not input type text/password or textarea.';
				
				return false;
				
			}
						
		});
		
		return this;

	};
	
})(jQuery);