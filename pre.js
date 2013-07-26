casper.start();

casper.then(function() {
		
	if (!casper.cli.has("env")) {
		casper.echo('Usage: casperjs --env=QA1 --include=_config.js test tests/');
		casper.exit();
	}

	ENV = ENVIRONMENTS[casper.cli.get("env").toUpperCase()];
	if (!ENV) {
		casper.echo("That environment is not configured... > " + casper.cli.get("env"));
		casper.echo("check _config.js");
		casper.exit();
	}

	videoUrl = VIDEOS[0].url;
	url = ENV.url + videoUrl;
	urlB = ENV.urlBing + videoUrl;
	
	var d = new Date().toISOString().split(":").join("");
	if (casper.cli.has("scr")) {
		screenshotBase = casper.cli.has("scr") + "/" + d + "/";
	} else {
		screenshotBase = "../screenshots/" + d + "/";
	}
	
});

casper.run(function() {
	this.test.done();
});