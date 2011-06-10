jQuery.placeholder
==================================================

How to use
--------------------------------------

	<p> <input type="text" placeholder="Email"> </p>
	<p> <input type="password" placeholder="Password"> </p>
	
	$(function() {

		$.placeholder();
		
	});

--------------------------------------

	<p> <input type="text" id="search" placeholder="seach"> </p>

	$(function() {

		$('#search').placeholder();

	});

--------------------------------------

	<p> <textarea type="text" id="description"> </p>

	$(function() {

		$('#description').placeholder('Description');
		
	});
