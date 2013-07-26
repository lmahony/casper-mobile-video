casper.test.begin("VZW Mobile Video Page Verification", function suite(test) {
	/* casperjs --domain=portal-qa1.m.verizon.aol.com --device=ANDROID_233 --includes=_devices.js test test-mobilevideo2.js */
	
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
	screenshotFile = "../../casper-screenshots/" + new Date().getTime() + "/" + device.title + ".png";
	casper.echo("URL: " + url);
	
	function testHeader() {
		test.assertExists("#aol-header");
		test.assertExists("#quick-nav-global");
		test.assertExists("#usrMnu");
	}
	
	function testFooter() {
		test.assertExists("#ftlinks");
	}
	
	function testVideoPage() {
		test.assertNotExists("div.novideosupport");
		test.assertExists("#video5min");
		test.assertExists("p.video-title");
		test.assertTruthy(casper.fetchText("p.video-title"), "Video Title has content");
		test.assertExists("p.video-description");
		test.assertTruthy(casper.fetchText("p.video-description"), "Video description has content");
		
		test.assertExists("#mobile-videopage-playlist");
		if (device.swipe) {
			test.assertExists("div.videoplaylistscroller");
		} else {
			test.assertNotExists("div.videoplaylistscroller");
		}  
		
		test.assertExists("#vidseemore");
		casper.click("#vidseemore");
		test.assertSelectorHasText("#vidseemore", "See Less");
		casper.click("#vidseemore");
		test.assertSelectorHasText("#vidseemore", "See More");
		
		
		casper.waitForSelector("#SmartPlayer_0", function() {
			casper.capture(screenshotFile);
		}, function timeout() {
			casper.echo("Timed out waiting for video ");
		}, 10000);
	}
	
	function testVideoNotSupportedPage() {
		test.assertNotExists("#video5min");
		test.assertNotExists("p.video-title");
		test.assertNotExists("p.video-description");
		test.assertNotExists("#vidseemmore");
		test.assertNotExists("#mobile-videopage-playlist");
		test.assertExists("div.novideosupport");
		test.assertTruthy(casper.fetchText("div.novideosupport"), "Not supported message has content");
		casper.capture(screenshotFile);
	}
	
	function testVideoPageContent(that) {
		/* title */
		test.assertSelectorHasText("title", "Video"); 
		
		testHeader();
		
		testFooter();
		
		casper.mouseEvent('mouseover', '#ftlinks');
		
		if (device.video) {
			testVideoPage();
				
		} else {
			testVideoNotSupportedPage();
		}
		
		casper.echo("Screenshot: " + screenshotFile);
	}
	
	casper.start(url, function() {
		testVideoPageContent(this);
	});

	
	
	casper.run(function() {
        test.done();
    });	
	
});
