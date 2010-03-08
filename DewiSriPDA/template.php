<?php

/******************************* Header ******************************/
function ds_header() {
?>
	
	<!DOCTYPE html 
		 PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
		"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
	  <head>
		<title>Dewi Sri - Mobile App</title>
		<meta http-equiv="Content-Type" content="application/xhtml+xml; charset=utf-8" />
		<meta content="width=240; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" name="viewport"/>
		<link rel="stylesheet" href="style.css" type="text/css" media="all" />
		<script type="text/javascript" src="jquery-latest.min.js"></script>
		<script type="text/javascript">
		   function changeScreenSize(w,h)
		     {
		       window.resizeTo( w,h )
		     }
			$(document).ready(function(){
			  // Your code here...
				changeScreenSize(380,500);
			});
		</script>
		
<?php
}

/******************************* Footer ******************************/
function ds_content() {
?>
	  </head>
	  <body>
		<div id="page">
<?php
}

/******************************* Footer ******************************/
function ds_footer() {
?>
	</div>
  </body>
</html>
<?php
}

?>