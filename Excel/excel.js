
var excel = require('exceljs');

var excelActions= function(){
	
	

	this.readexcel=function(){
		var workbook = new excel.Workbook();
	var getCellValue = workbook.xlsx.readFile("./Excel/Auto.xlsx").then(function() {
			var worksheet = workbook.getWorksheet('Master');
			var row =worksheet.getRow(1);
			var cellValue=row.getCell(1);
		     return cellValue.value;
			  
		});
		return getCellValue; 
	}
	
	this.writeExcel=function(){
		var workbook = new excel.Workbook();
		workbook.xlsx.readFile("./Excel/Auto.xlsx").then(function() {
				var worksheet = workbook.getWorksheet('Master');
				var row =worksheet.getRow(1);
				row.getCell(2).value="sharma";
				row.commit();
				return workbook.xlsx.writeFile("./Excel/Auto.xlsx");
			    
				  
			});
			 
		}
	
};
	module.exports=  excelActions