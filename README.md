jQuery.placeholder
==================================================

What is this?
--------------------------------------

A plugin for jQuery that available used of placeholders if your browser don't support it.

More info about placeholders: http://dev.w3.org/html5/spec/Overview.html#the-placeholder-attribute

How to use
--------------------------------------

	$(selector).placeholder(text);
	
Config
--------------------------------------

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
	
Examples
--------------------------------------

	<p> <input type="text" placeholder="Email"> </p>
	<p> <input type="password" placeholder="Password"> </p>

	<script type="text/javascript">

		$(function() {

			$.placeholder();
			
		});
		
	</script>
	
--------------------------------------

	<p> <input type="text" id="search" placeholder="seach"> </p>

	<script type="text/javascript">

		$(function() {

			$('#search').placeholder();

		});
		
	</script>
	
--------------------------------------

	<p> <textarea type="text" id="description"> </p>

	
	<script type="text/javascript">

		$(function() {

			$('#description').placeholder('Description');
			
		});
		
	</script>
