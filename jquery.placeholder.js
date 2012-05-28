/*!
 * @name jQuery.placeholder v1.5.0
 * @autor yeikos
 
 * Copyright 2012 - https://github.com/yeikos/jquery.placeholder
 * GNU General Public License
 * http://www.gnu.org/licenses/gpl-3.0.txt
 */
 
;(function($, undefined) {

	// Acceso directo con contexto ya definido (body)

	$.placeholder = function() {

		var $context = $('body');

		return $context.placeholder.apply($context, arguments);

	};

	// Opciones por defecto

	$.placeholder.defaults = {

		// Selector por defecto

		selector: 'input[type=text],input[type=password],textarea',

		// Marcador para forzar el uso de jQuery.placeholder aún habiendo soporte nativo

		forced: false

	};

	// Función de ayuda para comprobar el soporte nativo de placeholder en diferentes elementos

	$.placeholder.support = function(node, type) {

		var element = document.createElement(node);
		
		if (type)
		
			element.type = type;

		return (element.placeholder !== undefined);

	};

	// Función principal encargada de dar soporte placeholder a los elementos

	$.fn.placeholder = function() {

		// Los argumentos option y selector son opcionales y sin un orden de entrada

		var temp = {},
			argv = arguments;

		temp[typeof argv[0]] = argv[0];
		temp[typeof argv[1]] = argv[1];

		// Mezclamos los argumentos por defecto con los introducidos por el usuario

		var option = $.extend({}, $.placeholder.defaults, temp.object ? temp.object : {}, temp.string ? { selector: temp.string } : {});

		// Recorremos todos los contextos

		return $(this).each(function(x, context) {

			// Utilizamos el selector para buscar dentro del contexto

			$(option.selector, context).each(function(y, element) {

				// Acceso directo al elemento actual

				var $self = $(this),

				// Obtenemos el atributo placeholder

					placeholder = $self.attr('placeholder'),

				// Definimos el tipo de elemento (textarea, inputText, inputPassword)

					type = $self.is('textarea') ? 'textarea' : $self.is('input[type=text]') ? 'inputText' : $self.is('input[type=password]') ? 'inputPassword' : 0;

				// Contenedor para almacenar los atributos

					attr = {};

				// Si el tipo no es correcto o
				// Ya se actuó sobre el elemento o
				// El elemento no tiene definido un placeholder o
				// El elemento tiene soporte nativo y no está el marcador forced activado

				if (!type || $self.data('placeholder') || placeholder === undefined || ($.placeholder.support[type] && !option.forced))

					// Detenemos el código

					return;

				// Copiamos todos los atributos de elemento al contenedor attr

				$.each(element.attributes, function(z, item) {
				
					if (item.nodeValue && item.nodeValue.length)

						attr[item.nodeName] = item.nodeValue;
				
				});

				// Establecemos como valor el atributo placeholder y eliminamos los siguientes atributos

				attr.value = placeholder;

				// El placeholder para evitar conflictos con el soporte nativo

				delete attr.placeholder;

				// El tipo, si lo hubiera, pues éste será definido a continuación

				delete attr.type;

				// El nombre para evitar problemas en los formularios

				delete attr.name;

				// Creamos el elemento placeholder (input text o textarea)

				var $placeholder = $((type == 'textarea') ? '<textarea></textarea>' : '<input type="text">');

				// Establecemos los atributos anteriores y el color del texto
				// Ocultamos el elemento y lo insertamos después del elemento original

				$placeholder.attr(attr).css('color', '#A9A9A9').addClass('placeholder').hide().insertAfter(

					// Eliminamos el atributo placeholder del elemento original para evitar problemas
					// Añadimos un marcador para evitar repetir el proceso
					// Guardamos el elemento placeholder en el elemento original (data)

					// Cuando el elemento original pierda el enfoce

					$self.on('blur.placeholder', function() {

						// Si carece de valor

						if (!$self.val().length) {

							// Ocultamos el elemento original y mostramos el placeholder

							$self.hide();
							$placeholder.show();

						}

					}).trigger('blur.placeholder').attr('placeholder', null).data('placeholder', $placeholder)

				// Guardamos el elemento original en el elemento placeholder (data)

				// Cuando se enfoque el elemento placeholder

				).on('focus.placeholder', function() {

					// Ocultamos el elemento placeholder y mostramos el original

					$placeholder.hide();
					$self.show().trigger('focus');

				}).data('placeholder', $self);

			});

		});

	};

	// Comprobamos el soporte nativo placeholder de los siguientes elementos

	(function(support) {

		// input[type=text]

		support.inputText = support('input', 'text');

		// input[type=password]

		support.inputPassword = support('input', 'password');

		// textarea

		support.textarea = support('textarea');

	})($.placeholder.support);

})(jQuery);