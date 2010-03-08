<?php require("init.php")?>
<?php 

ini_set("session.gc_maxlifetime",24*60*60);
session_set_cookie_params(24*60*60);
session_start();
$user = $_SESSION['user'][0];

if ($_GET["mode"] == "login"):	
	$q = "select * from pegawai where username = '" . $_POST["username"] . "' and password = md5('" . $_POST["password"] ."')";
	$user = $db->get($q);
	$_SESSION['user'] = $user;
	if (count($user) > 0)	
		header("location:pesan.php");
	else 
		header("location:index.php");

elseif ($_GET["mode"] == "pesan" && $_POST["jenis_pesanan"] =="baru"):
	$pesan = $redbean->dispense("order");
	$pesan->ordertype = "dinein";
	$pesan->username = $user['username'];
	$pesan->open = date("Y-m-d H:i:s");
	$pesan->namameja = trim($_POST["nomor_meja"]);
	$pesan->status = "open";
	$pesan->jumlahtamu = $_POST["jumlah_tamu"];
	
	$orderid = $redbean->store($pesan);
	
	$pesanan = explode("|",$_POST["pesanan"]);
	foreach ($pesanan as $pesan) {
		$cur = explode("-",$pesan);
		$menuid = $cur[0];
		$jumlah = $cur[1];
		$remark = $cur[2];
		
		$q = "select * from menu where id = " . $menuid;
		
		$menu = $db->get($q);
		$namamenu = $menu[0]["namamenu"];
		$harga = $menu[0]["harga"];
		
		$insert_pesan = $redbean->dispense("ordermenu");
		$insert_pesan->orderid = $orderid;
		$insert_pesan->menu = $namamenu;
		$insert_pesan->jumlah = $jumlah;
		$insert_pesan->remark = $remark;
		$insert_pesan->harga = $harga;// * ($jumlah * 1);
		$redbean->store($insert_pesan);
	
	}
	
	header("location:pesan.php?sukses=true&jenis_pesanan=baru&pesan=pesanan baru berhasil");
elseif ($_GET["mode"] == "pesan" && $_POST["jenis_pesanan"] =="repeat"):
	if (is_numeric(trim($_POST["nomor_meja"]))) {
		$namameja = trim($_POST["nomor_meja"]);
	}
	else {
		$namameja = "'" . trim($_POST["nomor_meja"]) . "'";
	}
	
	$q = "select * from `order` where namameja = " . $namameja . " and status = 'open'"  . " order by id desc limit 1";
	//echo $q;
	$order = $db->get($q);
	//print_r($order);
	$found = sizeof($order);
	if($found){
		$orderid = $order[0]["id"];

		$pesanan = explode("|",$_POST["pesanan"]);
		foreach ($pesanan as $pesan) {
			$cur = explode("-",$pesan);
			$menuid = $cur[0];
			$jumlah = $cur[1];
			$remark = $cur[2];

			$q = "select * from menu where id = " . $menuid;

			$menu = $db->get($q);
			$namamenu = $menu[0]["namamenu"];
			$harga = $menu[0]["harga"];

			$insert_pesan = $redbean->dispense("ordermenu");
			$insert_pesan->orderid = $orderid;
			$insert_pesan->menu = $namamenu;
			$insert_pesan->jumlah = $jumlah;
			$insert_pesan->remark = $remark;
			$insert_pesan->harga = $harga;// * ($jumlah * 1);
			$redbean->store($insert_pesan);

		}
		header("location:pesan.php?sukses=true&jenis_pesanan=repeat&pesan=sukses menambah pesanan");
	}

	else{
		header("location:pesan.php?sukses=true&jenis_pesanan=repeat&pesan=pesanan gagal karena sudah terbayar atau tak ada pesanan dengan bangku tsb.");
	}
endif;

?>