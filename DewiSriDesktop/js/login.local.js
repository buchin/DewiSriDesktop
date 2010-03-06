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
	$.blockUI({ message: $('#formlogin') }); 
	
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
		
		url = "http://localhost/ajaxlogin.php?username="+username+"&password="+password+"&cmd=login";
		//alert(url);
		/*url+="login.php?username=";
		url+=username;
		url+='&password=';
		url+=password;
		alert(url);*/
		$.getJSON(url, dataJSON,function(data){
			//alert(data);
			//alert(data.username);
			//alert(data.role);
			//alert(data.loginstatus);
			$.blockUI('tunggu sebentar...');
			if(data.loginstatus == 'sukses' || data.loginstatus == 'user telah login'){
				$.blockUI('login berhasil');
				$.blockUI({ message: $('#menu') });
			}
			else{
				$.blockUI({message:data.loginstatus});
				}
		});
	
	$("#exitprogram").click(function(){
		var url = "http://localhost/ajaxlogin.php?cmd=logout";
		$.getJSON(url,function(data){
			//$.blockUI(data.loginstatus);
			$.growlUI('Login Status', data.loginstatus);
			$.blockUI({message: $('#confirmclose') });
			
		});
										 
	});
	
	$('#confirmclose-ya').click(function(){
		win.close();
	});
	
	$('#confirmclose-no').click(function(){
		$('#username').val("");
		$('#password').val("");
		$.blockUI({message:$('#formlogin')});
	});
	
	$('#dinein').click(function(){
			$('#layoutmejalesehan').show('normal');
		
			getmeja("lesehan");
			getmeja("pendopo");
			$.blockUI({message:$('#pilihmeja')});
			ordertype="dinein";
	});
	
	$("#takehome").click(function(){
		ordertype="takehome";
		$.unblockUI();						  
		$('#grupmakanan').show('slow');
		//populate group
		populateGroup();							 
	});
	
	
	$("#drivethru").click(function(){
		ordertype="drivethru";
		$.unblockUI();						  
		$('#grupmakanan').show('slow');
		//populate group
		populateGroup();							 
	});
	
	$("#delivery").click(function(){
		ordertype="delivery";
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
	});
	$('#pilihmeja .menustyle ul li a').click(function(){
		namameja = $(this).html();
		//alert("namameja:"+namameja);
		$.unblockUI();
		
		//hilangkan semua dari tampilan
		$("#layoutmejapendopo").hide('slow');
		$("#layoutmejalesehan").hide('slow');
		//tampilkan grup makanan
		$('#grupmakanan').show('slow');
		//populate group
		
		populateGroup();
		//$.getJSON(
		
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
		//alert(group);
		$('#grupmakanan').hide('slow');
		$("#nota").hide();
		$('#menumakanan').show('slow');
		populatemenu(group);											 
	});
	
	$("#menumakanan ul li a").live("click",function(){
		menu[menu.length]=$(this).html();
		harga[harga.length]=$(this).attr("title");
		//menu+=":"
		$.blockUI({message: $("#inputnomor"), css:{'width':'200px'}});
		//alert(order);
		$('#menumakanan').hide();	
		$('#grupmakanan').hide();
		//populategroup();
	});
	
	$("#inputnomor ul li a").click(function(){
		jumlahorder += $(this).html();
		$("#nomorinputinput").val(jumlahorder);
	});
	
	$("#inputnomor button").click(function(){
		//alert(menu);
		nomorinput[nomorinput.length]=jumlahorder;
		//reset nomorinputinput dan nomorinput
		jumlahorder=""
		$("#nomorinputinput").val("");
		$.unblockUI();
		$("#nota table").html('<th>Nama Item</th>	<th>banyaknya</th> 	<th>harga</th>	<th>Jumlah</th>');
		for (i=0;i<menu.length;i++){
			//alert(menu[i]);
			//alert(nomorinput[i]);
			total += harga[i]*nomorinput[i];
			$("#nota table").append('<tr><td>'+menu[i]+'</td>'+'<td>'+nomorinput[i]+'</td>'+'<td>'+harga[i]+'</td>'+'<td>'+harga[i]*nomorinput[i]+'</td></tr>');
			}
		//alert(total);
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
	});
	
	
	$("#recall").click(function(){
		//alert("recall");
		$.blockUI({message:$("#recalldetail")});
	});
	
	$("#recalldetail ul li a").click(function(){
		//alert($(this).attr("name"));
		recallperintah = $(this).attr("name");
		$.blockUI({message:$("#recall-open")});
		
	});
	
	$("#recall-open ul li a").click(function(){
		recallperintah2 = $(this).attr("name");
		recall.ordertype = recallperintah;
		recall.status = recallperintah2;
		strJSON = JSON.stringify(recall);
		//alert(strJSON);
		$.getJSON("http://localhost/ajaxlogin.php?cmd=recall", {data:strJSON}, function(data){
			//alert(JSON.stringify(data));
			$.blockUI({message:$("#recallgrid"), css:{width:'50%'}});	
			$("#recalltable").jqGrid({ 
				datatype: "local", 
				height: 250, 
				colNames:['ID','Order Type', 'Pegawai', 'Open','Completed','Delivery','Meja' ,'Status'], 
				colModel:[ 
						  {name:'id',index:'id', width:60, sorttype:"int"}, 
						  {name:'ordertype',index:'ordertype', width:90}, 
						  {name:'username',index:'username', width:100}, 
						  {name:'open',index:'open', width:80},
						  {name:'completed',index:'completed', width:80}, 
						  {name:'delivery',index:'delivery', width:100}, 
						  {name:'namameja',index:'namameja', width:50},
						  {name: 'status', index: 'status', width:80}
						  ], 
				multiselect: false, 
				caption: "Recall" 
			}); 
			var oke = 0;
			$.each(data, function(i,val){
				//alert(JSON.stringify(val));
				$("#recalltable").jqGrid('addRowData', oke,val);
				oke++;
			});
			
		});
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
		alert("void");							
	});
	
	$("#settle").click(function(){
		alert("settle");							
	});
	
	$("#nosale").click(function(){
		alert("nosale");							
	});
	
	$("#payout").click(function(){
		alert("payout");							
	});
	
	$("#refund").click(function(){
		alert("refund");							
	});
	
	$("#credit").click(function(){
		alert("credit");							
	});
	
	$("#giftcertificate").click(function(){
		alert("Gift Certificate");							
	});
	
	$("#cashierin").click(function(){
		//alert("cashierin");
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
		//alert(totalsetoranuang);
	});
	
	$("#setorduit button").click(function(){
		$.blockUI({message:$("#konfirmasicashierin")});
	});
	
	$("#konfirmasicashierin button[name='ya']").click(function(){
		//clear the input
		//$("#setorduit ol li input").val("");
		strJSON = JSON.stringify(setoranuang);
		//alert(strJSON);
		switch(cashier){
			case "in":
				$.getJSON("http://localhost/ajaxlogin.php?cmd=cashierin", {data:strJSON, total:totalsetoranuang}, function(data){
					alert("cashier in "+data.status);	
					totalsetoranuang = 0;
					$(".menuutama").trigger("click");
					$("#cashierin,#cashierinlabel").toggle();
					$("#cashierout,#cashieroutlabel").toggle();
					//$("#cashierout").show();
				});
			break;
			case "out":
				$.getJSON("http://localhost/ajaxlogin.php?cmd=cashierout", {data:strJSON, total:totalsetoranuang}, function(data){
					alert("cashier out "+data.status);	
					totalsetoranuang=0;
					
					$(".menuutama").trigger("click");	
					$("#cashierout,#cashieroutlabel").toggle();
					$("#cashierin,#cashierinlabel").toggle();
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
		//alert("cashierout");	
		cashier = "out";
		$.blockUI({message: $("#setorduit")});
	});
	
	$("#timecard").click(function(){
		alert("timecard");							
	});
	
	$("#operations").click(function(){
		alert("operations");							
	});
	
	$("#backoffice").click(function(){
		alert("backoffice");							
	});
	
	$("#selesaimemesan").live("click", function(){
		order.ordertype = ordertype;
		order.menu = menu;
		order.harga = harga;
		order.jumlah = nomorinput;
		order.namameja = namameja;
		order.delivery = alamatdelivery;
		strJSON = JSON.stringify(order);
		alert(strJSON);
		$.getJSON("http://localhost/ajaxlogin.php?cmd=orderbaru",{data:strJSON},function(data){
			alert("status: "+data.status);
		});
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
				//alert(JSON.stringify(val));
				$("#pegawaitable").jqGrid('addRowData', oke,val);
				oke++;
			});
			});
		}
	
	function populateGroup(){
		url = "http://localhost/ajaxlogin.php?cmd=populategroup";
		$("#grupmakanan ul").html('<li><a href="#" class="menuutama" id="selesaimemesan">Selesai</a></li>');
		$.getJSON(url,function(data){
			$.each(data, function(i,val){
				$("#grupmakanan ul").append('<li><a href="#">'+val+'</a></li>');
				
			});					   
		});
		$("#notanamameja").html("Meja: "+namameja);
		
		
		//alert(namameja);
		//alert(order);
		
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
	}
});