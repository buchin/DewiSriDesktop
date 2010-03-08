<?php require("template.php"); ds_header(); ?>
<?php require("init.php")?>
<script>
$(document).ready(function() {
	/**************************** Number Input *******************************/
	function number_input($text_element,$number_element) {
		$number_element.find('.number_input').click(function() { 
			var pressed = $(this).attr('class').split(' ')[1];
			
			if (pressed != "number_submit")
			$text_element.text($text_element.text() + pressed);
		});
		$number_element.find(".number_submit").click(function() { 
			if ($text_element.text() != "")
				$number_element.hide();
		})
	}
	
	/* buchin */
	//pda repeat order tambahan
	function pesanan_baru(){
		$("#index_container").hide();
		$("#meja_container").show();
	}
	
	$("#pesan_btn").click(function(){
		$("#s_jenis_pesanan").val("baru");
		//alert($("#s_jenis_pesanan").val());
		pesanan_baru();
	});
	
	$("#repeat_btn").click(function(){
		//alert("baru");
		$("#s_jenis_pesanan").val("repeat");
		//alert($("#s_jenis_pesanan").val());
		pesanan_baru();
	});
	
	$("#status_pembayaran_btn").click(function(){
		window.location.replace("status.php");
	})
	
	/* end buchin */
	
	/***************************** Meja ********************************/
	function hide_semua_meja() {
		$("#meja_lesehan_btn").hide();
		$("#meja_pendopo_btn").hide();
		$("#meja_vip_btn").hide();
	}
	
	$("#meja_lesehan_btn").click(function() {
		$("#meja_pendopo_container").hide();
		$("#meja_lesehan_container").show();
		hide_semua_meja();
		$("#meja_lesehan_btn").show();		
	});
	
	$("#meja_pendopo_btn").click(function() {
		$("#meja_pendopo_container").show();
		$("#meja_lesehan_container").hide();
		hide_semua_meja();
		$("#meja_pendopo_btn").show();
	});	
	
	$("#meja_vip_btn").click(function() {	
		hide_semua_meja();
		$("#meja_vip_btn").show();
		$("#jumlahtamu_container").show();
	});
	
	$("#meja_pendopo_container .meja_item").click(function() {	
		$("#meja_pendopo_container").hide();
		$("#meja_pendopo_btn").val('Pendopo - ' + $(this).val());
		$("#pilih_ulang_meja").show();
		$("#jumlahtamu_container").show();
	});
	
	$("#meja_lesehan_container .meja_item").click(function() {	
		$("#meja_lesehan_container").hide();
		$("#meja_lesehan_btn").val('Lesehan - ' + $(this).val());
		$("#pilih_ulang_meja").show();
		$("#jumlahtamu_container").show();
	});
	
	$("#pilih_ulang_meja").click(function() {
		$("#meja_pendopo_container").hide();
		$("#meja_lesehan_container").hide();
		$("#meja_lesehan_btn").val('Lesehan').show();
		$("#meja_pendopo_btn").val('Pendopo').show();
		$("#meja_vip_btn").show();
	});
	
	
	/***************************** Jumlah Tamu ********************************/
	$("#clear_jumlah_tamu").click(function() {
		$("#jumlahtamu_text").text('');
	});
	
	$("#jumlahtamu_text").click(function () {
		$("#jumlahtamu_input").show();
	});
	number_input($("#jumlahtamu_text"),$("#jumlahtamu_input"));
	
	$("#jumlahtamu_container .number_submit").click(function() {
		if ($("#jumlahtamu_text").text() != "")
		$("#selesai_container,#pesanan_container").show();
	});
	
	/***************************** Pesanan ************************************/
	
	$(".tambah_pesanan_btn").click(function() {
		$(this).hide();
		$(".daftar_menu").show();
		$(".menu_group").show();
		$(".menu_item_container").hide();
		$("#selesai_container").hide();
		$("#meja_container").hide();
		$("#jumlahtamu_container").hide();
		$(".pesanan").hide();
	});
	
	var selected_menu_name = "";
	var selected_menu_id = "";
	var selected_menu_jumlah = 0;
	var selected_menu_remark = "";
	
	$(".menu_item").click(function() {
		$(".daftar_menu").hide();
		$(".jumlah_menu").show();
		$("#jumlahmenu_input").show();
		 $("#jumlahmenu_text").text('');
		selected_menu_name = $(this).val();
		selected_menu_id = $(this).attr('id').split('-')[1];
		$(".pesanan_remark").val('');
	});
	
	$(".jumlah_menu .number_submit").click(function() {
		if ($("#jumlahmenu_text").text() != "") {
			$(".jumlah_menu").hide();
			$(".pesanan").show();
			$(".tambah_pesanan_btn").show();
			$("#selesai_container").show();
			$("#meja_container").show();
			$("#jumlahtamu_container").show();
			selected_menu_jumlah = $("#jumlahmenu_text").text();
			selected_menu_remark = $(".pesanan_remark").val();
			add_menu_item(selected_menu_id,selected_menu_name,selected_menu_jumlah,selected_menu_remark);
		}
	});
		
	function add_menu_item(id,name,jumlah,remark) {
		
		var remark_tag = "";
		if (remark != "") remark_tag = "<div class='pesanan_desc_remark'>Remark: " + remark + "</div>";
			
		var $insert = $('<div class="pesanan" id="pesanan-' + id + '"> <div class="pesanan_desc"> <b>' + name +'</b><br> Jumlah: ' + jumlah +'</div><input type="button" class="pesanan_hapus" value="X" /> ' + remark_tag + ' <div style="clear:both"></div> </div>');
					
		$insert.insertBefore('#pesanan_container .tambah_pesanan');
	}
	
	$(".pesanan_hapus").live('click',function() {
		$(this).parent().remove();
	});
	
	$(".cancel_menu").live('click',function(){
	
		$(".daftar_menu").hide();
		$(".menu_group").hide();
		$(".jumlah_menu").hide();
		$(".pesanan").show();
		$(".tambah_pesanan_btn").show();
		$("#selesai_container").show();
		$("#meja_container").show();
		$("#jumlahtamu_container").show();
	});
	
	$("#clear_jumlah_menu").click(function() {
		$("#jumlahmenu_text").text('');
	});
	
	$(".menu_group").click(function() {
		$(".menu_group").hide();
		$("#menugroup-" + $(this).val()).show();
	});
	
	number_input($("#jumlahmenu_text"),$("#jumlahmenu_input"));
	
	/************************ parsing ***************************/
	
	$("#form_simpan").submit(function () {
		/*** meja ***/
		var meja_count = 0;
		var jenis_meja = "";
		var nomor_meja = "";
		$.each($(".meja"),function() {
			if ($(this).css("display") != "none") {
				meja_count = meja_count + 1;
				jenis_meja = $(this).val().split("-")[0];
				nomor_meja = $(this).val().split("-")[1];
				
				if (jenis_meja == "VIP") 
					nomor_meja = "VIP";
			}
		})
		
		if (meja_count > 1) {
			alert("Pilih meja pesanan dan nomor meja terlebih dahulu !");
			return false;
		}
		else if (nomor_meja == "") {	
			alert("Pilih meja pesanan dan nomor meja terlebih dahulu !");
			return false;
		}
		
		$("#s_jenis_meja").val(jenis_meja);
		$("#s_nomor_meja").val(nomor_meja);
		
		/*** jumlah tamu ***/
		$("#s_jumlah_tamu").val($("#jumlahtamu_text").text());
		
		/*** pesanan ***/
		
		var pesanan = "";
		$.each($(".pesanan"),function() {
		
			var jumlah = $.trim($(this).text().split(":")[1]).replace(" Remark","");
			var remark = $.trim($(this).text().split(":")[2]);

			pesanan = pesanan + $(this).attr("id").split("-")[1] + "-" + jumlah + "-" + remark + "|";
		});
		pesanan = pesanan.substr(0,pesanan.length - 1);
		
		
		if (pesanan == "") {
			alert ("Tambah pesanan terlebih dahulu");
			return false;
		}
		$("#s_pesanan").val(pesanan);
		
		
	});
	
});
</script>
<?php ds_content(); ?>
<?php if ($_GET["sukses"] == "true"): ?>
	<h2>Status Pesanan:</h2>
	<p><?
	echo $_GET["pesan"];
	?></p>
	<hr>
