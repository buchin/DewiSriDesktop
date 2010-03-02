<?php
/*
Ajax Login for Resto
Mochammad Masbuchin

*/
session_start();
	switch($_GET['cmd']){
		case 'login':
			login($_GET['username'], $_GET['password']);
		break;
		case 'logout':
			logout();
		break;
		case 'getmeja':
			if(isset($_SESSION['username'])){
				getmeja();
			}
		break;
		
		case 'orderbaru':
			$jum = json_decode($_GET['data']);
			orderbaru($jum, $username =  $_SESSION['username']);
		break;
		
		case 'cashierin':
			$jum = json_decode($_GET['data']);
			$jum2= json_decode($_GET['total']);
			cashierin($jum,$jum2, $username=  $_SESSION['username']);
			
			/*$ok = array(
			'data' => $jum
			);
			echo json_encode($jum);
			/*if(isset($_SESSION['username'])){
				 
				 echo json_encode();
			}*/
		break;
		
		case 'cashierout':
			$jum = json_decode($_GET['data']);
			$jum2= json_decode($_GET['total']);
			cashierout($jum,$jum2, $username=  $_SESSION['username']);
		break;
		case 'dinein':
			$results = array("key" => "value");
			echo $_GET['callback'] . '(' . json_encode($results) . ')';

			//dinein($_REQUEST['data']);
		break;
		
		case 'populategroup':
			getgroup();			
		break;
		
		case 'populatemenu':
			getmenu($_GET['group']);			
		break;
		case 'recall':
			//$jum = json_decode($_GET['data']);
			//header('Content-Type: application/json');
			$jum = $_GET['data'];
			
			//echo $_GET['data'];
			$return = array(
							"test" => $jum2
							);
			$jum2 =  stripslashes($jum);
			recall(json_decode($jum2));			
		break;
		case 'getpegawai':
			getpegawai();			
		break;
		
		case 'getopenorder':
			getopenorder();			
		break;
		
		case 'getMenuByOrderID':
			$jum = json_decode($_GET['data']);
			getMenuByOrderID($jum);			
		break;
		
		case 'getOrderByID':
			$jum = json_decode($_GET['data']);
			getOrderByID($jum);			
		break;
		
		case 'editorderrecall':
			$jum = json_decode($_GET['data']);
			editorderrecall($jum);			
		break;
		case 'getAllMenu':
			getAllMenu();
		break;
		case 'newMenu':
			$jum = json_decode($_GET['data']);
			newMenu($jum);
		break;
		
		case 'editMenu':
			$jum = json_decode($_GET['data']);
			editMenu($jum);
		break;
		
		case 'deleteMenu':
			$jum = json_decode($_GET['data']);
			deleteMenu($jum);
		break;
		
		case 'newSettle':
			$jum = json_decode($_GET['data']);
			newSettle($jum);
		break;
		
		case 'newBahan':
			$jum = json_decode($_GET['data']);
			newBahan($jum);
		break;
		
		case 'getAllBahan':
			getAllBahan();
		break;
		
		case 'editBahan':
			$jum = json_decode($_GET['data']);
			editBahan($jum);
		break;
		
		case 'hapusBahan':
			$jum = json_decode($_GET['data']);
			hapusBahan($jum);
		break;
		
		case 'getAllStock':
			getAllStock();
		break;
		
		//IKi mulai COdingan Robert
		case 'getAllPayout':
			getAllPayout();
		break;
		case 'newPayout':
			$jum = json_decode($_GET['data']);
			newPayout($jum);
		break;
		
		case 'getAllKaryawan':
			getAllKaryawan();
		break;
		case 'newKaryawan':
			$jum = json_decode($_GET['data']);
			newKaryawan($jum);
		break;
		case 'editKaryawan':
			$jum = json_decode($_GET['data']);
			editKaryawan($jum);
		break;
		case 'deleteKaryawan':
			$jum = json_decode($_GET['data']);
			deleteKaryawan($jum);
		break;
		//IKI ahir kodingan RObert
		case 'addStock':
			$jum = json_decode($_GET['data']);
			addStock($jum);
		break;
		
		case 'editStock':
			$jum = json_decode($_GET['data']);
			editStock($jum);
		break;
		
		case 'getResepByMenuID':
			$jum = json_decode($_GET['data']);
			//echo json_encode($jum);
			getResepByMenuID($jum);
		break;
		
		case 'newResep':
			$jum = json_decode($_GET['data']);
			newResep($jum);
		break;
		
		case 'getSettleByUser':
			$jum = json_decode($_GET['data']);
			getSettleByUser($jum);
		break;
		
		case 'getSettleByUserTotal':
			$jum = json_decode($_GET['data']);
			getSettleByUserTotal($jum);
		break;
		
		case 'getKeuanganToday':
			//$jum = json_decode($_GET['data']);
			getKeuanganToday();
		break;
		
		case 'getPosisiKeuanganToday':
			//$jum = json_decode($_GET['data']);
			getPosisiKeuanganToday();
		break;
		
		case 'editResep':
			$jum = json_decode($_GET['data']);
			editResep($jum);
		break;
		
		case 'getMenuCost':
			$jum = json_decode($_GET['data']);
			getMenuCost($jum);
		break;
		
		case 'calculateMenuCost':
			setMenuCost($_GET['id']);
		break;
		
		case 'getUnprinted':
			//$jum = json_decode($_GET['data']);
			getUnprinted();
		break;
		
		case 'setPrintStatus':
			$jum = json_decode($_GET['data']);
			setPrintStatus($jum);
		break;
		/*------------------------------------------- awal tambahan -------------------------------------------*/
		case 'getAllGroup':
			getAllGroup();
		break;
		
		case 'getGroupByName':
			getGroupByName(json_decode($_GET['data']));
		break;
		
		
		case 'getOrderMenuByName':
			getOrderMenuByName(json_decode($_GET['data']));
		break;
		
		case 'delOrderMenuByOrderID':
			delOrderMenuByOrderID(json_decode($_GET['data']));
		break;
		/*------------------------------------------- akhir tambahan -------------------------------------------*/
		case 'getPenjualanHariIni':
			getPenjualanHariIni();
		break;
		case 'delPayout':
			# code...
			$jum = json_decode($_GET['data']);
			delPayout($jum);
			break;
		}
