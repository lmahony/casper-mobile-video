var device = DEVICES.WIN_8;
casper.options.pageSettings.userAgent = device.ua;
var params = {"device": device};

casper.start(url, function() {
	initVideoTests(params);
	casper.clear();
});

  
casper.run(function() {
	this.test.done();
});