import { PlaywrightCrawler, Dataset } from "crawlee";

import { Request } from "crawlee";

let  counter =0

// PlaywrightCrawler crawls the web using a headless
// browser controlled by the Playwright library.
const crawler = new PlaywrightCrawler({
  // Use the requestHandler to process each of the crawled pages.
  async requestHandler({ request, page, enqueueLinks, log , response}) {
    counter ++;
    const title = await page.title();
    //const a = await page.request;
    //console.log(a);
    page.on('request', request => console.log('>>', request.method(), request.url()));
page.on('response', response => console.log('<<', response.status(), response.url()));

//    const content = await page.pdf
  //  .content();
  let content = await page.content();
    //const context = await page.context();
    //await page.screenshot({ path: counter + 'screenshot.png' });


    log.info(`Title of ${request.loadedUrl} is '${title}'`);
    //log.info(` '${JSON.stringify(request)}'`);
    //log.info(` '${JSON.stringify(request.headers)}'`);// empty object
    //log.info(` '${JSON.stringify(log)}'`);


    //const isHtml = await page.getByRole('html');
    //log.info(isHtml);
    //log.info(` '${(content)}'`);
    log.info(` '${(content.length)}'`);

    if (content==""){
      console.log(`********PDF******`);
     // log.info(` '${(content)}'`);
      log.info(` '${(content)}'`);
    }/*else{
      
    }*/
    
    //log.info(` '${JSON.stringify(context)}'`);

    // Save results as JSON to ./storage/datasets/default
    await Dataset.pushData({ title, url: request.loadedUrl });

      //  log.info(` '${JSON.stringify(request)}'`);

/*const form = new FormData();

form.append('url', 'https://fpetrone.github.io/personal/from%20drive%20no%20alt%20text.pdf');


await Request.r  po ost('http://localhost:8080/api/validate/url/ua1', {
  multipart: form
    
  });*/
  //log.info(` '${response.json()}'`);

  log.info(JSON.stringify(await response.allHeaders()));
  log.info(await response.headerValue("content-type"));

 /* log.info(JSON.stringify(response.allHeaders()));

  log.info(JSON.stringify(response));
  log.info(JSON.stringify(response.request()));*/

    // Extract links from the current page
    // and add them to the crawling queue.
    await enqueueLinks();
  },
  // OPTIONS https://crawlee.dev/js/api/playwright-crawler/interface/AdaptivePlaywrightCrawlerOptions
  headless: false, 
  headless: false,
  maxConcurrency: 4,
  // Let's limit our crawls to make our tests shorter and safer.
  maxRequestsPerCrawl:10 ,
  respectRobotsTxtFile: true,
});

// Add first URL to the queue and start the crawl.
//await crawler.run(['https://crawlee.dev']);
await crawler.run(["https://fpetrone.github.io/personal/"]);

