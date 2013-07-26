casper.test.begin("VZW Mobile Video Page Verification", function suite(test) {
	
	var device, domain, videoUrl, screenshotFile;
	
	
	if (!casper.cli.has("domain")) {
		casper.echo('Usage: casperjs --domain=XX --device==XX --include XX test test-mobilevideo.js');
		casper.echo('--domain= test mobile video page <some URL domain (qa, stage, prod...>');
		casper.exit();
	}
	if (casper.cli.has("device")) {
		device = DEVICES[casper.cli.get("device").toUpperCase()];
	}
	if (device == null) {
		casper.echo("No valid device supplied, defaulting to android 233");
		casper.echo("specifiy a device --device=XXX");
		device = DEVICES.ANDROID_233;
	}
	casper.echo("User Agent: " + device.ua);
	
	casper.options.pageSettings.userAgent = device.ua;

	domain = casper.cli.get("domain");
	if (domain.indexOf("http://") != 0 ) domain = "http://" + domain;
	var videoUrl = "/video/newly-released-footage-from-kate-uptons-sports-illustrated-shoot/517854257/";
	var url = domain + videoUrl;
	
	casper.echo("URL: " + url);
	
	casper.start(url, function() {
		//test.assertSelectorHasText("title", "Video"); // page title changed!!
		
		test.assertExists("#ftlinks");
		this.mouseEvent('mouseover', '#ftlinks');
		
		if (device.video) {
			test.assertNotExists("div.novideosupport");
			test.assertExists("#video5min");
			test.assertExists("p.video-title");
			test.assertTruthy(this.fetchText("p.video-title"), "Video Title has content");
			test.assertExists("p.video-description");
			test.assertTruthy(this.fetchText("p.video-description"), "Video description has content");
			
			test.assertExists("#mobile-videopage-playlist");
			if (device.swipe) {
				test.assertExists("div.videoplaylistscroller");
			} else {
				test.assertNotExists("div.videoplaylistscroller");
			}  
			
			test.assertExists("#vidseemore");
			this.click("#vidseemore");
			test.assertSelectorHasText("#vidseemore", "See Less");
			this.click("#vidseemore");
			test.assertSelectorHasText("#vidseemore", "See More");
			
			
			casper.waitForSelector("#SmartPlayer_0", function() {
				screenshotFile = "grabs/screenshot-" + casper.cli.get("device").toUpperCase() + "-" + new Date().getTime() + ".png";
				this.capture(screenshotFile);
			}, function timeout() {
				this.echo("Timed out waiting for video ");
			}, 10000);
			
			
			
		} else {
			test.assertNotExists("#video5min");
			test.assertExists("div.novideosupport");
			screenshotFile = "grabs/screenshot-" + casper.cli.get("device").toUpperCase() + "-" + new Date().getTime() + ".png";
			this.capture(screenshotFile);
		}
	});

	
	
	casper.run(function() {
        test.done();
    });
	
});
