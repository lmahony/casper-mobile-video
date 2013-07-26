Using Casperjs to write some automated tests for our mobile video page.
Verifying contents on the page under different user agents.

Usage:
casperjs --env=PROD --includes=_config.js,common-video.js --pre=pre.js [--scr=/screenshotsfolder/] test tests/

can pass --scr= to provide location where screenshots are stored, by default they go into ../screenshots/<DATE>/<DEVICE>.png

Larry
AOL