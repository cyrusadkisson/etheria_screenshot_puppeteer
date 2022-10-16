const puppeteer = require('puppeteer');

var zoomlevels = ["tile", "area", "wide", "map"];

(async () => {
	
	// instantiate a puppeteer browser and wait a bit for the explorer to load...
	
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--use-gl=egl']
	});
	const page = await browser.newPage();
	await page.setViewport({ width: 1050, height: 1050 })
	
	// then loop over each zoomlevel type and screenshot each tile
	
	var x;
	var version;
	var z = 0;
	while (z < zoomlevels.length) {
		await page.goto('https://etheria.world/explore.html?version=0.9&tile=0&spotlight=true&suppressOthers=false&logodiv=true&hexinfodiv=false&controlinfodiv=false&zoomlevel=' + zoomlevels[z]);
		await page.waitForTimeout(60000); // wait 60 seconds for everything to load
		x = 0;
		while (x < 4356) {
			if (x < 1089)
				version = "v0.9";
			else if (x >= 1089 && x < 2178)
				version = "v1.0";
			else if (x >= 2178 && x < 3267)
				version = "v1.1";
			else
				version = "v1.2";
			console.log("screenshotting " + (x % 1089) + version + " zoomlevels[" + z + "]=" + zoomlevels[z]);
			await page.screenshot({ path: "images/tiles/" + version + "/1050x1050_" + zoomlevels[z] + "/" + zoomlevels[z] + (x % 1089) + ".jpg" });
			await page.keyboard.press("Enter"); // advances to next tile
			//		await page.type(String.fromCharCode(38));
			await page.waitForTimeout(4000);
			x++;
		}
		z++;
	}
	await browser.close();
})();

// aws s3 sync /home/cyrus/eclipse-workspace/etheria_screenshot_puppeteer/images/tiles/v0.9/1050x1050_tile s3://www.etheria.world/images/tiles/v0.9/1050x1050_tile && aws s3 sync /home/cyrus/eclipse-workspace/etheria_screenshot_puppeteer/images/tiles/v0.9/1050x1050_area s3://www.etheria.world/images/tiles/v0.9/1050x1050_area && aws s3 sync /home/cyrus/eclipse-workspace/etheria_screenshot_puppeteer/images/tiles/v0.9/1050x1050_wide s3://www.etheria.world/images/tiles/v0.9/1050x1050_wide && aws s3 sync /home/cyrus/eclipse-workspace/etheria_screenshot_puppeteer/images/tiles/v0.9/1050x1050_map s3://www.etheria.world/images/tiles/v0.9/1050x1050_map && aws s3 sync /home/cyrus/eclipse-workspace/etheria_screenshot_puppeteer/images/tiles/v1.0/1050x1050_tile s3://www.etheria.world/images/tiles/v1.0/1050x1050_tile && aws s3 sync /home/cyrus/eclipse-workspace/etheria_screenshot_puppeteer/images/tiles/v1.0/1050x1050_area s3://www.etheria.world/images/tiles/v1.0/1050x1050_area && aws s3 sync /home/cyrus/eclipse-workspace/etheria_screenshot_puppeteer/images/tiles/v1.0/1050x1050_wide s3://www.etheria.world/images/tiles/v1.0/1050x1050_wide && aws s3 sync /home/cyrus/eclipse-workspace/etheria_screenshot_puppeteer/images/tiles/v1.0/1050x1050_map s3://www.etheria.world/images/tiles/v1.0/1050x1050_map && 
// aws s3 sync /home/cyrus/eclipse-workspace/etheria_screenshot_puppeteer/images/tiles/v1.1/1050x1050_tile s3://www.etheria.world/images/tiles/v1.1/1050x1050_tile && aws s3 sync /home/cyrus/eclipse-workspace/etheria_screenshot_puppeteer/images/tiles/v1.1/1050x1050_area s3://www.etheria.world/images/tiles/v1.1/1050x1050_area && aws s3 sync /home/cyrus/eclipse-workspace/etheria_screenshot_puppeteer/images/tiles/v1.1/1050x1050_wide s3://www.etheria.world/images/tiles/v1.1/1050x1050_wide && aws s3 sync /home/cyrus/eclipse-workspace/etheria_screenshot_puppeteer/images/tiles/v1.1/1050x1050_map s3://www.etheria.world/images/tiles/v1.1/1050x1050_map && aws s3 sync /home/cyrus/eclipse-workspace/etheria_screenshot_puppeteer/images/tiles/v1.2/1050x1050_tile s3://www.etheria.world/images/tiles/v1.2/1050x1050_tile && aws s3 sync /home/cyrus/eclipse-workspace/etheria_screenshot_puppeteer/images/tiles/v1.2/1050x1050_area s3://www.etheria.world/images/tiles/v1.2/1050x1050_area && aws s3 sync /home/cyrus/eclipse-workspace/etheria_screenshot_puppeteer/images/tiles/v1.2/1050x1050_wide s3://www.etheria.world/images/tiles/v1.2/1050x1050_wide && aws s3 sync /home/cyrus/eclipse-workspace/etheria_screenshot_puppeteer/images/tiles/v1.2/1050x1050_map s3://www.etheria.world/images/tiles/v1.2/1050x1050_map