function delPayout($data)
{
	# code...
	require("inc/init.php");
	$payout = $redbean->load("payout",$data->{'id'});
	echo json_encode($redbean->trash($payout));
}		
function getPenjualanHariIni()
{
	# code...
	require 'inc/init.php';
	$q = "SELECT ordermenu.menu as namamenu, ordermenu.harga as harga, sum(ordermenu.jumlah) as jumlah, (sum(ordermenu.jumlah)*harga) as total  FROM `ordermenu`,`order` where ordermenu.orderid = order.id and order.status='completed' and order.completed like '" . date('Y-m-d') . "%' group by namamenu";
	echo json_encode($adapter->get($q));
}
function delOrderMenuByOrderID($data){
	//echo json_encode($data);
	require("inc/init.php");
	$ordermenu = $redbean->load("ordermenu",$data->{'id'});
	echo json_encode($redbean->trash($ordermenu));
	}
function setPrintStatus($data){
	require("inc/init.php");
	//$menu = $redbean->dispense("menu");
	$query = "update `order` set `printstatus` = 'printed' where id='" . $data->{'id'} . "'";
	$adapter->exec($query);
	$return = array(
	'id'=>$data->{'id'},
	'status' => 'sukses'
	);
	echo json_encode($data);
	}

function getUnprinted(){
	require("inc/init.php");
	$query  = "select `id` from `order` where `open` like '". date('Y-m-d') . "%' order by `printstatus` ASC";
	$keys = $adapter->getCol($query);
	$semuaorder = $redbean->batch("order",$keys);
	echo json_encode($semuaorder);
	}
function setMenuCost($id){
	require("inc/init.php");
	$query  = "select `id` from `resep` where menuid = '" . $id . "'";
	$keys = $adapter->getCol($query);
	$menucost = 0;
	$semuaresep = $redbean->batch("resep", $keys);
	foreach($semuaresep as $resep){
		$bahan = $redbean->load("bahan", $resep->bahanid);
		$menucost +=$bahan->harga*$resep->banyaknya; 
		//echo $menucost;
		}
	
	$menu  = $redbean->load("menu",$id);
	$menu->cost = $menucost;
	$redbean->store($menu);
	}
	
function getMenuCost($data){
	require("inc/init.php");
	$menu = $redbean->load("menu", $data->{'id'});
	echo json_encode($menu);
	}
function editResep($data){
	require("inc/init.php");
	//$menu = $redbean->dispense("menu");
	$resep = $redbean->load("resep", $data->{'id'});
	//$pegawai->id = ;	
	$resep->banyaknya =$data->{'banyaknya'};
	$id	=	$redbean->store($resep);
	//setMenuCost($id);
	
	$query  = "select `id` from `resep` where menuid = '" . $resep->menuid. "'";
	$keys = $adapter->getCol($query);
	$menucost = 0;
	$semuaresep = $redbean->batch("resep", $keys);
	foreach($semuaresep as $resep){
		$bahan = $redbean->load("bahan", $resep->bahanid);
		$menucost +=$bahan->harga*$resep->banyaknya; 
		//echo $menucost;
		}
	
	$menu  = $redbean->load("menu",$resep->menuid);
	$menu->cost = $menucost;
	$redbean->store($menu);
	
	$return = array(
	'id'=>$id,
	'status' => 'sukses'
	);
	echo json_encode($return);
	}
