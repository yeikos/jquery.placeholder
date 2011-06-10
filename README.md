jQuery.placeholder
==================================================

How to use
--------------------------------------

JS sample:

	#JS
	
	$(function() {

		$.placeholder();
		
	});

HTML code:

	#HTML
	
	<p> <input type="text" placeholder="Email"> </p>
	<p> <input type="password" placeholder="Password"> </p>

--------------------------------------

	#HTML

	<p> <input type="text" id="search" placeholder="seach"> </p>

	#JS

	$(function() {

		$('#search').placeholder();

	});

--------------------------------------

#HTML

<p> <textarea type="text" id="description"> </p>

#JS

$(function() {

	$('#description').placeholder('Description');
	
});
