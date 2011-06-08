(function($) {

	var support = document.createElement('input').placeholder ? true : false;
	
	function prepareStyle(element) {
	
		var newCss = {
			color: '#A9A9A9'
		}, oldCss = {};
		
		// css backup
		
		$.each(newCss, function(key) { 
		
			oldCss[key] = $(element).css(key);
			
		});
		
		// return new css and backup
		
		return {
			newCss: newCss,
			oldCss: oldCss
		};
		
	}
	
	$.placeholder = function() {
	
		$('input[type=text],input[type=password],textarea').placeholder(arguments[0]);

	};
	
	$.placeholder.config = {
	
		force: true
		
	};
	
	$.fn.placeholder = function() {
	
		if (support || !$.placeholder.force) {
		
			return true;
			
		}
		
		var	 argv = arguments[0], tag = argv ? false : true;
		
		$.each(this, function(index, element) {
	
			var node = element.nodeName,
				type = $(element).attr('type'),
				text = tag ? $(element).attr('placeholder') : text ? argv : 'default',
				style = prepareStyle(element);
	
			if (node == 'INPUT' && type == 'password') { // <input type="password">

				var newAttr = {};

				// copy all attributes with values
				
				$.each(element.attributes, function(subindex, subitem) {
				
					if(subitem.nodeValue && subitem.nodeValue.length) {
						newAttr[subitem.nodeName] = subitem.nodeValue;
					}
		
				});
		
				newAttr.value = text;

				delete newAttr.id;
				delete newAttr.type;
				delete newAttr.name;
				
				// create a new element exactly equal but type text

				var newElement = $('<input type="text">').attr(newAttr).css(style.newCss).hide();
		
				// element copy is added to continuing
				
				$(element).after(newElement).blur({newElement: newElement}, function(event) { 
				
					if($(this).val() == '') { // no password entered

						$(event.data.newElement).show(); // show input text
						$(this).hide(); // hidden input password
						
					}
					
				}).hide();
				
				$(newElement).focus({element: element}, function(event) { 

					$(this).hide();
					$(event.data.element).show().focus();
					
				}).show();

				return true;
				
			} else if ((node == 'INPUT' && type == 'text') || node == 'TEXTAREA') { // <input type="text"> <textarea>
			
				var mutex = true,
					style = prepareStyle(this);
				
				$(element).focus({style: style}, function(event) {

					if (mutex) {
						$(this).css(event.data.style.oldCss).val('');
					}

				}).blur({style: style}, function(event) {
				
					if (!$(this).val().length) {
			
						$(this).css(event.data.style.newCss).val(text);
					}
				
				}).change(function() {

					mutex = $(this).val().length ? false: true;
			
				}).blur();
				
				return true;
				
			} else {
			
				throw 'jquery.placeholder -> Element is not input type text/password or textarea';
				return false;
				
			}
			
		});

	};
	
})(jQuery);