function getPosisiKeuanganToday(){
	require("inc/init.php");
	$query = "select sum(`nominal`) as total from `keuangan` ";
	$today = "where `tanggal` like " . "'" . date('Y-m-d') . '%' . "'";
	//sementara dibekukan
	$query .= $today;
	$keys = $adapter->get($query);
	echo json_encode($keys);
	}
function getKeuanganToday(){
	require("inc/init.php");
	$query = "select id from `keuangan` ";
	$today = "where `tanggal` like " . "'" . date('Y-m-d') . '%' . "'";
	//sementara dibekukan
	$query .= $today;
		
	$keys = $adapter->getCol($query);
	$semuakeuangan = $redbean->batch("keuangan", $keys);
	echo json_encode($semuakeuangan);
	}
function getSettleByUserTotal($data){
	require("inc/init.php");
		$query = "SELECT `id`,`username` , SUM(`sesudah`) as total FROM `settle` WHERE ";
		if($data->{'username'}=="semua"){
			switch($data->{'date'}){
				case 'hari':
					$date = date('Y-m-d');
					$query .= "`completed` LIKE "."'%". $date ."%'";
				break;
				
				case 'minggu':
					$date = date('Y-m-d H:i:s');
					$okedeh = strtotime('-1 week');
					$date2 = date('Y-m-d H:i:s', $okedeh);
					$query .= "`completed` <= "."'". $date ."' AND `completed` >= '". $date2 ."'";
				break;
				
				case 'bulan':
					$date = date('Y-m-d H:i:s');
					$okedeh = strtotime('-1 month');
					$date2 = date('Y-m-d H:i:s', $okedeh);
					$query .= "`completed` <= "."'". $date ."' AND `completed` >= '". $date2 ."'";
				break;
				
				
				}
			$keys = $adapter->get($query);
				//$semuasettle = $redbean->batch("settle", $keys);
			echo json_encode($keys);
		}
	/*if($data == "all"){
		$query = "SELECT `username` , SUM( `sesudah` ) AS sesudah FROM `settle` GROUP BY `username`";
		$keys = $adapter->get($query);
		//$semuasettle = $redbean->batch("settle", $keys);
		echo json_encode($keys);
	}
	else{
		$query = "SELECT `username` , `tanggal`, `sesudah`, SUM( `sesudah` ) AS total FROM `settle` WHERE `username` = " . "'" . $data . "'";
		$keys = $adapter->get($query);
		//$semuasettle = $redbean->batch("settle", $keys);
		echo json_encode($keys);
		}*/
		
	}

/*function getSettleByUser($data){
	require("inc/init.php");
		$query = "SELECT `id`,`username` ,  `completed`,`sesudah` FROM `settle` WHERE ";
		if($data->{'username'}=="semua"){
			switch($data->{'date'}){
				case 'hari':
					$date = date('Y-m-d');
					$query .= "`completed` LIKE "."'%". $date ."%'";
				break;
				
				case 'minggu':
					$date = date('Y-m-d H:i:s');
					$okedeh = strtotime('-1 week');
					$date2 = date('Y-m-d H:i:s', $okedeh);
					$query .= "`completed` <= "."'". $date ."' AND `completed` >= '". $date2 ."'";
				break;
				
				case 'bulan':
					$date = date('Y-m-d H:i:s');
					$okedeh = strtotime('-1 month');
					$date2 = date('Y-m-d H:i:s', $okedeh);
					$query .= "`completed` <= "."'". $date ."' AND `completed` >= '". $date2 ."'";
				break;
				
				
				}
			$keys = $adapter->get($query);
				//$semuasettle = $redbean->batch("settle", $keys);
			echo json_encode($keys);
		}
	/*if($data == "all"){
		$query = "SELECT `username` , SUM( `sesudah` ) AS sesudah FROM `settle` GROUP BY `username`";
		$keys = $adapter->get($query);
		//$semuasettle = $redbean->batch("settle", $keys);
		echo json_encode($keys);
	}
	else{
		$query = "SELECT `username` , `tanggal`, `sesudah`, SUM( `sesudah` ) AS total FROM `settle` WHERE `username` = " . "'" . $data . "'";
		$keys = $adapter->get($query);
		//$semuasettle = $redbean->batch("settle", $keys);
		echo json_encode($keys);
		}*/
		
	//}
/*------------------------------------------------------- awal tambahan -------------------------------------------------------*/
	
function getAllGroup() {
	require("inc/init.php");	
	$query = "select distinct menu.group from `menu`"; 
	$menu = $adapter->get($query);		
	echo json_encode($menu);
}	

function getGroupByName($data) {
	require("inc/init.php");	
	$query = "select namamenu from `menu` where `group` LIKE '%". $data->{'group'} ."%'"; 
	$menu = $adapter->get($query);		
	echo json_encode($menu);
}	

