<?php
/*
init.php
Redbean initializator
Mochammad Masbuchin
*/
require("RedBean/redbean.inc.php");
$toolbox = RedBean_Setup::kickstartDev( "mysql:host=localhost;dbname=restobean","root","" ); 
$redbean = $toolbox->getRedBean(); 
$pegawai = $redbean->dispense("pegawai");
$menu = $redbean->dispense("menu");
$cashierin = $redbean->dispense("cashierin");
$cashierout = $redbean->dispense("cashierout");
$order = $redbean->dispense("order");
$ordermenu = $redbean->dispense("ordermenu");
$settle = $redbean->dispense("settle");
$bahan = $redbean->dispense("bahan");
$stockhistory = $redbean->dispense("stockhistory");
$resep = $redbean->dispense("resep");
$keuangan  = $redbean->dispense("keuangan");
$payout = $redbean->dispense("payout");
$adapter = $toolbox->getDatabaseAdapter();



//$meja->import($lesehan, "namameja, jumlahkursi, status, lokasi");
/*$meja->import($pendopo, "namameja, jumlahkursi, status, lokasi");
print_r($meja);*/
?>