<?php endif; ?>

<!--buchin-->
<div id="index_container" class="container">
	<div class="header">
		<h2 class="header_left">Pilih Aksi</h2>
		
		<div style="clear:both"></div>
	</div>
	<div class="content">
		<input id="pesan_btn" type="button" class="index" value="Pesan Baru" />
		<input id="repeat_btn" type="button" class="index" value="Pesanan Lama" />
		<input id="status_pembayaran_btn" type="button" class="index" value="Status Pembayaran" />
	</div>
	
</div>
<!-- end buchin -->

<div id="meja_container" class="container"  style="display:none">
	<div class="header">
		<h2 class="header_left">Meja</h2>
		<a class="repick" id="pilih_ulang_meja" href="#">Pilih Ulang Meja</a>
		<div style="clear:both"></div>
	</div>
	<div class="content">
		<input id="meja_lesehan_btn" type="button" class="meja" value="Lesehan" />
			<div id="meja_lesehan_container">
				<div class="header">
					<h2>Pilih Meja Lesehan</h2>
				</div>
				<input type="button" class="meja_item" value="1" />
				<input type="button" class="meja_item" value="2" />
				<input type="button" class="meja_item" value="3" />
				<input type="button" class="meja_item" value="4" />
				<input type="button" class="meja_item" value="5" />
				<input type="button" class="meja_item" value="6" />
				<input type="button" class="meja_item" value="7" />
				<input type="button" class="meja_item" value="8A" />
				<input type="button" class="meja_item" value="8B" />
				<input type="button" class="meja_item" value="9" />
				<input type="button" class="meja_item" value="10" />
				<input type="button" class="meja_item" value="11" />
				<input type="button" class="meja_item" value="12" />
				<input type="button" class="meja_item" value="13" />
				<input type="button" class="meja_item" value="14A" />
				<input type="button" class="meja_item" value="14B" />
			</div>
		<input id="meja_pendopo_btn" type="button" class="meja" value="Pendopo" />
			<div id="meja_pendopo_container">			
				<div class="header">
					<h2>Pilih Meja Pendopo</h2>
				</div>
				<input type="button" class="meja_item" value="15" />
				<input type="button" class="meja_item" value="16" />
				<input type="button" class="meja_item" value="17" />
				<input type="button" class="meja_item" value="18" />
				<input type="button" class="meja_item" value="19" />
				<input type="button" class="meja_item" value="20" />
				<input type="button" class="meja_item" value="21" />
				<input type="button" class="meja_item" value="22" />
				<input type="button" class="meja_item" value="23" />
				<input type="button" class="meja_item" value="24" />
				<input type="button" class="meja_item" value="25" />
				<input type="button" class="meja_item" value="26" />
				<input type="button" class="meja_item" value="27" />
				<input type="button" class="meja_item" value="28" />
			</div>
		<input id="meja_vip_btn" type="button" class="meja" value="VIP" />
	</div>