function getSettleByUser($data){
	require("inc/init.php");
	//$query = "SELECT `id`,`username`,  `completed`,`sesudah` FROM `settle` WHERE "; 
	$date = $data->{'date_dari'} ." 00:00:00";		
	$date2 = $data->{'date_sampai'} . " 23:59:59";
	$q = "SELECT 
		ordermenu.menu as namamenu, 
		ordermenu.harga as harga, 
		sum(ordermenu.jumlah) as jumlah, 
		(sum(ordermenu.jumlah)*harga) as total  
		FROM `ordermenu`,`order` 
		where ordermenu.orderid = order.id 
		and order.status='completed' 
		and order.completed <= '" . $date2 . "' 
		and order.completed >= '" . $date . "'";
		if($data->{'username'}=="semua"){			
			// do nothing
		}
		else if($data->{'username'} != "semua"){
			// tambahkan filter username
			$q .= " AND order.username='". $data->{'username'} ."'";			
		}
		$q .= " group by namamenu order by namamenu asc";

	
		
	//$query .= "`completed` <= "."'". $date2 ." 23:59:59' AND `completed` >= '". $date ." 00:00:00'";
		
	
	
	$keys = $adapter->get($q);	//
	//echo $query;
	//echo $q;						
	echo json_encode($keys);
}

function getOrderMenuByName($data) {
	require("inc/init.php");
	$date = $data->{'date_dari'};		
	$date2 = $data->{'date_sampai'};
	$where = "order.completed <= "."'". $date2 ." 23:59:59' AND order.completed >= '". $date ." 00:00:00'";
	
	//select * from `ordermenu`,`order` where menu='Ayam Bakar 1/2' AND ordermenu.orderid=order.id AND order.completed <= '2010-01-01 23:59:59' AND order.completed >= '2010-01-01 00:00:00'

	$query = "select * from `ordermenu`,`order` where menu='". $data->{'menu'} ."' AND ordermenu.orderid=order.id AND ". $where;
	//echo $query;
	$keys = $adapter->get($query);	//echo $query;						
	echo json_encode($keys);
}	
	
	/*------------------------------------------------------- akhir tambahan ---------------------------------------------------*/
	
function newResep($data){
	require("inc/init.php");
	//$menu = $redbean->dispense("menu");	
	$resep->menuid = $data->{'menuid'};
	$resep->bahanid = $data->{'bahanid'};
	$resep->banyaknya = $data->{'banyaknya'};
	$resep->namamenu = $data->{'namamenu'};
	$resep->namabahan = $data->{'namabahan'};
	$id	=	$redbean->store($resep);
	//
	//
	//
	$query  = "select `id` from `resep` where menuid = '" . $resep->menuid . "'";
	$keys = $adapter->getCol($query);
	$menucost = 0;
	$semuaresep = $redbean->batch("resep", $keys);
	foreach($semuaresep as $resep){
		$bahan = $redbean->load("bahan", $resep->bahanid);
		$menucost +=$bahan->harga*$resep->banyaknya; 
		//echo $menucost;
		}
	
	$menu  = $redbean->load("menu",$resep->menuid);
	$menu->cost = $menucost;
	$redbean->store($menu);
	$return = array(
	'id'=>$id,
	'status' => 'sukses'
	);
	echo json_encode($return);
	}		

function getResepByMenuID($data){
		require("inc/init.php");
		$menuid = $data;
		$query = "select id from `resep` where `menuid` = '" . json_encode($menuid) . "'";
		$keys = $adapter->getCol($query);
		$semuaresep = $redbean->batch("resep", $keys);
		echo json_encode($semuaresep);
	}
function editStock($data){
	require("inc/init.php");
	//$menu = $redbean->dispense("menu");
	$bahan = $redbean->load("bahan", $data->{'id'});
	//$pegawai->id = ;	
	$bahan->stock =$data->{'stock'};
	$id	=	$redbean->store($bahan);
	
	$stockhistory->username = $_SESSION['username'];
	$stockhistory->action = "edit";
	$stockhistory->bahanid = $bahan->id;
	$stockhistory->value = $data->{'stock'};
	$stockhistory->tanggal = date('Y-m-d H:i:s');
	$id = $redbean->store($stockhistory);
	
	$return = array(
	'id'=>$id,
	'status' => 'sukses'
	);
	echo json_encode($return);
	}
	
function addStock($data){
	require("inc/init.php");
	//$menu = $redbean->dispense("menu");
	$bahan = $redbean->load("bahan", $data->{'id'});
	//$pegawai->id = ;	
	$bahan->stock +=$data->{'stock'};
	
	$redbean->store($bahan);
	
	//register history
	$stockhistory->username = $_SESSION['username'];
	$stockhistory->action = "tambah";
	$stockhistory->bahanid = $bahan->id;
	$stockhistory->value = $data->{'stock'};
	$stockhistory->tanggal = date('Y-m-d H:i:s');
	$id = $redbean->store($stockhistory);
	
	$return = array(
	'id'=>$id,
	'status' => 'sukses'
	);
	echo json_encode($return);
	}
