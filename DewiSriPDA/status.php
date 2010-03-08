<?php 
session_start();
require("template.php"); ds_header(); ?>
<?php require("init.php")?>
<?php ds_content(); 
$username = $_SESSION['user'][0]['username'];
?>
	<h2>Status Pembayaran Untuk <?php echo $username;?></h2>
	<?php
	$q = "select * from `order` where username = '" . $username . "' and open like '" . date("Y-m-d") . "%'";
	$order = $db->get($q);
	//print_r($order);
	echo '<table border="1"><td>id</td><td>meja</td><td>status</td>';
	foreach($order as $list){
		$status = ($list['status']=="open") ? "belum terbayar" : "sudah terbayar";
		echo '<tr><td>'. $list['id'] .'</td>';
		echo '<td>'. $list['namameja'] .'</td>';
		echo '<td>'. $status  .'</td></tr>';
	}
	echo "</table>";
	?>
	<a href="pesan.php">Kembali Ke Menu Utama</a>
<?php ds_footer(); ?>