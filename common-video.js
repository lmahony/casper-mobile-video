var ENV, url, domain, videoUrl, screenshotBase, screenshotFile;


function testHeader() {
	casper.test.assertExists("#aol-header");
	casper.test.assertExists("#quick-nav-global");
	casper.test.assertExists("#usrMnu");
}

function testFooter() {
	casper.test.assertExists("#ftlinks");
}
function testBingPageElements() {
	casper.test.assertExists("#bing-search");
	casper.test.assertVisible(".bingSearchImg");
	casper.test.assertVisible(".bingSearchLogo");
}

function testVideoPage() {
	takeScreenshot();
	casper.test.assertNotExists("div.novideosupport");
	casper.test.assertExists("#video5min");
	casper.test.assertExists("p.video-title");
	casper.test.assertTruthy(casper.fetchText("p.video-title"), "Video Title has content");
	casper.test.assertExists("p.video-description");
	casper.test.assertTruthy(casper.fetchText("p.video-description"), "Video description has content");
	
	casper.test.assertExists("#mobile-videopage-playlist");
	if (device.swipe) {
		casper.test.assertExists("div.videoplaylistscroller");
	} else {
		casper.test.assertNotExists("div.videoplaylistscroller");
	}  
	
	casper.test.assertExists("#vidseemore");
	casper.click("#vidseemore");
	casper.test.assertSelectorHasText("#vidseemore", "See Less");
	casper.click("#vidseemore");
	casper.test.assertSelectorHasText("#vidseemore", "See More");
	
	
	casper.waitForSelector("#SmartPlayer_0", function() {
		takeScreenshot();
	}, function timeout() {
		casper.echo("Timed out waiting for video ");
	}, 10000);
}

function testVideoNotSupportedPage() {
	takeScreenshot();
	casper.test.assertNotExists("#video5min");
	casper.test.assertNotExists("p.video-title");
	casper.test.assertNotExists("p.video-description");
	casper.test.assertNotExists("#vidseemmore");
	casper.test.assertNotExists("#mobile-videopage-playlist");
	casper.test.assertExists("div.novideosupport");
	casper.test.assertTruthy(casper.fetchText("div.novideosupport"), "Not supported message has content");
	
}

function testTitle() {
	casper.test.assertSelectorHasText("title", "AOL"); 
	if (device.video) casper.test.assertSelectorHasText("title", "Video"); 
}

function testDL() {
	casper.test.assertExists("#dlw");
	casper.test.assertVisible("#dlw");
}

function takeScreenshot() {
	screenshotFile = screenshotBase + device.title + (this.video?"-v":"") + (this.bing?"-b":"") + ".png";
	casper.capture(screenshotFile);
	casper.echo("Screenshot: " + screenshotFile);
}

function initVideoTests(paramsObject) {
	for (var obj in paramsObject) {
		this[obj] = paramsObject[obj];
	}
	this.video = true;
	casper.echo("                    ");
	casper.echo(" **** Video Page Test **** ");
	casper.echo("URL    : " + casper.getCurrentUrl());
	casper.echo("Device : " + device.title);
	casper.echo("                    ");
	
	testTitle()
	
	testHeader();
	
	testFooter();
	
	if (paramsObject.bing) {
		testBingPageElements();
	}
	
	casper.mouseEvent('mouseover', '#ftlinks');
	
	if (device.video) {
		casper.echo("Look for video");
		testVideoPage();	
	} else {
		casper.echo("Look for no video");
		testVideoNotSupportedPage();
	}
	
}

function initTest(paramsObject) {

	for (var obj in paramsObject) {
		this[obj] = paramsObject[obj];
	}
	
	casper.echo("                    ");
	casper.echo(" **** Page Test **** ");
	casper.echo("URL    : " + casper.getCurrentUrl());
	casper.echo("Device : " + device.title);
	casper.echo("                    ");
	
	testTitle()

	testHeader();
	
	testFooter();
	
	if (paramsObject.bing) {
		testBingPageElements();
	}
	
	testDL();
	
	casper.mouseEvent('mouseover', '#ftlinks');
	
	takeScreenshot();
}