//Awal Kodingan RObert
function getAllPayout(){
	require("inc/init.php");	
	$query = "select * from `payout` ";
	$today = "where payout.open like " . "'" . date('Y-m-d') . '%' . "'";
	//sementara dibekukan
	$query .= $today;
	$keys = $adapter->getCol($query);		
	$payout = $redbean->batch("payout", $keys);
	echo json_encode($payout);
    
	}
function newPayout($data){
	require("inc/init.php");
	//$menu = $redbean->dispense("menu");	
	$payout->jumlah = $data->{'jumlah'};
	$payout->keterangan = $data->{'keterangan'};
	$payout->open = date('Y-m-d H:i:s');
	$id	=	$redbean->store($payout);
	
	//keuangan
	$keuangan->tanggal = $payout->open;
	$keuangan->jenis = "payout";
	$keuangan->nominal = "-" . $data->{'jumlah'};
	$keuangan->username =  $_SESSION['username'];
	$keuangan->remark = $payout->keterangan;
	
	$id2 = $redbean->store($keuangan);	
	$return = array(
	'id'=>$id,
	'status' => 'sukses'
	);
	echo json_encode($return);
	}	
	
function editPayout($data){
	require("inc/init.php");
	//$menu = $redbean->dispense("menu");
	$payout->id = $data{'id'};
	$payout->jumlah = $data->{'jumlah'};
	$payout->keterangan = $data->{'keterangan'};
	$payout->open = date('Y-m-d H:i:s');
	$id	=	$redbean->store($payout);
	$return = array(
	'id'=>$id,
	'status' => 'sukses'
	);
	echo json_encode($return);
	}
	
	
function getAllKaryawan(){
	require("inc/init.php");	
	$query = "select * from `pegawai` order by username ASC";
	$keys = $adapter->getCol($query);		
	$karyawan = $redbean->batch("pegawai", $keys);
	echo json_encode($karyawan);
    
	}
function newKaryawan($data){
	require("inc/init.php");
	//$menu = $redbean->dispense("menu");	
	$pegawai->username = $data->{'username'};
	$pegawai->password = md5($data->{'password'});
	$pegawai->role = $data->{'role'};
	$pegawai->gajipokok =$data->{'gajipokok'};
	$pegawai->gajilain2 =$data->{'gajilain2'};
	$pegawai->bonuskehadiran =$data->{'bonuskehadiran'};
	$pegawai->tambahanjabatan =$data->{'tambahanjabatan'};
	$id	=	$redbean->store($pegawai);
	$return = array(
	'id'=>$id,
	'status' => 'sukses'
	);
	echo json_encode($return);
	}
	
function editKaryawan($data){
	require("inc/init.php");
	//$menu = $redbean->dispense("menu");
	$pegawai = $redbean->load("pegawai", $data->{'id'});
	//$pegawai->id = $data->{'id'};	
	$pegawai->username = $data->{'username'};
	$pegawai->password = md5($data->{'password'});
	$pegawai->role = $data->{'role'};
	$pegawai->gajipokok =$data->{'gajipokok'};
	$pegawai->gajilain2 =$data->{'gajilain2'};
	$pegawai->bonuskehadiran =$data->{'bonuskehadiran'};
	$pegawai->tambahanjabatan =$data->{'tambahanjabatan'};
	$id	=	$redbean->store($pegawai);
	$return = array(
	'id'=>$id,
	'status' => 'sukses'
	);
	echo json_encode($return);
	}
function deleteKaryawan($data){
	require("inc/init.php");
	//$menu = $redbean->dispense("menu");
	
	$pegawai = $redbean->load('pegawai',$data->{'id'});

	$id = $redbean->trash($pegawai);
	$return = array(
	'id'=>$id,
	'status' => 'sukses'
	);
	echo json_encode($return);
	}

//Ahir Kodingan Robert

function getAllStock(){
	require("inc/init.php");	
	$query = "select id from `bahan` order by nama ASC";
	$keys = $adapter->getCol($query);		
	$bahan = $redbean->batch("bahan", $keys);
	echo json_encode($bahan);
	}
//hapusBahan
function hapusBahan($data){
	require("inc/init.php");
	$bahan->id = $data->{'id'};	
	$bahan->nama = $data->{'nama'};
	$bahan->satuan = $data->{'satuan'};
	$bahan->group = $data->{'group'};
	$bahan->harga = $data->{'harga'};
	$id	=	$redbean->trash($bahan);
	$return = array(
	'id'=>$id,
	'status' => 'sukses'
	);
	echo json_encode($return);
	}

