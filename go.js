const puppeteer = require('puppeteer');

var zoomlevels = ["tile", "area", "wide", "map", "world"];

(async () => {
	
	// instantiate a puppeteer browser and wait a bit for the explorer to load...
	
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--use-gl=egl', '--no-sandbox']
	});
	const page = await browser.newPage();
	await page.setViewport({ width: 1050, height: 1050 })
	
	// then loop over each zoomlevel type and screenshot each tile
	
	var x;
	var version;
	var z = 0;
	while (z < zoomlevels.length) {
		await page.goto('https://etheria.world/explore.html?version=0.9&tile=0&suppressBuilds=false&infodiv=false&spotlight=true&toolbar=false&graphs=false&zoomlevel=' + zoomlevels[z]);
		await page.waitForTimeout(120000); // wait 2 mins for everything to load, increase this if it's not enough.
		x = 0;
		while (x < 4356) {
			if (x < 1089)
				version = "v0pt9";
			else if (x >= 1089 && x < 2178)
				version = "v1pt0";
			else if (x >= 2178 && x < 3267)
				version = "v1pt1";
			else
				version = "v1pt2";
			console.log("screenshotting x=" + x + "/4356 index=" + (x % 1089) + version + " zoomlevels[" + z + "]=" + zoomlevels[z]);
			await page.screenshot({ quality: 95, path: "images/tiles/" + version + "/" + (x % 1089) + "_" + zoomlevels[z] + "_1050x1050_95.jpg" });
			await page.keyboard.press("Enter"); // advances to next tile
			//		await page.type(String.fromCharCode(38));
			await page.waitForTimeout(3000);
			x++;
		}
		z++;
	}
	await browser.close();
})();

// aws s3 sync /home/cyrus/eclipse-workspace/etheria_screenshot_puppeteer/images/tiles/v0pt9 s3://www.etheria.world/images/tiles/v0pt9 && aws s3 sync /home/cyrus/eclipse-workspace/etheria_screenshot_puppeteer/images/tiles/v1pt0 s3://www.etheria.world/images/tiles/v1pt0 && aws s3 sync /home/cyrus/eclipse-workspace/etheria_screenshot_puppeteer/images/tiles/v1pt1 s3://www.etheria.world/images/tiles/v1pt1 && aws s3 sync /home/cyrus/eclipse-workspace/etheria_screenshot_puppeteer/images/tiles/v1pt2 s3://www.etheria.world/images/tiles/v1pt2
