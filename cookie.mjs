import { PuppeteerBlocker } from "@cliqz/adblocker-puppeteer";
import puppeteer, { Puppeteer } from "puppeteer";

let browser = await puppeteer.launch({ headless: false, width: 1000, height: 500 });
const page = await browser.newPage();


// bocker 

const blocker = await PuppeteerBlocker.fromLists(fetch, [
    'https://easylist.to/easylist/easylist.txt',
    'https://secure.fanboy.co.nz/fanboy-cookiemonster.txt'
]);
await blocker.enableBlockingInPage(page)


await page.goto("https://www.onetrust.com/products/cookie-consent/", { waitUntil: "networkidle2", timeout: 100000 });

// cookie click 
// await for selector and then click accept BTN

// const acceptBtn = await page.$('#onetrust-accept-btn-handler', { timeout: 5000 })
//     .catch(() => {
//         console.log('cookie popup not Found in 5 sec');
//     });
// console.log(acceptBtn);
// if (acceptBtn) {
//     acceptBtn.click()
//     console.log('yes');
// }


// // 2 option :2 find element and then click 

// const acceptBtn = await page.$('#onetrust-accept-btn-handler')
// if (acceptBtn) {
//     await acceptBtn.click()
// }

// await page.addScriptTag({
//     content: `#onetrust-content-sdk {display:none}`
// })


// remove cookie consent using evaluate
await page.evaluate(() => {
    document.qurySelector("#onetrust-content-sdk")?.remove()
})


// 3
// await page.addScriptTag({
//     content: `document.qurySelector("#onetrust-content-sdk")?.remove()`
// })

await page.screenshot({ path: "page.png" })
await browser.close()