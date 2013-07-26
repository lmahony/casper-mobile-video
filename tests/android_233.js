var device = DEVICES.ANDROID_233;
casper.options.pageSettings.userAgent = device.ua;

casper.start(url, function() {
	initVideoTests({"device": device, "bing": false});
	casper.clear();
});

casper.thenOpen(urlB, function() {
	initVideoTests({"device": device, "bing": true});
	casper.clear();
});


casper.run(function() {
	this.test.done();
});
