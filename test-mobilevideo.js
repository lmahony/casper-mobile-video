casper.test.begin("VZW Mobile Video Page Verification", function suite(test) {
	/* casperjs --domain=portal-qa1.m.verizon.aol.com --includes=_devices.js test test-mobilevideo3.js */
	
	var device, domain, videoUrl, screenshotBase, screenshotFile;
	
	
	if (!casper.cli.has("domain")) {
		casper.echo('Usage: casperjs --domain=XX --include _devices.js test test-mobilevideo3.js');
		casper.echo('--domain= test mobile video page <some URL domain (qa, stage, prod...>');
		casper.exit();
	}

	domain = casper.cli.get("domain");
	if (domain.indexOf("http://") != 0 ) domain = "http://" + domain;
	var videoUrl = "/video/newly-released-footage-from-kate-uptons-sports-illustrated-shoot/517854257/";
	var url = domain + videoUrl;
	
	var screenshotBase = "screenshots/" + new Date().getTime() + "/";
	
	
	
	
	device = DEVICES.ANDROID_15;
	casper.options.pageSettings.userAgent = device.ua;
	casper.start(url, function() {
		testVideoPageContent(this);
		
		this.clear();
		device = DEVICES.ANDROID_233;
		casper.options.pageSettings.userAgent = device.ua;
		
		this.reload(function() {
			testVideoPageContent(this);
			
			this.clear();
			device = DEVICES.WIN_8;
			casper.options.pageSettings.userAgent = device.ua;
			this.reload(function() {
				testVideoPageContent(this);
			});
		});
		
	});
	

	casper.run(function() {
		test.done();
	});
	

	
});
