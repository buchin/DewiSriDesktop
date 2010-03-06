<?php 
session_start();
echo count($_SESSION);
foreach ($_SESSION as $key=>$value) {
	echo $key . " = " . $value . "<br>";
}
?>