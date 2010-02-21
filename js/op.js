// JavaScript Document
$(document).ready(function(){
	var gr = $("#opsalusertable").jqGrid('getGridParam','selrow'); 
	$("#opsalreporttable").jqGrid({ 
					datatype: "local", 
					height: 250, 
					loadtext:"Loading...",
					colNames:['ID','Username', 'Tanggal', 'Banyaknya'], 
					colModel:[ 
							  {name:'id',index:'id', width:60, sorttype:"int"}, 
							  {name:'username',index:'username', width:150}, 
							  {name:'completed',index:'completed', width:150},
							  {name:'sesudah',index:'sesudah', width:150}
							  ], 
					multiselect: false, 
					caption: "Sales Report",
					onSelectRow: function(id){
						//var ret = $('#opsalreporttable').jqGrid('getRowData',id);
						//username = ret.username;
						//populateOpSaleReportTable("username");
						//$.blockUI({message:$('#opsalreport')});
					}
				}); 
	$("#operations").click(function(){
		$.blockUI({message:$("#op")});							
	});
	$("#op button[name='supplier']").click(function(){
		$.blockUI({message:$('#opsupp')});
	});
	
	//sales
	$("#op button[name='sales']").click(function(){
		populateOpSalesTable();
		$.blockUI({message:$('#opsal')});
	});
	
	$('#opsal button[name="hari"]').click(function(){
		gr = $("#opsalusertable").jqGrid('getGridParam','selrow'); 
		if(gr!=null){
			var ret = $("#opsalusertable").jqGrid('getRowData',gr);
			populateOpSaleReportTable("hari", ret.username);
			$.blockUI({message:$('#opsalreport')});
			}
		
		$.blockUI({message:$('#opsalreport')});
	});
	
	$('#opsal button[name="minggu"]').click(function(){
		gr = $("#opsalusertable").jqGrid('getGridParam','selrow'); 
		if(gr!=null){
			var ret = $("#opsalusertable").jqGrid('getRowData',gr);
			populateOpSaleReportTable("minggu", ret.username);
			$.blockUI({message:$('#opsalreport')});
			}
		
		
	});
	
	$('#opsal button[name="bulan"]').click(function(){
		gr = $("#opsalusertable").jqGrid('getGridParam','selrow'); 
		if(gr!=null){
			var ret = $("#opsalusertable").jqGrid('getRowData',gr);
			populateOpSaleReportTable("bulan", ret.username);
			$.blockUI({message:$('#opsalreport')});
			}
		
		
	});
	$('#opsal button[name="tahun"]').click(function(){
		var gr = $("#opsalusertable").jqGrid('getGridParam','selrow'); 
		if(gr!=null){
			var ret = $("#opsalusertable").jqGrid('getRowData',gr);
			populateOpSaleReportTable("tahun", ret.username);
			}
		
		$.blockUI({message:$('#opsalreport')});
	});
	
	function populateOpSaleReportTable(date,username){
		
		//var okedeh = new Object();
		//alert(username);
		/*$.getJSON("http://localhost/ajaxlogin.php?cmd=getSettleSumByUser",{data:username}, function(data){
																								 
		});*/
		var okedeh = new Object();
		
		okedeh.date = date;
		okedeh.username = username;
		strJSON = JSON.stringify(okedeh);
		//alert(strJSON);
		$.getJSON("http://localhost/ajaxlogin.php?cmd=getSettleByUserTotal",{data:strJSON}, function(data){
			$("#opsalreporttotal").html(JSON.stringify(data));																						
		});
		$.getJSON("http://localhost/ajaxlogin.php?cmd=getSettleByUser",{data:strJSON}, function(data){
			var oke = 0;
			//$("#opsalreporttotal").html(JSON.stringify(data));
				$("#opsalreporttable").clearGridData();
					$.each(data, function(i,val){
					//alert(JSON.stringify(val));
					$("#opsalreporttable").jqGrid('addRowData', oke,val);
					oke++;
				});													 
		
		});
		}
	<!--awal tambahan -------------------------------------------------------*/
	
	//menu 
	$("#op button[name='menu']").click(function(){
		populateOpMenuTable();
		$.blockUI({message:$('#opmen')});
	});
	
	$('#opmen button[name="reportok"]').click(function(){
		var gr = $("#opmenusertable").jqGrid('getGridParam','selrow'); 
		if(gr!=null){
			var ret = $("#opmenusertable").jqGrid('getRowData',gr);			
			populateOpMenuReportTable(ret.group);
			}
		
		$.blockUI({message:$('#opmenreport')});
	});	
	
	$('#opsal button[name="reportok"]').click(function(){
		var gr = $("#opsalusertable").jqGrid('getGridParam','selrow'); 
		if(gr!=null){
			var ret = $("#opsalusertable").jqGrid('getRowData',gr);
			var date = new Array();
			date.push($('.date_dari .dd_thn').val() + '-' + $('.date_dari .dd_bln').val() + '-' + $('.date_dari .dd_tgl').val());
			date.push($('.date_sampai .dd_thn').val() + '-' + $('.date_sampai .dd_bln').val() + '-' + $('.date_sampai .dd_tgl').val());			
			populateOpSaleReportTable(date, ret.username);
			}
		
		$.blockUI({message:$('#opsalreport')});
	});	
	
	$('#opsalreport button[name="reportprint"]').click(function() {		
		printThisReport("Laporan", 'css/print.css');	
	});	

	$('#opmenreport button[name="reportok"]').click(function(){
		var gr = $("#opmenreporttable").jqGrid('getGridParam','selrow'); 
		if(gr!=null){
			var ret = $("#opmenreporttable").jqGrid('getRowData',gr);
			var date = new Array();
			date.push($('.date_dari .dd_thn').val() + '-' + $('.date_dari .dd_bln').val() + '-' + $('.date_dari .dd_tgl').val());
			date.push($('.date_sampai .dd_thn').val() + '-' + $('.date_sampai .dd_bln').val() + '-' + $('.date_sampai .dd_tgl').val());			
			populateOpMenuSubReportTable(date, ret.namamenu);
			}
		
		$.blockUI({message:$('#opmenureport')});
	});		
	
	function populateOpSaleReportTable(date,username){
		
		//var okedeh = new Object();
		//alert(username);
		/*$.getJSON("http://localhost/ajaxlogin.php?cmd=getSettleSumByUser",{data:username}, function(data){
																								 
		});*/
		var okedeh = new Object();
		
		okedeh.date_dari = date[0];
		okedeh.date_sampai = date[1];
		okedeh.username = username;
		strJSON = JSON.stringify(okedeh);
		//alert(strJSON);
		$.getJSON("http://localhost/ajaxlogin.php?cmd=getSettleByUserTotal",{data:strJSON}, function(data){
			$("#opsalreporttotal").html(JSON.stringify(data));																						
		});
		
		$.getJSON("http://localhost/ajaxlogin.php?cmd=getSettleByUser",{data:strJSON}, function(data){
			var oke = 0;
			//$("#opsalreporttotal").html(JSON.stringify(data));
				$("#opsalreporttable").clearGridData();
					$.each(data, function(i,val){
					//alert(JSON.stringify(val));
					$("#opsalreporttable").jqGrid('addRowData', oke,val);
					oke++;
				});													 
		
		});
		}
		
	function populateOpMenuReportTable(group){		
		$("#opmenreporttable").jqGrid({ 
			datatype: "local", 
			height: 250, 
			loadtext:"Loading...",
			colNames:['Nama Menu'], 
			colModel:[ 					  
					  {name:'namamenu',index:'namamenu', width:150}					  
					  ], 
			multiselect: false, 
			caption: "Pilih Nama Menu",
			onSelectRow: function(id){
				var ret = $('#opmenreporttable').jqGrid('getRowData',id);				
			}
		}); 
		
		var okedeh = new Object();
				
		okedeh.group = group;
		strJSON = JSON.stringify(okedeh);		
		
		$.getJSON("http://localhost/ajaxlogin.php?cmd=getGroupByName",{data:strJSON}, function(data){
			var oke = 0;
			//$("#opsalreporttotal").html(JSON.stringify(data));
			$("#opmenreporttable").clearGridData();
			$.each(data, function(i,val){
				//alert(JSON.stringify(val));
				$("#opmenreporttable").jqGrid('addRowData', oke,val);
				oke++;
			});													 		
		});
	}
	
	function populateOpMenuSubReportTable(date, menu) {
		$("#opmensubreporttable").jqGrid({ 
			datatype: "local", 
			height: 250, 
			loadtext:"Loading...",
			colNames:['id','menu','jumlah','harga'], 
			colModel:[ 					  
					  {name:'id',index:'id', width:60, sorttype:"int"}, 
							  {name:'menu',index:'menu', width:150}, 
							  {name:'jumlah',index:'jumlah', width:150},
							  {name:'harga',index:'harga', width:150}			  
					  ], 
			multiselect: false, 
			caption: "Pilih Nama Menu",
			onSelectRow: function(id){
				var ret = $('#opmensubreporttable').jqGrid('getRowData',id);				
			}
		}); 
		
		var okedeh = new Object();
		
		okedeh.date_dari = date[0];
		okedeh.date_sampai = date[1];
		okedeh.menu = menu;
		strJSON = JSON.stringify(okedeh);		
		
		$.getJSON("http://localhost/ajaxlogin.php?cmd=getOrderMenuByName",{data:strJSON}, function(data){
			var oke = 0;
			//$("#opsalreporttotal").html(JSON.stringify(data));
			$("#opmensubreporttable").clearGridData();
			$.each(data, function(i,val){
				//alert(JSON.stringify(val));
				$("#opmensubreporttable").jqGrid('addRowData', oke,val);
				oke++;
			});													 		
		});
	}
		
	/*------------------------------------------------------- akhir tambahan ------------------------------------------------------*/
	
	function populateOpSalesTable(){
		$("#opsalusertable").jqGrid({ 
					datatype: "local", 
					height: 250, 
					loadtext:"Loading...",
					colNames:['ID','Username', 'Jabatan'], 
					colModel:[ 
							  {name:'id',index:'id', width:60, sorttype:"int"}, 
							  {name:'username',index:'username', width:150}, 
							  {name:'role',index:'role', width:150}
							  ], 
					multiselect: false, 
					caption: "Pilih Username",
					onSelectRow: function(id){
						var ret = $('#opsalusertable').jqGrid('getRowData',id);
						//username = ret.username;
						//populateOpSaleReportTable(username);
						//$.blockUI({message:$('#opsalreport')});
					}
				}); 
		$.getJSON("http://localhost/ajaxlogin.php?cmd=getAllKaryawan", function(data){
			var oke = 0;
				$("#opsalusertable").clearGridData();
					$.each(data, function(i,val){
					//alert(JSON.stringify(val));
					$("#opsalusertable").jqGrid('addRowData', oke,val);
				
					oke++;
				});	
					$("#opsalusertable").jqGrid('addRowData', oke,{"username":"semua"});
		
		});
	}
/*------------------------------------------------------- awal tambahan -------------------------------------------------------*/
	
	function populateOpMenuTable(){
		$("#opmenusertable").jqGrid({ 
			datatype: "local", 
			height: 250, 
			loadtext:"Loading...",
			colNames:['Group'], 
			colModel:[ 					  
					  {name:'group',index:'group', width:150}					  
					  ], 
			multiselect: false, 
			caption: "Pilih Grup Menu",
			onSelectRow: function(id){
				var ret = $('#opmenusertable').jqGrid('getRowData',id);						
			}
		}); 
				
		$.getJSON("http://localhost/ajaxlogin.php?cmd=getAllGroup", function(data){
			var oke = 0;
			$("#opmenusertable").clearGridData();
			$.each(data, function(i,val) {
				//alert(JSON.stringify(val));
				$("#opmenusertable").jqGrid('addRowData', oke,val);
			
				oke++;
			});	
			$("#opmenusertable").jqGrid('addRowData', oke,{"group":"semua"});			
		});
	}
	
	function printThisReport(htmlTitle, printCSSFile)
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
		locHTML = $('#opsalreport').html();
	
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
	
	/*------------------------------------------------------- akhir tambahan -----------------------------------------------------*/

});