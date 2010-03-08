// JavaScript Document
$(document).ready(function(){
	$("#print").click(function(){
		populatePrintTable();
		$.blockUI({message:$('#printcontainer'),css:{'width':'450px'}});					   
	});	
	
	var i=0;
	function displayCount(){
		$.getJSON("http://localhost/ajaxlogin.php?cmd=getUnprintedCount", function(data){
				$("#printcount").html(data[0].jumlah);
				var jumlah = parseInt(data[0].jumlah);
				printUnprinted(jumlah);
			});
			setTimeout(function(){
				displayCount(i);
			},30000);
	}
	displayCount();
	
	function printUnprinted (jumlah) {
		if (jumlah>0) { 
			//get all unprinted order id
			$.getJSON("http://localhost/ajaxlogin.php?cmd=getUnprintedOrderID", function(data){
				//loop trhough order id, get order details
				
					$.each(data, function (i,val) {
					// body...
					
						populateautonota(val.orderid);
						setTimeout(function(){
							var order = new Object();
							order.id = val.orderid;
							order.printstatus = "printed";
							strJSON = JSON.stringify(order);
							$.getJSON("http://localhost/ajaxlogin.php?cmd=setPrintStatus",{data:strJSON}, function(data){
								//////alert(JSON.stringify(data));
								//alert("printed");
							});
						},5000);
					
					
					//
				});
				
				
			});
			
		};
	}
	
	$('#printcontainer button[name="printpls"]').click(function(){
		printThis("Nota Pesanan", 'css/print.css');	
		var gr = $("#prtable").jqGrid('getGridParam','selrow'); 
		if(gr!=null){
			var ret = $("#prtable").jqGrid('getRowData',gr);
			var order = new Object();
			order.id = ret.id;
			order.printstatus = "printed";
			strJSON = JSON.stringify(order);
			$.getJSON("http://localhost/ajaxlogin.php?cmd=setPrintStatus",{data:strJSON}, function(data){
				//////alert(JSON.stringify(data));
				$("#print").trigger('click');
			});
			
			}
	});	
	
		function populateautonota(orderid){
			var menu= new Array();
			var harga= new Array();
			var nomorinput= new Array();
			var remark= new Array();

			//<p id="totalharga"></p>
			$('#autonotatotalharga').html('');
	//        <p id="autonotadiskon"></p>
			$('#autonotadiskon').html('');
	//        <p id="autonotappn"></p>
			$('#autonotappn').html('');
	//        <p id="autonotacash"></p>
			$('#autonotacash').html('');
	//        <p id="autonotakembali"></p>
			$('#autonotakembali').html('');
	//        <p>Harga Setelah PPN dan Diskon:<strong><span id="hargasetelahppndandiskon"></span></strong></p>
			$('#autonotahargasetelahppndandiskon').html('');

			////////alert(orderid);
			$.getJSON("http://localhost/ajaxlogin.php?cmd=getUnprintedMenuByOrderID",{data:orderid},function(data){
					////////alert(JSON.stringify(data));	
					//fill the variables
					//clear variables
					/*menu.length = 0;
					harga.length = 0;
					nomorinput.length = 0;
					remark.length = 0;*/
					$.each(data, function(i,val){
						menu[menu.length] = val.menu;
						harga[harga.length] = val.harga;
						////alert(JSON.stringify(val));
						nomorinput[nomorinput.length] = val.jumlah;
						remark[remark.length] = val.remark;
					});
					$.each(harga, function(i,data){
							//alert(data);
						})
					////alert(JSON.stringify());
					////////alert(JSON.stringify(menu)+" " + JSON.stringify(harga)+" " + JSON.stringify(nomorinput)+" " + JSON.stringify(remark)+" ");
					total = 0;
					////////alert(menu.length);
				$("#autonota table").html('<th>Nama Item</th>	<th>Qty</th> 	<th>Harga</th>	<th>Jumlah</th>');
					for (i=0;i<menu.length;i++){
						////////alert(menu[i]);
						////////alert(nomorinput[i]);
						total += parseInt(harga[i]*nomorinput[i]);
						$("#autonota table").append('<tr><td>'+menu[i]+'<br/>'+remark[i]+'</td>'+'<td>'+nomorinput[i]+'</td>'+'<td>'+(harga[i])+'</td>'+'<td>'+harga[i]*nomorinput[i]+'</td></tr>');
						}
					////////alert(total);
				$("#autonotatotalharga").html("Total: Rp."+total);

				}); 
			$.getJSON("http://localhost/ajaxlogin.php?cmd=getOrderByID",{data:orderid},function(data){
				////alert(JSON.stringify(data));
				$.each(data, function(i,val){
					////alert(i+" "+val);	
					//<p id="autonotanamameja"></p>
				$('#autonotanamameja').html("Nama Meja: "+ val.namameja);
	//        <p id="autonotausername"></p>
				$('#autonotausername').html("User: "+ val.username);
				$('#autonotajmltamu').html("Jumlah Tamu: "+ val.jumlahtamu+"");

				});

			});
			//$('#autonota').show();
			setTimeout(function(){
				autoprintThis("Nota Pesanan", 'css/print.css');	
			},3000);
			}
	
	function populateNota(orderid){
		var menu= new Array();
		var harga= new Array();
		var nomorinput= new Array();
		var remark= new Array();
		
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
		
		////////alert(orderid);
		$.getJSON("http://localhost/ajaxlogin.php?cmd=getUnprintedMenuByOrderID",{data:orderid},function(data){
				////////alert(JSON.stringify(data));	
				//fill the variables
				//clear variables
				/*menu.length = 0;
				harga.length = 0;
				nomorinput.length = 0;
				remark.length = 0;*/
				$.each(data, function(i,val){
					menu[menu.length] = val.menu;
					harga[harga.length] = val.harga;
					////alert(JSON.stringify(val));
					nomorinput[nomorinput.length] = val.jumlah;
					remark[remark.length] = val.remark;
				});
				$.each(harga, function(i,data){
						//alert(data);
					})
				////alert(JSON.stringify());
				////////alert(JSON.stringify(menu)+" " + JSON.stringify(harga)+" " + JSON.stringify(nomorinput)+" " + JSON.stringify(remark)+" ");
				total = 0;
				////////alert(menu.length);
			$("#nota table").html('<th>Nama Item</th>	<th>Qty</th> 	<th>Harga</th>	<th>Jumlah</th>');
				for (i=0;i<menu.length;i++){
					////////alert(menu[i]);
					////////alert(nomorinput[i]);
					total += parseInt(harga[i]*nomorinput[i]);
					$("#nota table").append('<tr><td>'+menu[i]+'<br/>'+remark[i]+'</td>'+'<td>'+nomorinput[i]+'</td>'+'<td>'+(harga[i])+'</td>'+'<td>'+harga[i]*nomorinput[i]+'</td></tr>');
					}
				////////alert(total);
			$("#totalharga").html("Total: Rp."+total);
			
			}); 
		$.getJSON("http://localhost/ajaxlogin.php?cmd=getOrderByID",{data:orderid},function(data){
			////alert(JSON.stringify(data));
			$.each(data, function(i,val){
				////alert(i+" "+val);	
				//<p id="notanamameja"></p>
			$('#notanamameja').html("Nama Meja: "+ val.namameja);
//        <p id="notausername"></p>
			$('#notausername').html("User: "+ val.username);
			$('#notajmltamu').html("Jumlah Tamu: "+ val.jumlahtamu+"");
			
			});
			
		});
		$('#nota').show();
		}
	function populatePrintTable(){
		$("#prtable").jqGrid({ 
					datatype: "local", 
					height: 250, 
					loadtext:"Loading...",
					colNames:['ID','Username', 'Nama Meja', 'Order Type', 'status','Print Status'], 
					colModel:[ 
							  {name:'id',index:'id', width:60, sorttype:"int"}, 
							  {name:'username',index:'username', width:80}, 
							  {name:'namameja',index:'namameja', width:40},
							  {name:'ordertype',index:'ordertype', width:100},
							  {name:'status',index:'status', width:80},
							  {name:'printstatus',index:'printstatus', width:80}
							  ], 
					multiselect: false, 
					caption: "Pilih Username",
					onSelectRow: function(id){
						var ret = $('#prtable').jqGrid('getRowData',id);
						populateNota(ret.id);
						//username = ret.username;
						//populateOpSaleReportTable(username);
						//$.blockUI({message:$('#opsalreport')});
					}
				}); 
		$.getJSON("http://localhost/ajaxlogin.php?cmd=getUnprinted", function(data){
				var oke = 0;
				$("#prtable").clearGridData();
					$.each(data, function(i,val){
					////////alert(JSON.stringify(val));
					$("#prtable").jqGrid('addRowData', oke,val);
				
					oke++;
				});	
			});
		}
		/*function fillNota(menu, harga, nomorinput){
			
			}*/
			
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
		$('#notajmltamu').html("");
	}
	function autoprintThis(htmlTitle, printCSSFile)
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
	locHTML = $('#autonota').html();

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

	//<p id="autonotanamameja"></p>
	$('#autonotanamameja').html('');
	//        <p id="autonotausername"></p>
	$('#autonotausername').html('');
	//<p id="totalharga"></p>
	$('#autonotatotalharga').html('');
	//        <p id="autonotadiskon"></p>
	$('#autonotadiskon').html('');
	//        <p id="autonotappn"></p>
	$('#autonotappn').html('');
	//        <p id="autonotacash"></p>
	$('#autonotacash').html('');
	//        <p id="autonotakembali"></p>
	$('#autonotakembali').html('');
	//        <p>Harga Setelah PPN dan Diskon:<strong><span id="hargasetelahppndandiskon"></span></strong></p>
	$('#autonotahargasetelahppndandiskon').html('');
	$('#autonotajmltamu').html("");
	}
	
});