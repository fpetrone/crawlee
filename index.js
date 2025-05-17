import { PlaywrightCrawler, Dataset, ErrorTracker } from "crawlee";

let counter = 0;

// PlaywrightCrawler crawls the web using a headless // browser controlled by the Playwright library.
const crawler = new PlaywrightCrawler({
  // Use the requestHandler to process each of the crawled pages.
  async requestHandler({ request, page, enqueueLinks, log, response }) {
    counter++;
    const title = await page.title();

    let typeOfContent = await response.headerValue("content-type");
    if (typeOfContent.includes("text/html")) {
      log.info(`${counter} - Title of ${request.loadedUrl} is '${title}'`);
    } else if (typeOfContent.includes("application/pdf")) {
      log.info(`${counter} - ${request.loadedUrl} is PDF`);
    } else {
      log.info(`${counter} - ${request.loadedUrl} is NOT a content to crawl`);
    }
    if (typeOfContent) {
      log.info(`${counter} - ${typeOfContent} `);
    }
    const content = await page.content();
    // await page.screenshot({ path: counter + "screenshot.png" });

    //log.info(` '${(content)}'`);
    // log.info(` '${(content.length)}'`); works

    // Save results as JSON to ./storage/datasets/default
    // Responses https://playwright.dev/docs/api/class-response
    await Dataset.pushData({
      title,
      url: request.loadedUrl,
      type: await response.headerValue("content-type"),
      result: response.status(),
    });

    // Extract links from the current page     // and add them to the crawling queue.
    await enqueueLinks();
  },
  // This function is called if the page processing failed more than maxRequestRetries+1 times.
  async failedRequestHandler({ request, log }) {
    log.info(`Request ${request.url} failed too many times.`);
    await Dataset.pushData({
      err: request.errorMessages,
      url: request.url

    });
  },
  // OPTIONS https://crawlee.dev/js/api/playwright-crawler/interface/AdaptivePlaywrightCrawlerOptions
  headless: false,
  maxConcurrency: 4,
  // Let's limit our crawls to make our tests shorter and safer.
  maxRequestsPerCrawl: 12,
  respectRobotsTxtFile: true,
  
});

// Add first URL to the queue and start the crawl. //await crawler.run(["https://fpetrone.github.io/personal/accessibility.html"]);
//await crawler.run(["https://fpetrone.github.io/personal/"]);

await crawler.run(["https://fpetrone.github.io/personal/accessibility.html"]);
/*      USIGN a List or URLs   
  1- add  sources
  2- comment enqueueLinks

// Source: https://crawlee.dev/js/docs/examples/crawl-multiple-urls
// Sitemap: https://crawlee.dev/js/docs/examples/crawl-sitemap

*/

/*
const sources = [
  'https://fpetrone.github.io/personal/accessibility.html',
  'https://fpetrone.github.io/personal/',
  ];

await crawler.run(sources);
*/

// const et = new ErrorTracker;
//log.info(  ` F response.status(),' ` + et.total);

// log.info(  ` F response.status(),' ` + response);

/*const form = new FormData();

form.append('url', 'https://fpetrone.github.io/personal/from%20drive%20no%20alt%20text.pdf');


await Request.r  po ost('http://localhost:8080/api/validate/url/ua1', {
  multipart: form
    
  });*/

//log.info(` '${response.json()}'`);

//log.info(JSON.stringify(await response.allHeaders()));

/* log.info(JSON.stringify(response.allHeaders()));

  log.info(JSON.stringify(response));
  log.info(JSON.stringify(response.request()));*/
