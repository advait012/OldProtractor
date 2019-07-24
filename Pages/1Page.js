var baseclass=require('../BaseClass/BaseClass.js');
var excel=require('../Excel/excel.js');
var Q=require('q');

			var loginPage=function(){
	
	var ex=new excel();
	var username=$('input#username');
	var password=$('input#password');
	var button=$('button.btn.btn-danger');
	var userdesc=element(by.model('model[options.key]'));
	var logout=element(by.tagName('a'));
	var home=element(by.tagName('h1'));
	var base= new baseclass();
	this.enterValue=function()
	{
		username.sendKeys("angular");
		password.sendKeys("password");
		browser.waitForAngular(true);
		userdesc.sendKeys("ads");
		button.click();
		var caseStatus=[];
		home.getText().then(function(text){
			  caseStatus.push(text);
			})
		
			console.log(caseStatus);
		logout.click();	
		
	};
};

module.exports=  loginPage