function editBahan($data){
	require("inc/init.php");
	$bahan = $redbean->load("bahan", $data->{'id'});
	//$bahan->id = $data->{'id'};	
	$bahan->nama = $data->{'nama'};
	$bahan->group = $data->{'group'};
	$bahan->satuan = $data->{'satuan'};
	$bahan->harga = $data->{'harga'};
	$redbean->store($bahan);
	$return = array(
	'status' => 'sukses'
	);
	echo json_encode($return);
	}

function getAllBahan(){
	require("inc/init.php");	
	$query = "select id from `bahan` order by nama ASC";
	$keys = $adapter->getCol($query);		
	$bahan = $redbean->batch("bahan", $keys);
	echo json_encode($bahan);
	}

function newBahan($data){
	require("inc/init.php");
	$bahan->nama = $data->{'nama'};
	$bahan->group = $data->{'group'};
	$bahan->satuan = $data->{'satuan'};
	$bahan->harga = $data->{'harga'};
	$id = $redbean->store($bahan);
	if($id){
		$return = array(
			'id'=>$id,
			'status'=> 'sukses'
		);
		echo json_encode($return);
		}
	else{
		echo json_encode(array('status'=>'gagal'));
		}
	}
	
function newSettle($data){
	require("inc/init.php");
	//$menu = $redbean->dispense("menu");
		//orderid, discount,ppn, discounttype ,uang, kembalian,hargasebelumdiscountdanppn, hargasetelahdiscountdanppn
	$settle->orderid = $data->{'orderid'};
	$settle->discount = $data->{'discount'};
	$settle->ppn = $data->{'ppn'};
	$settle->discounttype = $data->{'type'};
	$settle->uang = $data->{'uang'};
	$settle->kembalian = $data->{'kembalian'};
	$settle->sebelum = $data->{'hargasebelumdiscountdanppn'};
	$settle->sesudah = $data->{'hargasetelahdiscountdanppn'};
	$settle->username = $_SESSION['username'];
	
	$date = date('Y-m-d H:i:s');
	$settle->completed = $date;
	$id = $redbean->store($settle);	
	
		//$order = $redbean->dispense("order");
	//begin update
	$orderid = $data->{'orderid'};
	$adapter->exec( "update `order` set `completed`='" . $date . "', `status`='completed' where id=" . $orderid );
	
			//cascade update stock - rizky
		$all_ordermenu = $adapter->get("select * from ordermenu where orderid = " . $orderid );
		
		
		foreach ($all_ordermenu as $ordermenu) {
			$all_resep = $adapter->get("select * from resep where namamenu = '" . $ordermenu['menu'] . "'");
		
			foreach ($all_resep as $resep) {
				$bahan = $redbean->load("bahan",$resep['bahanid']);
				$bahan->stock = $bahan->stock - ($resep['banyaknya'] * $ordermenu['jumlah']);
				$redbean->store($bahan);
			}
		}
	
	//keuangan
	$keuangan->tanggal = $date;
	$keuangan->jenis = "settle";
	$keuangan->nominal = $data->{'hargasetelahdiscountdanppn'};
	$keuangan->username =  $_SESSION['username'];
	$keuangan->invoice = $data->{'orderid'};
	$id2 = $redbean->store($keuangan);	
	$return = array(
		'id'=>$id,
		'status' => 'sukses'
	);
	echo json_encode($return);
	}

		

function deleteMenu($data){
	require("inc/init.php");
	//$menu = $redbean->dispense("menu");
	$menu->id = $data->{'id'};	
	$menu->namamenu = $data->{'namamenu'};
	$menu->harga = $data->{'harga'};
	$menu->group = $data->{'group'};
	$id	=	$redbean->trash($menu);
	$return = array(
	'id'=>$id,
	'status' => 'sukses'
	);
	echo json_encode($return);
	}

function editMenu($data){
	require("inc/init.php");
	//$menu = $redbean->dispense("menu");
	$menu->id = $data->{'id'};	
	$menu->namamenu = $data->{'namamenu'};
	$menu->harga = $data->{'harga'};
	$menu->group = $data->{'group'};
	$menu->discount = $data->{'discount'};
	$id	=	$redbean->store($menu);
	$return = array(
	'id'=>$id,
	'status' => 'sukses'
	);
	echo json_encode($return);
	}


function newMenu($data){
	require("inc/init.php");
	//$menu = $redbean->dispense("menu");	
	$menu->namamenu = $data->{'namamenu'};
	$menu->harga = $data->{'harga'};
	$menu->group = $data->{'group'};
	$id	=	$redbean->store($menu);
	$return = array(
	'id'=>$id,
	'status' => 'sukses'
	);
	echo json_encode($return);
	}
function getAllMenu(){
	require("inc/init.php");	
	$query = "select id from `menu` order by namamenu ASC";
	$keys = $adapter->getCol($query);		
	$menu = $redbean->batch("menu", $keys);
	echo json_encode($menu);

	}
