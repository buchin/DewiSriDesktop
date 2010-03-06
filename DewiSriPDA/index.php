<?php require_once("template.php");
	ds_header();
	ds_content();
?>
	<div class="header">
		<h1>Dewi Sri - Login</h1>
	</div>
	<div class="content">
		<form method="post" action="server.php?mode=login">
			<hr>
			Username
			<input class="field" type="text" name="username" />
			Password
			<input class="field" type="password" name="password" />
			<input class="submit" type="submit" value="submit" name="submit" />
		</form>
	</div>
<?php ds_footer(); ?>