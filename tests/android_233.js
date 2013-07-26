var device = DEVICES.ANDROID_233;
casper.options.pageSettings.userAgent = device.ua;

casper.start(url, function() {
	var params = {"device": device};
	initVideoTests(params);
	casper.clear();
});


casper.run(function() {
	this.test.done();
});