function editorderrecall($data){
	require("inc/init.php");	
	$menu = $data->{'menu'};
	$harga = $data->{'harga'};
	$jumlah = $data->{'jumlah'};
	$remark = $data->{'remark'};
	$orderid = $data->{'id'};
	//store the menus
	$query = "select id from `ordermenu` where ordermenu.orderid = '" . $orderid . "'";
	$keys = $adapter->getCol($query);
	$semuaordermenu = $redbean->batch("ordermenu", $keys);
	
	foreach($semuaordermenu as $bean){
		//$redbean->trash($bean);
		}
	//echo json_encode($semuaordermenu);
	
	
	for($i=0;$i<count($menu);$i++){
		$ordermenu = $redbean->dispense("ordermenu");
		$ordermenu->orderid=$orderid;
		$ordermenu->menu = $menu[$i];
		$ordermenu->jumlah = $jumlah[$i];
		$ordermenu->harga = $harga[$i];
		$ordermenu->remark = $remark[$i];
		$ordermenuid = $redbean->store($ordermenu);
		}
	
	$return = array(
		'data'=>$orderid,
		'status' => 'sukses'
	);
	echo json_encode($return);
	}

function getOrderByID($orderid){
	require("inc/init.php");
	$query = "select id from `order` where order.id = '" . $orderid . "'";
	$keys = $adapter->getCol($query);
	$semuaorder = $redbean->batch("order", $keys);
	echo json_encode($semuaorder);
	}

function getMenuByOrderID($orderid){
	require("inc/init.php");
	$query = "select id from `ordermenu` where ordermenu.orderid = '" . $orderid . "'";
	$keys = $adapter->getCol($query);
	$semuaordermenu = $redbean->batch("ordermenu", $keys);
	echo json_encode($semuaordermenu);

	}

function getopenorder(){
	require("inc/init.php");
	$query = "select id from `order` where order.status = 'open'";
	$keys = $adapter->getCol($query);
	$semuaorder = $redbean->batch("order", $keys);
	echo json_encode($semuaorder);

	}

function getpegawai(){
	require("inc/init.php");
	$query = "select id, username, role from pegawai";
	$keys = $adapter->getCol($query);
	$semuapegawai = $redbean->batch("pegawai", $keys);
	echo json_encode($semuapegawai);

	}
function recall($jum){
	require("inc/init.php");
	$status = $jum->{'status'};
	$ordertype = $jum->{'ordertype'};
	$query = "select id from `order`";
	switch($status){
		case "recall-open":
			$query .= " where order.status=". "'open' "; 
		break;
		case "recall-semua":
			$query .= " where order.status like " . "'" . '%%' . "' " ;
		break;
		}
		
	switch($ordertype){
		case "semuatransaksi":
			$query .= "and order.ordertype like " .  "'" . '%%' . "' ";
		break;
		default:
			$query .= "and order.ordertype=" . "'" . $ordertype . "'";
		break;
		}
	$today = "and order.open like " . "'" . date('Y-m-d') . '%' . "'";
	//sementara dibekukan
	$query .= $today;
		
	$keys = $adapter->getCol($query);
	$semuaorder = $redbean->batch("order", $keys);
	echo json_encode($semuaorder);

	/*$return = array(
		'data' => $query
	);
	echo json_encode($return);*/
	}
function orderbaru($data, $username){
	require("inc/init.php");
	$order->ordertype = $data->{'ordertype'};
	$order->username = $username;
	$order->open = date('Y-m-d H:i:s');
	$order->completed = '';
	$order->delivery = $data->{'delivery'};
	$order->namameja = $data->{'namameja'};
	$order->status = "open";
	$order->jumlahtamu = $data->{'jumlahtamu'};
	$order->printstatus = $data->{'printstatus'};
	$id = $redbean->store($order);
	
	$menu = $data->{'menu'};
	$harga = $data->{'harga'};
	$jumlah = $data->{'jumlah'};
	$remark = $data->{'remark'};
	//store the menus
	for($i=0;$i<count($menu);$i++){
		$ordermenu = $redbean->dispense("ordermenu");
		$ordermenu->orderid=$id;
		$ordermenu->menu = $menu[$i];
		$ordermenu->jumlah = $jumlah[$i];
		$ordermenu->harga = $harga[$i];
		$ordermenu->remark = $remark[$i];
		$ordermenuid = $redbean->store($ordermenu);
		}
	
	$return = array(
		'data'=>$id,
		'status' => 'sukses'
	);
	echo json_encode($return);
	}
