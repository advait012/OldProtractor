// An example configuration file.
exports.config = {
  directConnect: true,
  seleniumAddress:'http://localhost:4444/wd/hub',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',
  	
  // Spec patterns are relative to the current working directory when
  // protractor is called.
//  specs: ['../Tests/*.js'],
  specs: ['../Tests/1Test.js'],
  
  params:require('../TestData/TestData.json'),
  
  onPrepare: function() {
	  

	    	
	    
	  var HtmlReporter = require('protractor-beautiful-reporter');
	  jasmine.getEnv().addReporter(new HtmlReporter({
	         baseDirectory: 'tmp/screenshots'
	      }).getJasmine2Reporter());
	    browser.driver.manage().window().maximize();
	    browser.ignoreSynchronization=false;
	    
	    
  },

  // Options to be passed to Jasmine.
  jasmineNodeOpts:	 {
    defaultTimeoutInterval: 30000
  }
}
