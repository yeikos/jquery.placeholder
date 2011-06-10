jQuery.placeholder
==================================================

How to use
--------------------------------------
#HTML

<p> <input type="text" placeholder="Email"> </p>
<p> <input type="password" placeholder="Password"> </p>

<script type="text/javascript">

$(function() {

	$.placeholder();
	
});

</script>

--------------------------------------

#HTML

<p> <input type="text" id="search" placeholder="seach"> </p>


<script type="text/javascript">

$(function() {

	$('#search').placeholder();

});

</script>

--------------------------------------
#HTML

<p> <textarea type="text" id="description"> </p>

<script type="text/javascript">

$(function() {

	$('#description').placeholder('Description');
	
});

</script>