</div>
<div style="clear:both;"></div>
<div id="jumlahtamu_container" class="container" style="display:none">
	<hr>
	<div class="header">
		<h2 class="header_left">Jumlah Tamu</h2>
		<a class="repick" id="clear_jumlah_tamu" href="#jumlahtamu_container">Clear</a>
		<div style="clear:both"></div>
	</div>
	<div class="content">
		<div id="jumlahtamu_text" class="field"></div>
		<div id="jumlahtamu_input" class="number_input_container">
			<input type="button" class="number_input 1" value="1" />
			<input type="button" class="number_input 2" value="2" />
			<input type="button" class="number_input 3" value="3" />
			<input type="button" class="number_input 4" value="4" />
			<input type="button" class="number_input 5" value="5" />
			<input type="button" class="number_input 6" value="6" />
			<input type="button" class="number_input 7" value="7" />
			<input type="button" class="number_input 8" value="8" />
			<input type="button" class="number_input 9" value="9" />
			<input type="button" class="number_input 0" value="0" />
			<input type="button" class="number_input number_submit" value="Submit" />
			<div style="clear:both"><br></div>
		</div>
	</div>
</div>
<div style="clear:both"></div>
<div id="pesanan_container" class="container" style="display:none;">
	<hr>
	<div class="header">
		<h2>Pesanan</h2>
	</div>
	<div class="content">
		<div class="tambah_pesanan">
			<input class="tambah_pesanan_btn" type="button" value="Tambah Pesanan" />
			<div class="daftar_menu">
				<hr>
				<div class="header">
					<h2 class="header_left">Tambah Menu</h2>
					<input type="button" class="cancel_menu" value="X" />
					<div style="clear:both"></div>
				</div>
				<?php 
					$q = "select distinct menu.group from menu";
					$menus = $db->get($q);
					
					foreach ($menus as $menu) {
						echo '<input class="menu_group" type="button" id="menu-' . $menu['group'] .'" value="' . $menu['group'] .'" />' . "\n";
						echo '<div id="menugroup-' . $menu['group'] .'" class="menu_item_container">' . "\n";
						
						$q = "select * from menu where menu.group = '" . $menu['group'] . "'";
						$items = $db->get($q);
						
						foreach ($items as $item) {
							echo '<input class="menu_item" type="button" id="menu-' . $item['id'] .'" value="' . $item['namamenu'] .'" />' . "\n";
						}						
						
						echo '</div>';
					}
				?>
			</div>
			<div class="jumlah_menu">
				<hr>
				<div class="header">
					<h2 class="header_left">Jumlah Menu</h2>
					<input type="button" class="cancel_menu" value="X" />
					<a class="repick" id="clear_jumlah_menu" href="#jumlahmenu_text">Clear</a>
					<div style="clear:both"></div>
				</div>
				<div id="jumlahmenu_text" class="field"></div>
				<div id="jumlahmenu_input" class="number_input_container">
					<input type="button" class="number_input 1" value="1" />
					<input type="button" class="number_input 2" value="2" />
					<input type="button" class="number_input 3" value="3" />
					<input type="button" class="number_input 4" value="4" />
					<input type="button" class="number_input 5" value="5" />
					<input type="button" class="number_input 6" value="6" />
					<input type="button" class="number_input 7" value="7" />
					<input type="button" class="number_input 8" value="8" />
					<input type="button" class="number_input 9" value="9" />
					<input type="button" class="number_input 0" value="0" />
					<input type="button" class="number_input number_submit" value="Submit" />
					<div style="clear:both"><br></div>
				</div>
				<br>
				<h2>Remark</h2>
				<input class="pesanan_remark" type="text"/>
			</div>
		</div>
	</div>
</div>
<div style="clear:both"></div>
<div id="selesai_container" class="container" style="display:none;">
<hr>
	<div class="header">
		<h2>Selesai</h2>
	</div>
<br>	
<form id="form_simpan" method="post" action="server.php?mode=pesan">
	<input type="hidden" id="s_jenis_meja" name="jenis_meja" value="" />
	<input type="hidden" id="s_nomor_meja" name="nomor_meja" value="" />
	<input type="hidden" id="s_jumlah_tamu" name="jumlah_tamu" value="" />
	<input type="hidden" id="s_pesanan" name="pesanan" value="" />
	<input type="hidden" id="s_jenis_pesanan" name="jenis_pesanan" value="" />
	<input type="submit" id="s_simpan"  value="Simpan Pesanan" />
	
</form>		
<br><br><br><br><br><br><br><br><br>
</div>
<?php ds_footer(); ?>