function cashierin($data, $total, $username){
	require("inc/init.php");
	$cashierin->sd_100rb = $data->{'sd_100rb'};
	$cashierin->sd_50rb = $data->{'sd_50rb'};
	$cashierin->sd_20rb = $data->{'sd_20rb'};
	$cashierin->sd_10rb = $data->{'sd_10rb'};
	$cashierin->sd_5rb = $data->{'sd_5rb'};
	$cashierin->sd_1rb = $data->{'sd_1rb'};
	$cashierin->sd_500 = $data->{'sd_500'};
	$cashierin->sd_200 = $data->{'sd_200'};
	$cashierin->sd_100 = $data->{'sd_100'};
	$cashierin->sd_50 = $data->{'sd_50'};
	$cashierin->total = $total;
	$cashierin->username = $username;
	$cashierin->time = date('Y-m-d H:i:s');
	$id = $redbean->store($cashierin);
	
	//keuangan
	$keuangan->tanggal = date('Y-m-d H:i:s');
	$keuangan->jenis = "cashierin";
	$keuangan->nominal = $total;
	$keuangan->username =  $_SESSION['username'];
	$id2 = $redbean->store($keuangan);	
	$return = array(
		'data'=>$id,
		'status' => 'sukses'
	);
	echo json_encode($return);
	}
function cashierout($data, $total, $username){
	require("inc/init.php");
	$cashierout->sd_100rb = $data->{'sd_100rb'};
	$cashierout->sd_50rb = $data->{'sd_50rb'};
	$cashierout->sd_20rb = $data->{'sd_20rb'};
	$cashierout->sd_10rb = $data->{'sd_10rb'};
	$cashierout->sd_5rb = $data->{'sd_5rb'};
	$cashierout->sd_1rb = $data->{'sd_1rb'};
	$cashierout->sd_500 = $data->{'sd_500'};
	$cashierout->sd_200 = $data->{'sd_200'};
	$cashierout->sd_100 = $data->{'sd_100'};
	$cashierout->sd_50 = $data->{'sd_50'};
	$cashierout->total = $total;
	$cashierout->username = $username;
	$cashierout->time = date('Y-m-d H:i:s');
	$id = $redbean->store($cashierout);
	//keuangan
	$keuangan->tanggal = date('Y-m-d H:i:s');
	$keuangan->jenis = "cashierout";
	$keuangan->nominal = '-'.$total;
	$keuangan->username =  $_SESSION['username'];
	$id2 = $redbean->store($keuangan);	
	
	$return = array(
		'data'=>$id,
		'status' => 'sukses'
	);
	echo json_encode($return);
	}

function getmenu($group){
	require("inc/init.php");
	$keys = $adapter->getCol("select id from menu where menu.group = '" . $group . "'");
	$semuamenu = $redbean->batch("menu", $keys);
	echo json_encode($semuamenu);
	}
function getgroup(){
	require("inc/init.php");
	$keys = $adapter->getCol("select distinct menu.group from menu");
	//$semuamenu = $redbean->batch("menu", $keys);
	echo json_encode($keys);
	}

function dinein($dinein){
	echo $dinein;
	}


function getmeja(){
	require("inc/init.php");
	$keys = $adapter->getCol("SELECT distinct group from meja"); 
	//$semuameja = $redbean->batch("meja", $keys); 
	echo json_encode($keys);
	}

function login($username, $password){
	require("inc/init.php");
	if(isset($username)&&isset($password)&&!isset($_SESSION['username'])){
		/*$oke = array(
			'status' => "oke"
		);
		echo json_encode($oke);*/
		//echo "select * from pegawai where username = " . $username . " limit 1";
		$database = $adapter->getRow("select * from pegawai where username = '" . $username . "' limit 1"); 
		//$pegawai1 = $redbean->batch("pegawai", $database);
		$pegawai = $redbean->load("pegawai",$database['id']); 
		if(strcmp($username,$pegawai->username)==0){
			if(strcmp(md5($password),$pegawai->password)==0){
				//echo json_encode($pegawai);
				$_SESSION['username'] = $pegawai->username;
				$_SESSION['role'] = $pegawai->role;
				$return = array(
					'username' => $pegawai->username,
					'role'	=> $pegawai->role,
					'loginstatus' => 'sukses'
				);
				echo json_encode($return);
				}
			else{
				$return = array(
					'loginstatus' => 'salah password'
				);
				echo json_encode($return);
				}
			}
		else{
			$return = array(
			'loginstatus' => 'user tidak ditemukan'
			);
			echo json_encode($return);
			}
		//print_r($pegawai);
		/*if () */
		//echo json_encode($pegawai);
		//let's authenticate the user
		/*$suka = json_encode(array(
			'username' => $username,
			'password' => $password
			));
		echo $suka;*/
		
		}
	else{
		$return = array(
					'username' => $_SESSION['username'],
					'role'	=> $_SESSION['role'],
					'loginstatus' => 'user telah login'
				);
				echo json_encode($return);
		}
		
}//end of login function

function logout(){
	session_unset();
	session_destroy();
	$return = array(
					'loginstatus' => 'logout'
				);
	echo json_encode($return);

	}
	
?>