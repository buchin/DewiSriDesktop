// JavaScript Document
$(document).ready(function(){
	$('#backofficemenu ul li a[name="keuangan"]').click(function(){	
		populateKeuanganTable();
		getPosisiKeuanganToday();
		$.blockUI({message:$("#bo-keuangan")});
	});	
	$('#bo-keuangan button[name="printpls"]').click(function(){
		printThisKeuangan("Keuangan", 'css/print.css');
		
		$("#superbakaback").trigger('click');
		});
	function getPosisiKeuanganToday(){
		$.getJSON("http://localhost/ajaxlogin.php?cmd=getPosisiKeuanganToday",function(data){
				//alert(JSON.stringify(data));
				$('#boposisikeuangan').html(JSON.stringify(data));																 
			});
		}
	function populateKeuanganTable(){
		$.getJSON("http://localhost/ajaxlogin.php?cmd=getKeuanganToday",function(data){
			//alert(JSON.stringify(data));
				$("#bokeuangantable").jqGrid({ 
					datatype: "local", 
					height: 250, 
					loadtext:"Loading...",
					colNames:['ID', 'Tanggal','Jenis Transaksi', 'No Invoice','Nominal','Username', 'Remark'], 
					colModel:[ 
							  {name:'id',index:'id', width:60, sorttype:"int"},
							  {name:'tanggal',index:'tanggal', width:100},  
							  {name:'jenis',index:'jenis', width:100}, 
							  {name:'invoice',index:'invoice', width:100}, 
							
							  {name:'nominal',index:'nominal', width:150}, 
							  {name:'username',index:'username', width:100},
							  {name:'remark',index:'remark', width:100}
							  ], 
					multiselect: false, 
					caption: "Transaksi Keuangan Hari Ini",
					onSelectRow: function(id){
						
					}
				}); 
				var oke = 0;
				$("#bokeuangantable").clearGridData();
				$.each(data, function(i,val){
					//alert(JSON.stringify(val));
					$("#bokeuangantable").jqGrid('addRowData', oke,val);
					oke++;
				});
				});
				}
		function printThisKeuangan(htmlTitle, printCSSFile)
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
	}
	
		
});