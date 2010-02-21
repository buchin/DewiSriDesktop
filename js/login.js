$(document).ready(function(){
	window.nativeWindow.stage.displayState = runtime.flash.display.StageDisplayState.FULL_SCREEN_INTERACTIVE;
	var win = window.nativeWindow;
	var url = "http://localhost/ajaxlogin.php";
	var menu = new Array();
	var nomorinput = new Array();
	var ordertype = "";
	var jumlahorder = "";
	var namameja = "";
	var harga = new Array();
	var total=0;
	var alamatdelivery = "";
	var setoranuang = new Object();
	var totalsetoranuang = 0;
	var cashier = "";
	var strJSON ="";
	var order = new Object();
	var recallperintah = "";
	var recallperintah2 = "";
	var recall = new Object();
	var dineinjumlahtamu = "";
	var dineinremark = "";
	var remark = new Array();
	var recalltambahmenuorderid = 0;
	var editorder = new Object();
	editorder.status = false;
	editorder.orderid = 0;
	var stockgroup = "";
	var bn = "#bo-bahan-";
	
	//clock();
	$.blockUI({ message: $('#formlogin') }); 
	$("#timer").jclock();
	//var d=new Date();
	//alert(d.toLocaleDateString());
	$("#datetimenow").html(showclock());
	
	$(".dialog").dialog();
	$(".dialog").dialog('close');
	//populate meja
	getmeja("lesehan");
	getmeja("pendopo");
	$("#loginbutton").click(function(){
		//dapatkan username dan password
		//var url = "http://localhost/ajaxlogin.php?username="+username+"&password="password;//"http://localhost/";
		var username = $("#username").val();
		var password = $('#password').val();
		var loginurl = url+"ajaxlogin.php";
		var dataJSON = "{" 
                    + "username:"+username+"," 
                    + "password:"+password+"" 
                	+ "}"; 
		$('#notausername').html("User: "+username);
		url = "http://localhost/ajaxlogin.php?username="+username+"&password="+password+"&cmd=login";
		////alert(url);
		/*url+="login.php?username=";
		url+=username;
		url+='&password=';
		url+=password;
		//alert(url);*/
		$.getJSON(url, dataJSON,function(data){
			////alert(data);
			////alert(data.username);
			////alert(data.role);
			////alert(data.loginstatus);
			$.blockUI('tunggu sebentar...');
			if(data.loginstatus == 'sukses' || data.loginstatus == 'user telah login'){
				$.blockUI('login berhasil');
				$.blockUI({ message: $('#menu') });
			}
			else{
				$('#username').val("");
				$('#password').val("");
				$.blockUI({message:$("#formlogin")});
				}
		});
	
	$("#exitprogram").click(function(){
		/*if(cashier!="out"){
			//alert("lakukan perhitungan cashier out/in sebelum keluar");
			}
		else{*/
			var url = "http://localhost/ajaxlogin.php?cmd=logout";
			$.getJSON(url,function(data){
			//$.blockUI(data.loginstatus);
			$.growlUI('Login Status', data.loginstatus);
			$.blockUI({message: $('#confirmclose') });
			});
		//}
		
										 
	});
	
	$('#confirmclose-ya').click(function(){
		win.close();
	});
	
	$('#confirmclose-no').click(function(){
		/*$('#username').val("");
		$('#password').val("");*/
		$("#superbakaback").trigger('click');
	});
	
	$('#dinein').click(function(){
			$('#layoutmejalesehan').show('normal');
		
			getmeja("lesehan");
			getmeja("pendopo");
			$.blockUI({message:$('#pilihmeja')});
			ordertype="dinein";
			$('#notaordertype').html("Ordertype: "+ ordertype);
	});
	
	$("#takehome").click(function(){
		ordertype="takehome";
		$('#notaordertype').html("Ordertype: "+ ordertype);
		$.unblockUI();						  
		$('#grupmakanan').show('slow');
		//populate group
		populateGroup();
		
	});
	
	
	$("#drivethru").click(function(){
		ordertype="drivethru";
		$('#notaordertype').html("Ordertype: "+ ordertype);
		$.unblockUI();						  
		$('#grupmakanan').show('slow');
		//populate group
		populateGroup();							 
	});
	
	$("#delivery").click(function(){
		ordertype="delivery";
		$('#notaordertype').html("Ordertype: "+ ordertype);
		$.unblockUI();						  
		//populate group
		populateGroup();
		$('#nota').hide();
		
		$.blockUI({message:$('#deliveryalamat')});
	});
	
	$("#deliveryalamat textarea").click(function(){
		$("#deliveryalamat textarea").val("");						  
	});
	
	$("#deliveryalamat button").click(function(){
		alamatdelivery = $("#deliveryalamat textarea").val();
		$.unblockUI();						  
		$('#grupmakanan').show('slow');
		//populate group
		populateGroup();			
		
	});
	
	
			// When a link is clicked
	$("#pilihmeja a.tab").click(function () {
		// switch all tabs off
		$(".active").removeClass("active");
		
		// switch this tab on
		$(this).addClass("active");
		
		// slide all content up
		$(".menustyle").slideUp();
		
		// slide this content up
		var content_show = $(this).attr("title");
		$("#meja"+content_show).slideDown();
		$("#layoutmejapendopo").hide('slow');
		$("#layoutmejalesehan").hide('slow');
		$("#layoutmeja"+content_show).show('slow');
		getmeja("lesehan");
		getmeja("pendopo");
	  
	});
	
	$(".menuutama").live("click", function(i,val){
		
		$("#layoutmejapendopo").hide('slow');
		$("#layoutmejalesehan").hide('slow');
		$("#menumakanan").hide('slow');
		$.blockUI({message:$("#menu")});
		$(".dialog").dialog('close');
		$("#resepresepok").hide();
		$('#grupmakanan').hide();
		//clear the variables
		ordertype = "";
		menu.length = 0;
		harga.length = 0;
		nomorinput.length = 0;
		namameja = "";
		alamatdelivery = "";
		dineinjumlahtamu = "";
		remark.length = 0;
		
		
		//clear nota
		$("#nota").hide();
		$("#nota table").html("");
		total = 0;
		$("#totalharga").html("total: Rp.0");
	});
	$('#pilihmeja .menustyle ul li a').click(function(){
		namameja = $(this).html();
		////alert("namameja:"+namameja);
		$.unblockUI();
		$("#layoutmejapendopo").hide('slow');
		$("#layoutmejalesehan").hide('slow');
		
		$.blockUI({message:$("#dinein-jumlahtamu"), css:{'width':'200px'}});
		
		
	});
	
	$('#dinein-jumlahtamu ul li a').click(function(){
		
		dineinjumlahtamu += $(this).html();
		$("#dinein-jumlahtamu-inputnomor").val(dineinjumlahtamu);
		
	});
	$('#dinein-jumlahtamu button[name="ok"]').click(function(){
		
		$("#dinein-jumlahtamu-inputnomor").val("");
		$.unblockUI();
		$('#grupmakanan').show();
		populateGroup();
	});
	
	$('#dinein-jumlahtamu button[name="reset"]').click(function(){
		dineinjumlahtamu = "";
		$("#dinein-jumlahtamu-inputnomor").val("");
	});
	
		/*var request = new air.URLRequest(loginurl); 
		request.contentType = "text/JSON"; 
		request.data = dataJSON; 
		request.method = air.URLRequestMethod.POST; 
		var loader = new air.URLLoader(); 
		loader.load(request);*/
	});
	
	$("#grupmakanan ul li a").live("click", function(){
		var group = $(this).html();
		////alert(group);
		$('#grupmakanan').hide('slow');
		$("#nota").hide();
		$('#menumakanan').show('slow');
		populatemenu(group);											 
	});
	
	$("#menumakanan ul li a").live("click",function(){
		menu[menu.length]=$(this).html();
		harga[harga.length]=$(this).attr("title");
		//menu+=":"
		jumlahorder="";
		//nomorinput.length = 0;
		$("#nomorinputinput").val("");
		$.blockUI({message: $("#inputnomor"), css:{'width':'200px'}});
		////alert(order);
		$('#menumakanan').hide();	
		$('#grupmakanan').hide();
		//populategroup();
	});
	
	$("#inputnomor ul li a").click(function(){
		jumlahorder += $(this).html();
		$("#nomorinputinput").val(jumlahorder);
	});
	
	$("#inputnomor button").click(function(){
		////alert(menu);
		nomorinput[nomorinput.length]=jumlahorder;
		//reset nomorinputinput dan nomorinput
		jumlahorder=""
		$("#nomorinputinput").val("");
		$.unblockUI();
		$.blockUI({message:$('#dinein-remark'), css:{'width': '35%'}});
	});
	
	$('#dinein-remark button[name="ok"]').click(function(){
		$.unblockUI();
		dineinremark = $('#dinein-remark-textarea').val();
		remark[remark.length] = dineinremark;
		dineinremark = "";
		total = 0;
		$("#nota table").html('<th>Nama Item</th>	<th>Qty</th> 	<th>harga</th>	<th>Jumlah</th>');
		for (i=0;i<menu.length;i++){
			////alert(menu[i]);
			////alert(nomorinput[i]);
			total += harga[i]*nomorinput[i];
			$("#nota table").append('<tr><td>'+menu[i]+'</td>'+'<td>'+nomorinput[i]+'</td>'+'<td>'+harga[i]+'</td>'+'<td>'+harga[i]*nomorinput[i]+'</td></tr>');
			}
		////alert(total);
		$("#totalharga").html("total: Rp."+total);
		total = 0;
		$('#grupmakanan').show();
		$('#nota').show();
		
		
	});
	 
	$('#kembaligroup').live("click", function(){
		$('#menumakanan').hide();	
		$('#grupmakanan').show();
		populategroup();
	});
	
	$("#printnota").click(function(){
		printThis("Nota Pesanan", 'css/print.css');	
		$("#selesaimemesan").trigger('click');
	});
	
	
	$("#recall").click(function(){
		////alert("recall");
		$.blockUI({message:$("#recalldetail")});
	});
	
	$("#recalldetail ul li a").click(function(){
		////alert($(this).attr("name"));
		recallperintah = $(this).attr("name");
		$.blockUI({message:$("#recall-open")});
		
	});
	
	$("#recall-open ul li a").click(function(){
		recallperintah2 = $(this).attr("name");
		recall.ordertype = recallperintah;
		recall.status = recallperintah2;
		strJSON = JSON.stringify(recall);
		////alert(strJSON);
		$.getJSON("http://localhost/ajaxlogin.php?cmd=recall", {data:strJSON}, function(data){
			////alert(JSON.stringify(data));
			
			$.blockUI({message:$("#recallgrid"), css:{width:'50%'}});	
			$("#recalltable").jqGrid({ 
				datatype: "local", 
				height: 250, 
				colNames:['ID','Order Type', 'Pegawai', 'Open','Completed','Delivery','Meja' ,'Status'], 
				colModel:[ 
						  {name:'id',index:'id', width:60, sorttype:"int"}, 
						  {name:'ordertype',index:'ordertype', width:50}, 
						  {name:'username',index:'username', width:80}, 
						  {name:'open',index:'open', width:130},
						  {name:'completed',index:'completed', width:80}, 
						  {name:'delivery',index:'delivery', width:100}, 
						  {name:'namameja',index:'namameja', width:50},
						  {name: 'status', index: 'status', width:80}
						  ], 
				multiselect: false, 
				caption: "Recall&amp;Settle",
				onSelectRow: function(id){
					////alert(id);
					//jquery jqgrid get row data by id
					var ret = $('#recalltable').jqGrid('getRowData',id);
					//test the return value
					////alert(JSON.stringify(ret));
					$('#recallordermenu h2 span').html(ret.id);
					recalltambahmenuorderid = ret.id;
					////alert(data.orderid);
					
					$.getJSON("http://localhost/ajaxlogin.php?cmd=getMenuByOrderID", {data:ret.id}, function(data){
						populateRecallMenu(data);
						$.blockUI({message:$('#recallordermenu')});
					});
				}
			}); 
			var oke = 0;
			$("#recalltable").clearGridData();
			$.each(data, function(i,val){
				////alert(JSON.stringify(val));
				$("#recalltable").jqGrid('addRowData', oke,val);
				oke++;
			});
			
		});
	});
	
	$('#recallordermenu button[name="kembalirecall"]').click(function(){
		$.blockUI({message:$('#recalldetail')});
	});
	
	$('#recallordermenu button[name="tambahmenu"]').click(function(){
		////alert(recalltambahmenuorderid);
		recallTambahMenu(recalltambahmenuorderid);
	});
	
	$('#recallordermenu button[name="hapusmenu"]').click(function(){
		////alert(recalltambahmenuorderid);
		var gr = $("#recallmenutable").jqGrid('getGridParam','selrow'); 
		if(gr!=null){
			var ret = $("#recallmenutable").jqGrid('getRowData',gr);
			
			$.getJSON("http://localhost/ajaxlogin.php?cmd=delOrderMenuByOrderID", {data:JSON.stringify(ret)}, function(data){
				//alert(JSON.stringify(data));
				$("#recall").trigger('click');
			});
			//$.blockUI({message:$("#editpegawaidialog"), css:{width:'20%'}});
			}
		//recallHapusMenu();
	});
	
	$('#recallordermenu button[name="settle"]').click(function(){
		$.blockUI({message:$('#settle-paymentprocessor'), css:{'width':'380px'}});
		$.getJSON("http://localhost/ajaxlogin.php?cmd=getMenuByOrderID",{data:recalltambahmenuorderid},function(data){
				////alert(JSON.stringify(data));	
				//fill the variables
				//clear variables
				menu.length = 0;
				harga.length = 0;
				nomorinput.length = 0;
				remark.length = 0;
				$.each(data, function(i,val){
					menu[menu.length] = val.menu;
					harga[harga.length] = val.harga;
					nomorinput[nomorinput.length] = val.jumlah;
					remark[remark.length] = val.remark;
				});
				$.getJSON("http://localhost/ajaxlogin.php?cmd=getOrderByID",{data:recalltambahmenuorderid},function(data){
					////alert(JSON.stringify(data));
					$.each(data, function(i,val){
						////alert(i+" "+val);	
						//<p id="notanamameja"></p>
					$('#notanamameja').html("Nama Meja: "+ val.namameja);
		//        <p id="notausername"></p>
					$('#notausername').html("User: "+ val.username);
					});
			
				});
				////alert(JSON.stringify(menu)+" " + JSON.stringify(harga)+" " + JSON.stringify(nomorinput)+" " + JSON.stringify(remark)+" ");
				fillNota(menu, harga, nomorinput);
			}); 
		$('#nota').show();
		
	});
	
	$('#settle-paymentprocessor ul li a').click(function(){
		var paymentoption = $(this).attr('name');
		switch(paymentoption){
			case 'cash':
				$.blockUI({message:$('#settle-payment-cash'), css:{'width':'300px'}});
			break;
			case 'debit':
				$.blockUI({message:$('#settle-payment-debit')});
			break;
			case 'cc':
				$.blockUI({message:$('#settle-payment-cc')});
			break;
			}
	});
	
	$('#settle-payment-cash p input[name="ppn"]').keyup(function(){
			var harga = $("#totalharga").html();
			harga = harga.substring(10);
			harga = parseInt(harga);
			var hargadisc = harga;
			var nilaiPPN = $(this).val();
			hargadisc = hargadisc+(parseInt(nilaiPPN)*hargadisc/100);	
			var nilaidisc = $('#settle-payment-cash p input[name="presentaseval"]').val();
			hargadisc = parseInt(hargadisc)-(parseInt(hargadisc)*parseInt(nilaidisc)/100);
			$('#settle-payment-cash p input[name="hargadisc"]').val(hargadisc);
			
	});
	
	$('#settle-payment-cash p select').change(function(){
			var option  = $(this).val();
			//lert(option);
			var harga = $("#totalharga").html();
			harga = harga.substring(10);
			harga = parseInt(harga);
			var hargadisc = harga;
			var nilaiPPN = $('#settle-payment-cash p input[name="ppn"]').val();
			hargadisc = hargadisc+(parseInt(nilaiPPN)*hargadisc/100);
			////alert(hargadisc);
			//var nilaiPPN = $('#settle-payment-cash p input[name="ppn"]').val();
			
			switch(option){
				case 'nodiscount':
					$('#settle-payment-cash p input[name="presentaseval"]').val('0');
					$('#presentasehid').slideUp('normal');
					$('#itemhid').slideUp('normal');
				break;
				case 'presentase':
					$('#settle-payment-cash p input[name="presentaseval"]').val('10');
					$('#presentasehid').slideDown('normal');
					var nilaidisc = $('#settle-payment-cash p input[name="presentaseval"]').val();
					////alert(nilaidisc);
					
					////alert(harga);
					$('#itemhid').slideUp('normal');
					hargadisc = parseInt(hargadisc)-(parseInt(hargadisc)*parseInt(nilaidisc)/100);
					
					////alert(hargadisc);
				break;
				case 'compliment':
					$('#presentasehid').slideUp('normal');
					$('#itemhid').slideUp('normal');
					$('#settle-payment-cash p input[name="presentaseval"]').val('100');
					$('#settle-payment-cash p input[name="uang"]').val();
					$('#settle-payment-cash p input[name="kembalian"]').val();
					var harga = $("#totalharga").html();
					harga = harga.substring(10);
					harga = parseInt(harga);
					var hargadisc = harga;
					var nilaiPPN = $('#settle-payment-cash p input[name="ppn"]').val();
					hargadisc = hargadisc+(parseInt(nilaiPPN)*hargadisc/100);	
					var nilaidisc = $('#settle-payment-cash p input[name="presentaseval"]').val();
					hargadisc = parseInt(hargadisc)-(parseInt(hargadisc)*parseInt(nilaidisc)/100);
					$('#settle-payment-cash p input[name="hargadisc"]').val(hargadisc);
					
					
				break;
				case 'item':
					$('#itemhid').slideDown('normal')
					$('#presentasehid').slideUp('normal');
				break;
				}
				$('#settle-payment-cash p input[name="hargadisc"]').val(hargadisc);
	});
	
	$('#settle-payment-cash p input[name="presentaseval"]').keyup(function(){
		var harga = $("#totalharga").html();
			harga = harga.substring(10);
			harga = parseInt(harga);
			var hargadisc = harga;
			var nilaiPPN = $('#settle-payment-cash p input[name="ppn"]').val();
			hargadisc = hargadisc+(parseInt(nilaiPPN)*hargadisc/100);	
			var nilaidisc = $(this).val();
			hargadisc = parseInt(hargadisc)-(parseInt(hargadisc)*parseInt(nilaidisc)/100);
			$('#settle-payment-cash p input[name="hargadisc"]').val(hargadisc);
																	  
	});
	
	$('#settle-payment-cash p button[name="submit"]').click(function(){
		var harga = $("#totalharga").html();
		harga = harga.substring(10);
		
		
		var strJSON = new Object();
		strJSON.orderid =  recalltambahmenuorderid;
		strJSON.discount = $('#settle-payment-cash p input[name="presentaseval"]').val();
		strJSON.ppn = $('#settle-payment-cash p input[name="ppn"]').val();
		switch(strJSON.discount){
			case'100':
				strJSON.type = 'compliment';
			break;
			case'0':
				strJSON.type = 'tanpadiskon';
			break;
			default:
				strJSON.type = 'presentase';
			break;
		}
		strJSON.uang = $('#settle-payment-cash p input[name="uang"]').val();
		strJSON.kembalian = $('#settle-payment-cash p input[name="kembalian"]').val();
		strJSON.hargasebelumdiscountdanppn = harga;
		strJSON.hargasetelahdiscountdanppn = $('#settle-payment-cash p input[name="hargadisc"]').val();
		var okedeh = JSON.stringify(strJSON);
		////alert(okedeh);
		$.getJSON("http://localhost/ajaxlogin.php?cmd=newSettle", {data:okedeh},function(data){
			//alert(JSON.stringify(data));
			printThis("Nota Pesanan", 'css/print.css');	
			$('#nota').hide();
			  $('#settle-payment-cash p select option:nth(0)').attr("selected","selected"); 
			//<p><label>Diskon</label>
//            	<select name="diskon">
//                <option>Silakan Pilih</option>
//                <option value="nodiscount">Tanpa Diskon</option>
//       		    <option value="compliment">Compliment( gratis )</option>
//            	<option value="presentase">Presentase</option>
//            	<!--<option value="item">Item Menu</option>-->
//        		</select>
//            </p>
//           	 <p style="display:none" id="presentasehid"><label>Nilai Diskon</label><input type="text" name="presentaseval" value="10"/>%</p>
				$('#settle-payment-cash p input[name="presentaseval"]').val('0');
//             <p style="display:none" id="itemhid"><label>Nilai Diskon</label><input type="text" name="itemval" value="10" readonly="readonly"/></p>
				$('#settle-payment-cash p input[name="itemval"]').val('0');
//             <p><label>PPN</label><input type="text" name="ppn" value="10"/></p>
				$('#settle-payment-cash p input[name="ppn"]').val('10');
//             <p><label>Setelah Diskon&amp;PPN</label><input type="text" name="hargadisc" readonly="readonly"/></p>
				$('#settle-payment-cash p input[name="hargadisc"]').val('');
//             <p><label>Uang</label><input type="text" name="uang" id="uangkembalian"/></p>
				$('#settle-payment-cash p input[name="uang"]').val('');
//             <p><label>Kembalian</label><input type="text" name="kembalian" readonly="readonly"/></p>
				$('#settle-payment-cash p input[name="kembalian"]').val('');
			$('#superbakaback').trigger('click');
			
		});													 
	});
	
	
	$('#settle-payment-cash p input[name="uang"]').keyup(function(){
		////alert("dfdsfds");
		var uangcustomer = 	$('#settle-payment-cash p input[name="uang"]').val();
		var hargadisc = $('#settle-payment-cash p input[name="hargadisc"]').val();
		var uangkembalian = parseInt(uangcustomer)-parseInt(hargadisc);
		$('#settle-payment-cash p input[name="kembalian"]').val(uangkembalian);
		
		$("#notadiskon").html("Diskon:"+$('#settle-payment-cash p input[name="presentaseval"]').val()+"%");
		$("#notappn").html("PPN:"+$('#settle-payment-cash p input[name="ppn"]').val()+"%");
		$("#hargasetelahppndandiskon").html("Harga Setelah PPN dan Diskon: "+$('#settle-payment-cash p input[name="hargadisc"]').val());
		$("#notacash").html("Uang:"+$('#settle-payment-cash p input[name="uang"]').val());
		$("#notakembali").html("Kembali:"+$('#settle-payment-cash p input[name="kembalian"]').val());
		
		
	});
	
	$("#pegawai").click(function(){
		
																					
		getPegawai();
		//$.blockUI({message:$("#pegawaigrid")}	);
		$.unblockUI();
		$("#pegawaigrid").dialog('open');
		//$.unblockUI();
	});
	$("#editpegawai").click(function(){
		var gr = $("#pegawaitable").jqGrid('getGridParam','selrow'); 
		if(gr!=null){
			var ret = $("#pegawaitable").jqGrid('getRowData',gr);
			$("#editpegawaidialog input[name='id']").val(ret.id);
			$("#editpegawaidialog input[name='username']").val(ret.username);
			$("#editpegawaidialog input[name='role']").val(ret.role);
			$("#pegawaigrid").dialog('close');
			$.blockUI({message:$("#editpegawaidialog"), css:{width:'20%'}});
			}
	});
	
	
	
	$("#editpegawaidialog button[name='simpan']").click(function(){
																	 
	});
	
	$("#editpegawaidialog button[name='batal']").click(function(){
		getPegawai();
		$.unblockUI();
		$("#pegawaigrid").dialog('open');
																	 
	});
	
	$("#void").click(function(){
		$.getJSON("http://localhost/ajaxlogin.php?cmd=getopenorder", function(data){
		 ////alert(JSON.stringify(data));				
		 $("#tablevoid").jqGrid({ 
				datatype: "local", 
				height: 250, 
				colNames:['ID','Order Type', 'Pegawai', 'Open','Delivery','Meja' ,'Status'], 
				colModel:[ 
						  {name:'id',index:'id', width:30, sorttype:"int"}, 
						  {name:'ordertype',index:'ordertype', width:90}, 
						  {name:'username',index:'username', width:80}, 
						  {name:'open',index:'open', width:80},
						 
						  {name:'delivery',index:'delivery', width:100}, 
						  {name:'namameja',index:'namameja', width:50},
						  {name: 'status', index: 'status', width:80}
						  ], 
				multiselect: false, 
				caption: "Pilih Order" 
			}); 
			var oke = 0;
			$.each(data, function(i,val){
				////alert(JSON.stringify(val));
				$("#tablevoid").jqGrid('addRowData', oke,val);
				oke++;
			});
		});
		$.blockUI({message:$("#voidbaru")});		
	});
	
	$("#voidbaru textarea").click(function(){
		$("#voidbaru textarea").val("");											   
	});
	$('.txtclicktodestroy').click(function(){
		$(this).val("");
	});
	
	$("#settle").click(function(){
		$.blockUI({message:$('#settlemenu')});		
	});
	
	$("#nosale").click(function(){
		//alert("nosale");							
	});
	
	
	//Codingan RObert
	$("#payout").click(function(){
		boPayoutFillPayout();							
		$.blockUI({message:$('#bo-payout')});						
	});
	//Ahir Codingan Robert
	
	$("#refund").click(function(){
		//alert("refund");							
	});
	
	$("#credit").click(function(){
		//alert("credit");							
	});
	
	$("#giftcertificate").click(function(){
		//alert("Gift Certificate");							
	});
	
	$("#cashierin").click(function(){
		////alert("cashierin");
		cashier = "in";
		$.blockUI({message: $("#setorduit")});
	});
	
	$("#setorduit ol li input").change(function(){									
		switch($(this).attr("name")){
			case "sd_100rb":
				setoranuang.sd_100rb = $(this).val();
			break;
			
			case "sd_50rb":
				setoranuang.sd_50rb = $(this).val();
			break;
			
			case "sd_20rb":
				setoranuang.sd_20rb = $(this).val();
			break;
			
			case "sd_10rb":
				setoranuang.sd_10rb = $(this).val();
			break;
			
			case "sd_5rb":
				setoranuang.sd_5rb = $(this).val();
			break;
			
			case "sd_2rb":
				setoranuang.sd_2rb = $(this).val();
			break;
			
			case "sd_1rb":
				setoranuang.sd_1rb = $(this).val();
			break;
			
			case "sd_500":
				setoranuang.sd_500 = $(this).val();
			break;
			
			case "sd_200":
				setoranuang.sd_200 = $(this).val();
			break;
		
			case "sd_100":
				setoranuang.sd_100 = $(this).val();
			break;
			
			case "sd_50":
				setoranuang.sd_50 = $(this).val();
			break;
			}
		totalsetoranuang = 0;
		$.each(setoranuang, function(i, val){
			switch(i){
			case "sd_100rb":
				totalsetoranuang += 100000*parseInt(val);
			break;
			
			case "sd_50rb":
				totalsetoranuang += 50000*parseInt(val);
			break;
			
			case "sd_20rb":
				totalsetoranuang += 20000*parseInt(val);
			break;
			
			case "sd_10rb":
				totalsetoranuang += 10000*parseInt(val);
			break;
			
			case "sd_5rb":
				totalsetoranuang += 5000*parseInt(val);
			break;
			
			case "sd_2rb":
				totalsetoranuang += 2000*parseInt(val);
			break;
			
			case "sd_1rb":
				totalsetoranuang += 1000*parseInt(val);
			break;
			
			case "sd_500":
				totalsetoranuang += 500*parseInt(val);
			break;
			
			case "sd_200":
				totalsetoranuang += 200*parseInt(val);
			break;
		
			case "sd_100":
				totalsetoranuang += 100*parseInt(val);
			break;
			
			case "sd_50":
				totalsetoranuang += 50*parseInt(val);
			break;
			}
			
			$("#sd_total").val(totalsetoranuang);
		});
		////alert(totalsetoranuang);
	});
	
	$("#setorduit button").click(function(){
		$.blockUI({message:$("#konfirmasicashierin")});
	});
	
	$("#konfirmasicashierin button[name='ya']").click(function(){
		//clear the input
		//$("#setorduit ol li input").val("");
		strJSON = JSON.stringify(setoranuang);
		////alert(strJSON);
		switch(cashier){
			case "in":
				$.getJSON("http://localhost/ajaxlogin.php?cmd=cashierin", {data:strJSON, total:totalsetoranuang}, function(data){
					//alert("cashier in "+data.status);	
					totalsetoranuang = 0;
					$("#superbakaback").trigger("click");
					/*$("#cashierin, #cashierinlabel").toggle();
					$("#cashierout ,#cashieroutlabel").toggle();*/
					//$("#cashierout").show();
				});
			break;
			case "out":
				$.getJSON("http://localhost/ajaxlogin.php?cmd=cashierout", {data:strJSON, total:totalsetoranuang}, function(data){
					//alert("cashier out "+data.status);	
					totalsetoranuang=0;
					
					$("#superbakaback").trigger("click");	
					/*$("#cashierout,#cashieroutlabel").toggle();
					$("#cashierin,#cashierinlabel").toggle();*/
					//$("#cashierin).show();
				});
			break;
		}
				
		//							   
	});
	
	$("#konfirmasicashierin button[name='tidak']").click(function(){
		$.blockUI({message: $("#setorduit")});														   
	});
	
	$("#cashierout").click(function(){
		////alert("cashierout");	
		cashier = "out";
		$.blockUI({message: $("#setorduit")});
	});
	
	
	
	$("#backoffice").click(function(){
		$.blockUI({message:$('#backofficemenu')});							
	});
	
	$('#backofficemenu ul li a[name="resep"]').click(function(){
		$.blockUI({message:$('#bo-resep')});
		$('#resepresepokdiv').hide();
		$.getJSON("http://localhost/ajaxlogin.php?cmd=getAllMenu",function(data){
				populateMenuTable(data);														   
		});
		$("#bo-resep-table").clearGridData();
		//populateResepTable()
	});
	
	$('#bo-resep button[name="baru"]').click(function(){
		$.getJSON("http://localhost/ajaxlogin.php?cmd=getAllBahan", function(data){
			////alert(JSON.stringify(data));
			populateResepBaruTable(data);
		});
		$.blockUI({message:$('#bo-resep-baru')});	
		$("#resepresepok").hide();
		$('#resepresepokdiv').hide();
	});
	
	$('#bo-resep button[name="edit"]').click(function(){
		$.getJSON("http://localhost/ajaxlogin.php?cmd=getAllBahan", function(data){
			////alert(JSON.stringify(data));
			populateResepBaruTable(data);
		});
		$('#resepresepokdiv').show();
		$.blockUI({message:$('#resepresepok')});	
		
	});
	
	$('#resepresepokdiv button[name="edit"]').click(function(){
		 var gr = $("#bo-resep-table").jqGrid('getGridParam','selrow'); 
			if(gr!=null){
				var ret = $("#bo-resep-table").jqGrid('getRowData',gr);
				$('#boresepedit ol li input[name="namabahan"]').val(ret.namabahan);
				$('#boresepedit ol li input[name="banyaknya"]').val(ret.banyaknya);
				$('#boresepedit ol li input[name="id"]').val(ret.id);
				////alert(JSON.stringify(ret));
		} 
		$.blockUI({message:$('#boresepedit')});
	});
	
	/*
	$('resepresepok button[name="edit"]').click(function(){
															
	});
	*/
	$('#boresepedit button[name="edit"]').click(function(){
		var resep  = new Object();
		resep.banyaknya = $('#boresepedit ol li input[name="banyaknya"]').val();
		resep.id = $('#boresepedit ol li input[name="id"]').val();
		strJSON = JSON.stringify(resep);
		//alert(strJSON);
		$.getJSON("http://localhost/ajaxlogin.php?cmd=editResep", {data:strJSON}, function(data){
			populateResepTable(resep.id);
			
			$('#backofficemenu ul li a[name="resep"]').trigger('click');
		});												
	});
	
	$('#bo-resep-baru button[name="baru"]').click(function(){
		////alert("ok");
		var resep = new Object();
		var gr = $("#bo-resep-baru-table").jqGrid('getGridParam','selrow'); 
			if(gr!=null){
				var ret = $("#bo-resep-baru-table").jqGrid('getRowData',gr);
				resep.bahanid = ret.id;
				resep.namabahan = ret.nama;
		}
		var gr = $("#bo-resep-menu-table").jqGrid('getGridParam','selrow'); 
			if(gr!=null){
				var ret = $("#bo-resep-menu-table").jqGrid('getRowData',gr);
				resep.menuid = ret.id;
				resep.namamenu = ret.namamenu;
		}
		
		resep.banyaknya = $('#bo-resep-baru ol li input[name="banyaknya"]').val();
		$.getJSON("http://localhost/ajaxlogin.php?cmd=newResep", {data:JSON.stringify(resep)}, function(data){
			//alert(JSON.stringify(data));
		});
		$('#backofficemenu ul li a[name="resep"]').trigger('click');
		
		////alert(JSON.stringify(resep));
		
	});
	
	$('#backofficemenu ul li a[name="stock"]').click(function(){
		$.blockUI({message:$('#bo-stock')});
		populateStockTable();
	});
	
	$('#bo-stock button[name="baru"]').click(function(){
		var gr = $("#stocktable").jqGrid('getGridParam','selrow'); 
			if(gr!=null){
				var ret = $("#stocktable").jqGrid('getRowData',gr);
				$('#stock-baru-satuan').html(ret.satuan);
		}
		$.blockUI({message:$('#bo-stock-baru')});	
		
	});
	
	$('#bo-stock button[name="edit"]').click(function(){
		var gr = $("#stocktable").jqGrid('getGridParam','selrow'); 
			if(gr!=null){
				var ret = $("#stocktable").jqGrid('getRowData',gr);
				$('#stock-edit-satuan').html(ret.satuan);
				$('#bo-stock-edit ol li input[name="jumlah"]').val(ret.stock);
		}
		$.blockUI({message:$('#bo-stock-edit')});											  
	});
	
	$('#bo-stock button[name="printpls"]').click(function(){
		//alert("ok");	
		printStock("Stock", 'css/print.css');	
		$("#superbakaback").trigger('click');
	});
	
	$('#bo-stock-baru button[name="kembali"]').click(function(){
		$('#backofficemenu ul li a[name="stock"]').trigger('click');
	});
	
	$('#bo-stock-edit button[name="kembali"]').click(function(){
		$('#backofficemenu ul li a[name="stock"]').trigger('click');
	});
	
	$('#bo-stock-baru button[name="reset"]').click(function(){
		$('#bo-stock-baru ol li input[name="jumlah"]').val("");
	});
	
	$('#bo-stock-edit button[name="reset"]').click(function(){
		$('#bo-stock-edit ol li input[name="jumlah"]').val("");
	});
	
	$('#bo-stock-baru button[name="submit"]').click(function(){
		////alert("ok");
		var stock = new Object();
		stock.stock = $('#bo-stock-baru ol li input[name="jumlah"]').val();
		var gr = $("#stocktable").jqGrid('getGridParam','selrow'); 
			if(gr!=null){
				var ret = $("#stocktable").jqGrid('getRowData',gr);
				stock.id=ret.id;	
		}
		var okedeh = JSON.stringify(stock);
		$.getJSON("http://localhost/ajaxlogin.php?cmd=addStock", {data:okedeh}, function(data){
			//alert(JSON.stringify(data));
			$('#bo-stock-baru button[name="kembali"]').trigger('click');
		});
	});
	
	$('#bo-stock-edit button[name="submit"]').click(function(){
		var stock = new Object();
		stock.stock = $('#bo-stock-edit ol li input[name="jumlah"]').val();
		var gr = $("#stocktable").jqGrid('getGridParam','selrow'); 
			if(gr!=null){
				var ret = $("#stocktable").jqGrid('getRowData',gr);
				stock.id=ret.id;	
		}
		var okedeh = JSON.stringify(stock);
		$.getJSON("http://localhost/ajaxlogin.php?cmd=editStock", {data:okedeh}, function(data){
			//alert(JSON.stringify(data));
			$('#bo-stock-edit button[name="kembali"]').trigger('click');
		});
	});
	
	$('#backofficemenu ul li a[name="bahan"]').click(function(){
		$.blockUI({message:$('#bo-bahan')});		
	});
	
	//begin bahan baru
	$('#bo-bahan button').click(function(){
		bn = "#bo-bahan-";
		bn += $(this).attr('name');
		////alert(bn);
		var attr = $(this).attr('name');
		switch(attr){
			case 'edit':
				//get data from jqgrid and fill it to edit's input
				var gr = $("#bahantable").jqGrid('getGridParam','selrow'); 
				if(gr!=null){
					var ret = $("#bahantable").jqGrid('getRowData',gr);
					$("#bo-bahan-edit ol li input[name='id']").val(ret.id);
					$("#bo-bahan-edit ol li input[name='nama']").val(ret.nama);
					$("#bo-bahan-edit ol li input[name='group']").val(ret.group);
					$("#bo-bahan-edit ol li input[name='satuan']").val(ret.satuan);
					$("#bo-bahan-edit ol li input[name='harga']").val(ret.harga);
					}
				
			break;
			
			case 'hapus':
				//get data from jqgrid and fill it to edit's input
				var gr = $("#bahantable").jqGrid('getGridParam','selrow'); 
				if(gr!=null){
					var ret = $("#bahantable").jqGrid('getRowData',gr);
					$("#bo-bahan-hapus ol li input[name='id']").val(ret.id);
					$("#bo-bahan-hapus ol li input[name='nama']").val(ret.nama);
					$("#bo-bahan-hapus ol li input[name='group']").val(ret.group);
					$("#bo-bahan-hapus ol li input[name='satuan']").val(ret.satuan);
					$("#bo-bahan-hapus ol li input[name='harga']").val(ret.harga);
					}
				
			break;
			}
		$.blockUI({message:$(bn)});		
	});
	//resetting
	$("#bo-bahan-baru button[name='reset']").click(function(){
		$("#bo-bahan-baru input").val("");
	});
	
	$("#bo-bahan-edit button[name='reset']").click(function(){
		$("#bo-bahan-edit input").val("");
	});
	
	$("#bo-bahan-hapus button[name='reset']").click(function(){
		$("#bo-bahan-hapus input").val("");
	});
	//end reset
	//kembali
	$("#bo-bahan-baru button[name='kembali']").click(function(){
		$.blockUI({message:$('#bo-bahan')});
	});
	
	$("#bo-bahan-edit button[name='kembali']").click(function(){
		$.blockUI({message:$('#bo-bahan')});
	});
	
	$("#bo-bahan-hapus button[name='kembali']").click(function(){
		$.blockUI({message:$('#bo-bahan')});
	});
	//end kembali
	
	//begin tambah bahan baru
	$("#bo-bahan-baru button[name='submit']").click(function(){
		var bahan = new Object();
		bahan.nama = $("#bo-bahan-baru ol li input[name='nama']").val();
		bahan.group = $("#bo-bahan-baru ol li input[name='group']").val();
		bahan.satuan = $("#bo-bahan-baru ol li input[name='satuan']").val();
		bahan.harga = $("#bo-bahan-baru ol li input[name='harga']").val();
		var strJSON = JSON.stringify(bahan);
		////alert(data);
		$.getJSON("http://localhost/ajaxlogin.php?cmd=newBahan", {data:strJSON}, function(data){
			//alert(JSON.stringify(data));
			populateBahanTable();
		});
	$("#bo-bahan-baru button[name='reset']").trigger('click');
	$("#bo-bahan-baru button[name='kembali']").trigger('click');
	});
	//end tambah bahan baru
	
	//begin update bahan
	$("#bo-bahan-edit button[name='submit']").click(function(){
		var bahan = new Object();
		bahan.id = $("#bo-bahan-edit ol li input[name='id']").val();
		bahan.nama = $("#bo-bahan-edit ol li input[name='nama']").val();
		bahan.group = $("#bo-bahan-edit ol li input[name='group']").val();
		bahan.satuan = $("#bo-bahan-edit ol li input[name='satuan']").val();
		bahan.harga = $("#bo-bahan-edit ol li input[name='harga']").val();
		var strJSON = JSON.stringify(bahan);
		////alert(strJSON);
		$.getJSON("http://localhost/ajaxlogin.php?cmd=editBahan", {data:strJSON}, function(data){
			////alert(JSON.stringify(data));
			populateBahanTable();
		});
	$("#bo-bahan-edit button[name='reset']").trigger('click');
	$("#bo-bahan-edit button[name='kembali']").trigger('click');
	});
	//end update bahan
	//keuangan
	/*$('#bo-keuangan button[name="printpls"]').click(function(){
		printKeuangan("Keuangan", 'css/print.css');	
		$("#superbakaback").trigger('click');													 
	});*/
	
	//begin hapus bahan
	$("#bo-bahan-hapus button[name='submit']").click(function(){
		var bahan = new Object();
		bahan.id = $("#bo-bahan-hapus ol li input[name='id']").val();
		bahan.nama = $("#bo-bahan-hapus ol li input[name='nama']").val();
		bahan.group = $("#bo-bahan-hapus ol li input[name='group']").val();
		bahan.satuan = $("#bo-bahan-hapus ol li input[name='satuan']").val();
		bahan.harga = $("#bo-bahan-hapus ol li input[name='harga']").val();
		var strJSON = JSON.stringify(bahan);
		////alert(strJSON);
		$.getJSON("http://localhost/ajaxlogin.php?cmd=hapusBahan", {data:strJSON}, function(data){
			////alert(JSON.stringify(data));
			populateBahanTable();
		});
	$("#bo-bahan-hapus button[name='reset']").trigger('click');
	$("#bo-bahan-hapus button[name='kembali']").trigger('click');
	});
	//end hapus bahan
	//begin populate bahan id=bahantable
	$("#bo-bahan-baru button[name='kembali'],#bo-bahan-edit button[name='kembali'],#bo-bahan-hapus button[name='kembali'], #backofficemenu ul li a[name='bahan']").click(function(){
																																												
		populateBahanTable();
	});
	//end populate bahan
	
	
	$('#backofficemenu ul li a[name="menu"]').click(function(){
		boMenuFillMenu();
		$.blockUI({message:$('#bo-menu')});		
	});
	
	$('#bo-menu button[name="backoffice"]').click(function(){
		$("#backoffice").trigger('click');
		
	});
	$('#bo-menu button[name="tambahmenu"]').click(function(){
		$.blockUI({message:$('#bo-menu-baru')});
	});
	
	$('#bo-menu button[name="discount"]').click(function(){
		$("#bme-diskon").show();
		$('#bo-menu button[name="editmenu"]').trigger('click');
	});
	
	$('#bo-menu button[name="editmenu"]').click(function(){
		var gr = $("#bo-menu-table").jqGrid('getGridParam','selrow'); 
		if(gr!=null){
			var ret = $("#bo-menu-table").jqGrid('getRowData',gr);
			$("#bo-menu-edit input[name='id']").val(ret.id);
			$("#bo-menu-edit input[name='namamenu']").val(ret.namamenu);
			$("#bo-menu-edit input[name='harga']").val(ret.harga);
			$("#bo-menu-edit input[name='group']").val(ret.group);
			}
		$.blockUI({message:$('#bo-menu-edit')});
	});
	
	$('#bo-menu button[name="hapusmenu"]').click(function(){
		var gr = $("#bo-menu-table").jqGrid('getGridParam','selrow'); 
		if(gr!=null){
			var ret = $("#bo-menu-table").jqGrid('getRowData',gr);
			$("#bo-menu-hapus input[name='id']").val(ret.id);
			$("#bo-menu-hapus input[name='namamenu']").val(ret.namamenu);
			$("#bo-menu-hapus input[name='harga']").val(ret.harga);
			$("#bo-menu-hapus input[name='group']").val(ret.group);
			}
		$.blockUI({message:$('#bo-menu-hapus')});
	});
	
	$('#bo-menu-hapus button[name="submit"]').click(function(){
		var menuBaru = new Object();
		menuBaru.id = $('#bo-menu-hapus input[name="id"]').val();
		menuBaru.namamenu = $('#bo-menu-hapus input[name="namamenu"]').val();
		menuBaru.harga = $('#bo-menu-hapus input[name="harga"]').val();
		menuBaru.group = $('#bo-menu-hapus input[name="group"]').val();
		////alert(JSON.stringify(menuBaru));
		var okedeh = JSON.stringify(menuBaru);
		////alert(okedeh);
		$.getJSON("http://localhost/ajaxlogin.php?cmd=deleteMenu",{data:okedeh}, function(data){
			//alert(JSON.stringify(data));
			$('#bo-menu-hapus button[name="reset"]').trigger('click');
			$('#bo-menu-hapus button[name="kembali"]').trigger('click');
		});
	});
	
	$('#bo-menu-edit button[name="submit"]').click(function(){
		var menuBaru = new Object();
		menuBaru.id = $('#bo-menu-edit input[name="id"]').val();
		menuBaru.namamenu = $('#bo-menu-edit input[name="namamenu"]').val();
		menuBaru.harga = $('#bo-menu-edit input[name="harga"]').val();
		menuBaru.group = $('#bo-menu-edit input[name="group"]').val();
		menuBaru.discount = $('#bo-menu-edit input[name="diskon"]').val();
		////alert(JSON.stringify(menuBaru));
		var okedeh = JSON.stringify(menuBaru);
		//alert(okedeh);
		$.getJSON("http://localhost/ajaxlogin.php?cmd=editMenu",{data:okedeh}, function(data){
			//alert(JSON.stringify(data));
			$('#bo-menu-edit button[name="reset"]').trigger('click');
			$('#bo-menu-edit button[name="kembali"]').trigger('click');
			$("#bme-diskon").hide();
		});
		
	});
	
	$('#bo-menu-baru button[name="submit"]').click(function(){
		var menuBaru = new Object();
		menuBaru.namamenu = $('#bo-menu-baru input[name="namamenu"]').val();
		menuBaru.harga = $('#bo-menu-baru input[name="harga"]').val();
		menuBaru.group = $('#bo-menu-baru input[name="group"]').val();
		////alert(JSON.stringify(menuBaru));
		var okedeh = JSON.stringify(menuBaru);
		$.getJSON("http://localhost/ajaxlogin.php?cmd=newMenu",{data:okedeh}, function(data){
			//alert(JSON.stringify(data));
			$('#bo-menu-baru button[name="reset"]').trigger('click');
			$('#bo-menu-baru button[name="kembali"]').trigger('click');
		});
	});
	
	$('#bo-menu-baru button[name="reset"]').click(function(){
		$('#bo-menu-baru input[name="namamenu"]').val("");
		$('#bo-menu-baru input[name="harga"]').val("");
		$('#bo-menu-baru input[name="group"]').val("");
	});
	
	$('#bo-menu-edit button[name="reset"]').click(function(){
		$('#bo-menu-edit input[name="namamenu"]').val("");
		$('#bo-menu-edit input[name="harga"]').val("");
		$('#bo-menu-edit input[name="group"]').val("");
	});
	
	$('#bo-menu-hapus button[name="reset"]').click(function(){
		$('#bo-menu-hapus input[name="namamenu"]').val("");
		$('#bo-menu-hapus input[name="harga"]').val("");
		$('#bo-menu-hapus input[name="group"]').val("");
	});
	
	$('#bo-menu-edit button[name="kembali"], #bo-menu-hapus button[name="kembali"]').click(function(){
		$('#backofficemenu ul li a[name="menu"]').trigger('click');												   
	});
	
	
	$('#bo-menu-baru button[name="kembali"]').click(function(){
		$('#backofficemenu ul li a[name="menu"]').trigger('click');												   
	});
	
	// Awal Codingan Robert
	
	$('#bo-payout button[name="tambahpayout"]').click(function(){
		////alert("tambah karywan");
		$.blockUI({message:$('#bo-payout-baru')});
	});
	
	$('#bo-payout-baru button[name="submit"]').click(function(){
		var payoutBaru = new Object();
		payoutBaru.jumlah = $('#bo-payout-baru input[name="jumlah"]').val();
		payoutBaru.keterangan = $('#bo-payout-baru textarea[name="keterangan"]').val();
		
		
		////alert(JSON.stringify(payoutBaru));
		var okedeh = JSON.stringify(payoutBaru);
		$.getJSON("http://localhost/ajaxlogin.php?cmd=newPayout",{data:okedeh}, function(data){
			//alert(JSON.stringify(data));
			$('#bo-payout-baru button[name="reset"]').trigger('click');
			$('#bo-payout-baru button[name="kembali"]').trigger('click');
			boPayoutFillPayout();
		});
		
	});
	
	$('#bo-payout-baru button[name="reset"]').click(function(){
		$('#bo-payout-baru input[name="jumlah"]').val("");
		$('#bo-payout-baru input[name="keterangan"]').val("");
	});
	
	$('#bo-payout-baru button[name="kembali"]').click(function(){				
		$.blockUI({message:$('#bo-payout')});												   
	});
	
	$('#bo-payout button[name="editpayout"]').click(function(){
	var gr = $("#bo-payout-table").jqGrid('getGridParam','selrow');														 
		if(gr!=null){
			var ret = $("#bo-payout-table").jqGrid('getRowData',gr);
			$("#bo-payout-edit input[name='id']").val(ret.id);
			$("#bo-payout-edit input[name='jumlah']").val(ret.jumlah);
			$("#bo-payout-edit input[name='keterangan']").val(ret.keterangan);
			//$("#bo-payout-edit input[name='role']").val(ret.role);
			
			}	
			$.blockUI({message:$('#bo-payout-edit')});
	});
	
	$('#bo-payout-edit button[name="submit"]').click(function(){
		var payoutBaru = new Object();
		payoutBaru.id = $('#bo-karyawan-edit input[name="id"]').val();
		payoutBaru.jumlah = $('#bo-payout-edit input[name="jumlah"]').val();
		payoutBaru.keterangan = $('#bo-payout-edit input[name="keterangan"]').val();
		
		////alert(JSON.stringify(menuBaru));
		var okedeh = JSON.stringify(payoutBaru);
		//alert(okedeh);
		$.getJSON("http://localhost/ajaxlogin.php?cmd=editPayout",{data:okedeh}, function(data){
			//alert(JSON.stringify(data));
			$('#bo-payout-edit button[name="reset"]').trigger('click');
			$('#bo-payout-edit button[name="kembali"]').trigger('click');
		});
		
	});
	
	
	
	$('#backofficemenu ul li a[name="karyawan"]').click(function(){
		boKaryawanFillKaryawan();
		$.blockUI({message:$('#bo-karyawan')});		
	});
	
	
	$('#bo-karyawan button[name="backoffice"]').click(function(){
		$("#backoffice").trigger('click');
		
	});
	
	$('#bo-karyawan button[name="tambahkaryawan"]').click(function(){
		////alert("tambah karywan");
		$.blockUI({message:$('#bo-karyawan-baru')});
	});
	
	
	
	$('#bo-karyawan button[name="editkaryawan"]').click(function(){
	var gr = $("#bo-karyawan-table").jqGrid('getGridParam','selrow');														 
		if(gr!=null){
			var ret = $("#bo-karyawan-table").jqGrid('getRowData',gr);
			$("#bo-karyawan-edit input[name='id']").val(ret.id);
			$("#bo-karyawan-edit input[name='namakaryawan']").val(ret.username);
			$("#bo-karyawan-edit input[name='password']").val(ret.password);
			$("#bo-karyawan-edit input[name='role']").val(ret.role);
			$("#bo-karyawan-edit input[name='gajipokok']").val(ret.gajipokok);
			$("#bo-karyawan-edit input[name='gajilain2']").val(ret.gajilain2);
			$("#bo-karyawan-edit input[name='bonuskehadiran']").val(ret.bonuskehadiran);
			$("#bo-karyawan-edit input[name='tambahanjabatan']").val(ret.tambahanjabatan);
			
			}	
			$.blockUI({message:$('#bo-karyawan-edit')});
	});
	/*
	$('#bo-menu button[name="hapusmenu"]').click(function(){
		var gr = $("#bo-menu-table").jqGrid('getGridParam','selrow'); 
		if(gr!=null){
			var ret = $("#bo-menu-table").jqGrid('getRowData',gr);
			$("#bo-menu-hapus input[name='id']").val(ret.id);
			$("#bo-menu-hapus input[name='namamenu']").val(ret.namamenu);
			$("#bo-menu-hapus input[name='harga']").val(ret.harga);
			$("#bo-menu-hapus input[name='group']").val(ret.group);
			}
		$.blockUI({message:$('#bo-menu-hapus')});
	});
	*/
	$
	
	$('#bo-karyawan-hapus button[name="submit"]').click(function(){
		////alert("die2");
		var karyawanBaru = new Object();
		karyawanBaru.id = $('#bo-karyawan-hapus input[name="id"]').val();
		karyawanBaru.username = $('#bo-karyawan-hapus input[name="namakaryawan"]').val();
		karyawanBaru.password = $('#bo-karyawan-hapus input[name="password"]').val();
		karyawanBaru.role = $('#bo-karyawan-hapus input[name="role"]').val();
		karyawanBaru.gajipokok = $('#bo-karyawan-hapus input[name="gajipokok"]').val();
		karyawanBaru.gajilain2 = $('#bo-karyawan-hapus input[name="gajilain2"]').val();
		karyawanBaru.bonusukehadiran = $('#bo-karyawan-hapus input[name="bonuskehadiran"]').val();
		karyawanBaru.tambahanjabatan = $('#bo-karyawan-hapus input[name="tambahanjabatan"]').val();
		alert(JSON.stringify(karyawanBaru));
		var okedeh = JSON.stringify(karyawanBaru);
		//alert("123");
		$.getJSON("http://localhost/ajaxlogin.php?cmd=deleteKaryawan",{data:okedeh}, function(data){
			$('#bo-karyawan-hapus button[name="reset"]').trigger('click');
			$('#bo-karyawan-hapus button[name="kembali"]').trigger('click');
		});
	});
	
		$('#bo-karyawan-edit button[name="submit"]').click(function(){
		var karyawanBaru = new Object();
		karyawanBaru.id = $('#bo-karyawan-edit input[name="id"]').val();
		karyawanBaru.username = $('#bo-karyawan-edit input[name="namakaryawan"]').val();
		karyawanBaru.password = $('#bo-karyawan-edit input[name="password"]').val();
		karyawanBaru.role = $('#bo-karyawan-edit input[name="role"]').val();
		karyawanBaru.gajipokok = $('#bo-karyawan-edit input[name="gajipokok"]').val();
		karyawanBaru.gajilain2 = $('#bo-karyawan-edit input[name="gajilain2"]').val();
		karyawanBaru.bonuskehadiran = $('#bo-karyawan-edit input[name="bonuskehadiran"]').val();
		karyawanBaru.tambahanjabatan = $('#bo-karyawan-edit input[name="tambahanjabatan"]').val();
		//alert(JSON.stringify(karyawanBaru));
		var okedeh = JSON.stringify(karyawanBaru);
		//alert(okedeh);
		$.getJSON("http://localhost/ajaxlogin.php?cmd=editKaryawan",{data:okedeh}, function(data){
			//alert(JSON.stringify(data));
			$('#bo-karyawan-edit button[name="reset"]').trigger('click');
			$('#bo-karyawan-edit button[name="kembali"]').trigger('click');
		});
		
	});
	
	$('#bo-karyawan-baru button[name="submit"]').click(function(){
		var karyawanBaru = new Object();
		karyawanBaru.username = $('#bo-karyawan-baru ol li input[name="username"]').val();
		karyawanBaru.password = $('#bo-karyawan-baru ol li input[name="password"]').val();
		karyawanBaru.role = $('#bo-karyawan-baru ol li input[name="role"]').val();
		karyawanBaru.gajipokok = $("#bo-karyawan-edit ol li input[name='gajipokok']").val();
		karyawanBaru.gajilain2 = $("#bo-karyawan-edit ol li input[name='gajilain2']").val();
		karyawanBaru.bonuskehadiran = $("#bo-karyawan-edit ol li input[name='bonuskehadiran']").val();
		karyawanBaru.tambahanjabatan = $("#bo-karyawan-edit ol li input[name='tambahanjabatan']").val();
		//alert(JSON.stringify(karyawanBaru));
		var okedeh = JSON.stringify(karyawanBaru);
		$.getJSON("http://localhost/ajaxlogin.php?cmd=newKaryawan",{data:okedeh}, function(data){
			//alert(JSON.stringify(data));
			$('#bo-karyawan-baru button[name="reset"]').trigger('click');
			$('#bo-karyawan-baru button[name="kembali"]').trigger('click');
		});
	});
	
	
	
	
	$('#bo-karyawan-baru button[name="reset"]').click(function(){
		$('#bo-karyawan-baru input[name="username"]').val("");
		$('#bo-karyawan-baru input[name="password"]').val("");
		$('#bo-karyawan-baru input[name="role"]').val("");
		$("#bo-karyawan-edit input[name='gajipokok']").val("");
		$("#bo-karyawan-edit input[name='gajilain2']").val("");
		$("#bo-karyawan-edit input[name='bonuskehadiran']").val("");
		$("#bo-karyawan-edit input[name='tambahanjabatan']").val("");
	});
	
	$('#bo-karyawan-baru button[name="kembali"]').click(function(){
		$('#backofficemenu ul li a[name="karyawan"]').trigger('click');												   
	});
	
	$('#bo-karyawan-edit button[name="reset"]').click(function(){
		$('#bo-karyawan-edit input[name="namakaryawan"]').val("");
		$('#bo-karyawan-edit input[name="password"]').val("");
		$('#bo-karyawan-edit input[name="role"]').val("");
		$("#bo-karyawan-edit input[name='gajipokok']").val("");
		$("#bo-karyawan-edit input[name='gajilain2']").val("");
		$("#bo-karyawan-edit input[name='bonuskehadiran']").val("");
		$("#bo-karyawan-edit input[name='tambahanjabatan']").val("");
	});
	/*
	$('#bo-menu-hapus button[name="reset"]').click(function(){
		$('#bo-menu-hapus input[name="namamenu"]').val("");
		$('#bo-menu-hapus input[name="harga"]').val("");
		$('#bo-menu-hapus input[name="group"]').val("");
	});
	*/
	$('#bo-karyawan-edit button[name="kembali"], #bo-karyawan-hapus button[name="kembali"]').click(function(){
		$('#backofficemenu ul li a[name="karyawan"]').trigger('click');												   
	});
	
	
	$('#bo-karyawan-baru button[name="kembali"]').click(function(){
		$('#backofficemenu ul li a[name="karyawan"]').trigger('click');												   
	});
	
	$('#bo-karyawan button[name="hapuskaryawan"]').click(function(){
		var gr = $("#bo-karyawan-table").jqGrid('getGridParam','selrow'); 
		//alert("die");
		if(gr!=null){
			var ret = $("#bo-karyawan-table").jqGrid('getRowData',gr);
			$("#bo-karyawan-hapus input[name='id']").val(ret.id);
			$("#bo-karyawan-hapus input[name='namakaryawan']").val(ret.username);
			$("#bo-karyawan-hapus input[name='password']").val(ret.password);
			$("#bo-karyawan-hapus input[name='role']").val(ret.role);
	        $("#bo-karyawan-edit input[name='gajipokok']").val(ret.gajipokok);
	        $("#bo-karyawan-edit input[name='gajilain2']").val(ret.gajilain2);
		    $("#bo-karyawan-edit input[name='bonuskehadiran']").val(ret.bonuskehadiran);
	        $("#bo-karyawan-edit input[name='tambahanjabatan']").val(ret.tambahanjabatan);
			}
		$.blockUI({message:$('#bo-karyawan-hapus')});
		
	});
	
	// Ahir Codingan Robert
	
	$("#selesaimemesan").live("click", function(){
		order.ordertype = ordertype;
		order.menu = menu;
		order.harga = harga;
		order.jumlah = nomorinput;
		order.namameja = namameja;
		order.delivery = alamatdelivery;
		order.jumlahtamu = dineinjumlahtamu;
		order.remark = remark;
		order.printstatus = "printed";
		order.id = editorder.orderid;
		strJSON = JSON.stringify(order);
		alert(strJSON);
		if(editorder.status == false){
			$.getJSON("http://localhost/ajaxlogin.php?cmd=orderbaru",{data:strJSON},function(data){
				//alert("status: "+data.status);
			});
		}
		else if(editorder.status == true){
			$.getJSON("http://localhost/ajaxlogin.php?cmd=editorderrecall",{data:strJSON},function(data){
				//alert(JSON.stringify(data));
			});
			}
		//clear the variables
		ordertype = "";
		menu.length = 0;
		harga.length = 0;
		nomorinput.length = 0;
		namameja = "";
		alamatdelivery = "";
		dineinjumlahtamu = "";
		remark.length = 0;
		
		
		//clear nota
		$("#nota table").html("");
		total = 0;
		$("#totalharga").html("Total: Rp.0");
	});
	function getmeja(lokasi){
		url = "http://localhost/ajaxlogin.php?cmd=getmeja";
		$.getJSON(url,function(data){
			$.each(data, function(i,val){
				if(val.lokasi == lokasi){
					//$('#meja'+lokasi+' ul').append('<li><a href="#" id="okedeh">'+val.namameja+'</a></li>');
				}
			});					   
		});
	}
	
	function getPegawai(){
			$.getJSON("http://localhost/ajaxlogin.php?cmd=getpegawai", function(data){
			$("#pegawaitable").jqGrid({ 
				datatype: "local", 
				height: 250, 
				colNames:['ID','Username', 'Jabatan'], 
				colModel:[ 
						  {name:'id',index:'id', width:60, sorttype:"int"}, 
						  {name:'username',index:'username', width:90}, 
						  {name:'role',index:'role', width:100}
						  ], 
				multiselect: false, 
				caption: "Pilih Pegawai" 
			});
			$("#pegawaitable").jqGrid('clearGridData');
			//$("#pegawaitable").jqGrid('addJSONData', JSON.stringify(data));
			/*var mygrid=$("#pegawaitable")[0];
			mygrid.addJSONData(data[0]);*/
			var oke = 0;
			$.each(data, function(i,val){
				////alert(JSON.stringify(val));
				$("#pegawaitable").jqGrid('addRowData', oke,val);
				oke++;
			});
			});
		}
	
	function populateGroup(){
		url = "http://localhost/ajaxlogin.php?cmd=populategroup";
		$("#grupmakanan ul").html('<li><a href="#" class="menuutama" id="selesaimemesan" style="display:none;">Selesai</a></li>');
		$.getJSON(url,function(data){
			$.each(data, function(i,val){
				$("#grupmakanan ul").append('<li><a href="#">'+val+'</a></li>');
				
			});					   
		});
		$("#notanamameja").html("Meja: "+namameja);
		
		
		
		////alert(namameja);
		////alert(order);
		
		$("#nota").show();
	}
	function populatemenu(group){
		url = "http://localhost/ajaxlogin.php?cmd=populatemenu&group="+group;
		$("#menumakanan ul").html('');
		$.getJSON(url,function(data){
			$.each(data, function(i,val){
				$("#menumakanan ul").append('<li><a href="#" title="'+val.harga+'">'+val.namamenu+'</a></li>');
				
			});					   
		});
		}
	/*
    Quick and dirty print function for AIR
    @htmlTitle string    :    text to be placed in <title> tag of the document
    @printCSSFile    :    css file to parse, should be relative to the app ie 'stylesheets/print.css'
	*/
	function printThis(htmlTitle, printCSSFile)
	{
		
		
		var locFileStream = false,
			styleFile = air.File.applicationDirectory;
			locStyles = '';
	
		/* fetch css definitions for print stylesheet and store in locStyles */
		styleFile = styleFile.resolvePath(printCSSFile);
	
		locFileStream = new air.FileStream();
		locFileStream.open(styleFile, air.FileMode.READ);
		locStyles = locFileStream.readUTFBytes(locFileStream.bytesAvailable);
		locFileStream.close();
	
		/* HTML to string */
		locHTML = $('#nota').html();
	
		/* wrap with doc tags, add "window.print" to the onload */
		locHTML = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">' +
				'<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">' +
				'<head>' +
				'<title>' + htmlTitle + '</title>' +
				'<style type="text/css">' +
				locStyles +
				'</style>' +
				'</head>' +
				'<body onload="window.print()">' +
					locHTML +
				'</body>' +
				'</html>';
	
		/* output the file to a temporary file in user's docs, launch url in native browser
			TODO: delete tmp file after launch
		*/
		var tmpFile = air.File.documentsDirectory;
		tmpFile = tmpFile.resolvePath("temp.html");
		tmpURLToOpen = tmpFile.url;
	
		var tmpFileStream = new air.FileStream();
		tmpFileStream.open(tmpFile, air.FileMode.WRITE);
		tmpFileStream.writeUTFBytes(locHTML);
		tmpFileStream.close();
	
		var locURLReq = new air.URLRequest(tmpURLToOpen);
		air.navigateToURL(locURLReq);
	
		/* null objects */
		locURLReq = null;
		tmpFileStream = null;
		locFileStream = null;
		styleFile = null;
		//<p id="notanamameja"></p>
		$('#notanamameja').html('');
//        <p id="notausername"></p>
		$('#notausername').html('');
		//<p id="totalharga"></p>
		$('#totalharga').html('');
//        <p id="notadiskon"></p>
		$('#notadiskon').html('');
//        <p id="notappn"></p>
		$('#notappn').html('');
//        <p id="notacash"></p>
		$('#notacash').html('');
//        <p id="notakembali"></p>
		$('#notakembali').html('');
//        <p>Harga Setelah PPN dan Diskon:<strong><span id="hargasetelahppndandiskon"></span></strong></p>
		$('#hargasetelahppndandiskon').html('');
	}
	function printStock(htmlTitle, printCSSFile)
	{
		
		
		var locFileStream = false,
			styleFile = air.File.applicationDirectory;
			locStyles = '';
	
		/* fetch css definitions for print stylesheet and store in locStyles */
		styleFile = styleFile.resolvePath(printCSSFile);
	
		locFileStream = new air.FileStream();
		locFileStream.open(styleFile, air.FileMode.READ);
		locStyles = locFileStream.readUTFBytes(locFileStream.bytesAvailable);
		locFileStream.close();
	
		/* HTML to string */
		locHTML = $('#bo-stock').html();
	
		/* wrap with doc tags, add "window.print" to the onload */
		locHTML = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">' +
				'<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">' +
				'<head>' +
				'<title>' + htmlTitle + '</title>' +
				'<style type="text/css">' +
				locStyles +
				'</style>' +
				'</head>' +
				'<body onload="window.print()">' +
					locHTML +
				'</body>' +
				'</html>';
	
		/* output the file to a temporary file in user's docs, launch url in native browser
			TODO: delete tmp file after launch
		*/
		var tmpFile = air.File.documentsDirectory;
		tmpFile = tmpFile.resolvePath("temp.html");
		tmpURLToOpen = tmpFile.url;
	
		var tmpFileStream = new air.FileStream();
		tmpFileStream.open(tmpFile, air.FileMode.WRITE);
		tmpFileStream.writeUTFBytes(locHTML);
		tmpFileStream.close();
	
		var locURLReq = new air.URLRequest(tmpURLToOpen);
		air.navigateToURL(locURLReq);
	
		/* null objects */
		locURLReq = null;
		tmpFileStream = null;
		locFileStream = null;
		styleFile = null;
		//<p id="notanamameja"></p>
		$('#notanamameja').html('');
//        <p id="notausername"></p>
		$('#notausername').html('');
		//<p id="totalharga"></p>
		$('#totalharga').html('');
//        <p id="notadiskon"></p>
		$('#notadiskon').html('');
//        <p id="notappn"></p>
		$('#notappn').html('');
//        <p id="notacash"></p>
		$('#notacash').html('');
//        <p id="notakembali"></p>
		$('#notakembali').html('');
//        <p>Harga Setelah PPN dan Diskon:<strong><span id="hargasetelahppndandiskon"></span></strong></p>
		$('#hargasetelahppndandiskon').html('');
	}
	
	function printKeuangan(htmlTitle, printCSSFile)
	{
		
		
		var locFileStream = false,
			styleFile = air.File.applicationDirectory;
			locStyles = '';
	
		/* fetch css definitions for print stylesheet and store in locStyles */
		styleFile = styleFile.resolvePath(printCSSFile);
	
		locFileStream = new air.FileStream();
		locFileStream.open(styleFile, air.FileMode.READ);
		locStyles = locFileStream.readUTFBytes(locFileStream.bytesAvailable);
		locFileStream.close();
	
		/* HTML to string */
		locHTML = $('#bo-keuangan').html();
	
		/* wrap with doc tags, add "window.print" to the onload */
		locHTML = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">' +
				'<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">' +
				'<head>' +
				'<title>' + htmlTitle + '</title>' +
				'<style type="text/css">' +
				locStyles +
				'</style>' +
				'</head>' +
				'<body onload="window.print()">' +
					locHTML +
				'</body>' +
				'</html>';
	
		/* output the file to a temporary file in user's docs, launch url in native browser
			TODO: delete tmp file after launch
		*/
		var tmpFile = air.File.documentsDirectory;
		tmpFile = tmpFile.resolvePath("temp.html");
		tmpURLToOpen = tmpFile.url;
	
		var tmpFileStream = new air.FileStream();
		tmpFileStream.open(tmpFile, air.FileMode.WRITE);
		tmpFileStream.writeUTFBytes(locHTML);
		tmpFileStream.close();
	
		var locURLReq = new air.URLRequest(tmpURLToOpen);
		air.navigateToURL(locURLReq);
	
		/* null objects */
		locURLReq = null;
		tmpFileStream = null;
		locFileStream = null;
		styleFile = null;
		//<p id="notanamameja"></p>
		$('#notanamameja').html('');
//        <p id="notausername"></p>
		$('#notausername').html('');
		//<p id="totalharga"></p>
		$('#totalharga').html('');
//        <p id="notadiskon"></p>
		$('#notadiskon').html('');
//        <p id="notappn"></p>
		$('#notappn').html('');
//        <p id="notacash"></p>
		$('#notacash').html('');
//        <p id="notakembali"></p>
		$('#notakembali').html('');
//        <p>Harga Setelah PPN dan Diskon:<strong><span id="hargasetelahppndandiskon"></span></strong></p>
		$('#hargasetelahppndandiskon').html('');
	}
	
	function populateRecallMenu(data){
		$("#recallmenutable").jqGrid({ 
				datatype: "local", 
				height: 250, 
				colNames:['ID','Menu', 'Jumlah', 'Harga','Remark'], 
				colModel:[ 
						  {name:'id',index:'id', width:60, sorttype:"int"}, 
						  {name:'menu',index:'menu', width:150}, 
						  {name:'jumlah',index:'jumlah', width:40}, 
						  {name:'harga',index:'harga', width:80},
						  {name:'remark',index:'remark', width:120}
						  ], 
				multiselect: false, 
				caption: "Recall Menu",
				onSelectRow: function(id){
					/*//alert(id);
					//jquery jqgrid get row data by id
					var ret = $('#recallmenutable').jqGrid('getRowData',id);
					//test the return value
					////alert(JSON.stringify(ret));
					$.getJSON("http://localhost/ajaxlogin.php?cmd=getMenuByOrderID", {data:ret.id}, function(data){
						populateRecallMenu(data);
						$.blockUI({message:$('#recallordermenu')});
					});*/
				}
			}); 
			var oke = 0;
			$("#recallmenutable").clearGridData();
			$.each(data, function(i,val){
				////alert(JSON.stringify(val));
				$("#recallmenutable").jqGrid('addRowData', oke,val);
				oke++;
			});
			
		}
		
		function populateMenuTable(data){
		$("#bo-resep-menu-table").jqGrid({ 
				datatype: "local", 
				height: 250, 
				colNames:['ID','Menu', 'Group'], 
				colModel:[ 
						  {name:'id',index:'id', width:60, sorttype:"int"}, 
						  {name:'namamenu',index:'menu', width:150}, 
						  {name:'group',index:'jumlah', width:150}
						  ], 
				multiselect: false, 
				caption: "Pilih Menu",
				onSelectRow: function(id){
					populateResepTable(id);
					
					/*//alert(id);
					//jquery jqgrid get row data by id
					var ret = $('#recallmenutable').jqGrid('getRowData',id);
					//test the return value
					////alert(JSON.stringify(ret));
					$.getJSON("http://localhost/ajaxlogin.php?cmd=getMenuByOrderID", {data:ret.id}, function(data){
						populateRecallMenu(data);
						$.blockUI({message:$('#recallordermenu')});
					});*/
				}
			}); 
			var oke = 0;
			$("#resepresepok").show();
			$("#bo-resep-menu-table").clearGridData();
			$.each(data, function(i,val){
				////alert(JSON.stringify(val));
				$("#bo-resep-menu-table").jqGrid('addRowData', oke,val);
				oke++;
			});
			
		}
		function getMenuCost(id){
			var menu = Object();
			menu.id = id;
			var strJSON = JSON.stringify(menu);
			////alert(strJSON);
			$.getJSON("http://localhost/ajaxlogin.php?cmd=getMenuCost", {data:strJSON}, function(data){
				$('#resepmenucost').html(data.cost);	
				//alert(JSON.stringify(data));
			});
			$('#resepmenucost').val();
			}
		function populateResepTable(id){
		$("#bo-resep-table").jqGrid({ 
				datatype: "local", 
				height: 250, 
				colNames:['ID','Menu', 'Banyaknya','Bahan'], 
				colModel:[ 
						  {name:'id',index:'id', width:20, sorttype:"int"}, 
						  {name:'namamenu',index:'nama', width:100}, 
						  {name:'banyaknya',index:'banyaknya', width:30},
						  {name:'namabahan',index:'namabahan', width:80}
						  ], 
				multiselect: false, 
				caption: "Resep",
				onSelectRow: function(id){
					/*//alert(id);
					//jquery jqgrid get row data by id
					var ret = $('#recallmenutable').jqGrid('getRowData',id);
					//test the return value
					////alert(JSON.stringify(ret));
					$.getJSON("http://localhost/ajaxlogin.php?cmd=getMenuByOrderID", {data:ret.id}, function(data){
						populateRecallMenu(data);
						$.blockUI({message:$('#recallordermenu')});
					});*/
				}
			}); 
			var oke = 0;
			$("#bo-resep-table").clearGridData();
			var yeah;
			var gr = $("#bo-resep-menu-table").jqGrid('getGridParam','selrow'); 
				if(gr!=null){
					var ret = $("#bo-resep-menu-table").jqGrid('getRowData',gr);
					yeah = ret.id;
					}
			getMenuCost(yeah);
			$.getJSON("http://localhost/ajaxlogin.php?cmd=getResepByMenuID", {data:yeah}, function(data){
				////alert(JSON.stringify(data));
				$.each(data, function(i,val){
				////alert(JSON.stringify(val));
				$("#bo-resep-table").jqGrid('addRowData', oke,val);
				oke++;
				});
			
			});
			
		}
		
		function populateResepBaruTable(data){
		$("#bo-resep-baru-table").jqGrid({ 
				datatype: "local", 
				height: 250, 
				colNames:['ID','Nama', 'Group','Satuan'], 
				colModel:[ 
						  {name:'id',index:'id', width:60, sorttype:"int"}, 
						  {name:'nama',index:'nama', width:150}, 
						  {name:'group',index:'group', width:150},
						  {name:'satuan',index:'satuan', width:150}
						  ], 
				multiselect: false, 
				caption: "Pilih Bahan",
				onSelectRow: function(id){
					/*//alert(id);
					//jquery jqgrid get row data by id
					var ret = $('#recallmenutable').jqGrid('getRowData',id);
					//test the return value
					////alert(JSON.stringify(ret));
					$.getJSON("http://localhost/ajaxlogin.php?cmd=getMenuByOrderID", {data:ret.id}, function(data){
						populateRecallMenu(data);
						$.blockUI({message:$('#recallordermenu')});
					});*/
				}
			}); 
			var oke = 0;
			$("#bo-resep-baru-table").clearGridData();
			
				$.each(data, function(i,val){
				////alert(JSON.stringify(val));
				$("#bo-resep-baru-table").jqGrid('addRowData', oke,val);
				oke++;
				});
			
			
			
		}
		
		//bo-resep-baru-table
		
		function recallTambahMenu(orderid){
			editorder.status = true;
			editorder.orderid = orderid;
			//get order data
			$.getJSON("http://localhost/ajaxlogin.php?cmd=getMenuByOrderID",{data:orderid},function(data){
				//alert(JSON.stringify(data));	
				//fill the variables
				//clear variables
				menu.length = 0;
				harga.length = 0;
				nomorinput.length = 0;
				remark.length = 0;
				/*$.each(data, function(i,val){
					menu[menu.length] = val.menu;
					harga[harga.length] = val.harga;
					nomorinput[nomorinput.length] = val.jumlah;
					remark[remark.length] = val.remark;
				});*/
				////alert(JSON.stringify(menu)+" " + JSON.stringify(harga)+" " + JSON.stringify(nomorinput)+" " + JSON.stringify(remark)+" ");
				
				fillNota(menu, harga, nomorinput);
				
			}); 
			
			$.getJSON("http://localhost/ajaxlogin.php?cmd=getOrderByID",{data:orderid},function(data){
					////alert(JSON.stringify(data));
					$.each(data, function(i,val){
						////alert(i+" "+val);	
						//<p id="notanamameja"></p>
					$('#notanamameja').html("Nama Meja: "+ val.namameja);
		//        <p id="notausername"></p>
					$('#notausername').html("User: "+ val.username);
					});
			
				});
			
			$.unblockUI();
			$('#grupmakanan').show();
			populateGroup();	
		}
		function fillNota(menu, harga, nomorinput){
			
			
			total = 0;
			$("#nota table").html('<th>Nama Item</th>	<th>Qty</th> 	<th>Harga</th>	<th>Jumlah</th>');
				for (i=0;i<menu.length;i++){
					////alert(menu[i]);
					////alert(nomorinput[i]);
					total += parseInt(harga[i]*nomorinput[i]);
					$("#nota table").append('<tr><td>'+menu[i]+'<br/>'+remark[i]+'</td>'+'<td>'+nomorinput[i]+'</td>'+'<td>'+(harga[i])+'</td>'+'<td>'+(harga[i]*nomorinput[i])+'</td></tr>');
					}
				////alert(total);
			$("#totalharga").html("total: Rp."+total);
			
			}
			
		function boMenuFillMenu(){
			$.getJSON("http://localhost/ajaxlogin.php?cmd=getAllMenu",function(data){
			////alert(JSON.stringify(data));
				$("#bo-menu-table").jqGrid({ 
					datatype: "local", 
					height: 250, 
					loadtext:"Loading...",
					colNames:['ID','Nama Menu', 'Group', 'Harga'], 
					colModel:[ 
							  {name:'id',index:'id', width:60, sorttype:"int"}, 
							  {name:'namamenu',index:'menu', width:150}, 
							  {name:'group',index:'jumlah', width:150}, 
							  {name:'harga',index:'harga', width:150}
							  ], 
					multiselect: false, 
					caption: "Menu",
					onSelectRow: function(id){
						/*//alert(id);
						//jquery jqgrid get row data by id
						var ret = $('#recallmenutable').jqGrid('getRowData',id);
						//test the return value
						////alert(JSON.stringify(ret));
						$.getJSON("http://localhost/ajaxlogin.php?cmd=getMenuByOrderID", {data:ret.id}, function(data){
							populateRecallMenu(data);
							$.blockUI({message:$('#recallordermenu')});
						});*/
					}
				}); 
				var oke = 0;
				$("#bo-menu-table").clearGridData();
				$.each(data, function(i,val){
					////alert(JSON.stringify(val));
					$("#bo-menu-table").jqGrid('addRowData', oke,val);
					oke++;
				});
			});
			}
			function populateBahanTable(){
				$.getJSON("http://localhost/ajaxlogin.php?cmd=getAllBahan",function(data){
			////alert(JSON.stringify(data));
				$("#bahantable").jqGrid({ 
					datatype: "local", 
					height: 250, 
					loadtext:"Loading...",
					colNames:['ID','Nama Bahan', 'Group', 'Satuan', 'Harga@Satuan'], 
					colModel:[ 
							  {name:'id',index:'id', width:60, sorttype:"int"}, 
							  {name:'nama',index:'nama', width:150}, 
							  {name:'group',index:'group', width:80}, 
							  {name:'satuan',index:'satuan', width:80},
							  {name:'harga',index:'harga', width:150}
							  ], 
					multiselect: false, 
					caption: "Bahan",
					onSelectRow: function(id){
						/*//alert(id);
						//jquery jqgrid get row data by id
						var ret = $('#recallmenutable').jqGrid('getRowData',id);
						//test the return value
						////alert(JSON.stringify(ret));
						$.getJSON("http://localhost/ajaxlogin.php?cmd=getMenuByOrderID", {data:ret.id}, function(data){
							populateRecallMenu(data);
							$.blockUI({message:$('#recallordermenu')});
						});*/
					}
				}); 
				var oke = 0;
				$("#bahantable").clearGridData();
				$.each(data, function(i,val){
					////alert(JSON.stringify(val));
					$("#bahantable").jqGrid('addRowData', oke,val);
					oke++;
				});
				});
				}
				function populateStockTable(){
				$.getJSON("http://localhost/ajaxlogin.php?cmd=getAllStock",function(data){
			////alert(JSON.stringify(data));
				$("#stocktable").jqGrid({ 
					datatype: "local", 
					height: 250, 
					loadtext:"Loading...",
					colNames:['ID','Nama Bahan', 'Group','Stock' ,'Satuan'], 
					colModel:[ 
							  {name:'id',index:'id', width:60, sorttype:"int"}, 
							  {name:'nama',index:'nama', width:150}, 
							  {name:'group',index:'group', width:50}, 
							  {name:'stock',index:'stock', width:100}, 
							  {name:'satuan',index:'satuan', width:100}
							  ], 
					multiselect: false, 
					caption: "Stock",
					onSelectRow: function(id){
						//populateResepTable(id);
						/*//alert(id);
						//jquery jqgrid get row data by id
						var ret = $('#recallmenutable').jqGrid('getRowData',id);
						//test the return value
						////alert(JSON.stringify(ret));
						$.getJSON("http://localhost/ajaxlogin.php?cmd=getMenuByOrderID", {data:ret.id}, function(data){
							populateRecallMenu(data);
							$.blockUI({message:$('#recallordermenu')});
						});*/
					}
				}); 
				var oke = 0;
				$("#stocktable").clearGridData();
				$.each(data, function(i,val){
					////alert(JSON.stringify(val));
					$("#stocktable").jqGrid('addRowData', oke,val);
					oke++;
				});
				});
				}
				
	//Awal FUngsi Robert
	
	function boKaryawanFillKaryawan(){
			$.getJSON("http://localhost/ajaxlogin.php?cmd=getAllKaryawan",function(data){
			//alert(JSON.stringify(data));
				$("#bo-karyawan-table").jqGrid({ 
					datatype: "local", 
					height: 250, 
					loadtext:"Loading...",
					colNames:['ID','Nama User', 'Role','Gaji Pokok','Gaji Lain2','Bonus Kehadiran','Tambahan Jabatan'], 
					colModel:[ 
							  {name:'id',index:'id', width:60, sorttype:"int"}, 
							  {name:'username',index:'username', width:100}, 
							  {name:'role',index:'role', width:100},
							  {name:'gajipokok',index:'gajipokok', width:100},
							  {name:'gajilain2',index:'gajilain2', width:100},
							  {name:'bonuskehadiran',index:'bonuskehadiran', width:100},
							  {name:'tambahanjabatan',index:'tambahanjabatan', width:100}
							  ], 
					multiselect: false, 
					caption: "Karyawan",
					onSelectRow: function(id){
						/*//alert(id);
						//jquery jqgrid get row data by id
						var ret = $('#recallmenutable').jqGrid('getRowData',id);
						//test the return value
						////alert(JSON.stringify(ret));
						$.getJSON("http://localhost/ajaxlogin.php?cmd=getMenuByOrderID", {data:ret.id}, function(data){
							populateRecallMenu(data);
							$.blockUI({message:$('#recallordermenu')});
						});*/
					}
				}); 
				var oke = 0;
				$("#bo-karyawan-table").clearGridData();
				$.each(data, function(i,val){
					////alert(JSON.stringify(val));
					$("#bo-karyawan-table").jqGrid('addRowData', oke,val);
					oke++;
				});
			});
			}
	function boPayoutFillPayout(){
			$.getJSON("http://localhost/ajaxlogin.php?cmd=getAllPayout",function(data){
			//alert(JSON.stringify(data));
				$("#bo-payout-table").jqGrid({ 
					datatype: "local", 
					height: 250, 
					loadtext:"Loading...",
					colNames:['jumlah','Keterangan','Open'], 
					colModel:[ 
							  {name:'jumlah',index:'jumlah', width:100, sorttype:"int"}, 
							  {name:'keterangan',index:'keterangan', width:300},
							  {name:'open',index:'open',width:100}
							  ], 
					multiselect: false, 
					caption: "Payout",
					onSelectRow: function(id){
						/*//alert(id);
						//jquery jqgrid get row data by id
						var ret = $('#recallmenutable').jqGrid('getRowData',id);
						//test the return value
						////alert(JSON.stringify(ret));
						$.getJSON("http://localhost/ajaxlogin.php?cmd=getMenuByOrderID", {data:ret.id}, function(data){
							populateRecallMenu(data);
							$.blockUI({message:$('#recallordermenu')});
						});*/
					}
				}); 
				var oke = 0;
				$("#bo-payout-table").clearGridData();
				$.each(data, function(i,val){
					////alert(JSON.stringify(val));
					$("#bo-payout-table").jqGrid('addRowData', oke,val);
					oke++;
				});
			});
			}
	
	
	
	
	//Ahir Fungsi RObert
	
	/*function clock() {
		var digital = new Date();
		var hours = digital.getHours();
		var minutes = digital.getMinutes();
		var seconds = digital.getSeconds();
		var amOrPm = "AM";
		if (hours > 11) amOrPm = "PM";
		if (hours > 12) hours = hours - 12;
		if (hours == 0) hours = 12;
		if (minutes <= 9) minutes = "0" + minutes;
		if (seconds <= 9) seconds = "0" + seconds;
		dispTime = hours + ":" + minutes + ":" + seconds + " " + amOrPm;
		$('#timer').html(dispTime);
		setTimeout("clock()", 1000);
	}*/	
	
	
	function MakeArray(size)
  { this.length=size;
    for(var i=1; i <= size; i++)
    { this[i]="";
    }
    return this;
  }
  function showclock()
  { var now=new Date();
    var day=now.getDay();
    var date=now.getDate();
    var month=now.getMonth()+1;
    var year=now.getYear();
    var hours=now.getHours();
    var minutes=now.getMinutes();
    var seconds=now.getSeconds();

    days=new MakeArray(7);
    days[0]="Minggu";
    days[1]="Senin";
    days[2]="Selasa";
    days[3]="Rabu";
    days[4]="Kamis";
    days[5]="Jum'at";
    days[6]="Sabtu";
    months=new MakeArray(13);
    months[1]="Januari";
    months[2]="Februari";
    months[3]="Maret";
    months[4]="April";
    months[5]="Mei";
    months[6]="Juni";
    months[7]="Juli";
    months[8]="Agustus";
    months[9]="September";
    months[10]="Oktober";
    months[11]="Nopember";
    months[12]="Desember";

    var vdate="";
    vdate += (days[day]) + "     ";
    vdate += date + " ";
    vdate += (months[month]) + " ";
    if (now.getYear() < 1000)
      vdate += now.getYear() + 1900
    else
      vdate += now.getYear();
    var vtime="";
    vtime += ((hours < 10) ? "0" : "") + hours;
    vtime += ((minutes < 10) ? ":0" : ":") + minutes;
    vtime += ((seconds < 10) ? ":0" : ":") + seconds;
    

   return vdate;
  }

});