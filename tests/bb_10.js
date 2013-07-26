var device = DEVICES.BB_10;
casper.options.pageSettings.userAgent = device.ua;

casper.start(url, function() {
	initVideoTests({"device": device, "bing":false});
	casper.clear();
});


casper.run(function() {
	this.test.done();
});