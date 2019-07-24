var wait =function()
{
	var ec=protractor.ExpectedConditions;
	this.waitTillPresent=function(element){
		browser.wait(ec.visibiltyOf(element),5000);
	}
	this.waitTillElementClickable=function(element){
		browser.wait(ec.ElementToBeClickable(element),5000);
	}
	
	}
module.exports=wait